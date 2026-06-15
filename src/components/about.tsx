import { animate, remove } from "animejs";
import { useEffect, useRef } from "react";

function About() {
  useEffect(() => {
    // animate(".text-hey", {
    //   y: [140, 0],
    //   opacity: [0, 1],
    //   duration: 500,
    //   ease: "inOut(1.68)",
    // });
  }, []);

  return (
    <div className="about bg-[#000BB5] w-full h-full flex items-center justify-center">
      <div className=""></div>
      <div className="flex flex-col items-center">
        <h1 className="text-hey text-6xl font-rodin text-primary">
          Hey, I'm Issac Lin
        </h1>
        <img
          src="../public/images/capy.jpeg"
          alt="Issac Lin"
          className="rounded-full w-100 h-100 mt-4 aspect-square"
        />
      </div>
    </div>
  );
}

export default About;
