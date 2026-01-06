'use client'

import React, { useCallback, useState } from 'react'
import { FiUpload, FiLoader } from 'react-icons/fi'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
  error?: string | null
}

export function UploadZone({ onFileSelect, isLoading = false, error }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        onFileSelect(files[0])
      }
    },
    [onFileSelect]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files[0])
      }
    },
    [onFileSelect]
  )

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        disabled={isLoading}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className={isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}>
        <div className="flex justify-center mb-3">
          {isLoading ? (
            <FiLoader className="w-8 h-8 text-blue-400 animate-spin" />
          ) : (
            <FiUpload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <p className="text-sm font-medium text-white">
          {isLoading ? 'Uploading...' : 'Drop your PDF here or click to select'}
        </p>
        <p className="text-xs text-gray-400 mt-2">Maximum file size: 10 MB</p>
      </label>
      {error && (
        <p className="text-xs text-red-500 mt-3">{error}</p>
      )}
    </div>
  )
}
