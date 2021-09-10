import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = props => {

    const [clientesList, setState] = useState([])

    useEffect(() => {
        var user = localStorage.getItem('user')
        var password = localStorage.getItem('password')
        axios({
            method:'get',
            url: 'http://localhost:8080/clientes',
            auth: {
                username: user,
                password: password
            }
        })
        .then(response => {
            setState(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])
    
    function deleteCliente(codigo) {

        var adminAuthenticated = localStorage.getItem('adminAuthenticated')

        if(adminAuthenticated === 'false') {
            window.alert('Você não está autorizado a deletar clientes')
        } else if(window.confirm('Tem certeza que deseja deletar este cliente?')) {

            let url = 'http://localhost:8080/clientes/'+codigo
            let user = localStorage.getItem('user')
            let password = localStorage.getItem('password')
           
            axios({
                method:'delete',
                url: url,
                auth: {
                    username: user,
                    password: password
                }
            })
        }
        window.location.reload()
    }

    return (
        <div>
            {clientesList.map(cliente => (    
                <div key={cliente.codigo} className="card-cliente">
                    <div className="container-1">
                        <div className="container-1-left">
                            <img src={clienteImg()} className="card-img-cliente" alt="img"/>
                        </div>
                        <div className="container-1-right">
                            <div className="title-1">Informações Pessoais</div>
                            <div className="cliente-nome">
                                <div className="title-2">Nome</div>
                                <hr className="underline-title-2"></hr>
                                {cliente.nome}
                            </div>
                            <div className="cliente-cpf">
                                <div className="title-2">CPF</div>
                                <hr className="underline-title-2"></hr>
                                {cliente.cpf}
                            </div>
                        </div>
                    </div>
                    <hr className="divisor"/>
                    <div className="container-2">
                        <div className="enderecos-title title-1">Endereços</div>
                        <div className="cliente-endereco">{renderEnderecos(cliente.endereco)}</div>
                    </div>
                    <hr className="divisor"/>
                    <div className="container-3">
                        <div className="telefones-title title-1">Telefones</div>
                        <div className="cliente-telefone">{renderTelefones(cliente.telefone)}</div>
                    </div>
                    <hr className="divisor"/>
                    <div className="container-4">
                        <div className="emails-title title-1">Emails</div>
                        <div className="cliente-email">{renderEmails(cliente.email)}</div>
                    </div>
                    <hr className="divisor"/>
                    <div className="container-5">
                        <Link className="btn btn-warning btn-editar" to={"/edit/"+cliente.codigo}>Editar</Link>
                        <button className="btn btn-danger btn-deletar" onClick={()=>deleteCliente(cliente.codigo)}>Deletar</button>
                    </div>
                </div>
            ))}
        </div>
    )
    
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
                <div className="title-2">Endereço {i+1}</div>
                <hr className="underline-title-2"/>
                <div className="text">CEP: {enderecos[i].cep}</div>
                <div className="text">Logradouro: {enderecos[i].logradouro}</div>
                <div className="text">Bairro: {enderecos[i].bairro}</div>
                <div className="text">Cidade: {enderecos[i].cidade}</div>
                <div className="text">UF: {enderecos[i].uf}</div>
                <div className="text">Complemento: {enderecos[i].complemento}</div>
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
                <div className="title-2">Telefone {i+1}</div>
                <hr className="underline-title-2"/>
                <div>{telefones[i].tipo}</div>
                <div>{telefones[i].numero}</div>
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
                <div className="title-2">Email {i+1}</div>
                <hr className="underline-title-2"/>
                <div>{emails[i].email}</div>
            </div>
        )
    }
    return(<div>{itens}</div>)
}

export default Card