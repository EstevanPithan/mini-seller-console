import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle, Users, TrendingUp, Sparkles } from "lucide-react";
import { Lead } from "../data/mockData";
import { SearchAndFilter } from "./SearchAndFilter";

interface LeadsListProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  onLeadClick: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
  storageKey: string;
}

interface FilterState {
  searchQuery: string;
  statusFilter: string;
  sortBy: string;
}

const defaultFilters: FilterState = {
  searchQuery: "",
  statusFilter: "all",
  sortBy: "score-desc"
};

export function LeadsList({ leads, loading, error, onLeadClick, onConvertLead, storageKey }: LeadsListProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(storageKey);
      if (savedFilters) {
        setFilters(JSON.parse(savedFilters));
      }
    } catch (err) {
      console.warn('Failed to load saved filters:', err);
    }
  }, [storageKey]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    } catch (err) {
      console.warn('Failed to save filters:', err);
    }
  }, [filters, storageKey]);

  // Filter and sort leads
  const filteredAndSortedLeads = leads
    .filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          lead.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesStatus = filters.statusFilter === "all" || lead.status === filters.statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "score-desc":
          return b.score - a.score;
        case "score-asc":
          return a.score - b.score;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "company-asc":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "new": 
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800";
      case "contacted": 
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
      case "qualified": 
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
      case "unqualified": 
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
      default: 
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8 text-center">
            <div className="space-y-2">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
        statusFilter={filters.statusFilter}
        onStatusFilterChange={(value) => handleFilterChange('statusFilter', value)}
        sortBy={filters.sortBy}
        onSortChange={(value) => handleFilterChange('sortBy', value)}
      />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                Leads 
                <span className="text-sm font-normal text-muted-foreground">
                  ({filteredAndSortedLeads.length} of {leads.length})
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAndSortedLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No leads found</h3>
              <p className="text-muted-foreground">
                {leads.length === 0 ? "No leads available" : "Try adjusting your search or filters"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <div className="hidden lg:block min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 text-sm font-medium text-muted-foreground border-b border-slate-200 dark:border-slate-700">
                  <div className="col-span-3">Contact</div>
                  <div className="col-span-2">Company</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-1">Source</div>
                  <div className="col-span-1">Score</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Action</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredAndSortedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-6 py-4 cursor-pointer transition-all duration-200 grid grid-cols-12 gap-4 items-center"
                      onClick={() => onLeadClick(lead)}
                    >
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{lead.name}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium truncate">{lead.company}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-muted-foreground truncate">{lead.email}</div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-center">
                          {lead.source}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className={`font-semibold text-lg text-center ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusVariant(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onConvertLead(lead);
                          }}
                          disabled={lead.status === 'unqualified'}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-md hover:shadow-lg transition-all duration-200 w-full"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Convert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-700">
                {filteredAndSortedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-6 py-4 cursor-pointer transition-all duration-200"
                    onClick={() => onLeadClick(lead)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.company}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusVariant(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <div>{lead.source}</div>
                          <div className="truncate max-w-[200px]">{lead.email}</div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onConvertLead(lead);
                          }}
                          disabled={lead.status === 'unqualified'}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Convert
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}