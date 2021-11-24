import React, { Component }  from "react";
import {StyleSheet, FlatList, TextInput} from "react-native";
import Post from '../components/Post';
import { db } from '../firebase/config';

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
        <React.Fragment>
            <TextInput style={styles.container} style={styles.field}
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
        </React.Fragment>
    )
}}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignitems: "center",
        backgroundColor: '#f3e0ef',
    },
    field:{
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
    },
    button:{
        width:'30%',
        backgrpungcolor:'#0F00FF',
        color:"#FFA400"
    }

})