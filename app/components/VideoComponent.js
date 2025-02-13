"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Ensures the component only renders on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Avoids hydration errors

  return (
    <div className="col-md-6">
      <div className="relative">
        {!isPlaying ? (
          <>
            <Image
              className="img-fluid rounded"
              src="/images/video-player-thumb.png"
              alt="Video Thumbnail"
              width={700}
              height={500}
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full mx-auto my-auto"
              onClick={() => setIsPlaying(true)}
            >
              <FaRegCirclePlay size={70} className="text-white tf-ion-play" />
            </button>
          </>
        ) : (
          <video className="w-full rounded" controls autoPlay>
            <source src="/videos/video-live-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
