import { useState, useEffect } from "react";
import Style from "./LogData.style";
import PropTypes from "prop-types";
import { eventLogs } from "../../../common/eventLogs";

const tHeadData = [
  // 이벤트 로그 테이블 헤더
  { width: "30%", name: "발생 시간" },
  { width: "15%", name: "ID" },
  { width: "55%", name: "발생 내용" },
];

const LogData = ({ packData }) => {
  // 이벤트 로그 컴포넌트
  const [logs, setLogs] = useState([]);
  const [lastLog, setLastLog] = useState(null);

  useEffect(() => {
    for (let packId in packData) {
      const pack = packData[packId];

      for (let category in pack) {
        if (category === "packId") continue;
        const events = pack[category];

        if (typeof events === "object") {
          for (let eventKey in events) {
            const eventValue = events[eventKey];
            if (eventValue === 1) {
              const logText = eventLogs[category] && eventLogs[category][eventKey];
              const content = logText ? logText : `${eventKey}`;

              const now = new Date();
              if (lastLog && lastLog.content === content && now - lastLog.time < 60 * 1000) {
                continue;
              }

              const newLog = {
                id: packId,
                time: now.toISOString(),
                content: content,
              };

              setLogs((prevLogs) => {
                const newLogs = [...prevLogs, newLog];
                while (newLogs.length > 30) {
                  newLogs.shift();
                }
                localStorage.setItem("logs", JSON.stringify(newLogs));
                return newLogs;
              });
              setLastLog(newLog);
            }
          }
        }
      }
    }
  }, [packData, lastLog]);

  useEffect(() => {
    const storedLogs = localStorage.getItem("logs");
    if (storedLogs) {
      const logs = JSON.parse(storedLogs);
      const restoredLogs = logs.map((log) => ({ ...log, time: new Date(log.time) }));
      setLogs(restoredLogs);
    }
  }, []);

  const handleReset = () => {
    if (window.confirm("로그를 초기화 하시겠습니까?")) {
      localStorage.removeItem("logs");
      setLogs([]);
      setLastLog(null);
    }
  };

  const eventDate = (date) => {
    const year = String(date.getFullYear()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
        <button onClick={handleReset}>초기화</button>
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
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{eventDate(log.time)}</td>
                <td>{log.id}</td>
                <td>{log.content}</td>
              </tr>
            ))}
          </tbody>
        </Style.LogTable>
      </Style.LogBody>
    </Style.Container>
  );
};

LogData.propTypes = {
  packData: PropTypes.object,
};

export default LogData;
