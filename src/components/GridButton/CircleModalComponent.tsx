import { priceReplaceHandler } from "@/usable";
import { useState } from "react";
import PopupExit from "../PopupExit.tsx";

export interface MultiType {
  avito: number[];
  ozon: number[];
  tel: string;
  wildberries: number[];
  wildberriesPlus: number;
  yandex: number[];
  mega: number[];
  _id: string;
}

interface CircleModalComponentProps {
  price: number;
  ozonPrice: string;
  wbPrice: string;
  yandexPrice: string;
  avitoPrice: string;
  yandexEPrice: string;
  mmPrice: string;
}

const CircleModalComponent: React.FC<CircleModalComponentProps> = ({
  price,
  ozonPrice,
  wbPrice,
  yandexPrice,
  avitoPrice,
  yandexEPrice,
  mmPrice,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [exitHover,setExitHover] = useState(false)

  function onMouseOver() {
    if (!exitHover) {
      setIsActive(true); 
      
    }
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  if (!price) {
    return <></>;
  }

  return (
    <div
      className={!isActive ? "popup__circle" : "popup"}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      {isActive ? (
        <>
          <p className="popup__el">Ya: {priceReplaceHandler(+yandexPrice)} ₽</p>
          <p className="popup__el">
            YaE: {priceReplaceHandler(+yandexEPrice)} ₽
          </p>
          <p className="popup__el">Av: {priceReplaceHandler(+avitoPrice)} ₽</p>
          <p className="popup__el">Oz: {priceReplaceHandler(+ozonPrice)} ₽</p>
          <p className="popup__el">Wb: {priceReplaceHandler(+wbPrice)} ₽</p>
          <p className="popup__el">Mm: {priceReplaceHandler(+mmPrice)} ₽</p>
        </>
      ) : (
        <></>
      )}
      {isActive && <PopupExit setState={setIsActive} setOnExit={setExitHover}/>}
    </div>
  );
};

export default CircleModalComponent;
