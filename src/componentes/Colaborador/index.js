import React from 'react';
import './Colaborador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Colaborador = ({ id, nome, imagem, cargo, corDeFundo, onRemoverColaborador }) => {
    const handleRemoverColaborador = (id) => {
      onRemoverColaborador(id);
    };

  return (
    <div className='colaborador'>
      <div className='cabecalho' style={{ backgroundColor: corDeFundo }}>
      <button className='botaoLixeira'onClick={()=> handleRemoverColaborador(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <img src={imagem} alt='Foto do Colaborador' />
      </div>
      <div className='rodape'>
        <h4>{nome}</h4>
        <h5>{cargo}</h5>
      </div>
    </div>
  );
};

export default Colaborador;
