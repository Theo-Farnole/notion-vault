import style from "./Button.module.scss";

interface Props {
    children?: JSX.Element | string;
    type?: "primary";
    onClick?: () => void;
}

export default function Button({
    children,
    type = "primary",
    onClick,
}: Props) {

    const className = [
        style.button,
        style[type]
    ].join(" ");

    return <button className={className} onClick={onClick}>
        {children}
    </button>;
}