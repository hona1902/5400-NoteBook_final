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
    children: React.ReactNode
}

/**
 * Wraps a citation button with a hover card that instantly displays
 * a preview of the referenced source/note/insight.
 * This version uses pre-loaded titles and doesn't make API calls 
 * on hover to ensure instant display exactly like NotebookLM.
 */
export function CitationHoverCard({ type, id, title, children }: CitationHoverCardProps) {
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

    return (
        <HoverCard openDelay={200} closeDelay={150} onOpenChange={setIsOpen}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent
                side="top"
                align="center"
                className="w-80 max-h-60 overflow-y-auto"
            >
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 italic pt-1 border-t">
                        {t.common.clickToViewFull || 'Click to view full content'}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
