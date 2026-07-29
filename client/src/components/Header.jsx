import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const starRef = useRef(null);
  const gradientTextRef = useRef(null);
  const imagesRowRef = useRef(null);
  const statValueRefs = useRef([]);
  statValueRefs.current = [];

  const addStatRef = (el) => {
    if (el && !statValueRefs.current.includes(el)) {
      statValueRefs.current.push(el);
    }
  };

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  const stats = [
    { label: "Images generated", value: 2000000, suffix: "+", display: "2M+" },
    { label: "Happy creators", value: 50000, suffix: "+", display: "50K+" },
    { label: "Avg. generation time", value: 8, suffix: "s", display: "8s" },
  ];

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
        .from(".header-badge", { opacity: 0, y: -20, duration: 0.8 }, 0.2)
        // heading words fly up
        .from(
          ".header-heading-word",
          { opacity: 0, y: 30, rotateX: -40, stagger: 0.06, duration: 0.6 },
          0.4,
        )
        .from(".header-desc", { opacity: 0, duration: 0.8 }, 0.9)
        .from(".header-btn", { opacity: 0, scale: 0.9, duration: 0.6 }, 1.1)
        .from(".header-stats", { opacity: 0, y: 10, duration: 0.6 }, 1.3)
        .from(
          imagesRowRef.current.children,
          { opacity: 0, y: 20, stagger: 0.08, duration: 0.5 },
          1.45,
        )
        .from(".header-caption", { opacity: 0, duration: 0.6 }, 1.8)
        .add(() => {
          // count-up numbers once stats are visible
          statValueRefs.current.forEach((el, i) => {
            const targetValue = stats[i].value;
            const counter = { val: 0 };
            gsap.to(counter, {
              val: targetValue,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                const v = counter.val;
                let formatted;
                if (targetValue >= 1000000) {
                  formatted =
                    (v / 1000000).toFixed(v < targetValue ? 1 : 0) + "M+";
                } else if (targetValue >= 1000) {
                  formatted = Math.round(v / 1000) + "K+";
                } else {
                  formatted = Math.round(v) + "s";
                }
                el.textContent = formatted;
              },
            });
          });
        }, 1.3);

      // spinning star (infinite)
      gsap.to(starRef.current, {
        rotate: 360,
        duration: 6,
        repeat: -1,
        ease: "linear",
      });

      // shimmering gradient text (infinite)
      gsap.fromTo(
        gradientTextRef.current,
        { backgroundPosition: "0% center" },
        {
          backgroundPosition: "200% center",
          duration: 6,
          repeat: -1,
          ease: "linear",
          delay: 1.5,
        },
      );

      // ambient blobs drifting slowly
      gsap.to(".blob-1", {
        x: 20,
        y: 15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".blob-2", {
        x: -20,
        y: -10,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // button breathing glow (idle, subtle)
      gsap.to(".header-btn", {
        boxShadow: "0 0 40px 6px rgba(217,70,239,0.35)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // mouse parallax on blobs
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const xRatio = e.clientX / innerWidth - 0.5;
        const yRatio = e.clientY / innerHeight - 0.5;
        gsap.to(".blob-1", {
          x: xRatio * 40,
          y: yRatio * 30,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(".blob-2", {
          x: xRatio * -40,
          y: yRatio * -30,
          duration: 1.2,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  const handleImgEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      rotate: e.currentTarget.dataset.tilt,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleImgLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const heading = "Turn text into";

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-center text-center my-24 px-4 overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div className="blob-1 absolute -top-10 -left-20 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl -z-10" />
      <div className="blob-2 absolute top-20 -right-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col justify-center items-center text-center">
        <div
          className="header-badge text-stone-600 inline-flex items-center gap-2 bg-white/60 backdrop-blur-md 
                    px-6 py-1.5 rounded-full border border-white/80 shadow-sm shadow-violet-100"
        >
          <p className="text-sm font-medium">Best text-to-image generator</p>
          <img
            ref={starRef}
            src={assets.star_icon}
            alt=""
            className="w-4 h-4"
          />
        </div>

        <h1
          className="text-4xl sm:text-7xl max-w-2xl mx-auto mt-10 font-bold leading-tight text-neutral-800"
          style={{ perspective: "600px" }}
        >
          {heading.split(" ").map((word, i) => (
            <span key={i} className="header-heading-word inline-block mr-3">
              {word}
            </span>
          ))}
          <span
            ref={gradientTextRef}
            className="header-heading-word inline-block text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-fuchsia-500 to-teal-500 bg-[length:200%_auto]"
          >
            images
          </span>{" "}
          <span className="header-heading-word inline-block">in seconds</span>
        </h1>

        <p className="header-desc text-center max-w-2xl mx-auto mt-6 text-neutral-500 text-lg leading-relaxed">
          Unleash your creativity with AI. Transform your imagination into
          stunning visuals instantly—just type and watch the magic unfold.
        </p>

        <button
          onClick={onClickHandler}
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          className="header-btn cursor-pointer sm:text-lg text-white bg-linear-to-r from-violet-600 to-fuchsia-600 mt-8 px-14 py-3 flex items-center gap-3 rounded-full shadow-lg shadow-violet-200 transition-shadow duration-300"
        >
          Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
        </button>

        {/* Trust / stats strip */}
        <div className="header-stats flex flex-wrap justify-center gap-x-10 gap-y-2 mt-8 text-neutral-500">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                ref={addStatRef}
                className="text-lg sm:text-xl font-semibold text-neutral-700 tabular-nums"
              >
                0
              </span>
              <span className="text-xs tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

        <div
          ref={imagesRowRef}
          className="flex flex-wrap justify-center mt-14 gap-4"
        >
          {[
            assets.sample_img_1,
            assets.sample_img_2,
            assets.sample_img_3,
            assets.sample_img_4,
            assets.sample_img_5,
          ].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`AI Sample ${index + 1}`}
              onMouseEnter={handleImgEnter}
              onMouseLeave={handleImgLeave}
              className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer max-sm:w-16 w-20 ring-1 ring-white/60"
            />
          ))}
        </div>

        <p className="header-caption mt-3 text-neutral-400 text-sm tracking-wide">
          Generated with Imagify ✨
        </p>
      </div>
    </div>
  );
};

export default Header;
