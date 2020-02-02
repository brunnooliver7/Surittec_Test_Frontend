import React, { Component } from 'react'

import Card from "../Components/Card"

export default class List extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            clientesList: []
        }
    }
    
    componentDidMount() {
        var userAuthenticated = localStorage.getItem('userAuthenticated')
        if(userAuthenticated === 'false') {
            window.location.replace("http://localhost:3000/login")
        }
    }

    Alert = () => {
        var userAuthenticated = localStorage.getItem('userAuthenticated')
        var adminAuthenticated = localStorage.getItem('adminAuthenticated')
        if(userAuthenticated === 'true' && adminAuthenticated === 'false') {
            return (
                <div className="alert alert-warning" role="alert">
                    Bem vindo, usuário! <br />
                    Atenção! Você só possui autorização para visualizar os dados dos clientes cadastrados. 
                    Você não pode registrar novos clientes nem editar os já existentes.
                </div>
            )
        } else {
            return(
                <div className="alert alert-success" role="alert">
                    Bem vindo, administrador! <br />
                    Você pode visualizar os clientes registrados, criar novos ou editar os já existentes.
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                    <this.Alert/>
                    <Card />
            </div>
        )
    }
}
