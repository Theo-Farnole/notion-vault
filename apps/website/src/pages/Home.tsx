import Header from "../components/Layout/Header";
import Content from "../components/Layout/Content";
import style from "./Home.module.scss";
import HomepageImg from "../assets/app_home.png"
import Footer from "../components/Layout/Footer";
import Button from "../components/Interactable/Button";

export default function Home() {
    return <div>
        <Header />

        <Content className={style.content}>

            <section>


                <h1 className={style.heading}>
                    Secure your workspaces today!
                </h1>

                <p className={style.detailed}>
                    An effortless way to safeguard your content, ensuring that you can focus on creating without worrying about the safety of your data.
                </p>

                <img className={style.softwareScreenshot} src={HomepageImg} alt="" />
            </section>

            <section>

                <h2 className={style.heading}>
                    It's free and open source
                </h2>

                <Button onClick={downloadLatest}>
                    Download
                </Button>
            </section>
        </Content>

        <Footer />
    </div>

    function downloadLatest() {
        window.location.href = "releases/Notion.Vault.Setup.1.0.1.exe";
    }
}