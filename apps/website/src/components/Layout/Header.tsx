import Button from "../Interactable/Button";
import Content from "./Content";
import style from "./Header.module.scss";

export default function Header() {
    return <header className={style.root}>

        <Content className={style.content}>
            <span className={style.productName}>
                Notion Vault
            </span>


            <Button>
                Download
            </Button>
        </Content>
    </header >
}