import React, { useEffect, useRef, useCallback } from 'react';

const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const rafId = useRef(null);

    const animate = useCallback(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Dot follows mouse directly
        const scale = isHovering.current ? 2 : 1;
        dot.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0) scale(${scale})`;

        // Ring follows with smooth lag (lerp)
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
        const ringScale = isHovering.current ? 1.5 : 1;
        ring.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0) scale(${ringScale})`;

        rafId.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleMouseOver = (e) => {
            isHovering.current = !!(
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button')
            );
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [animate]);

    return (
        <>
            {/* Main Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
                style={{ transition: 'width 0.2s, height 0.2s' }}
            />
            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] opacity-50 will-change-transform"
            />
        </>
    );
};

export default Cursor;
