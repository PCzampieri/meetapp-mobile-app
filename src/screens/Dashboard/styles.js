import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#FFF',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const SelectedDate = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 30px 0 30px;
`;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 0 15px 0 15px;
`;

export const ButtonDate = styled.TouchableOpacity`
  justify-content: center;
  margin: 0;
  padding: 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
})``;

export const Msg = styled.Text`
  margin-top: 150px;
  align-self: center;
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;
