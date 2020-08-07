// Arquivo para lidar com a navegação em abas

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Pacote que contém is ícones das abas

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                // Estilo do container das abas
                style: {
                    elevation: 0, // Propriedade de sombras no android. É o box-shadow do CSS
                    shadowOpacity: 0, // // Propriedade de sombras no IOS
                    height: 64,
                },
                // Estilização de cada uma das abas
                tabStyle: {
                    flexDirection: 'row', // Para ícone e texto ficarem lado a lado
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                // Estilização dos ícones das abas
                iconStyle: {
                    flex: 0, // Impedindo que os ícones ocupem o máximo do tamanho possível
                    width: 20,
                    height: 20,
                },
                // Estilização do label das abas
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                // Cor de fundo da aba quando não selecionada
                inactiveBackgroundColor: '#fafafc',
                // Cor do texto da aba não selecionada
                inactiveTintColor: '#c1bccc',

                // Cor de fundo da aba quando selecionada
                activeBackgroundColor: '#ebebf5',
                // Cor do texto da aba selecionada
                activeTintColor: '#32264d',
            }}
        
        >
            {/*Abas da página*/}
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys', // Edita os labels das abas
                    tabBarIcon: ({ color, size, focused }) => { // Propriedades padrão resgatadas do próprio label
                        // Se o botão não estiver com o foco, sua cor será a mesma de seu label sem foco (inactiveTintColor: '#c1bccc')
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />

            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => { 
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;