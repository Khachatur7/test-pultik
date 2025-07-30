import { InfoBlockParser } from "@/components";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";
import { infoBlockItems } from "@/store/useBotsStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WatchPage = () => {
  const [bots, setBots] = useState();
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("pultik-user-login");
    localStorage.removeItem("pultik-token-key");
    navigate("/auth");
  };
    const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");


  // const getMessages = async () => {
  //   try {
  //     const res = await axios.post("/massages", {
  //       user: localStorage.getItem("pultik-user-login"),
  //     });
  //     const messagesLength = localStorage.getItem("messages");
  //     if (res.data) {
  //       if (!messagesLength) {
  //         localStorage.setItem(
  //           "messages",
  //           JSON.stringify(res.data.massage.length)
  //         );
  //       } else if (+messagesLength < res.data.massage.length) {
  //         const audio = new Audio("/new-message.mp3");
  //         audio.play().catch((error) => {
  //           console.error("Ошибка воспроизведения звука:", error);
  //         });
  //         localStorage.setItem(
  //           "messages",
  //           JSON.stringify(res.data.massage.length)
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const checkNewMessages = setInterval(() => {
  //     getMessages();
  //   }, 5000);

  //   return () => clearInterval(checkNewMessages);
  // }, []);

  useEffect(() => {
    fetch("https://hjklhkjlhkljhpjhkhddhgfdghfdgfcycffgh.ru:2999/pultikMon")
      .then((res) => res.json())
      .then((res) => setBots(res.answer));
  }, []);

    useEffect(() => {
    const intervalId = setInterval(checkNewMessagesT, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(checkNewMessagesO, 5000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const checkNewMessagesCount = setInterval(() => {
      if (allOMessages && readOMessages) {
        if (+allOMessages > +readOMessages) {
          const audio = new Audio("/piii.mp3");
          audio.play().catch((error) => {
            console.error("Ошибка воспроизведения звука:", error);
          });
        }
      }
    }, 5000);
    return () => clearInterval(checkNewMessagesCount);
  }, []);

  return (
    <div className="flex items-start justify-center gap-12 px-10 pt-16 h-full watch_page_list">
      <div className="watch_page_column">
        {/* Если данные получены */}
        {bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "bots") {
              return (
                <InfoBlockParser
                  key={item.text + index}
                  bot={bots[index - 1]}
                  text={item.text}
                  isLast
                />
              );
            }
          })}
        {/* Если данные не получены */}
        {!bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "bots") {
              return (
                <InfoBlockParser
                  key={item.text + index}
                  bot={{ _id: "und" + index, mon: "", online: false }}
                  text={item.text}
                  isLast
                />
              );
            }
          })}
      </div>
      {/* <div className="flex flex-col gap-12 watch_page_column">
        {
          bots.filter(el => el.page === "bots").slice(10).map((item) => (
            <InfoBlockParser 
                key={item.id}
                bot={item}
                isLast
            />
          ))
        }
      </div> */}
      <button className="logout_btn" onClick={LogOut}>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M304,336v40a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V136a40,40,0,0,1,40-40H256c22.09,0,48,17.91,48,40v40"
            style={{
              fill: "none",
              stroke: "#000000",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "32px",
            }}
          />
          <polyline
            points="368 336 448 256 368 176"
            style={{
              fill: "none",
              stroke: "#000000",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "32px",
            }}
          />
          <line
            x1="176"
            y1="256"
            x2="432"
            y2="256"
            style={{
              fill: "none",
              stroke: "#000000",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "32px",
            }}
          />
        </svg>

        <span>Logout</span>
      </button>
    </div>
  );
};

export default WatchPage;
