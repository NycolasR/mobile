import { StatusBar } from "expo-status-bar";
import React from "react";
import AppStack from "./src/routes/AppStack";
import { AppLoading } from 'expo'; // Componente responsável pela terra de loading

// O useFonts pode ser importado de qualquer um dos dois e só é necessário um
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'; 
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';


export default function App() {
  // Esta variável estará setada em true quando todas as fontes forem carregadas
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if(!fontsLoaded) { // Enquanto as fontes não forem carregadas, será exibida o loading
    return <AppLoading />;
  } else { // Quando carregarem, o conteúdo será exibido

    // É necessário retornar um componente envolto em outra tag como:
    // <View>: irá gerar um elemento adicional na tela
    // <>: fragment, tag vazia 
    return (
      <>
        <AppStack />
        {/*Responsável pela configuração do comportamento da Status bar*/}
        <StatusBar style="light" />
      </>
    );
  }

}
