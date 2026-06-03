import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";

const nodes = [
  { id: "start", x: 50, y: 75, label: null },
  { id: "n1", x: 22, y: 38, label: "About Me" },
  { id: "n2", x: 50, y: 32, label: "Projects" },
  { id: "n3", x: 78, y: 38, label: "Contact Me" },
];

// Control points flipped: paths branch upward from start
const edges = [
  { from: "start", to: "n1", cx1: 38, cy1: 62, cx2: 18, cy2: 50 },
  { from: "start", to: "n2", cx1: 42, cy1: 55, cx2: 58, cy2: 45 },
  { from: "start", to: "n3", cx1: 64, cy1: 62, cx2: 82, cy2: 50 },
];

function App() {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dotElRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const [started, setStarted] = useState(false);
  const [dotsPerPath, setDotsPerPath] = useState<{ x: number; y: number }[][]>(
    [],
  );

  function handleStart() {
    if (started) return;
    setStarted(true);

    gsap.to(btnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.set(btnRef.current, { display: "none" });
      },
    });
    gsap.set(mapRef.current, { display: "block" });

    // Sample dot positions along each path (viewBox 0-100 = % of container)
    const groups = pathRefs.current.map((path) => {
      if (!path) return [];
      const length = path.getTotalLength();
      const dots: { x: number; y: number }[] = [];
      for (let d = 0; d <= length; d += 4) {
        const pt = path.getPointAtLength(d);
        dots.push({ x: pt.x, y: pt.y });
      }
      return dots;
    });

    dotElRefs.current = groups.map(() => []);
    // Sync render so dot divs exist before we animate
    flushSync(() => setDotsPerPath(groups));

    gsap.set(nodeRefs.current[0], { opacity: 0, scale: 0 });
    nodeRefs.current
      .slice(1)
      .forEach((el) => gsap.set(el, { opacity: 0, scale: 0 }));
    dotElRefs.current.forEach((group) =>
      gsap.set(group, { opacity: 0, scale: 0 }),
    );

    const tl = gsap.timeline();

    tl.to(nodeRefs.current[0], {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      transformOrigin: "50% 50%",
    });

    dotElRefs.current.forEach((group, i) => {
      tl.to(
        group,
        {
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: "power2.out",
          stagger: 0.04,
          transformOrigin: "50% 50%",
        },
        i === 0 ? "+=0" : "<0.3",
      );
      tl.to(
        nodeRefs.current[i + 1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          transformOrigin: "50% 50%",
        },
        "-=0.1",
      );
    });
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <button
        ref={btnRef}
        onClick={handleStart}
        className="z-10 px-8 py-4 text-2xl font-bold text-[#3a2e00] bg-primary rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        Start your journey
      </button>

      <div
        ref={mapRef}
        className="absolute inset-0"
        style={{ display: "none" }}
      >
        {/* Invisible paths used only for geometry sampling */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {edges.map((edge, i) => {
            const a = nodeMap[edge.from];
            const b = nodeMap[edge.to];
            return (
              <path
                key={i}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={`M ${a.x} ${a.y} C ${edge.cx1} ${edge.cy1}, ${edge.cx2} ${edge.cy2}, ${b.x} ${b.y}`}
                fill="none"
                stroke="none"
              />
            );
          })}
        </svg>

        {/* Dots rendered as individual divs, positioned by % */}
        {dotsPerPath.map((dots, pi) =>
          dots.map((dot, di) => (
            <div
              key={`${pi}-${di}`}
              ref={(el) => {
                dotElRefs.current[pi][di] = el;
              }}
              className="absolute rounded-full bg-white"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: "7px",
                height: "7px",
                transform: "translate(-50%, -50%)",
              }}
            />
          )),
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={node.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={[
                "rounded-full border-2",
                node.id === "start"
                  ? "w-14 h-14 bg-gray-300 border-gray-500"
                  : "w-28 h-28 bg-white  flex items-center justify-center",
              ].join(" ")}
            >
              {node.label && (
                <span className="text-[#3a2e00] text-md font-bold text-center leading-tight px-2">
                  {node.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
