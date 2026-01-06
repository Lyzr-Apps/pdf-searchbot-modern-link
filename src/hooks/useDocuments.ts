'use client'

import { useState, useCallback } from 'react'
import { KnowledgeDocument } from '@/types'
import { uploadPDFToKnowledgeBase, deleteDocument, validatePDFFile } from '@/utils/api'

export function useDocuments() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addDocument = useCallback((doc: KnowledgeDocument) => {
    setDocuments(prev => [...prev, doc])
  }, [])

  const removeDocument = useCallback((docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }, [])

  const updateDocumentStatus = useCallback(
    (docId: string, status: KnowledgeDocument['processingStatus']) => {
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === docId ? { ...doc, processingStatus: status } : doc
        )
      )
    },
    []
  )

  const uploadFile = useCallback(
    async (file: File): Promise<boolean> => {
      setError(null)
      setLoading(true)

      // Validate file
      const validationError = validatePDFFile(file)
      if (validationError) {
        setError(validationError)
        setLoading(false)
        return false
      }

      const docId = Date.now().toString()

      // Add document with uploading status
      const newDoc: KnowledgeDocument = {
        id: docId,
        name: file.name,
        pageCount: 0,
        uploadDate: new Date().toISOString(),
        processingStatus: 'uploading',
        size: file.size,
      }

      addDocument(newDoc)

      try {
        // Update status to processing
        updateDocumentStatus(docId, 'processing')

        // Upload file
        await uploadPDFToKnowledgeBase(file)

        // Update status to complete
        updateDocumentStatus(docId, 'complete')
        setLoading(false)
        return true
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload file'
        setError(errorMessage)
        updateDocumentStatus(docId, 'error')
        setLoading(false)
        return false
      }
    },
    [addDocument, updateDocumentStatus]
  )

  const deleteFile = useCallback(
    async (docId: string): Promise<boolean> => {
      setError(null)
      setLoading(true)

      try {
        await deleteDocument(docId)
        removeDocument(docId)
        setLoading(false)
        return true
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete file'
        setError(errorMessage)
        setLoading(false)
        return false
      }
    },
    [removeDocument]
  )

  return {
    documents,
    loading,
    error,
    addDocument,
    removeDocument,
    updateDocumentStatus,
    uploadFile,
    deleteFile,
  }
}
