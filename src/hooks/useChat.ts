'use client'

import { useState, useCallback } from 'react'
import { Message, ChatResponse } from '@/types'
import { sendMessageToAgent } from '@/utils/api'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const sendMessage = useCallback(
    async (userMessage: string): Promise<ChatResponse | null> => {
      setError(null)
      setLoading(true)

      const userMsg: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      }

      addMessage(userMsg)

      try {
        const response = await sendMessageToAgent(userMessage, messages)

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: userMessage,
          timestamp: new Date().toISOString(),
          answer: response.answer,
          sources: response.sources as any[],
          confidence: response.confidence,
          sourceContext: response.sourceContext,
        }

        addMessage(assistantMsg)
        setLoading(false)
        return response
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)
        setLoading(false)
        return null
      }
    },
    [messages, addMessage]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    loading,
    error,
    addMessage,
    sendMessage,
    clearMessages,
  }
}
