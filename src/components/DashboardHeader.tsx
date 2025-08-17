import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface DashboardHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function DashboardHeader({ darkMode, toggleDarkMode }: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mini Seller Console
              </h1>
              <p className="text-muted-foreground">Manage your leads and opportunities</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}