import React from 'react'

const EnderecoInputs = (props) => {
    return (
        props.enderecosArray.map((val, idx)=> {
            let enderecoId = `endereco-${idx}`
            return (
            <div key={idx}>
                <label>{`CEP #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].cep} 
                    className="cep"
                />
                <label>{`Logradouro #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].logradouro} 
                    className="logradouro"
                />
                <label>{`Bairro #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].bairro} 
                    className="bairro"
                />
                <label>{`Cidade #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].cidade} 
                    className="cidade"
                />
                <label>{`UF #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].uf} 
                    className="uf"
                />
                <label>{`Complemento #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.enderecosArray[idx].complemento} 
                    className="complemento"
                />
            </div>
            )
        })
    )
}

export default EnderecoInputs