"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Service } from "./ServicesClient";

type Props = {
  services: Service[];
  hovered: string | null;
  active: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
};

type Positions = Record<string, [number, number, number]>;

// Loads /tooth.glb, recolours it, normalises it to the origin (~2.2 units tall),
// then raycasts each service node onto the actual surface so the markers always
// sit on the tooth regardless of its real shape.
function ToothModel({
  services,
  onPositions,
}: {
  services: Service[];
  onPositions: (p: Positions) => void;
}) {
  const { scene } = useGLTF("/tooth.glb");

  const { object, scale, positions, material } = useMemo(() => {
    const object = scene.clone(true);
    const mat = new THREE.MeshStandardMaterial({
      color: "#f3ecdf",
      roughness: 0.42,
      metalness: 0,
      transparent: true,
      opacity: 0, // fades in once loaded (see useFrame below)
    });
    object.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) mesh.material = mat;
    });

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    object.position.set(-center.x, -center.y, -center.z);
    object.updateMatrixWorld(true);
    const scale = 2.2 / maxDim;

    // Cast a ray from outside the model *toward its centre* along a 3D
    // direction (azimuth + elevation). Because the centred model encloses the
    // origin, the ray always enters the surface — so every node lands on the
    // tooth. Multiply by `scale` to match the rendered (scaled) model.
    const ray = new THREE.Raycaster();
    const R = maxDim * 2.5;
    const positions: Positions = {};
    for (const s of services) {
      const [angleDeg, hFrac] = s.aim;
      const a = (angleDeg * Math.PI) / 180;
      const y = Math.max(-0.95, Math.min(0.95, hFrac));
      const horiz = Math.sqrt(Math.max(0, 1 - y * y));
      const dir = new THREE.Vector3(
        Math.sin(a) * horiz,
        y,
        Math.cos(a) * horiz
      ).normalize();
      const origin = dir.clone().multiplyScalar(R);
      ray.set(origin, dir.clone().negate());
      const hits = ray.intersectObject(object, true);
      const p = hits.length
        ? hits[0].point.clone()
        : dir.clone().multiplyScalar(maxDim * 0.45);
      p.multiplyScalar(scale);
      positions[s.id] = [p.x, p.y, p.z];
    }

    return { object, scale, positions, material: mat };
  }, [scene, services]);

  useEffect(() => onPositions(positions), [positions, onPositions]);

  // Smooth entrance: fade the material in and ease the scale up from slightly
  // small so the tooth doesn't pop in once the GLB finishes loading.
  const grp = useRef<THREE.Group>(null);
  useFrame(() => {
    material.opacity = THREE.MathUtils.lerp(material.opacity, 1, 0.06);
    if (grp.current) {
      const v = THREE.MathUtils.lerp(grp.current.scale.x, scale, 0.06);
      grp.current.scale.setScalar(v);
    }
  });

  return (
    <group ref={grp} scale={scale * 0.88}>
      <primitive object={object} />
    </group>
  );
}
useGLTF.preload("/tooth.glb");

function Tooth({ services, hovered, active, onHover, onSelect }: Props) {
  const group = useRef<THREE.Group>(null);
  const [positions, setPositions] = useState<Positions>({});

  // Portrait phones can't fit the tooth + a side panel, so on mobile we move the
  // tooth UP (panel becomes a bottom sheet) instead of left.
  const isMobile = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => (isMobile.current = mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const mob = isMobile.current;

    const activePos = active ? positions[active] : null;
    if (active && activePos) {
      // Panel open: rotate the chosen node toward the camera (front = +z).
      const targetRotY = -Math.atan2(activePos[0], activePos[2]);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 0.1);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.04, 0.1);
    } else if (hovered) {
      // Hovering: freeze rotation so the node stays put and is easy to click.
    } else {
      // Idle: follow the cursor as a subtle parallax.
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.6, 0.07);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.4, 0.07);
    }

    // Panel open: desktop glides left & zooms in; mobile lifts up & zooms out so
    // it clears the bottom-sheet panel.
    const targetX = active ? (mob ? 0 : -1.5) : 0;
    const targetY = active ? (mob ? 0.95 : 0) : 0;
    const targetScale = active ? (mob ? 0.8 : 1.2) : 1;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.08);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.08);
    const sc = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.08);
    g.scale.setScalar(sc);
  });

  return (
    <group ref={group}>
      <ToothModel services={services} onPositions={setPositions} />

      {/* Service nodes — placed on the raycast surface points */}
      {services.map((s) => {
        const p = positions[s.id];
        if (!p) return null;
        const dim = active !== null; // hide labels while a panel is open
        return (
          <group key={s.id} position={p}>
            <mesh>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color="#e3372b" />
            </mesh>
            <Html zIndexRange={[15, 0]} style={{ pointerEvents: "none" }}>
              <button
                type="button"
                className={`svc-node${hovered === s.id ? " is-hover" : ""}${
                  dim ? " is-dim" : ""
                }`}
                style={{ pointerEvents: dim ? "none" : "auto" }}
                onMouseEnter={() => onHover(s.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(s.id)}
                // On touch, the synthesized first tap is otherwise consumed as a
                // hover; select directly so a single tap opens the panel.
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onSelect(s.id);
                }}
              >
                <span className="svc-node__dot" />
                <span className="svc-node__label">{s.title}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Scene(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} />
      <directionalLight position={[-4, 1, -3]} intensity={0.35} />
      <Suspense fallback={null}>
        <Tooth {...props} />
      </Suspense>
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.32}
        scale={7}
        blur={2.8}
        far={3.5}
      />
    </Canvas>
  );
}
