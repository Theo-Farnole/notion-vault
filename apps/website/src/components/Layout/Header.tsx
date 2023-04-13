import Content from "./Content";
import style from "./Header.module.scss";

export default function Header() {
    return <header className={style.root}>

        <Content className={style.content}>
            <span className={style.productName}>
                Notion Vault
            </span>


            <a className={style.downloadBtn} href="#download">
                Download
            </a>
        </Content>
    </header >
}