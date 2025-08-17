import { useState } from "react";
import { X, Mail, Building, Globe, TrendingUp, Save, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Lead } from "../data/mockData";

interface LeadDetailPanelProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
}

export function LeadDetailPanel({ lead, isOpen, onClose, onSave }: LeadDetailPanelProps) {
  const [editedLead, setEditedLead] = useState<Lead>(lead);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    setError(null);
    
    if (!validateEmail(editedLead.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(editedLead);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
    setError(null);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary"; 
      case "qualified": return "outline";
      case "unqualified": return "destructive";
      default: return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-background border-l shadow-xl">
        <div className="flex flex-col h-full">
          <div className="border-b p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Lead Details</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Lead Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
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
                    <p className={`mt-1 font-semibold text-lg ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Company</Label>
                  <p className="mt-1 font-medium flex items-center gap-2">
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
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedLead.email}
                      onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {lead.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  {isEditing ? (
                    <Select
                      value={editedLead.status}
                      onValueChange={(value) => setEditedLead({ ...editedLead, status: value as Lead['status'] })}
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
                  ) : (
                    <div className="mt-1">
                      <Badge variant={getStatusVariant(lead.status)} className="capitalize">
                        {lead.status}
                      </Badge>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      disabled={isSaving}
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
  );
}