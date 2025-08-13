export const useFormStyles = () => {
  return {
    paper: {
      padding: '16px',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& .MuiTextField-root': {
        margin: '8px', 
      },
    },
    fileInput: {
      width: '90%',
      margin: '10px 0',
    },
    buttonSubmit: {
      marginBottom: '10px', 
    },
  };
};