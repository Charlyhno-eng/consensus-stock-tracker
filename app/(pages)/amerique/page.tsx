"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Amérique : Consensus par secteur</Typography>

      <Box sx={{ mb: 3 }}>
        {sectors.map(sector => (
          <Button
            key={sector}
            variant={selectedSector === sector ? 'contained' : 'outlined'}
            onClick={() => handleFetchSector(sector)}
            sx={{ mr: 1, mb: 1 }}
          >
            {sector}
          </Button>
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && selectedSector && (
        <>
          <Typography variant="h5" gutterBottom>Secteur : {selectedSector}</Typography>

          <Grid container spacing={3}>
            {Object.entries(data).map(([stockName, stockData]) => (
              <Grid size={6} key={stockName}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom align="center" sx={{ backgroundColor: '#f0f0f0', p: 1 }}>
                    {stockName}
                  </Typography>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nom de l'Action</TableCell>
                          <TableCell align="right">Consensus</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.consensus}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
