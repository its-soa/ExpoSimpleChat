import React from 'react';
import { Constants, } from 'expo';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
  Keyboard, StatusBar,Image, Button } from 'react-native';
import bgImage from '../images/AOTLagos-black.png';
import firebaseSvc from '../FirebaseSvc';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'SIGN UP',
  };

  state = {
    name: '',
    email: '',
    password: '',
    avatar: '',
  };

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize/ratio;
        // check vertical or horizontal
        if(rawheight > rawwidth){
            wantedwidth = wantedMaxSize*ratio;
            wantedheight = wantedMaxSize;
        }
        console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
        // let resizedUri = await new Promise((resolve, reject) => {
        //   ImageEditor.cropImage(pickerResult.uri,
        //   {
        //       offset: { x: 0, y: 0 },
        //       size: { width: pickerResult.width, height: pickerResult.height },
        //       displaySize: { width: wantedwidth, height: wantedheight },
        //       resizeMode: 'contain',
        //   },
        //   (uri) => resolve(uri),
        //   () => reject(),
        //   );
        // });
        let uploadUrl = await firebaseSvc.uploadImage();
        //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
        await this.setState({ avatar: uploadUrl });
        console.log(" - await upload successful url:" + uploadUrl);
        console.log(" - await upload successful avatar state:" + this.state.avatar);
        await firebaseSvc.updateAvatar(uploadUrl); //might failed
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

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
						placeholder={'Your Name'}
						placeholderTextColor='rgba(0, 105, 0, 0.5)'
						keyboardType="email-address"
						returnKeyType="next"
						autoCorrect={false}
						autoCapitalze='none'
            onChangeText={this.onChangeTextName}
            value={this.state.name}
						//value={this.state.name}
					// onSubmitEditing={()=>this.refs.txtPassword.focus()}
					>
					</TextInput>
				
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
					// onSubmitEditing={()=>this.refs.txtPassword.focus()}
					>
					</TextInput>

					<TextInput
						style={styles.input}
						placeholder="Password"
						placeholderTextColor='rgba(0, 105, 0, 0.5)'
						// underlineColorAndroid={'transparent'}
						returnKeyType="go"
						autoCorrect={false}
					  onChangeText={this.onChangeTextPassword}
            value={this.state.password}
						secureTextEntry={true}
					// ref={"txtPassword"} 
					>
					</TextInput> 

					<TouchableOpacity
						style={[styles.buttonContainer, styles.btnSignup]}
            onPress={this.onPressCreate} >
						<Text style={styles.buttonText}> SIGN UP </Text>
					</TouchableOpacity>

						<TouchableOpacity
						style={styles.buttonContainer}
						//onPress={() => this.props.navigation.navigate('Home')} 
						onPress={() => this.props.navigation.navigate('Login')}
						>
						<Text style={styles.buttonText}> SIGN IN INSTEAD </Text>
					</TouchableOpacity>

          <TouchableOpacity
						style={styles.buttonContainer}
            onPress={this.onImageUpload}
						>
						<Text style={styles.buttonText}> Upload Profile Pic</Text>
					</TouchableOpacity>

            {/* <Button
          title="Upload Avatar Image"
          style={styles.buttonText}
          onPress={this.onImageUpload}
        /> */}
				</View>
			</View>
		</TouchableWithoutFeedback>

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
      //   <Text style={styles.title}>Name:</Text>
      //   <TextInput
      //     style={styles.nameInput}
      //     onChangeText={this.onChangeTextName}
      //     value={this.state.name}
      //   />
      //   <Button
      //     title="Create Account"
      //     style={styles.buttonText}
      //     onPress={this.onPressCreate}
      //   />
      //   <Button
      //     title="Upload Avatar Image"
      //     style={styles.buttonText}
      //     onPress={this.onImageUpload}
      //   />
      // </View>
    );
  }
}

const offset = 16;
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
		backgroundColor: '#aacc33',
		paddingVertical: 10,
		height: 40,
		// width: 150,
		// alignSelf: 'center',
		alignItems: "center",
		marginHorizontal: 30,
		borderRadius: 20,
	},
	btnSignup: {
		backgroundColor: '#b3b300',
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white',

	}

});

export default CreateAccount;
