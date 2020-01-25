import React from 'react'

const TelefoneInputs = (props) => {
    return (
        props.telefonesArray.map((val, idx)=> {
            let telefoneId = `telefone-${idx}`
            return (
            <div key={idx}>
                <label>{`Telefone #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.telefonesArray[idx].numero} 
                    className="numero_telefone"
                />
            </div>
            )
        })
    )
}

export default TelefoneInputs