// import api from '@/config/api'
import { Lead } from '@/types/lead.type'
import { z } from 'zod'

const updateLeadResponseSchema = z.object({
	data: z
		.object({
			id: z.string(),
			name: z.string(),
			company: z.string(),
			email: z.string(),
			source: z.string(),
			score: z.number(),
			status: z.enum(['new', 'contacted', 'qualified', 'unqualified']),
		})
		.nullable(),
	message: z.string().nullable(),
})

export type UpdateLeadResponse = z.infer<typeof updateLeadResponseSchema>

export async function updateLead(lead: Lead): Promise<Lead> {
	// //If there was a backend, i would call here
	// const response = await api.put(`/leads/${lead.id}`, lead)
	await new Promise((resolve) => setTimeout(resolve, 500))

	// Mock response simulating successful update
	const response = {
		data: lead,
		message: 'Lead updated successfully',
	}

	const validatedResponse = updateLeadResponseSchema.parse(response)
	return validatedResponse.data!
}
