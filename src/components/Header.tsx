'use client'

import React from 'react'
import { FiMenu, FiSun, FiMoon, FiSettings } from 'react-icons/fi'
import { useChatContext } from '@/context/ChatContext'
import { useTheme } from '@/hooks/useTheme'

interface HeaderProps {
  onToggleSidebar?: () => void
  onSettingsClick?: () => void
}

export function Header({ onToggleSidebar, onSettingsClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { toggleSidebar } = useChatContext()

  const handleToggleSidebar = () => {
    toggleSidebar()
    onToggleSidebar?.()
  }

  const handleThemeToggle = () => {
    toggleTheme()
  }

  return (
    <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Toggle sidebar"
          >
            <FiMenu className="w-5 h-5 text-gray-300" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white">Knowledge Search</h1>
            <p className="text-xs text-gray-400">Ask questions about your documents</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleThemeToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FiMoon className="w-5 h-5 text-gray-300" />
            ) : (
              <FiSun className="w-5 h-5 text-gray-300" />
            )}
          </button>
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Settings"
          >
            <FiSettings className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  )
}
