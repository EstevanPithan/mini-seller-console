import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { TrendingUp, DollarSign, Target, AlertCircle } from "lucide-react";
import { Opportunity } from "../data/mockData";
import { OpportunitiesSearchAndFilter } from "./OpportunitiesSearchAndFilter";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  loading?: boolean;
  storageKey: string;
}

interface FilterState {
  searchQuery: string;
  stageFilter: string;
  sortBy: string;
}

const defaultFilters: FilterState = {
  searchQuery: "",
  stageFilter: "all",
  sortBy: "amount-desc"
};

export function OpportunitiesTable({ opportunities, loading = false, storageKey }: OpportunitiesTableProps) {
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

  // Filter and sort opportunities
  const filteredAndSortedOpportunities = opportunities
    .filter(opp => {
      const matchesSearch = opp.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          opp.accountName.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesStage = filters.stageFilter === "all" || opp.stage.toLowerCase() === filters.stageFilter;
      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "amount-desc":
          return (b.amount || 0) - (a.amount || 0);
        case "amount-asc":
          return (a.amount || 0) - (b.amount || 0);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "account-asc":
          return a.accountName.localeCompare(b.accountName);
        case "stage-asc":
          return a.stage.localeCompare(b.stage);
        default:
          return 0;
      }
    });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStageVariant = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "discovery": 
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
      case "proposal": 
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
      case "negotiation": 
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
      case "closed-won": 
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
      case "closed-lost": 
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
      default: 
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600";
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return "TBD";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalValue = () => {
    return filteredAndSortedOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <OpportunitiesSearchAndFilter
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
        stageFilter={filters.stageFilter}
        onStageFilterChange={(value) => handleFilterChange('stageFilter', value)}
        sortBy={filters.sortBy}
        onSortChange={(value) => handleFilterChange('sortBy', value)}
      />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                Opportunities 
                <span className="text-sm font-normal text-muted-foreground">
                  ({filteredAndSortedOpportunities.length} of {opportunities.length})
                </span>
              </div>
              {filteredAndSortedOpportunities.length > 0 && (
                <div className="text-sm font-normal text-muted-foreground">
                  Total Pipeline: {formatAmount(getTotalValue())}
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAndSortedOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No opportunities found</h3>
              <p className="text-muted-foreground">
                {opportunities.length === 0 ? "Convert leads to create opportunities" : "Try adjusting your search or filters"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <div className="hidden lg:block min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 text-sm font-medium text-muted-foreground border-b border-slate-200 dark:border-slate-700">
                  <div className="col-span-5">Opportunity Name</div>
                  <div className="col-span-3">Account</div>
                  <div className="col-span-2">Stage</div>
                  <div className="col-span-2">Amount</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredAndSortedOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-6 py-4 transition-all duration-200 grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{opp.name}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="font-medium truncate">{opp.accountName}</div>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStageVariant(opp.stage)}`}>
                          {opp.stage}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                          {formatAmount(opp.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-700">
                {filteredAndSortedOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-6 py-4 transition-all duration-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{opp.name}</div>
                          <div className="text-sm text-muted-foreground">{opp.accountName}</div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStageVariant(opp.stage)}`}>
                          {opp.stage}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                          {formatAmount(opp.amount)}
                        </div>
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