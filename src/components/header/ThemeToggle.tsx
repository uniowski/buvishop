import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="icon" size="md">
        <span className="text-sm">{theme === "dark" ? <Moon /> : <Sun />}</span>
      </Button>
    )
  }

  return (
    <Button variant="icon" size="md" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <span className="text-sm">{theme === "dark" ? <Moon /> : <Sun />}</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
