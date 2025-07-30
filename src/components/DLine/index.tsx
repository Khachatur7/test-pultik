import { transliterationMap } from "@/common";
import axios from "@/axios";
import { useState } from "react";

interface DLine {
  dLines: Decr[];
  dLine: Decr;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Decr {
  avitoId: string;
  avitoId2: string;
  decr: string;
  price: string;
  minPrice: string;
  step: string;
  hours: number[];
  name: string;
}

const DLine: React.FC<DLine> = ({ dLines, setUpdate, dLine }) => {
  const [price, setPrice] = useState(dLine.price);
  const steps = [25, 50, 75, 100];
  const [step, setStep] = useState(dLine.step);
  const [avitoId, setAvitoId] = useState(dLine.avitoId);
  const [avitoIdTwo, setAvitoIdTwo] = useState(dLine.avitoId2);
  const [name, setName] = useState(dLine.name);
  const [minPrice, setMinPrice] = useState(dLine.minPrice);
  const [hours, setHours] = useState<number[]>(dLine.hours);

  const index = dLine.decr.match(/\d+/);
  const OnlyNumberChange = (
    text: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (/^\d*$/.test(text)) {
      setState(text);
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

  const addDecr = async () => {
    try {
      const newIndex = dLines[dLines.length - 1].decr.match(/\d+/)?.[0];
      const res = await axios.post("/createDecr", {
        user: localStorage.getItem("pultik-user-login"),
        newInd: newIndex ? +newIndex : 0,
        avId: avitoId,
        price: price,
        minPrice:minPrice,
        decr: step,
      });

      if (res.status == 200) {
        location.reload();
      }
    } catch (error) {
      console.log("Не удалось добавить новый 'decr'");
    }
  };
  const deleteDecr = async () => {
    try {
      const res = await axios.post("/deleteDecr", {
        user: localStorage.getItem("pultik-user-login"),
        index: index,
      });

      if (res.status == 200) {
        setUpdate(true);
        location.reload();
      }
    } catch (error) {
      console.log(`Не удалось удалить decr №${index}`);
    }
  };

  const startDecr = async () => {
    try {
      const res = await axios.post("/startDecr", {
        user: localStorage.getItem("pultik-user-login"),
        index: index,
        avId: avitoId,
        avId2: avitoIdTwo,
        hours: hours.sort((a, b) => a - b),
        price: price,
        minPrice:minPrice,
        decr: step,
        name: name,
      });
      if (res.status == 200) {
        setUpdate(true);
      }
    } catch (error) {
      console.log(`Не удалось включить decr №${index}`);
    }
  };
  const stopDecr = async () => {
    try {
      const res = await axios.post("/stopDecr", {
        user: localStorage.getItem("pultik-user-login"),
        index: index,
      });
      if (res.status == 200) {
        setUpdate(true);
      }
    } catch (error) {
      console.log(`Не удалось остановить decr №${index}`);
    }
  };

  const ChangeHours = (num: number) => {
    if (hours.includes(num)) {
      setHours([...hours.filter((h) => h != num)]);
    } else if (!hours.includes(num)) {
      setHours([...hours, num]);
    }
  };

  const ChangeStep = (step: string) => {
    setStep(step);
    startDecr();
  };

  return (
    <div className="d_container">
      <span className="index">{index}.</span>
      <div className="btns_one">
        <button className="bttn" onClick={startDecr}>
          <svg width="40px" height="40px" viewBox="-1 0 12 12" version="1.1">
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-65.000000, -3803.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M18.074,3650.7335 L12.308,3654.6315 C10.903,3655.5815 9,3654.5835 9,3652.8985 L9,3645.1015 C9,3643.4155 10.903,3642.4185 12.308,3643.3685 L18.074,3647.2665 C19.306,3648.0995 19.306,3649.9005 18.074,3650.7335"
                    id="play-[#1000]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button className="bttn" onClick={stopDecr}>
          <svg width="40px" height="40px" viewBox="0 0 28 28" version="1.1">
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Icon-Set-Filled"
                transform="translate(-520.000000, -571.000000)"
                fill="#000000"
              >
                <path
                  d="M546,571 L522,571 C520.896,571 520,571.896 520,573 L520,597 C520,598.104 520.896,599 522,599 L546,599 C547.104,599 548,598.104 548,597 L548,573 C548,571.896 547.104,571 546,571"
                  id="stop"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div className="fields">
        <label>Label</label>
        <input
          type="text"
          className="inpt avito_id"
          placeholder="AvitoId"
          value={avitoId}
          onChange={(e) => onlyEnglish(e.target.value, setAvitoId)}
        />
        <input
          type="text"
          className="inpt"
          placeholder="Price"
          value={price}
          onChange={(e) => OnlyNumberChange(e.target.value, setPrice)}
        />
        <select
          className="step_select"
          onChange={(e) => ChangeStep(e.target.value)}
          value={step}
        >
          {steps &&
            steps.map((step) => {
              return (
                <option key={step} value={step}>
                  {step}
                </option>
              );
            })}
        </select>
        <input
          type="text"
          className="inpt avito_id_two"
          placeholder="AvitoId2"
          value={avitoIdTwo}
          onChange={(e) => onlyEnglish(e.target.value, setAvitoIdTwo)}
        />
        <input
          type="text"
          className="inpt name"
          placeholder="Name"
          value={name}
          onChange={(e) => onlyEnglish(e.target.value, setName)}
        />
        <input
          type="text"
          className="inpt min_price"
          placeholder="minPrice"
          value={minPrice}
          onChange={(e) => onlyEnglish(e.target.value, setMinPrice)}
        />
      </div>
      <div className={`bttns_list ${!hours.length?'zero_hours':""}`}>
        {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0].map(
          (num) => {
            return (
              <button
                className={`bttn ${hours.includes(num) ? "active" : ""}`}
                onClick={() => ChangeHours(num)}
              >
                {num}
              </button>
            );
          }
        )}
      </div>
      <div className="p_m_bttns">
        <button className="bttn" onClick={addDecr}>
          +
        </button>
        <button
          className="bttn"
          onClick={() => (dLines.length > 1 ? deleteDecr() : 0)}
        >
          -
        </button>
      </div>
      <div className="all_hours">
       <span> {hours.length} </span>
       <span>({hours.length*+step})</span>
      </div>
    </div>
  );
};

export default DLine;
