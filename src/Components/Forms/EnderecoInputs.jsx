import React from 'react'

const EnderecoInputs = (props) => {
    return (
        props.enderecosArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <h3>Endereco {`${idx + 1}`}</h3>
                <div className="form-item">
                    <label className="form-label">{`CEP #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].cep} 
                        className="cep"
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Logradouro #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].logradouro} 
                        className="logradouro"
                    />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Bairro #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].bairro} 
                        className="bairro"
                    />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Cidade #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].cidade} 
                        className="cidade"
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`UF #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].uf} 
                        className="uf"
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Complemento #${idx + 1}`}</label>
                    <br/>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].complemento} 
                        className="complemento"
                        />
                </div>
            </div>
            )
        })
    )
}

export default EnderecoInputs