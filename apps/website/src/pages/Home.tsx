import Header from "../components/Layout/Header";
import Content from "../components/Layout/Content";
import style from "./Home.module.scss";

export default function Home() {
    return <div>
        <Header />

        <Content className={style.content}>

            <h1 className={style.heading}>
                Secure your workspaces today!
            </h1>

            <p className={style.detailed}>
                An effortless way to safeguard your content, ensuring that you can focus on creating without worrying about the safety of your data.
            </p>
        </Content>
    </div>
}