import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.picture);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmiHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };
  return (
    <motion.form
      onSubmit={onSubmiHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? "w-full transition-all duration-[10s]" : "w-0"}`}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Loading.....</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-white text-gray-800 text-sm p-1 mt-10 rounded-full border border-gray-300 shadow-sm">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 ml-5 bg-transparent outline-none text-gray-900 font-semibold placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-3 rounded-full font-medium transition-all shadow-md cursor-pointer"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-sm p-0.5 mt-10">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="cursor-pointer border border-gray-300 text-gray-800 px-8 py-3 rounded-full bg-white hover:bg-gray-100 transition-all shadow-sm"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-md transition-all"
          >
            {" "}
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
