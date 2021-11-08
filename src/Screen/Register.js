import React, { Component }  from "react";
import {TouchableOpacity, View, TextInput, Text, StyleSheet} from "react-native";

export default class Register extends Component{
    constructor (props){
        super(props);
        this.state={
            email:"",
            password:"",
            username:"",
        }
    }
    onRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
        else {
            console.log("Todos los campos deben estar completos!")
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text> Registro </Text>
                    <TextInput
                        style={styles.field}
                        keyboardType="default"
                        placeholder="username"
                        onChangeText={text => this.setState({username:text})}
                    />
                    <TextInput
                        style={styles.field}
                        keyboardType="email-address"
                        placeholder="email"
                        onChangeText={text => this.setState({email:text})}
                    />
                    <TextInput
                        style={styles.field}
                        keyboardType="default"
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password:text})}
                    />
                <TouchableOpacity style= {styles.button} onPress={()=> this.onRegister()}>
                    <Text style={styles.text}>Registrarse</Text>
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