"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type NodeData = {
    position: [number, number, number];
    size: number;
    ring: number;
};

type ConnectionData = {
    startIndex: number;
    endIndex: number;
};

const BiologicalNetwork = () => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 12, 12), []);
    const nodeMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#D7FFD2",
                emissive: "#B7FFB1",
                emissiveIntensity: 2.0,
                roughness: 0.25,
                metalness: 0.05,
            }),
        [],
    );

    useEffect(() => {
        return () => {
            sphereGeometry.dispose();
            nodeMaterial.dispose();
        };
    }, [sphereGeometry, nodeMaterial]);

    // GC-free vector and math allocations
    const tempV3Ref = useRef(new THREE.Vector3());
    const targetOffsetRef = useRef(new THREE.Vector3());
    const screenPosRef = useRef(new THREE.Vector3());
    const mouse2DRef = useRef(new THREE.Vector2());
    const localPushRef = useRef(new THREE.Vector3());
    const groupQuatInvertedRef = useRef(new THREE.Quaternion());

    const { nodes, connections } = useMemo(() => {
        const generatedNodes: NodeData[] = [];
        const generatedConnections: ConnectionData[] = [];

        /*
         * Three slightly different biological layers.
         *
         * The irregular positioning is intentional.
         * We don't want a perfect geometric sphere.
         */

        const rings = [
            {
                radius: 1.45,
                y: -0.8,
                count: 10,
            },
            {
                radius: 1.9,
                y: 0,
                count: 14,
            },
            {
                radius: 1.5,
                y: 0.8,
                count: 10,
            },
        ];

        rings.forEach((ring, ringIndex) => {
            for (let i = 0; i < ring.count; i++) {
                const angle = (i / ring.count) * Math.PI * 2 + ringIndex * 0.45;

                const radius = ring.radius + (Math.random() - 0.5) * 0.25;

                const x = Math.cos(angle) * radius;

                const z = Math.sin(angle) * radius;

                const y = ring.y + (Math.random() - 0.5) * 0.4;

                generatedNodes.push({
                    position: [x, y, z],
                    size: 0.035 + Math.random() * 0.045,
                    ring: ringIndex,
                });
            }
        });

        /*
         * Add a few inner nodes.
         */

        for (let i = 0; i < 7; i++) {
            const angle = (i / 7) * Math.PI * 2;

            generatedNodes.push({
                position: [
                    Math.cos(angle) * 0.8,
                    (Math.random() - 0.5) * 1.2,
                    Math.sin(angle) * 0.8,
                ],
                size: 0.045 + Math.random() * 0.04,
                ring: 3,
            });
        }

        /*
         * Connect nearby nodes.
         */

        for (let i = 0; i < generatedNodes.length; i++) {
            const current = generatedNodes[i];

            if (!current) continue;

            for (let j = i + 1; j < generatedNodes.length; j++) {
                const next = generatedNodes[j];

                if (!next) continue;

                const dx = current.position[0] - next.position[0];

                const dy = current.position[1] - next.position[1];

                const dz = current.position[2] - next.position[2];

                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                /*
                 * Only connect close biological nodes.
                 */

                if (distance < 1.05) {
                    generatedConnections.push({
                        startIndex: i,
                        endIndex: j,
                    });
                }
            }
        }

        /*
         * Add a few longer connections to make
         * the structure feel like a network.
         */

        const longConnections = [
            [0, 17],
            [4, 28],
            [11, 25],
            [18, 32],
            [7, 30],
        ];

        longConnections.forEach(([startIndex, endIndex]) => {
            if (generatedNodes[startIndex] && generatedNodes[endIndex]) {
                generatedConnections.push({
                    startIndex,
                    endIndex,
                });
            }
        });

        return {
            nodes: generatedNodes,
            connections: generatedConnections,
        };
    }, []);

    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const nodeOffsets = useMemo(() => {
        return nodes.map(() => new THREE.Vector3(0, 0, 0));
    }, [nodes]);

    const linePositions = useMemo(() => {
        return new Float32Array(connections.length * 2 * 3);
    }, [connections]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        /*
         * Very slow continuous biological rotation.
         */
        groupRef.current.rotation.y += delta * 0.035;

        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            mouseRef.current.y * 0.12,
            0.025,
        );

        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            mouseRef.current.x * 0.1,
            0.025,
        );

        /*
         * Repulsion force / displacement physics (GC-free)
         */
        const tempV3 = tempV3Ref.current;
        const targetOffset = targetOffsetRef.current;
        const screenPos = screenPosRef.current;
        const mouse2D = mouse2DRef.current.set(
            mouseRef.current.x,
            mouseRef.current.y,
        );
        const localPush = localPushRef.current;

        // Clone/invert group quaternion once per frame instead of per-node
        const groupQuatInverted = groupQuatInvertedRef.current
            .copy(groupRef.current.quaternion)
            .invert();

        nodes.forEach((node, index) => {
            const mesh = nodeRefs.current[index];
            if (!mesh) return;

            // Get absolute world position
            mesh.getWorldPosition(tempV3);

            // Project to screen coordinates
            screenPos.copy(tempV3).project(state.camera);

            // Compute distance in 2D screen space
            const dx = screenPos.x - mouse2D.x;
            const dy = screenPos.y - mouse2D.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const radius = 0.4; // interaction screen-radius
            if (dist < radius) {
                // Stronger repulsion force when closer
                const force = (1 - dist / radius) * 0.6;

                // Repulsion vector on screen space view plane
                const dirX = dist > 0.001 ? dx / dist : Math.random() - 0.5;
                const dirY = dist > 0.001 ? dy / dist : Math.random() - 0.5;

                localPush.set(dirX * force, dirY * force, 0);

                // Align with camera orientation
                localPush.applyQuaternion(state.camera.quaternion);

                // Convert to rotating group's local coordinates
                localPush.applyQuaternion(groupQuatInverted);

                targetOffset.copy(localPush);
            } else {
                targetOffset.set(0, 0, 0);
            }

            // Interpolate offset smoothly towards target (spring-back physics)
            nodeOffsets[index].lerp(targetOffset, delta * 7);

            // Set final mesh position: original base position + current dynamic offset
            mesh.position.set(
                node.position[0] + nodeOffsets[index].x,
                node.position[1] + nodeOffsets[index].y,
                node.position[2] + nodeOffsets[index].z,
            );
        });

        /*
         * Update line segment geometry position attributes to connect moving meshes
         */
        if (linesRef.current) {
            const positions = linesRef.current.geometry.attributes.position
                .array as Float32Array;
            connections.forEach((conn, idx) => {
                const startMesh = nodeRefs.current[conn.startIndex];
                const endMesh = nodeRefs.current[conn.endIndex];
                if (startMesh && endMesh) {
                    positions[idx * 6] = startMesh.position.x;
                    positions[idx * 6 + 1] = startMesh.position.y;
                    positions[idx * 6 + 2] = startMesh.position.z;
                    positions[idx * 6 + 3] = endMesh.position.x;
                    positions[idx * 6 + 4] = endMesh.position.y;
                    positions[idx * 6 + 5] = endMesh.position.z;
                }
            });
            linesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        /*
         * Organic breathing.
         */

        groupRef.current.position.y = Math.sin(time * 0.45) * 0.08;

        if (coreRef.current) {
            const pulse = 1 + Math.sin(time * 1.1) * 0.035;

            coreRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group ref={groupRef}>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#B7FFB1" transparent opacity={0.25} />
            </lineSegments>
            {nodes.map((node, index) => (
                <mesh
                    key={`node-${index}`}
                    ref={(el) => {
                        nodeRefs.current[index] = el;
                    }}
                    position={node.position}
                    scale={node.size}
                    geometry={sphereGeometry}
                    material={nodeMaterial}
                />
            ))}
            <mesh ref={coreRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.52, 32, 32]} />

                <meshBasicMaterial color="#B7FFB1" transparent opacity={0.14} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.95, 2]} />

                <meshBasicMaterial
                    color="#B7FFB1"
                    transparent
                    opacity={0.12}
                    wireframe
                />
            </mesh>
            <mesh rotation={[0.3, 0.2, 0]}>
                <icosahedronGeometry args={[2.75, 2]} />

                <meshBasicMaterial
                    color="#B7FFB1"
                    transparent
                    opacity={0.06}
                    wireframe
                />
            </mesh>
        </group>
    );
};
const ParticleField = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const count = 130;

        const data = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 2.8 + Math.random() * 2.8;

            const angle = Math.random() * Math.PI * 2;

            const height = (Math.random() - 0.5) * 5;

            data[i * 3] = Math.cos(angle) * radius;

            data[i * 3 + 1] = height;

            data[i * 3 + 2] = Math.sin(angle) * radius;
        }

        return data;
    }, []);

    useFrame((_, delta) => {
        if (!pointsRef.current) return;

        pointsRef.current.rotation.y += delta * 0.012;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>

            <pointsMaterial
                color="#D7FFD2"
                size={0.015}
                transparent
                opacity={0.25}
                sizeAttenuation
            />
        </points>
    );
};
const MolecularScene = () => {
    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{
                    position: [0, 0, 7.5],
                    fov: 45,
                }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={0.25} />
                <pointLight position={[3, 3, 4]} intensity={4} color="#B7FFB1" />
                <pointLight position={[-4, -2, 3]} intensity={1.5} color="#D7FFD2" />
                <BiologicalNetwork />
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default MolecularScene;
