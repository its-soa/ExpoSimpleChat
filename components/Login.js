import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
	StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
	Keyboard, StatusBar, Image, Button
} from 'react-native';
import bgImage from '../images/AOTLagos-black.png';
import firebaseSvc from '../FirebaseSvc';
import firebase from 'firebase';
import { auth, initializeApp, storage } from 'firebase';
import uuid from 'uuid';

class Login extends React.Component {
  // static navigationOptions = {
  //   title: 'SIGN IN',
  // };

  state = {
    name: '',
    email: '',
    password: '',
    avatar: '',
  };

  // using Fire.js
  onPressLogin = async () => {
    console.log('pressing login... email:' + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };

    const response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed
    );
  };

  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('Chat', {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
    });
  };
  loginFailed = () => {
    console.log('login failed ***');
    alert('Login failure. Please try again.');
  };


  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });


  render() {
    return (

      <TouchableWithoutFeedback
				style={styles.container}
				onPress={Keyboard.dismiss}>


				<View style={styles.infoContainer}>

					<StatusBar
						backgroundColor="#fff"
						barStyle='light-content'
					/>
					<View style={styles.logoContainer}>
						<Image
							source={bgImage}
							style={styles.logo}
						>
						</Image>
					</View>

					<View style={styles.inputContainer}>
						{/* <Icon name={'ios-person-outline'} size={28} color={'black'} /> */}

						<TextInput
							style={styles.input}
							placeholder={'Email Address'}
							placeholderTextColor='rgba(0, 105, 0, 0.5)'
							keyboardType="email-address"
							returnKeyType="next"
							autoCorrect={false}
              autoCapitalze='none'
              onChangeText={this.onChangeTextEmail}
              value={this.state.email}
						>
						</TextInput>

						<TextInput
							style={styles.input}
							placeholder="Password"
							placeholderTextColor='rgba(0, 105, 0, 0.5)'
							// underlineColorAndroid={'transparent'}
							//returnKeyType="go"
							autoCorrect={false}
				      onChangeText={this.onChangeTextPassword}
              value={this.state.password}
							secureTextEntry={true}
						// ref={"txtPassword"}
						>
						</TextInput>

						<TouchableOpacity
							style={styles.buttonContainer}
							//onPress={() => this.props.navigation.navigate('Home')} 
//							onPress={() => this.loginUser(this.state.email.trim(), this.state.password)}
onPress={this.onPressLogin}
						>
							<Text style={styles.buttonText}> SIGN IN </Text>
						</TouchableOpacity>


						<TouchableOpacity
							style={[styles.buttonContainer, styles.btnSignup]}
              onPress={() => this.props.navigation.navigate("CreateAccount")} >
							<Text style={styles.buttonText}> SIGN UP INSTEAD </Text>
						</TouchableOpacity>
					</View>
				</View >
			</TouchableWithoutFeedback >


      // <View>
      //   <Text style={styles.title}>Email:</Text>
      //   <TextInput
      //     style={styles.nameInput}
      //     placeHolder="test3@gmail.com"
      //     onChangeText={this.onChangeTextEmail}
      //     value={this.state.email}
      //   />
      //   <Text style={styles.title}>Password:</Text>
      //   <TextInput
      //     style={styles.nameInput}
      //     onChangeText={this.onChangeTextPassword}
      //     value={this.state.password}
      //   />
      //   <Button
      //     title="Login 2"
      //     style={styles.buttonText}
      //     onPress={this.onPressLogin}
      //   />

      //   <Button
      //     title="Go to create new account"
      //     style={styles.buttonText}
      //     onPress={() => this.props.navigation.navigate("CreateAccount")}
      //   />
      // </View>
    );
  }
}
const styles = StyleSheet.create({

	container: {
		flex: 1,
		// backgroundColor: 'white',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	infoContainer: {
		flex: 1,
		// backgroundColor: 'red',
		backgroundColor: 'white',
		height: 300,

	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
		// backgroundColor: 'yellow',
		justifyContent: 'center',
	},
	logo: {
		width: 128,
		marginTop: 50,
		height: 96,
	},
	inputContainer: {
		flex: 1.8,
		paddingTop: 14,
		// backgroundColor: 'blue',
		// height: 200,
	},


	input: {
		backgroundColor: 'white',
		height: 40,
		marginTop: 20,
		marginHorizontal: 30,
		borderRadius: 20,
		borderWidth: 1,
		color: "#555",
		borderColor: 'green',
		paddingHorizontal: 15,
	},
	buttonContainer: {

		marginTop: 25,
		backgroundColor: 'green',
		paddingVertical: 10,
		height: 40,
		// width: 150,
		// alignSelf: 'center',
		alignItems: "center",
		marginHorizontal: 30,
		borderRadius: 20,
	},
	btnSignup: {
		backgroundColor: '#aacc33',
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white',

	}


});

export default Login;
