
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ScheduleHeaderProps {
  dateRange?: string;
  date?: Date;
  viewType?: "week" | "day";
  onDateRangeChange?: (direction: "prev" | "next") => void;
  onPublish?: () => void;
  publishCount?: number;
  activeFilter?: boolean;
  onFilterClick?: () => void;
  onCopyToWeek?: () => void;
  onCopyPrevious?: () => void;
}

export const ScheduleHeader = ({
  dateRange,
  date,
  viewType,
  onDateRangeChange,
  onPublish,
  publishCount = 0,
  activeFilter = false,
  onFilterClick,
  onCopyToWeek,
  onCopyPrevious,
}: ScheduleHeaderProps) => {
  // If dateRange is provided, use it, otherwise generate it from the date
  const displayDateRange = dateRange || (date && viewType === "week" 
    ? `${format(date, "MMM d")} - ${format(date, "MMM d, yyyy")}`
    : date ? format(date, "MMMM d, yyyy") : "");

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="h-10">
          Today
        </Button>
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none border-r border-gray-200 dark:border-gray-800 h-10 w-10"
            onClick={() => onDateRangeChange && onDateRangeChange("prev")}
          >
            <ChevronLeft size={16} />
          </Button>
          <div className="px-3 py-2 flex items-center gap-2">
            <Calendar size={16} className="text-shiftly-blue" />
            <span className="text-sm font-medium">{displayDateRange}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none border-l border-gray-200 dark:border-gray-800 h-10 w-10"
            onClick={() => onDateRangeChange && onDateRangeChange("next")}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10",
            activeFilter && "bg-primary/10 border-primary/30 text-primary"
          )}
          onClick={onFilterClick}
        >
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 ml-auto">
        {onCopyPrevious && (
          <Button variant="outline" size="sm" className="h-10" onClick={onCopyPrevious}>
            <Copy size={16} className="mr-2" />
            Copy Previous Schedule
          </Button>
        )}
        {onCopyToWeek && (
          <Button variant="outline" size="sm" className="h-10" onClick={onCopyToWeek}>
            <Copy size={16} className="mr-2" />
            Copy to Week
          </Button>
        )}
        {onPublish && (
          <Button
            size="sm"
            className="h-10 px-4 bg-shiftly-blue hover:bg-shiftly-blue/90"
            onClick={onPublish}
          >
            Publish
            {publishCount > 0 && (
              <span className="ml-2 bg-white text-shiftly-blue text-xs font-bold rounded-full px-2 py-0.5">
                {publishCount}
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
