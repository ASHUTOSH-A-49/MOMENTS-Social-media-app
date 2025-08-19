import { deepPurple } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

export const useNavbarStyles = () => {
  const theme = useTheme();

  return {
    appBar: {
      borderRadius: 15,
      // color:"#b1fca2",
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 50px',
      [theme.breakpoints.down('sm')]: {
        padding: '10px 10px',
      },
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        flexGrow: 0,
      },
    },
    heading: {
      color: '#a40db5',
      textDecoration: 'none',
      flexGrow: 1,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
        marginLeft: '-35px',
        flexGrow: 1,
        textAlign: 'center',
      },
    },
    image: {
      height: '60px',
      marginRight: '15px', // <-- Added margin here
      [theme.breakpoints.down('sm')]: {
        height: '40px',
        marginLeft: 0,
        marginRight: '8px', // <-- Adjusted for mobile view
      },
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexGrow: 0,
      width: 'auto',
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    hamburgerMenu: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        cursor: 'pointer',
        marginLeft: '10px',
      },
    },
    mobileProfile: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: '60px',
        right: '10px',
        borderRadius: '8px',
        boxShadow: theme.shadows[3],
        zIndex: 10,
      },
    },
    userName: { 
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'none', // Hide on mobile
      },
    },
    userNameMobile: {
      margin: '10px 0',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    logoutButtonMobile: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  };
};