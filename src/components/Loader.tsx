import Image from 'next/image';

const Loader = (props: any) => {
  return (
    <>
      <div className={`u-loader ${props.cls !== undefined ? props.cls : 'd1'}`}>
        <div className="u-loader_overlay"></div>
        <div className="u-loader_container">
          <Image
            src="/nilp/images/loader.gif"
            width={200}
            height={100}
            alt="Loading..."
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
