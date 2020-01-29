import React, { Component } from 'react'

// export default class EnderecoInputs extends Component{

// }

const EnderecoInputs = (props) => {
    return (
        props.enderecosArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <div>
                    <div className="endereco-enum">Endereco {`${idx + 1}`}</div>
                </div>
                <div className="form-item">
                    <label className="form-label">{`CEP ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].cep} 
                        className="cep form-control"
                        placeholder={`CEP ${idx + 1}`}
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Logradouro ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].logradouro} 
                        className="logradouro form-control" 
                        placeholder={`Logradouro ${idx + 1}`}
                    />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Bairro ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].bairro} 
                        className="bairro form-control"
                        placeholder={`Bairro ${idx + 1}`}
                    />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Cidade ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].cidade} 
                        className="cidade form-control"
                        placeholder={`Cidade ${idx + 1}`}
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`UF ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].uf} 
                        className="uf form-control"
                        placeholder={`UF ${idx + 1}`}
                        />
                </div>
                <div className="form-item">
                    <label className="form-label">{`Complemento ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={props.enderecosArray[idx].complemento} 
                        className="complemento form-control"
                        placeholder={`Complemento ${idx + 1}`}
                        />
                </div>
            </div>
            )
        })
    )
}

export default EnderecoInputs