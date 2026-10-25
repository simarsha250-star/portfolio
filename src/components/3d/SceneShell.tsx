import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface Props {
  camera: { position: [number, number, number]; fov: number };
  children: React.ReactNode;
}

/**
 * Shared canvas wrapper. It only renders frames while on screen and while the
 * tab is visible, caps pixel ratio, and never captures pointer events so it
 * cannot block buttons or links.
 */
const SceneShell = ({ camera, children }: Props) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        frameloop={visible && tabVisible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none' }}
      >
        {children}
      </Canvas>
    </div>
  );
};

export default SceneShell;
