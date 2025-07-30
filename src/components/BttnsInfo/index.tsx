interface ButtonsInfo {
  total: number;
  grey: number;
  red: number;
  yellow: number;
  blue: number;
  green: number;
  telNumber: number;
  stroyNumber: number;
  telAvailable: number;
  stroyAvailable: number;
}

const BttnsInfo: React.FC<{ buttonsInfo: ButtonsInfo }> = ({ buttonsInfo }) => {
  return (
    <>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] text-2xl border-black border-[1px] border-solid rounded-md">
        {buttonsInfo.total}
      </p>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] bg-slate-400 rounded-md text-2xl text-white">
        {buttonsInfo.grey}
      </p>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[red] text-white">
        {buttonsInfo.red}
      </p>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[#cdcd44] text-white">
        {buttonsInfo.yellow}
      </p>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[blue] text-white">
        {buttonsInfo.blue}
      </p>
      <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[green] text-white">
        {buttonsInfo.green}
      </p>
      <p className="white_p w-[70px] h-[70px] flex justify-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
        tel: {buttonsInfo.telNumber}
      </p>
      <p className="white_p w-[70px] h-[70px] flex justify-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
        stroy: {buttonsInfo.stroyNumber}
      </p>
      <p className="white_p w-[70px] h-[70px] flex justify-center text-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
        sTel: {buttonsInfo.telAvailable}
      </p>
      <p className="white_p w-[70px] h-[70px] flex justify-center items-center text-center mb-[20px] rounded-md text-xl bg-slate-100">
        sStroy: {buttonsInfo.stroyAvailable}
      </p>
    </>
  );
};

export default BttnsInfo;
