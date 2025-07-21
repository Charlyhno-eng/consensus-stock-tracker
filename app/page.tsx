"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
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

  // Dynamically load sectors
  useEffect(() => {
    fetch('/api/sectors')
      .then(res => res.json())
      .then(setSectors)
      .catch(console.error);
  }, []);

  const handleFetchSector = async (sector: string) => {
    setLoading(true);
    setSelectedSector(sector);
    try {
      const res = await fetch(`/api/consensus?sector=${sector}`);
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
    <Box>
      <Typography variant="h4" gutterBottom>Consensus par Secteur</Typography>

      <Box sx={{ mb: 2 }}>
        {sectors.map(sector => (
          <Button
            key={sector}
            variant="contained"
            onClick={() => handleFetchSector(sector)}
            sx={{ mr: 1 }}
          >
            {sector}
          </Button>
        ))}
      </Box>

      {loading && <Typography>Chargement...</Typography>}

      {!loading && selectedSector && (
        <>
          <Typography variant="h5" gutterBottom>Secteur : {selectedSector}</Typography>

          {Object.entries(data).map(([stockName, stockData]) => (
            <Box key={stockName}>
              <Typography variant="h6" gutterBottom>{stockName}</Typography>

              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table aria-label={`Consensus Table for ${stockName}`}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom de l'Action</TableCell>
                      <TableCell>Consensus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.consensus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
