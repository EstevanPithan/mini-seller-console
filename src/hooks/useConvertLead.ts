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
		onMutate: async (lead: Lead) => {
			await queryClient.cancelQueries({ queryKey: LEADS_QUERY_KEY })
			await queryClient.cancelQueries({ queryKey: OPPORTUNITIES_QUERY_KEY })

			const previousLeads = queryClient.getQueryData<Lead[]>(LEADS_QUERY_KEY)
			const previousOpportunities = queryClient.getQueryData<Opportunity[]>(OPPORTUNITIES_QUERY_KEY)

			const optimisticOpportunity: Opportunity = {
				id: `temp-opp-${Date.now()}`,
				name: `${lead.company} - Sales Opportunity`,
				stage: 'Discovery',
				accountName: lead.company,
				leadId: lead.id,
				amount: null,
			}

			queryClient.setQueryData(LEADS_QUERY_KEY, (oldData: Lead[] = []) => {
				return oldData.filter((l) => l.id !== lead.id)
			})

			queryClient.setQueryData(OPPORTUNITIES_QUERY_KEY, (oldData: Opportunity[] = []) => {
				return [...oldData, optimisticOpportunity]
			})

			return { previousLeads, previousOpportunities, optimisticOpportunity }
		},
		onSuccess: ({ lead, opportunity }, _originalLead, context) => {
			if (context?.optimisticOpportunity) {
				queryClient.setQueryData(OPPORTUNITIES_QUERY_KEY, (oldData: Opportunity[] = []) => {
					return oldData.map((opp) => (opp.id === context.optimisticOpportunity.id ? opportunity : opp))
				})
			}
			toast.success(`Successfully converted ${lead.name} to opportunity`)
		},
		onError: (error, _lead, context) => {
			if (context?.previousLeads) {
				queryClient.setQueryData(LEADS_QUERY_KEY, context.previousLeads)
			}
			if (context?.previousOpportunities) {
				queryClient.setQueryData(OPPORTUNITIES_QUERY_KEY, context.previousOpportunities)
			}
			toast.error(error.message || 'Failed to convert lead')

			// Only refetch on error to restore correct state - commented out for mocked data
			// queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY })
			// queryClient.invalidateQueries({ queryKey: OPPORTUNITIES_QUERY_KEY })
		},
	})
}
