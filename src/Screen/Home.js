import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default class Home extends Component{
    constructor (props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text> Home </Text>
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.logout()}>
                    <Text style={styles.text}>Deslogearse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#09009B'
    }
})