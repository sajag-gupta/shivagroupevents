import React from "react";
import * as Lucide from "lucide-react";

interface GetIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export function GetIcon({ name, className, size = 20, color }: GetIconProps) {
  // Map emoji characters or icon name strings to Lucide icon names
  const emojiMap: Record<string, keyof typeof Lucide> = {
    // Weddings / Marriage
    "💍": "Heart",
    "Heart": "Heart",
    "🌿": "Sparkles",
    "🌸": "Sparkles",
    "🎵": "Music",
    "🥂": "GlassWater",
    "🐎": "Compass",
    "🔥": "Flame",
    "✨": "Sparkles",
    "Star": "Star",
    "Camera": "Camera",
    "Music": "Music",
    "Users": "Users",
    "MapPin": "MapPin",
    "Phone": "Phone",
    "CheckCircle": "CheckCircle",
    "Sparkles": "Sparkles",
    "Crown": "Crown",
    "Flame": "Flame",
    "Zap": "Zap",
    "Briefcase": "Briefcase",
    "Award": "Award",
    "Megaphone": "Megaphone",
    "GlassWater": "GlassWater",
    "GraduationCap": "GraduationCap",
    // Corporate / General
    "🏢": "Building",
    "🎤": "Mic",
    "🏆": "Award",
    "🎸": "Music",
    "📣": "Megaphone",
    "🎓": "GraduationCap",
    // Process Steps / How we work
    "🤝": "Handshake",
    "📋": "ClipboardList",
    "🏛️": "Building",
    "🎨": "Palette",
    "✅": "CheckCircle2",
    "⚙️": "Settings",
    "🎯": "Target",
    "🌟": "Star",
    // Why Choose Us
    "🔊": "Volume2",
    "🎙️": "Mic",
    "📡": "Radio",
    "📅": "Calendar",
    "🍽️": "Utensils",
    "🏨": "Hotel",
    "🛡️": "ShieldCheck",
    "📈": "TrendingUp",
    "🏷️": "Tag",
    "🗺️": "Map",
    "🎬": "Film",
    "📽️": "Video",
    "🚀": "Rocket",
    "💡": "Lightbulb",
    "💎": "Gem",
    "🎉": "PartyPopper",
    "🎊": "PartyPopper",
    "👑": "Crown",
  };

  const lucideName = emojiMap[name] || (name in Lucide ? (name as keyof typeof Lucide) : "Sparkles");
  const IconComponent = Lucide[lucideName] as React.ComponentType<{ className?: string; size?: number; color?: string }>;
  if (!IconComponent) {
    return <Lucide.Sparkles className={className} size={size} color={color} />;
  }
  return <IconComponent className={className} size={size} color={color} />;
}
