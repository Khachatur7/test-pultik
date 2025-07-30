import axios from "@/axios";
import { infoBlockItems } from "@/store/useBotsStore";
import { useEffect, useState } from "react";
import InfoBlockParser from "../InfoBlockParser";

interface IBots {
  _id: string;
  mon: string;
  online: boolean;
}

const Bots = () => {
  const [monitoring, setMonitoring] = useState(false);
  const [bots, setBots] = useState<IBots[] | null>(null);
  const [http, setHttp] = useState<string | null>(null);

  const getBots = async () => {
    try {
      const res = await axios.post("/pultikMon", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        setBots(res.data.answer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHttp = async () => {
    try {
      const res = await axios.get("/test");

      if (res.data) {
        setHttp(res.data.text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMonitoring(!monitoring);
    }, 5000);
  }, []);

  useEffect(() => {
    getHttp();
    getBots();
  }, [monitoring]);

  return (
    <>
      <div
        className="w-[100vw] flex items-center justify-center gap-[10px] bots_list overflow-auto"
        style={{ marginTop: "15px" }}
      >
        {/* Если данные получены */}
        {http &&
          infoBlockItems
            ?.filter((item) => item.text === "Https server")
            .map((item) => (
              <InfoBlockParser
                key={item.text}
                bot={{
                  _id: item.text,
                  mon: "",
                  online: http == "Success!" ? true : false,
                }}
                text={item.text}
              />
            ))}
        {bots &&
          infoBlockItems
            ?.filter(
              (item) => item.page == "main" && item.text !== "Https server"
            )
            .map((item, index) => {
              if (index < 9) {
                return (
                  <InfoBlockParser
                    key={item.text}
                    bot={bots[index]}
                    text={item.text}
                    isLast={!(index < 9)}
                  />
                );
              }
            })}

        {/* Если данные не получены */}
        {!http &&
          infoBlockItems
            ?.filter((item) => item.text === "Https server")
            .map((item) => (
              <InfoBlockParser
                key={item.text}
                bot={{
                  _id: item.text,
                  mon: "",
                  online: false,
                }}
                text={item.text}
              />
            ))}
        {!bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "main" && item.text !== "Https server") {
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
      <div className="w-[100vw] flex items-center justify-center gap-[10px] bots_list overflow-auto">
        {/* Если данные получены */}
        {bots &&
          infoBlockItems
            ?.filter(
              (item) => item.page == "main" && item.text !== "Https server"
            )
            .map((item, index, arr) => {
              if (index >= 9) {
                return (
                  <InfoBlockParser
                    key={item.text}
                    bot={bots[index]}
                    text={item.text}
                    isLast={index + 1 === arr.length}
                  />
                );
              }
            })}

        {/* Если данные не получены */}
        {!bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "main" && item.text !== "Https server") {
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
    </>
  );
};

export default Bots;
