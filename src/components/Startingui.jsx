import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";

function Startingui() {
    const Lazycomponent = lazy(() => wait(3000).then(() => import("./Login")));
  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time); //execute the function when the output is resolve.
    });
  }
  return (
    <>
        <Suspense
          fallback={
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 1 }}
              transition={{ duration: 0.35, delay: 2.82, ease: "easeIn" }}
              className="mx-auto h-screen w-screen checkinbg bg-cover bg-center flex justify-center items-center font-serif text-[2.5rem]  md:text-[6rem] italic font-bold text-blue-800"
            >
              CALM YOU
            </motion.div>
          }
        >
          <Lazycomponent />
        </Suspense>

    </>
  );
}

export default Startingui;
