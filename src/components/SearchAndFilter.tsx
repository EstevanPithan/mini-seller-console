import { Search, Filter, SortDesc } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange
}: SearchAndFilterProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <Input
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-[140px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                <Filter className="h-4 w-4 mr-2 text-purple-500 dark:text-purple-400" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new" className="text-indigo-700 dark:text-indigo-300">New</SelectItem>
                <SelectItem value="contacted" className="text-purple-700 dark:text-purple-300">Contacted</SelectItem>
                <SelectItem value="qualified" className="text-emerald-700 dark:text-emerald-300">Qualified</SelectItem>
                <SelectItem value="unqualified" className="text-red-700 dark:text-red-300">Unqualified</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[160px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SortDesc className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                <SelectItem value="score-desc">Score (High to Low)</SelectItem>
                <SelectItem value="score-asc">Score (Low to High)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="company-asc">Company (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}