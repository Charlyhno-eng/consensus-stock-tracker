"use client";

import { interpretNoteMediane } from '@/utils/reusableFunctions';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@mui/material';

type ConsensusData = {
  name: string;
  consensus: string;
};

type ApiResponse = {
  [stockName: string]: ConsensusData[];
};

export default function Home() {
  const [sectors, setSectors] = useState<string[]>([]);
  const [data, setData] = useState<ApiResponse>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/sectors/amerique')
      .then(res => res.json())
      .then(setSectors)
      .catch(console.error);
  }, []);

  const handleFetchSector = async (sector: string) => {
    setLoading(true);
    setSelectedSector(sector);
    try {
      const res = await fetch(`/api/consensus/amerique?sector=${sector}`);
      if (!res.ok) throw new Error('API returned error');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 4 }}>
        Europe : Consensus par secteur
      </Typography>

      <Box sx={{ mb: 3 }}>
        {sectors.map(sector => (
          <Button
            key={sector}
            variant={selectedSector === sector ? 'contained' : 'outlined'}
            onClick={() => handleFetchSector(sector)}
            sx={{
              mr: 1, mb: 1,
              color: 'white',
              borderColor: '#6c5ce7',
              backgroundColor: selectedSector === sector ? '#6c5ce7' : 'transparent',
              '&:hover': { backgroundColor: '#6c5ce7' }
            }}
          >
            {sector}
          </Button>
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {!loading && selectedSector && (
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
            Secteur : {selectedSector}
          </Typography>

          <Grid container spacing={3}>
            {Object.entries(data).map(([stockName, stockData]) => (
              <Grid
                key={stockName}
                size={{ xs: 12, md: 6 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #2c2c54, #3a3a6d)',
                    color: 'white',
                    borderRadius: 3,
                    boxShadow: '0 0 20px rgba(108, 92, 231, 0.5)',
                    border: '1px solid #6c5ce7'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom sx={{ borderBottom: '1px solid #6c5ce7', pb: 1 }}>
                      {stockName}
                    </Typography>

                    {stockData.map((item, index) => {
                      let displayName = item.name;
                      let displayConsensus = item.consensus;

                      if (displayName.startsWith('Historique des objectifs de cours médian')) {
                        displayName = 'Objectifs de cours';
                      }

                      if (displayName === 'Note médiane') {
                        const note = parseFloat(displayConsensus.replace(',', '.'));
                        if (!isNaN(note)) {
                          const interpretation = interpretNoteMediane(note);
                          displayConsensus = `${displayConsensus} (${interpretation})`;
                        }
                      }

                      return (
                        <Box key={index} sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          py: 1,
                          borderBottom: index < stockData.length - 1 ? '1px solid #444' : 'none'
                        }}>
                          <Typography>{displayName}</Typography>
                          <Typography sx={{ color: '#74b9ff' }}>{displayConsensus}</Typography>
                        </Box>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
