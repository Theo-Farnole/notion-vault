import { Container, Divider } from '@mui/material';
import React from 'react';
import PageTextHeader from '../components/Text/PageTextHeader';
import { NewBackupForm } from '../components/Inputs/NewBackupForm';
import { BackupMetadata } from '../types/BackupMetadata';
import { useNavigate } from 'react-router';
import { routeNames } from '../routes';

export default function NewBackupPage() {

    const navigate = useNavigate();

    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle='New backup'
            subTitle='Configure your backup'
            showBackBtn
        />

        <Divider />

        <NewBackupForm onCreate={onCreateBackup} />
    </Container>

    async function onCreateBackup(backup: BackupMetadata) {
        await (window as any).electronAPI.addBackup(backup)

        navigate(routeNames.home);
    }
}

