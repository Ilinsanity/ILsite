import { useState } from "react";
import P3menu from "./components/p3menu.tsx";
import About from "./components/about.tsx";
import Work from "./components/work.tsx";
import Projects from "./components/projects.tsx";

type Page = "about" | "work" | "projects" | "contact";

function Appprev() {
  const [activePage, setActivePage] = useState<Page | null>(null);

  return (
    <div className="w-full h-screen bg-[#000BB5]">
      {activePage === null ? (
        <div className="h-full">
          <P3menu onNavigate={setActivePage} activePage={activePage} />
        </div>
      ) : (
        <div className="relative h-full overflow-auto p-4 md:p-8">
          <button
            type="button"
            onClick={() => setActivePage(null)}
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
  );
}

export default Appprev;
