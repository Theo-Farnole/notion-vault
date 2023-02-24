import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { electronApi } from "../../const";

interface Props {
    path: string;
    onChange: (path: string) => void
    error?: boolean;
    helperText?: string;
}

export default function PathInput({
    path,
    onChange,
    error,
    helperText
}: Props) {

    return <div className="d-flex">
        <TextField
            error={error}
            helperText={helperText}
            value={path}
            label="Path"
            className="flex-grow-1"
            onChange={(e) => onChange(e.target.value)}
        />
        <Button onClick={onClick}>
            Select a path
        </Button>
    </div>


    async function onClick() {
        const filePath = await electronApi.openFile()

        onChange(filePath);
    }
}