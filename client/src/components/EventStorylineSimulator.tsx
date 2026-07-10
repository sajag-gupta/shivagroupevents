import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, ChevronRight, CheckCircle2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StorylineStep {
  time: string;
  title: string;
  desc: string;
  video: string;
  operations: string[];
}

interface EventStorylineSimulatorProps {
  category: string;
  steps: StorylineStep[];
  accentColor?: string;
}

export const EventStorylineSimulator: React.FC<EventStorylineSimulatorProps> = ({
  category,
  steps,
  accentColor = "#C9A227",
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  // Auto-advance loop when playing is enabled
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 7000); // Shift every 7 seconds
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  // Restart video playback when step changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Handle autoplay policy block silently
      });
    }
  }, [activeStep]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false); // Pause auto-advancing when user manually clicks
  };

  return (
    <div className="my-16 p-8 bg-gray-50 border border-gray-100 rounded-sm shadow-sm">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accentColor }}>
            Attend the Event
          </p>
          <h3 className="font-serif text-3xl text-gray-900">
            {category} Storyline Simulator
          </h3>
          <p className="text-gray-400 text-sm font-sans mt-2 max-w-xl mx-auto">
            Experience the event day chronology. Cycle through the timeline to see how we coordinate and sequence operations live.
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Columns: Step Selector */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={cn(
                  "text-left p-4 border transition-all duration-300 rounded-sm flex items-start gap-4 cursor-pointer",
                  activeStep === idx
                    ? "bg-white shadow-sm border-gray-200"
                    : "bg-transparent border-transparent hover:bg-gray-100/50"
                )}
              >
                {/* Time Badge */}
                <div
                  className={cn(
                    "px-2.5 py-1 text-[10px] tracking-wider font-semibold font-sans uppercase shrink-0 border",
                    activeStep === idx
                      ? "text-white"
                      : "text-gray-400 border-gray-200"
                  )}
                  style={{
                    backgroundColor: activeStep === idx ? accentColor : "transparent",
                    borderColor: activeStep === idx ? accentColor : "rgba(0,0,0,0.1)",
                  }}
                >
                  {step.time}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={cn(
                      "font-serif text-base leading-tight mb-1",
                      activeStep === idx ? "text-gray-900 font-bold" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed line-clamp-2">
                    {step.desc}
                  </p>
                </div>

                {activeStep === idx && (
                  <ChevronRight size={16} className="shrink-0 mt-1" style={{ color: accentColor }} />
                )}
              </button>
            ))}

            {/* Simulation Controls */}
            <div className="mt-4 flex items-center justify-between px-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 text-xs tracking-wider uppercase font-semibold font-sans cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: accentColor }}
              >
                {isPlaying ? (
                  <>
                    <Pause size={14} /> Pause Sequence
                  </>
                ) : (
                  <>
                    <Play size={14} /> Autoplay Sequence
                  </>
                )}
              </button>
              <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest animate-pulse">
                {isPlaying ? "● LIVE SIMULATION" : "○ SIMULATION PAUSED"}
              </span>
            </div>
          </div>

          {/* Right Columns: Video Player Screen & Operations Checklist */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-5 rounded-sm shadow-sm flex flex-col gap-5">
            {/* Video Box */}
            <div className="relative aspect-video bg-black overflow-hidden shadow-inner border border-gray-200">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                key={steps[activeStep].video}
              >
                <source src={steps[activeStep].video} type="video/mp4" />
              </video>
              {/* Event Badge overlay */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-[10px] tracking-wider uppercase font-semibold font-sans">
                Event Camera #{activeStep + 1}
              </div>
            </div>

            {/* Operational Tasks Checklist */}
            <div>
              <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold font-sans mb-3 flex items-center gap-1.5">
                <Volume2 size={12} style={{ color: accentColor }} /> SGE On-Ground Coordination Tasks
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {steps[activeStep].operations.map((op, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-gray-50 border border-gray-100 p-2.5 rounded-sm">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                    <span className="text-gray-600 text-xs font-sans leading-snug">{op}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
