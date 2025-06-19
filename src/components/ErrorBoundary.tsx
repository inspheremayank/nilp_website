'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Button from './Button';
import Image from 'next/image';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const pathname = usePathname();

  return (
    <>
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
                  {/* <button onClick={resetErrorBoundary}>Try again</button> */}
                  {pathname !== '/' && (
                    <Link href="/">
                      <Button color="primary">Back to Home</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
