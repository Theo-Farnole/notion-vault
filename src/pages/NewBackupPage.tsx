import { Container, Divider } from '@mui/material';
import React from 'react';
import PageTextHeader from '../components/Text/PageTextHeader';
import { NewBackupForm } from '../components/Inputs/NewBackupForm';

export default function NewBackupPage() {
    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle='New backup'
            subTitle='Configure your backup'
            showBackBtn
        />

        <Divider />

        <NewBackupForm />
    </Container>
}

