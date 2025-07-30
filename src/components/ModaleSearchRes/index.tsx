import closeImg from "@/images/close-svgrepo-com.svg";
import { ButtonItemType } from "@/types/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalBttns {
  bttns: ButtonItemType[];
  closeModule: React.Dispatch<React.SetStateAction<boolean>>;
  setTub: React.Dispatch<React.SetStateAction<number | string>>;
  byWhat: string;
}

const ModalSearchRes: React.FC<ModalBttns> = ({
  bttns,
  closeModule,
  setTub,
  byWhat,
}) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const DetermineBackgroundColor = (bttn: ButtonItemType) => {
    if (!bttn.fStocks) {
      return "button-gradient";
    }

    if (bttn.fStocks >= 4) {
      return byWhat == "Имя" ? "green" : "blue";
    } else if (bttn.fStocks < 0) {
      return "black";
    }

    switch (bttn.fStocks) {
      case 1:
        return "red";

      case 2:
        return "yellow";

      case 3:
        return byWhat == "Имя" ? "blue" : "green";

      default:
        return "";
    }
  };

  const GoToBttn = (ind: number) => {
    localStorage.setItem("bttn-from-modale", JSON.stringify(ind));
    const pageNumber = Math.ceil(ind / 77);
    navigate(`/${pageNumber}`);
    setTub(pageNumber);
  };

  const CalcModaleWidth = () => {
    bttns.map((b) => {
      if (b.fullName.length > 25 && width == 0) {
        setWidth(b.fullName.length);
      } else if (b.fullName.length > 25 && width <= b.fullName.length) {
        setWidth(b.fullName.length);
      }
    });
  };

  useEffect(() => {
    CalcModaleWidth();
  }, []);

  return (
    <div
      className="bttns_modal_res"
      style={{ width: `${width != 0 ? width * 18 : 700}px` }}
    >
      <div style={{ textAlign: "center" }}>Поиск по параметру: {byWhat}</div>
      <div className="close_bttns_modal" onClick={() => closeModule(false)}>
        <img src={closeImg} alt="" />
      </div>
      <div className="bttns_list">
        {bttns.map((el) => {
          return (
            <div
              className={`bttn_index ${DetermineBackgroundColor(el)}`}
              key={el._id}
              onClick={() => GoToBttn(el.i)}
            >
              {el.i}. {el.fullName} | {el.percent || "0"} % |{" "}
              {el.basePrice || "000"} {el.edited ? `| ${el.edited}` : ""}
            </div>
          );
        })}
      </div>
      {bttns.length == 0 && (
        <>
          <div className="bttns_not_found">
            <span>NOT FOUND</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalSearchRes;
