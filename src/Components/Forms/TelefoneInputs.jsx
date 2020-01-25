import React from 'react'

const TelefoneInputs = (props) => {
    return (
        props.telefonesArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <label>{`Telefone #${idx + 1}`}</label>
                <input
                    type="tel"
                    pattern="\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}"
                    data-id={idx}
                    defaultValue={props.telefonesArray[idx].numero} 
                    className="numero"
                />
                {/* <label for="txttelefone">Telefone</label>
                <input type="tel" name="txttelefone" id="txttelefone" pattern="\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}" />
                <script type="text/javascript">$("#txttelefone").mask("(00) 0000-00009");</script> */}
            </div>
            )
        })
    )
}

export default TelefoneInputs