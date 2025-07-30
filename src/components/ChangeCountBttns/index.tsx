const ChangeCountBttns: React.FC<{
  state: string;
  setState: (value: React.SetStateAction<string>) => void;
  division?: number;
}> = ({ state, setState,division }) => {

const divNum = division?division:0.1

  return (
    <div className="change_count">
      <div
        className="change_count_bttn"
        onClick={() =>
          +state > 0 ? setState((+state - divNum).toFixed(divNum==1?0:1)?.toString()) : 0
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m6 10l6 6l6-6"
          ></path>
        </svg>
      </div>
      <div
        className="change_count_bttn"
        onClick={() => setState((+state + divNum).toFixed(divNum==1?0:1)?.toString())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m4 15l8-8l8 8"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ChangeCountBttns;
