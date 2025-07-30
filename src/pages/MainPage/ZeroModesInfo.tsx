import { ToggleComponent } from "@/components";
import React, { useEffect, useState } from "react";
import axios from "@/axios";
import { adminLogin } from "@/store/adminLogin";

interface ReturnMode {
  returnMode: boolean;
  setReturnMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZeroModesInfo: React.FC<ReturnMode> = ({ returnMode, setReturnMode }) => {
  const [wbZeroMode, setWbZeroMode] = useState(false);
  const [ozZeroMode, setOzZeroMode] = useState(false);

  const getInfo = async () => {
      const res = await axios.get<{ wbZeroMode: boolean; ozZeroMode: boolean }>(
        "/zeroModesInfo"
      );

      if (!res.data) {
        return;
      }

      setWbZeroMode(res.data.wbZeroMode);
      setOzZeroMode(res.data.ozZeroMode);
  };

  const toggleMode = async (mode: "wb" | "oz") => {
    if (localStorage.getItem("pultik-user-login") == adminLogin) {
      await axios.post("/zeroModes", {
        ...(mode === "wb"
          ? {
              wbZeroMode: !wbZeroMode,
            }
          : {
              ozZeroMode: !ozZeroMode,
            }),
        user: localStorage.getItem("pultik-user-login"),
      });

      if (mode === "wb") {
        setWbZeroMode(!wbZeroMode);
      } else {
        setOzZeroMode(!ozZeroMode);
      }
    } else {
      alert("Вы не имеете доступа");
    }
  };

  const ReturnMode = () => {
    if (localStorage.getItem("pultik-user-login") == adminLogin) {
      return setReturnMode(!returnMode);
    } else {
      alert("Вы не имеете доступа");
    }
  };

  useEffect(() => {
    getInfo();
    const interval = setInterval(getInfo, 30_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    returnMode &&
      setTimeout(() => {
        setReturnMode(false);
      }, 30000);
  }, [returnMode]);

  return (
    <div className="flex flex-col items-center gap-4 mt-4 toggle_comp_list">
      <p className="font-bold">wbZeroMode</p>
      <ToggleComponent
        variant="vertical"
        isOpened={wbZeroMode}
        onClick={() => toggleMode("wb")}
        className="mb-4 scale-x-150 scale-y-150 toggle_comp"
      />
      <p className="font-bold">ozZeroMode</p>
      <ToggleComponent
        variant="vertical"
        isOpened={ozZeroMode}
        onClick={() => toggleMode("oz")}
        className="scale-x-150 scale-y-150 mb-4 toggle_comp"
      />
      <p className="font-bold">Return Mode</p>
      <ToggleComponent
        variant="vertical"
        isOpened={returnMode}
        onClick={ReturnMode}
        className="scale-x-150 scale-y-150 mb-4 toggle_comp"
      />
    </div>
  );
};

export default ZeroModesInfo;
