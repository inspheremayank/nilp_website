'use client';

import React from 'react';

const VideoModal = (props: any) => {
  return (
    <div>
      <iframe
        width="100%"
        height="326"
        src="https://www.youtube.com/embed/Lir74aAz8vQ"
        title="Secretary, DoSEL, MoE- Speech Inauguration (ULLAS Mela)"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ borderRadius: '10px' }}
      ></iframe>
    </div>
  );
};

export default VideoModal;
