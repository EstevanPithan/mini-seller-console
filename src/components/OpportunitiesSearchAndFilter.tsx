import { Search, Filter, SortDesc } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";

interface OpportunitiesSearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stageFilter: string;
  onStageFilterChange: (stage: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function OpportunitiesSearchAndFilter({
  searchQuery,
  onSearchChange,
  stageFilter,
  onStageFilterChange,
  sortBy,
  onSortChange
}: OpportunitiesSearchAndFilterProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500 dark:text-purple-400" />
            <Input
              placeholder="Search by opportunity name or account..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={stageFilter} onValueChange={onStageFilterChange}>
              <SelectTrigger className="w-[140px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                <Filter className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                <SelectValue placeholder="Filter stage" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="discovery" className="text-blue-700 dark:text-blue-300">Discovery</SelectItem>
                <SelectItem value="proposal" className="text-purple-700 dark:text-purple-300">Proposal</SelectItem>
                <SelectItem value="negotiation" className="text-amber-700 dark:text-amber-300">Negotiation</SelectItem>
                <SelectItem value="closed-won" className="text-emerald-700 dark:text-emerald-300">Closed Won</SelectItem>
                <SelectItem value="closed-lost" className="text-red-700 dark:text-red-300">Closed Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[160px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SortDesc className="h-4 w-4 mr-2 text-purple-500 dark:text-purple-400" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="account-asc">Account (A-Z)</SelectItem>
                <SelectItem value="stage-asc">Stage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}