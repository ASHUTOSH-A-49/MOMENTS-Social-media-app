import { deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:'10px 50px'
  },
  heading: {
    color: '#a40db5',
    textDecoration:'none'
  },
  image: {
    marginLeft: '15px',
  },
  toolbar:{
    display:'flex',
    justifyContent:'flex-end',
    width:'400px',
  },
  profile:{
    display:'flex',
    justifyContent:'space-between',
    width:'400px'
  },
  userName:{
    display:'flex',
    alignItems:'center'
  },
  brandContainer:{
    flexDirection: 'row',
    display:'flex',
    alignItems:'center',
    justifyContent: 'space-between',
    width:'100%'
  },
  purple:{
    color:theme.palette.getContrastText(deepPurple[500]),
    backgroundColor:deepPurple[500]

  }
  

}
  ))