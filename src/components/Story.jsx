import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const FloatingImage = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  return (
    <section
      id="about"
      className="w-full bg-white text-black px-6 py-16 md:py-24"
      ref={ref}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full rounded-xl overflow-hidden border shadow-md mx-auto md:mx-0">
          <img
            src="/img/photo.png"
            alt="Drone Pilot"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-xl font-semibold uppercase tracking-widest">
            Lokesh Parab
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Man behind the Drone
          </h2>

          <p className="text-gray-600">
            I’m Lokesh Parab, a passionate <b>Drone Pilot</b> with 1 years of
            hands-on experience. I’ve been capturing stunning{" "}
            <b>Aerial Visuals</b> for the Real Estate, Marketing, and Travel
            Industries.
          </p>

          <p className="text-gray-600">
            I work with my <b>DJI Mini 3</b> to deliver high-quality drone
            footage that helps Businesses grow and promote their localities with
            stunning cinematic Drone shots.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <p className="text-3xl font-bold">
                {startCount && <CountUp end={1} duration={2} suffix="+" />}
              </p>
              <p className="text-sm text-gray-600">Years of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {startCount && <CountUp end={150} duration={2} suffix="+" />}
              </p>
              <p className="text-sm text-gray-600">
                Hours of Flying Experience
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {startCount && <CountUp end={10} duration={2} suffix="+" />}
              </p>
              <p className="text-sm text-gray-600">
                Projects across Industries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImage;
