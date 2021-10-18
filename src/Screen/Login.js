import React, {Component} from "react";
import {TouchableOpacity, View, TextInput, Text, StyleSheet} from 'react-native';
import { auth } from "../firebase/config";

export default class Login extends Component{
constructor(props){
    super(props);
    this.state ={ 
        email:"",
        password:"",
        loggedIn: false,
        error:"",
    }
}
handleLogin(){
    //alert(`usuario:${this.state.email}, password:${this.state.password}`)
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then( response =>{
        console.log(response);
        alert("Usuario loggeado");
        this.setState({
            loggedIn:true
        })
    })
    .catch(error =>{
        console.log(error);
        alert("Hubo un error de loggeo");
        this.setState({
            error: "error de loggeado"
        })
    })
}
    render(){
    return(
        <View style={styles.container}>
            <Text>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={()=> this.handleLogin()}>
            <Text>Loggearse</Text>
            </TouchableOpacity>
        </View>
    )
}
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignitems: "center",
    },
    field:{
        width:'80%',
        backgroundColor:'#09009B',
        color:"#FFA400",
        padding: 10,
        marginvertical: 10,
    },
    button:{
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400"
    }

})