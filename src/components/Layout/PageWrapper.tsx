import dynamic from 'next/dynamic';

import parse, {
  HTMLReactParserOptions,
  Element,
  attributesToProps,
  domToReact,
  DOMNode,
} from 'html-react-parser';

const PostList = dynamic(() => import('@/utlis/PostList'));
const ContentBlock = dynamic(() => import('@/utlis/ContentBlock'));
const PageSlider = dynamic(() => import('@/utlis/PageSlider'));
const LogoSlider = dynamic(() => import('@/utlis/LogoSlider'));
const Tabs = dynamic(() => import('@/utlis/Tabs'));
const MarqueeComp = dynamic(() => import('@/utlis/MarqueeComp'));
const VideoModal = dynamic(() => import('@/utlis/VideoModal'));
const Process = dynamic(() => import('@/utlis/Process'));
const CustomCounters = dynamic(() => import('@/utlis/CustomCounters'));
const CustomSlmaDirector = dynamic(() => import('@/utlis/CustomSlmaDirector'));
const HighChartMap = dynamic(() => import('@/utlis/HighChartMap'));
const ReadMore = dynamic(() => import('@/utlis/ReadMore'));
const Accordian = dynamic(() => import('@/utlis/Accordian'));



const PageWrapper = ({ pageData }: any) => {
  const pageMedia = pageData?.media;
  var filteredMedia: any;
  if (pageMedia != null) {
    filteredMedia = pageMedia.filter((items: any) => items.type == 'image');
  }

  const pageContent = pageData.content;
  const pageOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (!domNode.attribs) {
          return;
        }
        if (domNode.name === 'custompost') {
          const props = attributesToProps(domNode.attribs);
          return <PostList {...props} />;
        }

        // if (domNode.name === 'customblock') {
        //   const props = attributesToProps(domNode.attribs);
        //   return <ContentBlock {...props} />;
        // }
        if (domNode.name === 'customlogoslide') {
          return (
            <LogoSlider data={domToReact(domNode.children as DOMNode[])} />
          );
        }
        if (domNode.name === 'customprocess') {
          const props = attributesToProps(domNode.attribs);
          return (
            <Process
              {...props}
              data={domToReact(domNode.children as DOMNode[])}
            />
          );
        }
        if (domNode.name === 'customchart') {
          return <HighChartMap />;
        }
        if (domNode.name === 'customcounters') {
          return <CustomCounters />;
        }

        if (domNode.name === 'customtabs') {
          const props = attributesToProps(domNode.attribs);
          return (
            <Tabs {...props} data={domToReact(domNode.children as DOMNode[])} />
          );
        }
        if (domNode.name === 'customaccordian') {
          const props = attributesToProps(domNode.attribs);
          return (
            <Accordian {...props} data={domToReact(domNode.children as DOMNode[])} />
          );
        }
        
        if (domNode.name === 'custommarquee') {
          const props = attributesToProps(domNode.attribs);
          return (
            <MarqueeComp
              {...props}
              data={domToReact(domNode.children as DOMNode[])}
            />
          );
        }
        if (domNode.name === 'customblockpage') {
          return <></>;
        }

        if (domNode.name === 'customvideo') {
          const props = attributesToProps(domNode.attribs);
          return (
            <VideoModal
              {...props}
              data={domToReact(domNode.children as DOMNode[])}
            />
          );
        }

        if (domNode.name === 'customslmadirector') {
          return <CustomSlmaDirector />;
        }
        if (domNode.name === 'customreadmore') {
          const props = attributesToProps(domNode.attribs);
          return (
            <ReadMore
              {...props}
              data={domToReact(domNode.children as DOMNode[])}
            />
          );
        }
      }
    },
  };
  // const pageHeadOptions: HTMLReactParserOptions = {
  //   replace: (domNode) => {
  //     if (domNode instanceof Element && domNode.attribs) {
  //       if (domNode.name === 'customblockpage') {
  //         const props = attributesToProps(domNode.attribs);
  //         return <ContentBlock {...props} />;
  //       } else {
  //         return <></>;
  //       }
  //     } else {
  //       return <></>;
  //     }
  //   },
  // };

  //const parsedContent = parse(pageContent, pageHeadOptions);
  return (
    <>
      <div className="c-body_container">
        {/* {parsedContent &&
        typeof parsedContent === 'object' &&
        'length' in parsedContent
          ? parsedContent
              .filter((item: any) => item.props.component == 'PageHead')
              .map((filteredItem: any, index: number) => (
                <div className="c-pageHead_container" key={index}>
                  <div className="container custom_container">
                    <div className="row">
                      <div className="col-12">
                        <div className="c-card d1">
                          {filteredMedia.length > 0 && (
                            <aside>
                              <PageSlider media={filteredMedia} />
                            </aside>
                          )}
                          {parse(pageContent, pageHeadOptions)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          : ''} */}
        <main className="c-body_container_content">
          {parse(pageContent, pageOptions)}
        </main>
      </div>
    </>
  );
};

export default PageWrapper;
