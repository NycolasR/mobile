import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';


function TeacherList() {
    // Estado para armazenar os professores favoritos no storage local
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        // Resgatando a lista de professores favoritos do storage local
        AsyncStorage.getItem('favorites')
            .then(response => {
                if(response) {
                    // Dado que estes dados são salvos em texto, é preciso convertê-los para JSON
                    const favoritedTeachers = JSON.parse(response);
                    const favoritedTeachersIds = favoritedTeachers.map((favoritedTeacher: Teacher) => { 
                        return favoritedTeacher.id
                    });

                    setFavorites(favoritedTeachersIds);
                }    
            }).catch(error => {
                console.log(`Falha ao recuperar lista de professores favoritos: ${error}`)
            });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    // Estado para a lista de professores
    const[teachers, setTeachers] = useState([]);


    // Estados para os filtros
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function handleFiltersSumbit() {
        loadFavorites(); // Carrega-se os favoritos sempre q uma filtragem é realizada

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    // Estado usado para armazenar o estado da visibilidade dos filtros
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    function handleToggleFiltersVisible() {
        // Irá inverter e setar o novo valor de isFiltersVisible
        //console.log(isFiltersVisible);
        setIsFiltersVisible(!isFiltersVisible); 
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        
                        {/*onChangeText: mesmo funcionamento do onChange da aplicação para web*/}
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => {setWeekDay(text)}}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>

                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSumbit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

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
                {/*
                    Para verificar se um professor faz parte da lista de favoritos,
                    é verificado se seu ID está na lista de IDs dos professores favoritados.
                */}
                {teachers.map((teacher:Teacher) =>{
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;
