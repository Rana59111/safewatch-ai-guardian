
import React from "react";
import { cn } from "@/lib/utils";
import { AlertLevel, ThreatLevel } from "@/types";

interface StatusBadgeProps {
  status: string;
  type?: "status" | "threat" | "alert";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "status",
  size = "md",
  className,
}) => {
  // Define size classes
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1.5",
  };

  // Define background colors based on status and type
  const getBgColor = () => {
    if (type === "status") {
      switch (status) {
        case "online":
          return "bg-safewatch-success";
        case "offline":
          return "bg-safewatch-alert";
        case "maintenance":
          return "bg-safewatch-warning";
        default:
          return "bg-gray-500";
      }
    } else if (type === "threat") {
      const threatLevel = status as ThreatLevel;
      switch (threatLevel) {
        case "low":
          return "bg-green-500";
        case "medium":
          return "bg-yellow-500";
        case "high":
          return "bg-red-600";
        case "unknown":
          return "bg-gray-500";
        default:
          return "bg-gray-500";
      }
    } else if (type === "alert") {
      const alertLevel = status as AlertLevel;
      switch (alertLevel) {
        case "low":
          return "bg-blue-500";
        case "medium":
          return "bg-yellow-500";
        case "high":
          return "bg-orange-500";
        case "critical":
          return "bg-red-600";
        default:
          return "bg-gray-500";
      }
    }
    return "bg-gray-500";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium text-white",
        sizeClasses[size],
        getBgColor(),
        className
      )}
    >
      {type === "status" && status === "online" && (
        <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse"></span>
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
