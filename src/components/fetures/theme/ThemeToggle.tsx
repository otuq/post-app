"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        <Button variant="outline" size="icon" disabled aria-label="テーマ切り替え">
            <span className="h-5 w-5" />
        </Button>
    }
    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="テーマ切り替え"
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}
        >
            {theme === "dark" ? (
                <Sun />
            ) : (
                <Moon />
            )}
        </Button>

    )
}