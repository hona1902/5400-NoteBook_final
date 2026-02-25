'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { vi, enUS } from 'date-fns/locale'
import { useTranslation } from '@/lib/hooks/use-translation'
import { useFeedbackStats } from '@/lib/hooks/use-feedback'
import { AppShell } from '@/components/layout/AppShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface FeedbackItem {
    id: string
    feedback_type: 'like' | 'dislike' | 'report'
    question: string
    answer: string
    report_content?: string
    username?: string
    created: string
}

export default function FeedbackStatsPage() {
    const { t, language } = useTranslation()
    const dateLocale = language === 'vi-VN' ? vi : enUS

    const [feedbackType, setFeedbackType] = useState<string>('all')
    const [dateFrom, setDateFrom] = useState<string>('')
    const [dateTo, setDateTo] = useState<string>('')
    const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null)

    const parsedType = feedbackType === 'all' ? undefined : (feedbackType as 'like' | 'dislike' | 'report')

    const { data: feedbackList, isLoading } = useFeedbackStats({
        feedback_type: parsedType,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        page: 1,
        page_size: 100
    })

    // English fallback if translation keys don't exist
    const title = t.common.feedbackStats || 'Feedback Statistics'
    const filtersLbl = t.common.filters || 'Filters'
    const filterType = t.common.filterType || 'Filter by Type'
    const dateFromLbl = t.common.dateFrom || 'Date From'
    const dateToLbl = t.common.dateTo || 'Date To'
    const stt = t.common.stt || 'STT'
    const question = t.common.question || 'Question'
    const answer = t.common.answer || 'Answer'
    const reportContent = t.common.reportContent || 'Report Content'
    const typeLbl = t.common.type || 'Type'
    const dateLbl = t.common.date || 'Date'
    const feedbackDetailLbl = t.common.feedbackDetail || 'Feedback Detail'
    const noReportContentLbl = t.common.noReportContent || 'No report content'
    const userLbl = t.common.userPerformed || 'User'
    const unknownUserLbl = t.common.unknownUser || 'Unknown user'

    return (
        <AppShell>
            <div className="p-4 md:p-6 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{filtersLbl}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>{filterType}</Label>
                                <Select value={feedbackType} onValueChange={setFeedbackType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="like">Like</SelectItem>
                                        <SelectItem value="dislike">Dislike</SelectItem>
                                        <SelectItem value="report">Report</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>{dateFromLbl}</Label>
                                <Input
                                    type="date"
                                    value={dateFrom}
                                    onChange={e => setDateFrom(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{dateToLbl}</Label>
                                <Input
                                    type="date"
                                    value={dateTo}
                                    onChange={e => setDateTo(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <div className="rounded-md border">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-16">{stt}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-24">{typeLbl}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-40">{userLbl}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{question}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{answer}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{reportContent}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="h-24 text-center text-muted-foreground">Loading...</td>
                                        </tr>
                                    ) : !feedbackList || feedbackList.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="h-24 text-center text-muted-foreground">No feedback found</td>
                                        </tr>
                                    ) : (
                                        feedbackList.map((item, idx) => (
                                            <tr
                                                key={item.id}
                                                className="border-b hover:bg-muted/50 transition-colors cursor-pointer select-none"
                                                onDoubleClick={() => setSelectedItem(item as FeedbackItem)}
                                                title="Double-click to view full details"
                                            >
                                                <td className="p-4 align-middle font-medium">{idx + 1}</td>
                                                <td className="p-4 align-middle">
                                                    <Badge
                                                        variant={
                                                            item.feedback_type === 'like' ? 'default' :
                                                                item.feedback_type === 'dislike' ? 'destructive' : 'secondary'
                                                        }
                                                        className={item.feedback_type === 'like' ? 'bg-green-500 hover:bg-green-600' : ''}
                                                    >
                                                        {item.feedback_type}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded w-fit">{item.username || unknownUserLbl}</span>
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {format(new Date(item.created), 'dd/MM/yyyy HH:mm', { locale: dateLocale })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle max-w-xs truncate" title={item.question}>
                                                    {item.question}
                                                </td>
                                                <td className="p-4 align-middle max-w-xs truncate" title={item.answer}>
                                                    {item.answer}
                                                </td>
                                                <td className="p-4 align-middle max-w-xs truncate text-muted-foreground" title={item.report_content || ''}>
                                                    {item.report_content || '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Dialog on double-click */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null) }}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {feedbackDetailLbl}
                            {selectedItem && (
                                <Badge
                                    variant={
                                        selectedItem.feedback_type === 'like' ? 'default' :
                                            selectedItem.feedback_type === 'dislike' ? 'destructive' : 'secondary'
                                    }
                                    className={selectedItem.feedback_type === 'like' ? 'bg-green-500 hover:bg-green-600' : ''}
                                >
                                    {selectedItem.feedback_type}
                                </Badge>
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedItem && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-1">{question}</p>
                                <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap break-words">
                                    {selectedItem.question}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-1">{answer}</p>
                                <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                                    {selectedItem.answer}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-1">{reportContent}</p>
                                <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap break-words">
                                    {selectedItem.report_content || (
                                        <span className="italic text-muted-foreground">{noReportContentLbl}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-1 border-t">
                                <div>
                                    <span className="font-semibold">{userLbl}:</span>{' '}
                                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                                        {selectedItem.username || unknownUserLbl}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">{dateLbl}:</span>{' '}
                                    {format(new Date(selectedItem.created), 'dd/MM/yyyy HH:mm:ss', { locale: dateLocale })}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppShell >
    )
}
