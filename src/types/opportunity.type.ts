export interface Opportunity {
	id: string
	name: string
	stage: string
	amount?: number | null
	accountName: string
	leadId: string
}
