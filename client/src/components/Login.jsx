import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const nameFieldRef = useRef(null);
  const closeIconRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload =
        state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
        shakeModal();
      }
    } catch (error) {
      toast.error(error.message);
      shakeModal();
    } finally {
      setLoading(false);
    }
  };

  const shakeModal = () => {
    gsap.fromTo(
      modalRef.current,
      { x: -8 },
      { x: 0, duration: 0.08, repeat: 5, yoyo: true, ease: "power1.inOut" },
    );
  };

  const handleClose = () => {
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setShowLogin(false),
    });
  };

  useGSAP(() => {
    gsap.from(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.from(modalRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.from(".login-field, .login-forgot, .login-submit, .login-switch", {
      opacity: 0,
      y: 12,
      stagger: 0.06,
      duration: 0.4,
      delay: 0.15,
      ease: "power2.out",
    });
  }, []);

  // animate name field in/out when switching between Login and Sign up
  useGSAP(
    () => {
      if (!nameFieldRef.current) return;
      if (state !== "Login") {
        gsap.fromTo(
          nameFieldRef.current,
          { height: 0, opacity: 0, marginTop: 0 },
          {
            height: "auto",
            opacity: 1,
            marginTop: 16,
            duration: 0.35,
            ease: "power2.out",
          },
        );
      }
    },
    { dependencies: [state] },
  );

  const handleSwitchState = (newState) => {
    if (newState === "Login" && nameFieldRef.current) {
      gsap.to(nameFieldRef.current, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setState(newState),
      });
    } else {
      setState(newState);
    }
  };

  const handleInputFocus = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: "#a78bfa",
      boxShadow: "0 0 0 4px rgba(167,139,250,0.15)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: "#e5e5e5",
      boxShadow: "0 0 0 0px rgba(167,139,250,0)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleCloseEnter = () => {
    gsap.to(closeIconRef.current, {
      rotate: 90,
      scale: 1.1,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };
  const handleCloseLeave = () => {
    gsap.to(closeIconRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-neutral-900/40 flex justify-center items-center px-4"
    >
      <form
        ref={modalRef}
        onSubmit={onSubmitHandler}
        className="relative bg-white/95 backdrop-blur-xl p-10 rounded-2xl text-neutral-500 w-full max-w-sm shadow-2xl shadow-violet-200 border border-white/80"
      >
        <h1 className="login-field text-center text-2xl text-neutral-800 font-semibold">
          {state}
        </h1>
        <p className="login-field text-sm text-center mt-1">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create an account to start generating"}
        </p>

        <div
          ref={nameFieldRef}
          className="overflow-hidden"
          style={{ height: state !== "Login" ? "auto" : 0 }}
        >
          <div className="login-field border border-neutral-200 px-6 py-2.5 flex items-center gap-2 rounded-full">
            <img src={assets.user_icon} alt="" className="w-4 h-4 opacity-60" />
            <input
              onChange={(e) => setName(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={name}
              type="text"
              className="outline-none text-sm w-full bg-transparent"
              placeholder="Full Name"
              required={state !== "Login"}
            />
          </div>
        </div>

        <div className="login-field border border-neutral-200 px-6 py-2.5 flex items-center gap-2 rounded-full mt-4 transition-colors">
          <img src={assets.email_icon} alt="" className="w-4 h-4 opacity-60" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={email}
            type="email"
            className="outline-none text-sm w-full bg-transparent"
            placeholder="Email address"
            required
          />
        </div>

        <div className="login-field border border-neutral-200 px-6 py-2.5 flex items-center gap-2 rounded-full mt-4 transition-colors">
          <img src={assets.lock_icon} alt="" className="w-4 h-4 opacity-60" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={password}
            type="password"
            className="outline-none text-sm w-full bg-transparent"
            placeholder="Password"
            required
          />
        </div>

        <p className="login-forgot text-sm text-violet-600 my-4 cursor-pointer hover:text-violet-800 transition-colors w-fit">
          Forgot Password?
        </p>

        <button
          type="submit"
          disabled={loading}
          className="login-submit bg-linear-to-r from-violet-600 to-fuchsia-600 w-full text-white py-2.5 rounded-full cursor-pointer 
                     shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-shadow duration-300
                     disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Please wait
            </>
          ) : state === "Login" ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </button>

        {state === "Login" ? (
          <p className="login-switch mt-5 text-center text-sm">
            Don't have an account?{" "}
            <span
              className="text-violet-600 font-medium cursor-pointer hover:text-violet-800 transition-colors"
              onClick={() => handleSwitchState("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="login-switch mt-5 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-violet-600 font-medium cursor-pointer hover:text-violet-800 transition-colors"
              onClick={() => handleSwitchState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          ref={closeIconRef}
          onClick={handleClose}
          onMouseEnter={handleCloseEnter}
          onMouseLeave={handleCloseLeave}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer w-4 h-4"
        />
      </form>
    </div>
  );
};

export default Login;
