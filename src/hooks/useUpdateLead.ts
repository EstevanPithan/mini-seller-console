import { LEADS_QUERY_KEY } from './useLeads'
import { updateLead } from '@/api/requests/leads/update-lead'
import { Lead } from '@/types/lead.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateLead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateLead,
		onMutate: async (updatedLead: Lead) => {
			await queryClient.cancelQueries({ queryKey: LEADS_QUERY_KEY })

			const previousLeads = queryClient.getQueryData<Lead[]>(LEADS_QUERY_KEY)

			queryClient.setQueryData(LEADS_QUERY_KEY, (oldData: Lead[] = []) => {
				return oldData.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
			})

			return { previousLeads }
		},
		onSuccess: () => {
			toast.success('Lead updated successfully')
		},
		onError: (error, _updatedLead, context) => {
			if (context?.previousLeads) {
				queryClient.setQueryData(LEADS_QUERY_KEY, context.previousLeads)
			}
			toast.error(error.message || 'Failed to update lead')

			// Only refetch on error to restore correct state - commented out for mocked data
			// queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY })
		},
	})
}
