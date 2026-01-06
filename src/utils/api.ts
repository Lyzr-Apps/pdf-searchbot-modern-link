import { Message, ChatResponse, KnowledgeDocument } from '@/types'

const AGENT_ID = '695cda46a45696ac999e3c48'
const KNOWLEDGE_BASE_ID = '695cda41299cd9b5444f19b1'

export async function sendMessageToAgent(
  message: string,
  conversationHistory: Message[]
): Promise<ChatResponse> {
  try {
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.type === 'assistant' ? msg.answer || msg.content : msg.content,
    }))

    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
        message: message,
        conversation_history: formattedHistory,
      }),
    })

    if (!response.ok) {
      throw new Error(`Agent request failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle the response structure from the API
    let responseData = data

    // If response is nested in data.response object, unwrap it
    if (data.response && typeof data.response === 'object' && !Array.isArray(data.response)) {
      responseData = data.response
    }

    // Parse the agent response, with fallbacks
    return {
      answer: responseData.answer || responseData.result || typeof responseData === 'string' ? String(responseData) : 'Unable to process response',
      sources: Array.isArray(responseData.sources) ? responseData.sources : [],
      confidence: responseData.confidence || 'Medium',
      sourceContext: responseData.sourceContext || '',
    }
  } catch (error) {
    console.error('Error sending message to agent:', error)
    throw error
  }
}

export async function uploadPDFToKnowledgeBase(
  file: File
): Promise<{ success: boolean; message: string }> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('rag_id', KNOWLEDGE_BASE_ID)

    const response = await fetch('/api/knowledge-base/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      message: data.message || 'File uploaded successfully',
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export async function deleteDocument(
  documentId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`/api/knowledge-base/documents/${documentId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      message: data.message || 'Document deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export function validatePDFFile(file: File, maxSizeMB: number = 10): string | null {
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
    return 'Only PDF files are supported'
  }

  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`
  }

  return null
}
