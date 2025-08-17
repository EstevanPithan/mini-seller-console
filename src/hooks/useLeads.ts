import { getLeads } from '@/api/requests/leads/get-leads'
import { useQuery } from '@tanstack/react-query'

export const LEADS_QUERY_KEY = ['leads'] as const

export function useLeads() {
	return useQuery({
		queryKey: LEADS_QUERY_KEY,
		queryFn: getLeads,
		select: (data) => data.data || [],
	})
}
