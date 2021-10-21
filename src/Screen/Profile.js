import React, { Component }  from "react";
import { Text, View, StyleSheet} from "react-native";

export default class Profile extends Component{
    constructor (props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <Text> Profile </Text>
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