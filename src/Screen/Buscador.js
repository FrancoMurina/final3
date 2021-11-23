import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput} from "react-native";
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class Buscador extends Component{
    constructor (props){
        super(props);
        this.state= {
            posts:[],
        }
    }
onSearch(text){
    db.collection('posts')
    .where("email", '==', text)
    .orderBy("createdAt", "desc")
    .get().then(
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
        <View>
        <Text>Buscador</Text>
        <TextInput style={styles.container}
                style={styles.field}
                keyboardType = "default"
                placeholder = "Busqueda"
                onChangeText = {text => this.onSearch(text)}
        />
        <FlatList
            data = {this.state.posts}
            keyExtractor = {post => post.id.toString()}
            renderItem = { ({item}) => 
            <>
                <Post dataItem = {item}></Post>         
            </>
            }
        />
        </View>
    )
}}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignitems: "center",
    },
    field:{
        width:'80%',
        backgroundColor:'#09009B',
        color:"#FFA400",
        padding: 10,
        marginvertical: 10,
    },
    button:{
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400"
    }

})