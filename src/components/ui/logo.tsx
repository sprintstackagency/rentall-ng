
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("font-bold tracking-tight flex items-center", sizeClasses[size], className)}>
      <span className="text-brand">Rent</span>
      <span>All.ng</span>
    </div>
  );
}
