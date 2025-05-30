"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface SOSButtonProps {
  onSOS: () => Promise<any>;
}

const SOSButton = ({ onSOS }: SOSButtonProps) => {
  const [isTriggering, setIsTriggering] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const handleSOSClick = async () => {
    if (isTriggering) return;
    
    const confirmSOS = window.confirm(
      "Are you sure you want to send an SOS alert? This will notify all nearby rangers of your current location."
    );
    
    if (!confirmSOS) return;
    
    setIsTriggering(true);
    setPulseAnimation(true);
    
    try {
      console.log("Triggering SOS alert");
      await onSOS();
      alert("SOS alert sent successfully. Help is on the way.");
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("Failed to send SOS alert. Please try again or use radio if available.");
    } finally {
      setIsTriggering(false);
      setTimeout(() => setPulseAnimation(false), 2000);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-serif text-safari-text font-semibold mb-3">Emergency Signal</h2>
      <Button
        onClick={handleSOSClick}
        disabled={isTriggering}
        className={`w-full h-16 text-xl font-bold bg-safari-accent hover:bg-safari-accent/90 text-white transition-all ${
          pulseAnimation ? "animate-pulse" : ""
        }`}
      >
        {isTriggering ? "SENDING SOS..." : "SEND SOS"}
      </Button>
      <p className="mt-2 text-xs text-gray-500">
        Use only in emergency situations. Sends your current location to all rangers.
      </p>
    </div>
  );
};

export default SOSButton;
