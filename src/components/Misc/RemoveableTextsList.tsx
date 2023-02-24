import { Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
    items: string[]
    onChange: (items: string[]) => void
}

export default function RemoveableTextsList({ items, onChange }: IProps) {
    return <div className="d-flex flex-column align-items-center">
        {
            items.map((i) => <RemoveableText key={i} text={i} onRemove={() => remove(i)} />)
        }
    </div>

    function remove(item: string) {
        const newItems = items.filter(i => i !== item);

        onChange(newItems);
    }
}

function RemoveableText({ text, onRemove }: { text: string, onRemove: () => void }) {
    return <div className="d-flex align-items-center">
        <span className="text-muted">
            {text}
        </span>

        <Button startIcon={<RemoveIcon />} onClick={onRemove}>

        </Button>
    </div>
}