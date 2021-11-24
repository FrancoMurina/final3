import React, { Component }  from "react";
import { Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

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
}

render(){
    return(
        <React.Fragment>
            <Text style={styles.letras}>Perfil de: {auth.currentUser.displayName} </Text>
            <Text style={styles.letras}>Fecha de ultimo acceso: {auth.currentUser.metadata.lastSignInTime} </Text>
            {this.state.posts.length != 1?
                <Text style={styles.letras}>Usted tiene: {this.state.posts.length} publicaciones.</Text>
                :
                <Text style={styles.letras}>Usted tiene: {this.state.posts.length} publicacion.</Text>
            }
            <TouchableOpacity style= {styles.button} onPress={()=> this.props.logout()}>
                <Text style={styles.text} style={styles.exit}>Logout </Text>
            </TouchableOpacity>
            <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                    <>
                        <Post dataItem = {item}></Post>   
                    {     
                    <TouchableOpacity onPress = {()=> this.delete(item.id)}>
                        <Text style={styles.exit}>Borrar</Text>
                    </TouchableOpacity>
                    }        
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
    },
    letras: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'black',
        marginLeft: 15, 
    },
    exit: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'red',
        marginLeft: 15, 
    },
})