
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14"
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/cbe24588-625e-4a2e-a919-3c7c1214a913.png" 
        alt="RAENG OneHub" 
        className={cn(sizeClasses[size])}
      />
      {showText && (
        <span className="text-white font-semibold hidden md:block">RAENG OneHub</span>
      )}
    </div>
  );
}
