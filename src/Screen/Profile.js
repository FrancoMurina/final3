import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import firebase from 'firebase';

export default class Profile extends Component{
    constructor (props){
        super(props);
        this.state= {
            posts:[],
        }
    }
    componentDidMount(){
        db.collection('posts')
        .where('email','==', auth.currentUser.email)
        .orderBy("createdAt", "desc")
        .onSnapshot(
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

    delete(id){
        const posteoActualizar = db.collection('posts').doc(id)
        posteoActualizar.delete()
        //filter por id
        posts = posts.filter(id)

    }

    render(){

        // console.log(auth.currentUser)
        // console.log(this.state.posts)
        return(
            <React.Fragment style={styles.container}>
                <Text> Profile: {auth.currentUser.displayName} </Text>
                <Text> Fecha de ultimo acceso: {auth.currentUser.metadata.lastSignInTime} </Text>
                <Text>Usted tiene: {this.state.posts.length} publicaciones.</Text>
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.logout()}>
                    <Text style={styles.text}> Logout </Text>
                </TouchableOpacity>

                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                <>
                    <Post dataItem = {item}
                        delete ={(id)=>this.delete(id)}>
                    </Post>   
                      
                    {/* <Profile dataItem = {item}></Profile>  */}
                </>
                }
                    
                />
            </React.Fragment>
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