import { OpportunitiesSearchAndFilter } from './OpportunitiesSearchAndFilter'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Opportunity } from '@/types/opportunity.type'
import { TrendingUp, Target } from 'lucide-react'
import { useState, useEffect } from 'react'

interface OpportunitiesTableProps {
	opportunities: Opportunity[]
	loading?: boolean
	storageKey: string
}

interface FilterState {
	searchQuery: string
	stageFilter: string
	sortBy: string
}

const defaultFilters: FilterState = {
	searchQuery: '',
	stageFilter: 'all',
	sortBy: 'amount-desc',
}

export function OpportunitiesTable({ opportunities, loading = false, storageKey }: OpportunitiesTableProps) {
	const [filters, setFilters] = useState<FilterState>(defaultFilters)

	const filteredAndSortedOpportunities = opportunities
		.filter((opp) => {
			const matchesSearch =
				opp.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
				opp.accountName.toLowerCase().includes(filters.searchQuery.toLowerCase())
			const matchesStage = filters.stageFilter === 'all' || opp.stage.toLowerCase() === filters.stageFilter
			return matchesSearch && matchesStage
		})
		.sort((a, b) => {
			switch (filters.sortBy) {
				case 'amount-desc':
					return (b.amount || 0) - (a.amount || 0)
				case 'amount-asc':
					return (a.amount || 0) - (b.amount || 0)
				case 'name-asc':
					return a.name.localeCompare(b.name)
				case 'account-asc':
					return a.accountName.localeCompare(b.accountName)
				case 'stage-asc':
					return a.stage.localeCompare(b.stage)
				default:
					return 0
			}
		})

	function handleFilterChange(key: keyof FilterState, value: string) {
		setFilters((prev) => ({ ...prev, [key]: value }))
	}

	function getStageVariant(stage: string) {
		switch (stage.toLowerCase()) {
			case 'discovery':
				return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
			case 'proposal':
				return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
			case 'negotiation':
				return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
			case 'closed-won':
				return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
			case 'closed-lost':
				return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
			default:
				return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
		}
	}

	function formatAmount(amount?: number | null) {
		if (!amount) return 'TBD'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
		}).format(amount)
	}

	function getTotalValue() {
		return filteredAndSortedOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0)
	}

	useEffect(() => {
		try {
			const savedFilters = localStorage.getItem(storageKey)
			if (savedFilters) {
				setFilters(JSON.parse(savedFilters))
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn('Failed to load saved filters:', err)
		}
	}, [storageKey])

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(filters))
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn('Failed to save filters:', err)
		}
	}, [filters, storageKey])

	if (loading) {
		return (
			<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
						Opportunities
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{[...Array(4)].map((_, i) => (
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

	return (
		<div className="space-y-6">
			<OpportunitiesSearchAndFilter
				searchQuery={filters.searchQuery}
				onSearchChange={(value) => handleFilterChange('searchQuery', value)}
				stageFilter={filters.stageFilter}
				onStageFilterChange={(value) => handleFilterChange('stageFilter', value)}
				sortBy={filters.sortBy}
				onSortChange={(value) => handleFilterChange('sortBy', value)}
			/>

			<Card className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
				<CardHeader className="border-b border-slate-200 dark:border-slate-700">
					<CardTitle className="flex items-center gap-2">
						<div className="rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-2 text-white">
							<Target className="h-5 w-5" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								Opportunities
								<span className="text-muted-foreground text-sm font-normal">
									({filteredAndSortedOpportunities.length} of {opportunities.length})
								</span>
							</div>
							{filteredAndSortedOpportunities.length > 0 && (
								<div className="text-muted-foreground text-sm font-normal">
									Total Pipeline: {formatAmount(getTotalValue())}
								</div>
							)}
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{filteredAndSortedOpportunities.length === 0 ?
						<div className="py-12 text-center">
							<div className="mx-auto mb-4 w-fit rounded-full bg-slate-100 p-4 dark:bg-slate-800">
								<Target className="text-muted-foreground h-8 w-8" />
							</div>
							<h3 className="mb-2 font-medium">No opportunities found</h3>
							<p className="text-muted-foreground">
								{opportunities.length === 0 ?
									'Convert leads to create opportunities'
								:	'Try adjusting your search or filters'}
							</p>
						</div>
					:	<div className="overflow-x-auto">
							{/* Desktop Table */}
							<div className="hidden min-w-full lg:block">
								{/* Table Header */}
								<div className="text-muted-foreground grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium dark:border-slate-700 dark:bg-slate-800/50">
									<div className="col-span-5">Opportunity Name</div>
									<div className="col-span-3">Account</div>
									<div className="col-span-2">Stage</div>
									<div className="col-span-2">Amount</div>
								</div>

								{/* Table Rows */}
								<div className="divide-y divide-slate-200 dark:divide-slate-700">
									{filteredAndSortedOpportunities.map((opp) => (
										<div
											key={opp.id}
											className="group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
										>
											<div className="col-span-5">
												<div className="flex items-center gap-3">
													<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
														<TrendingUp className="h-5 w-5" />
													</div>
													<div className="min-w-0">
														<div className="truncate font-medium">{opp.name}</div>
													</div>
												</div>
											</div>
											<div className="col-span-3">
												<div className="truncate font-medium">{opp.accountName}</div>
											</div>
											<div className="col-span-2">
												<span
													className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStageVariant(opp.stage)}`}
												>
													{opp.stage}
												</span>
											</div>
											<div className="col-span-2">
												<div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
													{formatAmount(opp.amount)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Mobile/Tablet Cards */}
							<div className="divide-y divide-slate-200 lg:hidden dark:divide-slate-700">
								{filteredAndSortedOpportunities.map((opp) => (
									<div
										key={opp.id}
										className="group px-6 py-4 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
									>
										<div className="space-y-3">
											<div className="flex items-center gap-3">
												<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
													<TrendingUp className="h-5 w-5" />
												</div>
												<div className="min-w-0 flex-1">
													<div className="truncate font-medium">{opp.name}</div>
													<div className="text-muted-foreground text-sm">{opp.accountName}</div>
												</div>
												<span
													className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStageVariant(opp.stage)}`}
												>
													{opp.stage}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
													{formatAmount(opp.amount)}
												</div>
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
