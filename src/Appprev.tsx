import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

function Appprev() {
  const handleNavClick =
    (target: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      ScrollSmoother.get()?.scrollTo(target, true, "top top");
    };

  useLayoutEffect(() => {
    ScrollSmoother.get()?.kill();

    const splitHey = SplitText.create(".text-hey", { type: "chars" });
    const splitName = SplitText.create(".text-name", { type: "chars" });
    const splitAbt1 = SplitText.create(".text-abt1", { type: "chars" });
    const splitName2 = SplitText.create(".text-name2", { type: "words" });

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    gsap.set(".nav-logo, .nav-item", { autoAlpha: 0, y: -20 });
    gsap.set(".nav-border", { scaleX: 0, transformOrigin: "left" });
    gsap.set(".text-capy", { autoAlpha: 0, y: 20 });
    gsap.set(".img-capy", { autoAlpha: 0, y: 20, scale: 0.9 });

    const tl = gsap.timeline();

    tl.from(splitHey.chars, {
      yPercent: "random([-100, 100])",
      autoAlpha: 0,
      stagger: { amount: 0.2, from: "start" },
      ease: "power1",
    })
      .to(splitHey.chars, {
        autoAlpha: 0,
        yPercent: "random([-100, 100])",
        stagger: { amount: 0.2, from: "random" },
        ease: "power1.in",
      })
      .from(splitName.chars, {
        yPercent: "random([-100, 100])",
        autoAlpha: 0,
        stagger: { amount: 0.2, from: "start" },
        ease: "power1",
      })
      .to(
        ".nav-logo",
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4 },
        "<",
      )
      .to(
        ".nav-item",
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4, stagger: 0.1 },
        "<+=0.1",
      )
      .to(
        ".nav-border",
        { scaleX: 1, ease: "power2.inOut", duration: 1.3 },
        "<",
      );

    const tlAbt = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-about",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tlAbt
      .from(splitAbt1.chars, {
        autoAlpha: 0,
        yPercent: 100,
        stagger: { amount: 0.4, from: "start" },
        ease: "power2.out",
        duration: 0.6,
      })
      .from(
        splitName2.words,
        {
          autoAlpha: 0,
          y: 30,
          stagger: { amount: 0.6, from: "start" },
          ease: "power2.out",
          duration: 0.5,
        },
        "-=0.2",
      )
      .to(
        ".text-capy",
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4 },
        "-=0.2",
      )
      .to(
        ".img-capy",
        { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.5 },
        "-=0.1",
      )
      .to(".img-capy", { y: -28, ease: "none", duration: 0.9 }, ">");

    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger?.kill();
      tlAbt.scrollTrigger?.kill();
      tl.kill();
      tlAbt.kill();
      splitHey.revert();
      splitName.revert();
      splitAbt1.revert();
      splitName2.revert();
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 bg-background">
          <a
            href="#home"
            className="nav-logo text-primary font-bold text-xl"
            onClick={handleNavClick("#home")}
          >
            IL
          </a>
          <div className="nav-border absolute bottom-0 left-0 w-full h-px bg-primary/20" />
          <ul className="flex gap-8 text-primary/80 text-sm tracking-widest uppercase">
            <li className="nav-item">
              <a
                href="#about"
                className="hover:text-primary transition-colors"
                onClick={handleNavClick("#about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#work"
                className="hover:text-primary transition-colors"
                onClick={handleNavClick("#work")}
              >
                Work
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
                onClick={handleNavClick("#contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div
          className="relative h-screen w-full flex flex-col items-center justify-center bg-background bg-cover bg-center bg-no-repeat"
          id="home"
          style={{ backgroundImage: 'url("/images/mount.JPG")' }}
        >
          <div className="relative text-6xl text-center text-primary">
            <p className="text-hey absolute inset-0 flex items-center justify-center">
              hey
            </p>
            <p className="text-name">Issac Lin here</p>
          </div>
        </div>
        <section id="about">
          <div className="section-about h-screen w-full flex flex-col bg-background">
            <div className="relative text-6xl text-primary mt-10 ml-10">
              <p className="text-abt1">some things about me</p>
            </div>
            <div className="mx-auto mt-10 w-full max-w-6xl px-16 text-primary">
              <div className="text-3xl leading-relaxed md:text-4xl">
                <img
                  className="img-capy float-right ml-10 mb-6 block h-80 w-80 rounded-full object-cover"
                  src="/images/capy.jpeg"
                  alt="capybara"
                  style={{
                    clipPath: "circle(50%)",
                    shapeOutside: "circle(50%)",
                    shapeMargin: "1.5rem",
                  }}
                />
                <p className="text-name2 text-left">
                  I love to learn more about web development and design. finding
                  new ways to create engaging user experiences is my passion. I
                  enjoy exploring motion, typography, and layout systems that
                  make a page feel alive without losing clarity. The best work
                  to me feels playful, readable, and intentional from the first
                  scroll to the last.
                </p>
                <p className="text-capy mt-6 text-left text-2xl clear-none">
                  I also love capybaras!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="min-h-screen w-full bg-background px-10 py-28 text-primary"
          id="work"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/60">
              Work
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="text-3xl">Interactive Frontend</h2>
                <p className="mt-4 text-lg text-primary/80">
                  Building motion-driven interfaces with React, GSAP, and a
                  strong focus on pacing, clarity, and feel.
                </p>
              </article>
              <article className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="text-3xl">Design Systems</h2>
                <p className="mt-4 text-lg text-primary/80">
                  Turning visual ideas into reusable UI patterns that stay sharp
                  across the whole site.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          className="min-h-screen w-full bg-background px-10 py-28 text-primary"
          id="contact"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/60">
              Contact
            </p>
            <h2 className="text-5xl">Let&apos;s build something thoughtful.</h2>
            <p className="text-xl text-primary/80">
              I care about expressive interfaces, solid implementation, and
              details that make a site feel intentional.
            </p>
            <a
              href="mailto:isaac@example.com"
              className="mx-auto mt-4 rounded-full border border-primary/30 px-6 py-3 text-sm uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-background"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Appprev;
