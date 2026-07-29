import { useRef } from "react";
import { assets, testimonialsData } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Testimonials = () => {
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
      gsap.from(".testimonials-heading", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".testimonials-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.92,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
          once: true,
        },
      });

      cardsRef.current.forEach((card) => {
        const stars = card.querySelectorAll(".testimonial-star");
        gsap.from(stars, {
          scale: 0,
          rotate: -90,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(3)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
          delay: 0.4,
        });
      });
    },
    { scope: containerRef },
  );

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      rotateZ: 1,
      backgroundColor: "rgba(255,255,255,0.65)",
      boxShadow: "0 25px 45px -12px rgba(124, 58, 237, 0.2)",
      duration: 0.35,
      ease: "power2.out",
    });
    const avatar = e.currentTarget.querySelector(".testimonial-avatar");
    gsap.to(avatar, { scale: 1.08, duration: 0.35, ease: "back.out(2)" });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      rotateZ: 0,
      backgroundColor: "rgba(255,255,255,0.35)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      duration: 0.35,
      ease: "power2.out",
    });
    const avatar = e.currentTarget.querySelector(".testimonial-avatar");
    gsap.to(avatar, { scale: 1, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <h1 className="testimonials-heading text-3xl sm:text-4xl font-bold mb-2 text-neutral-800">
        Customer Testimonials
      </h1>

      <p className="testimonials-subtext text-neutral-500 mb-12">
        What Our Users Are Saying
      </p>

      <div className="testimonials-grid flex flex-wrap justify-center gap-6 px-4">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            ref={addToRefs}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            className="relative bg-white/35 backdrop-blur-xl p-10 pt-12 rounded-2xl border border-white/60
                       w-80 cursor-pointer"
            style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
          >
            {/* Decorative quote mark */}
            <span className="absolute top-4 left-6 text-6xl font-serif text-violet-200 select-none leading-none">
              "
            </span>

            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-avatar rounded-full w-14 h-14 object-cover ring-2 ring-white shadow-sm"
              />
              <h2 className="text-xl font-semibold mt-3 text-neutral-800">
                {testimonial.name}
              </h2>
              <p className="text-neutral-500 mb-4 text-sm">
                {testimonial.role}
              </p>

              <div className="flex gap-0.5 mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((_, i) => (
                    <img
                      src={assets.rating_star}
                      alt=""
                      key={i}
                      className="testimonial-star w-4 h-4"
                    />
                  ))}
              </div>

              <p className="text-center text-sm text-neutral-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
