'use client'

import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { useNotebookChat } from '@/lib/hooks/useNotebookChat'
import { useSources } from '@/lib/hooks/use-sources'
import { useNotes } from '@/lib/hooks/use-notes'
import { ChatPanel } from '@/components/source/ChatPanel'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { ContextSelections } from '../[id]/page'
import { useTranslation } from '@/lib/hooks/use-translation'
import { insightsApi } from '@/lib/api/insights'

interface ChatColumnProps {
  notebookId: string
  contextSelections: ContextSelections
}

export function ChatColumn({ notebookId, contextSelections }: ChatColumnProps) {
  const { t } = useTranslation()

  // Fetch sources and notes for this notebook
  const { data: sources = [], isLoading: sourcesLoading } = useSources(notebookId)
  const { data: notes = [], isLoading: notesLoading } = useNotes(notebookId)

  // Build a title lookup map for displaying source/note titles in references
  // Also fetch insights for sources that have them, to show "[InsightLabel] - [SourceTitle]"
  const sourcesWithInsights = useMemo(
    () => sources.filter(s => s.insights_count > 0),
    [sources]
  )

  // Fetch insights for all sources that have insights_count > 0
  const insightQueries = useQueries({
    queries: sourcesWithInsights.map(s => ({
      queryKey: ['insights', 'source', s.id],
      queryFn: () => insightsApi.listForSource(s.id),
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: s.insights_count > 0,
    }))
  })

  const titleMap = useMemo(() => {
    const map = new Map<string, string>()
    sources.forEach(s => { if (s.title) map.set(s.id, s.title) })
    notes.forEach(n => { if (n.title) map.set(n.id, n.title) })

    // Add insight → source title mappings
    // SurrealDB IDs may come as "source_insight:xxx" or just "xxx"
    // Map both formats to ensure lookup works regardless
    const insightLabel = t.common.insight
    insightQueries.forEach((query, idx) => {
      const source = sourcesWithInsights[idx]
      if (query.data && source?.title) {
        query.data.forEach(insight => {
          const displayTitle = `${insightLabel} - ${source.title}`
          // Map full ID as-is (e.g., "source_insight:xxx")
          map.set(insight.id, displayTitle)
          // Also map without prefix in case ID is just "xxx"
          if (!insight.id.includes(':')) {
            map.set(`source_insight:${insight.id}`, displayTitle)
          }
        })
      }
    })

    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, notes, insightQueries, t.common.insight])

  // Initialize notebook chat hook
  const chat = useNotebookChat({
    notebookId,
    sources,
    notes,
    contextSelections
  })

  // Calculate context stats for indicator
  const contextStats = useMemo(() => {
    let sourcesInsights = 0
    let sourcesFull = 0
    let notesCount = 0

    // Count sources by mode
    sources.forEach(source => {
      const mode = contextSelections.sources[source.id]
      if (mode === 'insights') {
        sourcesInsights++
      } else if (mode === 'full') {
        sourcesFull++
      }
    })

    // Count notes that are included (not 'off')
    notes.forEach(note => {
      const mode = contextSelections.notes[note.id]
      if (mode === 'full') {
        notesCount++
      }
    })

    return {
      sourcesInsights,
      sourcesFull,
      notesCount,
      tokenCount: chat.tokenCount,
      charCount: chat.charCount
    }
  }, [sources, notes, contextSelections, chat.tokenCount, chat.charCount])

  // Show loading state while sources/notes are being fetched
  if (sourcesLoading || notesLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    )
  }

  // Show error state if data fetch failed (unlikely but good to handle)
  if (!sources && !notes) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">{t.chat.unableToLoadChat}</p>
            <p className="text-xs mt-2">{t.common.refreshPage || 'Please try refreshing the page'}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <ChatPanel
      title={t.chat.chatWithNotebook}
      contextType="notebook"
      messages={chat.messages}
      isStreaming={chat.isSending}
      contextIndicators={null}
      onSendMessage={(message, modelOverride) => chat.sendMessage(message, modelOverride)}
      modelOverride={chat.currentSession?.model_override ?? chat.pendingModelOverride ?? undefined}
      onModelChange={(model) => chat.setModelOverride(model ?? null)}
      sessions={chat.sessions}
      currentSessionId={chat.currentSessionId}
      onCreateSession={(title) => chat.createSession(title)}
      onSelectSession={chat.switchSession}
      onUpdateSession={(sessionId, title) => chat.updateSession(sessionId, { title })}
      onDeleteSession={chat.deleteSession}
      loadingSessions={chat.loadingSessions}
      notebookContextStats={contextStats}
      notebookId={notebookId}
      titleMap={titleMap}
      labels={{ insight: t.common.insight, note: t.common.note }}
    />
  )
}
