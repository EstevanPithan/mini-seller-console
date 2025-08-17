// import api from '@/config/api'
import { getLeadsReponseMock } from '@/api/mocks/leads/get-leads.mock'
import { z } from 'zod'

const getLeadsResponseSchema = z.object({
	data: z
		.array(
			z.object({
				id: z.string(),
				name: z.string(),
				company: z.string(),
				email: z.string(),
				source: z.string(),
				score: z.number(),
				status: z.enum(['new', 'contacted', 'qualified', 'unqualified']),
			}),
		)
		.nullable(),
	message: z.string().nullable(),
})

export type GetLeadsResponse = z.infer<typeof getLeadsResponseSchema>

export async function getLeads() {
	// //If ther was a backend, i would call here
	// const response = await api.get('/leads')

	const response = getLeadsReponseMock
	return getLeadsResponseSchema.parse(response)
}
