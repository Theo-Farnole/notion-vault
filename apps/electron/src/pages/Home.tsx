import { Button, Container, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import NewBackupFAB from '../components/Actions/NewBackupFAB';
import BackupList from '../components/Misc/BackupList';
import PageTextHeader from '../components/Text/PageTextHeader';
import { useGetSavedBackups } from '../hooks/storage/useGetSavedBackup';
import { routeNames } from '../routes';
import { loadingStr } from '../types/Loading';

function Home() {

    const backups = useGetSavedBackups();

    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>

        <PageTextHeader
            className="mt-5"
            mainTitle='Hello !'
            subTitle='Checkout your latest backup and their progress.'
        />

        <Divider />

        {backups !== loadingStr &&
            backups.length > 0 ?
            <BackupList backupsMetadata={backups} />
            :
            <div className="d-flex justify-content-center">
                <Link to={routeNames.newBackup}>
                    <Button variant="contained" sx={{ textDecoration: "none" }}>
                        Create a backup
                    </Button>
                </Link>
            </div>
        }

        <NewBackupFAB />
    </Container>;
}

export default Home;
