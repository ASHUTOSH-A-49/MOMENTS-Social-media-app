import { useTheme } from '@mui/material/styles';
export const usePostsStyles = () => {
  const theme = useTheme()
  return {
    
    container: {
      display: 'flex',
      alignItems: 'center',
      

    },
    smMargin: {
      margin: '8px', // theme.spacing(1) is equivalent to 8px by default
    },
    actionDiv: {
      textAlign: 'center',
    },
  };
};