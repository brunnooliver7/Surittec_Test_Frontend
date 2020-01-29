import React from 'react'

const TelefoneInputs = (props) => {
    return (
        props.telefonesArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <label>{`Telefone ${idx + 1}`}</label>
                <input
                    type="tel"
                    data-id={idx}
                    defaultValue={props.telefonesArray[idx].numero} 
                    className="numero form-control"
                    placeholder={`Telefone ${idx + 1}`}
                />
            </div>
            )
        })
    )
}

export default TelefoneInputs