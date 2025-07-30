import { useEffect, useState } from "react";
import { AuthCheck, Container, ToggleComponent } from "@/components";
import { toast } from "react-toastify";
import axios from "@/axios";
// import { useNavigate } from "react-router-dom";
import { transliterationMap } from "@/common";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";

// interface ITypeList {
//   "0": string;
//   "1": string;
//   "2": string;
//   "3": string;
//   "4": string;
//   commodites: string;
//   _id: string;
// }

const ButtonCreatePage = () => {
  // const navigate = useNavigate();
  // const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  // const [remainder, setRemainder] = useState("1");
  const [basePrice, setBasePrice] = useState("000");
  const [sku, setSku] = useState("");
  const [aaid, setAaid] = useState("0");
  const [vart, setVart] = useState("0");
  const [wBar, setWBar] = useState("0");
  // const [oName, setOName] = useState("1");
  const [type, setType] = useState<string>("tel");
  const [typesList, setTypesList] = useState<string[]>();
  // const [cust, setCust] = useState("0");
  const [loading, setLoading] = useState(false);
  const [v, setV] = useState("15");
  const [s, setS] = useState("35");
  const [g, setG] = useState("25");
  const [number, setNumber] = useState("");

  const [SKUvalue, setSKUvalue] = useState("");
  // const [h, setH] = useState(false);
  const lS = "{";
  const rS = "}";
  const lT = "[";
  const rT = "]";
  const i = localStorage.getItem("i");
  const [keyField, setKeyField] = useState<string>(i ? "i" : "");
  const [nameField, setNameField] = useState<string>(i ? i : "");
  const [nameFieldType, setNameFieldType] = useState<string>("number");
  const [dataField, setDataField] = useState<string>("");
  const [dataCompare, setDataCompare] = useState<string[]>();
  const [changedData, setChangedData] = useState<string[]>([]);
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // if (!number.trim() || isNaN(Number(number))) {
    //   return toast.warning("Введите номер");
    // }

    if (!name.trim()) {
      return alert("Поле 'название в БД' не может быть пустым");
    }

    // if (!fullName.trim()) {
    //   return toast.warning("Введите полное название кнопки");
    // }

    // if (!remainder.trim()) {
    //   return toast.warning("Введите остаток");
    // }

    if (+basePrice <= 0 || isNaN(Number(basePrice))) {
      return alert("Базовая цена должна быть больше 0");
    }

    if (!sku.trim()) {
      return alert("Поле 'Яску, Оску и Мску' не может быть пустым");
    }

    if (!aaid.trim()) {
      return toast.warning("Введите ААЙДИ");
    }

    if (!vart.trim()) {
      return toast.warning("Введите Варт");
    }

    if (!wBar.trim()) {
      return toast.warning("Введите ВБар");
    }

    // if (!oName.trim()) {
    //   return toast.warning("Введите ОИмя");
    // }

    try {
      setLoading(true);

      //     const res = await axios.post(`/cCom/${number}/${name}/${fullName}/${remainder}/${basePrice}/${sku}/${oName}/${vart}/${wBar}/${aaid}/${type}/${bool}`, {

      const res = await axios.post(`/cCom/`, {
        // number: number,
        name: name,
        // fullName: fullName,
        // remainder: remainder,
        basePrice: basePrice,
        sku: sku,
        // oName: oName,
        vart: vart,
        wBar: wBar,
        aaid: aaid,
        type: type,
        s: Number(s),
        v: Number(v),
        g: Number(g),
        // h: h,
        // cust,
        user: localStorage.getItem("pultik-user-login"),
      });
      alert(res.data.message);

      // navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Не удалось создать кнопку");
    } finally {
      setLoading(false);
    }
  };

  const changeNameField = (text: string) => {
    if (nameFieldType == "string") {
      return setNameField(text);
    } else if (nameFieldType == "number") {
      if (/^\d*$/.test(text)) {
        return setNameField(text);
      }
    }
  };

  const postNameRequest = async () => {
    try {
      const res = await axios.post("/mongoReq", {
        user: localStorage.getItem("pultik-user-login"),
        arr: [
          keyField.trim(),
          nameFieldType == "string" ? nameField.trim() : +nameField.trim(),
        ],
      });

      if (res.status == 200) {
        setDataField(JSON.stringify(res.data.answer[0], null, 2));
        setDataCompare(JSON.stringify(res.data.answer[0]).split(","));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendChangedData = async () => {
    try {
      const res = await axios.post("/mongoData", {
        user: localStorage.getItem("pultik-user-login"),
        arr: [
          keyField.trim(),
          nameFieldType == "string" ? nameField.trim() : +nameField.trim(),
        ],
        dict: JSON.parse(`{${[...changedData]}}`),
      });

      if (res.status == 200) {
        alert("Данные изменены!");
      }
    } catch (error) {
      alert("Не удалось изменить данные");
    }
  };

  const checkChangedData = () => {
    let changedFieldData = JSON.stringify(JSON.parse(dataField)).split(",");
    const newData: string[] = [];
    dataCompare?.map((el, ind) => {
      if (el != changedFieldData[ind]) {
        newData.push(changedFieldData[ind].replace(/[{}]/g, ""));
      }
    });
    if (newData.length != 0) {
      setDataCompare(changedFieldData);
      setChangedData([...newData]);
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
  const toggleNameValueType = () => {
    if (nameFieldType == "string") {
      setNameFieldType("number");
      setNameField(nameField.replace(/[^0-9]/g, ""));
    } else {
      setNameFieldType("string");
    }
  };

  const loadComList = async () => {
    try {
      const res = await axios.get("/comList");
      let loadListArr: string[] = [];
      if (!res.data) {
        throw Error();
      }
      Object.keys(res.data.complete[0]).map((el) => {
        if (!isNaN(+el)) {
          loadListArr.push(res.data.complete[0][el]);
        }
      });
      setTypesList(loadListArr);
    } catch (error) {}
  };

  // const getMessages = async () => {
  //   try {
  //     const res = await axios.post("/massages", {
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
  //         const audio = new Audio("/new-message.mp3");
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

  const createOrder = async () => {
    try {
      const res = await axios.post("/createOrder", {
        number: number,
        sku: SKUvalue,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        alert(res.data.massage);
      }
    } catch (error) {
      alert("Что-то пошло не так :(");
    }
  };

  useEffect(() => {
    if (changedData.length > 0) {
      sendChangedData();
    }
  }, [changedData]);

  useEffect(() => {
    if (i) {
      postNameRequest();
      localStorage.removeItem("i");
    }
    loadComList();
  }, []);

  useEffect(() => {
    const comListTimer = setInterval(() => {
      loadComList();
    }, 5000);

    return () => clearInterval(comListTimer);
  }, []);

  // useEffect(() => {
  //   const checkNewMessages = setInterval(() => {
  //     getMessages();
  //   }, 5000);

  //   return () => clearInterval(checkNewMessages);
  // }, []);

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

  return (
    <AuthCheck>
      <Container>
        <div className="flex flex-col w-full create_page">
          <form
            className="input__wrapper input__login"
            onSubmit={submitHandler}
          >
            <div className="form_field">
              <span className="text-2xl">Название в БД</span>
              <input
                className="create_page_item"
                type="text"
                value={name}
                onChange={(e) => onlyEnglish(e.target.value, setName)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Базовая цена</span>
              <input
                className="create_page_item"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Яску, Оску, Мску</span>
              <input
                className="create_page_item"
                type="text"
                value={sku}
                onChange={(e) => onlyEnglish(e.target.value, setSku)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Варт</span>
              <input
                className="create_page_item"
                type="text"
                value={vart}
                onChange={(e) => onlyEnglish(e.target.value, setVart)}
                style={{ marginTop: 0 }}
              />
            </div>

            <div className="form_field">
              <span className="text-2xl">Вбар</span>
              <input
                className="create_page_item"
                type="text"
                value={wBar}
                onChange={(e) => onlyEnglish(e.target.value, setWBar)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Аайди</span>
              <input
                className="create_page_item"
                type="text"
                value={aaid}
                onChange={(e) => onlyEnglish(e.target.value, setAaid)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Тип</span>
              <select
                className={"h-[55px] rounded-[12px] text-2xl create_page_item"}
                onChange={(e) => setType(e.target.value)}
              >
                {typesList &&
                  typesList.map((text) => {
                    return (
                      <option key={text} value={text}>
                        {text}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form_field">
              <span className="text-2xl">ШВГ</span>
              <div className="grid grid-cols-3 gap-1">
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="Ш"
                  value={s}
                  onChange={(e) => setS(e.target.value)}
                  style={{ marginTop: 0 }}
                />
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="В"
                  value={v}
                  onChange={(e) => setV(e.target.value)}
                  style={{ marginTop: 0 }}
                />
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="Г"
                  value={g}
                  onChange={(e) => setG(e.target.value)}
                  style={{ marginTop: 0 }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn create_page_item form_bttn"
              disabled={loading}
            >
              Создать актив
            </button>
          </form>
          <p className="relative text-2xl mt-[25px] warning_text">
            !!! Фактический остаток всегда более или равен продаваемому остатку
            !!! Продаваемый остаток не должен быть более двух !!!
          </p>
          <p className="relative text-4xl mt-[25px] text-right about_sku">
            !!! SKU Яндекса, Озона и ММ должны совпадать!!!
          </p>
          <div className="api_data_section">
            <div className="section_field">
              <label htmlFor="key_input">Запрос:</label>
              <div className="section_field_inputs">
                <div className="key_field">
                  <span>{lS}</span>
                  <input
                    type="text"
                    className="key_input"
                    id="key_input"
                    name="key_input"
                    value={keyField}
                    onChange={(e) => onlyEnglish(e.target.value, setKeyField)}
                  />
                </div>
                :
                <div className="name_field">
                  <input
                    type="text"
                    className="name_input"
                    id="name_input"
                    name="name_input"
                    value={nameField}
                    onChange={(e) => changeNameField(e.target.value)}
                  />
                  <span>{rS}</span>
                </div>
                <button className="send_name_bttn" onClick={postNameRequest}>
                  <span>Отправить</span>
                </button>
                <ToggleComponent
                  isOpened={nameFieldType == "number" ? true : false}
                  onClick={toggleNameValueType}
                />
              </div>
            </div>
            <div className="section_field">
              <label htmlFor="data_input">Данные:</label>
              <div className="data_field">
                <div className="lt">
                  <span>{lT}</span>
                </div>
                <textarea
                  className="data_input"
                  id="data_input"
                  name="data_input"
                  value={dataField}
                  onChange={(e) => onlyEnglish(e.target.value, setDataField)}
                />
                <div className="rt">
                  <span>{rT}</span>
                </div>
              </div>
            </div>
            <button className="change_data_bttn" onClick={checkChangedData}>
              <span>Изменить</span>
            </button>
          </div>
          <span style={{ marginBottom: "10px", fontSize: "25px" }}>
            Создать заказ Озон вручную:
          </span>
          <div className="create_order">
            <div className="form_field">
              <input
                className="create_page_item"
                type="text"
                value={number}
                onChange={(e) => onlyEnglish(e.target.value, setNumber)}
                style={{ marginTop: 0 }}
                placeholder="Номер заказа"
              />
            </div>
            <div className="form_field">
              <input
                className="create_page_item"
                type="text"
                value={SKUvalue}
                onChange={(e) => onlyEnglish(e.target.value, setSKUvalue)}
                style={{ marginTop: 0 }}
                placeholder="SKU товара"
              />
            </div>
            <button className="change_data_bttn" onClick={createOrder}>
              <span>Создать</span>
            </button>
          </div>
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ButtonCreatePage;
