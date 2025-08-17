// import api from '@/config/api'
import { getOpportunitiesReponseMock } from '@/api/mocks/opportunities/get-opportunities.mock'
import { z } from 'zod'

const getOpportunitiesResponseSchema = z.object({
	data: z
		.array(
			z.object({
				id: z.string(),
				name: z.string(),
				stage: z.string(),
				amount: z.number().nullable(),
				accountName: z.string(),
				leadId: z.string(),
			}),
		)
		.nullable(),
	message: z.string().nullable(),
})

export type GetOpportunitiesResponse = z.infer<typeof getOpportunitiesResponseSchema>

export async function getOpportunities() {
	// //If there was a backend, i would call here
	// const response = await api.get('/opportunities')

	await new Promise((resolve) => setTimeout(resolve, 1000))
	const response = getOpportunitiesReponseMock
	const validatedResponse = getOpportunitiesResponseSchema.parse(response)
	return validatedResponse.data
}
