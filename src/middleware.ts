import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS' || req.method === 'DELETE') {
    console.log('options triggered');
    return new NextResponse('Forbidden', { status: 403 });
  }


  const response = NextResponse.next();
  response.headers.delete('x-powered-by');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}


export const config = {
  matcher: ['/', '/nilp', '/api/:path*'],
};