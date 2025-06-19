'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

const VisitorCounts = () => {
  const contentInfo = useContext(AppContext);

  return (
    <>
        {contentInfo.visitorsCount}
    </>
  );
};

export default VisitorCounts;
