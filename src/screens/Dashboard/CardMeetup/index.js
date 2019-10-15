import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Title,
  Banner,
  Info,
  TextInfo,
  ButtonRegistration,
  TextContent,
  TextSpan,
} from './styles';

export default function MeetupCard({ data, handleSubmitButton }) {
  const user = useSelector(state => state.user.profile);

  const [meetups, setMeetups] = useState(data);

  useEffect(() => {
    const dateFormatted = format(
      parseISO(data.date),
      "d 'de' MMMM',' 'às' H'h'",
      {
        locale: pt,
      }
    );

    setMeetups({ ...data, dateFormatted });
  }, [data]);

  return (
    <Container>
      <Banner source={{ uri: meetups.banner.url }} />

      <Info>
        <Title>{meetups.title}</Title>

        <TextInfo>
          <Icon name="event" size={14} color="#999" />
          <TextContent>{meetups.dateFormatted}</TextContent>
        </TextInfo>
        <TextInfo>
          <Icon name="place" size={14} color="#999" />
          <TextContent>{meetups.location}</TextContent>
        </TextInfo>
        <TextInfo>
          <Icon name="person" size={14} color="#999" />
          <TextContent>Organizador: {meetups.user.name}</TextContent>
        </TextInfo>

        {meetups.user.id === user.id ? (
          <TextSpan>* Você é o Organizador</TextSpan>
        ) : (
          <ButtonRegistration past={meetups.past} onPress={handleSubmitButton}>
            Realizar inscrição
          </ButtonRegistration>
        )}
      </Info>
    </Container>
  );
}

MeetupCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmitButton: PropTypes.func.isRequired,
};
