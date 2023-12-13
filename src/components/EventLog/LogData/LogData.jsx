import Style from "./LogData.style";

const tHeadData = [
  // 이벤트 로그 테이블 헤더
  { width: "30%", name: "발생 시간" },
  { width: "15%", name: "ID" },
  { width: "55%", name: "발생 내용" },
];

const tBodyData = [
  // 이벤트 로그 mock데이터
  {
    id: "배터리 1",
    content: "배터리 1 과전류 발생",
  },
  {
    id: "배터리 2",
    content: "연결이 끊어졌습니다.",
  },
  {
    id: "배터리 3",
    content: "배터리3 가 연결 되었습니다.",
  },
  {
    id: "배터리 4",
    content: "연결상태가 정상입니다.",
  },
];

const LogData = () => {
  // 이벤트 로그 컴포넌트
  const eventDate = () => {
    const date = new Date();
    const year = String(date.getFullYear()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDay()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const temp = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    return temp;
  };
  return (
    <Style.Container>
      <Style.LogHeader>
        <h3>이벤트 로그</h3>
      </Style.LogHeader>
      <Style.LogBody>
        <Style.LogTable>
          <thead>
            <tr>
              {tHeadData.map((item, index) => (
                <th key={index} style={{ width: item.width }}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tBodyData.map((item, index) => (
              <tr key={index}>
                <td>{eventDate()}</td>
                <td>{item.id}</td>
                <td>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </Style.LogTable>
      </Style.LogBody>
    </Style.Container>
  );
};

export default LogData;
