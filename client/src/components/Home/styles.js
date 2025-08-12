import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#a40db5',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down("sm")]:{
    //run css only if device is extra small
    mainContainer:{
    flexDirection:'column-reverse',
  }
  }
  
}))