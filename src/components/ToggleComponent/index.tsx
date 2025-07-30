import React from "react";

interface ToggleComponentProps {
  onClick: () => void;
  isOpened: boolean;
  className?: string;
  variant?: "vertical";
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({
  onClick,
  isOpened,
  className,
  variant,
}) => {
  if (variant === "vertical") {
    return (
      <label
        onClick={onClick}
        className={`border-[1px] cursor-pointer border-solid border-black relative min-w-[25px] w-[25px] h-[40px] rounded-full bg-white${
          className ? ` ${className}` : ""
        }`}
      >
        <div
          className="absolute left-[50%] -translate-x-1/2 bottom-[1px] transition-all min-w-[20px] max-w-[20px] w-[20px] min-h-[20px] max-h-[20px] h-[20px] rounded-full bg-black"
          style={{
            bottom: isOpened ? "16px" : "",
            backgroundColor: isOpened ? "green" : "red",
          }}
        />
      </label>
    );
  }

  return (
    <label
      onClick={onClick}
      className={`border-[1px] cursor-pointer border-solid border-black relative min-w-[40px] w-[40px] h-[25px] rounded-full bg-white${
        className ? ` ${className}` : ""
      }`}
    >
      <div
        className="absolute top-[50%] translate-y-[-50%] left-[3px] transition-all min-w-[20px] max-w-[20px] w-[20px] min-h-[20px] max-h-[20px] h-[20px] rounded-full bg-black"
        style={{
          left: isOpened ? "16px" : "",
          backgroundColor: isOpened ? "green" : "red",
        }}
      />
    </label>
  );
};

export default ToggleComponent;
