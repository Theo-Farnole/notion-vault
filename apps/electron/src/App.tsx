import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { routeNames } from './routes';
import BackupDetailsPage from './pages/BackupDetailsPage';
import NotFound from './pages/errors/NotFound';
import NewBackupPage from './pages/NewBackupPage';
import Home from './pages/Home';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SuccessfulAuthorizationPage } from "./pages/SuccessfulAuthorizationPage";
import EditBackupPage from "./pages/EditBackupPage";

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
                <Route path={routeNames.backupDetails(":id")} element={<BackupDetailsPage />} />
                <Route path={routeNames.newBackup} element={<NewBackupPage />} />
                <Route path={routeNames.authorizationSuccessful} element={<SuccessfulAuthorizationPage />} />
                <Route path={routeNames.editBackup(":id")} element={<EditBackupPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </HashRouter >
    </ThemeProvider>;
}