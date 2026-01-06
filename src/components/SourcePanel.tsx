'use client'

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Source } from '@/types'

interface SourcePanelProps {
  sources: Source[]
  sourceContext?: string
}

export function SourcePanel({ sources, sourceContext }: SourcePanelProps) {
  const [expanded, setExpanded] = useState(false)

  if (!sources || sources.length === 0) {
    return null
  }

  return (
    <div className="mt-4 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-700/50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-300">
          Sources ({sources.length})
        </span>
        {expanded ? (
          <FiChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-700 p-3 space-y-3">
          {sources.map((source, idx) => {
            // Handle if source is a string (simple citation format)
            if (typeof source === 'string') {
              return (
                <div key={idx} className="bg-gray-900 rounded p-3 border border-gray-700">
                  <p className="text-sm text-gray-300">{source}</p>
                </div>
              )
            }

            // Handle if source is an object with proper structure
            return (
              <div
                key={idx}
                className="bg-gray-900 rounded p-3 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {source.documentName || 'Unknown Document'}
                    </p>
                    {source.pageNumber && (
                      <p className="text-xs text-gray-400">
                        Page {source.pageNumber}
                      </p>
                    )}
                  </div>
                  {source.relevanceScore !== undefined && (
                    <div className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                      {Math.round(source.relevanceScore * 100)}%
                    </div>
                  )}
                </div>
                {source.matchingText && (
                  <p className="text-xs text-gray-300 line-clamp-3">
                    {source.matchingText}
                  </p>
                )}
              </div>
            )
          })}

          {sourceContext && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Context</p>
              <p className="text-xs text-gray-300 italic">
                {sourceContext}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
