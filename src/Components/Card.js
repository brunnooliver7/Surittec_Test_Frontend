import React from 'react'

const Card = props => {

    const renderCard = () => {
        
        const list = props.list || []
        console.log(list)
        
        return list.map(cliente => (
            
            <div key={cliente.codigo} className="card">
                <div className="container-1">
                    <img src={clienteImg()} className="card-img" alt="img"/>
                </div>
                <br className="divisor"/>
                <div className="container-2">
                    <h1 className="cliente-name">{cliente.nome}</h1>
                    <div className="cliente-cpf">{cliente.cpf}</div>
                </div>
                <br className="divisor"/>
                <div className="container-3">
                    <h2 className="enderecos-title">Endereços <hr /></h2>
                    <div className="cliente-endereco">{renderEnderecos(cliente.endereco)}</div>
                </div>
                <br className="divisor"/>
                <div className="container-4">
                    <h2>Telefones<hr /></h2>
                    <div className="cliente-telefone">{renderTelefones(cliente.telefone)}</div>
                </div>
                <br className="divisor"/>
                <div className="container-5">
                    <h2>Emails<hr /></h2>
                    <div className="cliente-email">{renderEmails(cliente.email)}</div>
                </div>
            </div>
        ))
    }
    
    const clienteImg = () => {
        var link = "https://randomuser.me/api/portraits/men/"
        var min=0; 
        var max=99;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min; 
        link = link.concat(random)
        link = link.concat(".jpg")
        return link
    }

    const renderEnderecos = (enderecos) => {
        let itens = []
        for (let i = 0; i < enderecos.length; i++) { 
            itens.push(
                <div className="cliente-endereco-itens" key={i}>
                    <h3>Endereço {i+1} <hr/></h3>
                    <p>CEP: {enderecos[i].cep}</p>
                    <p>Logradouro: {enderecos[i].logradouro}</p>
                    <p>Bairro: {enderecos[i].bairro}</p>
                    <p>Cidade: {enderecos[i].cidade}</p>
                    <p>UF: {enderecos[i].uf}</p>
                    <p>Complemento: {enderecos[i].complemento}</p>
                </div>
            )
        }
        return(<div>{itens}</div>)
    }

    const renderTelefones = (telefones) => {
        let itens = []
        for (let i = 0; i < telefones.length; i++) { 
            itens.push(
                <div className="cliente-telefone-itens" key={i}>
                    <p>{telefones[i].numero}</p>
                </div>
            )
        }
        return(<div>{itens}</div>)
    }

    const renderEmails = (emails) => {
        let itens = []
        for (let i = 0; i < emails.length; i++) { 
            itens.push(
                <div className="cliente-email-itens" key={i}>
                    <p>{emails[i].email}</p>
                </div>
            )
        }
        return(<div>{itens}</div>)
    }

    return(
        <div>
            {renderCard()}
        </div>
    )
}

export default Card