import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { Box, Button, LinearProgress, List, ListItem, ListItemText } from '@mui/material';
import { useFundations } from '../hooks/useFundations';

const TransactionList: React.FC = () => {
  const { transactions, cancelSubscription,  isLoading } = useTransactions();
  const { fundations } = useFundations()


    const handleCancellation = async (transactionId: string) => {
      console.log(transactionId);
      await cancelSubscription(transactionId);
     
    }
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '0 auto',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <List sx={{ width: '100%' }}>
        {
         isLoading ? (
          <LinearProgress />
        ) : 
        transactions.map((transaction, index) => {
          const funds = fundations.filter(f => f.id === transaction.fund_id)[0]
          
          return (

            <ListItem key={index} sx={{ marginBottom: '8px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <ListItemText
                primary={`${transaction.action === 'subscription' ? 'Suscrito' : 'Suscription Cancelada'} a ${funds && funds.name ? funds.name : 'Unknown Fund'}`}
                secondary={`Balance: ${transaction.balance}`}
              />
              {transaction.action === 'subscription' && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => transaction?.id && handleCancellation(transaction?.id)}
                >
                  Cancelar suscripcion
                </Button>
              )}
            </ListItem>
          )
        })}
      </List>
    </Box>
  );
};

export default TransactionList;
