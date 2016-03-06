import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../components/button';
import ddpClient from '../ddp';
import { GoogleSignin } from 'react-native-google-signin';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  handleDDPSignIn(googleUser) {
    if (googleUser) {
      ddpClient.loginWithGoogle(googleUser, (err, res) => {
        if (err) {
          this.setState({error: err.reason});
        } else {
          this.props.changedSignedIn(true);
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      GoogleSignin.currentUserAsync()
      .then((user) => {
        this.handleDDPSignIn(user)
      })
      .done();
    }
  }

  handleGoogleSignIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.handleDDPSignIn(user)
    })
    .catch((err) => {
      this.setState({error: err.message});
    })
    .done();
  }

  render() {
    let button;

    if (this.props.connected) {
      button = <Button text="Sign In with Google" onPress={this.handleGoogleSignIn.bind(this)}/>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.main}>
          Sign In Screen
        </Text>

        <Text style={styles.error}>{this.state.error}</Text>
        {button}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 5
  },
  buttons: {
    flexDirection: 'row'
  },
  error: {
    color: 'red',
    height: 20
  }
});
