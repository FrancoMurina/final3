import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component{

constructor(props){
    super(props);
    this.state = {
        liked: false,
        likes: 0,
        showModal: false,
    }
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
//Va a mostrar el modal
showModal(){
    //console.log('Mostrando modal')
    this.setState({
        showModal: true,
    })
}

//Va a crrar el modal
closeModal(){
    //console.log('Cerrando modal')
    this.setState({
        showModal: false,
    })
}
render(){
    // console.log(this.props.dataItem);
    return(
        <View stlye={styles.container}>
            <Text>{this.props.dataItem.data.description}</Text>
            <Text>{this.props.dataItem.data.photo}</Text>
            <Text>{this.props.dataItem.data.email}</Text>
            <Text>Likes: {this.state.likes}</Text>
            {
                !this.state.liked ?
                <TouchableOpacity onPress = {()=> this.onLike()}>
                    <Text>
                        Like
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = {()=> this.onDislike()}>
                    <Text>
                        Unlike
                    </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=>{this.showModal()}}>
                <Text>
                    Ver comentarios
                </Text>
            </TouchableOpacity>
            {
            this.state.showModal ?
            <Modal
                animationType = "fade"
                transparent ={false}
                visibile = {this.state.showModal}
                style ={styles.modal}
            >
                <View>
                    <TouchableOpacity style ={styles.closeModal} onPress= {()=>{this.closeModal()}}>
                        <Text style ={styles.modalText}> X</Text>
                    </TouchableOpacity>
                    <Text>
                        Aca hay comentarios!!!!
                    </Text>
                
                </View>    
            </Modal>
            :
            null
        }
        </View>
    )
}
}

const styles = StyleSheet.create({
    image: {
        height: 200,
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    }
})