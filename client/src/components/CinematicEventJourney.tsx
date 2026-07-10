import React, { useEffect, useRef, useState } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { CheckCircle2, Shield, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Chapter {
  id: string;
  number: string;
  title: string;
  quote?: string;
  desc?: string;
  video: string;
  audioPath?: string;
  operations: string[];
  chordFreqs: number[];
}

interface CinematicEventJourneyProps {
  categoryName: string;
  chapters: Chapter[];
  accentColor: string;
}

export const CinematicEventJourney: React.FC<CinematicEventJourneyProps> = ({
  categoryName,
  chapters,
  accentColor,
}) => {
  const { soundEnabled, setSoundEnabled, setCinematicActive, cinematicScrollActive, setCinematicScrollActive } = useExperience();
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  
  // Element refs
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Dual-channel audio cross-fading refs
  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const activeAudPlayer = useRef<"A" | "B">("A");
  const audioIntervalRef = useRef<number | null>(null);

  // Web Audio API fallback synthesizer states
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthOscRef = useRef<OscillatorNode[]>([]);
  const synthGainRef = useRef<GainNode | null>(null);
  const activeChordFreqs = useRef<number[]>([]);

  // Tell layout to silence global AudioEngine when inside this section
  useEffect(() => {
    setCinematicActive(true);
    return () => {
      setCinematicActive(false);
      setCinematicScrollActive(false);
      stopAudioPlayers();
      stopSynth();
    };
  }, []);

  // 100% deterministic scroll listener to calculate active chapter card index using geometry
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Check if this sticky cinematic section is currently active in the viewport
      const isStickyActive = rect.top <= 80 && rect.bottom > 80;
      setCinematicScrollActive(isStickyActive);

      const viewportHeight = window.innerHeight;
      const viewportMid = viewportHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      chapterRefs.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        // Calculate the distance of the card's midpoint from the viewport's midpoint
        const cardMid = rect.top + rect.height / 2;
        const dist = Math.abs(cardMid - viewportMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveChapterIdx(bestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Run once initially, and also with a small delay to ensure DOM layout has settled
    handleScroll();
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      setCinematicScrollActive(false);
    };
  }, [chapters.length, setCinematicScrollActive]);

  // Play active video and pause inactive videos
  useEffect(() => {
    chapters.forEach((_, idx) => {
      const video = videoRefs.current[idx];
      if (!video) return;

      if (idx === activeChapterIdx) {
        // Play active video
        video.play().catch((err) => {
          console.log("Muted video playback deferred:", err);
        });
      } else {
        // Pause inactive videos and reset time to 0 to save CPU/GPU resources
        video.pause();
        try {
          video.currentTime = 0;
        } catch (e) {
          // ignore potential exceptions if video metadata is not loaded yet
        }
      }
    });
  }, [activeChapterIdx, chapters]);

  // Execute Audio transition when index, sound toggle, or scroll visibility changes
  useEffect(() => {
    if (!soundEnabled || !cinematicScrollActive) {
      stopAudioPlayers();
      stopSynth();
      return;
    }

    const chapter = chapters[activeChapterIdx];
    if (!chapter) return;

    if (chapter.audioPath) {
      // Stop synthetic fallback and trigger custom MP3 crossfade
      stopSynth();
      crossfadeAudio(chapter.audioPath);
    } else {
      // Pause MP3 channels and trigger real-time chord synthesizer
      stopAudioPlayers();
      startOrUpdateSynth(chapter.chordFreqs);
    }
  }, [activeChapterIdx, soundEnabled, cinematicScrollActive, chapters]);

  // Dual-audio crossfading logic
  const crossfadeAudio = (src: string) => {
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);

    const playerA = audioARef.current;
    const playerB = audioBRef.current;
    if (!playerA || !playerB) return;

    const current = activeAudPlayer.current === "A" ? playerA : playerB;
    const next = activeAudPlayer.current === "A" ? playerB : playerA;

    // Check if new track is already loaded/playing in active player
    const currentPath = current.src ? new URL(current.src).pathname : "";
    if (currentPath === src && !current.paused) return;

    next.src = src;
    next.load();
    next.volume = 0;

    next.play().then(() => {
      let stepVol = 0;
      audioIntervalRef.current = window.setInterval(() => {
        stepVol += 0.02;
        if (stepVol >= 0.28) {
          next.volume = 0.28;
          current.volume = 0;
          current.pause();
          clearInterval(audioIntervalRef.current!);
          audioIntervalRef.current = null;
        } else {
          next.volume = stepVol;
          current.volume = Math.max(0, 0.28 - stepVol);
        }
      }, 50);

      activeAudPlayer.current = activeAudPlayer.current === "A" ? "B" : "A";
    }).catch((e) => {
      console.log("Audio crossfade blocked by browser auto-play restrictions");
    });
  };

  const stopAudioPlayers = () => {
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    if (audioARef.current) {
      audioARef.current.pause();
      audioARef.current.volume = 0;
    }
    if (audioBRef.current) {
      audioBRef.current.pause();
      audioBRef.current.volume = 0;
    }
  };

  // Synthesizer audio fallback implementation
  const startOrUpdateSynth = (chord: number[]) => {
    if (JSON.stringify(activeChordFreqs.current) === JSON.stringify(chord)) return;
    activeChordFreqs.current = chord;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!synthCtxRef.current) {
      try {
        synthCtxRef.current = new AudioContextClass();
      } catch (e) {
        console.error("Context build error", e);
        return;
      }
    }

    const ctx = synthCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (!synthGainRef.current) {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      filter.connect(ctx.destination);
      masterGain.connect(filter);
      synthGainRef.current = masterGain;
    }

    const masterGain = synthGainRef.current;
    const oldOscillators = [...synthOscRef.current];
    synthOscRef.current = [];

    const fadeOutTime = ctx.currentTime + 1.2;
    oldOscillators.forEach((osc) => {
      try { osc.stop(fadeOutTime); } catch (e) {}
    });

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      if (idx > 0) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.22 + idx * 0.06;
        lfoGain.gain.value = 1.0;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
      }

      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(idx === 0 ? 0.32 : 0.16, ctx.currentTime + 1.5);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();

      synthOscRef.current.push(osc);
    });
  };

  const stopSynth = () => {
    synthOscRef.current.forEach((osc) => {
      try { osc.stop(); } catch (e) {}
    });
    synthOscRef.current = [];
    activeChordFreqs.current = [];
    if (synthCtxRef.current) {
      try { synthCtxRef.current.close(); } catch (e) {}
      synthCtxRef.current = null;
      synthGainRef.current = null;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      
      {/* Invisible HTML5 Audio tags for dual crossfade channels */}
      <audio ref={audioARef} loop />
      <audio ref={audioBRef} loop />

      {/* [1] PINNED FULLSCREEN BACKGROUND VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black z-0">
        
        {/* Dedicated Background Videos for each chapter */}
        {chapters.map((chapter, idx) => (
          <video
            key={chapter.id}
            ref={(el) => {
              videoRefs.current[idx] = el;
              if (el) {
                if (activeChapterIdx === idx) {
                  el.play().catch((err) => {
                    console.log("Muted video playback deferred:", err);
                  });
                } else {
                  el.pause();
                  try {
                    el.currentTime = 0;
                  } catch (e) {}
                }
              }
            }}
            src={chapter.video}
            muted
            loop
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out select-none pointer-events-none",
              activeChapterIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
        ))}

        {/* Cinematic Dark Gradient Overlay for optimal text readability on the left, leaving the video clear in the center & right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-20 pointer-events-none" />
        
        {/* Decorative gold side beams */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#C9A227]/15 to-transparent z-25 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#C9A227]/15 to-transparent z-25 pointer-events-none" />


      </div>

      {/* [2] FOREGROUND SCROLLABLE CHAPTER CARDS OVERLAY */}
      <div className="relative z-10 w-full mt-[-100vh]">
        {chapters.map((chapter, idx) => (
          <div
            key={chapter.id}
            ref={(el) => { chapterRefs.current[idx] = el; }}
            className="w-full h-screen flex items-center justify-start px-6 md:px-20 relative select-none pointer-events-none"
          >
            {/* Transparent elegant text container (Modern premium UI/UX, video is not hidden) */}
            <div className="max-w-xl w-full p-2 text-white pointer-events-auto transition-transform duration-700 hover:scale-[1.01]">
              
              {/* Timeline Indicator */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold font-sans tracking-widest uppercase"
                  style={{ color: accentColor }}
                >
                  Chapter {chapter.number}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[9px] font-sans tracking-widest uppercase text-white/50">
                  {categoryName} Storyline
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 font-semibold leading-snug">
                {chapter.title}
              </h3>

              {/* Cinematic Quote */}
              {chapter.quote && (
                <div
                  className="border-l-2 pl-4 py-1 italic text-gray-200 font-serif text-sm leading-relaxed mb-6"
                  style={{ borderColor: accentColor }}
                >
                  "{chapter.quote}"
                </div>
              )}

              {/* Narrative description */}
              {chapter.desc && (
                <p className="text-white/60 text-xs font-sans leading-relaxed mb-8">
                  {chapter.desc}
                </p>
              )}

              {/* On-ground SGE operational checklist */}
              <div className="bg-black/40 border border-white/10 p-6 rounded-sm backdrop-blur-md">
                <p className="text-[10px] tracking-wider uppercase font-semibold font-sans mb-3 text-white/50 flex items-center gap-1.5">
                  <Shield size={11} style={{ color: accentColor }} /> SGE Operations Command Checklist
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {chapter.operations.map((op, opIdx) => (
                    <div key={opIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                      <span className="text-white/80 text-[11px] font-sans leading-normal">{op}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll indicators at bottom of card */}
              <div className="mt-6 text-right">
                <span className="text-[8px] tracking-[0.3em] uppercase font-sans text-white/30 animate-pulse">
                  {idx === chapters.length - 1 ? "Scroll down for details" : "Scroll to continue story"} ↓
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
