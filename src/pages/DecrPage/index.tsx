import { AuthCheck } from "@/components";
import DLine from "@/components/DLine";
import { useEffect, useState } from "react";
import axios from "@/axios";

interface Decr {
  avitoId: string;
  avitoId2: string;
  decr: string;
  price: string;
  minPrice:string;
  step: string;
  hours: number[];
  name: string;
}

const DecrPage = () => {
  const [dLines, setDLines] = useState<Decr[]>([]);
  const [update, setUpdate] = useState(false);

  const getDecrs = async () => {
    try {
      const res = await axios.post("/readDecr", {
        user: localStorage.getItem("pultik-user-login"),
      });
      if (res.status == 200) { 
        setDLines(res.data.massage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMessages = async () => {
    try {
      const res = await axios.post("/massages",{
        user: localStorage.getItem("pultik-user-login"),
      });
      const messagesLength = localStorage.getItem("messages");
      if (res.data) {
        if (!messagesLength) {
          localStorage.setItem(
            "messages",
            JSON.stringify(res.data.massage.length)
          );
        } else if (+messagesLength < res.data.massage.length) {
        const audio = new Audio("/new-message.mp3");
          audio.play().catch((error) => {
            console.error("Ошибка воспроизведения звука:", error);
          });
          localStorage.setItem(
            "messages",
            JSON.stringify(res.data.massage.length)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkNewMessages = setInterval(() => {
      getMessages();
 }, 5000);

    return () => clearInterval(checkNewMessages);
  }, []);
  useEffect(() => {
    getDecrs();
  }, [update]);

  return (
    <AuthCheck>
      <div className="decr_page">
        {dLines.map((d) => {
          return (
            <DLine
              key={d.decr}
              dLines={dLines}
              dLine={d}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
    </AuthCheck>
  );
};

export default DecrPage;
