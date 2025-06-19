'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const DynamicTabs = (props: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const data = props.data;
  var search: any = '';
  if (searchParams != null) {
    search = searchParams.get('tab');
  }
  const [openTab, setOpenTab] = useState<any>(null);
  useEffect(() => {
    if (search != null) {
      setOpenTab(search);
    } else {
      if (props.data[0].key != null) {
        setOpenTab(props.data[0].key);
      }
    }
  }, [search]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <>
      <div
        className={`tabbing_wrap ${props.varient !== undefined && props.varient !== '' ? props.varient : 'd1'}`}
      >
        <>
          <ul>
            {data.length > 0 &&
              data.map((item: any, index: number) => {
                return (
                  <li
                    key={item.key}
                    onClick={() => {
                      setOpenTab(item.key);
                      router.push(
                        pathname +
                          '?' +
                          createQueryString('tab', `${item.key}`),
                        { scroll: false }
                      );
                    }}
                  >
                    <button
                      className={`tabbing_wrap_item ${openTab == item.key ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
          </ul>

          {props.children}
        </>
      </div>
    </>
  );
};

export default DynamicTabs;
