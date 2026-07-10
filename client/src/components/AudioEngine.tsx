import React, { useRef, useEffect, useState } from "react";
import { useExperience, ExperienceType } from "@/context/ExperienceContext";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// Web Audio API Synthesizer fallback for ambient chords if MP3s are missing
class AmbientSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private isPlaying = false;
  private timer: number | null = null;

  start(experienceType: ExperienceType) {
    if (this.isPlaying) this.stop();

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();
      this.isPlaying = true;
    } catch (e) {
      console.error("Failed to create AudioContext", e);
      return;
    }

    // Curate beautiful luxury ambient chords depending on the active route
    let chords: number[][] = [];
    if (experienceType === "weddings") {
      // Warm romantic major/minor 7th chords: Dmaj9 -> Amaj7 -> F#m7 -> E6
      chords = [
        [146.83, 220.00, 277.18, 369.99, 440.00], // D3, A3, C#4, F#4, A4
        [220.00, 277.18, 329.63, 440.00, 554.37], // A3, C#4, E4, A4, C#5
        [185.00, 277.18, 329.63, 440.00, 554.37], // F#3, C#4, E4, A4, C#5
        [164.81, 246.94, 329.63, 392.00, 493.88], // E3, B3, E4, G4, B4
      ];
    } else if (experienceType === "corporate") {
      // Tech-ambient chill pads: Am9 -> Fmaj9 -> Cmaj9 -> G6
      chords = [
        [110.00, 196.00, 246.94, 329.63, 392.00], // A2, G3, B3, E4, G4
        [174.61, 261.63, 329.63, 392.00, 440.00], // F3, C4, E4, G4, A4
        [130.81, 196.00, 261.63, 329.63, 392.00], // C3, G3, C4, E4, G4
        [196.00, 293.66, 392.00, 493.88, 587.33], // G3, D4, G4, B4, D5
      ];
    } else if (experienceType === "concerts") {
      // High-bass stadium drone with chord intervals
      chords = [
        [82.41, 164.81, 246.94, 329.63], // E2, E3, B3, E4
        [110.00, 220.00, 293.66, 440.00], // A2, A3, D4, A4
      ];
    } else {
      // Home / Default: Soft golden chimes Cmaj9 -> Fmaj9
      chords = [
        [130.81, 196.00, 261.63, 329.63, 392.00], // C3, G3, C4, E4, G4
        [174.61, 261.63, 349.23, 440.00, 523.25], // F3, C4, F4, A4, C5
      ];
    }

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      // Clean up active sound voices
      this.oscillators.forEach(o => {
        try { o.stop(); } catch (e) {}
      });
      this.oscillators = [];
      this.gainNodes = [];

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 3.0); // Slow fade-in
      masterGain.connect(this.ctx.destination);

      // Low pass filter to remove harsh frequencies, resulting in a premium, warm texture
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.connect(masterGain);

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Fundamental frequencies use smooth sine waves, higher harmonics use triangle waves
        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Slow frequency modulation (pitch wobble) to sound organic
        if (idx > 0) {
          const lfo = this.ctx.createOscillator();
          const lfoGain = this.ctx.createGain();
          lfo.frequency.value = 0.2 + idx * 0.1;
          lfoGain.gain.value = 1.5;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();
        }

        oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.18, this.ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();

        this.oscillators.push(osc);
      });

      // Schedule cross-fade out
      masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime + 7.5);
      masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 9.8);

      this.timer = window.setTimeout(playChord, 8000);
    };

    playChord();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    this.oscillators.forEach(o => {
      try { o.stop(); } catch (e) {}
    });
    this.oscillators = [];
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

export const AudioEngine: React.FC = () => {
  const { soundEnabled, setSoundEnabled, audioTrack, experienceType, cinematicScrollActive } = useExperience();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<AmbientSynth | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize Audio tag and Synth ref
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    synthRef.current = new AmbientSynth();

    return () => {
      audio.pause();
      if (synthRef.current) synthRef.current.stop();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Handle track transitions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const fadeToNewTrack = async () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      if (!audioTrack || !soundEnabled || cinematicScrollActive) {
        fadeVolume(audio, 0, () => {
          audio.pause();
          setIsPlaying(false);
        });
        if (synthRef.current) synthRef.current.stop();
        return;
      }

      // If correct track is already playing
      const currentSrc = audio.src ? new URL(audio.src).pathname : "";
      if (currentSrc === audioTrack) {
        if (audio.paused) {
          try {
            await audio.play();
            setIsPlaying(true);
            fadeVolume(audio, 0.22);
          } catch (e) {
            // Autoplay blocked, launch synthesized chords fallback
            if (synthRef.current) {
              synthRef.current.start(experienceType);
              setIsPlaying(true);
            }
          }
        }
        return;
      }

      // Stop any active synth before switching
      if (synthRef.current) synthRef.current.stop();

      // Setup audio fallback error handlers (in case MP3 is 404)
      audio.onerror = () => {
        console.log("MP3 failed to load, starting real-time ambient synthesizer");
        if (soundEnabled && synthRef.current) {
          synthRef.current.start(experienceType);
          setIsPlaying(true);
        }
      };

      fadeVolume(audio, 0, () => {
        audio.src = audioTrack;
        audio.load();
        if (soundEnabled) {
          audio.play()
            .then(() => {
              setIsPlaying(true);
              fadeVolume(audio, 0.22);
            })
            .catch((e) => {
              // Fallback to Web Audio Synth
              if (synthRef.current) {
                synthRef.current.start(experienceType);
                setIsPlaying(true);
              }
            });
        }
      });
    };

    fadeToNewTrack();
  }, [audioTrack, soundEnabled, experienceType, cinematicScrollActive]);

  const fadeVolume = (audio: HTMLAudioElement, targetVolume: number, onComplete?: () => void) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = targetVolume > audio.volume ? 0.02 : -0.02;
    fadeIntervalRef.current = window.setInterval(() => {
      const nextVolume = audio.volume + step;

      if (
        (step > 0 && nextVolume >= targetVolume) ||
        (step < 0 && nextVolume <= targetVolume)
      ) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
        if (onComplete) onComplete();
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVolume));
      }
    }, 45);
  };

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      setSoundEnabled(false);
      if (synthRef.current) synthRef.current.stop();
    } else {
      setSoundEnabled(true);
      if (synthRef.current) synthRef.current.stop();

      if (audioTrack) {
        // Setup error handler
        audio.onerror = () => {
          console.log("Toggle play failed (404), fallback to Web Audio Synth");
          if (synthRef.current) {
            synthRef.current.start(experienceType);
            setIsPlaying(true);
          }
        };

        audio.src = audioTrack;
        audio.load();
        audio.play()
          .then(() => {
            setIsPlaying(true);
            fadeVolume(audio, 0.22);
          })
          .catch((err) => {
            console.log("Toggle playback blocked, triggering Web Audio Synth");
            if (synthRef.current) {
              synthRef.current.start(experienceType);
              setIsPlaying(true);
            }
          });
      }
    }
  };

  if (experienceType === "none") return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3">
      <button
        onClick={handleToggle}
        className={cn(
          "w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md group pointer-events-auto cursor-pointer",
          soundEnabled
            ? "bg-[#C9A227]/20 border-[#C9A227] text-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.25)]"
            : "bg-white/90 dark:bg-black/90 border-gray-200 text-gray-500 hover:text-gray-900"
        )}
        title={soundEnabled ? "Mute Background Music" : "Play Background Music"}
      >
        {soundEnabled && (isPlaying || cinematicScrollActive) ? (
          <div className="flex items-end justify-center gap-[2.5px] w-6 h-5">
            <span
              className="w-[3px] bg-[#C9A227] rounded-full animate-equalizer-bar"
              style={{ animationDelay: "0.1s", height: "60%" }}
            />
            <span
              className="w-[3px] bg-[#C9A227] rounded-full animate-equalizer-bar"
              style={{ animationDelay: "0.3s", height: "100%" }}
            />
            <span
              className="w-[3px] bg-[#C9A227] rounded-full animate-equalizer-bar"
              style={{ animationDelay: "0.0s", height: "40%" }}
            />
            <span
              className="w-[3px] bg-[#C9A227] rounded-full animate-equalizer-bar"
              style={{ animationDelay: "0.5s", height: "80%" }}
            />
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </button>

      {!soundEnabled && (
        <span className="hidden md:inline-block px-3 py-1 bg-black/85 text-white text-[10px] tracking-widest uppercase font-semibold font-sans rounded-sm select-none animate-pulse">
          Experience with Sound 🔊
        </span>
      )}
    </div>
  );
};
