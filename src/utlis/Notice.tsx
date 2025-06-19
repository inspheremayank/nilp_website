'use client';

import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

import { APPIMAGES } from '@/config/config';
import { AppContext } from '@/context/AppContext';

const Notice = (props: any) => {
  // console.log( props.postData)
  // console.log('cc')
  const notices = props.postData;
  const limit = props.limit;

  const t = useTranslations();
  const { noticeActiveTab, setNoticeActiveTab } = useContext(AppContext);

  const categorizeNotices = () => {
    return notices?.reduce((categories: any, notice: any) => {
      const category = notice.metaInfo.category;

      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(notice);
      return categories;
    }, {});
  };
  const noticesByCategory = categorizeNotices();

  const latestNotices = () => {
    const currentDate = new Date();
    return notices?.filter((item: any) => {
      const noticeDate = new Date(item.postingDate);
      const daysDifference =
        (currentDate.getTime() - noticeDate.getTime()) / (1000 * 3600 * 24);
      return daysDifference <= 20 && daysDifference >= 0;
    });
  };

  const latestNoticesContent = latestNotices();

  const allNotices = {
    [t('global.latestTab')]: latestNoticesContent,
    ...noticesByCategory,
  };

  const allNoticesArray = Object.entries(allNotices).map(
    ([category, notices]: any) => ({
      category,
      notices,
    })
  );
  const sortedNoticesArray = allNoticesArray.map((categoryObj) => {
    const sortedNotices = categoryObj.notices.sort((a: any, b: any) => {
      return (
        new Date(b.postingDate).getTime() - new Date(a.postingDate).getTime()
      );
    });

    return {
      ...categoryObj,
      notices: sortedNotices,
    };
  });

  const handleTabClick = (category: any) => {
    setNoticeActiveTab(category);
    console.log(category);
  };

  return (
    <div className="tabbing_wrap d1">
      <ul id="tabContainer">
        {sortedNoticesArray.map((item, index) => (
          <li
            key={index}
            onClick={(e: any) => {
              setNoticeActiveTab(index);
              const targetTab = e.target;
              const left = targetTab.getBoundingClientRect().left - 10;
              const ScrollContainer = document.getElementById('tabContainer');
              ScrollContainer?.scrollTo({
                top: 0,
                left: left,
                behavior: 'smooth',
              });
            }}
          >
            <button
              className={`tabbing_wrap_item ${noticeActiveTab === index ? 'active' : ''}  `}
              onClick={() => handleTabClick(index)}
            >
              {item.category}
            </button>
          </li>
        ))}
      </ul>
      <div className="tabbing_wrap_content">
        <div className="tabbing_wrap_content_item">
          <div className="u-listView d2">
            <ul
              className={`tabbing_wrap_content_item active ${limit ? 'u-size' : ''}`}
            >
              {sortedNoticesArray[noticeActiveTab].notices.length > 0 ? (
                sortedNoticesArray[noticeActiveTab].notices
                  .slice(0, limit)
                  .map((notice: any) => (
                    <li key={notice.id}>
                      <span>
                        {notice.title}
                        {noticeActiveTab === 0 && (
                          <Image
                            src={APPIMAGES.IMG16}
                            alt="Icon"
                            className="notice-icon"
                            height={15}
                            width={25}
                          />
                        )}
                      </span>

                      <Link
                        href={notice.metaInfo.external_link}
                        className="u-button tertiary size-sm radius-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('global.download')}
                      </Link>
                    </li>
                  ))
              ) : (
                <div className="no_record">
                  <p>{t('global.noRecords')}</p>
                </div>
              )}
            </ul>
          </div>
          {limit && (
            <Link href="/whats-new" className="viewmore">
              {t('global.viewMore')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
