import { useEffect, useRef } from 'react';
import {
    Scene, PerspectiveCamera, WebGLRenderer,
    IcosahedronGeometry, TorusGeometry, BufferGeometry,
    Float32BufferAttribute, MeshBasicMaterial, PointsMaterial,
    Mesh, Points, Group
} from 'three';

const HeroScene = () => {
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.z = 6;

        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: false, // Off for performance
            powerPreference: 'high-performance',
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
        container.appendChild(renderer.domElement);

        const accentColor = 0xE6B35C;

        // Group for mouse-reactive rotation (separate from auto-rotation)
        const group = new Group();
        scene.add(group);

        // Wireframe Icosahedron — low poly, visually striking
        const icoGeo = new IcosahedronGeometry(1.8, 1);
        const icoMat = new MeshBasicMaterial({
            color: accentColor,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const ico = new Mesh(icoGeo, icoMat);
        group.add(ico);

        // Orbital ring 1
        const ringGeo = new TorusGeometry(2.8, 0.008, 8, 80);
        const ringMat = new MeshBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: 0.1,
        });
        const ring1 = new Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        // Orbital ring 2 — different axis
        const ringMat2 = new MeshBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: 0.08,
        });
        const ring2 = new Mesh(ringGeo, ringMat2);
        ring2.rotation.x = -Math.PI / 4;
        ring2.rotation.y = Math.PI / 4;
        group.add(ring2);

        // Floating particles — minimal count, big visual impact
        const particleCount = 35;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 14;
        }
        const particleGeo = new BufferGeometry();
        particleGeo.setAttribute('position', new Float32BufferAttribute(positions, 3));
        const particleMat = new PointsMaterial({
            color: accentColor,
            size: 0.03,
            transparent: true,
            opacity: 0.4,
        });
        const particles = new Points(particleGeo, particleMat);
        scene.add(particles);

        // Event handlers
        const onMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize, { passive: true });

        // Animation loop
        let raf;
        const tick = () => {
            raf = requestAnimationFrame(tick);

            // Auto-rotation on individual meshes
            ico.rotation.x += 0.002;
            ico.rotation.y += 0.003;
            ring1.rotation.z += 0.001;
            ring2.rotation.z -= 0.0015;
            particles.rotation.y += 0.0003;

            // Smooth mouse-reactive group rotation (lerp)
            group.rotation.y += (mouseRef.current.x * 0.3 - group.rotation.y) * 0.02;
            group.rotation.x += (-mouseRef.current.y * 0.2 - group.rotation.x) * 0.02;

            renderer.render(scene, camera);
        };
        tick();

        // Cleanup
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);

            // Dispose all GPU resources
            renderer.dispose();
            icoGeo.dispose();
            icoMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            ringMat2.dispose();
            particleGeo.dispose();
            particleMat.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default HeroScene;
