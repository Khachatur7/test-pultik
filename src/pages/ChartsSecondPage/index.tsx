import { useEffect, useState } from "react";
import axios from "@/axios";
import { AuthCheck, Container } from "@/components";
import ChartComponent from "../ChartsPage/ChartComponent";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";

const ChartsPage = () => {
  const [dates, setDates] = useState<string[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [roiMonth, setRoiMonth] = useState<number[] | null>(null);
    const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");
  const [todayMm, setTodayMm] = useState<number[] | null>(null);
  const [todayMmDates, setTodayMmDates] = useState<string[] | null>(null);
  const [todayMmTotalPages, setTodayMmTotalPages] = useState(1);

  const getChartData = async () => {
    interface ChartDataType {
      aS: number;
      aSp: number;
      date: string;
      oneStockPrice: number;
      dayMargin?: string;
      ordersNum?: number;
      roiMonth?: number;
      todayMm?: number;
    }

    try {
      const res = await axios.post<{ result: ChartDataType[] }>("/stocksData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data) {
        throw Error();
      }

      const { data } = res;

      const datesItems = [];
      const roiMonthItems = [];

      const todayMmItems = [];
      const todayMmDates = [];

      for (let i = 0; i < data.result.length; i++) {
        const item = data.result[i];

        if (item.roiMonth) {
          datesItems.push(item.date);
          roiMonthItems.push(Number(item.roiMonth) || 0);
        }

        if (item.todayMm) {
          todayMmItems.push(Number(item.todayMm) || 0);
          todayMmDates.push(item.date);
        }
      }
      setRoiMonth(roiMonthItems);
      setTodayMm(todayMmItems);
      setTodayMmDates(todayMmDates);
      setDates(datesItems);

      const totalPagesNum = Math.ceil(datesItems.length / 10);

      setTotalPages(totalPagesNum);
      setTodayMmTotalPages(Math.ceil(todayMmDates.length / 10));
    } catch (error) {
      console.log("Не удалось получить графики");
    }
  };
//   const getMessages = async () => {
//     try {
//       const res = await axios.post("/massages",{
//         user: localStorage.getItem("pultik-user-login"),
//       });
//       const messagesLength = localStorage.getItem("messages");
//       if (res.data) {
//         if (!messagesLength) {
//           localStorage.setItem(
//             "messages",
//             JSON.stringify(res.data.massage.length)
//           );
//         } else if (+messagesLength < res.data.massage.length) {
//           const audio = new Audio("/new-message.mp3");
//           audio.play().catch((error) => {
//             console.error("Ошибка воспроизведения звука:", error);
//           });
//           localStorage.setItem(
//             "messages",
//             JSON.stringify(res.data.massage.length)
//           );
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const checkNewMessages = setInterval(() => {
//       getMessages();
//  }, 5000);

//     return () => clearInterval(checkNewMessages);
//   }, []);


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
            label="roiM %"
            labels={dates}
            data={roiMonth}
            totalPages={totalPages}
            isMedian
          />
          <ChartComponent
            label="todayMm"
            labels={todayMmDates}
            data={todayMm}
            totalPages={todayMmTotalPages}
            isMedian
          />
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ChartsPage;
