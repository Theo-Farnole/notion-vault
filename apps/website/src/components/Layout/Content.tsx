import style from "./Content.module.scss";

interface Props {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

export default function Content({ children, className = "" }: Props) {
    return <div className={style.content + " " + className}>
        {children}
    </div>
}