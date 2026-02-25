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

export default function FeedbackStatsPage() {
    const { t, language } = useTranslation()
    const dateLocale = language === 'vi-VN' ? vi : enUS

    const [feedbackType, setFeedbackType] = useState<string>('all')
    const [dateFrom, setDateFrom] = useState<string>('')
    const [dateTo, setDateTo] = useState<string>('')

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
    const filterType = t.common.filterType || 'Filter by Type'
    const dateFromLbl = t.common.dateFrom || 'Date From'
    const dateToLbl = t.common.dateTo || 'Date To'
    const stt = t.common.stt || 'STT'
    const question = t.common.question || 'Question'
    const answer = t.common.answer || 'Answer'
    const reportContent = t.common.reportContent || 'Report Content'
    const typeLbl = t.common.type || 'Type'
    const dateLbl = t.common.date || 'Date'

    return (
        <AppShell>
            <div className="p-4 md:p-6 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filters</CardTitle>
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
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{question}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{answer}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{reportContent}</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-32">{dateLbl}</th>
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
                                            <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
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
                                                <td className="p-4 align-middle max-w-xs truncate" title={item.question}>
                                                    {item.question}
                                                </td>
                                                <td className="p-4 align-middle max-w-xs truncate" title={item.answer}>
                                                    {item.answer}
                                                </td>
                                                <td className="p-4 align-middle max-w-xs truncate text-muted-foreground" title={item.report_content || ''}>
                                                    {item.report_content || '-'}
                                                </td>
                                                <td className="p-4 align-middle whitespace-nowrap text-xs text-muted-foreground">
                                                    {format(new Date(item.created), 'PPp', { locale: dateLocale })}
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
        </AppShell>
    )
}
