import { IconButton, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';

interface Props {
    mainTitle: string;
    subTitle?: string;
    className?: string;
    showBackBtn?: boolean;
    rightImgSrc?: string;
}

export default function PageTextHeader({
    mainTitle,
    subTitle,
    className = "",
    showBackBtn = false,
    rightImgSrc
}: Props) {
    const navigate = useNavigate();

    return <div className={className + " d-flex align-items-center"}>
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

            {subTitle &&
                <Typography color="text.secondary" noWrap>
                    {subTitle}
                </Typography>
            }
        </div>

        {rightImgSrc &&
            <img
                src={rightImgSrc}
                alt="selected workspace thumbnail"
                style={{ height: "100px", "aspectRatio": "1/1", objectFit: "cover", marginLeft: "auto" }} />
        }
    </div>
}