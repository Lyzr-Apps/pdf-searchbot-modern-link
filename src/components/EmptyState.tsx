'use client'

import React from 'react'
import { FiBookOpen, FiSearch } from 'react-icons/fi'
import { SAMPLE_QUESTIONS } from '@/utils/constants'

interface EmptyStateProps {
  onQuestionClick?: (question: string) => void
}

export function EmptyState({ onQuestionClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiSearch className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to Knowledge Search
        </h2>
        <p className="text-gray-400 text-sm max-w-md">
          Upload your documents and ask questions to get instant answers with sources and confidence indicators.
        </p>
      </div>

      <div className="w-full max-w-md mt-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Try asking about:
        </p>
        <div className="space-y-2">
          {SAMPLE_QUESTIONS.slice(0, 3).map((question, idx) => (
            <button
              key={idx}
              onClick={() => onQuestionClick?.(question)}
              className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 hover:border-gray-600 group"
            >
              <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                {question}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg max-w-md">
        <div className="flex gap-2">
          <FiBookOpen className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-xs font-semibold text-blue-300">Getting Started</p>
            <p className="text-xs text-blue-200/80 mt-1">
              Start by uploading your PDF documents using the "Manage Knowledge" panel on the left sidebar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
