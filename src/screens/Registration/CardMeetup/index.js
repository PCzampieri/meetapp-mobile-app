import React, { useEffect, useState } from 'react';

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
} from './styles';

export default function MeetupCard({ data, handleCancel }) {
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
      <Banner source={{ uri: meetups.url }} />

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
          <TextContent>Organizador: {meetups.name}</TextContent>
        </TextInfo>

        <ButtonRegistration onPress={handleCancel}>
          Cancelar inscrição
        </ButtonRegistration>
      </Info>
    </Container>
  );
}

MeetupCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleCancel: PropTypes.func.isRequired,
};
