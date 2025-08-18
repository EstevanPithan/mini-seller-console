import { Button } from './ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun, Wallet } from 'lucide-react'

export function DashboardHeader() {
	const { darkMode, toggleDarkMode } = useTheme()

	return (
		<header className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
			<div className="px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white shadow-lg">
							<Wallet className="h-6 w-6" />
						</div>
						<div>
							<h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-semibold text-transparent">
								Mini Seller Console
							</h1>
							<p className="text-muted-foreground">Manage your leads and opportunities</p>
						</div>
					</div>
					<Button
						variant="outline"
						size="icon"
						onClick={toggleDarkMode}
						className="border-slate-300 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
					>
						{darkMode ?
							<Sun className="h-4 w-4 text-amber-500" />
						:	<Moon className="h-4 w-4 text-indigo-600" />}
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</header>
	)
}
