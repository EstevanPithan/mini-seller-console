import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Search, Filter, SortDesc, X } from 'lucide-react'

interface SearchAndFilterProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	statusFilter: string
	onStatusFilterChange: (status: string) => void
	sortBy: string
	onSortChange: (sort: string) => void
	onClearFilters?: () => void
}

export function SearchAndFilter({
	searchQuery,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	sortBy,
	onSortChange,
	onClearFilters,
}: SearchAndFilterProps) {
	return (
		<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
			<div className="space-y-4 p-4">
				<div className="flex flex-col gap-4 sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-indigo-500 dark:text-indigo-400" />
						<Input
							placeholder="Search by name or company..."
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							className="border-slate-300 bg-white pl-10 transition-colors focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
						/>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row">
						<div className="flex gap-2">
							<Select
								value={statusFilter}
								onValueChange={onStatusFilterChange}
							>
								<SelectTrigger className="w-full min-w-[140px] border-slate-300 bg-white sm:w-[140px] dark:border-slate-600 dark:bg-slate-800">
									<Filter className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
									<SelectValue placeholder="Filter status" />
								</SelectTrigger>
								<SelectContent className="border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem
										value="new"
										className="text-indigo-700 dark:text-indigo-300"
									>
										New
									</SelectItem>
									<SelectItem
										value="contacted"
										className="text-purple-700 dark:text-purple-300"
									>
										Contacted
									</SelectItem>
									<SelectItem
										value="qualified"
										className="text-emerald-700 dark:text-emerald-300"
									>
										Qualified
									</SelectItem>
									<SelectItem
										value="unqualified"
										className="text-red-700 dark:text-red-300"
									>
										Unqualified
									</SelectItem>
								</SelectContent>
							</Select>

							<Select
								value={sortBy}
								onValueChange={onSortChange}
							>
								<SelectTrigger className="w-full min-w-[160px] border-slate-300 bg-white sm:w-[160px] dark:border-slate-600 dark:bg-slate-800">
									<SortDesc className="mr-2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent className="border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
									<SelectItem value="score-desc">Score (High to Low)</SelectItem>
									<SelectItem value="score-asc">Score (Low to High)</SelectItem>
									<SelectItem value="name-asc">Name (A-Z)</SelectItem>
									<SelectItem value="company-asc">Company (A-Z)</SelectItem>
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
