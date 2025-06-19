type PageHeadProps = {
  data: pageHeadTypo;
};

type pageHeadTypo = {
  id: string;
  guid: string;
  networkId: string;
  title: string;
  content: string;
  keywords: string;
  status: string;
};
import parse from 'html-react-parser';

const PageHead = ({ data }: PageHeadProps) => {  
  return <>{parse(data.content)}</>;
};

export default PageHead;
