import { animate, remove, spring } from "animejs";
import { useRef } from "react";

function P3Menu() {
  const activeAnims = useRef<Map<Element, ReturnType<typeof animate>>>(
    new Map(),
  );

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    remove(el);
    const anim = animate(el, {
      scale: [1, 1.3, 1.1],
      ease: spring({
        bounce: 0.65,
        duration: 200,
      }),
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

  return (
    <div className="p3menu bg-white w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-start">
        <button
          type="button"
          className="mitems block text-p3r3 hover:text-black transition-colors duration-200 font-rodin uppercase text-8xl -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left"
          style={{ transform: "rotate(-18deg)" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          skill
        </button>
        <button
          type="button"
          className="mitems block text-p3r1 hover:text-black transition-colors duration-200 font-rodin uppercase text-8xl -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left"
          style={{ transform: "rotate(-4deg) translateX(80px)" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          About
        </button>
        <button
          type="button"
          className="mitems block text-p3r2 hover:text-black transition-colors duration-200 font-rodin uppercase text-8xl -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left"
          style={{ transform: "rotate(7deg) translateX(-20px)" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          Work
        </button>
        <button
          type="button"
          className="mitems block text-p3r1 hover:text-black transition-colors duration-200 font-rodin uppercase text-8xl -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left"
          style={{ transform: "rotate(2deg) translateX(-20px)" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          Projects
        </button>
        <button
          type="button"
          className="mitems block text-p3r2 hover:text-black transition-colors duration-200 font-rodin uppercase text-8xl -tracking-widest cursor-pointer bg-transparent border-none p-0 text-left"
          style={{ transform: "rotate(-18deg) translateX(-67px)" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          Contact
        </button>
      </div>
    </div>
  );
}
export default P3Menu;
