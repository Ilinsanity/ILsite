import { animate, remove } from "animejs";
import { useEffect, useRef } from "react";

type Page = "about" | "work" | "projects" | "contact";

function P3Menu({
  onNavigate,
  activePage,
}: {
  onNavigate: (page: Page) => void;
  activePage: Page | null;
}) {
  const activeAnims = useRef<Map<Element, ReturnType<typeof animate>>>(
    new Map(),
  );

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    remove(el);
    const anim = animate(el, {
      scale: [1, 1.3],
      duration: 100,
      ease: "outIn(1.68)",
    });
    activeAnims.current.set(el, anim);
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    activeAnims.current.get(el)?.cancel();
    remove(el);
    animate(el, {
      scale: 1,
      duration: 200,
      ease: "in(3)",
    });
  };

  useEffect(() => {
    const SPLIT_DURATION = 500;
    const slideAnim = animate(".menubutt", {
      opacity: [0, 1],
      translateX: (el: Element, i: number) => {
        const dirs = [-200, 200, 0, 0];
        return [dirs[Math.floor(Math.random() * dirs.length)], 0];
      },
      translateY: (el: Element, i: number) => {
        const dirs = [-200, 200, 0, 0];
        return [dirs[Math.floor(Math.random() * dirs.length)], 0];
      },
      duration: 350,
      ease: "inBack(1.7)",
      delay: (el: Element, i: number) => 250 + i * 150,
    });

    const frontScreenAnimTop = animate(".fscreentop", {
      translateY: ["0%", "-100%"],
      duration: SPLIT_DURATION,
      ease: "outSine",
    });

    const frontScreenAnimBot = animate(".fscreenbot", {
      translateY: ["0%", "100%"],
      duration: SPLIT_DURATION,
      ease: "outSine",
      onComplete: () => {
        const frntscreen = document.querySelector(".frntscreen") as HTMLElement;
        if (frntscreen) frntscreen.style.display = "none";
      },
    });
    const syncAnim = animate(".pink-tri-scale, .mask-tri-sync", {
      clipPath: [
        "polygon(95% 0%, 80% 40%, 0% 32%)",
        "polygon(98.93% 0%, 81.73% 40.28%, 0% 32.64%)",
        "polygon(95% 0%, 80% 40%, 0% 32%)",
      ],
      duration: 200,
      ease: "inOutSine",
      loopDelay: 800,
      loop: true,
    });

    return () => {
      frontScreenAnimTop.cancel();
      frontScreenAnimBot.cancel();
      slideAnim.cancel();
      syncAnim.cancel();
    };
  }, []);
  // Returns "opacity-100" when this page is active, so effects stay visible
  const activeClass = (page: Page) =>
    activePage === page ? "opacity-100" : "opacity-0";

  // Shared responsive class strings
  // Triangle box scales from 200×140px at small viewports to 500×350px at large
  const triBox = (page: Page) =>
    `absolute inset-0 pointer-events-none z-0 w-[clamp(200px,40vw,500px)] h-[clamp(140px,28vw,350px)] transition-opacity duration-200 group-hover:opacity-100 ${activeClass(page)}`;
  // Red text overlay: same box, padding compensates for translate(-10%,-10%)
  const redText = (page: Page) =>
    `absolute inset-0 text-[#FF0000] pointer-events-none z-20 italic font-rodin uppercase text-[clamp(2rem,5vw,6rem)] -tracking-widest w-[clamp(200px,40vw,500px)] h-[clamp(140px,28vw,350px)] pt-[clamp(14px,2.8vw,35px)] pl-[clamp(20px,4vw,50px)] transition-opacity duration-200 group-hover:opacity-100 ${activeClass(page)}`;
  const triStyle1 = {
    clipPath: "polygon(95% 0%, 80% 40%, 0% 32%)",
    transform: "translate(-10%, -11%)",
  } as React.CSSProperties;
  const triStyle2 = {
    clipPath: "polygon(92% 1%, 76% 40%, 10% 32%)",
    transform: "translate(-10%, -11%)",
  } as React.CSSProperties;
  const btnBase =
    "mitems italic relative block hover:text-black transition-colors duration-200 font-rodin uppercase text-[clamp(2rem,5vw,6rem)] -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left";

  return (
    <div className="p3menu bg-[#000BB5] w-full h-full flex items-center justify-center px-3 sm:px-6 md:px-10 lg:px-20 relative">
      {/* Back layer */}
      <div className="w-screen h-screen absolute z-20  frntscreen flex flex-col overflow-hidden">
        <div className="flex w-full h-full bg-white fscreentop"></div>
        <div className="flex w-full h-2 bg-transparent"></div>
        <div className="flex w-full h-full bg-white fscreenbot"></div>
      </div>

      {/* Front layer */}
      <div className="flex flex-col items-start absolute z-0">
        {/* About */}
        <div className="group relative inline-block">
          <button
            type="button"
            className={`${btnBase} text-p3r1`}
            style={{
              transform: "rotate(-4deg) translateX(clamp(20px,3vw,80px))",
            }}
            onClick={() => onNavigate("about")}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className={`${triBox("about")} bg-p3rpink pink-tri-scale`}
              style={triStyle1}
            />
            <div className={`${triBox("about")} bg-white`} style={triStyle2} />
            <span className="relative z-10 menubutt inline-block">About</span>
            <span
              aria-hidden="true"
              className={`mask-tri-sync ${redText("about")}`}
              style={triStyle1}
            >
              About
            </span>
            <span
              aria-hidden="true"
              className={redText("about")}
              style={triStyle2}
            >
              About
            </span>
          </button>
        </div>

        {/* Work */}
        <div className="group relative inline-block">
          <button
            type="button"
            className={`${btnBase} text-p3r2`}
            style={{
              transform: "rotate(7deg) translateX(clamp(-8px,-1.5vw,-20px))",
            }}
            onClick={() => onNavigate("work")}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className={`pink-tri-scale ${triBox("work")} bg-p3rpink`}
              style={triStyle1}
            />
            <div className={`${triBox("work")} bg-white`} style={triStyle2} />
            <span className="relative z-10 menubutt inline-block">Work</span>
            <span
              aria-hidden="true"
              className={`mask-tri-sync ${redText("work")}`}
              style={triStyle1}
            >
              Work
            </span>
            <span
              aria-hidden="true"
              className={redText("work")}
              style={triStyle2}
            >
              Work
            </span>
          </button>
        </div>

        {/* Projects */}
        <div className="group relative inline-block">
          <button
            type="button"
            className={`${btnBase} text-p3r1`}
            style={{
              transform: "rotate(2deg) translateX(clamp(-8px,-1.5vw,-20px))",
            }}
            onClick={() => onNavigate("projects")}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className={`pink-tri-scale ${triBox("projects")} bg-p3rpink`}
              style={triStyle1}
            />
            <div
              className={`${triBox("projects")} bg-white`}
              style={triStyle2}
            />
            <span className="relative z-10 menubutt inline-block">
              Projects
            </span>
            <span
              aria-hidden="true"
              className={`mask-tri-sync ${redText("projects")}`}
              style={triStyle1}
            >
              Projects
            </span>
            <span
              aria-hidden="true"
              className={redText("projects")}
              style={triStyle2}
            >
              Projects
            </span>
          </button>
        </div>

        {/* Contact */}
        <div className="group relative inline-block">
          <button
            type="button"
            className={`${btnBase} text-p3r2`}
            style={{
              transform: "rotate(-13deg) translateX(clamp(-27px,-3vw,-67px))",
            }}
            onClick={() => onNavigate("contact")}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className={`pink-tri-scale ${triBox("contact")} bg-p3rpink`}
              style={triStyle1}
            />
            <div
              className={`${triBox("contact")} bg-white`}
              style={triStyle2}
            />
            <span className="relative z-10 menubutt inline-block">Contact</span>
            <span
              aria-hidden="true"
              className={`mask-tri-sync ${redText("contact")}`}
              style={triStyle1}
            >
              Contact
            </span>
            <span
              aria-hidden="true"
              className={redText("contact")}
              style={triStyle2}
            >
              Contact
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default P3Menu;
