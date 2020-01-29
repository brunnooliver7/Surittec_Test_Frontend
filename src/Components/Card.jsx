import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Card extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientesList: []
        }
        this.deleteCliente = this.deleteCliente.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/clientes')
        .then(response => {
            this.setState({clientesList: response.data})
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    deleteCliente(codigo) {
        if(window.confirm('Tem certeza que deseja deletar este cliente?')) {
            fetch('http://localhost:8080/clientes/'+codigo, {
                method: 'DELETE',
                header: {'Accept':'application/json','Content-Type':'application/json'}
            })
        }
        window.location.reload()
    }

    render() {
        return (
            <div>
                {
                    this.state.clientesList.map(cliente => (    
                        <div key={cliente.codigo} className="card-cliente">
                            <div className="container-1">
                                <img src={clienteImg()} className="card-img-cliente" alt="img"/>
                            </div>
                            <div className="container-2">
                                <h1 className="cliente-nome">{cliente.nome}</h1>
                                <div className="cliente-cpf">{cliente.cpf}</div>
                            </div>
                            <hr className="divisor"/>
                            <div className="container-3">
                                <h2 className="enderecos-title">Endereços</h2>
                                <div className="cliente-endereco">{renderEnderecos(cliente.endereco)}</div>
                            </div>
                            <hr className="divisor"/>
                            <div className="container-4">
                                <h2>Telefones<hr /></h2>
                                <div className="cliente-telefone">{renderTelefones(cliente.telefone)}</div>
                            </div>
                            <hr className="divisor"/>
                            <div className="container-5">
                                <h2>Emails<hr /></h2>
                                <div className="cliente-email">{renderEmails(cliente.email)}</div>
                            </div>
                            <hr className="divisor"/>
                            <div className="container-6">
                                <Link className="btn btn-warning btn-editar" to={"/edit/"+cliente.codigo}>Editar</Link>
                                <button className="btn btn-danger btn-deletar" onClick={()=>this.deleteCliente(cliente.codigo)}>Deletar</button>
                            </div>
                        </div>
                    )) 
                }
            </div>
        )
    }
    
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