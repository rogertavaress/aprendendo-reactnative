import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const { data } = await this.loadList();

    this.setState({
      stars: data,
      loading: false,
      refreshing: false,
    });
  }

  async loadList() {
    const { page } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        per_page: 10,
        page,
      },
    });

    return response;
  }

  loadMore = async () => {
    const { stars, page } = this.state;

    await this.setState({
      page: page + 1,
    });

    const { data } = await this.loadList();

    this.setState({
      stars: stars.concat(data),
      loading: false,
    });
  };

  refreshList = async () => {
    await this.setState({
      page: 1,
      refreshing: true,
    });

    const { data } = await this.loadList();

    this.setState({
      stars: data,
      refreshing: false,
    });
  };

  showRepository(repository) {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  }

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#7159c1" size="large" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred
                onPress={() => {
                  this.showRepository(item);
                }}
              >
                <OwnerAvatar
                  source={{
                    uri: item.owner.avatar_url,
                  }}
                />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
