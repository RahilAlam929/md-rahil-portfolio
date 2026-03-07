// src/types/model-viewer.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        ar?: boolean;
        "auto-rotate"?: boolean;
        autoplay?: boolean;
        "camera-controls"?: boolean;
        "shadow-intensity"?: string | number;
        style?: React.CSSProperties;
      };
    }
  }
}

export {};