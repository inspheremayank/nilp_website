'use client';

import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setLanguage } = useContext(AppContext);
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setCurrentLocale(storedLocale);
  }, []);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    localStorage.setItem('locale', nextLocale);
    document.cookie = `locale=${nextLocale}; path=/`;
    setCurrentLocale(nextLocale);
    startTransition(() => {
      router.refresh();
    });
    setLanguage(nextLocale);
  };

  return (
    <label className="border-2 rounded d-flex align-items-center ms-3 language_selector">
      <select
        value={currentLocale}
        className="bg-black py-2 text-white"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </label>
  );
}
