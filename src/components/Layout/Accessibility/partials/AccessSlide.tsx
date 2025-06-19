import { useContext, useEffect, FC, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { AppContext } from '@/context/AppContext';
import Switch from './Switch';
import { useTranslations } from 'next-intl';

interface ActionTypo {
  slideState: boolean;
  audioState: boolean;
  mouseTrailState: boolean;
  handleSlidePanelClose: () => void;
  audioHandler: () => void;
  mouseHandler: () => void;
}

const AccessSlide: FC<ActionTypo> = (props) => {
  const t = useTranslations();

  const context = useContext(AppContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const [activeLight, setActiveLight] = useState(false);
  const [activeDark, setActiveDark] = useState(false);

  const currentTheme = theme === 'system' ? 'light' : theme;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fontSizeCases(val: number) {
      let fontCls = '';
      switch (val) {
        case 1:
          fontCls = 'font_increase_1';
          break;
        case 2:
          fontCls = 'font_increase_2';
          break;
        case 0:
          fontCls = 'font_default';
          break;
        case -1:
          fontCls = 'font_decrease_1';
          break;
        case -2:
          fontCls = 'font_decrease_2';
          break;
        default:
          fontCls = 'font_default';
      }

      return fontCls;
    }

    const fontClass = fontSizeCases(context.fontSize);
    if (fontClass !== '') {
      document.body.className = '';
      document.body.classList.add('app-mainWrapper');
      document.body.classList.add(`${fontClass}`);
    }
  }, [context.fontSize]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        props.handleSlidePanelClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.handleSlidePanelClose]);

  const fontIncreament = () => {
    if (context.fontSize !== 2) {
      context.setFontSize((prev: number) => prev + 1);
    }
  };

  const fontDefault = () => {
    context.setFontSize(0);
  };

  const fontDecreament = () => {
    if (context.fontSize !== -2) {
      context.setFontSize((prev: number) => prev - 1);
    }
  };
  useEffect(() => {
    if (currentTheme === 'light') {
      setActiveLight(true);
    } else {
      setActiveDark(true);
    }
  }, []);

  return (
    <>
      <div
        ref={modalRef}
        className={`accessibility_slide ${props.slideState ? 'active' : ''}`}
      >
        <div className="accessibility_slide_head">
          <h3>{t('global.accessibility')}</h3>
          <button onClick={props.handleSlidePanelClose}>
            <div className="hamburger_lines active">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button>
        </div>
        <section className="accessibility_slide_box">
          <h4 className="accessibility_slide_box_head">{t('global.textSize')}:</h4>
          <section className="accessibility_slide_box_actions">
            <button onClick={fontDecreament} className="action_btn">
              A-
            </button>
            <button onClick={fontDefault} className="action_btn">
              A
            </button>
            <button onClick={fontIncreament} className="action_btn">
              A+
            </button>
          </section>
        </section>
        <section className="accessibility_slide_box">
          <h4 className="accessibility_slide_box_head">{t('global.contrastScheme')}:</h4>
          <section className="accessibility_slide_box_actions">
            <button
              onClick={() => {
                setTheme('light');
                setActiveLight(true);
                setActiveDark(false);
              }}
              className={`action_btn light ${activeLight ? 'active-btn' : ''}`}
            >
            {t('global.light')}
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setActiveDark(true);
                setActiveLight(false);
              }}
              className={`action_btn dark ${activeDark ? 'active-btn' : ''}`}
            >
          {t('global.dark')}
            </button>
          </section>
        </section>
        {/* <section className="accessibility_slide_box">
          <h4 className="accessibility_slide_box_head">{t('global.textToAudio')}:</h4>
          <Switch isChecked={props.audioState} onChange={props.audioHandler} />
        </section> */}
      </div>
    </>
  );
};

export default AccessSlide;
