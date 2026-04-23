import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo, heroImg } from '../utils'; // heroImage: الصورة بعد انتهاء الفيديو
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const [showVideo, setShowVideo] = useState(true); // لتحديد هل نعرض الفيديو أم الصورة

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
    setShowVideo(true); // عند تغيير حجم الشاشة، نعرض الفيديو من جديد
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative overflow-hidden">
      <div className="h-5/6 w-full flex-center flex-col relative">
        <p id="hero" className="hero-title z-10">HP Pavilion Gaming 15</p>
        <div className="md:w-10/12 w-9/12 relative z-0">
          {showVideo ? (
            <video
              className="w-full h-full object-cover pointer-events-none"
              autoPlay
              muted
              playsInline
              key={videoSrc}
              onEnded={() => setShowVideo(false)} // عند انتهاء الفيديو، نعرض الصورة
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroImg}
              alt="Hero"
              className="w-full h-full object-cover pointer-events-none"
            />
          )}
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20 z-10"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">Starting at $899</p>
      </div>
    </section>
  );
};

export default Hero;