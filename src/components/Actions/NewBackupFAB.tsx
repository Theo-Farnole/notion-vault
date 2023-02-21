import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { routeNames } from "../../routes";
import { Link } from "react-router-dom";

export default function NewBackupFAB() {
    return <Link to={routeNames.newBackup}>
        <Fab color="primary" aria-label="add" sx={{ position: "absolute", bottom: "50px", right: "50px" }}>
            <AddIcon />
        </Fab>
    </Link>;
}