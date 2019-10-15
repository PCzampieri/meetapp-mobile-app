import React, { useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';

import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/redux/store/modules/auth/actions';

import Header from '~/components/Header';
import CardMeetup from './CardMeetup';

import {
  Container,
  Loading,
  List,
  SelectedDate,
  ButtonDate,
  DateText,
  Msg,
} from './styles';

function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get('meetups', {
      params: {
        date: format(date, 'yyyy-MM-dd').toString(),
        page: pageNumber,
      },
    });

    const totalItems = response.headers['x-total-count'];

    setTotal(Math.ceil(totalItems / 10));
    setMeetups(shouldRefresh ? response.data : [...meetups, ...response.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    try {
      setMeetups([]);
      loadPage(1, true);
    } catch (err) {
      const { status } = err.response;

      if (status === 401) {
        dispatch(signOut());
        Alert.alert('Sessão Expirada', 'Favor efetuar login novamente');
      }
    }
  }, [date, dispatch]); // eslint-disable-line

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubmitRegistration(meetup_id) {
    try {
      await api.post(`/meetups/${meetup_id}/registrations`);
      Alert.alert('Inscrição realizada', 'salvo com sucesso!');

      navigation.navigate('Registration');
    } catch (err) {
      const { status } = err.response;

      if (status === 402) {
        Alert.alert(
          'Inscrição já realizada',
          'você está inscrito neste Meetup'
        );
        return;
      }

      if (status === 403) {
        Alert.alert(
          'Não permitido',
          'você está inscrito em uma Meetup no mesmo horário'
        );
        return;
      }

      if (status === 409) {
        Alert.alert(
          'Você é o organizador',
          'Não é permitido se increver no meetup que você organiza'
        );
      }
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  return (
    <Container>
      <Header />
      <SelectedDate>
        <ButtonDate onPress={handlePrevDay}>
          <Icon name="chevron-left" size={30} color="#FFF" />
        </ButtonDate>
        <DateText>{dateFormatted}</DateText>
        <ButtonDate onPress={handleNextDay}>
          <Icon name="chevron-right" size={30} color="#FFF" />
        </ButtonDate>
      </SelectedDate>

      {meetups.length === 0 ? (
        <Msg>Sem Meetups para data selecionada :)</Msg>
      ) : (
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <CardMeetup
              data={item}
              handleSubmitButton={() => handleSubmitRegistration(item.id)}
            />
          )}
        />
      )}
    </Container>
  );
}

function IconTab({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

IconTab.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: IconTab,
};

Dashboard.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withNavigationFocus(Dashboard);
