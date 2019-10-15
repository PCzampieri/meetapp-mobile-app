import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
})`
  margin-top: 20px;
`;

export const Msg = styled.Text`
  margin-top: 200px;
  align-self: center;
  justify-content: center;

  font-size: 16px;
  font-weight: bold;
  color: #999;
`;
