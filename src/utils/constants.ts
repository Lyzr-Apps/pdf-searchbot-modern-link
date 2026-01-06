export const AGENT_ID = '695cda46a45696ac999e3c48'
export const KNOWLEDGE_BASE_ID = '695cda41299cd9b5444f19b1'

export const SAMPLE_QUESTIONS = [
  'What is the vacation policy?',
  'How do I request time off?',
  'What are the office hours?',
  'What benefits are included?',
  'How do I submit an expense report?',
]

export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Company Handbook',
    pageCount: 45,
    uploadDate: '2024-01-15T10:30:00Z',
    processingStatus: 'complete' as const,
    size: 2458624,
  },
  {
    id: 'doc-2',
    name: 'Office Policies',
    pageCount: 28,
    uploadDate: '2024-01-10T14:20:00Z',
    processingStatus: 'complete' as const,
    size: 1574832,
  },
]

export const SAMPLE_MESSAGES = [
  {
    id: 'msg-1',
    type: 'user' as const,
    content: 'What is the vacation policy?',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'msg-2',
    type: 'assistant' as const,
    content: 'What is the vacation policy?',
    timestamp: new Date(Date.now() - 290000).toISOString(),
    answer: 'Employees are entitled to 20 days of annual leave per year. Additional days may be granted based on tenure and company policy. All vacation requests should be submitted at least 30 days in advance through the HR portal.',
    sources: ['Company Handbook', 'Office Policies'],
    confidence: 'High' as const,
    sourceContext: 'Company Handbook, Page 12: Annual leave entitlement',
  },
  {
    id: 'msg-3',
    type: 'user' as const,
    content: 'How do I request time off?',
    timestamp: new Date(Date.now() - 200000).toISOString(),
  },
  {
    id: 'msg-4',
    type: 'assistant' as const,
    content: 'How do I request time off?',
    timestamp: new Date(Date.now() - 190000).toISOString(),
    answer: 'To request time off, you can submit your request through the HR portal at least 2 weeks in advance. Your manager will review and approve the request. For emergency time off, please contact HR directly by phone or email.',
    sources: ['Company Handbook'],
    confidence: 'High' as const,
    sourceContext: 'Company Handbook, Page 13: Time off request procedures',
  },
]

export const COLORS = {
  primary: '#1a1a2e',
  primaryDark: '#0f0f1e',
  accent: '#4f46e5',
  accentLight: '#818cf8',
  text: {
    light: '#ffffff',
    dark: '#1a1a2e',
    muted: '#888888',
  },
  bg: {
    light: '#ffffff',
    dark: '#0f0f1e',
    secondary: '#16213e',
  },
  border: '#333333',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
}

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}
