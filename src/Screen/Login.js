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
            <Text style = {styles.text}>Movie app</Text>
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
                <Text style = {styles.text}>Login</Text>
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