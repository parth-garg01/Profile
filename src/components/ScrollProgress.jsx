import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(barRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[10000] pointer-events-none">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-accent via-yellow-300 to-accent origin-left will-change-transform"
                style={{ transform: 'scaleX(0)' }}
            />
        </div>
    );
};

export default ScrollProgress;
