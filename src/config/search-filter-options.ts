// Configuration objects for search and filter components

export const leadStatusOptions = [
	{ value: 'all', label: 'All Status' },
	{ value: 'new', label: 'New', className: 'text-indigo-700 dark:text-indigo-300' },
	{ value: 'contacted', label: 'Contacted', className: 'text-purple-700 dark:text-purple-300' },
	{ value: 'qualified', label: 'Qualified', className: 'text-emerald-700 dark:text-emerald-300' },
	{ value: 'unqualified', label: 'Unqualified', className: 'text-red-700 dark:text-red-300' },
]

export const leadSortOptions = [
	{ value: 'score-desc', label: 'Score (High to Low)' },
	{ value: 'score-asc', label: 'Score (Low to High)' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'company-asc', label: 'Company (A-Z)' },
]

export const opportunityStageOptions = [
	{ value: 'all', label: 'All Stages' },
	{ value: 'discovery', label: 'Discovery', className: 'text-blue-700 dark:text-blue-300' },
	{ value: 'proposal', label: 'Proposal', className: 'text-purple-700 dark:text-purple-300' },
	{ value: 'negotiation', label: 'Negotiation', className: 'text-amber-700 dark:text-amber-300' },
	{ value: 'closed-won', label: 'Closed Won', className: 'text-emerald-700 dark:text-emerald-300' },
	{ value: 'closed-lost', label: 'Closed Lost', className: 'text-red-700 dark:text-red-300' },
]

export const opportunitySortOptions = [
	{ value: 'amount-desc', label: 'Amount (High to Low)' },
	{ value: 'amount-asc', label: 'Amount (Low to High)' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'account-asc', label: 'Account (A-Z)' },
	{ value: 'stage-asc', label: 'Stage' },
]
