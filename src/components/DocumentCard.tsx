'use client'

import React, { useState } from 'react'
import { FiTrash2, FiFile, FiLoader } from 'react-icons/fi'
import { KnowledgeDocument } from '@/types'
import { formatFileSize } from '@/utils/api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface DocumentCardProps {
  document: KnowledgeDocument
  onDelete?: (docId: string) => void
  isDeleting?: boolean
}

export function DocumentCard({ document, onDelete, isDeleting = false }: DocumentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getStatusColor = (status: KnowledgeDocument['processingStatus']) => {
    switch (status) {
      case 'complete':
        return 'text-green-500'
      case 'processing':
      case 'uploading':
        return 'text-blue-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusText = (status: KnowledgeDocument['processingStatus']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...'
      case 'processing':
        return 'Processing...'
      case 'complete':
        return 'Ready'
      case 'error':
        return 'Error'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <FiFile className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{document.name}</h3>
            <p className="text-xs text-gray-400 mt-1">
              {document.pageCount} pages • {formatFileSize(document.size)} • {formatDate(document.uploadDate)}
            </p>
            <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${getStatusColor(document.processingStatus)}`}>
              {(document.processingStatus === 'uploading' || document.processingStatus === 'processing') && (
                <FiLoader className="w-3 h-3 animate-spin" />
              )}
              {getStatusText(document.processingStatus)}
            </div>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={isDeleting || document.processingStatus !== 'complete'}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              title="Delete document"
            >
              {isDeleting ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <FiTrash2 className="w-4 h-4" />
              )}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{document.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete?.(document.id)} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
