import { Container, Divider } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";

export default function SettingsPage() {
    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>

        <PageTextHeader
            className="mt-5"
            mainTitle='Settings'
            showBackBtn
        />

        <Divider />


    </Container>;
}