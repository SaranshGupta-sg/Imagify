import { useRef } from "react";
import { stepsData } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Steps = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      // Heading: word-by-word reveal
      gsap.from(".steps-heading-word", {
        opacity: 0,
        y: 30,
        rotateX: -40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".steps-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Cards stagger in
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".steps-list",
          start: "top 80%",
          once: true,
        },
      });

      // Number badges pop in with a little delay after card
      gsap.from(".step-number", {
        scale: 0,
        rotate: -90,
        stagger: 0.15,
        duration: 0.5,
        delay: 0.3,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".steps-list",
          start: "top 80%",
          once: true,
        },
      });

      // Connecting line draws in
      gsap.fromTo(
        ".steps-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.inOut",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".steps-list",
            start: "top 75%",
            once: true,
          },
        },
      );

      // Icons gently float, offset per card so they don't move in sync
      cardsRef.current.forEach((card, i) => {
        const icon = card.querySelector(".step-icon");
        gsap.to(icon, {
          y: -6,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Traveling pulse dot down the connecting line
      gsap.to(".steps-pulse-dot", {
        top: "100%",
        duration: 3,
        repeat: -1,
        ease: "power1.inOut",
        delay: 1.5,
      });
    },
    { scope: containerRef },
  );

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      backgroundColor: "rgba(255,255,255,0.7)",
      boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
    const icon = e.currentTarget.querySelector(".step-icon");
    gsap.to(icon, {
      scale: 1.15,
      rotate: 8,
      duration: 0.35,
      ease: "back.out(2)",
    });
    const title = e.currentTarget.querySelector(".step-title");
    gsap.to(title, {
      x: 4,
      color: "#7c3aed",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      backgroundColor: "rgba(255,255,255,0.4)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.out",
    });
    const icon = e.currentTarget.querySelector(".step-icon");
    gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
    const title = e.currentTarget.querySelector(".step-title");
    gsap.to(title, {
      x: 0,
      color: "#262626",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const heading = "How It Works";

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center my-28 px-4"
    >
      <h1
        className="text-4xl sm:text-5xl font-bold mb-3 text-neutral-800 tracking-tight"
        style={{ perspective: "600px" }}
      >
        {heading.split(" ").map((word, i) => (
          <span key={i} className="steps-heading-word inline-block mr-3">
            {word}
          </span>
        ))}
      </h1>

      <p className="steps-subtext text-lg text-neutral-500 mb-14 text-center">
        Transform words into stunning visuals within seconds
      </p>

      <div className="steps-list relative w-full max-w-3xl">
        {/* Connecting line */}
        <div className="steps-line absolute left-[42px] top-2 bottom-2 w-0.5 bg-linear-to-b from-violet-300 via-fuchsia-300 to-teal-300 -z-10 max-sm:hidden" />
        {/* Traveling pulse dot */}
        <div className="steps-pulse-dot absolute left-[38px] top-0 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.5)] -z-10 max-sm:hidden" />

        <div className="space-y-6">
          {stepsData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="relative flex items-start gap-5 p-6 bg-white/40 backdrop-blur-xl 
                   border border-white/60 rounded-2xl cursor-pointer shadow-md"
              style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
            >
              <div className="step-icon relative w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br from-violet-500 via-fuchsia-500 to-teal-500 shadow-md shrink-0">
                <img src={item.icon} alt="" className="w-8 h-8" />
                <span className="step-number absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-bold text-violet-600 flex items-center justify-center shadow-sm ring-1 ring-violet-100">
                  {index + 1}
                </span>
              </div>

              <div>
                <h2 className="step-title text-xl font-semibold text-neutral-800 transition-colors">
                  {item.title}
                </h2>
                <p className="text-neutral-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;
