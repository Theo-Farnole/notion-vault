import { Typography } from '@mui/material';

interface Props {
    mainTitle: string;
    subTitle: string;
    className?: string;
}

export default function PageTextHeader({
    mainTitle,
    subTitle,
    className = ""
}: Props) {
    return <div className={className}>
        <Typography component="h1" variant="h6" noWrap>
            {mainTitle}
        </Typography>

        <Typography color="text.secondary" noWrap>
            {subTitle}
        </Typography>
    </div>
}