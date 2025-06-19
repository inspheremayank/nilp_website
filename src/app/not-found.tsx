import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  const t = useTranslations();

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
                  <div className="hw__error">{t('global.notFound')}!</div>
                </div>
                <div className="mt-4">
                  <Link href={'/'}>
                    <div className="text-center cmb-20">
                      <Button color="default" size="xs">
                       {t('global.backToHome')}
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
