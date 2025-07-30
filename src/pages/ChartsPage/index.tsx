import { useEffect, useState } from "react";
import axios from "@/axios";
import { AuthCheck, Container } from "@/components";
import ChartComponent from "./ChartComponent";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";

const ChartsPage = () => {
  const [dates, setDates] = useState<string[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [dayMargin, setDayMargin] = useState<number[] | null>(null);
  const [ordersNum, setOrdersNum] = useState<number[] | null>(null);
  const [chartDataLeft, setChartDataLeft] = useState<number[] | null>(null);
  const [chartDataRight, setChartDataRight] = useState<number[] | null>(null);
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");

  const getChartData = async () => {
    interface ChartDataType {
      aS: number;
      aSp: number;
      date: string;
      oneStockPrice: number;
      dayMargin?: string;
      ordersNum?: number;
      roiMonth?: number;
    }

    try {
      const res = await axios.post<{ result: ChartDataType[] }>("/stocksData");

      if (!res.data) {
        throw Error();
      }

      const { data } = res;

      const datesItems = [];
      const dataLeft = [];
      const dataRight = [];
      const dataDayMargin = [];
      const dataOrdersNum = [];

      for (let i = 0; i < data.result.length; i++) {
        const item = data.result[i];

        datesItems.push(item.date);
        dataLeft.push(item.aS || 0);
        dataRight.push(item.aSp || 0);
        dataDayMargin.push(Number(item.dayMargin) || 0);
        dataOrdersNum.push(Number(item.ordersNum) || 0);
      }

      setChartDataLeft(dataLeft);
      setChartDataRight(dataRight);
      setDayMargin(dataDayMargin);
      setOrdersNum(dataOrdersNum);

      setDates(datesItems);

      const totalPagesNum = Math.ceil(datesItems.length / 10);

      setTotalPages(totalPagesNum);
    } catch (error) {
      console.log("Не удалось получить графики");
    }
  };
  // const getMessages = async () => {
  //   try {
  //     const res = await axios.post("/massages",{
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

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <AuthCheck>
      <Container>
        <div className="grid grid-cols-2 gap-8 w-full charts">
          <ChartComponent
            label="aS"
            labels={dates}
            data={chartDataLeft}
            totalPages={totalPages}
            isMedian
          />
          <ChartComponent
            label="aSp"
            labels={dates}
            data={chartDataRight}
            totalPages={totalPages}
            isMedian
          />
          <ChartComponent
            label="Day margin"
            labels={dates}
            data={dayMargin}
            totalPages={totalPages}
            isMedian
          />
          <ChartComponent
            label="Order num"
            labels={dates}
            data={ordersNum}
            totalPages={totalPages}
            isMedian
          />
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ChartsPage;
