import React, {Component} from "react";
import {TouchableOpacity, View, TextInput, Text, StyleSheet} from 'react-native';

export default class Login extends Component{
constructor(props){
    super(props);
    this.state ={ 
        email:"",
        password:"",
      
    }
}

    render(){
        //console.log(this.state.loggedIn);
    return(
        <View style={styles.container}>
            <Text style = {styles.text}> Posts app</Text>
                <TextInput
                    style={styles.field}
                    keyboardType = "email-address"
                    placeholder = "email"
                    onChangeText = {text => this.setState({email:text})}
                />
                <TextInput
                    style={styles.field}
                    keyboardType = "number-pad"
                    placeholder = "password"
                    secureTextEntry= {true}
                    onChangeText = {text => this.setState({password:text})}
                />

            <TouchableOpacity style={styles.button} onPress={()=> this.props.handleLogin(this.state.email, this.state.password)}>
                <Text style = {styles.textBoton}>Login</Text>
            </TouchableOpacity>
        </View>
       
    )
}
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignitems: "center",
        backgroundColor: '#f3e0ef'
    },
    field:{
        // textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        backgroundColor:'purple',
        color:"#FFA400",
        padding: 10,
        marginLeft: 40,
        marginvertical: 10,
        fontSize: 15
    },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400",
        textAlign: 'center',
        marginLeft: 180,
        // backgroundColor: 'purple',
        paddingTop: 30,
    },
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 30
    },
    textBoton:{
        // marginLeft: 100,
        // textAlign: 'center',
        fontSize: 20,
        paddingTop: 20 ,
        borderColor: 'black'
    }

})