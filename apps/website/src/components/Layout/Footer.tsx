import { links } from "../../const";
import style from "./Footer.module.scss";

export default function Footer() {
    return <footer className={style.root}>
        Notion Vault<br />

        <a href={links.license} className={style.link}>

            License
        </a>
    </footer>
}