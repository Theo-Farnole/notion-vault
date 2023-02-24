import { Container, Divider } from '@mui/material';
import GoToSettingsFAB from '../components/Actions/GoToSettingsFAB';
import NewBackupFAB from '../components/Actions/NewBackupFAB';
import BackupList from '../components/Misc/BackupList';
import PageTextHeader from '../components/Text/PageTextHeader';
import { useGetSavedBackups } from '../hooks/storage/useGetSavedBackup';
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
            <BackupList backupsMetadata={backups} />
        }

        <NewBackupFAB />
        <GoToSettingsFAB />
    </Container>;
}

export default Home;
