import apiClient from './client'

export interface CreateFeedbackRequest {
    feedback_type: 'like' | 'dislike' | 'report'
    question: string
    answer: string
    report_content?: string
}

export interface FeedbackResponse {
    id: string
    feedback_type: 'like' | 'dislike' | 'report'
    question: string
    answer: string
    report_content?: string
    user_id?: string
    username?: string
    created: string
    updated: string
}

export const feedbackApi = {
    create: async (data: CreateFeedbackRequest) => {
        const response = await apiClient.post<FeedbackResponse>('/feedback', data)
        return response.data
    },

    list: async (params?: {
        feedback_type?: 'like' | 'dislike' | 'report',
        date_from?: string,
        date_to?: string,
        page?: number,
        page_size?: number
    }) => {
        const response = await apiClient.get<FeedbackResponse[]>('/feedback', { params })
        return response.data
    }
}
