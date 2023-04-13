import { links } from "../../const";
import Content from "./Content";
import style from "./Footer.module.scss";

export default function Footer() {
    return <footer className={style.root}>
        <Content className={style.content}>

            <>
                Notion Vault
            </>

            <a href={links.license} className={style.link}>
                License
            </a>
        </Content>
    </footer>
}