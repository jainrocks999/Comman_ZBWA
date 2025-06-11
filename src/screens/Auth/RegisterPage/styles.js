import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
   main:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
   logo:{
    height:168,
    width:168,
  },
   view:{
    alignItems:'center',
    justifyContent:'flex-start',
  },
   yellow:{
    height:430,
    width:'90%',
    backgroundColor:'#FCDA64',
    borderRadius:40
  },
   login:{
    paddingHorizontal:40,
    paddingVertical:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    },
    loginText:{
      fontFamily:'Montserrat-Bold',
      fontSize:18,
      color:'#000'
    },
    loginButton:{
      width:42,
      height:38,
      backgroundColor:'#000000',
      borderTopLeftRadius:40,
      borderTopRightRadius:80,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:80,
      alignItems:'center',
      justifyContent:'center'
    },
    black:{
      backgroundColor:'#000000',
      width:'90%',
      height:430,
      borderTopLeftRadius:40,
      borderTopRightRadius:80,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:80,
        marginTop: -320
    },
    border:{
      borderBottomWidth:1,
      borderColor:'#FFFFFF',
      flexDirection:'row',
      alignItems:'center',
      width:'90%',
      height:30
    },
    button:{
       height: 65,
    width: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    flexDirection: 'row',
    },
    signup:{
      color:'#000000',
      fontSize:18,
      fontFamily:'Montserrat-Bold',
      marginRight:14,
      
    },
    input:{
      color:'#FFFFFF',
      height:35,
      borderColor:'#FFFFFF',
      marginTop:4,
      width:'90%',
      fontSize:12,
      fontFamily:'Montserrat-Regular'
    },
    padding:{
      paddingHorizontal:40,
      marginTop:10
    },
    new:{
      color:'#FFFFFF',
      fontSize:10,
      fontFamily:'Montserrat-Regular'
    },
    sign:{
      fontFamily:'Montserrat-Bold',
      color:'#FFFFFF',
      fontSize:18,
      marginTop:2
    },
    ninety:{
      color:'#FFFFFF',
      fontSize:12,
      fontFamily:'Montserrat-Regular'
    },
      buttonWrapper: {
  alignSelf: 'flex-end',
  marginRight: 0,
  marginTop: -25, // Adjust this to position the button correctly
},
});
