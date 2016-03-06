import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../components/button';
import ddpClient from '../ddp';
import { GoogleSignin } from 'react-native-google-signin';

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  _userObserver = null;
  componentDidMount() {
    ddpClient.user()
      .then((user) => {
        this.setState({user})
      })
  }

  componentWillUnmount() {
    this._userObserver && this._userObserver.stop();
  }

  handleSignOut() {
    GoogleSignin.signOut()
    .then(() => {
      ddpClient.logout(() => {
        this.props.changedSignedIn(false);
      });
    })
    .catch((err) => {
      console.log('google sign out error', err);
    });
  }

  render() {
    let { user } = this.state;
    let email;

    if (user) {
      email = user.emails[0].address;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.main}>
          Sign Out Screen
        </Text>
        <Text>{email}</Text>
        <Button text="Sign Out" onPress={() => this.handleSignOut()}/>
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
  }
});
