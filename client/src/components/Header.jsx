import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <>
      <motion.div
        className="flex flex-col justify-center items-center text-center my-24 px-4"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-stone-600 inline-flex items-center gap-2 bg-white/50 backdrop-blur-md 
                    px-6 py-1.5 rounded-full border border-gray-300 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="text-sm font-medium">Best text-to-image generator</p>
          <img src={assets.star_icon} alt="" className="w-4 h-4" />
        </motion.div>

        <motion.h1 className="text-4xl sm:text-7xl max-w-2xl mx-auto mt-10 font-bold leading-tight">
          Turn text into{" "}
          <span
            className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-violet-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
          >
            images
          </span>{" "}
          in seconds
        </motion.h1>

        <motion.p
          className="text-center max-w-2xl mx-auto mt-6 text-gray-600 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Unleash your creativity with AI. Transform your imagination into
          stunning visuals instantly—just type and watch the magic unfold.
        </motion.p>

        <motion.button
          onClick={onClickHandler}
          className="cursor-pointer sm:text-lg text-white bg-black mt-8 px-14 py-3 flex items-center gap-3 rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-neutral-900 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8 },
            duration: 1,
          }}
        >
          Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
        </motion.button>

        <motion.div
          className="flex flex-wrap justify-center mt-20 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {Array(6)
            .fill("")
            .map((item, index) => (
              <img
                whileHover={{ scale: 1.05, duration: 0.1 }}
                key={index}
                src={
                  index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1
                }
                alt=""
                className="rounded-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer max-sm:w-16 w-20 shadow-md"
              />
            ))}
        </motion.div>

        <motion.p
          className="mt-3 text-neutral-500 text-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Generated with Imagify ✨
        </motion.p>
      </motion.div>
    </>
  );
};

export default Header;
