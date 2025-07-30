import { ComValueType } from "@/types/api";
import axios from "@/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleComponent from "../ToggleComponent";
import { adminLogin } from "@/store/adminLogin";
import PopupExit from "../PopupExit.tsx";
import { useNavigate } from "react-router-dom";
// import ButtonItemType from "@/types/common/ButtonItemType.ts";
// import dataFilterHandler from "@/handlers/dataFilterHandler.ts";
import TrashSVG from "../SVGcomponents/TrashSVG/index.tsx";
import PrintSVG from "../SVGcomponents/PrintSVG/index.tsx";
import { transliterationMap } from "@/common/index.ts";

interface CircleModalComponentLeftProps {
  comValue?: ComValueType;
  boolValue: number;
  sku: string;
  basePrice: number;
  wBar: string;
  returnMode?: boolean;
  copy: boolean;
  ind: number;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
  setXalturaParent: React.Dispatch<any>;
  fullName: string;
  fStocks?: number;
  btnPlace: string;
  btnGroup: string | undefined;
}

const CircleModalComponentLeft: React.FC<CircleModalComponentLeftProps> = ({
  comValue,
  sku,
  basePrice,
  wBar,
  returnMode,
  copy,
  ind,
  setCopy,
  setXalturaParent,
  fullName,
  fStocks,
  btnPlace,
  btnGroup,
}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  const [price, setPrice] = useState(basePrice.toString());
  const [place, setPlace] = useState(btnPlace);
  const [group, setGroup] = useState(btnGroup || "N/A");
  const [xaltura, setXaltura] = useState(
    JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(`${sku}`)))) ||
      false
  );
  const [index, setIndex] = useState<number>(ind);
  const [firstRender, setFirstRender] = useState(true);
  function onMouseOver() {
    if (!exitHover) {
      setIsActive(true);
    }
  }

  if (ind > index && firstRender) {
    setIndex(ind);
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  const newIndexNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setIndex(+newValue);
      setFirstRender(false);
    }
  };

  const cPrice = async () => {
    try {
      const res = await axios.post("/cPrice", {
        price: Number(price),
        sku,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Не удалось изменить цену");
    }
  };
  const changePlace = async () => {
    try {
      const res = await axios.post("/changePlace", {
        place: place,
        sku,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        alert(res.data.massage);
      }
    } catch (error) {
      console.log("Не удалось изменить цену");
    }
  };
  const changeGroup = async () => {
    try {
      const res = await axios.post("/changeGroup", {
        group: group,
        sku,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        alert(res.data.massage);
      }
    } catch (error) {
      console.log("Не удалось изменить группу");
    }
  };
  const postNewBttnIndex = async (newInd?: number) => {
    const post = await axios.post("/changeIndex", {
      old: ind,
      new: newInd ? newInd : index,
      user: localStorage.getItem("pultik-user-login"),
    });

    if (post.status == 200) {
      if (newInd) {
        alert(`Актив был перенесен на кнопку ${newInd} такой то`);
      }
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  };

  const ChangeArea = async () => {
    try {
      const res = await axios.post("/changeCom", {
        user: localStorage.getItem("pultik-user-login"),
        i: index,
      });

      if (res.data) {
        alert(res.data.massage);
      }
    } catch (error) {
      alert("Не удалось поменять местоположение кнопки :(");
    }
  };

  async function ReturnModePlus() {
    if (!returnMode) {
      return alert("Pежим возврата выключен. Активируйте режим возврата!");
    } else {
      try {
        const res = await axios.post(`/returnCom`, {
          text: sku,
          decrement: 1,
          user: localStorage.getItem("pultik-user-login"),
        });

        if (res.status !== 200 || !res.data || !res.data.complete) {
          throw Error();
        }

        alert(res.data.complete);
      } catch (error) {
        toast.error("Ошибка отправления запроса");
      }
    }
  }

  async function ReturnModeMinus() {
    if (!returnMode) {
      return alert("Pежим возврата выключен. Активируйте режим возврата!");
    } else {
      try {
        const res = await axios.post(`/returnCom`, {
          text: sku,
          decrement: -1,
          user: localStorage.getItem("pultik-user-login"),
        });

        if (res.status !== 200 || !res.data || !res.data.complete) {
          throw Error();
        }

        alert("Запрос выполнен успешно!");
      } catch (error) {
        toast.error("Ошибка отправления запроса");
      }
    }
  }

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(!copy);
      })
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
      });
  };

  const Xaltura = async () => {
    if (localStorage.getItem("pultik-user-login") == adminLogin) {
      try {
        await axios.post("/xaltura", {
          xaltura: !xaltura,
          sku: sku,
          user: localStorage.getItem("pultik-user-login"),
        });
        localStorage.setItem(`${sku}`, JSON.stringify(!xaltura));
        setXaltura(!xaltura);
        setXalturaParent(!xaltura);
      } catch (error) {
        console.error(`Ошибка при отправке данных: ${error}`);
      }
    } else {
      alert("Вы не имеете доступа");
    }
  };

  const EditBttn = () => {
    localStorage.setItem("i", JSON.stringify(index));
    navigate("/create-button");
  };

  const ToGarbage = async () => {
    try {
      const res = await axios.post("/toGarbage", {
        user: localStorage.getItem("pultik-user-login"),
        i: index,
        name: fullName,
        sku: sku,
      });

      if (res.data) {
        alert(res.data.massage);
      }
    } catch (error) {
      alert("Что-то пошло не так :(");
    }
  };

  const PrintInfo = async () => {
    try {
      const res = await axios.post("/printInfo", {
        user: localStorage.getItem("pultik-user-login"),
        i: index,
        name: fullName,
        sku: sku,
        f: fStocks,
      });

      if (res.data) {
        alert(res.data.massage);
      }
    } catch (error) {
      alert("Что-то пошло не так :(");
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

  useEffect(() => {
    setPrice(basePrice.toString());
  }, [basePrice]);

  useEffect(() => {
    setIndex(ind);
  }, [ind]);

  useEffect(() => {
    setPlace(btnPlace);
  }, [btnPlace]);

  return (
    <div
      className={`${!isActive ? "popup__circle" : "popup"} left`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      {isActive ? (
        <>
          <div className="modal_comp_left_i">
            <span>i:</span>
            <input
              type="text"
              value={index}
              onChange={(e) => newIndexNumber(e)}
              className="max-w-[75px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="modal_comp_left_i_bttn ok_bttn"
              onClick={() => postNewBttnIndex()}
            >
              ok
            </button>
          </div>
          <p className="popup__el">{comValue ? `com: ${comValue}` : "..."}</p>
          <p className="popup__el !flex !items-center gap-[5px]">
            Name: {fullName}
            <span onClick={() => handleCopy(fullName)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777777"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <p className="popup__el !flex !items-center gap-[5px]">
            Sku: {sku}
            <span onClick={() => handleCopy(sku)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777777"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <div className="flex gap-2">
            BP:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="max-w-[85px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="border-solid border-[1px] border-black ok_bttn"
              onClick={cPrice}
            >
              ok
            </button>
          </div>
          <div className="flex gap-2">
            Place:
            <input
              type="text"
              value={place}
              onChange={(e) => onlyEnglish(e.target.value, setPlace)}
              className="max-w-[85px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="border-solid border-[1px] border-black ok_bttn"
              onClick={changePlace}
            >
              ok
            </button>
             <span className="copy_svg" onClick={() => handleCopy(place)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777777"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </div>
          <div className="flex gap-2">
            Group:
            <input
              type="text"
              value={group}
              onChange={(e) => onlyEnglish(e.target.value, setGroup)}
              className="max-w-[85px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="border-solid border-[1px] border-black ok_bttn"
              onClick={changeGroup}
            >
              ok
            </button>
             <span className="copy_svg" onClick={() => handleCopy(group)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777777"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </div>
          <p className="popup__el !flex !items-center gap-[5px]">
            {wBar}
            <span onClick={() => handleCopy(wBar)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777777"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <div className="retrun_bttns">
            <button className="return_bttn bttn_plus" onClick={ReturnModePlus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  fill-rule="evenodd"
                  d="M12 5.25a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-5.25V18a.75.75 0 0 1-1.5 0v-5.25H6a.75.75 0 0 1 0-1.5h5.25V6a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              className="return_bttn bttn_minus"
              onClick={ReturnModeMinus}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  fill-rule="evenodd"
                  d="M5.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ToggleComponent onClick={Xaltura} isOpened={xaltura} />
          <div className="edit_bttns">
            <button onClick={EditBttn} className="edit_bttn">
              <span>Edit</span>
            </button>
            <button className="edit_bttn arrows" onClick={ChangeArea}>
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                viewBox="0 0 1043.000000 866.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,866.000000) scale(0.100000,-0.100000)"
                  fill="#fff"
                  stroke="none"
                >
                  <path
                    d="M3110 5185 c0 -2314 -3 -2905 -12 -2905 -7 0 -307 294 -665 652
l-653 653 -285 -285 c-157 -157 -285 -289 -285 -295 0 -5 519 -529 1153 -1163
l1153 -1153 1149 1151 c633 633 1151 1156 1153 1163 1 6 -126 140 -283 297
l-285 285 -658 -658 c-361 -361 -660 -657 -665 -657 -4 0 -7 1310 -7 2910 l0
2910 -405 0 -405 0 0 -2905z"
                  />
                  <path
                    d="M5937 6892 c-631 -631 -1147 -1151 -1147 -1157 0 -5 128 -138 285
-295 l285 -286 658 658 c361 362 660 658 664 658 5 0 8 -1305 8 -2900 l0
-2900 405 0 405 0 0 2894 c0 1592 4 2897 9 2900 4 3 301 -289 660 -649 358
-360 655 -655 659 -655 11 0 572 564 572 575 0 12 -2292 2305 -2305 2305 -5 0
-526 -516 -1158 -1148z"
                  />
                </g>
              </svg>
            </button>
            <button className="edit_bttn trash-svg" onClick={ToGarbage}>
              <TrashSVG width="28px" />
            </button>
          </div>
          <div className="edit_bttns_two">
            <button className="edit_bttn print-svg" onClick={PrintInfo}>
              <PrintSVG width="28px" />
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      {isActive && (
        <PopupExit setState={setIsActive} setOnExit={setExitHover} />
      )}
    </div>
  );
};

export default CircleModalComponentLeft;
