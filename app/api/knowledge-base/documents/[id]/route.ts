import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'No document ID provided' },
        { status: 400 }
      )
    }

    // Note: In a real implementation, this would call the Lyzr API
    // to delete the document from the knowledge base
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: `Document ${documentId} deleted successfully`,
    })
  } catch (error) {
    console.error('Knowledge base delete error:', error)
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
