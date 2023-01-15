import styled from 'styled-components/native';
import dark from '../../styles/themes/dark';

export const Container = styled.SafeAreaView`
    background: ${dark.colors.primary};
    flex: 1;
`;

export const ViewArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const HandleButton = styled.TouchableOpacity`
    background: ${dark.colors.textColor};
    width: 40%;
    height: 35px;
    border-radius: 10px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

export const HandleButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${dark.colors.third};
`;

export const ImageProfile = styled.Image`
    width: 280px;
    height: 280px;
    margin-bottom: 40px;


`;