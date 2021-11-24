import React, { Component }  from "react";
import { Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import { color } from "react-native-reanimated";

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
        <React.Fragment style={styles.container}>
            <Text style={styles.title}> MIS DATOS </Text>
            <Text style={styles.letras}>Username: {auth.currentUser.displayName} </Text>
            <Text style={styles.letras}>Email: {auth.currentUser.email} </Text>
            <Text style={styles.letras}>Fecha de ultimo acceso: {auth.currentUser.metadata.lastSignInTime} </Text>
            {this.state.posts.length != 1?
                <Text style={styles.letras}>Tiene: {this.state.posts.length} publicaciones</Text>
                :
                <Text style={styles.letras}>Tiene: {this.state.posts.length} publicacion</Text>
            }

            <TouchableOpacity style= {styles.buttonLogout} onPress={()=> this.props.logout()}>
                <Text style={styles.exit}>Logout </Text>
            </TouchableOpacity>

            <Text style={styles.title}> MIS POSTEOS </Text>

            <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                    <>
                        <Post dataItem = {item}></Post>   
                    {     
                    <TouchableOpacity style= {styles.buttonBorrar} onPress = {()=> this.delete(item.id)}>
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
        fontSize: 15,
        // color: 'red',
        // marginLeft: 15, 
        alignItems: 'center',
    },
    buttonLogout: {
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400",
        alignItems: 'center',
        marginLeft: 150,
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 12,
        marginBottom: 5,
        marginTop: 25
    },
    buttonBorrar: {
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400",
        alignItems: 'center',
        marginLeft: 150,
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 12,
        marginBottom: 25,
        marginTop: 10
    },
    title:{
        fontFamily: "futura",
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10,
        color: 'purple'
    },
})