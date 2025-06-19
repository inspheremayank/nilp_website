const LeadershipList = ({ postData }: any) => {
  return (
    <>
      {postData.map((item: any) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </>
  );
};

export default LeadershipList;
