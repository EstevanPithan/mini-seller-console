import { SearchAndFilter } from '../SearchAndFilter'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { useConvertLead } from '@/hooks/useConvertLead'
import { usePersistedFilters } from '@/hooks/usePersistedFilters'
import { Lead } from '@/types/lead.type'
import { AlertCircle, Users } from 'lucide-react'

interface LeadsListProps {
	leads: Lead[]
	loading: boolean
	error: string | null
	onLeadClick: (lead: Lead) => void
	onConvertSuccess?: () => void
}

interface FilterState extends Record<string, string> {
	searchQuery: string
	statusFilter: string
	sortBy: string
}

const defaultFilters: FilterState = {
	searchQuery: '',
	statusFilter: 'all',
	sortBy: 'score-desc',
}

const STATUS_VARIANTS = {
	new: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
	contacted:
		'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
	qualified:
		'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
	unqualified: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
} as const

type StatusVariantType = keyof typeof STATUS_VARIANTS

const SORTING_FUNCTIONS = {
	'score-desc': (a: Lead, b: Lead) => b.score - a.score,
	'score-asc': (a: Lead, b: Lead) => a.score - b.score,
	'name-asc': (a: Lead, b: Lead) => a.name.localeCompare(b.name),
	'company-asc': (a: Lead, b: Lead) => a.company.localeCompare(b.company),
} as const

type SortingFunctionType = keyof typeof SORTING_FUNCTIONS

export function LeadsList({ leads, loading, error, onLeadClick, onConvertSuccess }: LeadsListProps) {
	const LEAD_FILTER_KEY = 'mini-seller-leads-filters'

	const [filters, handleFilterChange, , resetFilters] = usePersistedFilters(defaultFilters, LEAD_FILTER_KEY)
	const convertLeadMutation = useConvertLead()

	const filteredAndSortedLeads = leads
		.filter((lead) => {
			const matchesSearch =
				lead.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
				lead.company.toLowerCase().includes(filters.searchQuery.toLowerCase())
			const matchesStatus = filters.statusFilter === 'all' || lead.status === filters.statusFilter
			return matchesSearch && matchesStatus
		})
		.sort((a, b) => {
			const sortFunction = SORTING_FUNCTIONS[filters.sortBy as SortingFunctionType]
			return sortFunction ? sortFunction(a, b) : 0
		})

	function handleConvertLead(lead: Lead) {
		onConvertSuccess?.()
		convertLeadMutation.mutate(lead)
	}

	function getStatusVariant(status: string) {
		return (
			STATUS_VARIANTS[status as StatusVariantType] ||
			'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
		)
	}

	function getScoreColor(score: number) {
		if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
		if (score >= 60) return 'text-amber-600 dark:text-amber-400'
		return 'text-red-600 dark:text-red-400'
	}

	if (loading) {
		return (
			<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
						Leads
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="space-y-2"
						>
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					))}
				</CardContent>
			</Card>
		)
	}

	if (error) {
		return (
			<Card className="border-0 shadow-lg">
				<CardContent className="pt-6">
					<div className="flex items-center justify-center py-8 text-center">
						<div className="space-y-2">
							<AlertCircle className="text-destructive mx-auto h-8 w-8" />
							<p className="text-muted-foreground">{error}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="space-y-6">
			<SearchAndFilter
				searchQuery={filters.searchQuery}
				onSearchChange={(value) => handleFilterChange('searchQuery', value)}
				statusFilter={filters.statusFilter}
				onStatusFilterChange={(value) => handleFilterChange('statusFilter', value)}
				sortBy={filters.sortBy}
				onSortChange={(value) => handleFilterChange('sortBy', value)}
				onClearFilters={resetFilters}
			/>

			<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
				<CardHeader className="border-b border-slate-200 dark:border-slate-700">
					<CardTitle className="flex items-center gap-2">
						<div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white">
							<Users className="h-5 w-5" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								Leads
								<span className="text-muted-foreground text-sm font-normal">
									({filteredAndSortedLeads.length} of {leads.length})
								</span>
							</div>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{filteredAndSortedLeads.length === 0 ?
						<div className="py-12 text-center">
							<div className="mx-auto mb-4 w-fit rounded-full bg-slate-100 p-4 dark:bg-slate-800">
								<Users className="text-muted-foreground h-8 w-8" />
							</div>
							<h3 className="mb-2 font-medium">No leads found</h3>
							<p className="text-muted-foreground">
								{leads.length === 0 ? 'No leads available' : 'Try adjusting your search or filters'}
							</p>
						</div>
					:	<div className="overflow-x-auto">
							{/* Desktop Table */}
							<div className="hidden min-w-full lg:block">
								{/* Table Header */}
								<div className="text-muted-foreground grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium dark:border-slate-700 dark:bg-slate-800/50">
									<div className="col-span-3">Contact</div>
									<div className="col-span-2">Company</div>
									<div className="col-span-2">Email</div>
									<div className="col-span-1">Source</div>
									<div className="col-span-1">Score</div>
									<div className="col-span-2">Status</div>
									<div className="col-span-1">Action</div>
								</div>

								{/* Table Rows */}
								<div className="divide-y divide-slate-200 dark:divide-slate-700">
									{filteredAndSortedLeads.map((lead) => (
										<div
											key={lead.id}
											className="group grid cursor-pointer grid-cols-12 items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
											onClick={() => onLeadClick(lead)}
										>
											<div className="col-span-3">
												<div className="flex items-center gap-3">
													<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-medium text-white">
														{lead.name
															.split(' ')
															.map((n) => n[0])
															.join('')}
													</div>
													<div className="min-w-0">
														<div className="truncate font-medium">{lead.name}</div>
													</div>
												</div>
											</div>
											<div className="col-span-2">
												<div className="truncate font-medium">{lead.company}</div>
											</div>
											<div className="col-span-2">
												<div className="text-muted-foreground truncate text-sm">{lead.email}</div>
											</div>
											<div className="col-span-1">
												<div className="rounded-md bg-slate-100 px-2 py-1 text-center text-sm dark:bg-slate-800">
													{lead.source}
												</div>
											</div>
											<div className="col-span-1">
												<div className={`text-center text-lg font-semibold ${getScoreColor(lead.score)}`}>
													{lead.score}
												</div>
											</div>
											<div className="col-span-2">
												<span
													className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusVariant(lead.status)}`}
												>
													{lead.status}
												</span>
											</div>
											<div className="col-span-1">
												<Button
													size="sm"
													onClick={(e) => {
														e.stopPropagation()
														handleConvertLead(lead)
													}}
													disabled={lead.status === 'unqualified'}
													className="w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg dark:text-white"
												>
													Convert Lead
												</Button>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Mobile/Tablet Cards */}
							<div className="divide-y divide-slate-200 lg:hidden dark:divide-slate-700">
								{filteredAndSortedLeads.map((lead) => (
									<div
										key={lead.id}
										className="group cursor-pointer px-6 py-4 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
										onClick={() => onLeadClick(lead)}
									>
										<div className="space-y-3">
											<div className="flex items-center gap-3">
												<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-medium text-white">
													{lead.name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</div>
												<div className="min-w-0 flex-1">
													<div className="font-medium">{lead.name}</div>
													<div className="text-muted-foreground text-sm">{lead.company}</div>
												</div>
												<div className="text-right">
													<div className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</div>
													<span
														className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusVariant(lead.status)}`}
													>
														{lead.status}
													</span>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="text-muted-foreground text-sm">
													<div>{lead.source}</div>
													<div className="max-w-[200px] truncate">{lead.email}</div>
												</div>
												<Button
													size="sm"
													onClick={(e) => {
														e.stopPropagation()
														handleConvertLead(lead)
													}}
													disabled={lead.status === 'unqualified'}
													className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:text-white"
												>
													Convert Lead
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					}
				</CardContent>
			</Card>
		</div>
	)
}
