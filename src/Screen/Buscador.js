import React, { Component }  from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput} from "react-native";
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class Buscador extends Component{
    constructor (props){
        super(props);
        this.state= {
            posts:[],
            usuarios:[],
        }
    }
    
    componentDidMount(){
       if(this.state.usuarios.length == 0){
           alert("Busque lo que quiera")
       }else{
        db.collection('posts')
        .where("email", '==', this.state.usuarios)
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
        )}
    
    
    }
    onSearch(){
        
    }
    render(){
        console.log(this.state.posts)
        console.log(this.state.usuarios.length)
        return(
            <View>
            <Text>Buscador</Text>
            <TextInput style={styles.container}
                    style={styles.field}
                    keyboardType = "Buscador"
                    placeholder = "Busqueda"
                    onChangeText = {text => this.setState({usuarios:text})}
            />
            {/* <TouchableOpacity style={styles.button} onPress={()=> ())}>
                <Text style = {styles.text}>Login</Text>
            </TouchableOpacity> */}
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