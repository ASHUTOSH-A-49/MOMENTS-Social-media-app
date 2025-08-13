export const useAuthStyles = () => {
  return {
    paper: {
      marginTop: '64px', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px', 
    },
    root: {
      '& .MuiTextField-root': {
        margin: '8px', 
      },
    },
    avatar: {
      margin: '8px', 
      backgroundColor: 'secondary.main',
    },
    form: {
      width: '100%',
      marginTop: '24px', 
    },
    submit: {
      margin: '24px 0 16px', // theme.spacing(3, 0, 2)
    },
    googleButton: {
      marginBottom: '16px', 
    },
    gridContainer: {
      paddingTop: '20px',
    }
  };
};