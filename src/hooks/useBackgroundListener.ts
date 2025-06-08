
import { useEffect, useRef, useState } from 'react';
import { BackgroundListener } from '@/services/BackgroundListener';
import { useToast } from '@/hooks/use-toast';

export const useBackgroundListener = (onWakeWordDetected: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const listenerRef = useRef<BackgroundListener | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize background listener
    listenerRef.current = new BackgroundListener((transcript) => {
      onWakeWordDetected(transcript);
      toast({
        title: "Jarvis Activated",
        description: "Wake word detected, Jarvis is listening...",
        duration: 2000,
      });
    });

    return () => {
      if (listenerRef.current) {
        listenerRef.current.stopListening();
      }
    };
  }, [onWakeWordDetected, toast]);

  const startBackgroundListening = async () => {
    if (!listenerRef.current) return;

    const success = await listenerRef.current.startListening();
    if (success) {
      setIsListening(true);
      setHasPermission(true);
      toast({
        title: "Background Listening Active",
        description: "Jarvis is now listening for 'Hey Jarvis' commands in the background.",
      });
    } else {
      setHasPermission(false);
      toast({
        title: "Permission Required",
        description: "Please allow microphone access to enable background listening.",
        variant: "destructive",
      });
    }
  };

  const stopBackgroundListening = () => {
    if (listenerRef.current) {
      listenerRef.current.stopListening();
      setIsListening(false);
      toast({
        title: "Background Listening Stopped",
        description: "Jarvis is no longer listening in the background.",
      });
    }
  };

  return {
    isListening,
    hasPermission,
    startBackgroundListening,
    stopBackgroundListening,
  };
};
