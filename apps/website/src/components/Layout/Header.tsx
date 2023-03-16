import style from "./Header.module.scss";

export default function Header() {
    return <header className={style.root}>
        Notion Vault

        <button>
            Download
        </button>
    </header>
}