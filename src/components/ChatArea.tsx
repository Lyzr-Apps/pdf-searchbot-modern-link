'use client'

import React, { useEffect, useRef } from 'react'
import { Message as MessageType } from '@/types'
import { Message } from './Message'
import { EmptyState } from './EmptyState'

interface ChatAreaProps {
  messages: MessageType[]
  isLoading?: boolean
  onQuestionClick?: (question: string) => void
}

export function ChatArea({
  messages,
  isLoading = false,
  onQuestionClick,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
      {messages.length === 0 ? (
        <EmptyState onQuestionClick={onQuestionClick} />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              isLoading={false}
            />
          ))}
          {isLoading && (
            <Message
              message={{
                id: 'loading',
                type: 'assistant',
                content: 'Searching your documents...',
                timestamp: new Date().toISOString(),
              }}
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}
