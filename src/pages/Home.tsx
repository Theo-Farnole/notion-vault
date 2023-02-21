import { AppBar, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
import NewBackupSpeedDial from '../components/Actions/NewBackupFAB';
import BackupList from '../components/BackupList';
import { BackupMetadata } from '../types/BackupMetadata';

function Home() {
    const placeholders: BackupMetadata[] = [
        {
            workspace: {
                name: "Putain ça bosse ou quoi",
                avatarUrl: "https://generasonrapfr.com/wp-content/uploads/2021/08/9A537A4E-E9F3-4417-8297-5150FBAA297D.jpeg",
            },
            savePath: "D:/sqdfhjqklsd/fsdf",
            lastBackupTimestamp: Date.now() - 1000
        },
        {
            workspace: {
                name: "Le roi t'entends ?",
                avatarUrl: "http://placekitten.com/200/200",
            },
            savePath: "C:/something",
            lastBackupTimestamp: Date.now() - 60 * 60 * 1000
        }
    ]

    const theme = createTheme();

    return <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position='sticky'>
            <Toolbar>
                <Typography component="h1" variant="h6" noWrap>
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="sm">

            <BackupList backupsMetadata={placeholders} />

        </Container>
    </ThemeProvider>
}

export default Home;
