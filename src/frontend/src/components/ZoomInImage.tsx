import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ZoomInImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomInImage({ src, alt, className }: ZoomInImageProps) {
  const { ref, isVisible } = useScrollReveal<HTMLImageElement>();

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.88)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    />
  );
}
