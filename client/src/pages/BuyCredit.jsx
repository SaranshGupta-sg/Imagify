import { useContext, useRef, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BuyCredit = () => {
  const navigate = useNavigate();
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const [loadingPlan, setLoadingPlan] = useState(null);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".buy-badge", { opacity: 0, y: -15, duration: 0.6 })
        .from(".buy-heading", { opacity: 0, y: 20, duration: 0.7 }, 0.15)
        .from(
          cardsRef.current,
          { opacity: 0, y: 50, scale: 0.94, stagger: 0.12, duration: 0.7 },
          0.35,
        );

      // ambient float on the popular card's badge
      gsap.to(".popular-badge", {
        y: -4,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
    },
    { scope: containerRef },
  );

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      boxShadow: "0 25px 45px -12px rgba(124, 58, 237, 0.18)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razor",
            response,
            { headers: { token } },
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credit Added");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      modal: {
        ondismiss: () => setLoadingPlan(null),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      setLoadingPlan(planId);

      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId },
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
        setLoadingPlan(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoadingPlan(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] text-center pt-14 pb-20 px-4"
    >
      <button className="buy-badge inline-flex items-center gap-2 border border-violet-200 bg-white/60 backdrop-blur-md px-8 py-2 rounded-full mb-6 text-sm font-medium text-violet-700">
        <img src={assets.credit_star} alt="" className="w-4 h-4" />
        Our Plans
      </button>

      <h1 className="buy-heading text-center text-3xl sm:text-4xl font-bold mb-3 text-neutral-800">
        Choose the plan that's right for you
      </h1>
      <p className="buy-heading text-neutral-500 mb-12">
        Pick a credit pack, generate images, top up anytime.
      </p>

      <div className="flex flex-wrap justify-center items-stretch gap-6 text-left max-w-5xl mx-auto">
        {plans.map((item, index) => {
          const isPopular = index === 1;
          const isLoading = loadingPlan === item.id;

          return (
            <div
              key={index}
              ref={addToRefs}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className={`relative flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl py-12 px-8 text-neutral-600 w-72
                          border transition-colors duration-300
                          ${isPopular ? "border-violet-300 ring-2 ring-violet-100" : "border-white/70"}`}
              style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
            >
              {isPopular && (
                <span className="popular-badge absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md shadow-violet-200 whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <img width={40} src={assets.logo_icon} alt="" />
              <p className="mt-4 mb-1 font-semibold text-lg text-neutral-800">
                {item.id}
              </p>
              <p className="text-sm text-neutral-500">{item.desc}</p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-neutral-800">
                  ₹{item.price}
                </span>{" "}
                <span className="text-neutral-500">
                  / {item.credits} credits
                </span>
              </p>

              <button
                onClick={() => paymentRazorpay(item.id)}
                disabled={isLoading}
                className={`w-full mt-8 text-sm rounded-full py-2.5 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
                            disabled:opacity-70 disabled:cursor-not-allowed
                            ${
                              isPopular
                                ? "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300"
                                : "bg-neutral-800 text-white hover:bg-neutral-900"
                            }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing
                  </>
                ) : user ? (
                  "Purchase"
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyCredit;
