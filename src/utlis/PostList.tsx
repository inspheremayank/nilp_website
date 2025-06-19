import { use, useState } from 'react';
import { cookies } from 'next/headers';
import { GET_POST_ENDPOINT } from '@/config/apiConfig';
import { ERRORS } from '@/config/error';
import { getRequestServerSide } from '@/services/getServerSideRender';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

async function getAPIRequest(slugInfo: string) {
  const response = await getRequestServerSide(
    `${GET_POST_ENDPOINT}?slug=${slugInfo}`
  );

  return response;
}

export async function getData(params: string) {
  const dataPromise = getAPIRequest(params);
  const response = await dataPromise;

  if (response.gettingError !== undefined) {
    if (response.gettingError == ERRORS.ERR_BAD_REQUEST) {
      throw notFound();
    }
  } else {
    return response;
  }
}

const PostList = (props: any) => {
  const postData = use(getData(props.slug));
  let PostComponentRender = props.component;
  PostComponentRender = dynamic(() => import(`./${props.component}`), {
      loading: () => <div>Loading component...</div>,
      ssr: false,
    });

  return (
    <>
      <PostComponentRender postData={postData} limit={props.limit} />
    </>
  );
};

export default PostList;
