"use client";

import { Canvas } from "@react-three/fiber";

export const DNAVisual = () => {
  return (
    <div className="h-64 w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      </Canvas>
    </div>
  );
};
