import React, { useState, } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    // Estado para armazenar os professores favoritos no storage local
    const [favorites, setFavorites] = useState([]);

    // Função explicada no TeacherList/index.tsx
    function loadFavorites() {
        // Resgatando a lista de professores favoritos do storage local
        AsyncStorage.getItem('favorites')
            .then(response => {
                if(response) {
                    // Dado que estes dados são salvos em texto, é preciso convertê-los para JSON
                    const favoritedTeachers = JSON.parse(response);
                    setFavorites(favoritedTeachers);
                }    
            }).catch(error => {
                console.log(`Falha ao recuperar lista de professores favoritos: ${error}`)
            });
    }

    // Função executada somente quando a tela é carregada, mesmo que em abas
    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            {/*
            Para immplementar a rolagem na tela
                contentContainerStyle: aplicando estilos no conteúdo da ScrollView;
                melhor para aplicar padding.
            */}
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) =>{
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
    
}

export default Favorites;