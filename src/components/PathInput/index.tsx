import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
    path: string;
    onChange: (path: string) => void
}

export default function PathInput({
    path,
    onChange
}: Props) {

    return <div className="d-flex">
        <TextField value={path} label="Path" className="flex-grow-1" onChange={(e) => onChange(e.target.value)} />
        <Button onClick={onClick}>
            Select a path
        </Button>
    </div>


    async function onClick() {
        const filePath = await (window as any).electronAPI.openFile()

        onChange(filePath);
    }
}