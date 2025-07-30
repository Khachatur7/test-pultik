import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect, useState, useRef } from "react";

interface IMessage {
  massage: string;
  moment: string;
  _id: string;
  isReady: boolean;
}

const MessagesPageTwo = () => {
  const [messagesAccepted, setMessagesAccepted] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const readMessages = localStorage.getItem("read-messages-two");
  const getMessages = async () => {
    try {
      const res = await axios.post("/massages2", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        if (messages.length < res.data.massage.length) {
          setMessages(res.data.massage);
          !messagesAccepted ? setMessagesAccepted(true) : "";
        }
        localStorage.setItem(
          "read-messages-two",
          JSON.stringify(res.data.massage.length)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PrintMessage = async (text: string) => {
    const orderNum = text.split("|")[3];
    try {
      const res = await axios.post("/printOzonLbl", {
        orderNum: orderNum.trim(),
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        alert(res.data.massage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const checkNewMessages = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(checkNewMessages);
  }, []);

  useEffect(() => {
    if (!readMessages) {
      localStorage.setItem(
        "read-messages-two",
        JSON.stringify(messages.length)
      );
    }
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesAccepted]);

  return (
    <AuthCheck>
      <div className="header__">
        <span>Заказы, готовые для самостоятельной отгрузки</span>
      </div>
      <div className="decr_page_two">
        <div className="messages">
          {messages.length != 0 ? (
            messages.map((m, ind) => {
              return (
                <>
                  <div className="message_content" key={m._id}>
                    <div
                      className={`message ${m.isReady ? "message_ready" : ""}`}
                    >
                      <div className="text">
                        {ind + 1}.{" "}
                        <span style={{ fontSize: "57px" }}>
                          {m.massage.split("|")[0]}
                        </span>{" "}
                        |{" "}
                        {m.massage
                          .split("|")
                          .filter((el, ind) => (ind != 0 ? el : 0))
                          .join("|")}
                      </div>
                    </div>
                    <div
                      className={`print_bttn ${m.isReady ? "message_ready" : ""
                        }`}
                      onClick={() => PrintMessage(m.massage)}
                    >
                      <span>Напечатать ярлык</span>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <span
              style={{
                margin: "0 auto",
                marginTop: "20px",
                fontSize: "100px",
                fontWeight: "700",
              }}
            >
              Заказов нет
            </span>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </AuthCheck>
  );
};

export default MessagesPageTwo;
