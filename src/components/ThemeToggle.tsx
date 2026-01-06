'use client'

import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-gray-700" />
      ) : (
        <FiSun className="w-5 h-5 text-gray-300" />
      )}
    </button>
  )
}
