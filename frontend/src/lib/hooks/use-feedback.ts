import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { feedbackApi, CreateFeedbackRequest } from '@/lib/api/feedback'
import { QUERY_KEYS } from '@/lib/api/query-client'
import { useToast } from '@/lib/hooks/use-toast'
import { useTranslation } from '@/lib/hooks/use-translation'
import { getApiErrorKey } from '@/lib/utils/error-handler'

export function useCreateFeedback() {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: (data: CreateFeedbackRequest) => feedbackApi.create(data),
        onSuccess: () => {
            // Invalidate if admin views are active
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feedback })

            // We don't always want a toast for likes/dislikes as it can be noisy,
            // but the component can call toast directly if desired.
        },
        onError: (error: unknown) => {
            toast({
                title: t.common.error,
                description: getApiErrorKey(error, t.common.errors.unknown),
                variant: 'destructive',
            })
        },
    })
}

export function useFeedbackStats(params?: {
    feedback_type?: 'like' | 'dislike' | 'report',
    date_from?: string,
    date_to?: string,
    page?: number,
    page_size?: number
}) {
    return useQuery({
        queryKey: [...QUERY_KEYS.feedback, params],
        queryFn: () => feedbackApi.list(params),
    })
}
