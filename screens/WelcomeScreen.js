import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            emailID: "",
            password: "",
            address: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            contact: "",
            isModalVisible: false,
        }
    }
    signUp = (emailID, password, confirmPassword)=>{
        if (passowrd !== confirmPassword){
            return Alert.alert("This password does not match your orignal passoword.")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
            .then(()=>{
                db.collection("users").add({
                    firstName:this.state.firstName,
                    lastName: this.state.lastName,
                    contact: this.state.contact,
                    emailID: this.state.emailID,
                    address: this.state.address
                })
 
                return Alert.alert("User Added Successfully!",
                "",
                [{text: "OK", onPress: () => {this.setState({"isModalVisible": false})}}])
            })
        
       
       .catch(function (error){
           var errorCode = error.code
           var errorMessage = error.message
           return Alert.alert(errorMessage)
       })
    }
}

    login = (emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then((response)=>{
            this.props.navigation.navigate("BookDonate")
        })
        .catch(function (error){
            var errorCode = error.code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    showModal = ()=>{
        return(
            <Modal
            animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}>
                <View>
                    <ScrollView
                    style = {{width: "100%"}}>
                    <KeyboardAvoidingView>
                        <Text style = {{fontWeight: "bold", fontSize: 20, margin: 10}}>
                            Registration
                        </Text>
                        <TextInput
           style = {styles.loginBox}
           placeholder = "firstName"
           maxLength = {10}
           onChangeText = {(text)=>{
           this.setState({
            firstName: text
        })
        }}  
        />
                       <TextInput
           style = {styles.loginBox}
           placeholder = "lastName"
           maxLength = {10}
           onChangeText = {(text)=>{
           this.setState({
            lastName: text
        })
        }}  
        />
                               <TextInput
           style = {styles.loginBox}
           placeholder = "contact"
            keyboardType = {'numeric'}
           onChangeText = {(text)=>{
           this.setState({
            contact: text
        })
        }}  
        />                       <TextInput
        style = {styles.loginBox}
        placeholder = "address"
        multiline = {true}
        onChangeText = {(text)=>{
        this.setState({
         address: text
     })
     }}  
     />
                            <TextInput
           style = {styles.loginBox}
           placeholder = "emailID"
           keyboardType = {"email-address"}
           onChangeText = {(text)=>{
           this.setState({
            emailID: text
        })
        }}  
        />
                               <TextInput
           style = {styles.loginBox}
           placeholder = "password"
           secureTextEntry = {true}
           onChangeText = {(text)=>{
           this.setState({
            password: text
        })
        }}  
        />
                               <TextInput
           style = {styles.loginBox}
           placeholder = "confirmPassword"
           secureTextEntry = {true}
           onChangeText = {(text)=>{
           this.setState({
            confirmPassword: text
        })
        }}  
        />



                    </KeyboardAvoidingView>
                    </ScrollView>
                </View>

            </Modal>
        )
    }

  render(){
  return (
    <View style={styles.container}>
        {this.showModal()}
        <Text style = {{textAlign: "center", fontSize: 50, fontWeight: "bold", padding: 10, margin: 10}}>
            Book Santa
        </Text>
        <TextInput
        style = {styles.loginBox}
        placeholder = "Email"
        keyboardType = "email-address"
        onChangeText = {(text)=>{
        this.setState({
            emailID: text
        })
        }}  
        />
        <TextInput
        style = {styles.loginBox}
        placeholder = "Password"
        secureTextEntry = {true}
        onChangeText = {(text)=>{
        this.setState({
            password: text
        })
        }}  
        />
        <TouchableOpacity onPress = {()=>{
            this.Login(
                this.state.emailID,
                this.state.password
            )
        }}>
            <Text >
                Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>{
           this.setState({
               isModalVisible: true,
           })
        }}>
            <Text>
                Sign Up
            </Text>
        </TouchableOpacity>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
