import { useState } from "react";
import { Html } from "@react-three/drei";
import { X } from "lucide-react";

type Hotspot = {
  id: string;
  title: string;
  body: string;
  anchor: [number, number, number];
};

// Generic, visual descriptions only — no invented product specifications.
// Anchors sit just in front of the machine surfaces (world coords) so they
// show when the component faces the camera and hide behind it on the turntable.
const HOTSPOTS: Hotspot[] = [
  {
    id: "chamber",
    title: "Cleaning Chamber",
    body: "A sealed, glass-walled inspection chamber where components are cleaned under full visibility.",
    anchor: [-1.6, 1.72, 1.34],
  },
  {
    id: "spray",
    title: "Precision Spray System",
    body: "Overhead nozzles direct a controlled spray pattern across each part for consistent, repeatable cleaning.",
    anchor: [-1.5, 2.45, 1.32],
  },
  {
    id: "panel",
    title: "Industrial Control Panel",
    body: "An on-board touchscreen HMI for monitoring cycles and controlling the cleaning process.",
    anchor: [0.75, 2.0, 1.44],
  },
  {
    id: "conveyor",
    title: "Conveyor System",
    body: "An automated conveyor moves components through each stage of the line without manual handling.",
    anchor: [2.35, 1.4, 1.22],
  },
];

export function MachineHotspots({
  onActiveChange,
  occlude = false,
}: {
  onActiveChange?: (active: boolean) => void;
  occlude?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActive((cur) => {
      const next = cur === id ? null : id;
      onActiveChange?.(next !== null);
      return next;
    });
  };

  return (
    <>
      {HOTSPOTS.map((h) => (
        <Html
          key={h.id}
          position={h.anchor}
          center
          occlude={occlude}
          zIndexRange={[40, 0]}
          style={{ pointerEvents: "auto" }}
        >
          <div className="relative">
            <button
              type="button"
              aria-label={h.title}
              onClick={() => toggle(h.id)}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              {/* pulse */}
              {active !== h.id && (
                <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-yellow/50" />
              )}
              <span
                className={`relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink transition-transform duration-200 group-hover:scale-125 ${
                  active === h.id ? "bg-ink" : "bg-yellow"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active === h.id ? "bg-yellow" : "bg-ink"
                  }`}
                />
              </span>
            </button>

            {active === h.id && (
              <div className="animate-fade-up absolute left-5 top-5 w-60 border-2 border-ink bg-white p-4 text-left shadow-offset-sm">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                    {h.title}
                  </h4>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => toggle(h.id)}
                    className="-mr-1 -mt-1 text-muted hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <span className="mt-1 block h-0.5 w-8 bg-yellow" />
                <p className="mt-2 text-xs leading-relaxed text-muted">{h.body}</p>
              </div>
            )}
          </div>
        </Html>
      ))}
    </>
  );
}
