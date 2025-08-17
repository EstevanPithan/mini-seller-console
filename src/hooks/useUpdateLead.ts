import { LEADS_QUERY_KEY } from './useLeads'
import { Lead } from '@/App'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// This would typically be an API call to update a lead
async function updateLead(lead: Lead): Promise<Lead> {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 500))
	return lead
}

export function useUpdateLead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateLead,
		onSuccess: (updatedLead) => {
			// Update the leads cache optimistically
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
