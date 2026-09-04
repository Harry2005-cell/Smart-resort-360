"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Building2, Maximize2, Eye, Layers, Wind, ThermometerSun, Activity, MapPin, Sparkles } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";

interface Room {
  id: string; number: string; type: string; status: string; floor: number;
  buildingName: string; positionX: number; positionY: number; positionZ: number;
  temperature: number; guest: any;
}

const STATUS_COLORS: Record<string, string> = {
  OCCUPIED: "#6366f1",
  AVAILABLE: "#22c55e",
  CLEANING: "#f59e0b",
  MAINTENANCE: "#ef4444",
  OUT_OF_ORDER: "#71717a",
};

function BuildingShape({ position, rooms, buildingName, onSelect }: { position: [number, number, number]; rooms: Room[]; buildingName: string; onSelect: (r: Room) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const floors = Math.max(1, ...rooms.map((r) => r.floor));
  const floorHeight = 0.6;
  const width = 4;
  const depth = 4;

  return (
    <group position={position} ref={groupRef}>
      {/* Building shell */}
      <mesh position={[0, (floors * floorHeight) / 2, 0]}>
        <boxGeometry args={[width, floors * floorHeight, depth]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} emissive="#6366f1" emissiveIntensity={0.1} />
      </mesh>

      {/* Floor slabs */}
      {Array.from({ length: floors + 1 }).map((_, i) => (
        <mesh key={i} position={[0, i * floorHeight, 0]}>
          <boxGeometry args={[width + 0.1, 0.05, depth + 0.1]} />
          <meshStandardMaterial color="#312e81" emissive="#6366f1" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Rooms */}
      {rooms.map((room) => {
        const xOffset = ((parseInt(room.number.replace(/\D/g, "").slice(-2) || "0") % 5) - 2) * 0.7;
        const y = (room.floor - 1) * floorHeight + 0.3;
        const color = STATUS_COLORS[room.status] || "#71717a";
        const isOccupied = room.status === "OCCUPIED";
        return (
          <group key={room.id} position={[xOffset, y, 0]}>
            <mesh
              onClick={(e) => { e.stopPropagation(); onSelect(room); }}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <boxGeometry args={[0.6, 0.5, 0.6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isOccupied ? 0.6 : 0.3} />
            </mesh>
            {isOccupied && (
              <pointLight color={color} intensity={0.4} distance={2} />
            )}
          </group>
        );
      })}

      {/* Building label */}
      <Text position={[0, floors * floorHeight + 0.6, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        {buildingName}
      </Text>
    </group>
  );
}

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      <gridHelper args={[60, 30, "#312e81", "#1a1a2e"]} position={[0, 0, 0]} />
    </group>
  );
}

export default function DigitalTwinPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selected, setSelected] = useState<Room | null>(null);
  const [heatMode, setHeatMode] = useState<"status" | "temperature" | "type">("status");

  useEffect(() => {
    fetch("/api/rooms").then((r) => r.json()).then((d) => setRooms(d.rooms || [])).catch(console.error);
  }, []);

  // Group by building
  const byBuilding: Record<string, Room[]> = {};
  rooms.forEach((r) => {
    const k = r.buildingName || "Other";
    if (!byBuilding[k]) byBuilding[k] = [];
    byBuilding[k].push(r);
  });

  const buildingPositions: Record<string, [number, number, number]> = {
    "Main Wing": [0, 0, 0],
    "East Wing": [10, 0, 0],
    "Villa Block": [-10, 0, 8],
    "Azure Spa": [8, 0, -8],
    "Fitness Center": [-8, 0, -6],
  };

  return (
    <PageContainer>
      <PageHeader
        title="Digital Twin"
        description="3D immersive view of your entire property in real time"
        icon={Building2}
        badge="3D"
        actions={
          <div className="flex items-center gap-2">
            <div className="glass-card p-1 flex items-center gap-1">
              {(["status", "temperature", "type"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setHeatMode(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${heatMode === m ? "bg-brand-500/30 text-white" : "text-white/50 hover:text-white"}`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 glass-card overflow-hidden relative" style={{ height: "70vh" }}>
          <Canvas camera={{ position: [15, 12, 18], fov: 50 }} shadows>
            <color attach="background" args={["#0a0a0f"]} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 15, 5]} intensity={0.7} />
            <pointLight position={[-10, 10, -10]} intensity={0.4} color="#7c3aed" />
            <Ground />
            {Object.entries(byBuilding).map(([name, rs]) => {
              const pos = buildingPositions[name] || [0, 0, 0];
              return <BuildingShape key={name} position={pos} rooms={rs} buildingName={name} onSelect={setSelected} />;
            })}
            <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.1} />
          </Canvas>

          <div className="absolute top-4 left-4 glass-card p-3 text-xs space-y-1.5">
            <div className="text-white/40 uppercase text-[10px] font-semibold">Legend</div>
            {Object.entries(STATUS_COLORS).map(([s, c]) => (
              <div key={s} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ background: c }} />
                <span className="text-white/70">{s.replace("_", " ")}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 glass-card p-2 text-[10px] text-white/40 flex items-center gap-2">
            <Activity className="w-3 h-3 text-success-light animate-pulse" />
            <span>Drag to rotate • Scroll to zoom</span>
          </div>
        </div>

        <div className="space-y-4">
          {selected ? (
            <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/40 text-xs">SELECTED ROOM</div>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white text-xs">Clear</button>
              </div>
              <div className="text-2xl font-display font-bold text-white mb-1">Room {selected.number}</div>
              <div className="text-white/50 text-sm mb-3">{selected.buildingName} • Floor {selected.floor}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Type</span><span className="text-white font-medium">{selected.type}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Status</span><span className="font-medium" style={{ color: STATUS_COLORS[selected.status] }}>{selected.status}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Temperature</span><span className="text-white font-medium">{selected.temperature?.toFixed(1)}°C</span></div>
                {selected.guest && (
                  <div className="flex justify-between"><span className="text-white/50">Guest</span><span className="text-white font-medium">{selected.guest.name}</span></div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-4 text-center text-white/40 text-sm">
              <Eye className="w-6 h-6 mx-auto mb-2 text-white/30" />
              Click any room to inspect
            </div>
          )}

          <div className="glass-card p-4">
            <div className="text-white/40 text-xs uppercase font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Building Stats
            </div>
            <div className="space-y-2.5">
              {Object.entries(byBuilding).map(([name, rs]) => {
                const occupied = rs.filter((r) => r.status === "OCCUPIED").length;
                const pct = (occupied / rs.length) * 100;
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-white/70 font-medium">{name}</span>
                      <span className="text-white/50">{occupied}/{rs.length}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill bg-brand-gradient" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="text-white/40 text-xs uppercase font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-ai-light" /> AI Insights
            </div>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex items-start gap-2"><span className="text-ai-light">→</span><span>Block A HVAC: Health 71%. Schedule PM within 5 days.</span></div>
              <div className="flex items-start gap-2"><span className="text-ai-light">→</span><span>3 villas available. Recommend promotional offer.</span></div>
              <div className="flex items-start gap-2"><span className="text-ai-light">→</span><span>Floor 5 suites underutilized. Pricing opportunity.</span></div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
