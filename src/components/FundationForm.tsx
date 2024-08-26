import React, { useState } from 'react';
import { useFundations } from '../hooks/useFundations';
import { useTransactions } from '../hooks/useTransactions';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { Action, Transaction } from '../models/Transaction';

const FundForm: React.FC = () => {
  const {fundations} = useFundations();
  const { addNewTransaction, errorTransaction  } = useTransactions();

  const [selectedFund, setSelectedFund] = useState<string>('');
  const [notificationType, setNotificationType] = useState<'email' | 'sms'>('email');
  const [notificationValue, setNotificationValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {


    // Validación dinámica para email o número de teléfono
    if (notificationType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(notificationValue)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else if (notificationType === 'sms') {
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(notificationValue)) {
        setError('Please enter a valid phone number.');
        return;
      }
    }

    setError(null); // Limpiar el error si la validación es correcta

    
      const transaction:Transaction = {
        fund_id:selectedFund,
        action: Action.Subscription,
        email_sms: notificationValue
      };
      await addNewTransaction(transaction);

  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Espacio entre elementos
        maxWidth: '600px', // Ancho máximo del formulario
        margin: '0 auto', // Centrar horizontalmente
        padding: '20px',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Seleccione un fondo</InputLabel>
        <Select
          value={selectedFund}
          onChange={(e) => setSelectedFund(e.target.value)}
        >
          {fundations && fundations.map(fund => (
            <MenuItem key={fund.name} value={fund.id}>{fund.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl fullWidth>
        <InputLabel>Accion</InputLabel>
        <Select
          value={action}
          onChange={(e) => setAction(e.target.value as Action)}
        >
          <MenuItem value="subscription">Suscripcion</MenuItem>
          <MenuItem value="cancellation">Cancelacion</MenuItem>
        </Select>
      </FormControl> */}

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          row
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value as 'email' | 'sms')}
        >
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="sms" control={<Radio />} label="SMS" />
        </RadioGroup>
        <TextField
          label={notificationType === 'email' ? 'Email Address' : 'Phone Number'}
          type={notificationType === 'email' ? 'email' : 'tel'}
          value={notificationValue}
          onChange={(e) => setNotificationValue(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error}
        />
      </FormControl>

      <Button variant="contained" onClick={handleAction} fullWidth>
        Suscripcion
      </Button>
      {errorTransaction && (
        <Alert severity="error">{errorTransaction}</Alert>
      )}
    </Box>
  );
};

export default FundForm;
