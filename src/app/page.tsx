"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Mail,
  MessagesSquare,
  ImageIcon,
  Box,
  Youtube,
  Code,
  FileText,
  PenTool,
  Check,
  FileSpreadsheet,
  Lightbulb,
  FileUser,
  Search,
  Globe,
  Linkedin,
  Presentation,
  Video,
  Newspaper,
  Target,
  Briefcase,
  Rocket,
  Smartphone,
  Package,
  MapPin,
  Users,
  Scale,
  Cookie,
  ReceiptText,
} from "lucide-react";
import { categories as categoryDefs, tools as toolDefs, ToolMeta } from "@/config/tools";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Client, Databases } from "appwrite";
import { getPublicFileViewUrl } from "@/lib/appwrite";

// Build categories list from central registry (ordered)
const categories = categoryDefs
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((c) => c.id);

// Icon mapping from registry icon ids to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessagesSquare,
  Mail,
  Globe,
  PenTool,
  Check,
  FileUser,
  Siren: FileText, // fallback if Siren is not imported; adjust if needed
  Linkedin,
  Pen: PenTool,
  ImageIcon,
  Box,
  Youtube,
  Presentation,
  FileText,
  Video,
  Newspaper,
  Code,
  Target,
  FileSpreadsheet,
  Briefcase,
  Lightbulb,
  Rocket,
  Smartphone,
  Package,
  MapPin,
  Users,
  Scale,
  Cookie,
  ReceiptText,
};

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    
    if (!endpoint || !projectId) return;
    
    const client = new Client().setEndpoint(endpoint).setProject(projectId);
    const databases = new Databases(client);
    (async () => {
      try {
        const res: any = await databases.listDocuments("content", "blogs");
        // Sort by creation date and take first 6
        const sortedBlogs = (res.documents || []).sort((a: any, b: any) => 
          new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        ).slice(0, 6);
        setLatestBlogs(sortedBlogs);
      } catch {}
    })();
  }, []);

  // Sync selected category with ?category= param
  useEffect(() => {
    const categoryParam = searchParams?.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateCategoryInUrl = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (!category || category === "all") {
      params.delete("category");
      setSelectedCategory("all");
    } else {
      params.set("category", category);
      setSelectedCategory(category);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredTools = toolDefs.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col items-center min-h-auto p-4 sm:p-6">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-4 transition-transform hover:scale-105 duration-300 inline-block">
            <Image
              src="/logo.png"
              alt="AIToolbox Logo"
              width={100}
              height={100}
              className="rounded-lg"
              priority
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-fade-in">
            AIToolbox
          </h1>
          
          <h2 className="text-lg sm:text-xl font-medium mb-3 text-muted-foreground">
            Your All-in-One AI Tool Platform
          </h2>
          
          <p className="text-sm sm:text-base mb-6 max-w-xl mx-auto text-muted-foreground">
            Unlock the power of AI with our comprehensive suite of tools for enhanced productivity.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => updateCategoryInUrl("all")}
              className="text-xs sm:text-sm"
              size="sm"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => updateCategoryInUrl(category)}
                className="text-xs cursor-pointer sm:text-sm capitalize"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {filteredTools.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No tools found matching your search
            </div>
          ) : (
            filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] ?? FileText;
              return (
                <Card
                  key={`${tool.name}-${tool.href}`}
                  className="p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
                >
                  <a href={tool.href} className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <div className="flex items-center text-primary text-sm">
                      Try now
                      <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </a>
                </Card>
              );
            })
          )}
        </div>

       
      </div>
    </div>
  );
}
