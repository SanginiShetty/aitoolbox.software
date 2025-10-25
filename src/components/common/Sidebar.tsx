"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Menu,
  MessagesSquare,
  ImageIcon,
  Box,
  Code,
  FileText,
  PenTool,
  Check,
  FileSpreadsheet,
  Lightbulb,
  Settings,
  Search,
  Rocket,
  Video,
  Newspaper,
  Smartphone,
  Package,
  Globe,
  MapPin,
  Target,
  Linkedin,
  Presentation,
  Users,
  Scale,
  Cookie,
  ReceiptText,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { categories as categoryDefs, tools as toolDefs } from "@/config/tools";

// Category icons
const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  writing: PenTool,
  communication: MessagesSquare,
  visual: ImageIcon,
  content: FileText,
  development: Code,
  professional: FileSpreadsheet,
  creativity: Lightbulb,
  travel: MapPin,
  learning: Target,
  community: Users,
  legal: Scale,
};

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const grouped = useMemo(() => {
    const byCat = new Map<string, { label: string; ids: string[] }>();
    const labelMap = new Map(categoryDefs.map((c) => [c.id, c.label] as const));
    for (const c of categoryDefs) byCat.set(c.id, { label: c.label, ids: [] });
    for (const t of toolDefs) {
      if (!byCat.has(t.category)) continue;
      byCat.get(t.category)!.ids.push(t.href);
    }
    return byCat;
  }, []);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result: { id: string; label: string; count: number }[] = [];
    for (const [id, { label, ids }] of grouped.entries()) {
      if (!q) {
        if (ids.length > 0) result.push({ id, label, count: ids.length });
        continue;
      }
      // match category label or any tool name in that category
      const nameMatch = toolDefs.some(
        (t) => t.category === id && t.name.toLowerCase().includes(q)
      );
      if (label.toLowerCase().includes(q) || nameMatch) {
        result.push({ id, label, count: ids.length });
      }
    }
    return result;
  }, [grouped, searchQuery]);

  const onNavigateCategory = (catId: string) => {
    router.push(catId ? `/?category=${catId}` : "/");
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Top search & collapse button - FIXED HEIGHT */}
      <div className="h-16 flex-shrink-0 bg-background border-b px-4 py-2 flex items-center">
        {!isCollapsed && (
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {/* Collapse / Expand toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-2", isCollapsed && "mx-auto")}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar width</span>
          </Button>
        )}
      </div>

      {/* Scrollable Tools List - CALCULATED HEIGHT */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto px-2 py-2 sidebar-scrollbar"
          style={{
            maxHeight: "calc(100% - 0px)",
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--border)) transparent",
          }}
        >
          <div className="space-y-1">
            {filteredCategories.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                No categories found
              </div>
            ) : isCollapsed ? (
              filteredCategories.map(({ id, label, count }) => {
                const Icon = categoryIcon[id] ?? FileText;
                const active = false; // collapsed view does not show active states per-category
                return (
                  <Tooltip key={id} delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onNavigateCategory(id)}
                        className={cn(
                          "w-full flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="capitalize">
                      {label} ({count})
                    </TooltipContent>
                  </Tooltip>
                );
              })
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredCategories.map(({ id, label, count }) => {
                  const Icon = categoryIcon[id] ?? FileText;
                  return (
                    <AccordionItem key={id} value={id} className="border-none">
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <AccordionTrigger className="px-3 py-2 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span className="text-sm">{label}</span>
                            </div>
                          </AccordionTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="capitalize">
                          {label} ({count})
                        </TooltipContent>
                      </Tooltip>
                      <AccordionContent className="px-3 pb-2">
                        <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => onNavigateCategory(id)}>
                          View all {label} ({count})
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>
      </div>

      {/* Settings Button - FIXED HEIGHT */}
      <div className="h-14 flex-shrink-0 bg-background border-t p-3 flex flex-col items-center">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Link href="/settings" className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-full gap-2",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
                size="sm"
              >
                <Settings className="h-4 w-4" />
                {!isCollapsed && "Settings"}
              </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Settings</TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );

  // For desktop condition
  if (!isMobile) {
    return (
      <aside
        className={cn(
          "border-r bg-background h-[calc(100vh-4rem)] flex-shrink-0 hidden md:block transition-all duration-300 overflow-hidden",
          isCollapsed ? "w-16" : "w-[280px]"
        )}
      >
        {sidebarContent}
      </aside>
    );
  }

  // For mobile condition
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-3 left-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
