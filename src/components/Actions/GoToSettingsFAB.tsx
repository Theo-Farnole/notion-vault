import { Fab } from "@mui/material";
import Icon from '@mui/icons-material/Settings';
import { routeNames } from "../../routes";
import { Link } from "react-router-dom";

export default function GoToSettingsFAB() {
    return <Link to={routeNames.settings}>
        <Fab color="primary" aria-label="add" sx={{ position: "absolute", bottom: "50px", left: "50px" }}>
            <Icon />
        </Fab>
    </Link>;
}