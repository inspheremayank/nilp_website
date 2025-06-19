'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { useTranslations } from 'next-intl';

const Breadcumb = ({ data }: any) => {

  const pathname = usePathname();
  const t = useTranslations();
  const contentInfo = useContext(AppContext);
  var slug = '';
  if (pathname != null) {
    const getArrPath = pathname.split('/');
    const getPath = getArrPath[getArrPath.length - 1];
    slug = `/${getPath}`;
  }

  const [menuExist, setMenuExist] = useState(false);
  const [breadcumbMenu, setBreadcumbMenu] = useState([
    {
      id: 1,
      label: `${t('global.home')}`,
      url: '/',
    },
  ]);
  const getHeaderMenu = contentInfo.headerMenu;

  useEffect(() => {
    const processMenuItem = (
      menuItem: any,
      slug: string,
      breadcumbMenu: { id: number; label: string; url: string }[],
      parentMenu: any = null
    ) => {
      if (menuItem.link.split('.html')[0] == slug) {
        const currentBreadcumb = [
          {
            id: menuItem.id,
            label: menuItem.name,
            url: menuItem.link.split('.html')[0],
          },
        ];
        if (parentMenu) {
          currentBreadcumb.unshift({
            id: parentMenu.id,
            label: parentMenu.name,
            url: parentMenu.link,
          });
        }
        setMenuExist(true);
        setBreadcumbMenu([
          {
            id: 3344,
            label: `${t('global.home')}`,
            url: '/',
          },
          ...currentBreadcumb,
        ]);
      }

      menuItem.children.forEach(
        (subMenu: { link: string; id: any; name: any; children: any[] }) => {
          if (subMenu.link.split('.html')[0] == slug) {
            const currentBreadcumb = [
              {
                id: menuItem.id,
                label: menuItem.name,
                url: menuItem.link.split('.html')[0],
              },
              {
                id: subMenu.id,
                label: subMenu.name,
                url: subMenu.link.split('.html')[0],
              },
            ];
            if (parentMenu) {
              currentBreadcumb.unshift({
                id: parentMenu.id,
                label: parentMenu.name,
                url: parentMenu.link.split('.html')[0],
              });
            }
            setMenuExist(true);
            setBreadcumbMenu([
              {
                id: 1,
                label: `${t('global.home')}`,
                url: '/',
              },
              ...currentBreadcumb,
            ]);
          } else {
            if (
              subMenu.link != slug &&
              subMenu.link.split('.html')[0] ==
                `/${data.parentPageDetails.slug}`
            ) {
              const currentBreadcumb = [
                {
                  id: menuItem.id,
                  label: menuItem.name,
                  url: menuItem.link.split('.html')[0],
                },
                {
                  id: data.parentPageDetails.id,
                  label: data.parentPageDetails.title,
                  url: `/${data.parentPageDetails.slug}`,
                },
                { id: data.id, label: data.title, url: slug },
              ];

              if (parentMenu) {
                currentBreadcumb.unshift({
                  id: parentMenu.id,
                  label: parentMenu.name,
                  url: parentMenu.link,
                });
              }
              setMenuExist(true);
              setBreadcumbMenu([
                {
                  id: 1,
                  label: `${t('global.home')}`,
                  url: '/',
                },
                ...currentBreadcumb,
              ]);
            }
          }

          processMenuItem(subMenu, slug, breadcumbMenu, menuItem);

          subMenu.children.forEach(
            (subSubMenu: { link: any; id: any; name: any }) => {
              if (subSubMenu.link == slug) {
                const currentBreadcumb = [
                  {
                    id: menuItem.id,
                    label: menuItem.name,
                    url: menuItem.link.split('.html')[0],
                  },
                  { id: subMenu.id, label: subMenu.name, url: subMenu.link },
                  {
                    id: subSubMenu.id,
                    label: subSubMenu.name,
                    url: subSubMenu.link,
                  },
                ];

                if (parentMenu) {
                  currentBreadcumb.unshift({
                    id: parentMenu.id,
                    label: parentMenu.name,
                    url: parentMenu.link,
                  });
                }
                setMenuExist(true);
                setBreadcumbMenu([
                  {
                    id: 1,
                    label: `${t('global.home')}`,
                    url: '/',
                  },
                  ...currentBreadcumb,
                ]);
              }
            }
          );
        }
      );
    };

    // Assuming getHeaderMenu is your top-level menu
    getHeaderMenu.forEach((menuItem) => {
      processMenuItem(menuItem, slug, [...breadcumbMenu]);
    });

    if (menuExist == false) {
      if (data.taxonomy != undefined) {
        setBreadcumbMenu([
          {
            id: 1,
            label: `${t('global.home')}`,
            url: '/',
          },
          {
            id: data.taxonomy.id,
            label: data.taxonomy.name,
            url: `/${data.taxonomy.slug}`,
          },
          {
            id: data.id,
            label: data.title,
            url: `/${data.taxonomy.slug}${slug}`,
          },
        ]);
      } else {
        if (data.parentPageDetails && data.parentPageDetails.length > 0) {
          setBreadcumbMenu([
            {
              id: 1203,
              label: `${t('global.home')}`,
              url: '/',
            },
            {
              id: data.parentPageDetails[0].id,
              label: data.parentPageDetails[0].title,
              url: data.parentPageDetails[0].slug,
            },
            { id: data.id, label: data.title, url: slug },
          ]);
        } else {
          setBreadcumbMenu([
            {
              id: 1,
              label: `${t('global.home')}`,
              url: '/',
            },
            { id: data.id, label: data.title, url: slug },
          ]);
        }
      }
    }
  }, [t, slug, getHeaderMenu, menuExist, contentInfo.headerMenu]);

  return (
    <>
      <ul className="u-breadcrumb v2">
        {breadcumbMenu.map((cumb: any) => (
          <li key={cumb.id}>
            {cumb.url === '' ? (
              cumb.label
            ) : (
              <Link href={cumb.url}>{cumb.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Breadcumb;
