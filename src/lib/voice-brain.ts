// src/lib/voice-brain.ts
export type VoiceAction =
  | { type: "scroll"; target: string }
  | { type: "open"; url: string }
  | { type: "none" };

export type VoiceResult = {
  reply: string;
  action: VoiceAction;
};

function includesAny(text: string, list: string[]) {
  return list.some((k) => text.includes(k));
}

export function routeVoiceCommand(raw: string): VoiceResult {
  const text = raw.toLowerCase().trim();

  // --- Greetings / small talk
  if (includesAny(text, ["hello", "hi", "hey", "hola", "namaste", "assalam"])) {
    return {
      reply:
        "Hello! Welcome to Rahil’s profile. Say: open projects, open resources, open challenge, or contact.",
      action: { type: "none" },
    };
  }

  if (includesAny(text, ["whatsapp", "what's up", "whats up", "wassup"])) {
    return {
      reply:
        "WhatsApp! 😄 I’m Rahil’s voice assistant. Tell me which section to open: projects, resources, challenge, or contact.",
      action: { type: "none" },
    };
  }

  if (includesAny(text, ["who are you", "what are you", "assistant"])) {
    return {
      reply:
        "I’m Rahil’s voice assistant. I can navigate this portfolio for you and help you find projects and learning resources.",
      action: { type: "none" },
    };
  }

  // --- Navigation: sections
  if (includesAny(text, ["home", "top", "start"])) {
    return { reply: "Opening home.", action: { type: "scroll", target: "#home" } };
  }

  if (includesAny(text, ["about", "about me"])) {
    return { reply: "Opening about section.", action: { type: "scroll", target: "#about" } };
  }

  if (includesAny(text, ["project", "projects", "work"])) {
    return { reply: "Opening projects.", action: { type: "scroll", target: "#projects" } };
  }

  if (includesAny(text, ["skills", "tech stack", "stack"])) {
    return { reply: "Opening skills.", action: { type: "scroll", target: "#skills" } };
  }

  if (includesAny(text, ["events", "event"])) {
    return { reply: "Opening events.", action: { type: "scroll", target: "#events" } };
  }

  if (includesAny(text, ["updates", "update"])) {
    return { reply: "Opening updates.", action: { type: "scroll", target: "#updates" } };
  }

  if (includesAny(text, ["resources", "resource", "roadmap", "learn"])) {
    return { reply: "Opening resources.", action: { type: "scroll", target: "#resources" } };
  }

  if (includesAny(text, ["challenge", "contest", "arena"])) {
    return { reply: "Opening challenge arena.", action: { type: "scroll", target: "#challenge" } };
  }

  if (includesAny(text, ["community", "ideas", "wall"])) {
    return { reply: "Opening community wall.", action: { type: "scroll", target: "#community" } };
  }

  if (includesAny(text, ["quiz", "path", "career"])) {
    return { reply: "Opening the career quiz.", action: { type: "scroll", target: "#quiz" } };
  }

  if (includesAny(text, ["skill tree", "tree"])) {
    return { reply: "Opening skill tree.", action: { type: "scroll", target: "#skill-tree" } };
  }

  if (includesAny(text, ["build log", "timeline", "log"])) {
    return { reply: "Opening build log.", action: { type: "scroll", target: "#build-log" } };
  }

  if (includesAny(text, ["hire", "hire me"])) {
    return { reply: "Opening hire section.", action: { type: "scroll", target: "#hire" } };
  }

  if (includesAny(text, ["contact", "message", "email"])) {
    return { reply: "Opening contact.", action: { type: "scroll", target: "#contact" } };
  }

  // --- External links (edit URLs)
  if (includesAny(text, ["linkedin"])) {
    return {
      reply: "Opening LinkedIn.",
      action: {
        type: "open",
        url: "https://www.linkedin.com/in/md-rahil-a070b3329",
      },
    };
  }

  if (includesAny(text, ["instagram"])) {
    return {
      reply: "Opening Instagram.",
      action: { type: "open", url: "https://www.instagram.com/mdr_ahil0786/" },
    };
  }

  if (includesAny(text, ["github"])) {
    return {
      reply: "Opening GitHub.",
      action: { type: "open", url: "https://github.com" }, // change to your github profile
    };
  }

  // --- Stop
  if (includesAny(text, ["stop listening", "stop", "pause"])) {
    return { reply: "Okay, stopping voice mode.", action: { type: "none" } };
  }

  // --- Fallback (user kuch bhi bole)
  return {
    reply:
      "Got it. You can say: open projects, resources, challenge, community, or contact. Try: open projects.",
    action: { type: "none" },
  };
}