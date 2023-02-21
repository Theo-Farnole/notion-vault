import React from "react";
import { Loading } from "../types/Loading";
import Workspace from "../types/Workspace";

export default function useGetWorkspaces() {

    const [workspaces, setWorkspaces] = React.useState<Loading | Workspace[]>("loading");

    React.useEffect(() => {
        setTimeout(() => {
            setWorkspaces([
                {
                    name: "Le roi t'entends ?",
                    avatarUrl: "https://i.discogs.com/tTmtyYgTh0jQfzvkKodLWuwn1G5faDH6AJ2Zr3uzIbA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM3ODE3/OS0xNTQwMzI2MDg1/LTg4NDYuanBlZw.jpeg",
                },
                {
                    name: "Putain ça bosse ou quoi",
                    avatarUrl: "https://generasonrapfr.com/wp-content/uploads/2021/08/9A537A4E-E9F3-4417-8297-5150FBAA297D.jpeg",
                },
                {
                    name: "Alkpote Workspace",
                    avatarUrl: "https://generations.fr/media/news/alkpote-devient-la-voix-de-waze_63b67e1da6913.webp"
                }
            ])
        }, 600)
    }, []);


    return workspaces;
}