import { useState, useEffect } from "react";
import Style from "./LogData.style";
import PropTypes from "prop-types";
import "boxicons";
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

  useEffect(() => {
    const storedLogs = localStorage.getItem("logs");
    if (storedLogs) {
      const logs = JSON.parse(storedLogs);
      const restoredLogs = logs.map((log) => ({ ...log, time: new Date(log.time) }));
      setLogs(restoredLogs);
    }
  }, []);

  useEffect(() => {
    let newLogs = [...logs];
    const ignoreKeys = ["packId", "DI_state"];
    for (let packId in packData) {
      const pack = packData[packId];

      for (let category in pack) {
        if (ignoreKeys.includes(category)) continue;
        const events = pack[category];

        if (typeof events === "object") {
          for (let eventKey in events) {
            const eventValue = events[eventKey];
            if (eventValue === 1) {
              const logText = eventLogs[category] && eventLogs[category][eventKey];
              const content = logText ? logText : `${eventKey}`;

              const now = new Date();
              const newLog = {
                id: packId,
                time: now.toISOString(),
                content: content,
              };

              if (
                newLogs.length > 0 &&
                newLogs[newLogs.length - 1].content === content &&
                now - new Date(newLogs[newLogs.length - 1].time) < 60 * 1000
              ) {
                continue;
              }

              newLogs.push(newLog);
              while (newLogs.length > 50) {
                newLogs.shift();
              }
            }
          }
        }
      }
    }
    setLogs(newLogs);
  }, [packData]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  const handleReset = () => {
    if (window.confirm("로그를 초기화 하시겠습니까?")) {
      localStorage.removeItem("logs");
      setLogs([]);
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
        <button onClick={handleReset}>
          <box-icon name="trash" color="#ffffff"></box-icon>
        </button>
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
            {logs.reverse().map((log, index) => (
              <tr key={index}>
                <td>{eventDate(new Date(log.time))}</td>
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
