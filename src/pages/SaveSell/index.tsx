import { useEffect, useState } from "react";
import { AuthCheck, Container, ToggleComponent } from "@/components";
import { toast } from "react-toastify";
import axios from "@/axios";
import { createPortal } from "react-dom";
import { transliterationMap } from "@/common";
import { checkNewMessagesT } from "@/handlers/messages";
import { checkNewMessagesO } from "@/handlers/messagesTwo";
// import { useNavigate } from 'react-router-dom';

// interface OrderInfoType {
//     cleanProfit: string;
//     commodites: string;
//     date: string;
//     day: string;
//     fullPrice: number;
//     marginalityPrice: number;
//     market: string;
//     orderId: string;
//     shipmentDate: string;
//     time: string;
//     type: string;
//     _id: string;
// }

interface ModalDataType {
  market: string;
  orderId: number;
  type: string;
  date: string;
  time: string;
  day: string;
  commodites: string;
  shipmentDate: string;
  fullPrice: number;
  marginalityPrice: number;
  cP: number;
  quant: number;
  cleanProfit: number;
  marginality?: string;
  sku?: string;
}

interface FexpItemType {
  date: string;
  expenseLbl: string;
  expenseSum: number;
  _id: string;
}

const ButtonCreatePage = () => {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [salesInfo, setSalesInfo] = useState<ModalDataType[] | null>(null);
  const [fexpInfo, setFexpInfo] = useState<FexpItemType[] | null>(null);
  const [ctaxInfo, setCtaxInfo] = useState<FexpItemType[] | null>(null);
  const [isShiped, setIsShiped] = useState<ModalDataType[] | null>(null);
  const [modalData, setModalData] = useState<ModalDataType | null>(null);
  const [countFStocks, setCountFStocks] = useState(false);
  const allOMessages = localStorage.getItem("o-messages");
  const readOMessages = localStorage.getItem("read-o-messages");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`/deleteOrder`, {
        orderID: orderId,
        countFStocks,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status !== 200 || !res.data || !res.data.complete) {
        throw Error();
      }

      alert(res.data.complete);
    } catch (error) {
      toast.error("Ошибка удаления заказа");
    } finally {
      setLoading(false);
    }
  };

  const checkHandler = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const res = await axios.get(`/checkOccur`);

      if (res.status !== 200 || !res.data || !res.data.complete) {
        throw Error();
      }

      alert(res.data.complete);
    } catch (error) {
      toast.error("Ошибка проверки совпадений");
    } finally {
      setLoading(false);
    }
  };

  const checkOrderHandler = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/watchOrder", {
        orderId: orderId,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data) {
        throw Error();
      }

      const data = JSON.parse(res.data.complete);

      if (!data || data.Info) {
        throw Error();
      }

      toast.success(`Успешно получено`);

      setModalData(data[0]);
    } catch (error) {
      alert("No order found in DB!");
    } finally {
      setLoading(false);
    }
  };

  const getSalesInfo = async () => {
    try {
      const res = await axios.post("/getSalles", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res || !res.data || !res.data.data) {
        throw Error();
      }

      const salesArr = [];
      const shipedArr = [];

      for (let i = res.data.data.length - 1; i >= 0; i--) {
        const item = res.data.data[i];
        salesArr.push(item);
        if (item.isShipped) {
          shipedArr.push(item);
        }
      }

      setSalesInfo(salesArr);
      setIsShiped(shipedArr);
    } catch (error) {
      console.log("Error!");
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
  const getFexpInfo = async () => {
    try {
      const res = await axios.post<{ data: FexpItemType[] }>("/getFexp", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data || !res.data.data) {
        throw Error();
      }

      const { data } = res.data;

      const arr = [];

      for (let i = data.length - 1; i >= 0; i--) {
        const item = data[i];
        arr.push(item);
      }

      setFexpInfo(arr);
    } catch (error) {
      console.log("Error!");
    }
  };

  const getCtax = async () => {
    try {
      const res = await axios.get<{ data: FexpItemType[] }>("/getCtax");

      if (!res || !res.data || !res.data.data) {
        throw Error();
      }
      const { data } = res.data;

      const arr = [];

      for (let i = data.length - 1; i >= 0; i--) {
        const item = data[i];
        arr.push(item);
      }

      setCtaxInfo(arr);
    } catch (error) {
      console.log("Error!");
    }
  };

  const getAllInfo = async () => {
    await getSalesInfo();
    await getFexpInfo();
    await getCtax();
  };

  // const getMessages = async () => {
  //   try {
  //     const res = await axios.post("/massages",{
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
  //        const audio = new Audio("/new-message.mp3");
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

  //   useEffect(() => {
  //     const checkNewMessages = setInterval(() => {
  //       getMessages();
  //  }, 5000);
  //   return () => clearInterval(checkNewMessages);
  // }, []);

  useEffect(() => {
    getAllInfo();
    const interval = setInterval(async () => {
      getAllInfo();
    }, 25000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <>
      {modalData ? (
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00800070]"
            onClick={() => setModalData(null)}
          >
            <div
              className="rounded-md overflow-auto max-h-[90%] max-w-[400px] w-[400px] bg-white p-[10px] text-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p>Market: {modalData.market}</p>
              <p>Order id: {modalData.orderId}</p>
              <p>Type: {modalData.type}</p>
              <p>Date: {modalData.date}</p>
              <p>Time: {modalData.time}</p>
              <p>Day: {modalData.day}</p>
              <p>Commodites: {modalData.commodites}</p>
              <p>Shipment date: {modalData.shipmentDate}</p>
              <p>Full price: {modalData.fullPrice}</p>
              <p>Marginality price: {modalData.marginalityPrice}</p>
              <p>cP: {modalData.cP}</p>
              <p>Quant: {modalData.quant}</p>
              <p>Marginality: {modalData.marginality}</p>
              <p>sku: {modalData.sku}</p>
            </div>
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
      <AuthCheck>
        <Container>
          <div className="flex flex-col w-full save_sell_page">
            <form className="flex gap-6" onSubmit={submitHandler}>
              <div className="flex flex-col mt-5">
                <label className="mb-[10px] text-xl">Вост. факт. остатки</label>
                <ToggleComponent
                  onClick={() => setCountFStocks(!countFStocks)}
                  isOpened={countFStocks}
                  className={"mb-[8px]"}
                />
              </div>
              <div className="input__wrapper input__login">
                <div className="flex flex-col">
                  <label className="mb-[10px] text-2xl">Номер заказа:</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => {
                      onlyEnglish(e.target.value, setOrderId);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="save_sell_btn mt-[30px]"
                  disabled={loading}
                >
                  Удалить
                </button>
                <button
                  type="button"
                  className="save_sell_btn mt-[30px]"
                  disabled={loading}
                  onClick={checkHandler}
                >
                  Проверить совпадения
                </button>
                <button
                  type="button"
                  className="save_sell_btn mt-[30px]"
                  disabled={loading}
                  onClick={checkOrderHandler}
                >
                  Просмотреть заказ
                </button>
              </div>
            </form>
            {/* <div className="flex items-center gap-[20px]">
              <ToggleComponent
                onClick={() => setIsOpened(!isOpened)}
                isOpened={isOpened}
                className={"self-end mb-[8px]"}
              />
              <form
                className="input__wrapper input__login flex align center"
                onSubmit={returnHandler}
              >
                <div className="flex flex-col">
                  <label className="mb-[10px] text-2xl sku">
                    Номер товара (SKU):
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSku(value);
                    }}
                    disabled={!isOpened}
                    className={
                      !isOpened
                        ? `!border-[1px] !border-solid !border-black`
                        : ""
                    }
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isOpened || loading}
                  className={`h-[100%] save_sell_btn  mt-[30px] ${
                    !isOpened ? " opacity-50" : ""
                  }`}
                >
                  Пополнить
                </button>
              </form>
            </div>
            <form className="input__wrapper input__login" onSubmit={createShip}>
              <div className="flex flex-col">
                <label className="mb-[10px] text-2xl">SKU:</label>
                <input
                  type="text"
                  value={shipSku}
                  onChange={(e) => {
                    onlyEnglish(e.target.value, setShipSku);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-[10px] text-2xl">Цена:</label>
                <input
                  type="number"
                  value={shipPrice}
                  onChange={(e) => {
                    const value = e.target.value;

                    setShipPrice(value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-[10px] text-2xl">Количество:</label>
                <input
                  type="number"
                  value={shipAmount}
                  onChange={(e) => {
                    const value = e.target.value;

                    setShipAmount(value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-[10px] text-2xl">Номер поставки:</label>
                <input
                  type="text"
                  value={shipNumber}
                  onChange={(e) => {
                    onlyEnglish(e.target.value, setShipNumber);
                  }}
                />
              </div>
              <button
                type="submit"
                className="save_sell_btn mt-[30px]"
                disabled={loading}
              >
                Создать поставку
              </button>
            </form> */}

            <div className="bottom-[20px]  right-[20px] flex gap-3 info_parent w-[100vw] h-[70vh]">
              {isShiped && isShiped.length ? (
                <div className="w-[25%] p-[10px] h-[100%] overflow-auto flex flex-col gap-[20px] ctax_column">
                  <h2 className="font-bold text-4xl info_title">
                    Доставлены до ПВЗ:
                  </h2>
                  <div className="overflow-auto flex flex-col gap-[20px]">
                    {isShiped.map((el, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-sm p-[10px] text-2xl"
                      >
                        <p>#{index + 1}</p>
                        <p>Market: {el.market}</p>
                        <p>Order id: {el.orderId}</p>
                        <p>Type: {el.type}</p>
                        <p>Date: {el.date}</p>
                        <p>Time: {el.time}</p>
                        <p>Day: {el.day}</p>
                        <p>Commodites: {el.commodites}</p>
                        <p>Shipment date: {el.shipmentDate}</p>
                        <p>Full price: {el.fullPrice}</p>
                        <p>Marginality price: {el.marginalityPrice}</p>
                        <p>Clean profit: {el.cP}</p>
                        <p>Marginality: {el.marginality}</p>
                        <p>Quant: {el.quant}</p>
                        <p>sku: {el.sku}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {ctaxInfo && ctaxInfo.length ? (
                <div className="w-[25%] p-[10px] h-[100%] overflow-auto flex flex-col gap-[20px] ctax_column">
                  <h2 className="font-bold text-4xl info_title">
                    Таможен. налоги:
                  </h2>
                  <div className="overflow-auto flex flex-col gap-[20px]">
                    {ctaxInfo.map((el, index) => (
                      <div
                        key={el._id}
                        className="bg-white rounded-sm p-[10px] text-2xl"
                      >
                        <p>#{index + 1}</p>
                        <p>Date: {el.date}</p>
                        <p>ExpenseLbl: {el.expenseLbl}</p>
                        <p>ExpenseSum: {el.expenseSum}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {fexpInfo && fexpInfo.length ? (
                <div className="w-[25%] p-[10px] h-[100%] overflow-auto flex flex-col gap-[20px] fexp_column">
                  <h2 className="font-bold text-4xl info_title">
                    Факт. издержки:
                  </h2>
                  <div className="overflow-auto flex flex-col gap-[20px]">
                    {fexpInfo.map((el, index) => (
                      <div
                        key={el._id}
                        className="bg-white rounded-sm p-[10px] text-2xl"
                      >
                        <p>#{index + 1}</p>
                        <p>Date: {el.date}</p>
                        <p>ExpenseLbl: {el.expenseLbl}</p>
                        <p>ExpenseSum: {el.expenseSum}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {salesInfo && salesInfo.length ? (
                <div className="w-[25%] p-[10px] h-[100%] overflow-auto flex flex-col gap-[20px] sales_column">
                  <h2 className="font-bold text-4xl info_title">
                    База продаж:
                  </h2>
                  <div className="overflow-auto flex flex-col gap-[20px]">
                    {salesInfo.map((el, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-sm p-[10px] text-2xl"
                      >
                        <p>#{index + 1}</p>
                        <p>Market: {el.market}</p>
                        <p>Order id: {el.orderId}</p>
                        <p>Type: {el.type}</p>
                        <p>Date: {el.date}</p>
                        <p>Time: {el.time}</p>
                        <p>Day: {el.day}</p>
                        <p>Commodites: {el.commodites}</p>
                        <p>Shipment date: {el.shipmentDate}</p>
                        <p>Full price: {el.fullPrice}</p>
                        <p>Marginality price: {el.marginalityPrice}</p>
                        <p>Clean profit: {el.cP}</p>
                        <p>Marginality: {el.marginality}</p>
                        <p>Quant: {el.quant}</p>
                        <p>sku: {el.sku}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Container>
      </AuthCheck>
    </>
  );
};

export default ButtonCreatePage;
