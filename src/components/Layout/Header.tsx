import { notFound } from 'next/navigation';

import { GET_MENU_ENDPOINT } from '@/config/apiConfig';
import { CONSTANTS } from '@/config/constant';
import { ERRORS } from '@/config/error';
import { getRequestServerSide } from '@/services/getServerSideRender';
import { cookies } from 'next/headers';
import HeaderMain from './partials/HeaderMain';
import HeaderTop from './partials/HeaderTop';
import StickyHeader from './StickyHeader';

async function getAPIRequest() {
  const response = await getRequestServerSide(
    `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.HEADER_MENU_SLUG}`, cookies().get('locale')?.value
  );

  return response;
}

async function fetchYouTubeVideos() {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UCENUi2ivZjSNrVYtHsMc5Gg';
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch YouTube videos');
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
     
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}


const Header = async () => {
 
  const response = await getAPIRequest();
  if (response.gettingError !== undefined) {
    if (response.gettingError === ERRORS.ERR_BAD_REQUEST) {
      notFound();
      return null; // Ensure the component doesn't render if notFound is triggered
    }
  }

  const headerMenu = response || [];
  const youtubeVideos = await fetchYouTubeVideos();

  return (
    <>
      {headerMenu.length > 0 && (
        <StickyHeader>
          <HeaderTop />
          <div className="c-header__wrapper">
            <HeaderMain menu={headerMenu} youtubeVideos={youtubeVideos}/>
          </div>
        </StickyHeader>
      )}
    </>
  );
};

export default Header;
