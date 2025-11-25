// src/App.jsx
import React from 'react';
import Container from '@mui/material/Container';
import Portfolio from './components/Portfolio';
import PortfolioActions from './components/PortfolioActions'; // remove this line if file doesn't exist

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Portfolio />
      <PortfolioActions />
    </Container>
  );
}
