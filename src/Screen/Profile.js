import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import firebase from 'firebase';

export default class Profile extends Component{
    constructor (props){
        super(props);
        this.state= {}
    }
    componentDidMount(){
        db.collection('posts').where('email','==','fmurina@yahoo.com').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let postsAux = [] //Variable auxiliar
                docs.forEach( doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            }
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <Text> Profile </Text>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                <>
                    <Post dataItem = {item}></Post>         
                    {/* <Profile dataItem = {item}></Profile>  */}
                </>
                }
                    
                />
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