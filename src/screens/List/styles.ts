import styled from 'styled-components/native';
import dark from '../../styles/themes/dark';


export const Container = styled.SafeAreaView`
    background: ${dark.colors.third};
    flex: 1;
`;

export const ViewArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const HandleButton = styled.TouchableOpacity`
    width: 350px;
    height: 220px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const HandleButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${dark.colors.textColor};
`;

export const ImageProfile = styled.Image`
    width: 250px;
    height: 200px;
`;

export const FlatList = styled.FlatList`
    margin-bottom: 5px;
    width: 100%;
    height: 100%;
`;

export const IconLoading = styled.ActivityIndicator`
`;