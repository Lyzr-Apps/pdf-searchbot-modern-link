import { NextRequest, NextResponse } from 'next/server'

const LYZR_KNOWLEDGE_BASE_URL = 'https://rag-prod.studio.lyzr.ai/ingest'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const ragId = formData.get('rag_id') as string

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!ragId) {
      return NextResponse.json(
        { success: false, error: 'No rag_id provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File size must be less than 10MB` },
        { status: 400 }
      )
    }

    // Create form data for Lyzr API
    const lyzrFormData = new FormData()
    lyzrFormData.append('file', file)
    lyzrFormData.append('rag_id', ragId)

    // Send to Lyzr knowledge base
    const response = await fetch(LYZR_KNOWLEDGE_BASE_URL, {
      method: 'POST',
      body: lyzrFormData,
      headers: {
        'x-api-key': process.env.LYZR_API_KEY || '',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully',
        data,
      })
    } else {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          error: `Upload failed: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('Knowledge base upload error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
