'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Message, KnowledgeDocument } from '@/types'

interface ChatContextType {
  messages: Message[]
  documents: KnowledgeDocument[]
  sidebarOpen: boolean
  loading: boolean
  theme: 'light' | 'dark'

  addMessage: (message: Message) => void
  addDocument: (doc: KnowledgeDocument) => void
  removeDocument: (docId: string) => void
  updateDocumentStatus: (docId: string, status: KnowledgeDocument['processingStatus']) => void
  toggleSidebar: () => void
  clearMessages: () => void
  toggleTheme: () => void
  setLoading: (loading: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const addDocument = useCallback((doc: KnowledgeDocument) => {
    setDocuments(prev => [...prev, doc])
  }, [])

  const removeDocument = useCallback((docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }, [])

  const updateDocumentStatus = useCallback((docId: string, status: KnowledgeDocument['processingStatus']) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, processingStatus: status } : doc
      )
    )
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const value: ChatContextType = {
    messages,
    documents,
    sidebarOpen,
    loading,
    theme,
    addMessage,
    addDocument,
    removeDocument,
    updateDocumentStatus,
    toggleSidebar,
    clearMessages,
    toggleTheme,
    setLoading,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }
  return context
}
