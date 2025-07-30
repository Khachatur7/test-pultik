import { AuthCheck, Container } from "@/components";
import axios from "@/axios";
import { useEffect, useState } from "react";
import { transliterationMap } from "@/common";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";

interface Problems {
  problemsDb: Problem[];
}

interface Problem {
  problem: string;
  _id: string;
}

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [text, setText] = useState<string>("");
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");

  const GetProblems = async () => {
    try {
      const res = await axios.post<Problems>("/getProblemsData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setProblems(res.data.problemsDb);
      }

      console.log(res.data.problemsDb);
    } catch (error) {
      throw new Error(`ошибка при получении данных`);
    }
  };
  const onlyEnglish = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const symb = value[value.length - 1];
    const transliterationKeys = Object.keys(transliterationMap);

    if (transliterationKeys.includes(symb)) {
      const resVal =
        value.slice(0, value.length - 1) + transliterationMap[symb];

      setState(resVal);
    } else {
      setState(value);
    }
  };
  const createProblem = async () => {
    if (text) {
      try {
        const res = await axios.post<{ succses: boolean; text: string }>(
          "/sendProblemsData",
          {
            user: localStorage.getItem("pultik-user-login"),
            text: text,
          }
        );

        if (res.status == 200) {
          GetProblems();
          setText("");
          alert(res.data.text);
        }
      } catch (error) {
        throw new Error(`ошибка при отправке данных`);
      }
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
  //        const audio = new Audio("/new-message.mp3");
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
    GetProblems();
  }, []);

  return (
    <AuthCheck>
      <Container>
        <div className="problems_wrapper">
          <div className="problems_content">
            <div className="problems_list">
              {problems.map((p, ind) => {
                return (
                  <div className="problem" key={p._id}>
                    <span>{ind + 1}.</span>
                    {p.problem}
                  </div>
                );
              })}
            </div>
            <div className="post_problem">
              <input
                type="text"
                value={text}
                onChange={(e) => onlyEnglish(e.target.value, setText)}
              />
              <button className="post_problem__btn" onClick={createProblem}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ProblemsPage;
