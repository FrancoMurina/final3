import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component{

constructor(props){
    super(props);
    this.state = {
        liked: false,
        likes: 0,
        showModal: false,
        commented: false,
        comments: [],
        commentBoxInput: "",
    };
}

componentDidMount(){
    
    if (this.props.dataItem){
        if (this.props.dataItem.data.likes.length !== 0){
            this.setState({
                likes: this.props.dataItem.data.likes.length
            })
            if (this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    liked: true
                })
            }
        }
    }
}

onLike(){
    const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
    
    posteoActualizar.update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> {
        this.setState({
            liked: true,
            likes: this.state.likes + 1
        })
    })
}

onDislike(){
    const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
    
    posteoActualizar.update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> {
        this.setState({
            liked: false,
            likes: this.state.likes - 1
        })
    })
}

onComment(){
    if(this.state.commentBoxInput !== ""){
    const posteoActualizar=db.collection("posts").doc(this.props.dataItem.id);
    
    posteoActualizar.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
        userDisplayName: auth.currentUser.displayName,
        comment: this.state.commentBoxInput,
    }),
})
.then(() => {
    this.setState({
      comments: this.state.comments + 1,
});
})

.catch ((error) => {
    console.log (error);
});}
}

//Va a mostrar el modal
showModal(){
    //console.log('Mostrando modal')
    this.setState({
        showModal: true,
    })
}

//Va a crear el modal
closeModal(){
    //console.log('Cerrando modal')
    this.setState({
        showModal: false,
    })
}
render(){
    // console.log(this.props.dataItem.data.comments);


    return(
        <View stlye={styles.container}>
            <Image source={{uri: this.props.dataItem.data.photo}} style={styles.cardImage}></Image>
            <Text style={styles.letras}>Publicado por: {this.props.dataItem.data.owner}</Text>
            <Text style={styles.letras}>Descripción: {this.props.dataItem.data.description}</Text>
            { Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600) != 1?
                <Text style={styles.letras}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} horas</Text>
                :
                <Text style={styles.letras}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} hora</Text>
            }
            <Text style={styles.letras}>Likes: {this.state.likes}</Text>
            {
                !this.state.liked ?
                <TouchableOpacity onPress = {()=> this.onLike()}>
                    <Text style={styles.likeado}>
                        Like
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = {()=> this.onDislike()}>
                    <Text style={styles.disLike}>
                        Unlike
                    </Text>
                </TouchableOpacity>
            }
            {/* <TouchableOpacity onPress={()=>{this.showModal()}}>
                <Text>
                    Ver comentarios
                </Text>
            </TouchableOpacity> */}
            {
            this.state.showModal == false ?
            <TouchableOpacity onPress={()=>{this.showModal()}}>
                <Text style={styles.letras}>
                    Ver comentarios
                </Text>
            </TouchableOpacity>
            :
            <Modal
                animationType = "fade"
                transparent ={false}
                visibile = {this.state.showModal}
                style ={styles.modal}
            >
                <View>
                    <TouchableOpacity style ={styles.closeModal} onPress= {()=>{this.closeModal()}}>
                        <Text style ={styles.modalText} style={styles.comentarios}>Cerrar comentarios</Text>
                    </TouchableOpacity>
                    {/* <Text>
                        Aca hay comentarios!!!!
                    </Text> */}
            <FlatList
                    data = {this.props.dataItem.data.comments}
                    keyExtractor = {item => item.userDisplayName.toString()}
                    renderItem = { ({item}) => 
                      <>
                           <Text style = {styles.letras}>{item.userDisplayName}: {item.comment}</Text> 
                        
                            
                         </>
                    }
                    
                />
            <TextInput
            style={styles.commentBoxInput} style={styles.letras}
            keyboardType="default"
            placeholder="Comentario..."
            multiline={true}
            numberOfLines={1}
            onChangeText={(text) => this.setState({ commentBoxInput: text })}
            value={this.state.commentBoxInput}
            />
            <TouchableOpacity 
            style={styles.uploadCommentButton} 
            onPress={() => this.onComment()}>

            <Text style={styles.text} style={styles.comentarios}>Comentar</Text>
            </TouchableOpacity>


                </View>    
            </Modal>
            
        }
        </View>
    )
}
}

// const styles = StyleSheet.create({
//     image: {
//         height: 200,
//         width: 100,
    
//     },
//     container:{
//         flex: 1,
//         justifyContent: 'center',
//         padding: 5,
//     }
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#09009B',
        backgroundColor: "black",
        marginBottom: 25,
    },
        cardImage: {
          width: '100%',
          height: 300,
          padding: 10,
          marginLeft: 15, 
          marginRight: 15,
        },
    letras: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'black',
        marginLeft: 15, 
    },
    disLike: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'red',
        marginLeft: 15, 
    },
    likeado: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'green',
        marginLeft: 15, 
    },
    comentarios: {
        fontFamily: "futura",
        fontSize: 13,
        color: 'purple',
        marginLeft: 15,
    },
        cardTitle: {
          color:'black',
        },   
})