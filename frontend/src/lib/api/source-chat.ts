import apiClient from './client'
import { getApiUrl } from '@/lib/config'
import {
  SourceChatSession,
  SourceChatSessionWithMessages,
  CreateSourceChatSessionRequest,
  UpdateSourceChatSessionRequest,
  SendMessageRequest
} from '@/lib/types/api'

// Helper to strip prefixes for URLs, bypassing Next.js proxy url-encoding bugs with "%3A"
const cleanId = (id: string, prefix: string) => id.startsWith(prefix) ? id.slice(prefix.length) : id

export const sourceChatApi = {
  // Session management
  createSession: async (sourceId: string, data: Omit<CreateSourceChatSessionRequest, 'source_id'>) => {
    // Extract clean ID without "source:" prefix for the request body and URL
    const cSourceId = cleanId(sourceId, 'source:')
    const response = await apiClient.post<SourceChatSession>(
      `/sources/${cSourceId}/chat/sessions`,
      { ...data, source_id: cSourceId }  // Include source_id in the request body
    )
    return response.data
  },

  listSessions: async (sourceId: string) => {
    const cSourceId = cleanId(sourceId, 'source:')
    const response = await apiClient.get<SourceChatSession[]>(
      `/sources/${cSourceId}/chat/sessions`
    )
    return response.data
  },

  getSession: async (sourceId: string, sessionId: string) => {
    const cSourceId = cleanId(sourceId, 'source:')
    const cSessionId = cleanId(sessionId, 'chat_session:')
    const response = await apiClient.get<SourceChatSessionWithMessages>(
      `/sources/${cSourceId}/chat/sessions/${cSessionId}`
    )
    return response.data
  },

  updateSession: async (sourceId: string, sessionId: string, data: UpdateSourceChatSessionRequest) => {
    const cSourceId = cleanId(sourceId, 'source:')
    const cSessionId = cleanId(sessionId, 'chat_session:')
    const response = await apiClient.put<SourceChatSession>(
      `/sources/${cSourceId}/chat/sessions/${cSessionId}`,
      data
    )
    return response.data
  },

  deleteSession: async (sourceId: string, sessionId: string) => {
    const cSourceId = cleanId(sourceId, 'source:')
    const cSessionId = cleanId(sessionId, 'chat_session:')
    await apiClient.delete(`/sources/${cSourceId}/chat/sessions/${cSessionId}`)
  },

  // Messaging with streaming
  sendMessage: async (sourceId: string, sessionId: string, data: SendMessageRequest) => {
    const cSourceId = cleanId(sourceId, 'source:')
    const cSessionId = cleanId(sessionId, 'chat_session:')
    
    // Get auth token using the same logic as apiClient interceptor
    let token = null
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage)
          if (state?.token) {
            token = state.token
          }
        } catch (error) {
          console.error('Error parsing auth storage:', error)
        }
      }
    }

    // Use absolute URL to bypass Next.js rewrites issues with streaming
    const apiUrl = await getApiUrl()
    const url = `${apiUrl}/api/sources/${cSourceId}/chat/sessions/${cSessionId}/messages`

    // Use fetch with ReadableStream for SSE
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.body
    })
  }
}
