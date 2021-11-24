import React, { Component }  from "react";
import {StyleSheet, FlatList} from "react-native";
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: []
        }        
    }

componentDidMount(){
    db.collection('posts')
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

render(){
    return(
        <React.Fragment style={styles.container}>
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
//         card: {
//           backgroundColor: theme['color-basic-100'],
//           marginBottom: 25
//         },
//         cardImage: {
//           width: '100%',
//           height: 300
//         },
//         cardHeader: {
//           padding: 10,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         },
//         cardTitle: {
//           color: theme['color-basic-1000']
//         },
//         cardAvatar: {
//           marginRight: 16
//         },
//         cardContent: {
//           padding: 10,
//           borderWidth: 0.25,
//           borderColor: theme['color-basic-600']
//         },
      
})
