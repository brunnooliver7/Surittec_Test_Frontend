import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from "../Card"

const Client = props => (
    <tr>
        {/* {console.log(props.cliente)} */}
        <td>{props.cliente.nome}</td>
        <td>{props.cliente.cpf}</td>
        <td><Endereco  enderecoArray={props.cliente.endereco} /></td>
        {/* <td>{props.cliente.endereco}</td> */}
        {/* <td>{props.cliente.telefone}</td> */}
        {/* <td>{props.cliente.email}</td> */}
        <td>
            <Link to={"/edit/"+props.cliente.codigo}>Editar</Link>
        </td>
    </tr>
) 

const Endereco = props => {

    let enderecoArray = props.enderecoArray
    let itens = []
    for (let i = 0; i < enderecoArray.length; i++) { 
        itens.push(
            <option key={i}>
                {enderecoArray[i].codigo}
            </option>
        )
    }
    return(<select>{itens}</select>)
}

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientesList: []
        }
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
    
    clientListMap() {
        return this.state.clientesList.map(function(cliente, i) {
            return <Client cliente={cliente} key={i} />
        })
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
                <input 
                    className='form-control'
                    placeholder='Procure por um cliente'
                />
                <h3 style={{marginTop:20}}>Lista</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereços</th>
                            <th>Telefones</th>
                            <th>Emails</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.clientListMap() }
                    </tbody>
                </table>
                <Card list={this.state.clientesList}/>
            </div>
        )
    }
}

export default List