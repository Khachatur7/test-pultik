import { useEffect, useState } from "react";
import { ToggleComponent } from "..";
import axios from "axios";

interface IBots {
  _id: string;
  mon: string;
  online: boolean;
}

interface Props {
  bot?: IBots;
  text: string;
  isLast?: boolean;
}

const InfoBlockParser: React.FC<Props> = ({ bot, text, isLast }) => {
  const [message, setMessage] = useState(false);

  const sendErrorText = async () => {
    axios(
      `https://api.telegram.org/bot6596473438:AAEVcM6Al4l8zxJ8MBeloRmeOfZn0fXvfTY/sendMessage?chat_id=-4144681037&text=${text} stocks bot is DOWN!`
    );
  };

  const setLocalAboutMessage = () => {
    localStorage.setItem(`${text}`, JSON.stringify(!message));
    setMessage(!message);
  };

  useEffect(() => {
    if (localStorage.getItem(`${text}`) == "false") {
      setMessage(false);
    } else if (localStorage.getItem(`${text}`) == "true") {
      setMessage(true);
    }
  }, []);

  useEffect(() => {
    if (message && !bot?.online) {
      sendErrorText();
    }
  }, [message]);
  return (
    <div className="flex gap-[8px] items-center text-xl info_block">
      <ToggleComponent onClick={setLocalAboutMessage} isOpened={message} />
      {`${text}`}
      {
        <div
          className="transition-all min-w-[20px] max-w-[20px] w-[20px] min-h-[20px] max-h-[20px] h-[20px] rounded-full border-solid border-1 border-black bg-[red]"
          style={{
            backgroundColor: bot?.online ? "green" : "",
          }}
        />
      }
      {!isLast && window.innerWidth>410 ? <div className="w-[2px] h-[25px] bg-black"></div> : <></>}
    </div>
  );
};

export default InfoBlockParser;
