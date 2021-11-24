import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';

export default class CreatePost extends Component {
constructor(props){
    super(props);
    this.state = {
        comment: "",
        photo:"",
        showCamera: true,
    }
}

handlePost(){
    db.collection('posts').add({
        owner: auth.currentUser.displayName,
        description: this.state.comment,
        email: auth.currentUser.email,
        createdAt: Date.now(),
        likes: [],
        comments: [],
        photo: this.state.photo,
    })
    .then(response => {
        //console.log(response);
        alert("Posteo realizado correctamente!");
        this.setState({
            comment: ""
        })
        //console.log(this.props);
        this.props.navigation.navigate('Home');
    })
    .catch(error => {
        //console.log(error);
        alert("Hay un error con su posteo");
    })
}
guardarFoto(url){
    this.setState({
        photo: url,
        showCamera: false,
    })
}

render(){

    
    return(
        <React.Fragment>
        {this.state.showCamera?
        <MyCamera savePhoto = {(url)=>this.guardarFoto(url)}/>
        :
        <React.Fragment>
        <View style={styles.container}>
            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder="Share your thoughts!"
                multiline={true}
                numberOfLines = {6}
                onChangeText={text => this.setState({ comment: text })}
                value = {this.state.comment}
            />
            <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                <Text style = {styles.text}>      Post </Text>
            </TouchableOpacity>
        </View>
        </React.Fragment>
        }
        </React.Fragment>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    button: {
        width: '30%',
        backgroundColor: "purple",
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    field:{
        // textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
         backgroundColor: '#f3e0ef',
        color:"#FFA400",
        padding: 10,
        marginLeft: 10,
        marginvertical: 10,
        fontSize: 15,
    },
})