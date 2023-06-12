import Colaborador from '../Colaborador'
import './Time.css'

const Time = (props) =>{
    const css = { backgroundColor: props.corSecundaria }
    const border = { borderColor: props.corPrimaria }

    const removerColaborador = (colaboradorId) => {
        // Chame a função de callback onRemoverColaborador passando o ID do colaborador
        props.onRemoverColaborador(colaboradorId);
      };

      return (
        props.colaboradores.length > 0 && (
          <section className='time' style={css}>
            <h3 style={border}>{props.nome}</h3>
            <div className='colaboradores'>
              {props.colaboradores.map((colaborador) => (
                <Colaborador
                  corDeFundo={props.corPrimaria}
                  key={colaborador.nome}
                  id={colaborador.id}
                  nome={colaborador.nome}
                  cargo={colaborador.cargo}
                  imagem={colaborador.imagem}
                  onRemoverColaborador={() => removerColaborador(colaborador.id)} // Chame a função de remoção do colaborador ao clicar no botão de lixeira
                />
              ))}
            </div>
          </section>
        )
      );
    };

export default Time