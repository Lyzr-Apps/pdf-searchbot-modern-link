'use client'

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useChatContext } from '@/context/ChatContext'
import { useDocuments } from '@/hooks/useDocuments'
import { UploadZone } from './UploadZone'
import { DocumentCard } from './DocumentCard'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { formatFileSize } from '@/utils/api'

export function KnowledgeManager() {
  const { documents: ctxDocuments, addDocument, removeDocument } = useChatContext()
  const { uploadFile, deleteFile, loading: docLoading, error: docError } = useDocuments()
  const [expanded, setExpanded] = useState(true)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleFileSelect = async (file: File) => {
    setUploadError(null)
    const success = await uploadFile(file)
    if (success) {
      // Add to context
      addDocument({
        id: Date.now().toString(),
        name: file.name,
        pageCount: 0,
        uploadDate: new Date().toISOString(),
        processingStatus: 'complete',
        size: file.size,
      })
    } else {
      setUploadError(docError)
    }
  }

  const handleDelete = async (docId: string) => {
    setDeletingId(docId)
    const success = await deleteFile(docId)
    if (success) {
      removeDocument(docId)
    }
    setDeletingId(null)
  }

  const totalSize = ctxDocuments.reduce((sum, doc) => sum + doc.size, 0)

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-white">Manage Knowledge</h3>
          <p className="text-xs text-gray-400 mt-1">
            {ctxDocuments.length} documents • {formatFileSize(totalSize)}
          </p>
        </div>
        {expanded ? (
          <FiChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-700 p-4 space-y-4">
          <UploadZone
            onFileSelect={handleFileSelect}
            isLoading={docLoading}
            error={uploadError || docError}
          />

          {ctxDocuments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Uploaded Documents
              </h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {ctxDocuments.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onDelete={handleDelete}
                    isDeleting={deletingId === doc.id}
                  />
                ))}
              </div>
            </div>
          )}

          {ctxDocuments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-400">No documents yet</p>
              <p className="text-xs text-gray-500 mt-1">Upload a PDF to get started</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
