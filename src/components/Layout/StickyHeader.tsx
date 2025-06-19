'use client';

import { useState, useEffect, ReactNode } from 'react';

const StickyHeader = ({ children }: { children: ReactNode }) => {
  const [stickyHeader, setStickyHeader] = useState(false);

  useEffect(() => {
    const headerScroll = () => {
      setStickyHeader(() => window.scrollY > 50);
    }

    headerScroll();
    window.addEventListener('scroll', headerScroll);
    window.addEventListener('load', headerScroll);

    return () => {
      window.removeEventListener('scroll', headerScroll);
      window.removeEventListener('load', headerScroll);
    }
  }, []);

  return (
    <>
      <header className={`c-header ${stickyHeader ? 'sticky_header' : ''}`}>
        {children}
      </header>
    </>
  );
};

export default StickyHeader;
