import { RouteProps, Route, Routes, BrowserRouter } from "react-router-dom";
import {
  AuthPage,
  ButtonCreatePage,
  ChartsPage,
  ChartsSecondPage,
  MainPage,
  SaveSell,
} from "./pages";
import { ToastContainer } from "react-toastify";
import WatchPage from "./pages/WatchPage";
import { useEffect } from "react";
import { useBotsStore } from "./store";
import { BotItem } from "./store/useBotsStore";
import ProblemsPage from "./pages/Problems";
import NewPage from "./pages/NewPage";
import DPage from "./pages/DecrPage";
import MessagesPage from "./pages/MessagesPage";
import MessagesPageTwo from "./pages/MessagesPageTwo";
import OMessagePage from "./pages/OMessagePage";
import EndingGoods from "./pages/EndingGoods";

const routes: RouteProps[] = [
  {
    path: "*",
    element: <MainPage />,
  },

  {
    path: "/:id",
    element: <MainPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/create-button",
    element: <ButtonCreatePage />,
  },
  {
    path: "/save-sell",
    element: <SaveSell />,
  },
  {
    path: "/charts",
    element: <ChartsPage />,
  },
  {
    path: "/charts2",
    element: <ChartsSecondPage />,
  },
  {
    path: "/watch",
    element: <WatchPage />,
  },
  {
    path: "/problems",
    element: <ProblemsPage />,
  },
  {
    path: "/new",
    element: <NewPage />,
  },
  {
    path: "/d-page",
    element: <DPage />,
  },
  {
    path: "/t-page",
    element: <MessagesPage />,
  },
  {
    path: "/t-page-two",
    element: <MessagesPageTwo />,
  },
  {
    path: "/O",
    element: <OMessagePage />,
  },
  {
    path: "/ending-good",
    element: <EndingGoods />,
  },
];

interface BotInfoProps {
  bot: BotItem;
}

const BotInfo: React.FC<BotInfoProps> = ({ bot }) => {
  const fetchBotInfo = useBotsStore((state) => state.fetchBotInfo);

  useEffect(() => {
    let loop = true;
    let timeout: null | number | any = null;

    (async () => {
      while (loop) {
        fetchBotInfo(bot);
        await new Promise((res) => {
          timeout = setTimeout(res, 30000);
        });
      }
    })();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      loop = false;
    };
  }, [bot.isOpened]);

  return <></>;
};

function App() {
  const bots = useBotsStore((state) => state.bots);

  return (
    <>
      {bots && bots.length ? (
        bots.map((bot) => <BotInfo key={bot.id} bot={bot} />)
      ) : (
        <></>
      )}
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
