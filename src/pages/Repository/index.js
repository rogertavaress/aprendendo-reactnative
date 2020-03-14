import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    url: '',
  };

  componentDidMount() {
    const { navigation } = this.props;

    console.log(navigation.getParam('repository').url);

    this.setState({
      url: navigation.getParam('repository').html_url,
    });
  }

  render() {
    const { url } = this.state;

    return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
  }
}
