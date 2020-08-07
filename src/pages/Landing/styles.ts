import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, // Para que o container ocupe todo espaço da tela disponível
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40, // Unidade padrão: pixels
    },

    banner: {
        // Faz com que a imagem ocupe o tamanho disponível de largura
        width: '100%',

        // Faz com que as dimensões da imagem sejam reajustadas proporcionalmente
        // à largura ou à altura, mantendo o conteúdo da imagem visível
        resizeMode: 'contain',
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 60,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer: {
        flexDirection: 'row', // Dispondo os botões um do lado do outro
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 150,
        width: '48%', // Para que exista um espaçamento de 4% entre os botões
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: '#9871f5',
    },

    buttonSecondary: {
        backgroundColor: '#04d361',
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 17,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40
    }

});

export default styles;
