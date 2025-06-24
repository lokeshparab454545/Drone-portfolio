import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    src: "/videos/hero-1.mp4",
    text: "Capture from the Sky",
  },
  {
    src: "/videos/hero-3.mp4",
    text: "Elevate Your Vision",
  },
  {
    src: "/videos/hero-4.mp4",
    text: "Precision in Every Frame",
  },
];

const Features = () => {
  const containerRef = useRef(null);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const loadedCount = useRef(0);

  const handleVideoLoaded = () => {
    loadedCount.current += 1;
    if (loadedCount.current === videos.length) {
      setVideosLoaded(true);
    }
  };

  useEffect(() => {
    if (!videosLoaded) return;

    const sections = gsap.utils.toArray(".video-section");
    const vh = window.innerHeight - 280;

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `${vh * index}px `,
        end: () => `${vh * (index + 1)}px `,
        onEnter: () => {
          sections.forEach((s, i) => {
            gsap.to(s, { opacity: i === index ? 1 : 0, duration: 0.5 });
            const v = s.querySelector("video");
            if (i === index) v?.play();
            else v?.pause();
          });
        },
        onEnterBack: () => {
          sections.forEach((s, i) => {
            gsap.to(s, { opacity: i === index ? 1 : 0, duration: 0.6 });
            const v = s.querySelector("video");
            if (i === index) v?.play();
            else v?.pause();
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [videosLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: "300vh", maxHeight: "300vh" }}
      id="portfolio"
    >
      {!videosLoaded && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {videos.map((video, index) => (
        <div
          key={index}
          className="video-section sticky top-0 left-0 w-full h-screen flex items-center justify-center bg-black text-white pointer-events-none"
        >
          <video
            src={video.src}
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            onLoadedMetadata={handleVideoLoaded}
          />
          <div className="relative z-10 text-center text-white text-4xl font-bold mix-blend-difference px-4">
            {video.text}
          </div>
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
      ))}
    </div>
  );
};

export default Features;
