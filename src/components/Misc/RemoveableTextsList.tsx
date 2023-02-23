import { Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
    items: string[]
    onChange: (items: string[]) => void
}

export default function RemoveableTextsList({ items, onChange }: IProps) {
    return <>
        {
            items.map((i) => <RemoveableText text={i} onRemove={() => remove(i)} />)
        }
    </>

    function remove(item: string) {
        const newItems = items.filter(i => i !== item);

        onChange(newItems);
    }
}

function RemoveableText({ text, onRemove }: { text: string, onRemove: () => void }) {
    return <div className="d-flex">
        <p>
            {text}
        </p>

        <Button startIcon={<RemoveIcon />} onClick={onRemove}>

        </Button>
    </div>
}