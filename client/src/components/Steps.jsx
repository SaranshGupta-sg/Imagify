import { stepsData } from "../assets/assets";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center my-28 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
          How It Works
        </h1>

        <p className="text-lg text-gray-600 mb-12 text-center">
          Transform words into stunning visuals within seconds
        </p>

        <div className="space-y-6 w-full max-w-3xl">
          {stepsData.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-5 p-6 bg-white/40 backdrop-blur-xl 
                   border border-white/50 shadow-lg rounded-2xl cursor-pointer
                   hover:shadow-xl hover:-translate-y-1 hover:bg-white/60
                   transition-all duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-500 shadow-md">
                <img src={item.icon} alt="" className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Steps;
