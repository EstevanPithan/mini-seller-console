import { Alert, AlertDescription } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUpdateLead } from '@/hooks/useUpdateLead'
import { Lead } from '@/types/lead.type'
import { X, Mail, Building, Globe, TrendingUp, Save, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface LeadDetailPanelProps {
	lead: Lead
	isOpen: boolean
	onClose: () => void
}

const STATUS_VARIANTS = {
	new: 'default' as const,
	contacted: 'secondary' as const,
	qualified: 'outline' as const,
	unqualified: 'destructive' as const,
}

type StatusVariantType = keyof typeof STATUS_VARIANTS

export function LeadDetailPanel({ lead, isOpen, onClose }: LeadDetailPanelProps) {
	const [editedLead, setEditedLead] = useState<Lead>(lead)
	const [isEditing, setIsEditing] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const updateLeadMutation = useUpdateLead()

	function validateEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	function handleSave() {
		setError(null)

		if (!validateEmail(editedLead.email)) {
			setError('Please enter a valid email address')
			return
		}

		updateLeadMutation.mutate(editedLead, {
			onSuccess: (updatedLead) => {
				setEditedLead(updatedLead)
				setIsEditing(false)
			},
			onError: () => {
				setError('Failed to save changes. Please try again.')
			},
		})
	}

	function handleCancel() {
		setEditedLead(lead)
		setIsEditing(false)
		setError(null)
	}

	function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
		return STATUS_VARIANTS[status as StatusVariantType] || 'default'
	}

	function getScoreColor(score: number) {
		if (score >= 80) return 'text-green-600'
		if (score >= 60) return 'text-yellow-600'
		return 'text-red-600'
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50">
			<div
				className="absolute inset-0 bg-black/20"
				onClick={onClose}
			/>
			<div className="bg-background fixed right-0 top-0 h-full w-full max-w-lg border-l shadow-xl">
				<div className="flex h-full flex-col">
					<div className="border-b p-6">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Lead Details</h2>
							<Button
								variant="ghost"
								size="icon"
								onClick={onClose}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="flex-1 space-y-6 overflow-y-auto p-6">
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{/* Lead Info */}
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center gap-2 text-lg">
									<TrendingUp className="h-5 w-5" />
									Lead Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label>Name</Label>
										<p className="mt-1 font-medium">{lead.name}</p>
									</div>
									<div>
										<Label>Score</Label>
										<p className={`mt-1 text-lg font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</p>
									</div>
								</div>

								<div>
									<Label>Company</Label>
									<p className="mt-1 flex items-center gap-2 font-medium">
										<Building className="h-4 w-4" />
										{lead.company}
									</p>
								</div>

								<div>
									<Label>Source</Label>
									<p className="mt-1 flex items-center gap-2">
										<Globe className="h-4 w-4" />
										{lead.source}
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Editable Fields */}
						<Card>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg">Editable Information</CardTitle>
									{!isEditing && (
										<Button
											variant="outline"
											onClick={() => setIsEditing(true)}
										>
											Edit
										</Button>
									)}
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label htmlFor="email">Email</Label>
									{isEditing ?
										<Input
											id="email"
											type="email"
											value={editedLead.email}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setEditedLead({ ...editedLead, email: e.target.value })
											}
											className="mt-1"
										/>
									:	<p className="mt-1 flex items-center gap-2">
											<Mail className="h-4 w-4" />
											{lead.email}
										</p>
									}
								</div>

								<div>
									<Label htmlFor="status">Status</Label>
									{isEditing ?
										<Select
											value={editedLead.status}
											onValueChange={(value: string) =>
												setEditedLead({ ...editedLead, status: value as Lead['status'] })
											}
										>
											<SelectTrigger className="mt-1">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="new">New</SelectItem>
												<SelectItem value="contacted">Contacted</SelectItem>
												<SelectItem value="qualified">Qualified</SelectItem>
												<SelectItem value="unqualified">Unqualified</SelectItem>
											</SelectContent>
										</Select>
									:	<div className="mt-1">
											<Badge
												variant={getStatusVariant(lead.status)}
												className="capitalize"
											>
												{lead.status}
											</Badge>
										</div>
									}
								</div>

								{isEditing && (
									<div className="flex gap-2 pt-4">
										<Button
											onClick={handleSave}
											disabled={updateLeadMutation.isPending}
											className="flex-1"
										>
											<Save className="mr-2 h-4 w-4" />
											{updateLeadMutation.isPending ? 'Saving...' : 'Save Changes'}
										</Button>
										<Button
											variant="outline"
											onClick={handleCancel}
											disabled={updateLeadMutation.isPending}
										>
											Cancel
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
