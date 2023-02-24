import { Button, Container, Divider, FormControl, TextField } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";
import AddIcon from '@mui/icons-material/Add';
import useGetSavedApiKeys from "../hooks/storage/useGetSavedApiSecrets";
import RemoveableTextsList from "../components/Misc/RemoveableTextsList";
import { loadingStr } from "../types/Loading";
import React from "react";
import { electronApi } from "../const";

export default function SettingsPage() {
    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>

        <PageTextHeader
            className="mt-5"
            mainTitle='Settings'
            showBackBtn
        />

        <Divider />


        <ApiKeysForm />

    </Container>;
}

function ApiKeysForm() {

    const apiKeys = useGetSavedApiKeys();

    const [draftApiKey, setDraftApikey] = React.useState("");

    return <FormControl fullWidth className="d-flex flex-column" sx={{ gap: 3 }}>

        <div className="d-flex" >
            <TextField
                className="flex-grow-1"
                label={"Notion API key"}
                value={draftApiKey}
                onChange={(e) => setDraftApikey(e.target.value)}
            />

            <Button startIcon={<AddIcon />} onClick={saveDraftSecret} disabled={canSaveDraftSecret() === false}>
                Add
            </Button>
        </div>

        {
            apiKeys !== loadingStr &&
            <RemoveableTextsList
                items={apiKeys}
                onChange={(newApiKeys) => { electronApi.storage.apiKeys.set(newApiKeys) }}
            />
        }

    </FormControl >

    function canSaveDraftSecret() {
        if (apiKeys === loadingStr) return false;

        return draftApiKey.trim() !== "" && apiKeys.find(api => api === draftApiKey) === undefined;
    }

    async function saveDraftSecret() {

        if (apiKeys === loadingStr) return;

        const newApiKeys = [...apiKeys, draftApiKey];

        setDraftApikey("");

        electronApi.storage.apiKeys.set(newApiKeys)
    }
}