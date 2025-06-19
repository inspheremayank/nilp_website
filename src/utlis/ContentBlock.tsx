import { use } from 'react';
import { GET_CONTENT_BLOCK_ENDPOINT } from '@/config/apiConfig';
import { ERRORS } from '@/config/error';
import { getRequestServerSide } from '@/services/getServerSideRender';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import ErrorBoundary from '@/components/ErrorBoundary';

// async function getAPIRequest(slugInfo: string) {
//   const response = await getRequestServerSide(
//     `${GET_CONTENT_BLOCK_ENDPOINT}?keyword=${slugInfo}`,
//     cookies().get('locale')?.value
//   );

//   return response;
// }

// async function getData(params: string) {
//   const dataPromise = getAPIRequest(params);
//   const response = await dataPromise;

//   if (response.gettingError !== undefined) {
//     if (response.gettingError == ERRORS.ERR_BAD_REQUEST) {
//       throw notFound();
//     }
//   } else {
//     return response[0];
//   }
// }

const ContentBlock = (props: any) => {
  // const postData = use(getData(props.slug));

  // let PostComponentRender = props.component;

  // PostComponentRender = dynamic(
  //   () => import(`./ContentBlock/${props.component}`)
  // );

  return (
    <>
      {/* <ErrorBoundary>
        <PostComponentRender data={postData} />
      </ErrorBoundary> */}
    </>
  );
};

export default ContentBlock;
