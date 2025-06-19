import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
  setFancyboxIsActive?: Function;
  cls?:string;
}

function FancyBox(props: PropsWithChildren<Props>) {
  const containerRef = useRef(null);
  const setFancyboxIsActive = props.setFancyboxIsActive || undefined;

  if (setFancyboxIsActive) {
    NativeFancybox.defaults.on = {
      init: () => {
        setFancyboxIsActive(true);
      },
      close: () => {
        setFancyboxIsActive(false);
      },
    };
  }

  const delegate = props.delegate || '[data-fancybox]';
  const options = props.options || {};

  useEffect(() => {
    const container = containerRef.current;

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
    };
  });

  return <div ref={containerRef} className={`fancy-box ${props.cls}`} >{props.children}</div>;
}

export default FancyBox;
