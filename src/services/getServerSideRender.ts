import { API_URL, CLIENT_URL, API_TOKEN, API_NETWORK_GUID, BASE_URL } from '@/config/apiConfig';
import { CONSTANTS } from '@/config/constant';
import { KEYS } from '@/config/key';
import crypto from 'crypto';
import { ERRORS } from '@/config/error';

const headers = {
  'X-Token': `Bearer ${API_TOKEN}`,
  'X-Network-Guid': API_NETWORK_GUID,
  'X_AUTHORIZATION_TOKEN': CONSTANTS.X_AUTHORIZATION_TOKEN
};

export async function getRequestServerSide(params: any, language?: any) {
  console.log('ss', `${API_URL}${params}`)
  try {
    const url = `${API_URL}${params}`;
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...headers,
        'Accept-Language': language != undefined ? language : CONSTANTS.LANGUAGE_ENGLISH,
      },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return { gettingError: ERRORS.ERR_INTERNAL_SERVER };
    } else {
      const apiRequest = await res.json();
      // in case of main api
      const apiData = apiRequest.data;

      if (apiData !== undefined && apiData.length !== 0) {
        return apiData;
      } else {
        return { gettingError: ERRORS.ERR_BAD_REQUEST };
      }
    }
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return { gettingError: ERRORS.ERR_INTERNAL_SERVER };
  }
}

export async function getRequestClientSide(params: any, language?: any) {
  try {
    const url = `${CLIENT_URL}${params}`;
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        ...headers,
        'Accept-Language': language != undefined ? language : CONSTANTS.LANGUAGE_ENGLISH,
      },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return { gettingError: ERRORS.ERR_INTERNAL_SERVER };
    } else {
      const apiRequest = await res.json();
      // in case of main api
      const apiData = apiRequest.data;

      if (apiData !== undefined && apiData.length !== 0) {
        return apiData;
      } else {
        return { gettingError: ERRORS.ERR_BAD_REQUEST };
      }
    }
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return { gettingError: ERRORS.ERR_INTERNAL_SERVER };
  }
}

export async function serverRequest(
  request: any,
  url: string,
  methodName: string,
  isSignature: boolean = true,
  isAuthorization: boolean = true,
  isBlob: boolean = false
) {
  const timestamp = Date.now().toString();
  const URL = `${BASE_URL}${url}`;

  var requestHeaders = await getHeader(
    url,
    request,
    timestamp,
    isSignature,
    isAuthorization
  );
  var response = null;
  if (methodName === CONSTANTS.REQUEST_GET) {
    response = await fetch(url, {
      method: methodName,
      headers: requestHeaders,
    });
  } else {
    response = await fetch(url, {
      method: methodName,
      headers: requestHeaders,
      body: JSON.stringify(request),
    });

    if (isBlob) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return {
      status: CONSTANTS.SUCCESS,
      data: await response.blob() 
    };
  }
  }
  const json = await response.json();
  if (
    json &&
    json?.errors &&
    json.errors.length > 0 &&
    json?.errors[0]?.message
  ) {
  }
  return json;
}

export async function getHeader(url: string, request: any, timestamp: string, isSignature: boolean = true, isAuthorization: boolean = true) {
  const headers: any = {};
  headers[KEYS.CONTENT_TYPE] = CONSTANTS.REQUEST_FORMAT;
  headers[KEYS.ACCEPT_TYPE] = CONSTANTS.RESPONSE_FORMAT;
  headers[KEYS.ACCEPT_LANGUAGE] = CONSTANTS.LANGUAGE_ENGLISH;
  headers[KEYS.X_AUTHORIZATION_TOKEN] = CONSTANTS.X_AUTHORIZATION_TOKEN;

  // get signature
  if (isSignature) {
    headers[KEYS.TIMESTAMP] = timestamp;
    headers[KEYS.SIGNATURE] = await generateSignature(
      timestamp,
      url,
      request
    );
  }

  // if (isAuthorization) {
  //   headers[KEYS.AUTHORIZATION] = KEYS.BEARER + auth_token;
  // }

  return headers;
}
export async function generateSignature(timestamp: string, url: string, request: any) {
  var strArr = url.split("/");
  var methodName = strArr[4];
  var inServiceParam = strArr[5];
  var inClientParam = strArr[6];

  var detail = "null" + timestamp;
  detail = detail + getHashCode(detail);

  detail = detail + JSON.stringify(request);
  var data = methodName + timestamp + inServiceParam + inClientParam + detail;
  // var cipher = crypto.createCipheriv(
  //   CONSTANTS.CIPHER_KEY,
  //   CONSTANTS.SECRET_KEY,
  //   CONSTANTS.IV
  // );
  // let encrypted = cipher.update(data);
  // encrypted = Buffer.concat([encrypted, cipher.final()]);
  // console.log('data=>', encrypted.toString('hex'));
  // return encrypted.toString('base64');

  var cipher = crypto.createHmac(
    CONSTANTS.HASHING_ALGORITHM,
    CONSTANTS.SIGNATURE_KEY
  );
  const signature = cipher.update(data).digest('base64');
  return signature.toString() + "hjfghfghfghff";
}
export function getHashCode(data: any) {
  var hash = 0;
  var char;
  var mCodeArray = strToUtf16Bytes(data);
  var codeArray = mCodeArray.filter((item) => {
    return item != 0;
  });

  for (var i = 0; i < codeArray.length; i++) {
    char = codeArray[i];
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}
export function strToUtf16Bytes(str: any) {
  const bytes = [];
  for (let ii = 0; ii < str.length; ii++) {
    const code = str.charCodeAt(ii); // x00-xFFFF
    bytes.push(code & 255, code >> 8); // low, high
  }
  return bytes;
}