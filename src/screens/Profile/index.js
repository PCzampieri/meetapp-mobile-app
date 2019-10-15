import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

import { updateProfileRequest } from '~/redux/store/modules/user/actions';
import { signOut } from '~/redux/store/modules/auth/actions';

import {
  Container,
  Form,
  Separator,
  FormInput,
  SubmitButton,
  ExitButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setconfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    if (oldPassword.length > 0 && oldPassword === confirmPassword) {
      Alert.alert('Atenção', 'Digite uma nova senha diferente da antiga!');
      return;
    }

    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSubmitExit() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome completo"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />
        <FormInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => oldPasswordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Separator />

        <FormInput
          secureTextEntry
          placeholder="Senha atual"
          ref={oldPasswordRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <FormInput
          secureTextEntry
          placeholder="Nova senha"
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          value={password}
          onChangeText={setPassword}
        />

        <FormInput
          secureTextEntry
          placeholder="Confirmação de senha"
          ref={confirmPasswordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setconfirmPassword}
        />

        <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
        <ExitButton onPress={handleSubmitExit}>Sair do Meetapp</ExitButton>
      </Form>
    </Container>
  );
}

function IconTab({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

IconTab.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: IconTab,
};
