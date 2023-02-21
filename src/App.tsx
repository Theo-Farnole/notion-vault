import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { routeNames } from './routes';
import BackupPage from './pages/BackupPage';
import NotFound from './pages/errors/NotFound';
import NewBackupPage from './pages/NewBackupPage';
import Home from './pages/Home';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export default function App() {

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

        <HashRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={routeNames.backup(":id")} element={<BackupPage />} />
                <Route path={routeNames.newBackup} element={<NewBackupPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </HashRouter >
    </ThemeProvider>;
}