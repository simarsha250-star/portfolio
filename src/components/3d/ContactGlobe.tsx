import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import SceneShell from './SceneShell';

const Globe = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={50} color="#D4AF7C" />
      <pointLight position={[-4, -2, 4]} intensity={50} color="#9B7BFF" />
      <group ref={ref} rotation={[0.35, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.5, 40, 40]} />
          <meshStandardMaterial color="#1a1535" metalness={0.5} roughness={0.55} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.53, 24, 18]} />
          <meshBasicMaterial color="#9B7BFF" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[1.25, 0, 0.3]}>
          <torusGeometry args={[2.1, 0.012, 8, 120]} />
          <meshBasicMaterial color="#D4AF7C" />
        </mesh>
      </group>
    </>
  );
};

/** Lazy-loaded decorative globe. Secondary to the form; never intercepts pointer events. */
const ContactGlobe = () => (
  <SceneShell camera={{ position: [0, 0, 5.2], fov: 45 }}>
    <Globe />
  </SceneShell>
);

export default ContactGlobe;
