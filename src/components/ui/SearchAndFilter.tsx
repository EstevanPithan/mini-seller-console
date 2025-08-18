import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Search, Filter, SortDesc, X } from 'lucide-react'

interface FilterOption {
	value: string
	label: string
	className?: string
}

interface SortOption {
	value: string
	label: string
}

interface SearchAndFilterProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	searchPlaceholder?: string
	filterValue: string
	onFilterChange: (value: string) => void
	filterPlaceholder?: string
	filterOptions: FilterOption[]
	sortBy: string
	onSortChange: (sort: string) => void
	sortOptions: SortOption[]
	onClearFilters?: () => void
}

export function SearchAndFilter({
	searchQuery,
	onSearchChange,
	searchPlaceholder = 'Search...',
	filterValue,
	onFilterChange,
	filterPlaceholder = 'Filter',
	filterOptions,
	sortBy,
	onSortChange,
	sortOptions,
	onClearFilters,
}: SearchAndFilterProps) {
	return (
		<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
			<div className="space-y-4 p-4">
				<div className="flex flex-col gap-4 sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-purple-500 dark:text-purple-400" />
						<Input
							placeholder={searchPlaceholder}
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							className="border-slate-300 bg-white pl-10 transition-colors focus:border-purple-500 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800"
						/>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row">
						<div className="flex gap-2">
							<Select
								value={filterValue}
								onValueChange={onFilterChange}
							>
								<SelectTrigger className="w-full min-w-[140px] border-slate-300 bg-white sm:w-[140px] dark:border-slate-600 dark:bg-slate-800">
									<Filter className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
									<SelectValue placeholder={filterPlaceholder} />
								</SelectTrigger>
								<SelectContent className="border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
									{filterOptions.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
											className={option.className}
										>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={sortBy}
								onValueChange={onSortChange}
							>
								<SelectTrigger className="w-full min-w-[160px] border-slate-300 bg-white sm:w-[160px] dark:border-slate-600 dark:bg-slate-800">
									<SortDesc className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent className="border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
									{sortOptions.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
										>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{onClearFilters && (
							<Button
								variant="outline"
								onClick={onClearFilters}
								className="flex w-full items-center justify-center gap-2 border-slate-300 bg-white text-slate-700 hover:cursor-pointer hover:bg-slate-50 sm:w-auto dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
							>
								<X className="h-4 w-4" />
								Clear Filters
							</Button>
						)}
					</div>
				</div>
			</div>
		</Card>
	)
}
