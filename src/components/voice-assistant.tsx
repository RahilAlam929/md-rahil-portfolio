"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .toLowerCase()
          .trim();

      console.log("User said:", transcript);

      // ✅ COMMANDS
      if (transcript.includes("projects")) scrollTo("#projects");
      else if (transcript.includes("contact")) scrollTo("#contact");
      else if (transcript.includes("resources")) scrollTo("#resources");
      else if (transcript.includes("challenge")) scrollTo("#challenge");
      else if (transcript.includes("about")) scrollTo("#about");
      else if (transcript.includes("home")) scrollTo("#home");
    };

    recognitionRef.current = recognition;
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-white shadow-soft-glow hover:brightness-110"
    >
      {listening ? <Mic /> : <MicOff />}
      {listening ? "Listening..." : "Voice Control"}
    </button>
  );
}