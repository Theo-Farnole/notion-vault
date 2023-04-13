import style from "./Button.module.scss";

interface Props {
    children?: JSX.Element | string;
    type?: "primary";
}

export default function Button({
    children,
    type = "primary"
}: Props) {

    const className = [
        style.button,
        style[type]
    ].join(" ");

    return <button className={className}>
        {children}
    </button>;
}