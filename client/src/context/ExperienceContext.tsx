import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

export type ExperienceType =
  | "none"
  | "home"
  | "weddings"
  | "corporate"
  | "celebrity-shows"
  | "award-ceremonies"
  | "concerts"
  | "brand-activations"
  | "private-events"
  | "college-festivals";

interface ExperienceContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  experienceType: ExperienceType;
  audioTrack: string | null;
  cinematicActive: boolean;
  setCinematicActive: (active: boolean) => void;
  cinematicScrollActive: boolean;
  setCinematicScrollActive: (active: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

const AUDIO_TRACKS: Record<ExperienceType, string | null> = {
  none: null,
  home: "/audio/home_ambient.mp3",
  weddings: "/audio/wedding_ambient.mp3",
  corporate: "/audio/corporate_ambient.mp3",
  "celebrity-shows": "/audio/celebrity_ambient.mp3",
  "award-ceremonies": "/audio/awards_ambient.mp3",
  concerts: "/audio/concert_ambient.mp3",
  "brand-activations": "/audio/brand_ambient.mp3",
  "private-events": "/audio/private_ambient.mp3",
  "college-festivals": "/audio/college_ambient.mp3",
};

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    return localStorage.getItem("sge_sound_enabled") === "true";
  });
  const [experienceType, setExperienceType] = useState<ExperienceType>("none");
  const [cinematicActive, setCinematicActive] = useState<boolean>(false);
  const [cinematicScrollActive, setCinematicScrollActive] = useState<boolean>(false);
  const [location] = useLocation();

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem("sge_sound_enabled", String(enabled));
  };

  useEffect(() => {
    // Map URL routes to specific experience visual and audio types
    if (location === "/") {
      setExperienceType("home");
    } else if (location === "/services/weddings") {
      setExperienceType("weddings");
    } else if (location === "/services/corporate") {
      setExperienceType("corporate");
    } else if (location === "/services/celebrity-shows") {
      setExperienceType("celebrity-shows");
    } else if (location === "/services/award-ceremonies") {
      setExperienceType("award-ceremonies");
    } else if (location === "/services/concerts") {
      setExperienceType("concerts");
    } else if (location === "/services/brand-activations") {
      setExperienceType("brand-activations");
    } else if (location === "/services/private-events") {
      setExperienceType("private-events");
    } else if (location === "/services/college-festivals") {
      setExperienceType("college-festivals");
    } else {
      setExperienceType("none");
    }
  }, [location]);

  const audioTrack = AUDIO_TRACKS[experienceType];

  return (
    <ExperienceContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        experienceType,
        audioTrack,
        cinematicActive,
        setCinematicActive,
        cinematicScrollActive,
        setCinematicScrollActive,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
};
