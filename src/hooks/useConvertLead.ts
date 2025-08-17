import { LEADS_QUERY_KEY } from './useLeads'
import { OPPORTUNITIES_QUERY_KEY } from './useOpportunities'
import { Lead, Opportunity } from '@/App'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// This would typically be an API call to convert a lead to opportunity
async function convertLeadToOpportunity(lead: Lead): Promise<{ lead: Lead; opportunity: Opportunity }> {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 500))

	if (lead.status === 'unqualified') {
		throw new Error('Cannot convert unqualified leads')
	}

	const newOpportunity: Opportunity = {
		id: `opp-${Date.now()}`,
		name: `${lead.company} - Sales Opportunity`,
		stage: 'Discovery',
		accountName: lead.company,
		leadId: lead.id,
		amount: undefined,
	}

	return { lead, opportunity: newOpportunity }
}

export function useConvertLead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: convertLeadToOpportunity,
		onSuccess: ({ lead, opportunity }) => {
			// Remove lead from leads cache
			queryClient.setQueryData(LEADS_QUERY_KEY, (oldData: Lead[] = []) => {
				return oldData.filter((l) => l.id !== lead.id)
			})

			// Add opportunity to opportunities cache
			queryClient.setQueryData(OPPORTUNITIES_QUERY_KEY, (oldData: Opportunity[] = []) => {
				return [...oldData, opportunity]
			})

			toast.success(`Successfully converted ${lead.name} to opportunity`)
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to convert lead')
		},
	})
}
