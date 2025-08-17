import { LEADS_QUERY_KEY } from './useLeads'
import { OPPORTUNITIES_QUERY_KEY } from './useOpportunities'
import { convertLeadToOpportunity } from '@/api/requests/leads/convert-lead'
import { Lead } from '@/types/lead.type'
import { Opportunity } from '@/types/opportunity.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useConvertLead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: convertLeadToOpportunity,
		onSuccess: ({ lead, opportunity }) => {
			queryClient.setQueryData(LEADS_QUERY_KEY, (oldData: Lead[] = []) => {
				return oldData.filter((l) => l.id !== lead.id)
			})

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
