// import api from '@/config/api'
import { Lead } from '@/types/lead.type'
import { Opportunity } from '@/types/opportunity.type'
import { z } from 'zod'

const convertLeadResponseSchema = z.object({
	data: z
		.object({
			lead: z.object({
				id: z.string(),
				name: z.string(),
				company: z.string(),
				email: z.string(),
				source: z.string(),
				score: z.number(),
				status: z.enum(['new', 'contacted', 'qualified', 'unqualified']),
			}),
			opportunity: z.object({
				id: z.string(),
				name: z.string(),
				stage: z.string(),
				amount: z.number().nullable(),
				accountName: z.string(),
				leadId: z.string(),
			}),
		})
		.nullable(),
	message: z.string().nullable(),
})

export type ConvertLeadResponse = z.infer<typeof convertLeadResponseSchema>

export async function convertLeadToOpportunity(lead: Lead) {
	// //If there was a backend, i would call here
	// const response = await api.post(`/leads/${lead.id}/convert`, { leadId: lead.id })

	await new Promise((resolve) => setTimeout(resolve, 500))

	// Mock response simulating successful conversion
	if (lead.status === 'unqualified') {
		throw new Error('Cannot convert unqualified leads')
	}

	const newOpportunity: Opportunity = {
		id: `opp-${Date.now()}`,
		name: `${lead.company} - Sales Opportunity`,
		stage: 'Discovery',
		accountName: lead.company,
		leadId: lead.id,
		amount: null,
	}

	const response = {
		data: {
			lead,
			opportunity: newOpportunity,
		},
		message: 'Lead converted to opportunity successfully',
	}

	const validatedResponse = convertLeadResponseSchema.parse(response)
	return validatedResponse.data!
}
