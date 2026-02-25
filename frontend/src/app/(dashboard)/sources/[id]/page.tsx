'use client'

import { useRouter, useParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useSourceChat } from '@/lib/hooks/useSourceChat'
import { useSource } from '@/lib/hooks/use-sources'
import { ChatPanel } from '@/components/source/ChatPanel'
import { useNavigation } from '@/lib/hooks/use-navigation'
import { SourceDetailContent } from '@/components/source/SourceDetailContent'
import { useTranslation } from '@/lib/hooks/use-translation'
import { insightsApi } from '@/lib/api/insights'

export default function SourceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const sourceId = params?.id ? decodeURIComponent(params.id as string) : ''
  const navigation = useNavigation()
  const { t } = useTranslation()

  // Initialize source chat
  const chat = useSourceChat(sourceId)

  // Fetch source data for title map
  const { data: sourceData } = useSource(sourceId)
  const titleMap = useMemo(() => {
    const map = new Map<string, string>()
    if (sourceData?.title) {
      map.set(sourceData.id, sourceData.title)
    }
    return map
  }, [sourceData])

  // Fetch source insights for contentMap
  const { data: insights = [] } = useQuery({
    queryKey: ['sourceInsights', sourceId],
    queryFn: () => insightsApi.listForSource(sourceId),
    enabled: !!sourceId
  })

  // Build contentMap from insights for citation tooltips
  const contentMap = useMemo(() => {
    const map = new Map<string, string>()
    // Map source ID to all insights joined
    if (insights.length > 0) {
      const rawSourceId = sourceId.startsWith('source:') ? sourceId.substring(7) : sourceId
      const allContent = insights.map(i => i.content).join('\n\n')
      map.set(sourceId, allContent)
      map.set(rawSourceId, allContent)
      map.set(`source:${rawSourceId}`, allContent)
      // Map each insight ID to its own content
      for (const insight of insights) {
        const rawInsightId = insight.id.startsWith('source_insight:') ? insight.id.substring(15) : insight.id
        map.set(insight.id, insight.content)
        map.set(rawInsightId, insight.content)
        map.set(`source_insight:${rawInsightId}`, insight.content)
      }
    } else if (sourceData?.full_text) {
      // Fallback to full_text if no insights
      const rawSourceId = sourceId.startsWith('source:') ? sourceId.substring(7) : sourceId
      const snippet = sourceData.full_text.substring(0, 500)
      map.set(sourceId, snippet)
      map.set(rawSourceId, snippet)
      map.set(`source:${rawSourceId}`, snippet)
    }
    return map
  }, [sourceId, insights, sourceData])

  const handleBack = useCallback(() => {
    const returnPath = navigation.getReturnPath()
    router.push(returnPath)
    navigation.clearReturnTo()
  }, [navigation, router])

  // Use custom label if set, otherwise use translated default
  const backLabel = navigation.returnTo?.label || t.navigation.backToSources

  return (
    <div className="flex flex-col h-screen">
      {/* Back button */}
      <div className="pt-6 pb-4 px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Button>
      </div>

      {/* Main content: Source detail + Chat */}
      <div className="flex-1 grid gap-6 lg:grid-cols-[2fr_1fr] overflow-hidden px-6">
        {/* Left column - Source detail */}
        <div className="overflow-y-auto px-4 pb-6">
          <SourceDetailContent
            sourceId={sourceId}
            showChatButton={false}
            onClose={handleBack}
          />
        </div>

        {/* Right column - Chat */}
        <div className="overflow-y-auto px-4 pb-6">
          <ChatPanel
            messages={chat.messages}
            isStreaming={chat.isStreaming}
            contextIndicators={chat.contextIndicators}
            onSendMessage={(message, model) => chat.sendMessage(message, model)}
            modelOverride={chat.currentSession?.model_override}
            onModelChange={(model) => {
              if (chat.currentSessionId) {
                chat.updateSession(chat.currentSessionId, { model_override: model })
              }
            }}
            sessions={chat.sessions}
            currentSessionId={chat.currentSessionId}
            onCreateSession={(title) => chat.createSession({ title })}
            onSelectSession={chat.switchSession}
            onUpdateSession={(sessionId, title) => chat.updateSession(sessionId, { title })}
            onDeleteSession={chat.deleteSession}
            loadingSessions={chat.loadingSessions}
            titleMap={titleMap}
            contentMap={contentMap}
          />
        </div>
      </div>
    </div>
  )
}
