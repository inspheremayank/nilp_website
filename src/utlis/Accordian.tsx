'use client';

import Image from 'next/image';
import { useState } from 'react';

const Accordian = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(null);
  const toggleAccordion = (id: any) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };
  return (
    <>
      {data.map((item: any) => (
        <div key={item.id} className='admin-accordianWrapper' onClick={() => toggleAccordion(item.id)}>
          <div className="accordian-title">
            {item.title}
            {item.id == isOpen ? (
              <Image
                src="/newnilpportal/images/icons/minus.png"
                alt="+"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/newnilpportal/images/icons/plus.png"
                alt="-"
                width={20}
                height={20}
              />
            )}
          </div>

          <div
            className={`accordian-content ${item.id == isOpen ? 'active' : ''}`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordian;
