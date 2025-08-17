import { LEADS_QUERY_KEY } from './useLeads'
import { updateLead } from '@/api/requests/leads/update-lead'
import { Lead } from '@/types/lead.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateLead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateLead,
		onSuccess: (updatedLead) => {
			queryClient.setQueryData(LEADS_QUERY_KEY, (oldData: Lead[] = []) => {
				return oldData.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
			})
			toast.success('Lead updated successfully')
		},
		onError: () => {
			toast.error('Failed to update lead')
		},
	})
}
