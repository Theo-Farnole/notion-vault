import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { routeNames } from "../../routes";


export default function UnderConstructionPage() {
    return <>
        This page is under construction.

        <Link to={routeNames.home}>
            <Button>
                Go home
            </Button>
        </Link>
    </>
}