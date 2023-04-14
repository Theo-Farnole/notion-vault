import Content from "./Content";
import style from "./Header.module.scss";
import Logo from "../../assets/logo192.png";

export default function Header() {
    return <header className={style.root}>

        <Content className={style.content}>
            <div className={style.product}>
                <img src={Logo} height={30} alt="software logo" />
                <span className={style.productName}>
                    Notion Vault
                </span>
            </div>


            <a className={style.downloadBtn} href="#download">
                Download
            </a>
        </Content>
    </header >
}