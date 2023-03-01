import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { routeNames } from "../../routes";


export default function NotFound() {
    return <>
        Page not found

        <Link to={routeNames.home}>
            <Button>
                Go home
            </Button>
        </Link>
    </>
}