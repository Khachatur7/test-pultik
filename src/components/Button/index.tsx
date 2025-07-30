import React from 'react';

import s from "./Button.module.scss";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    text?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    text,
    onClick,
}) => {
  return (
    <button className={`${s.button} btn`} onClick={onClick}>
        {text ||children || "Button"}
    </button>
  )
}

export default Button