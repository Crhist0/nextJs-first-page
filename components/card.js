import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {
  return (
    <a
      href={props.url}
      target="_blank"
      style={{ textDecoration: 'none', cursor: 'pointer' }}
      rel="noreferrer"
    >
      <Card
        sx={{
          transition: '0.2s',
          textShadow:
            '-webkit-box-shadow: 0px 0px 25px -15px rgba(0,0,0,0.2);  box-shadow: 0px 0px 25px -15px rgba(0,0,0,0.2);',
          '&:hover': {
            transform: 'translateY(-2px)',
            textShadow:
              '-webkit-box-shadow: 0px 0px 20px -8px rgba(0,0,0,0.3); box-shadow: 0px 0px 20px -8px rgba(0,0,0,0.3);',
          },
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.pushed_at}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '780px' }}>
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
