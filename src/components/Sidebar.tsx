'use client'

import React from 'react'
import { FiX } from 'react-icons/fi'
import { useChatContext } from '@/context/ChatContext'
import { KnowledgeManager } from './KnowledgeManager'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useChatContext()

  const handleClose = () => {
    toggleSidebar()
    onClose?.()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-700 z-40 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="font-semibold text-white">Menu</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <KnowledgeManager />
        </div>
      </aside>
    </>
  )
}
