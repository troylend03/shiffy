
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Copy, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  isFirstTimeUser?: boolean;
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
  isFirstTimeUser = false,
}: ScheduleHeaderProps) => {
  // If dateRange is provided, use it, otherwise generate it from the date
  const displayDateRange = dateRange || (date && viewType === "week" 
    ? `${format(date, "MMM d")} - ${format(date, "MMM d, yyyy")}`
    : date ? format(date, "MMMM d, yyyy") : "");

  const renderTooltip = (content: React.ReactNode, children: React.ReactNode) => {
    if (!isFirstTimeUser) return children;
    
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="relative">
            {children}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="p-3 max-w-[250px]" side="bottom">
          {content}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {renderTooltip(
            <p>Jump back to today's schedule with a single click.</p>,
            <Button variant="outline" size="sm" className="h-10">
              Today
            </Button>
          )}
          
          {renderTooltip(
            <p>Navigate through different weeks or days using these controls.</p>,
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
          )}
          
          {renderTooltip(
            <p>Filter schedules by employees, positions, or shift status.</p>,
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
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {onCopyPrevious && renderTooltip(
            <p>Save time by copying shifts from a previous schedule period.</p>,
            <Button variant="outline" size="sm" className="h-10" onClick={onCopyPrevious}>
              <Copy size={16} className="mr-2" />
              Copy Previous Schedule
            </Button>
          )}
          
          {onCopyToWeek && renderTooltip(
            <p>Easily duplicate today's schedule to the entire week.</p>,
            <Button variant="outline" size="sm" className="h-10" onClick={onCopyToWeek}>
              <Copy size={16} className="mr-2" />
              Copy to Week
            </Button>
          )}
          
          {onPublish && renderTooltip(
            <p>Publish your schedule to notify all team members about their shifts.</p>,
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
          
          {isFirstTimeUser && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <HelpCircle size={20} className="text-shiftly-blue" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-3 max-w-[250px]">
                <p className="font-medium text-sm">Need help?</p>
                <p className="text-sm mt-1">Click this button anytime to view tutorials and tips for using the schedule page.</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
