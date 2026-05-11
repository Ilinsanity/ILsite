import { useState } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  // let split = SplitText.create(".thistext", { type: "chars, words" });
  // gsap.from(split.chars, {
  //   yPercent: "random([-100, 100])",
  //   autoAlpha: 0,
  //   stagger: {
  //     amount: 2,
  //     from: "start",
  //     // repeat: -1,
  //     // yoyo: true,
  //   },
  //   ease: "power1",
  // });
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-background">
        {" "}
        <p className="thistext text-6xl text-center text-primary">
          bet you know, bet you know, bet you know I 레시핀 없어 딴 데서는 못
          찾아 Take it, don't break it, I wanna see you taste it Sugar, I got
          sugar, 난 재료 안 아끼지
        </p>{" "}
      </div>
    </>
  );
}

export default App;
