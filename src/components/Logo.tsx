
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12"
  };
  
  return (
    <div className={cn("flex items-center gap-2 font-bold", className)}>
      <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
        <span className={cn("text-brand-blue px-2", sizeClasses[size])}>RAENG</span>
      </div>
      <span className="text-white font-semibold">OneHub</span>
    </div>
  );
}
