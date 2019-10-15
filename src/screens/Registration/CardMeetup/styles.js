import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TextInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TextContent = styled.Text`
  font-size: 13px;
  color: #999;
  padding: 0;
  margin-left: 5px;
`;

export const ButtonRegistration = styled(Button)`
  height: 40px;
  background: #d44059;
  font-size: 16px;
`;
