import { useState, useRef, useCallback } from "react";
import { animate } from "animejs";
import P3menu from "./components/p3menu.tsx";
import About from "./components/about.tsx";
import Work from "./components/work.tsx";
import Projects from "./components/projects.tsx";

type Page = "about" | "work" | "projects" | "contact";

function Appprev() {
  const [activePage, setActivePage] = useState<Page | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const transitionTo = useCallback((toPage: Page | null) => {
    if (isAnimating.current || !containerRef.current) return;
    isAnimating.current = true;

    const goingToMenu = toPage === null;

    animate(containerRef.current, {
      opacity: [1, 0],
      translateX: goingToMenu ? [0, 40] : [0, -40],
      duration: 200,
      ease: "inCubic",
      onComplete: () => {
        setActivePage(toPage);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!containerRef.current) {
              isAnimating.current = false;
              return;
            }
            animate(containerRef.current, {
              opacity: [0, 1],
              translateX: goingToMenu ? [-40, 0] : [40, 0],
              duration: 350,
              ease: "outCubic",
              onComplete: () => {
                isAnimating.current = false;
              },
            });
          });
        });
      },
    });
  }, []);

  return (
    <div className="w-full h-screen bg-[#000BB5] overflow-hidden">
      <div ref={containerRef} className="h-full">
        {activePage === null ? (
          <div className="h-full">
            <P3menu onNavigate={transitionTo} activePage={activePage} />
          </div>
        ) : (
          <div className="relative h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 md:p-8">
            <button
              type="button"
              onClick={() => transitionTo(null)}
              className="absolute top-4 left-4 md:top-6 md:left-6 rounded border border-white/60 px-4 py-2 text-white font-rodin uppercase tracking-wide hover:bg-white hover:text-[#000BB5] transition-colors"
            >
              Return To Menu
            </button>

            <div className="h-full flex items-center justify-center pt-16 md:pt-20">
              {activePage === "about" && <About />}
              {activePage === "work" && <Work />}
              {activePage === "projects" && <Projects />}
              {activePage === "contact" && (
                <h1 className="text-white font-rodin text-4xl">Contact</h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appprev;
