import { Container, createTheme, CssBaseline, Divider, ThemeProvider, Typography } from '@mui/material';
import BackupList from '../components/BackupList';
import { BackupMetadata } from '../types/BackupMetadata';

function Home() {
    const placeholders: BackupMetadata[] = [
        {
            workspace: {
                name: "Le roi t'entends ?",
                avatarUrl: "https://i.discogs.com/tTmtyYgTh0jQfzvkKodLWuwn1G5faDH6AJ2Zr3uzIbA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM3ODE3/OS0xNTQwMzI2MDg1/LTg4NDYuanBlZw.jpeg",
            },
            savePath: "C:/something",
            lastBackupTimestamp: Date.now() - 60 * 60 * 1000
        },
        {
            workspace: {
                name: "Putain ça bosse ou quoi",
                avatarUrl: "https://generasonrapfr.com/wp-content/uploads/2021/08/9A537A4E-E9F3-4417-8297-5150FBAA297D.jpeg",
            },
            savePath: "D:/sqdfhjqklsd/fsdf",
            lastBackupTimestamp: Date.now() - 1000
        }
    ]

    const theme = createTheme({
        palette: {
            background: {
                default: "#f3f3f3"
            },

        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 2
                    }
                }
            }
        }
    });

    return <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container component="main">

            <Container className="d-flex flex-column" sx={{ gap: 3 }}>

                <div className="mt-5">
                    <Typography component="h1" variant="h6" noWrap>
                        Hello !
                    </Typography>

                    <Typography color="text.secondary" noWrap>
                        Checkout your latest backup and their progress.
                    </Typography>
                </div>

                <Divider />

                <BackupList backupsMetadata={placeholders} />
            </Container>

        </Container>
    </ThemeProvider>
}

export default Home;