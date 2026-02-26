'use client'

import React, { useState } from 'react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { FileText, Lightbulb, FileEdit } from 'lucide-react'
import type { ReferenceType } from '@/lib/utils/source-references'
import { stripFileExtension } from '@/lib/utils/source-references'
import { useTranslation } from '@/lib/hooks/use-translation'

interface CitationHoverCardProps {
    type: ReferenceType
    id: string
    title?: string
    content?: string
    children: React.ReactNode
}

/**
 * Wraps a citation button with a hover card that displays
 * a preview of the referenced source/note/insight.
 * When content is provided, shows the actual retrieved data
 * used to generate the answer (like NotebookLM).
 * When content is not provided, falls back to showing just the title.
 */
export function CitationHoverCard({ type, id, title, content, children }: CitationHoverCardProps) {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const IconComponent =
        type === 'source' ? FileText :
            type === 'source_insight' ? Lightbulb :
                FileEdit

    // Determine the display title
    let displayTitle = title ? stripFileExtension(title) : id
    if (!title) {
        if (type === 'source') displayTitle = t.common.source || 'Source'
        else if (type === 'source_insight') displayTitle = t.common.insight || 'Insight'
        else if (type === 'note') displayTitle = t.common.note || 'Note'
    }

    // Truncate very long content for tooltip display
    const maxContentLength = 1200
    const displayContent = content && content.length > maxContentLength
        ? content.substring(0, maxContentLength) + '...'
        : content

    return (
        <HoverCard openDelay={200} closeDelay={150} onOpenChange={setIsOpen}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent
                side="top"
                align="center"
                className={content ? "w-96 max-h-72 overflow-hidden" : "w-80 max-h-60 overflow-y-auto"}
            >
                <div className="space-y-2">
                    {/* Header with icon and title */}
                    <div className="flex items-center gap-2 pb-1 border-b">
                        <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>
                    </div>

                    {/* Content snippet - shown when content is available */}
                    {displayContent ? (
                        <div className="max-h-48 overflow-y-auto pr-1">
                            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line break-words">
                                {displayContent}
                            </p>
                        </div>
                    ) : (
                        <p className="text-[10px] text-muted-foreground/60 italic">
                            {t.common.clickToViewFull || 'Click to view full content'}
                        </p>
                    )}

                    {/* Footer hint */}
                    {displayContent && (
                        <p className="text-[10px] text-muted-foreground/60 italic pt-1 border-t">
                            {t.common.clickToViewFull || 'Click to view full content'}
                        </p>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
