import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(containerRef.current, { opacity: 0.2, y: 100, duration: 1 })
        .from(".gen-heading", { opacity: 0, y: 20, duration: 0.7 }, 0.2)
        .from(".gen-btn", { opacity: 0, scale: 0.85, duration: 0.6 }, 0.5);

      // breathing glow on button
      gsap.to(".gen-btn", {
        boxShadow: "0 0 45px 8px rgba(217,70,239,0.35)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.3,
      });

      // floating sparkle accents
      gsap.to(".gen-sparkle-1", {
        y: -12,
        x: 6,
        rotate: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".gen-sparkle-2", {
        y: 10,
        x: -8,
        rotate: -15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // ambient glow blob drifting
      gsap.to(".gen-glow-blob", {
        x: 30,
        y: -20,
        scale: 1.1,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.06,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div ref={containerRef} className="pb-16 px-4">
      <div className="relative max-w-3xl mx-auto text-center overflow-hidden rounded-3xl border border-white/60 bg-linear-to-br from-violet-100/60 via-fuchsia-50/60 to-teal-100/60 backdrop-blur-xl px-8 py-14 md:py-20 shadow-lg shadow-violet-100">
        {/* Ambient glow blob */}
        <div className="gen-glow-blob absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-fuchsia-200/40 rounded-full blur-3xl -z-10" />

        {/* Floating sparkle accents */}
        <img
          src={assets.star_icon}
          alt=""
          className="gen-sparkle-1 absolute top-8 left-10 w-5 h-5 opacity-70 max-sm:hidden"
        />
        <img
          src={assets.star_icon}
          alt=""
          className="gen-sparkle-2 absolute bottom-10 right-12 w-4 h-4 opacity-60 max-sm:hidden"
        />

        <h1 className="gen-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800">
          See the magic. Try Now
        </h1>

        <button
          onClick={onClickHandler}
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          className="gen-btn cursor-pointer inline-flex items-center gap-2 px-12 py-3 mt-8 rounded-full 
                     bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200"
        >
          Generate Images
          <img src={assets.star_group} alt="" className="h-6" />
        </button>
      </div>
    </div>
  );
};

export default GenerateBtn;
