import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import gta from "/gta.mp3";

function App() {
  let [showContent, setshowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(gta));
  useEffect(() => {
    audio.loop = true; // Enable infinite loop
    return () => audio.pause(); // Cleanup on unmount
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 180,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setshowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 1.15,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      // client x is my mouse value, win width is full screen width it will go from -20 to +20
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`, //0.4 is * to decrease the speed intensity
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.5,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 bg-transparent">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-5 h-1 bg-white"></div>
                </div>
                <h3 className="text-3xl -mt-[12px] leading-none text-white">
                  RockStar{" "}
                  <button onClick={togglePlay}>
                    <img
                      className="px-2 py-2 w-10 -mt-[7px] cursor-pointer"
                      src="play.png"
                      alt=""
                    />
                  </button>
                </h3>
              </div>
            </div>
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="sky rotate-[-20deg] absolute scale-[1.5] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute rotate-[-5deg] bg scale-[1.7] top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-4 absolute top-20 left-1/2 -translate-x-1/2 scale-[0.8] rotate-[-10deg]">
                <h1 className="text-9xl -ml-30 leading-none">grand</h1>
                <h1 className="text-9xl ml-20 leading-none">theft</h1>
                <h1 className="text-9xl -ml-25 leading-none">auto</h1>
                <h1 className="text-9xl absolute left-[calc(100%-70px)] top-1/2 translate-y-1/2 leading-none">
                  VI
                </h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 w-full max-h-[100vh] rotate-[-20deg] object-contain"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute left-0 bottom-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-2xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll down
                </h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50px]"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[0.7] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[40%] py-10">
                <h1 className="text-6xl">GTA VI</h1>
                <h1 className="text-6xl">Welcome to the ganster world</h1>
                <p className="mt-12 font-bold text-xl font-[Helvetica_Now_Display]">
                  Jason and Lucia have always known the deck is stacked against
                  them. But when an easy score goes wrong, they find themselves
                  on the darkest side of the sunniest place in America, in the
                  middle of a criminal conspiracy stretching across the state of
                  Leonida — forced to rely on each other more than ever if they
                  want to make it out alive.
                </p>
                <p className="mt-3 font-bold text-xl font-[Helvetica_Now_Display]">
                  I hauled so much grass in that plane, I could make the state
                  of Leonida levitate.Nothing better than a Mudslide at sunset.
                </p>
                <button className="bg-yellow-500 text-black mt-4 px-5 py-5 text-xl cursor-pointer">
                  Download now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
