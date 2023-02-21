import BackupList from '../components/BackupList';
import { BackupMetadata } from '../types/BackupMetadata';



function Home() {
    const placeholders: BackupMetadata[] = [
        {
            workspace: {
                name: "Putain ça bosse ou quoi",
                avatarUrl: "http://placekitten.com/200/200",
            },
            savePath: "D:/sqdfhjqklsd/fsdf",
            lastBackupTimestamp: Date.now() - 1000
        }
    ]

    return <div className='p-3'>
        <BackupList backupsMetadata={placeholders} />
    </div>
}

export default Home;
