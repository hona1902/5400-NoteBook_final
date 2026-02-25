"use client"

import { useThemeStore } from "@/lib/stores/theme-store"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useThemeStore((state) => state.theme)
  const systemTheme = useThemeStore((state) => state.getSystemTheme())
  const effectiveTheme = theme === 'system' ? systemTheme : theme

  return (
    <Sonner
      theme={effectiveTheme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <span style={{ fontSize: '18px' }}>✅</span>,
        error: <span style={{ fontSize: '18px' }}>❌</span>,
        warning: <span style={{ fontSize: '18px' }}>⚠️</span>,
        info: <span style={{ fontSize: '18px' }}>ℹ️</span>,
        loading: <span style={{ fontSize: '18px', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>,
      }}
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans, 'Fira Sans', sans-serif)",
          fontSize: "14px",
          borderRadius: "10px",
        },
        classNames: {
          toast: "group-[.toaster]:shadow-lg group-[.toaster]:border",
          success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#AE1C3F]",
          error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-600",
          warning: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-yellow-500",
          info: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-blue-500",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--popover-foreground)",
          "--success-border": "var(--border)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
