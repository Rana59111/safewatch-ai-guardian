
import React from "react";
import { Camera, SquareAlert, Video, VideoOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { Camera as CameraType } from "@/types";

interface CameraFeedProps {
  camera: CameraType;
  onClick?: () => void;
  className?: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ camera, onClick, className }) => {
  const { name, location, status, feedUrl, threatLevel } = camera;

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg", 
        threatLevel === "high" && "ring-2 ring-red-500",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Camera className="h-4 w-4" />
            {name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <StatusBadge status={status} type="status" size="sm" />
            {threatLevel !== "unknown" && (
              <StatusBadge status={threatLevel} type="threat" size="sm" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-3">
        <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
          {status === "online" ? (
            <img 
              src={feedUrl} 
              alt={`${name} Camera Feed`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
              <VideoOff className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Feed unavailable</p>
            </div>
          )}
          
          {/* AI detection overlay */}
          {status === "online" && threatLevel === "high" && (
            <div className="absolute top-0 left-0 right-0 p-2 bg-red-500 bg-opacity-80 text-white flex items-center justify-between">
              <span className="text-xs font-medium flex items-center">
                <SquareAlert className="h-4 w-4 mr-1" />
                Threat Detected
              </span>
              <span className="animate-pulse-alert text-xs">Recording</span>
            </div>
          )}
          
          {/* Camera ID overlay */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs py-0.5 px-2 rounded">
            CAM {camera.id.toString().padStart(2, '0')}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 text-xs text-gray-500">
        <div className="flex justify-between w-full">
          <span>{location}</span>
          <span className="flex items-center">
            <Video className="h-3 w-3 mr-1" />
            Live
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CameraFeed;
