import React from 'react';
import { Card, CardProps } from '@mui/material';

export default function CustomCard(props: CardProps) {
  const { children, sx, ...rest } = props;

  return (
    <Card
      sx={{
        background: 'linear-gradient(145deg, #2c2c54, #3a3a6d)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 0 20px rgba(108, 92, 231, 0.5)',
        border: '1px solid #6c5ce7',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
