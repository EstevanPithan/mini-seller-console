import { getOpportunities } from '@/api/requests/opportunities/get-opportunities'
import { useQuery } from '@tanstack/react-query'

export const OPPORTUNITIES_QUERY_KEY = ['opportunities'] as const

export function useOpportunities() {
	return useQuery({
		queryKey: OPPORTUNITIES_QUERY_KEY,
		queryFn: getOpportunities,
		select: (data) => data.data || [],
	})
}
