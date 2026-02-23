"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PlayIcon from "@/assets/icons/playIcon";
import useOverflowHidden from "@/hooks/useOverflowHidden";
import { cardSlideAnimation } from "@/lib/utils";

const VideoPlay = ({ img, videoSrc = "/video.mp4" }) => {
  const [isOpen, setOpen] = useState(false);
  useOverflowHidden(isOpen);

  return (
    <>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={cardSlideAnimation()}
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-h-[400px] mt-10 lg:mt-0"
      >
        <Image
          src={img}
          loading="lazy"
          alt="video preview"
          width={698}
          height={400}
          className="w-full max-w-[698px] mx-auto h-full object-cover object-top"
        />

        {/* Play button */}
        <div
          onClick={() => setOpen(true)}
          className="md:w-[109px] md:h-[109px] w-24 h-24 rounded-full
                     absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     bg-[#D9D9D9]/[.78] cursor-pointer flex justify-center items-center"
        >
          <span className="ml-2.5">
            <PlayIcon width="30" height="36" />
          </span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-white text-3xl"
                aria-label="Close video"
              >
                ×
              </button>

              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full rounded-xl bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoPlay;
