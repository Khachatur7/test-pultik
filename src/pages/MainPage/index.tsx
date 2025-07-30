import { useState, useEffect, useRef, useMemo } from "react";
import {
  Container,
  LabelText,
  Button,
  GridButton,
  AuthCheck,
} from "@/components";
import { nanoid } from "nanoid";
import axios from "@/axios";
import { MultiType } from "@/components/GridButton/CircleModalComponent";
import { dataFilterHandler } from "@/handlers";
import { Link, useParams } from "react-router-dom";
import upDownImage from "@/images/upDown.png";
import { InputTypes, ButtonItemType, LastButtonType } from "@/types/common";
import { minusButtons, plusButtons } from "@/common";
import MainPageFexp from "./MainPageFexp";
import ZeroModesInfo from "./ZeroModesInfo";
import ModalSearchRes from "@/components/ModaleSearchRes";
import LineChart from "@/components/Chart";
import { addDays, isAfter, parseISO } from "date-fns";
import ArrowSVG from "@/components/SVGcomponents/ArrowSVG";
import RunnerSVG from "@/components/SVGcomponents/RunnerSVG";
import WalkingManSVG from "@/components/SVGcomponents/WalkingManSVG";
import RecyclingSVG from "@/components/SVGcomponents/RecyclingSVG";
import TrashSVG from "@/components/SVGcomponents/TrashSVG";
import ShelfSVG from "@/components/SVGcomponents/ShelfSVG";
import FolderSVG from "@/components/SVGcomponents/FolderSVG";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";
import PriceInputs from "@/components/PriceInputs";
import CpData from "@/types/common/CpDatType";
import CpInfo from "@/components/CpInfo";
import BttnsInfo from "@/components/BttnsInfo";
import Bots from "@/components/Bots";
import BttnsSearcher from "@/components/BttnsSearcher";
import AddSVG from "@/components/SVGcomponents/AddSVG";
import BoxSVG from "@/components/SVGcomponents/BoxSVG";
import ChartSVG from "@/components/SVGcomponents/ChartSVG";
import RoiSVG from "@/components/SVGcomponents/RoiSVG";
import EyeSVG from "@/components/SVGcomponents/EyeSVG";
import ListSVG from "@/components/SVGcomponents/ListSVG";
import HouseSVG from "@/components/SVGcomponents/HouseSVG";
import TwoMenSVG from "@/components/SVGcomponents/TwoMenSVG";
import TimesSVG from "@/components/SVGcomponents/TimesSVG";
interface IChart {
  aS: number;
  aSp: number;
  date: string;
  dayMargin: string;
  middleDayPer?: string;
  oneStockPrice: number;
  ordersNum: number;
  roiMonth: string;
  todayMm: string;
  _id: string;
}

const garbageTabs = [
  {
    id: nanoid(),
    value: 1,
  },
  {
    id: nanoid(),
    value: 2,
  },
];

interface ButtonsInfo {
  total: number;
  grey: number;
  red: number;
  yellow: number;
  blue: number;
  green: number;
  telNumber: number;
  stroyNumber: number;
  telAvailable: number;
  stroyAvailable: number;
}

export type LastEventType = "price" | "stocks" | null;

const MainPage = () => {
  const [tabs, setTabs] = useState<{ id: string; value: number | string }[]>(
    []
  );
  const itemsPerPage = 77;
  const pages = tabs.length;
  const totalButtons = itemsPerPage * pages;
  const buttonsArray = [...Array(totalButtons)];
  const storageData = localStorage.getItem("initial-date");
  const [timeLeft, setTimeLeft] = useState(40);
  const [openChangingMenu, setOpenChangingMenu] = useState<boolean>(false);
  const [data, setData] = useState<ButtonItemType[] | null>(null);
  const [multi, setMulti] = useState<MultiType | null>(null);
  const [multiTwo, setMultiTwo] = useState<MultiType | null>(null);
  const [items, setItems] = useState<ButtonItemType[] | null>(null);
  const [folderBttns, setFolderBttns] =
    useState<{ columnName: string; data: ButtonItemType[] }[]>();
  const [copy, setCopy] = useState(false);
  const [xData, setXData] = useState<string[]>([]);
  const [yData, setYData] = useState<number[]>([]);
  const [ordersYData, setOrdersYData] = useState<number[]>([]);
  const [cpData, setCpData] = useState<CpData | null>(null);
  const [priceCountWaiting, setPriceCountWaiting] = useState("");
  const [returnMode, setReturnMode] = useState(false);
  const [buttonsInfo, setButtonsInfo] = useState<ButtonsInfo>({
    total: 0,
    grey: 0,
    red: 0,
    yellow: 0,
    blue: 0,
    green: 0,
    telNumber: 0,
    stroyNumber: 0,
    telAvailable: 0,
    stroyAvailable: 0,
  });
  const [lastButton, setLastButton] = useState<LastButtonType | null>(null);
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");
  const [boostValue, setBoostValue] = useState("0");
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState<number | string>(id ? +id : 1);
  const timerInterval = useRef<null | number | any>(null);
  const [lastEvent, setLastEvent] = useState<LastEventType>(null);
  const [piker, setPiker] = useState<string>(
    localStorage.getItem("piker") || "01"
  );
  const [selectOpened, setSelectOpened] = useState(false);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [colorsChecked, setColorsChecked] = useState(false);
  const [bttnSearcher, setBttnSearcher] = useState("");
  const [number, setNumber] = useState("");
  const searchByWhatButtons = ["Имя", "Sku", "Место", "Группа"];
  const [searchByWhat, setSearchByWhat] = useState(searchByWhatButtons[0]);
  const [bttnsIndex, setBttnsIndex] = useState<ButtonItemType[]>([]);
  const [notSearchYet, setNotSearchYet] = useState(true);
  const [openBttnModal, setOpenBttnModal] = useState(false);
  const [bottomLeftModale, setBottomLeftModale] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const readMessages = localStorage.getItem("read-messages");
  const readMessagesTwo = localStorage.getItem("read-messages-two");
  const allMessages = localStorage.getItem("messages");
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");
  const FolderColumn = new Array(7).fill(0);
  const createTabsItems = () => {
    const localTabs: { id: string; value: number | string }[] = [];
    for (let i = 1; i < 131; i++) {
      if (i == 5) {
        localTabs.push({ id: nanoid(), value: "Envelope" });
        localTabs.push({ id: nanoid(), value: "Folder" });
        localTabs.push({ id: nanoid(), value: "upDown" });
        localTabs.push({ id: nanoid(), value: i });
      } else {
        localTabs.push({ id: nanoid(), value: i });
      }
    }
    setTabs(localTabs);
  };

  const findNavBttnsColor = (index: number) => {
    if (!items || colorsChecked) return "full";

    const localItems: ButtonItemType[] = [];
    buttonsArray
      .slice((index - 1) * itemsPerPage, index * itemsPerPage)
      .some((_, ind) => {
        const itemIndex = ind + 1 + (index - 1) * itemsPerPage;
        items.forEach((el) => (el.i === itemIndex ? localItems.push(el) : ""));
      });

    if (localItems.length === 0) return "empty";

    const hasEmptyElement = buttonsArray
      .slice((index - 1) * itemsPerPage, index * itemsPerPage)
      .some((_, ind) => {
        const itemIndex = ind + 1 + (index - 1) * itemsPerPage;
        return !items.some((el) => el.i === itemIndex);
      });

    if (index === tabs.length - 1) {
      setColorsChecked(true);
    }

    return hasEmptyElement ? "not-full" : "full";
  };

  const plusHandler = (value: number, input?: InputTypes) => {
    if (input === 1) {
      setSecondValue((prev) => (Number(prev) + value).toString());
      return;
    }

    if (input === 2) {
      return setSecondValue((prev) => (Number(prev) + value).toString());
    }

    if (input === 3) {
      return setBoostValue((prev) => (Number(prev) + value).toString());
    }

    setFirstValue((prev) => (Number(prev) + value).toString());
  };

  const minusHandler = (value: number, input?: InputTypes) => {
    if (input === 1) {
      setSecondValue((prev) => (Number(prev) - value).toString());
      return;
    }

    if (input === 2) {
      return setSecondValue((prev) => (Number(prev) - value).toString());
    }

    if (input === 3) {
      return setBoostValue((prev) => (Number(prev) - value).toString());
    }

    setFirstValue((prev) => (Number(prev) - value).toString());
  };

  const getPhrases = async () => {
    try {
      const res = await axios.get("/gPhrases");

      if (!res.data) {
        throw Error();
      }

      const answersArr: string[] = [];
      const answers = res.data.answer[0];
      const keys = Object.keys(answers);
      keys.map((k) => {
        answersArr.push(answers[k]);
      });
      setAnswers(answersArr);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMulti = async () => {
    try {
      const res = await axios.post("/api/getMulti");

      if (!res.data) {
        throw Error();
      }

      setMulti(res.data.multi);
      setMultiTwo(res.data.multi2);
    } catch (error) {
      setMulti(null);
    }
  };

  const allPrices = async () => {
    try {
      const res = await axios.post("/allPrices", {
        user: localStorage.getItem("pultik-user-login"),
        priceChange: firstValue,
      });

      if (res.status == 200) {
        alert(res.data.text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allPrices2 = async () => {
    try {
      const res = await axios.post("/allPrices2", {
        user: localStorage.getItem("pultik-user-login"),
        priceChange: firstValue,
      });

      if (res.status == 200) {
        alert(res.data.text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeTab = () => {
    setCurrentTab(
      +location.pathname.substring(1, location.pathname.length) || 1
    );
  };

  useEffect(() => {
    window.addEventListener("popstate", changeTab);

    return () => {
      window.removeEventListener("popstate", changeTab);
    };
  }, []);

  const SelectMonth = async (numb: string) => {
    try {
      const res = await axios.post("/getCpData", {
        month: numb,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status !== 200) {
        throw Error();
      }

      localStorage.setItem("piker", numb);
      setCpData(res.data);
      setPiker(numb);
      setSelectOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async (garbagePageOrNot: boolean) => {
    try {
      const res = await axios.post(
      "/api/getData" 
      ,  {
          user: localStorage.getItem("pultik-user-login"),
        }
      );

      if (!res.data) {
        throw Error();
      }
      console.log(res);
      

      const resData = garbagePageOrNot ? res.data.countedStocks : res.data.data;

      const itemsButtons = resData.filter(
        (el: ButtonItemType) => !dataFilterHandler(el._id) && !isNaN(el.i)
      );

      let greyButtons: number = 0;
      let redButtons: number = 0;
      let yellowButtons: number = 0;
      let blueButtons: number = 0;
      let greenButtons: number = 0;
      let telNumber: number = 0;
      let stroyNumber: number = 0;
      let telAvailable: number = 0;
      let stroyAvailable: number = 0;

      for (let i = 0; i < itemsButtons.length; i++) {
        const button = itemsButtons[i];

        if (button.com === "tel") {
          telNumber += 1;

          if (button.stocks > 0) {
            telAvailable += 1;
          }
        } else if (button.com === "stroy") {
          stroyNumber += 1;

          if (button.stocks > 0) {
            stroyAvailable += 1;
          }
        }

        if (!button.stocks) {
          greyButtons += 1;
          continue;
        }

        if (button.stocks === 1) {
          redButtons += 1;
          continue;
        }

        if (button.stocks === 2) {
          yellowButtons += 1;
          continue;
        }

        if (button.stocks === 3) {
          blueButtons += 1;
          continue;
        }

        if (button.stocks >= 4) {
          greenButtons += 1;
          continue;
        }
      }

      setData(resData);

      setItems(
        itemsButtons.sort((a: ButtonItemType, b: ButtonItemType) => a.i - b.i)
      );

      setButtonsInfo({
        total: itemsButtons.length,
        grey: greyButtons,
        red: redButtons,
        yellow: yellowButtons,
        blue: blueButtons,
        green: greenButtons,
        telNumber,
        stroyNumber,
        telAvailable,
        stroyAvailable,
      });
    } catch (error) {
      setData(null);
      setMultiTwo(null);
    }
  };

  const initialLoad = async (garbagePageOrNot: boolean) => {
    await loadMulti();
    await loadData(garbagePageOrNot);
  };

  const resetInputs = () => {
    setFirstValue("0");
    setSecondValue("0");
    setBoostValue("0");
    setBttnSearcher("");
    setNotSearchYet(true);
    setNumber("");
  };

  const timerHandler = async () => {
    if (
      (!Number(firstValue) &&
        !Number(secondValue) &&
        !Number(boostValue) &&
        number.length == 0 &&
        bttnSearcher.length == 0) ||
      timeLeft < 0
    ) {
      return setTimeLeft(0);
    }

    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }

    setTimeLeft(40);

    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  const buttonTextHandler = (inputType: InputTypes | undefined) => {
    if (inputType === 2) {
      return "S";
    }

    if (inputType === 3) {
      return "B";
    }

    return "%";
  };

  const SetStates = (item: any) => {
    setOpenChangingMenu(!openChangingMenu);
    setCurrentTab(item.value);
  };

  const getChartData = async () => {
    try {
      const res = await axios.post<{ result: IChart[] }>("/stocksData", {
        user: localStorage.getItem("pultik-user-login"),
      });
      let x: string[] = [];
      const ordersNumY: number[] = [];
      const precentY: number[] = [];

      const storageDate = localStorage.getItem("initial-date");
      let date: Date = new Date();
      if (storageDate) {
        date = new Date(JSON.parse(storageDate));
      }
      if (res.status == 200) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let countDay = 1;
        let fullDate = `${day < 10 ? `0${day}` : day}.${
          month < 10 ? `0${month}` : month
        }.${year}`;
        let newDate = date;
        res.data.result.map((el, ind) => {
          if (fullDate == el.date) {
            newDate = addDays(date, countDay);
            countDay++;
            const day = newDate.getDate();
            const month = newDate.getMonth() + 1;
            const year = newDate.getFullYear();
            fullDate = `${day < 10 ? `0${day}` : day}.${
              month < 10 ? `0${month}` : month
            }.${year}`;
            x.push(el.date);
            precentY.push(el.middleDayPer ? +el.middleDayPer : +"0");
            ordersNumY.push(el.ordersNum);
          }

          if (res.data.result.length - 1 == ind && x.length < 90) {
            Array.from({ length: 90 - x.length }, (_, i) => {
              const xDate = addDays(newDate, i);
              const day = xDate.getDate();
              const month = xDate.getMonth() + 1;
              const year = xDate.getFullYear();
              fullDate = `${day < 10 ? `0${day}` : day}.${
                month < 10 ? `0${month}` : month
              }.${year}`;
              x.push(fullDate);
            });
          }
        });
        if (ordersNumY.length < 90) {
          setOrdersYData(
            ordersNumY.concat(Array(90 - ordersNumY.length).fill(0))
          );
        } else {
          setOrdersYData(ordersNumY);
        }
        if (precentY.length < 90) {
          setYData(precentY.concat(Array(90 - precentY.length).fill(0)));
        } else {
          setYData(precentY);
        }
        setXData(x);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkInitialDate = () => {
    if (storageData) {
      if (check90DaysPassed(storageData)) {
        const newDate = addDays(new Date(storageData), 1);
        sendNewInitalDate(newDate);
      } else {
        getChartData();
      }
    } else if (!storageData) {
      const initialDate = new Date("2024-12-28");
      sendNewInitalDate(initialDate);
    }
  };

  const sendNewInitalDate = (newDate?: Date) => {
    const date = newDate ? newDate : new Date();
    const initialDay = date.getDate();
    const initialDonth = date.getMonth() + 1;
    const initialDear = date.getFullYear();
    let fullDate = `${initialDear}-${
      initialDonth < 10 ? `0${initialDonth}` : initialDonth
    }-${initialDay < 10 ? `0${initialDay}` : initialDay}`;
    localStorage.setItem("initial-date", JSON.stringify(fullDate));
    getChartData();
  };

  const check90DaysPassed = (dateString: string): boolean => {
    const initialDate = parseISO(dateString);
    const ninetyDaysLater = addDays(initialDate, 90);
    const currentDate = new Date();
    return isAfter(currentDate, ninetyDaysLater);
  };

  const selectHandle = (e: MouseEvent) => {
    if (
      !(e.target as Element).classList.contains("select_month") &&
      !(e.target as Element).classList.contains("selected_month")
    ) {
      setSelectOpened(false);
      window.removeEventListener("click", selectHandle);
    }
  };

  const handleCopy = (textToCopy: string) => {
    if (/^[0-9 ()\s]+$/.test(textToCopy)) {
      const resText = textToCopy.replace(/[\s()]/g, "");
      navigator.clipboard
        .writeText(resText)
        .then(() => {
          setCopy(!copy);
        })
        .catch((err) => {
          console.error("Ошибка при копировании текста: ", err);
        });
    } else {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopy(!copy);
        })
        .catch((err) => {
          console.error("Ошибка при копировании текста: ", err);
        });
    }
  };

  const SearchBttns = () => {
    const res: ButtonItemType[] = [];
    if (searchByWhat == "Sku") {
      items?.map((bttn) => {
        if (
          bttn.sku?.toLowerCase().includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    } else if (searchByWhat == "Имя") {
      items?.map((bttn) => {
        if (
          bttn.fullName
            ?.toLowerCase()
            .includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    } else if (searchByWhat == "Место") {
      items?.map((bttn) => {
        if (
          bttn.place?.toLowerCase().includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    } else if (searchByWhat == "Группа") {
      items?.map((bttn) => {
        if (
          bttn.group?.toLowerCase().includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    }

    setBttnsIndex(res);

    if (notSearchYet) {
      setNotSearchYet(false);
    }
  };

  const getMessagesTwo = async () => {
    try {
      const res = await axios.post("/massages2", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        localStorage.setItem(
          "read-messages-two",
          JSON.stringify(res.data.massage.length)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupData = async () => {
    try {
      const res = await axios.post("/getGroupData", {
        user: localStorage.getItem("pultik-user-login"),
      });
      let foldersBttns: { columnName: string; data: ButtonItemType[] }[] = [];
      res.data.message.map((obj: Record<string, ButtonItemType[]>) => {
        let key = Object.keys(obj)[0] as string;
        foldersBttns.push({ columnName: key, data: obj[key] });
      });

      setFolderBttns([...foldersBttns]);
    } catch (error) {
      console.log(`Не удалось поменять данные: ${error}`);
    }
  };

  const GetPriceCountWaiting = async () => {
    try {
      const res = await axios.post("/priceCountWaiting");
      setPriceCountWaiting(res.data.massage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const UpdateData = setInterval(() => {
      if (currentTab != "Envelope" && currentTab != "Folder") {
        initialLoad(items != null ? +currentTab < tabs.length - 1 : true);
        SelectMonth(localStorage.getItem("piker") || "01");
      }
    }, 5000);

    return () => clearInterval(UpdateData);
  }, [currentTab]);

  useEffect(() => {
    if (currentTab != "Envelope" && currentTab != "Folder") {
      loadData(items != null ? +currentTab < tabs.length - 1 : true);
    }
  }, [currentTab]);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimeLeft(0);

      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    }

    if (timeLeft <= 0) {
      resetInputs();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (selectOpened) {
      return window.addEventListener("click", selectHandle);
    }
  }, [selectOpened]);

  useEffect(() => {
    if (!(bttnSearcher == "")) {
      SearchBttns();
    }
  }, [bttnSearcher, searchByWhat]);

  // для одного рендеринга
  useEffect(() => {
    getPhrases();
    getGroupData();
    createTabsItems();
    checkInitialDate();
    getChartData();
    console.log(data, lastButton);
  }, []);

  useEffect(() => {
    timerHandler();
  }, [firstValue, secondValue, boostValue, bttnSearcher, number]);

  useEffect(() => {
    setInterval(() => {
      GetPriceCountWaiting();
    }, 4000);
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
    const intervalId = setInterval(getMessagesTwo, 5000);

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

  const navButtonClasses = useMemo(() => {
    return tabs
      .filter(
        (item) =>
          item.value != "upDown" &&
          item.value != "Envelope" &&
          item.value != "Folder"
      )
      .map((item) => findNavBttnsColor(+item.value - 1));
  }, [tabs, items]);

  return (
    <AuthCheck>
      {openChangingMenu && (
        <>
          <div id="btn__changing_mobile">
            {tabs.map((item) =>
              item.value == "upDown" ? (
                <img src={upDownImage} alt="" style={{ width: "45px" }} />
              ) : (
                <button
                  key={item.id}
                  className={`btn btn__changing-item${
                    currentTab === item.value ? " active" : ""
                  }`}
                  onClick={() => SetStates(item)}
                >
                  {item.value == 1 || item.value == 2 ? (
                    <WalkingManSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="40px"
                    />
                  ) : item.value == 3 ||
                    item.value == 4 ||
                    item.value == 5 ||
                    item.value == 6 ||
                    item.value == 7 ||
                    item.value == 8 ||
                    item.value == 9 ||
                    item.value == 10 ||
                    item.value == 11 ||
                    item.value == 12 ||
                    item.value == 13 ? (
                    <RunnerSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="65px"
                    />
                  ) : item.value == 14 ? (
                    <RecyclingSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="45px"
                    />
                  ) : (
                    item.value
                  )}
                </button>
              )
            )}
            <button
              className={`btn btn__changing-item${
                currentTab === 15 ? " active" : ""
              }`}
              onClick={() => setCurrentTab(15)}
            >
              <TrashSVG
                strokeColor={currentTab !== 15 ? "#000" : "#fff"}
                width="37px"
              />
            </button>
            <Link
              to={"/save-sell"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <BoxSVG width="45px" />
            </Link>
            <Link
              to={"/create-button"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <AddSVG width="45px" />
            </Link>
            <Link
              to={"/charts"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <ChartSVG width="40px" />
            </Link>
            <Link
              to={"/charts2"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <RoiSVG width="45px" />
            </Link>
            <Link
              to={"/watch"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <EyeSVG width="60px" height="55px" />
            </Link>
            <Link
              to={"/problems"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <ListSVG width="70px" height="40px" />
            </Link>
            <Link
              to={"/new"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <HouseSVG width="45px" />
            </Link>
          </div>
        </>
      )}
      {selectOpened && window.innerWidth < 410 && (
        <ul className="mob_select_month">
          {months.map((month, ind) => {
            return (
              <li key={month + ind} onClick={() => SelectMonth(month)}>
                {ind + 1}
              </li>
            );
          })}
        </ul>
      )}
      {window.innerWidth > 450 && (
        <div
          className={`bottom_left_modale ${
            bottomLeftModale == "closed"
              ? "open_bottom_modale"
              : bottomLeftModale == "opened"
              ? "close_bottom_modale"
              : ""
          }`}
        >
          <div className="content">
            <button
              className="modale_bttn"
              onClick={() =>
                setBottomLeftModale(
                  bottomLeftModale == "closed" ? "opened" : "closed"
                )
              }
            >
              <ArrowSVG fill="#000" />
            </button>
            {answers.slice(0, 9).map((a, ind) => {
              const count = Math.ceil(a.length / 35);

              return (
                <div className="answer">
                  {count > 1 ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {[...Array(count).keys()].map((c) => {
                        if (c + 1 < count) {
                          return (
                            <span key={c}>
                              {ind + 1}.{" "}
                              {ind == 8
                                ? a.substring(41 * c, 41 * (c + 1))
                                : a.substring(35 * c, 35 * (c + 1))}
                            </span>
                          );
                        } else {
                          return (
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "7px",
                              }}
                              key={c}
                            >
                              {ind == 8
                                ? a.substring(41 * c, 41 * (c + 1))
                                : a.substring(35 * c, 35 * (c + 1))}
                              <span onClick={() => handleCopy(a)}>
                                <svg
                                  style={{
                                    marginTop: "5px",
                                    cursor: "pointer",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    width="14"
                                    height="14"
                                    x="8"
                                    y="8"
                                    rx="2"
                                    ry="2"
                                  />
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                              </span>
                            </span>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <>
                      {ind + 1}. {a}
                      <span onClick={() => handleCopy(a)}>
                        <svg
                          style={{ marginBottom: "12px", cursor: "pointer" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                          />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Container>
        {window.innerWidth > 600 && (
          <>
            <div className="btn__changing tabs">
              {items &&
                tabs.map((item, ind) =>
                  item.value == "upDown" ? (
                    <img
                      src={upDownImage}
                      alt=""
                      style={{ width: "35px" }}
                      key={ind * 10}
                    />
                  ) : item.value == "Envelope" ? (
                    <Link
                      to={`/${item.value}`}
                      className={`btns-page-btn btn black_svg btn__changing-item empty ${
                        currentTab == "Envelope" ? "active" : ""
                      }`}
                      key={item.id}
                      onClick={() => setCurrentTab("Envelope")}
                    >
                      <ShelfSVG width="60px" />
                    </Link>
                  ) : item.value == "Folder" ? (
                    <Link
                      to={`/${item.value}`}
                      className={`btns-page-btn btn black_svg btn__changing-item empty ${
                        currentTab == "Folder" ? "active" : ""
                      }`}
                      key={item.id}
                      onClick={() => setCurrentTab("Folder")}
                    >
                      {" "}
                      <FolderSVG width="60px" height="65px" />{" "}
                    </Link>
                  ) : (
                    <Link
                      to={`/${item.value}`}
                      className={`btns-page-btn btn black_svg btn__changing-item ${
                        navButtonClasses[+item.value]
                      } ${item.value == currentTab ? "active" : ""}`}
                      key={item.id}
                      onClick={() =>
                        item.value != "upDown" ? setCurrentTab(+item.value) : ""
                      }
                    >
                      {item.value == 1 || item.value == 2 || item.value == 3 ? (
                        <WalkingManSVG fill={"#000"} width="45px" />
                      ) : (
                        <RunnerSVG fill={"#000"} width="65px" />
                      )}
                      <div className="bttns-count">
                        <span> {(+item.value - 1) * itemsPerPage + 1} </span>
                        <span> {+item.value * itemsPerPage}</span>
                      </div>
                    </Link>
                  )
                )}
            </div>
          </>
        )}

        {window.innerWidth < 600 && (
          <>
            <div
              className="open_btn_changing"
              onClick={() => setOpenChangingMenu(!openChangingMenu)}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </>
        )}
        <div className="wrapper">
          <div
            className="handlecopy_information"
            id={copy ? "show_copy_bttn" : "close_copy_bttn"}
          >
            <div className="cope_info_bttn">
              <span>Скопировано</span>
            </div>
          </div>
          <div
            className={`${
              typeof currentTab != "number"
                ? "special__wrapper"
                : "btn__wrapper"
            }`}
          >
            {items && items.length ? (
              typeof currentTab == "number" ? (
                <>
                  {buttonsArray
                    .slice(
                      currentTab < tabs.length
                        ? (currentTab - 1) * itemsPerPage
                        : currentTab - tabs.length - 2 * itemsPerPage,
                      currentTab < tabs.length
                        ? currentTab * itemsPerPage
                        : currentTab - tabs.length - 1 * itemsPerPage
                    )
                    .map((_, index: number) => {
                      const itemIndex =
                        index +
                        1 +
                        (currentTab < tabs.length
                          ? currentTab - 1
                          : currentTab - (tabs.length - 1) - 1) *
                          itemsPerPage;

                      const elements = items.filter(
                        (el: ButtonItemType) => el.i === itemIndex
                      );

                      if (!elements.length) {
                        return (
                          <div className="btn__cont" key={index}>
                            <button className="btn _hover">{itemIndex}</button>
                          </div>
                        );
                      }

                      const el = elements[0];
                      return (
                        <GridButton
                          key={index}
                          tel={el.tel}
                          fullName={el.fullName}
                          stocks={el.stocks}
                          index={index}
                          price={el.basePrice}
                          multi={multi}
                          multiTwo={multiTwo}
                          comValue={el.com}
                          firstValue={firstValue}
                          secondValue={secondValue}
                          boolValue={el.bool}
                          h={el.h}
                          i={el.i}
                          sku={el.sku}
                          setLastButton={setLastButton}
                          percent={el.percent}
                          lastEvent={lastEvent}
                          basePrices={{
                            avito: el.avPrice,
                            mega: el.mmPrice,
                            ozon: el.ozPrice,
                            wb: el.wbPrice,
                            yaE: el.yaEPrice,
                            ya: el.yaPrice,
                          }}
                          fStocks={el.fStocks}
                          boostValue={boostValue}
                          boostInitial={el.boost}
                          wBar={el.wBar}
                          cp={el.cP}
                          cust={el.cust}
                          returnMode={returnMode}
                          copy={copy}
                          setCopy={setCopy}
                          wStocks={el.wStocks}
                          edited={el.edited}
                          wbAdded={el.wbAdded}
                          place={el.place}
                          group={el.group}
                          ozCommission={el.ozCommission}
                        />
                      );
                    })}
                </>
              ) : currentTab == "Folder" ? (
                folderBttns?.map((folderColumn, index) => {
                  return (
                    <div className="folder_column">
                      <div
                        className="btn__cont"
                        key={index}
                        onClick={() => handleCopy(folderColumn.columnName)}
                      >
                        <button className="key">
                          {folderColumn.columnName}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#777777"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                width="14"
                                height="14"
                                x="8"
                                y="8"
                                rx="2"
                                ry="2"
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </span>
                        </button>
                      </div>
                      {FolderColumn.map((_, ind) => {
                        const bttn = folderColumn.data[ind];

                        if (!bttn) {
                          return (
                            <div className="btn__cont" key={nanoid()}>
                              <button className="btn _hover">{ind}</button>
                            </div>
                          );
                        }

                        return (
                          <GridButton
                            key={nanoid()}
                            tel={bttn.tel}
                            fullName={bttn.fullName}
                            stocks={bttn.stocks}
                            index={index}
                            price={bttn.basePrice}
                            multi={multi}
                            multiTwo={multiTwo}
                            comValue={bttn.com}
                            firstValue={firstValue}
                            secondValue={secondValue}
                            boolValue={bttn.bool}
                            h={bttn.h}
                            i={bttn.i}
                            sku={bttn.sku}
                            setLastButton={setLastButton}
                            percent={bttn.percent}
                            lastEvent={lastEvent}
                            basePrices={{
                              avito: bttn.avPrice,
                              mega: bttn.mmPrice,
                              ozon: bttn.ozPrice,
                              wb: bttn.wbPrice,
                              yaE: bttn.yaEPrice,
                              ya: bttn.yaPrice,
                            }}
                            fStocks={bttn.fStocks}
                            boostValue={boostValue}
                            boostInitial={bttn.boost}
                            wBar={bttn.wBar}
                            cp={bttn.cP}
                            cust={bttn.cust}
                            returnMode={returnMode}
                            copy={copy}
                            setCopy={setCopy}
                            wStocks={bttn.wStocks}
                            edited={bttn.edited}
                            wbAdded={bttn.wbAdded}
                            place={bttn.place}
                            group={bttn.group}
                            ozCommission={bttn.ozCommission}
                          />
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div style={{ width: "100%", height: "980px" }}></div>
              )
            ) : (
              <></>
            )}
          </div>
          {window.innerWidth > 600 && (
            <div className="right_column_bttn_list">
              <div className="bttn_list_column">
                <Link
                  to={"/ending-good"}
                  className="btn btn__changing-item flex items-center justify-center bttn"
                >
                  <TimesSVG />
                </Link>
              </div>
              <div className="bttn_list_column">
                <Link
                  to={"/O"}
                  className="btn btn__changing-item flex items-center justify-center bttn"
                >
                  O{" "}
                  {allOMessages && readOMessages && +allOMessages - +readOMessages>0 ? (
                    <div className="no_read_mess">
                      {+allOMessages - +readOMessages > 99
                        ? "99+"
                        : +allOMessages - +readOMessages}
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
                <Link
                  to={"/t-page-two"}
                  className="btn btn__changing-item flex items-center justify-center bttn"
                >
                  <TwoMenSVG />
                  {readMessagesTwo && +readMessagesTwo > 0 && (
                    <div className="no_read_mess">
                      {+readMessagesTwo > 99 ? "99+" : readMessagesTwo}
                    </div>
                  )}
                </Link>
              </div>
              <div className="bttn_list_column">
                {garbageTabs.map((item) => (
                  <Link
                    to={`/${tabs.length - 1 + +item.value}`}
                    className={`btns-page-btn btn black_svg btn__changing-item flex items-center justify-center trash-bttn`}
                    key={item.id}
                    onClick={() => setCurrentTab(tabs.length - 1 + +item.value)}
                  >
                    <TrashSVG
                      strokeColor={
                        currentTab !== tabs.length - 1 + +item.value
                          ? "#000"
                          : "#fff"
                      }
                      width="45px"
                    />
                    <div className="bttns-count">
                      <span> {(+item.value - 1) * itemsPerPage + 1} </span>
                      <span> {+item.value * itemsPerPage}</span>
                    </div>
                  </Link>
                ))}
                <Link
                  to={"/save-sell"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <BoxSVG width="45px" />
                </Link>
                <Link
                  to={"/create-button"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <AddSVG width="45px" />
                </Link>
                <Link
                  to={"/charts"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <ChartSVG width="40px" />
                </Link>
                <Link
                  to={"/charts2"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <RoiSVG width="45px" />
                </Link>
                <Link
                  to={"/watch"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <EyeSVG width="60px" height="55px" />
                </Link>
                <Link
                  to={"/problems"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <ListSVG width="70px" height="40px" />
                </Link>
                <Link
                  to={"/new"}
                  className={`btn btn__changing-item flex items-center justify-center bttn`}
                >
                  <HouseSVG width="45px" />
                </Link>
                <Link
                  to={"/t-page"}
                  className="btn btn__changing-item flex items-center justify-center bttn"
                >
                  T{" "}
                   {allMessages && readMessages && +allMessages - +readMessages>0 ? (
                    <div className="no_read_mess">
                      {+allMessages - +readMessages > 99
                        ? "99+"
                        : +allMessages - +readMessages}
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
                <Link
                  to={"/d-page"}
                  className="btn btn__changing-item flex items-center justify-center bttn"
                >
                  D
                </Link>
              </div>
            </div>
          )}
          <div className="mat__container">
            <div className="input__wrapper">
              <input
                type="text"
                placeholder="Изменение цены"
                value={`${firstValue} %`}
                onChange={(e) => {
                  const value = e.target.value
                    .split(" ")
                    .join("")
                    .replace("%", "");
                  setFirstValue(value ? Number(value).toString() : "");
                  setLastEvent("price");
                }}
              />
              <div className="search_by_what_bttns">
                {searchByWhatButtons.map((b) => {
                  return (
                    <div
                      className={`button ${
                        searchByWhat == b ? "active-s-button" : ""
                      }`}
                      onClick={() => setSearchByWhat(b)}
                      key={b}
                    >
                      {" "}
                      <span>{b}</span>
                    </div>
                  );
                })}
              </div>

              {window.innerWidth > 400 && (
                <>
                  <BttnsSearcher
                    bttnSearcher={bttnSearcher}
                    setBttnSearcher={setBttnSearcher}
                    notSearchYet={notSearchYet}
                    bttnsIndex={bttnsIndex}
                    setOpenBttnModal={setOpenBttnModal}
                  />
                </>
              )}

              <Button onClick={resetInputs} text="Reset" />
            </div>
            <div className="mat__wrapper">
              {plusButtons.map((button) =>
                button.value == 1 && button.input == 2 ? (
                  <Button key={button.id} onClick={allPrices}>
                    <span>{cpData?.middlePercent || 0}</span>
                  </Button>
                ) : (
                  <Button
                    key={button.id}
                    onClick={() => plusHandler(button.value, button?.input)}
                  >
                    {`+${button.value} ${buttonTextHandler(button.input)}`}
                  </Button>
                )
              )}
            </div>
            <div className="mat__wrapper">
              {minusButtons.map((button) =>
                button.value == 1 && button.input == 2 ? (
                  <Button key={button.id} onClick={allPrices2}>
                    <span>{cpData?.middlePercent2 || 0}</span>
                  </Button>
                ) : (
                  <Button
                    key={button.id}
                    onClick={() => minusHandler(button.value, button?.input)}
                  >
                    <div className="bttn_arrow">
                      {`-${button.value} ${buttonTextHandler(button.input)}`}
                    </div>
                  </Button>
                )
              )}
            </div>
            {/* {window.innerWidth <= 400 && (
              <>
                {" "}
                <div className="input_search_bttns">
                  <div className="search_by_what_bttns">
                    <div className="button">
                      {" "}
                      <span>Sku</span>
                    </div>
                    <div className="button">
                      {" "}
                      <span>Имя</span>
                    </div>
                    <div className="button">
                      {" "}
                      <span>Место</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="searcher_input"
                    placeholder="Search"
                    value={bttnSearcher}
                    onChange={(e) =>
                      onlyEnglish(e.target.value, setBttnSearcher)
                    }
                  />
                  {bttnSearcher.length > 0 && (
                    <div
                      className="reset_text"
                      onClick={() => setBttnSearcher("")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M20 20L4 4m16 0L4 20"
                        />
                      </svg>
                    </div>
                  )}

                  <span className="bttns_search_res">
                    {!notSearchYet &&
                      bttnsIndex.length > 0 &&
                      bttnsIndex.length}
                    {!notSearchYet && bttnsIndex.length == 0 && "Not found"}
                  </span>
                </div>
                <div
                  className="search_logo"
                  onClick={() => setOpenBttnModal(true)}
                >
                  <img src={searchLogo} alt="search_logo" />
                </div>
              </>
            )} */}
            <span className="pc">PC: {priceCountWaiting}</span>
            {xData.length > 0 && yData.length > 0 && (
              <div className="main_chart">
                <div className="relative w-full h-full">
                  <LineChart
                    data={{
                      labels: xData,
                      datasets: [
                        {
                          label: "hideTitle",
                          data: yData,
                          backgroundColor: "rgba(54, 162, 235, 0.2)",
                          borderColor: "rgba(54, 162, 235, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                  <LineChart
                    data={{
                      labels: xData,
                      datasets: [
                        {
                          label: "hideTitle",
                          data: ordersYData,
                          backgroundColor: " rgba(235, 54, 54, 0.2)",
                          borderColor: " rgba(235, 54, 54, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            )}
            <PriceInputs />
            {cpData && <CpInfo cpData={cpData} />}{" "}
            <MainPageFexp number={number} setNumber={setNumber} />
            <Bots />
          </div>
        </div>
        {window.innerWidth < 450 && (
          <div className={`bottom_left_modale_mob`}>
            <div className="content"></div>
          </div>
        )}
        <LabelText />
        <div className="absolute top-[40px] right-[10px] flex items-center justify-center flex-col p_list">
          <BttnsInfo buttonsInfo={buttonsInfo} />
          <ZeroModesInfo
            returnMode={returnMode}
            setReturnMode={setReturnMode}
          />
          <div className="piker">
            <div
              className="selected_month"
              onClick={() => setSelectOpened(!selectOpened)}
            >
              <span
                onClick={() => setSelectOpened(!selectOpened)}
                className={
                  +piker <= 3
                    ? "red"
                    : +piker <= 6
                    ? "blue"
                    : +piker <= 9
                    ? "orange"
                    : +piker <= 12
                    ? "green"
                    : ""
                }
              >
                {+piker}
              </span>
            </div>
            {selectOpened && window.innerWidth > 410 && (
              <ul className="select_month">
                {months.map((month, ind) => {
                  return (
                    <li key={month + ind} onClick={() => SelectMonth(month)}>
                      {ind + 1}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {timeLeft > 0 ? (
          <p className="time-left">Autoreset: {timeLeft} s.</p>
        ) : (
          <></>
        )}
      </Container>
      {openBttnModal && (
        <ModalSearchRes
          bttns={bttnsIndex}
          closeModule={setOpenBttnModal}
          setTub={setCurrentTab}
          byWhat={searchByWhat}
        />
      )}
    </AuthCheck>
  );
};

export default MainPage;
