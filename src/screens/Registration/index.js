import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import MeetupCard from './CardMeetup';

import { Container, List, Msg } from './styles';
import api from '~/services/api';
import { signOut } from '~/redux/store/modules/auth/actions';

function Registration({ isFocused, navigation }) {
  const dispatch = useDispatch();

  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('registrations');

        setMeetups(response.data);
      } catch (err) {
        const { status } = err.response;

        if (status === 401) {
          dispatch(signOut());
          Alert.alert('Sessão Expirada', 'Favor efetuar login novamente');
        }
      }
    }
    loadMeetups();
  }, [dispatch, isFocused]);

  async function handleCancel(id) {
    await api.delete(`/registrations/${id}`);
    Alert.alert('Inscrição cancelada', 'Inscrição cancelada com sucesso!');
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <Header />
      {meetups.length === 0 ? (
        <Msg>Nenhuma inscrição em Meetups :)</Msg>
      ) : (
        <List
          data={meetups}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <MeetupCard
              data={item}
              handleCancel={() => handleCancel(item.registration_id)}
            />
          )}
        />
      )}
    </Container>
  );
}

function IconTab({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

IconTab.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Registration.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: IconTab,
};

Registration.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withNavigationFocus(Registration);
