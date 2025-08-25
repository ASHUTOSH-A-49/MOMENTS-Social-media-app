
import { useTheme } from '@mui/material/styles';

export const usePostDetailsStyles = ()=>{
    const theme = useTheme()
    return{
        media: {
    borderRadius: '20px',
                objectFit: 'contain',
                maxWidth: '200px',
                maxHeight: '200px',

  },
  card: {
    display: 'flex',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
                flexDirection: 'column',
            },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word', 
  },
  imageSection: {
    display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              overflow: 'hidden',
              
              [theme.breakpoints.down('sm')]: {
                marginTop: '20px',
              },
  },
  recommendedPostsStyle: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
    }
}