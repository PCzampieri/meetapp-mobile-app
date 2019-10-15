import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0 20px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  height: 50px;
  background: #e5556e;
  margin-top: 5px;
`;

export const ExitButton = styled(Button)`
  height: 42px;
  background: #d44059;
  margin-top: 15px;
`;
