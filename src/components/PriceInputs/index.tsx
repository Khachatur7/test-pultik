import { useEffect, useState } from "react";
import axios from "@/axios";
import EnvelopeSVG from "../SVGcomponents/EnvelopeSVG";
import ChangeCountBttns from "../ChangeCountBttns";

const PriceInputs = () => {
  const readMessages = localStorage.getItem("read-messages");
  const allMessages = localStorage.getItem("messages");
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");
  const [promoField, setPromoField] = useState("");
  const [otherField, setOtherField] = useState("");
  const [deleteField, setDeleteField] = useState("");
  const [agentsField, setAgentsField] = useState("");
  const [actField, setActField] = useState("");
  const [pasField, setPasField] = useState("");
  const [fieldsCount, setFieldsCount] = useState(0);

  const getPrices = async () => {
    try {
      const res = await axios.post<{
        massage: number[];
        massage2: { act: number; pas: number };
      }>("/priceData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setDeleteField(res.data.massage[0].toString());
        setAgentsField(res.data.massage[1].toString());
        setPromoField(res.data.massage[2].toString());
        setOtherField(res.data.massage[3].toString());
        setActField(res.data.massage2.act.toString());
        setPasField(res.data.massage2.pas.toString());
        const allPrices = (
          +res.data.massage[0] +
          +res.data.massage[1] +
          +res.data.massage[2] +
          +res.data.massage[3]
        ).toFixed(2);
        setFieldsCount(+allPrices);
      }
    } catch (error) {
      console.log(`Не удалось получить данные с роута "/priceData"`);
    }
  };

  const SetFieldValue = async () => {
    try {
      const res = await axios.post("/priceDataChange", {
        user: localStorage.getItem("pultik-user-login"),
        massage: [deleteField, agentsField, promoField, otherField],
        massage2: { act: +actField, pas: +pasField },
      });
      if (res.status == 200) {
        alert("Данные полей обновились!");
      }
    } catch (error) {
      console.log(`Не удалось поменять данные: ${error}`);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div className="inputs_column">
      <div className="field">
        <span>Del:</span>{" "}
        <input
          type="text"
          value={deleteField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setDeleteField(e.target.value)
              : ""
          }
        />
        <div className="bttn" onClick={SetFieldValue}>
          OK
        </div>
        <ChangeCountBttns state={deleteField} setState={setDeleteField}/>
      </div>
      <div className="field">
        <span>Ag:</span>{" "}
        <input
          type="text"
          value={agentsField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setAgentsField(e.target.value)
              : ""
          }
        />
        <ChangeCountBttns state={agentsField} setState={setAgentsField}/>
    
      </div>
      <div className="field">
        <span>Pr:</span>{" "}
        <input
          type="text"
          value={promoField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setPromoField(e.target.value)
              : ""
          }
        />{" "}
        <ChangeCountBttns state={promoField} setState={setPromoField}/>
      </div>
      <div className="field">
        <span>Oth:</span>{" "}
        <input
          type="text"
          value={otherField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setOtherField(e.target.value)
              : ""
          }
        />{" "}
        <ChangeCountBttns state={otherField} setState={setOtherField}/>
      </div>
      <div className="field">
        <span>Act:</span>{" "}
        <input
          type="text"
          value={actField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setActField(e.target.value)
              : ""
          }
        />
        <ChangeCountBttns state={actField} setState={setActField} division={1}/>
      </div>
      <div className="field">
        <span>Pas:</span>{" "}
        <input
          type="text"
          value={pasField}
          onChange={(e) =>
            /^\d*([.,]?\d*)?$/.test(e.target.value)
              ? setPasField(e.target.value)
              : ""
          }
        />
        <ChangeCountBttns state={pasField} setState={setPasField} division={1}/>
      </div>
      <div className="additionall_details">
        <div className="all_price">{fieldsCount} %</div>
        <div className="not_read_messages">
          <EnvelopeSVG />
          <span>
            <span style={{ fontWeight: "700" }}>T</span>:{" "}
            {allMessages && readMessages ? +allMessages - +readMessages : 0}
          </span>{" "}
        </div>
        <div className="not_read_messages">
          <EnvelopeSVG />
          <span>
            <span style={{ fontWeight: "700" }}>O</span>:{" "}
            {allOMessages && readOMessages ? +allOMessages - +readOMessages : 0}
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default PriceInputs;
