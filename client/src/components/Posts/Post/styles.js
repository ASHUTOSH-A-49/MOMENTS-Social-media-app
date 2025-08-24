import { useTheme } from '@mui/material/styles';
export const usePostStyles = () => {
  const theme = useTheme()
  return {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9 aspect ratio
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'darken',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%', // Crucial for making the card fill its Grid container
      position: 'relative',
      [theme.breakpoints.up('md')]: { // Apply from 'md' breakpoint and up
        maxWidth:350,
        
      },
      
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
    },
    overlay2: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'white',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  };
};