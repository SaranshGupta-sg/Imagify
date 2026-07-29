import { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const NavBar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      if (!dropdownRef.current) return;
      if (dropdownOpen) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -8, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
        );
      }
    },
    { dependencies: [dropdownOpen], scope: navRef },
  );

  const handleCreditEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handleCreditLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" });
  };

  const handleLoginEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -1,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handleLoginLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-40 flex items-center justify-between py-3 px-2 sm:px-4 mt-2
                 bg-white/60 backdrop-blur-lg rounded-full border border-white/70 shadow-sm shadow-violet-100"
    >
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              onMouseEnter={handleCreditEnter}
              onMouseLeave={handleCreditLeave}
              className="flex items-center gap-2 bg-linear-to-r from-violet-100 to-teal-100 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full border border-white/80"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-neutral-600">
                Credits left : {credit}
              </p>
            </button>
            <p className="text-neutral-600 max-sm:hidden pl-2">
              Hi, {user.name}
            </p>

            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img
                src={assets.profile_icon}
                className="cursor-pointer w-10 rounded-full ring-2 ring-white shadow-sm"
                alt=""
              />
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="cursor-pointer absolute top-0 right-0 z-10 text-neutral-700 rounded-2xl pt-12"
                >
                  <ul className="list-none m-0 p-2 bg-white/95 backdrop-blur-md rounded-xl border border-white/80 shadow-lg text-sm min-w-[110px]">
                    <li
                      onClick={logout}
                      className="py-2 px-3 cursor-pointer rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors duration-200"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-neutral-600 hover:text-violet-700 transition-colors duration-300"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
              className="cursor-pointer bg-linear-to-r from-violet-600 to-fuchsia-600 text-white px-7 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-shadow duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
