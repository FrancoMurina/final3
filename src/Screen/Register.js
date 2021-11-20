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
                {/* <Text style = {styles.text}> Registro </Text> */}
                    <TextInput
                        style={styles.fieldOne}
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
        backgroundColor: '#f3e0ef',
    },
    fieldOne:{
        // textAlign: 'center',
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
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400",
        textAlign: 'center',
        marginLeft: 150,
        // backgroundColor: 'purple',
        paddingTop: 30,
        borderColor: 'black'
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