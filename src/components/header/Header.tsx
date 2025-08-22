import { Link } from "@tanstack/react-router"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { auth } from "@/firebase/firebaseConfig"

export default function Header() {
  const { currentUser } = auth
  console.log(currentUser?.email, currentUser)

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-2"
            >
              👞 Buvi
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
                activeProps={{
                  className: "text-slate-900 dark:text-white font-bold",
                }}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
                activeProps={{
                  className: "text-slate-900 dark:text-white font-bold",
                }}
              >
                Shop
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="icon" size="sm" className="hidden sm:inline-flex">
              🛒 Cart (0)
            </Button>
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In {currentUser?.email}
              </Button>
            </Link>
            <ThemeToggle />

            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
