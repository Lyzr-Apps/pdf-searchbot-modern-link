'use client'

import React, { useEffect, useState } from 'react'
import { Message as MessageType } from '@/types'
import { SourcePanel } from './SourcePanel'

interface MessageProps {
  message: MessageType
  isLoading?: boolean
}

export function Message({ message, isLoading }: MessageProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(isLoading || false)

  useEffect(() => {
    if (!isLoading && message.answer) {
      setDisplayedText(message.answer)
      setIsTyping(false)
    }
  }, [message.answer, isLoading])

  const isUser = message.type === 'user'

  return (
    <div
      className={`flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex-1 max-w-2xl ${isUser ? 'flex justify-end' : ''}`}
      >
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
          }`}
        >
          <p className="text-sm leading-relaxed">
            {isUser
              ? String(message.content)
              : String(displayedText || message.content || 'No response')}
          </p>

          {!isUser && isLoading && (
            <div className="mt-3 flex gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}

          {!isUser && message.confidence && typeof message.confidence === 'string' && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-400">Confidence:</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  message.confidence === 'High'
                    ? 'bg-green-900/50 text-green-300'
                    : message.confidence === 'Medium'
                    ? 'bg-yellow-900/50 text-yellow-300'
                    : 'bg-orange-900/50 text-orange-300'
                }`}
              >
                {String(message.confidence)}
              </span>
            </div>
          )}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3">
            <SourcePanel
              sources={message.sources}
              sourceContext={message.sourceContext}
            />
          </div>
        )}
      </div>
    </div>
  )
}
