// Arquivo para lidar com a navegação em pilha

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

// Retorno: Navigator e Screen
// Cada tela da navegação será uma Screen
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        // O NavigationContainer só está aqui porque 
        // ele precisa estar no nível mais superior das rotas
        // e ele só precisa aparecer uma única vez
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                {/*Componente exibido quando o usuário estiver nesta Screen*/}
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />

                {/*
                    Isto faz parte estilo de navegação misto onde se tem navegação em pilha e em abas.
                    Este componente levará o usuário a uma tela que é dividida em 2 abas.
                */}
                <Screen name="Study" component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;