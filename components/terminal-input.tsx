"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalInputProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    showCursor?: boolean;
    onComplete?: () => void;
}

export const TerminalInput = ({
    text,
    className,
    delay = 0,
    speed = 80,
    showCursor = false,
    onComplete,
}: TerminalInputProps) => {
    const [visibleText, setVisibleText] = useState("");
    const [started, setStarted] = useState(false);
    const completedRef = useRef(false);

    useEffect(() => {
        const id = setTimeout(() => setStarted(true), delay * 1000);
        return () => clearTimeout(id);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (visibleText.length < text.length) {
            const id = setTimeout(
                () => setVisibleText(text.slice(0, visibleText.length + 1)),
                speed,
            );
            return () => clearTimeout(id);
        }
        if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
        }
    }, [started, visibleText, text, speed, onComplete]);

    return (
        <span className={className}>
            {visibleText}
            {showCursor && (
                <span className="terminal-cursor" />
            )}
        </span>
    );
};
