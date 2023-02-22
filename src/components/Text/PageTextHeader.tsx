import { IconButton, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';

interface Props {
    mainTitle: string;
    subTitle: string;
    className?: string;
    showBackBtn?: boolean;
}

export default function PageTextHeader({
    mainTitle,
    subTitle,
    className = "",
    showBackBtn = false
}: Props) {
    const navigate = useNavigate();

    return <div className={className + " d-flex"}>
        {showBackBtn &&
            <div>
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                    <BackIcon />
                </IconButton>
            </div>
        }
        <div>
            <Typography component="h1" variant="h6" noWrap>
                {mainTitle}
            </Typography>

            <Typography color="text.secondary" noWrap>
                {subTitle}
            </Typography>
        </div>
    </div>
}