import React from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export default function TypewriterText({ text, className }: TypewriterTextProps) {
  return <span className={className}>{text}</span>;
}
