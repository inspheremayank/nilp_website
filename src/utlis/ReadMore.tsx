'use client';
import { FC, useState } from 'react';

const ReadMore = (props: any) => {
  const [contentToggler, setContentToggler] = useState(false);
  const filteredData = props.data.filter(
    (items: any) => items.props !== undefined
  );
  const handleToggler = () => {
    setContentToggler((prev) => !prev);
  };
  return (
    <>
      <div
        className={props.cls != undefined && props.cls != '' ? props.cls : ''}
      >
        {filteredData.length > 0 &&
          filteredData
            .filter(
              (items: any, index: number) =>
                index <
                (props.limit != undefined && props.limit != ''
                  ? props.limit
                  : 2)
            )
            .map((content: any) => {
              return (
                <content.type
                  width={content.props.width ? content.props.width : ''}
                  height={content.props.height ? content.props.height : ''}
                  className={content.props.className}
                  key={content.key}
                >
                  {content.props.children}
                </content.type>
              );
            })}
        {contentToggler &&
          filteredData.length > 0 &&
          filteredData
            .filter(
              (items: any, index: any) =>
                index >
                (props.limit != undefined && props.limit != ''
                  ? props.limit - 1
                  : 1)
            )
            .map((content: any) => {
              return (
                <content.type
                  alt={content.props.alt ? content.props.alt : ''}
                  src={content.props.src ? content.props.src : ''}
                  width={content.props.width ? content.props.width : ''}
                  height={content.props.height ? content.props.height : ''}
                  className={content.props.className}
                  key={content.key}
                >
                  {content.props.children}
                </content.type>
              );
            })}
        <div className="cmt-20 cpb-20">
          <button
            className="u-button secondary bordered size-sm radius-sm"
            onClick={handleToggler}
          >
            {contentToggler ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReadMore;
