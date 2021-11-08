import React, { Component }  from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import { auth } from "../firebase/config";
import Home from "./Home";
import Login from './Login';
import Register from './Register';
import CreatePost from "./CreatePost";
import Profile from "./Profile";


export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn: false,
            error: "",
        }
    }
    componentDidMount(){
        //Recordar la sesión ya iniciada anteriormente
        auth.onAuthStateChanged( user => {
            if (user) {
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
    handleLogin(email, password){
        //alert(`usuario:${this.state.email}, password:${this.state.password}`)
        auth.signInWithEmailAndPassword(email, password)
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
                error: error,
            })
        })
    }
    handleRegister(email, password, username) {
        //alert(`REGISTRO: usuario: ${this.state.email}, password: ${this.state.password}`)
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            alert("Usuario registrado correctamente!");
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert("Hubo un error en el registro");
            this.setState({
                error: "Hubo un fallo en el registro"
            })
        })
    }
    logout(){
    auth.signOut()
    .then( ()=>{
        this.setState({
            loggedIn:false
        })
    })
    .catch( error => {
        console.log(error);
        alert("Error en el logout");
        this.setState({
            error: "Fallo en el logout"
        })
    })
    }
    render(){
        const Drawer = createDrawerNavigator();
        return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login">
                {this.state.loggedIn === true? 
                    <React.Fragment>
                        <Drawer.Screen name="Home" >
                            {props =><Home {...props} logout={()=>this.logout()}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name="Profile" >
                            {props =><Profile {...props} />}
                        </Drawer.Screen>
                        <Drawer.Screen name="CreatePost" >
                            {props =><CreatePost {...props} />}
                        </Drawer.Screen>
                        </React.Fragment>
                    :
                    <React.Fragment>
                        <Drawer.Screen name="Login" >
                            {props =><Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name="Register" >
                            {props =><Register {...props} handleRegister={(email, password)=>this.handleRegister(email,password)}/>}
                        </Drawer.Screen>
                    </React.Fragment>
                }   
            </Drawer.Navigator>
        </NavigationContainer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });