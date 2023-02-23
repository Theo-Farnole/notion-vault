import { Button, Container, Divider, FormControl, TextField } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";
import AddIcon from '@mui/icons-material/Add';

import useGetSavedApiSecrets from "../hooks/useGetSavedApiSecrets";
import RemoveableTextsList from "../components/Misc/RemoveableTextsList";
import { loadingStr } from "../types/Loading";

export default function SettingsPage() {
    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>

        <PageTextHeader
            className="mt-5"
            mainTitle='Settings'
            showBackBtn
        />

        <Divider />


        <SavedSecretsForm />

    </Container>;
}

function SavedSecretsForm() {

    const secrets = useGetSavedApiSecrets();

    return <FormControl fullWidth className="d-flex flex-column" sx={{ gap: 3 }}>

        <div className="d-flex" >
            <TextField
                className="flex-grow-1"
                value={"Notion API key"}
            />

            <Button startIcon={<AddIcon />}>
                Add
            </Button>
        </div>

        {secrets !== loadingStr &&
            <RemoveableTextsList
                items={secrets}
                onChange={() => { }}
            />
        }

    </FormControl>
}

