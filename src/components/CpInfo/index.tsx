import axios from "@/axios";
import { useEffect, useState } from "react";
import CpData from "@/types/common/CpDatType";

const CpInfo: React.FC<{
  cpData: CpData;
}> = ({ cpData }) => {
  const [freeSlotz, setFreeSlotz] = useState<string[]>([]);
  const [mOzCom, setmOzCom] = useState<number>();
  const [ozInDelSum, setOzInDelSum] = useState<number>();

  const getOzMiddleCom = async () => {
    try {
      const res = await axios.post("/getOzMiddleCom", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setmOzCom(res.data.message);
      }
    } catch (error) {
      console.log("Не удалось получить данные с роута `/getFreeSlotz`");
    }
  };
  const getFreeSlotz = async () => {
    try {
      const res = await axios.post("/getFreeSlotz", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setFreeSlotz(res.data.message);
      }
    } catch (error) {
      console.log("Не удалось получить данные с роута `/getFreeSlotz`");
    }
  };

  const GetOzInDelSum = async () => {
    try {
      const res = await axios.post("/getOzInDelSum", {
        user: localStorage.getItem("pultik-user-login"),
      });
      if (res.status == 200) {
        setOzInDelSum(res.data.message);
      }
    } catch (error) {
      console.log(`Не удалось поменять данные: ${error}`);
    }
  };

  useEffect(() => {
    GetOzInDelSum();
    getFreeSlotz();
    getOzMiddleCom();
  }, []);

  useEffect(() => {
    setInterval(() => {
      getFreeSlotz();
    }, 15000);
  }, []);

  return (
    <div className="relative text_cp">
      {cpData ? (
        <>
          <p>cP: {cpData.cP}</p>
          <p>eX: {cpData.eX}</p>
          <p>pL: {cpData.pL}</p>
          <p>rO: {cpData.round}</p>
          <p>mG: {cpData.marg}</p>

          <p>
            Wb: {cpData.salesWb} | Oz: {cpData.salesOz} | Ya: {cpData.salesYa} |
            Av: {cpData.salesAv} | Mm: {cpData.salesMm}
          </p>
          <p>mOzCom: {mOzCom} %</p>
          <p>
            Quartal: {cpData.quart} |
            {cpData.priceIndex.split(",")[1].split("|")[1]} ,{" "}
            {cpData.priceIndex.split(",")[2]}
          </p>
          <p>uS: {localStorage.getItem("pultik-user-login").slice(0, 4)}</p>
          <p>
            {cpData.priceIndex.split(",")[3]} | {cpData.lS}
          </p>
          <p>ozDelSum: Rub | ozInDelSum: {ozInDelSum} Rub</p>
          <p>fS: {`[ ${freeSlotz.join(", ")} ]`}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CpInfo;
