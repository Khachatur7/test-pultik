import { transliterationMap } from "@/common";
import searchLogo from "@/images/search_1.svg";
import { ButtonItemType } from "@/types/common";

const BttnsSearcher: React.FC<{
  bttnSearcher: string;
  setBttnSearcher: React.Dispatch<React.SetStateAction<string>>;
  notSearchYet: boolean;
  bttnsIndex: ButtonItemType[];
  setOpenBttnModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  bttnSearcher,
  setBttnSearcher,
  notSearchYet,
  bttnsIndex,
  setOpenBttnModal,
}) => {
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

  return (
    <>
      <div className="input_search_bttns">
        <input
          type="text"
          className="searcher_input"
          placeholder="Search"
          value={bttnSearcher}
          onChange={(e) => onlyEnglish(e.target.value, setBttnSearcher)}
        />
        {bttnSearcher.length > 0 && (
          <div className="reset_text" onClick={() => setBttnSearcher("")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M20 20L4 4m16 0L4 20"
              />
            </svg>
          </div>
        )}
        <span className="bttns_search_res">
          {!notSearchYet && bttnsIndex.length > 0 && bttnsIndex.length}
          {!notSearchYet && bttnsIndex.length == 0 && "Not found"}
        </span>
      </div>
      <div className="search_logo" onClick={() => setOpenBttnModal(true)}>
        <img src={searchLogo} alt="search_logo" />
      </div>
    </>
  );
};

export default BttnsSearcher;
