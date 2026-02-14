import React from "react";

/**
 * Simple markdown-like parser for styled text.
 * Wraps text between *asterisks* in a <span> with the given className.
 *
 * Example: parseStyledText("Hack From *Your City*", "text-gradient")
 * → <>Hack From <span className="text-gradient">Your City</span></>
 */
export function parseStyledText(
  text: string,
  className: string = "text-gradient",
): React.ReactNode {
  // Split by newlines first to handle line breaks
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/\*([^*]+)\*/g);
        const rendered = parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={`${lineIdx}-${i}`} className={className}>
              {part}
            </span>
          ) : (
            part
          ),
        );

        return (
          <React.Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {rendered}
          </React.Fragment>
        );
      })}
    </>
  );
}
