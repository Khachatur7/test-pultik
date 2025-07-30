import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect, useState, useRef } from "react";

interface IMessage {
  massage: string;
  moment: string;
  _id: string;
}

const OMessagePage = () => {
  const [messagesAccepted,setMessagesAccepted] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessage[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const readMessages = localStorage.getItem("read-o-messages");
  const [newMessagesIndex, setNewMessagesIndex] = useState(0);
  const getMessages = async () => {
    try {
      const res = await axios.post("/messeges3",{
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        if (messages.length < res.data.massage.length) {
          setMessages(res.data.massage);
          !messagesAccepted?setMessagesAccepted(true):""
        }
        localStorage.setItem(
          "read-o-messages",
          JSON.stringify(res.data.massage.length)
        );
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
      localStorage.setItem("read-o-messages", JSON.stringify(messages.length));
    } else {
      setNewMessagesIndex(+readMessages);
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
        <span>Заказы</span>
      </div>
      <div className="decr_page">
        <div className="messages">
          {messages.map((m, ind) => {
            if (ind == newMessagesIndex) {
              return (
                <>
                  <div className="new_messages">Не прочитанны сообщения</div>
                  <div className="message">
                    <div className="text">
                      {ind + 1}. {m.massage}
                    </div>
                    <div className="data">{m.moment}</div>
                  </div>
                </>
              );
            } else {
              return (
                <div className="message">
                  <div className="text">
                    {ind + 1}. {m.massage}
                  </div>
                  <div className="data">{m.moment}</div>
                </div>
              );
            }
          })}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </AuthCheck>
  );
};


export default OMessagePage;
