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
    return(
        <View style={styles.container}>
                <TextInput
                    style={styles.fieldOne}
                    keyboardType = "email-address"
                    placeholder = "email"
                    onChangeText = {text => this.setState({email:text})}
                />
                <TextInput
                    style={styles.fieldTwo}
                    keyboardType = "number-pad"
                    placeholder = "password"
                    secureTextEntry= {true}
                    onChangeText = {text => this.setState({password:text})}
                />

            <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.props.handleLogin(this.state.email, this.state.password)}>
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
        backgroundColor: '#f3e0ef'
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
        marginTop: 50

    },
    fieldTwo:{
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
        marginBottom: 50
    },
    buttonLogin:{
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
    title:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 25,
        paddingTop: 30,
    },
    textBoton:{
        // marginLeft: 100,
        // textAlign: 'center',
        fontSize: 20,
        paddingTop: 20 ,
        borderColor: 'black'
    }

})