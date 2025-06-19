'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="c-innerBanner v2 empty_box"></div>

      <main className="c-body_container">
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="c-card d7 cmt-50 cmb-50 text-center">
                <Image
                  src={'/nilp/images/error.svg'}
                  alt="not found"
                  className="img-fluid"
                  width={600}
                  height={450}
                />
                <div className="hw d7">
                  <div className="hw__error">
                    {error.message}
                  </div>
                </div>
                <div className="mt-4">
                  {/* <button onClick={() => reset()}>Try again</button> */}

                  <Link href={'/'}>
                    <Button color="primary">Back to Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}