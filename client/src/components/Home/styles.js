import { useTheme } from '@mui/material/styles';

export const useHomeStyles = () => {
  const theme = useTheme()
  return {
    mainContainer: {
      [theme.breakpoints.up('md')]: { // Apply from 'md' breakpoint and up
        flexWrap: 'nowrap',
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
     appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  };
};