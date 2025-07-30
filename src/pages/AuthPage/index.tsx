import { useState } from "react";
import { Container } from "@/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import detectEthereumProvider from '@metamask/detect-provider';
// import CloseEye from "../../images/close-eye.svg";
// import Eye from "../../images/eye.svg";
import Web3 from "web3";

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string }) => Promise<string[]>;
  on: (event: string, callback: (accounts: string[]) => void) => void;
  removeListener: (event: string, callback: (accounts: string[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
const AuthPage = () => {
  const navigate = useNavigate();

  const userLogin = useAuthStore((state) => state.login);
  // const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const value = login.toLowerCase();
    const detectedProvider = await detectEthereumProvider<EthereumProvider>();

  if (!detectedProvider) {
        alert('Metamask is not installed!');
        return;
      }

      if (!detectedProvider.isMetaMask) {
        alert('Metamask connected!')

      }

      // Создание экземпляра Web3
      const web3 = new Web3(detectedProvider);
      const walletAddress = await web3.eth.getCoinbase();

      if (value == '') {

      alert('Enter valid ETH address!')

      return

      }

      if (value.includes('0x') == false) {

      alert('Enter valid ETH address!')

      return

      }

      if (value.length != 42) {

      alert('Enter valid ETH address!')

      return

      }

      if (walletAddress.toLowerCase() === value) {

        try {

          const response = await fetch(
            `https://hjklhkjlhkljhpjhkhddhgfdghfdgfcycffgh.ru:2999/blockchainAuth?walletAddress=${walletAddress}`
          );

          const data = await response.json();

          if (data.autorization === true) {
            try {
              setLoading(true);

              const res = await userLogin(login);

              if (!res) {
                throw Error();
              }
              localStorage.setItem("pultik-user-login", login.toLowerCase());
              localStorage.setItem("pultik-token-key", res);

              navigate("/");
            } catch (error) {
              toast.error("Не удалось войти");
            } finally {
              setLoading(false);
            }
          }
        } catch (error) {
          console.error("API error:", error);
        }
      } else {

      alert('Addresses dont match!')

      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const submitHandler = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (loading) {
  //     return;
  //   }

  //   if (!login.trim()) {
  //     return toast.warning("Введите логин");
  //   }

  //   if (!password.trim()) {
  //     return toast.warning("Введите пароль");
  //   }

  //   try {
  //     setLoading(true);

  //     const res = await userLogin(login, password);

  //     if (!res) {
  //       throw Error();
  //     }
  //     localStorage.setItem("pultik-user-login", login);
  //     localStorage.setItem("pultik-token-key", res);

  //     navigate("/");
  //   } catch (error) {
  //     toast.error("Не удалось войти");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container>
      <div className="w-full flex flex-col">
        <form
          onSubmit={handleAuth}
          className="px-[10px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex items-center justify-center flex-col self-center"
        >
          <div className="max-w-[500px] w-full md:w-[500px]">
            <h1 className="font-bold text-center text-4xl font-sans">
              pultik.me
            </h1>
            <p className="text-center text-2xl font-sans mt-[10px]">
              Система управления маркетплейсами
            </p>
            <div className="flex flex-col gap-[10px] my-[20px]">
              <input
                type="text"
                placeholder="ETH адресс"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mt- py-[16px] px-[20px] rounded-3xl text-xl outline-none"
              />
              {/* <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-0 py-[16px] px-[20px] rounded-3xl text-xl outline-none password_input"
                />

                {!showPassword && (
                  <div
                    className="close_eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={CloseEye} alt="" />
                  </div>
                )}
                {showPassword && (
                  <div
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={Eye} alt="" />
                  </div>
                )}
              </div> */}
            </div>
            <button
              type="submit"
              className="btn !rounded-3xl !text-xl !py-[20px] !h-auto"
              disabled={loading}
            >
              Войти
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-auto gap-[20px]">
          <div className="w-[70px]">
            <img src="/yandex-market-logo.png" alt="yandex-market-logo" />
          </div>
          <div className="w-[70px]">
            <img src="/ozon-logo.png" alt="ozon-logo" />
          </div>
          <div className="w-[70px]">
            <img src="/wb-logo.png" alt="wb-logo" />
          </div>
          <div className="w-[70px]">
            <img
              className="rounded-md"
              src="/avito-logo.jpg"
              alt="avito-logo"
            />
          </div>
          <div className="w-[70px]">
            <img src="/megamarket-logo.png" alt="megamarket-logo" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthPage;
