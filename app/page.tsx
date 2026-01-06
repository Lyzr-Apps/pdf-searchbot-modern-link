/**
 * MAIN PAGE - Build your UI here!
 *
 * FILE STRUCTURE (DO NOT CHANGE):
 * - app/page.tsx       ← YOU ARE HERE - main page
 * - app/layout.tsx     ← root layout (pre-configured)
 * - app/error.tsx      ← error boundary (pre-configured)
 * - app/not-found.tsx  ← 404 page (pre-configured)
 * - app/loading.tsx    ← loading state (pre-configured)
 * - app/api/           ← API routes
 * - src/components/ui/ ← shadcn/ui components
 * - src/lib/utils.ts   ← cn() helper
 *
 * ⚠️ NEVER create src/app/ - files go in app/ directly!
 * ⚠️ NEVER create error.tsx, not-found.tsx - use the ones here!
 * ⚠️ NEVER import from 'next/document' - App Router doesn't use it!
 */

'use client'

import { useState, useEffect } from 'react'
import { ChatProvider, useChatContext } from '@/context/ChatContext'
import { useChat } from '@/hooks/useChat'
import { useDocuments } from '@/hooks/useDocuments'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { ChatArea } from '@/components/ChatArea'
import { SearchInput } from '@/components/SearchInput'
import { SAMPLE_DOCUMENTS, SAMPLE_MESSAGES } from '@/utils/constants'
import { Message as MessageType } from '@/types'

function KnowledgeSearchApp() {
  const {
    messages: ctxMessages,
    loading: ctxLoading,
    addMessage,
    sidebarOpen,
    documents: ctxDocuments,
    addDocument,
  } = useChatContext()

  const { messages: hookMessages, sendMessage, loading: hookLoading } = useChat()
  const { documents: hookDocuments, uploadFile } = useDocuments()

  const [initialized, setInitialized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Initialize with sample data on first load
  useEffect(() => {
    if (!initialized && ctxMessages.length === 0 && ctxDocuments.length === 0) {
      SAMPLE_DOCUMENTS.forEach(doc => addDocument(doc))
      SAMPLE_MESSAGES.forEach(msg => addMessage(msg))
      setInitialized(true)
    }
  }, [initialized, ctxMessages.length, ctxDocuments.length, addMessage, addDocument])

  const handleSendMessage = async (query: string) => {
    const userMsg: MessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    }

    addMessage(userMsg)

    try {
      const response = await sendMessage(query)

      if (response) {
        // Ensure answer is a string
        const answerText = typeof response.answer === 'string' ? response.answer : String(response.answer || '')

        // Handle sources - can be array of strings or objects
        let sourcesArray: any[] = []
        if (Array.isArray(response.sources)) {
          sourcesArray = response.sources
        }

        const assistantMsg: MessageType = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: answerText,
          timestamp: new Date().toISOString(),
          answer: answerText,
          sources: sourcesArray,
          confidence: response.confidence || 'Medium',
          sourceContext: response.sourceContext || '',
        }

        addMessage(assistantMsg)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => {}}
          onSettingsClick={() => setShowSettings(!showSettings)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatArea
            messages={ctxMessages}
            isLoading={hookLoading}
            onQuestionClick={handleQuestionClick}
          />

          <SearchInput
            onSubmit={handleSendMessage}
            disabled={hookLoading}
            placeholder="Ask a question about your documents..."
          />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <ChatProvider>
      <KnowledgeSearchApp />
    </ChatProvider>
  )
}
