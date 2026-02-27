'use client'

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { FileText, Lightbulb, FileEdit, ChevronDown, ChevronUp, Search, X, ArrowUp, ArrowDown } from 'lucide-react'
import type { ReferenceType } from '@/lib/utils/source-references'
import { stripFileExtension } from '@/lib/utils/source-references'
import { useTranslation } from '@/lib/hooks/use-translation'

interface CitationHoverCardProps {
    type: ReferenceType
    id: string
    title?: string
    content?: string
    children: React.ReactNode
    /** Called when user clicks "Click to view full content" */
    onViewFullContent?: () => void
}

/** Separator used to join multiple embedding chunks */
const CHUNK_SEPARATOR = '\n\n---\n\n'
/** Max characters to show per chunk before truncation */
const CHUNK_PREVIEW_LENGTH = 500

/**
 * Highlight all occurrences of `query` in `text` with a yellow background.
 * Returns React nodes with <mark> elements wrapping matches.
 */
function highlightText(text: string, query: string): React.ReactNode {
    if (!query || query.length < 1) return text

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    const parts = text.split(regex)

    if (parts.length === 1) return text

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark
                        key={i}
                        className="bg-yellow-300 dark:bg-yellow-500/60 text-foreground rounded-sm px-0.5 search-highlight"
                    >
                        {part}
                    </mark>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    )
}

/**
 * Renders a single chunk with truncation and expand/collapse toggle.
 * Supports search highlighting.
 */
function ChunkBlock({ text, showMoreLabel, showLessLabel, searchQuery }: {
    text: string
    showMoreLabel: string
    showLessLabel: string
    searchQuery: string
}) {
    const [expanded, setExpanded] = useState(false)
    const needsTruncation = text.length > CHUNK_PREVIEW_LENGTH

    // Auto-expand if search query matches text beyond the preview
    const hasMatchBeyondPreview = useMemo(() => {
        if (!searchQuery || searchQuery.length < 1 || !needsTruncation) return false
        const previewPart = text.substring(0, CHUNK_PREVIEW_LENGTH)
        const hiddenPart = text.substring(CHUNK_PREVIEW_LENGTH)
        return hiddenPart.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !previewPart.toLowerCase().includes(searchQuery.toLowerCase())
    }, [text, searchQuery, needsTruncation])

    // Auto-expand when match is in the hidden section
    useEffect(() => {
        if (hasMatchBeyondPreview) setExpanded(true)
    }, [hasMatchBeyondPreview])

    const displayText = !expanded && needsTruncation
        ? text.substring(0, CHUNK_PREVIEW_LENGTH) + '...'
        : text

    return (
        <div>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line break-words">
                {highlightText(displayText, searchQuery)}
            </p>
            {needsTruncation && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setExpanded(!expanded)
                    }}
                    className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary mt-1 cursor-pointer transition-colors"
                >
                    {expanded ? (
                        <><ChevronUp className="h-3 w-3" /><span>{showLessLabel}</span></>
                    ) : (
                        <><ChevronDown className="h-3 w-3" /><span>{showMoreLabel}</span></>
                    )}
                </button>
            )}
        </div>
    )
}

/**
 * Wraps a citation button with a hover card that displays
 * a preview of the referenced source/note/insight.
 *
 * If content contains multiple chunks (separated by ---),
 * each chunk shows at most 500 chars with its own "Show more" toggle.
 *
 * Includes an inline search bar to find and highlight text within the popup.
 */
export function CitationHoverCard({ type, id, title, content, children, onViewFullContent }: CitationHoverCardProps) {
    const { t } = useTranslation()
    const [, setIsOpen] = useState(false)
    const [chunkExpandStates, setChunkExpandStates] = useState<Record<number, boolean>>({})
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

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

    // Split content into chunks if separator exists
    const chunks = content ? content.split(CHUNK_SEPARATOR) : []

    // Count matches
    const matchCount = useMemo(() => {
        if (!searchQuery || searchQuery.length < 1 || !content) return 0
        const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        return (content.match(regex) || []).length
    }, [content, searchQuery])

    // Reset all state when popup closes
    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setChunkExpandStates({})
            setSearchQuery('')
            setShowSearch(false)
            setCurrentMatchIndex(0)
        }
    }, [])

    // Navigate to a specific match by index
    const navigateToMatch = useCallback((index: number) => {
        if (!contentRef.current) return
        const marks = contentRef.current.querySelectorAll('.search-highlight')
        if (marks.length === 0) return

        // Wrap around
        const targetIndex = ((index % marks.length) + marks.length) % marks.length
        setCurrentMatchIndex(targetIndex)

        // Remove active class from all, add to current
        marks.forEach(m => m.classList.remove('active-highlight'))
        marks[targetIndex].classList.add('active-highlight')
        marks[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [])

    const goToNextMatch = useCallback(() => {
        navigateToMatch(currentMatchIndex + 1)
    }, [currentMatchIndex, navigateToMatch])

    const goToPrevMatch = useCallback(() => {
        navigateToMatch(currentMatchIndex - 1)
    }, [currentMatchIndex, navigateToMatch])

    // Auto-scroll to first highlight when search changes
    useEffect(() => {
        if (searchQuery && contentRef.current) {
            setCurrentMatchIndex(0)
            const timer = setTimeout(() => {
                navigateToMatch(0)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [searchQuery, navigateToMatch])

    // Focus search input when shown
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [showSearch])

    const showMoreLabel = t.common.showMore || 'Show more'
    const showLessLabel = t.common.showLess || 'Show less'
    const searchPlaceholder = t.common.searchInContent || 'Search in content...'
    const matchesLabel = t.common.matchesFound || '{count} found'

    return (
        <HoverCard openDelay={200} closeDelay={150} onOpenChange={handleOpenChange}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent
                side="top"
                align="center"
                /* 👇 Popup size: w-[32rem]=512px chiều rộng, max-h-[28rem]=448px chiều cao (có content) | w-[28rem]=448px, max-h-72=288px (không content) */
                className={content ? "w-[32rem] max-h-[28rem] overflow-hidden" : "w-[28rem] max-h-72 overflow-y-auto"}
            >
                <div className="space-y-2">
                    {/* Header with icon and title + search toggle */}
                    <div className="flex items-center gap-2 pb-1 border-b">
                        <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm font-semibold line-clamp-2 flex-1">{displayTitle}</p>
                        {content && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShowSearch(!showSearch)
                                    if (showSearch) setSearchQuery('')
                                }}
                                className="p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
                                title={searchPlaceholder}
                            >
                                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* Search bar - shown when toggled */}
                    {showSearch && content && (
                        <div className="flex items-center gap-1.5 px-1">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full pl-7 pr-7 py-1 text-xs rounded border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => {
                                        e.stopPropagation()
                                        if (e.key === 'Enter' && matchCount > 0) {
                                            e.preventDefault()
                                            if (e.shiftKey) goToPrevMatch()
                                            else goToNextMatch()
                                        }
                                    }}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setSearchQuery('')
                                            setCurrentMatchIndex(0)
                                            searchInputRef.current?.focus()
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                )}
                            </div>
                            {searchQuery && matchCount > 0 && (
                                <>
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap min-w-[3.5rem] text-center">
                                        {currentMatchIndex + 1}/{matchCount}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToPrevMatch() }}
                                        className="p-0.5 rounded hover:bg-muted transition-colors"
                                        title="Previous (Shift+Enter)"
                                    >
                                        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToNextMatch() }}
                                        className="p-0.5 rounded hover:bg-muted transition-colors"
                                        title="Next (Enter)"
                                    >
                                        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                                    </button>
                                </>
                            )}
                            {searchQuery && matchCount === 0 && (
                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                    0
                                </span>
                            )}
                        </div>
                    )}

                    {/* Content - shown when content is available */}
                    {/* 👇 max-h-80=320px: chiều cao tối đa vùng cuộn nội dung */}
                    {content ? (
                        <div ref={contentRef} className="max-h-80 overflow-y-auto pr-1 space-y-0">
                            {chunks.map((chunk, idx) => (
                                <div key={idx} className={idx > 0 ? "border-t border-dashed border-muted-foreground/20 pt-2 mt-2" : ""}>
                                    <ChunkBlock
                                        text={chunk}
                                        showMoreLabel={showMoreLabel}
                                        showLessLabel={showLessLabel}
                                        searchQuery={searchQuery}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onViewFullContent?.()
                            }}
                            className="text-xs text-primary/70 hover:text-primary italic hover:underline cursor-pointer"
                        >
                            🔗 {t.common.clickToViewFull || 'Click to view full content'}
                        </button>
                    )}

                    {/* Footer hint */}
                    {content && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onViewFullContent?.()
                            }}
                            className="text-xs text-primary/70 hover:text-primary italic hover:underline cursor-pointer pt-1 border-t block w-full text-left"
                        >
                            🔗 {t.common.clickToViewFull || 'Click to view full content'}
                        </button>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard >
    )
}
