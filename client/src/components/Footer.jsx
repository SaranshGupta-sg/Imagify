import { useRef } from "react";
import { assets } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socials = [
  { icon: assets.facebook_icon, label: "Facebook" },
  { icon: assets.twitter_icon, label: "Twitter" },
  { icon: assets.instagram_icon, label: "Instagram" },
];

const Footer = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  const handleIconEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      y: -3,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };

  const handleIconLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-between gap-4 py-6 mt-20 border-t border-white/60"
    >
      <img src={assets.logo} alt="Imagify" width={150} />

      <p className="flex-1 border-l border-neutral-300 pl-4 text-sm text-neutral-500 max-sm:hidden">
        Copyright © {new Date().getFullYear()} Imagify — All rights reserved.
      </p>

      <div className="flex gap-3">
        {socials.map((social, i) => (
          <img
            key={i}
            src={social.icon}
            alt={social.label}
            width={35}
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
            className="cursor-pointer rounded-full p-1.5 bg-white/50 shadow-sm hover:shadow-md hover:bg-white/80 transition-colors duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
