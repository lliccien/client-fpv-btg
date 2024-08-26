import React from 'react';
import FundationForm from '../components/FundationForm'
import TransactionList from '../components/TransactionList';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '0 auto',
        maxWidth: '800px',
        width: '100%',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Administrador de Fondos
      </Typography>
      <FundationForm />
      <TransactionList />
    </Box>
  );
};

export default Home;
