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
                    <TextInput
                        style={styles.fieldOne}
                        keyboardType="default"
                        placeholder="username"
                        onChangeText={text => this.setState({username:text})}
                    />
                    <TextInput
                        style={styles.fieldTwo}
                        keyboardType="email-address"
                        placeholder="email"
                        onChangeText={text => this.setState({email:text})}
                    />
                    <TextInput
                        style={styles.fieldThree}
                        keyboardType="default"
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password:text})}
                    />
                <TouchableOpacity onPress={()=> this.onRegister()} style= {styles.buttonRegister}>
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
        backgroundColor: '#f3e0ef',
    },
    fieldOne:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        backgroundColor:'purple',
        color:"#FFA400",
        padding: 10,
        marginLeft: 40,
        marginvertical: 10,
        fontSize: 15,
        marginTop: 30
    },
    fieldTwo:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        backgroundColor:'purple',
        color:"#FFA400",
        padding: 10,
        marginLeft: 40,
        marginvertical: 10,
        fontSize: 15,
    },
    fieldThree:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        backgroundColor:'purple',
        color:"#FFA400",
        padding: 10,
        marginLeft: 40,
        marginvertical: 10,
        fontSize: 15,
        marginBottom: 50
    },
    buttonRegister:{
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400",
        alignItems: 'center',
        marginLeft: 150,
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 12
    },
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    textBoton:{
        fontFamily: "futura",
        fontSize: 20,
        paddingTop: 20 ,
        borderColor: 'black'
    }

})