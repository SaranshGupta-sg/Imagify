import { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setImage] = useState(assets.picture);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const containerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const progressBarRef = useRef(null);
  const resultImgRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, { opacity: 0.2, y: 100, duration: 1 });
    },
    { scope: containerRef },
  );

  const animateProgressStart = () => {
    gsap.set(progressBarRef.current, { width: "0%" });
    gsap.to(progressBarRef.current, {
      width: "90%",
      duration: 8,
      ease: "power1.out",
    });
    gsap.to(imageWrapRef.current, {
      boxShadow: "0 0 50px 8px rgba(124,58,237,0.25)",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  const animateProgressComplete = () => {
    gsap.killTweensOf(progressBarRef.current);
    gsap.killTweensOf(imageWrapRef.current);
    gsap.to(progressBarRef.current, {
      width: "100%",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(progressBarRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.2,
        });
      },
    });
    gsap.set(imageWrapRef.current, {
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    });
  };

  const animateNewImage = () => {
    gsap.fromTo(
      resultImgRef.current,
      { scale: 1.08, filter: "blur(8px)", opacity: 0.6 },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    gsap.set(progressBarRef.current, { opacity: 1 });
    animateProgressStart();

    try {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setIsImageLoaded(true);
        setImage(generatedImage);
        animateProgressComplete();
        requestAnimationFrame(animateNewImage);
      } else {
        gsap.killTweensOf(progressBarRef.current);
        gsap.killTweensOf(imageWrapRef.current);
        gsap.set(progressBarRef.current, { opacity: 0 });
        gsap.set(imageWrapRef.current, {
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        });
        toast.error("Couldn't generate image. Please try again.");
      }
    } catch (error) {
      gsap.killTweensOf(progressBarRef.current);
      gsap.killTweensOf(imageWrapRef.current);
      gsap.set(progressBarRef.current, { opacity: 0 });
      gsap.set(imageWrapRef.current, {
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      });
      toast.error(error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const handleGenerateAnother = () => {
    gsap.to(resultImgRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setIsImageLoaded(false);
        setInput("");
      },
    });
  };

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
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

  return (
    <form
      ref={containerRef}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4"
    >
      <div className="flex flex-col items-center">
        <div
          ref={imageWrapRef}
          className="relative rounded-2xl overflow-hidden ring-1 ring-white/70"
          style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
        >
          <img
            ref={resultImgRef}
            src={image}
            alt="Generated result"
            className="max-w-sm w-full rounded-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-200/50">
            <span
              ref={progressBarRef}
              className="block h-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-teal-500 opacity-0 rounded-r-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 mt-4 text-neutral-500 text-sm">
            <span className="w-3.5 h-3.5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
            Generating your image...
          </div>
        )}
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-white/70 backdrop-blur-xl text-neutral-800 text-sm p-1.5 mt-10 rounded-full border border-white/70 shadow-sm shadow-violet-100">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            disabled={loading}
            className="flex-1 ml-5 bg-transparent outline-none text-neutral-900 font-medium placeholder:text-neutral-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            className="bg-linear-to-r from-violet-600 to-fuchsia-600 text-white px-8 sm:px-12 py-3 rounded-full font-medium 
                       shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-shadow duration-300 cursor-pointer
                       disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-3 flex-wrap justify-center text-sm mt-10">
          <button
            type="button"
            onClick={handleGenerateAnother}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            className="cursor-pointer border border-neutral-200 text-neutral-700 px-8 py-3 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-colors duration-300 shadow-sm"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            className="cursor-pointer bg-linear-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-3 rounded-full shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-shadow duration-300"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
