// import { ipcRenderer } from "electron";
import Button from "@mui/material/Button";
import React from "react";

interface Props {
    path: string;
    onChange: (path: string) => void
}

export default function PathInput({
    path,
    onChange
}: Props) {

    return <Button onClick={async () => {
        const filePath = await (window as any).electronAPI.openFile()
        console.log(filePath);
    }}>
        Select a path
    </Button>


}