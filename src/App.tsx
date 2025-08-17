import { DashboardHeader } from './components/DashboardHeader'
import { LeadDetailPanel } from './components/lead/LeadDetailPanel'
import { LeadsList } from './components/lead/LeadsList'
import { OpportunitiesList } from './components/opportunities/OpportunitiesList'
import { Toaster } from './components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { useLeads } from './hooks/useLeads'
import { useOpportunities } from './hooks/useOpportunities'
import { Lead } from './types/lead.type'
import { Users, Target } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
	ACTIVE_TAB: 'mini-seller-active-tab',
	LEADS_FILTERS: 'mini-seller-leads-filters',
	OPPORTUNITIES_FILTERS: 'mini-seller-opportunities-filters',
}

export default function App() {
	const { data: leads = [], isLoading: leadsLoading, error: leadsError } = useLeads()
	const { data: opportunities = [], isLoading: opportunitiesLoading } = useOpportunities()

	const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
	const [activeTab, setActiveTab] = useState('leads')

	useEffect(() => {
		const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB)
		if (savedTab) {
			setActiveTab(savedTab)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab)
	}, [activeTab])

	const handleLeadClick = useCallback((lead: Lead) => {
		setSelectedLead(lead)
	}, [])

	const handleConvertSuccess = useCallback(() => {
		if (selectedLead) {
			setSelectedLead(null)
		}
		setActiveTab('opportunities')
	}, [selectedLead])

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
			<DashboardHeader />

			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-6"
				>
					<TabsList className="grid w-full grid-cols-2 border border-slate-200 bg-white shadow-sm lg:w-[400px] dark:border-slate-700 dark:bg-slate-800">
						<TabsTrigger
							value="leads"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
						>
							<Users className="h-4 w-4" />
							Leads
							<span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 data-[state=active]:bg-white/20 data-[state=active]:text-white dark:bg-slate-700 dark:text-slate-300">
								{leads.length}
							</span>
						</TabsTrigger>
						<TabsTrigger
							value="opportunities"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
						>
							<Target className="h-4 w-4" />
							Opportunities
							<span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 data-[state=active]:bg-white/20 data-[state=active]:text-white dark:bg-slate-700 dark:text-slate-300">
								{opportunities.length}
							</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="leads"
						className="space-y-6"
					>
						<LeadsList
							leads={leads}
							loading={leadsLoading}
							error={leadsError?.message || null}
							onLeadClick={handleLeadClick}
							onConvertSuccess={handleConvertSuccess}
							storageKey={STORAGE_KEYS.LEADS_FILTERS}
						/>
					</TabsContent>

					<TabsContent
						value="opportunities"
						className="space-y-6"
					>
						<OpportunitiesList
							opportunities={opportunities}
							loading={opportunitiesLoading}
							storageKey={STORAGE_KEYS.OPPORTUNITIES_FILTERS}
						/>
					</TabsContent>
				</Tabs>
			</main>

			{selectedLead && (
				<LeadDetailPanel
					lead={selectedLead}
					isOpen={!!selectedLead}
					onClose={() => setSelectedLead(null)}
				/>
			)}

			<Toaster />
		</div>
	)
}
