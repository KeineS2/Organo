import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';

const firebaseConfig = {
  apiKey: "AIzaSyBE9QrOdUirsv_hVUDF-gIQ409GoGPPe_c",
  authDomain: "organograma-f53a8.firebaseapp.com",
  projectId: "organograma-f53a8",
  storageBucket: "organograma-f53a8.appspot.com",
  messagingSenderId: "453034505719",
  appId: "1:453034505719:web:eb74466069e7b6354c6af2",
  measurementId: "G-PJRF8D0RH2"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const funcionariosCollection = collection(db, "funcionarios");


function App() {

  const times = [
    {
      nome:'Programação',
      corPrimaria: '#57C278',
      corSecundaria: '#D9F7E9'
    },
    {
      nome: 'Front-End',
      corPrimaria: '#82CFFA',
      corSecundaria: '#E8F8FF'
    },
    {
      nome: 'Data Science',
      corPrimaria: '#A6D157',
      corSecundaria: '#F0F8E2'
    },
    {
      nome: 'Devops',
      corPrimaria: '#E06B69',
      corSecundaria: '#FDE7E8'
    },
    {
      nome: 'UX e Design',
      corPrimaria: '#DB6EBF',
      corSecundaria: '#FAE9F5'
    },
    {
      nome: 'Mobile',
      corPrimaria: '#FFBA05',
      corSecundaria: '#FFF5D9'
    },
    {
      nome: 'Inovação e Gestão',
      corPrimaria: '#FF8A29',
      corSecundaria: '#FFEEDF'
    },
  ]

  const [colaboradores, setColaboradores] = useState([]);

  

  useEffect(() => {
    const carregarColaboradores = async () => {
      const querySnapshot = await getDocs(funcionariosCollection);
      const colaboradoresData = querySnapshot.docs.map((doc) =>({...doc.data(),id: doc.id}));
      console.log(colaboradoresData)
      setColaboradores(colaboradoresData);
    };

    carregarColaboradores();
}, []);


    const aoNovoColaboradorAdicionado = async (colaborador) => {
      try {
        // Adicionar um novo colaborador ao Firestore
        const novoColaboradorRef = await addDoc(collection(db, "funcionarios"), colaborador);
        console.log("Novo colaborador adicionado com ID:", novoColaboradorRef.id);
        setColaboradores([...colaboradores, colaborador]);
      } catch (error) {
        console.error("Erro ao adicionar novo colaborador:", error);
      }
    };
    
    const removerColaborador = async (id) => {
  try {
    // Remover o colaborador do Firestore
    await deleteDoc(doc(db, "funcionarios", id));
    console.log("Colaborador removido com sucesso");
    const updatedColaboradores = colaboradores.filter(
      (colaborador) => colaborador.id !== id
    );
    setColaboradores(updatedColaboradores);
  } catch (error) {
    console.error("Erro ao remover colaborador:", error);
  }
};
    

  return (
    <div className="App">
      <Banner />
      <Formulario
        times={times.map((time) => time.nome)}
        aoColaboradorCadastrado={(colaborador) =>
          aoNovoColaboradorAdicionado(colaborador)
        }
      />

      {times.map((time) => (
        <Time
          key={time.nome}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          corSecundaria={time.corSecundaria}
          colaboradores={colaboradores.filter(
            (colaborador) => colaborador.time === time.nome
          )}
          onRemoverColaborador={(colaboradorId) =>
            removerColaborador(colaboradorId)
          }
        />
      ))}
      <Rodape />
    </div>
  );
}

export default App;
