import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SignIn from './components/SignIn';
import StockSelector from './components/StockSelector';
import DurationSelector from './components/DurationSelector';
import StockGraph from './components/StockGraph';
import { fetchStocks } from './redux/stocksSlice';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchStocks());
    }
  }, [user, dispatch]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <Container className='main-container' maxWidth="md" style={{ marginTop: '2rem', alignItems: 'center' }}>
      <Container className="inner-container" style={{ boxShadow: 'none', padding: '1rem', borderRadius: '5px' }}>
      <Typography variant="h4" align="center" >
        Stock Data Visualization
        <h6>[alloan.ai Intern Assignment by Udbhav Varma]</h6>
      </Typography>
      <StockSelector />
      <DurationSelector />
      <StockGraph />
    </Container>
    <Button variant="contained" style={{marginTop: '12px'}} onClick={() => signOut(auth)}>
        Sign Out
      </Button>
    </Container>
    
  );
}

export default App;
