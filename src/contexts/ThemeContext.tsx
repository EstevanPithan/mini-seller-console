import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
	darkMode: boolean
	toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme deve ser usado dentro de um ThemeProvider')

	return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [darkMode, setDarkMode] = useState(typeof window !== 'undefined' && localStorage.getItem('THEME') === 'dark')

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
		localStorage.setItem('THEME', darkMode ? 'dark' : 'light')
	}, [darkMode])

	function toggleDarkMode() {
		return setDarkMode((prev) => !prev)
	}

	return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
}
