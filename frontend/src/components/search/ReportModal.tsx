import { useState } from 'react'
import { useTranslation } from '@/lib/hooks/use-translation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useCreateFeedback } from '@/lib/hooks/use-feedback'

interface ReportModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    question: string
    answer: string
    onReportSubmitted: () => void
}

export function ReportModal({
    open,
    onOpenChange,
    question,
    answer,
    onReportSubmitted
}: ReportModalProps) {
    const { t } = useTranslation()
    const [reportContent, setReportContent] = useState('')
    const reportMutation = useCreateFeedback()

    const handleSubmit = () => {
        if (!reportContent.trim()) return

        reportMutation.mutate(
            {
                feedback_type: 'report',
                question,
                answer,
                report_content: reportContent
            },
            {
                onSuccess: () => {
                    onReportSubmitted()
                    onOpenChange(false)
                    setReportContent('') // Reset
                }
            }
        )
    }

    // Use raw English fallbacks or add to translation files later
    const title = t.common.report || 'Report Answer'
    const desc = t.common.reportDesc || 'Please tell us what is wrong with this answer.'
    const placeholder = t.common.reportPlaceholder || 'e.g., Inaccurate information, inappropriate content, etc.'
    const cancel = t.common.cancel || 'Cancel'
    const submit = t.common.submit || 'Submit Report'

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="report-content" className="sr-only">Report Content</Label>
                        <Textarea
                            id="report-content"
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            placeholder={placeholder}
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={reportMutation.isPending}>
                        {cancel}
                    </Button>
                    <Button onClick={handleSubmit} disabled={!reportContent.trim() || reportMutation.isPending}>
                        {reportMutation.isPending ? t.common.saving || 'Submitting...' : submit}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
