import { useRef } from "react";
import { assets } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const highlights = [
  { label: "No design skills needed" },
  { label: "Unlimited creative styles" },
  { label: "Results in seconds" },
];

const Description = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".desc-heading", { opacity: 0, y: 30, duration: 0.7 })
        .from(".desc-subtext", { opacity: 0, y: 20, duration: 0.6 }, 0.15)
        .from(
          ".desc-image-wrap",
          { opacity: 0, x: -60, scale: 0.95, duration: 0.9 },
          0.35,
        )
        .from(".desc-title", { opacity: 0, x: 40, duration: 0.7 }, 0.55)
        .from(
          ".desc-para",
          { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 },
          0.75,
        )
        .from(
          ".desc-highlight",
          { opacity: 0, x: -15, stagger: 0.1, duration: 0.5 },
          1.1,
        );

      // ambient float on image
      gsap.to(".desc-image-wrap", {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // glow pulse behind image
      gsap.to(".desc-glow", {
        opacity: 0.6,
        scale: 1.08,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  const handleImgEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleImgLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="desc-heading text-3xl sm:text-4xl font-bold mb-2 text-neutral-800">
        Create AI Images
      </h1>

      <p className="desc-subtext text-neutral-500 mb-14 text-center">
        Turn your imagination into stunning visuals in just a few seconds.
      </p>

      <div className="flex flex-col gap-10 md:gap-16 md:flex-row items-center">
        <div className="desc-image-wrap relative shrink-0">
          <div className="desc-glow absolute -inset-4 bg-linear-to-br from-violet-300/40 via-fuchsia-300/40 to-teal-300/40 rounded-2xl blur-2xl -z-10" />
          <img
            src={assets.Baby_hulk}
            alt="AI generated example artwork"
            onMouseEnter={handleImgEnter}
            onMouseLeave={handleImgLeave}
            className="w-80 xl:w-96 rounded-2xl shadow-xl ring-1 ring-white/70 cursor-pointer"
          />
        </div>

        <div>
          <h2 className="desc-title text-3xl font-medium max-w-lg mb-4 text-neutral-800">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="desc-para text-neutral-500 mb-4 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="desc-para text-neutral-500 mb-6 leading-relaxed">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don't yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>

          <div className="flex flex-col gap-2">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="desc-highlight flex items-center gap-2 text-neutral-600"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-violet-500 to-teal-500 text-white text-xs shrink-0">
                  ✓
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
