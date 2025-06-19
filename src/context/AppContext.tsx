'use client';

import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import AOS from 'aos';
import {
  serverRequest,
  getRequestServerSide,
} from '@/services/getServerSideRender';
import { GET_STATES, GET_MENU_ENDPOINT, TOTAL_VISITORS } from '@/config/apiConfig';
import { CONSTANTS } from '@/config/constant';
import { decrypt } from '@/utlis/encryption';
import { usePathname } from 'next/navigation';
interface EncryptedData {
  mobile: string;
  state: string;
  district: string;
  isSearch: boolean;
  mediumOfInstructions: string;
  registrationId: string;
  mobileNumber: string;
}
type contextType = {
  headerMenu: never[];
  stateDropdown: any[];
  audioState: boolean;
  fontSize: number;
  setAudioState: Dispatch<SetStateAction<boolean>>;
  setFontSize: Dispatch<SetStateAction<number>>;
  encryptDataValue: any;
  setEncryptDataValue: Dispatch<SetStateAction<any>>;
  language: any;
  setLanguage: any;
  visitorsCount:string;
  pageInfo: any;
  noticeActiveTab : any;
  setNoticeActiveTab :  Dispatch<SetStateAction<any>>;
  ageOptions: { value: string; label: string }[];
  vtAgeOptions: { value: string; label: string }[];
  globalLoader: any;
  setGlobalLoader: Dispatch<SetStateAction<any>>;
  alertModal: any;
  handleShowAgain: () => void;
  handleClose: () => void;
  setYouTubeVideos: Dispatch<SetStateAction<any>>;
  youtubeVideo:any
};

export const AppContext = createContext<contextType>({
  headerMenu: [],
  stateDropdown: [],
  fontSize: 0,
  audioState: false,
  setAudioState: () => { },
  setFontSize: () => { },
  encryptDataValue: {},
  setEncryptDataValue: () => { },
  language: '',
  setLanguage: () => { },
  visitorsCount: '',
   pageInfo: null,
  noticeActiveTab:'',
  setNoticeActiveTab:()=>{},
  ageOptions: [],
  vtAgeOptions: [],
  globalLoader: false,
  setGlobalLoader: () => { },
  alertModal: false,
  handleShowAgain: () => {},
  handleClose: () => {},
  setYouTubeVideos: () => {},
  youtubeVideo:[]
});

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

const ageOptions = (): { value: string; label: string }[] => {
  const options = [];
  for (let i = 15; i <= 100; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }
  return options;
};


const vtAgeOptions = (): { value: string; label: string }[] => {
  const options = [];
  for (let i = 12; i <= 100; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }
  return options;
};
const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [headerMenu, setHeaderMenu] = useState([]);
  const [dropDownObj, setDropDownObj] = useState<any>([]);
  const [visitorsCount, setVisitorsCount] = useState<any>([]);
  const [audioState, setAudioState] = useState(false);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [fontSize, setFontSize] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [encryptDataValue, setEncryptDataValue] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [noticeActiveTab, setNoticeActiveTab] = useState(0);
  const [ageOptionsState, setAgeOptionsState] = useState<{ value: string; label: string }[]>([]);
  const [vtAgeOptionsState, setvtAgeOptionsState] = useState<{ value: string; label: string }[]>([]);
  const [globalLoader, setGlobalLoader] = useState('');
  const [alertModal, setAlertModal] = useState(false)
  const pathname = usePathname();
  const [youtubeVideo,setYouTubeVideos]=useState<any[]>([])


  useEffect(() => {
    const perRequiredRequest = async () => {
      // getting header menu
      const getHeaderMenu = await getRequestServerSide(
        `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.HEADER_MENU_SLUG}`
      );
      if (getHeaderMenu.length > 0) {
        setHeaderMenu(getHeaderMenu);
      }
    };
    perRequiredRequest();

    const getDropdownInfo = async () => {
      const dropdownInfo = await serverRequest(
        null,
        GET_STATES,
        CONSTANTS.REQUEST_GET
      );
      if (dropdownInfo && dropdownInfo.status == CONSTANTS.STATUS_FAILED) {
        setDropDownObj([]);
      }
      if (dropdownInfo && dropdownInfo.status == CONSTANTS.STATUS_SUCCESS) {
        const decryptedData = JSON.parse(decrypt(dropdownInfo.data));
        setDropDownObj(decryptedData);
      }
    };

    const getVisitorsCount = async () => {
      const count = await serverRequest(
        null,
        TOTAL_VISITORS,
        CONSTANTS.REQUEST_GET
      );
      if (count && count.status == CONSTANTS.STATUS_FAILED) {
        setVisitorsCount(0);
      }
      if (count && count.status == CONSTANTS.STATUS_SUCCESS) {
        const decryptedData = decrypt(count.data);
        setVisitorsCount(decryptedData);
      }
    };

    getDropdownInfo();
    getVisitorsCount();

    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const links = document.querySelectorAll('a');

      const speakText = (text: any) => {
        const speechSynthesis = window.speechSynthesis;
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const playVoice = voices.find(
          (voice) =>
            voice.name == 'Tessa' || voice.name == 'Google UK English Female'
        );

        if (playVoice) {
          utterance.voice = playVoice;
        }
        speechSynthesis.speak(utterance);
      };

      const initializeSpeechSynthesis = () => {
        const voices = window.speechSynthesis.getVoices();
        voices.find(
          (voice) =>
            voice.name == 'Tessa' || voice.name == 'Google UK English Female'
        );
      };

      // Wait for voices to be loaded
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = initializeSpeechSynthesis;
      }

      initializeSpeechSynthesis();

      const handleMouseEnter = (event: any) => {
        if (window.speechSynthesis && audioState) {
          speakText(event.currentTarget.innerText);
        } else {
          console.error('speechSynthesis is not available');
        }
      };

      const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection !== null) {
          const text = selection.toString().trim();
          if (text !== '' && text !== selectedText && audioState) {
            setSelectedText(text);
            speakText(text);
          }
        }
      };

      const handleRange = (e: any) => {
        const { target } = e;
        const selection = window.getSelection();
        if (target instanceof HTMLElement && audioState) {
          target.classList.contains('form_grider_wrap_field')
            ? ''
            : selection?.removeAllRanges();
        }
      };

      const handleTouchEnd = () => {
        const selection = window.getSelection();
        if (
          selection !== null &&
          selection.toString().trim() !== '' &&
          selection.toString().trim() !== selectedText &&
          audioState
        ) {
          setSelectedText(selection.toString().trim());
          speakText(selection.toString().trim());
        }
      };

      if (document.readyState === 'complete' && audioState) {
        links.forEach((a) => {
          a.addEventListener('mouseenter', handleMouseEnter);
        });
        document.addEventListener('mouseup', handleTextSelection);
        document.addEventListener('click', handleRange);
        document.addEventListener('touchend', handleTouchEnd);
      }

      return () => {
        links.forEach((a) => {
          a.removeEventListener('mouseenter', handleMouseEnter);
        });
        document.removeEventListener('mouseup', handleTextSelection);
        document.removeEventListener('click', handleRange);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [audioState, selectedText]);

  useEffect(() => {
    const options = ageOptions();
    setAgeOptionsState(options);
  }, []);

  useEffect(() => {
    const options = vtAgeOptions();
    setvtAgeOptionsState(options);
  }, []);

  const stateDropdown = useMemo(() => {
    if (dropDownObj) {
      return Object.keys(dropDownObj).map((key) => ({
        value: dropDownObj[key].state_id,
        label: dropDownObj[key].state_name,
      }));
    }
    return [];
  }, [dropDownObj]);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLanguage(storedLocale);

  }, [])

  ///////

  useEffect(() => {
  if (pathname === '/') {
    setAlertModal(true);
  } else {
    setAlertModal(false); 
  }
}, [pathname]);

const handleClose = () => {
  setAlertModal(false);
};

const handleShowAgain = () => {
  setAlertModal(true);
};

  return (
    <AppContext.Provider
      value={{
        stateDropdown,
        headerMenu,
        audioState,
        setAudioState,
        fontSize,
        setFontSize,
        encryptDataValue,
        setEncryptDataValue,
        language,
        setLanguage,
        visitorsCount,
        pageInfo,
        noticeActiveTab,
        setNoticeActiveTab,
        ageOptions: ageOptionsState,
        vtAgeOptions: vtAgeOptionsState,
        globalLoader,
        setGlobalLoader,
        alertModal,
        handleClose,
        handleShowAgain,
        setYouTubeVideos,
        youtubeVideo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
