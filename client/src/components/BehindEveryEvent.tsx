import React from "react";
import { Clock, ShieldAlert, CheckCircle } from "lucide-react";

interface BehindEveryEventProps {
  accentColor: string;
}

export const BehindEveryEvent: React.FC<BehindEveryEventProps> = ({ accentColor }) => {
  const timeline = [
    { time: "05:00 AM", task: "Site supervisor completes venue inspection & structures audit" },
    { time: "06:00 AM", task: "Floral trucks unloaded, cold storage hydration cabinets deployed" },
    { time: "08:00 AM", task: "Lighting engineers program & patch 400+ DMX stage cues" },
    { time: "10:00 AM", task: "Acoustic sound sweep & line-array frequency calibration" },
    { time: "12:00 PM", task: "Stage fabricators complete final structural panel locks" },
    { time: "02:00 PM", task: "On-site hospitality briefing — 80-person crew checklist sync" },
    { time: "04:00 PM", task: "Technical AV rehearsals with speakers, emcees, and artists" },
    { time: "06:00 PM", task: "Final walkthrough & AV failover backups locked" },
    { time: "07:00 PM", task: "Doors open. The luxury experience begins seamlessly." },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Absolute backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-semibold mb-2">
            The Invisible Machinery
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Behind Every Grand Event
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C9A227] mx-auto mt-6" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Quote & Video Loop */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="border-l-4 pl-6 py-2" style={{ borderColor: accentColor }}>
              <p className="font-serif text-xl md:text-2xl text-gray-200 italic leading-relaxed">
                "Our clients see the magic. We live in the machinery behind it."
              </p>
            </div>
            
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              While guests experience flawless luxury, a dedicated team of audio-visual engineers, florists, fabricators, and operations executives orchestrate a precise timeline. SGE coordinates hundreds of moving components starting before dawn to ensure absolute perfection.
            </p>

            {/* Video container displaying SGE operational footage */}
            <div className="relative aspect-video bg-black overflow-hidden border border-white/10 rounded-sm shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-60"
              >
                <source src="/bts_sge.mp4" type="video/mp4" />
                {/* Fallback to corporate AV loop if custom BTS file hasn't been uploaded yet */}
                <source src="/corporate_events.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 text-[9px] tracking-wider uppercase font-semibold font-sans border border-white/10 rounded-xs">
                SGE Ground Crew Operations
              </div>
            </div>
          </div>

          {/* Right Column: Time Scheduler List */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm backdrop-blur-md">
            <div className="flex flex-col gap-6 relative">
              
              {/* Vertical connector line */}
              <div className="absolute left-[34px] top-6 bottom-6 w-[1px] bg-white/10" />

              {timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-6 group relative z-10">
                  
                  {/* Clock time badge */}
                  <div className="w-[70px] shrink-0 text-right pr-4 pt-1">
                    <span className="text-[10px] font-sans font-bold text-gray-400 tracking-wider">
                      {step.time.split(" ")[0]}
                    </span>
                    <span className="text-[9px] block text-gray-500 font-sans tracking-wide uppercase">
                      {step.time.split(" ")[1]}
                    </span>
                  </div>

                  {/* Operational status bullet icon */}
                  <div
                    className="w-4 h-4 rounded-full border bg-gray-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  </div>

                  {/* Task description */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-gray-200 text-xs md:text-sm font-sans leading-relaxed group-hover:text-white transition-colors duration-300">
                      {step.task}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
