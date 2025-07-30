import { useState } from "react";
import PopupExit from "../PopupExit.tsx";

interface CircleModalComponentBottomLeftProps {
  cust?: number;
  edited?: string;
  ozCommission: number;
}

const CircleModalComponentBottomLeft: React.FC<
  CircleModalComponentBottomLeftProps
> = ({ cust, edited,ozCommission }) => {
  const [isActive, setIsActive] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  function onMouseOver() {
    if (!exitHover) {
      setIsActive(true);
    }
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  return (
    <div
      className={`${!isActive ? "popup__circle" : "popup"} bottom-left`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      {isActive ? (
        <>
          <p className="popup__el">cust: {cust || 0}</p>
          <p className="popup__el">edited: {edited || 0}</p>
          <p className="popup__el">ozCom: {ozCommission || 0}</p>
          <p className="popup__el">...</p>
          <p className="popup__el">...</p>
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

export default CircleModalComponentBottomLeft;
