'use client'

import React, { useState } from 'react'
import { FiSend, FiLoader } from 'react-icons/fi'

interface SearchInputProps {
  onSubmit: (query: string) => void
  disabled?: boolean
  placeholder?: string
}

export function SearchInput({
  onSubmit,
  disabled = false,
  placeholder = 'Ask a question about your documents...',
}: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !disabled) {
      onSubmit(query)
      setQuery('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-700 bg-gray-900 p-4"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors disabled:cursor-not-allowed font-medium"
        >
          {disabled ? (
            <FiLoader className="w-4 h-4 animate-spin" />
          ) : (
            <FiSend className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  )
}
