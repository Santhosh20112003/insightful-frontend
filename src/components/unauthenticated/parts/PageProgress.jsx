import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function PageProgress() {
  const { scrollYProgress } = useScroll();
     const scaleX = useSpring(scrollYProgress, {
       stiffness: 100,
       damping: 30,
       restDelta: 0.001
     });
  return <motion.div className="progress-bar fixed top-0 left-0 right-0 h-[5px] bg-blue-600 z-50 origin-[0%]" style={{ scaleX }} />;
}

export default PageProgress;
