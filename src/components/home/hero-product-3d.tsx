"use client";

import { Component, Suspense, useRef, useMemo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Error boundary — prevents WebGL crashes from killing the page      */
/* ------------------------------------------------------------------ */

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  Mini PC 3D Model — built from primitives                          */
/* ------------------------------------------------------------------ */

function MiniPC() {
  // Mini PC proportions: ~115×42×106 mm → normalized ~2.7 × 1 × 2.5
  const w = 2.7;
  const h = 0.95;
  const d = 2.5;

  return (
    <Float speed={2} rotationIntensity={0.08} floatIntensity={0.4}>
      <group>
        {/* Main body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.85}
            roughness={0.15}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Top panel — slightly glossy */}
        <mesh position={[0, h / 2 + 0.005, 0]}>
          <boxGeometry args={[w - 0.04, 0.01, d - 0.04]} />
          <meshPhysicalMaterial
            color="#0d0d0d"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* OPERISBOT logo on top */}
        <Text
          position={[0, h / 2 + 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.22}
          letterSpacing={0.15}
          color="#555555"
          anchorX="center"
          anchorY="middle"
        >
          OPERISBOT
          <meshStandardMaterial
            color="#666666"
            metalness={0.9}
            roughness={0.3}
            emissive="#333333"
            emissiveIntensity={0.3}
          />
        </Text>

        {/* LED strip — front edge (blue-to-purple gradient via emissive) */}
        <mesh position={[0, h / 2 - 0.12, d / 2 + 0.005]}>
          <boxGeometry args={[w - 0.3, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#4466ff"
            emissive="#4466ff"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Second LED accent — purple */}
        <mesh position={[w * 0.25, h / 2 - 0.12, d / 2 + 0.006]}>
          <boxGeometry args={[w * 0.35, 0.035, 0.015]} />
          <meshStandardMaterial
            color="#8844ff"
            emissive="#8844ff"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Ventilation grille — right side */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={`vent-${i}`}
            position={[w / 2 + 0.005, -h / 2 + 0.15 + i * 0.08, 0]}
          >
            <boxGeometry args={[0.02, 0.03, d * 0.5]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}

        {/* Front I/O — USB ports */}
        {[-0.6, -0.3].map((x, i) => (
          <mesh key={`usb-${i}`} position={[x, -h / 2 + 0.2, d / 2 + 0.005]}>
            <boxGeometry args={[0.18, 0.1, 0.02]} />
            <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.4} />
          </mesh>
        ))}

        {/* Power button */}
        <mesh position={[w / 2 - 0.15, h / 2 - 0.12, d / 2 + 0.005]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bottom rubber feet */}
        {[
          [-w / 2 + 0.25, -h / 2 - 0.02, -d / 2 + 0.25],
          [w / 2 - 0.25, -h / 2 - 0.02, -d / 2 + 0.25],
          [-w / 2 + 0.25, -h / 2 - 0.02, d / 2 - 0.25],
          [w / 2 - 0.25, -h / 2 - 0.02, d / 2 - 0.25],
        ].map((pos, i) => (
          <mesh key={`foot-${i}`} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 12]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
        ))}

        {/* Shadow catcher plane */}
        <mesh position={[0, -h / 2 - 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[4, 4]} />
          <shadowMaterial opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  LED glow particles around the device                              */
/* ------------------------------------------------------------------ */

function GlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 40;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6677ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported Canvas wrapper                                           */
/* ------------------------------------------------------------------ */

export default function HeroProduct3D() {
  return (
    <CanvasErrorBoundary>
    <div className="w-full h-[300px] sm:h-[380px] md:h-[480px]">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 5.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, 2, -2]} intensity={0.5} color="#8844ff" />
          <pointLight position={[3, -1, 3]} intensity={0.3} color="#4466ff" />

          <OrbitControls
            autoRotate
            autoRotateSpeed={1.5}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />

          <MiniPC />
          <GlowParticles />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
    </CanvasErrorBoundary>
  );
}
