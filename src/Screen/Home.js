import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import Post from '../components/Post';
import Profile from './Profile';
import { db } from '../firebase/config';

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: []
        }        
    }
    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
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
        console.log(this.state.posts);
        return(
            <View style={styles.container}>
                <Text> Home </Text>
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.logout()}>
                    <Text style={styles.text}> Logout </Text>
                </TouchableOpacity>
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