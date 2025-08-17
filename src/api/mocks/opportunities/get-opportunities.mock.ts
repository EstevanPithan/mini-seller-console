import { GetOpportunitiesResponse } from '../../requests/opportunities/get-opportunities'

export const getOpportunitiesReponseMock: GetOpportunitiesResponse = {
	data: [
		{
			id: 'opp-1',
			name: 'Enterprise Software License',
			stage: 'Proposal',
			amount: 50000,
			accountName: 'TechCorp Inc.',
			leadId: 'converted-lead-1',
		},
		{
			id: 'opp-2',
			name: 'Cloud Migration Project',
			stage: 'Discovery',
			amount: 75000,
			accountName: 'DataFlow Systems',
			leadId: 'converted-lead-2',
		},
	],
	message: null,
}
