
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Phone, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSOS } from "@/hooks/useSOS";

const SOSButton: React.FC = () => {
  const { triggerSOS } = useSOS();
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  const handleSOSPress = () => {
    setIsPressed(true);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSOSConfirm();
          return 3;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };
  
  const handleSOSCancel = () => {
    setIsPressed(false);
    setCountdown(3);
  };
  
  const handleSOSConfirm = () => {
    setIsPressed(false);
    triggerSOS.mutate("User triggered SOS from dashboard");
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium flex items-center">
          <Shield className="mr-2 h-5 w-5 text-blue-600" />
          Emergency SOS
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        {!isPressed ? (
          <div className="text-center">
            <div className="relative mb-4">
              <Button
                className={cn(
                  "h-24 w-24 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg",
                  "transition-all duration-300 transform hover:scale-105"
                )}
                onClick={handleSOSPress}
              >
                SOS
              </Button>
              <span className="absolute inset-0 rounded-full animate-ripple border-2 border-red-500 opacity-50 h-24 w-24"></span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Press and hold for emergency assistance
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="border rounded-lg p-3 text-center">
                <Phone className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                <div className="text-xs">Contact</div>
                <div className="font-medium">Emergency</div>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <AlertCircle className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                <div className="text-xs">Alert</div>
                <div className="font-medium">Security</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 text-lg font-medium">Sending Alert in</div>
            <div className="text-4xl font-bold text-red-600 mb-6">
              {countdown}
            </div>
            <Button 
              variant="outline" 
              onClick={handleSOSCancel}
              className="transition-all duration-300 hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SOSButton;
