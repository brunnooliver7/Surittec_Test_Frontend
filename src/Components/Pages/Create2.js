import React, { Component } from 'react'
import axios from 'axios'

import DForm from '../Forms/DForm'
import TelefoneInputs from '../Forms/TelefoneInputs'
import EmailInputs from '../Forms/EmailInputs'
import EnderecoInputs from '../Forms/EnderecoInputs'

class Create extends Component {
    
    constructor (props) {

        super(props)

        this.state = {
            cliente_nome: '',
            cliente_cpf: '',
            cliente_endereco: [{
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ''
            }],
            cliente_telefone: [{numero_telefone: ''}],
            cliente_email: [{email: ''}]
        }

        // Bind Nome
        this.handleChangeNome = this.handleChangeNome.bind(this)
        // Bind CPF
        this.handleChangeCPF = this.handleChangeCPF.bind(this)
        // Bind Telefone
        this.handleChangeTelefone = this.handleChangeTelefone.bind(this)
        this.addTelefone = this.addTelefone.bind(this)
        // Bind Email
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.addEmail = this.addEmail.bind(this)
        // Bind Endereco
        this.handleChangeEndereco = this.handleChangeEndereco.bind(this)
        this.addEndereco = this.addEndereco.bind(this)
        // Submit
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    // FUNÇÕES NOME
    handleChangeNome = (e) => {
        this.setState({
            cliente_nome: e.target.value
        })
    }    
    // FUNÇÕES CPF
    handleChangeCPF = (e) => {
        this.setState({
            cliente_cpf: e.target.value
        })
    }    
    // FUNÇÕES ENDEREÇO
    addEndereco = (e) => {
        this.setState((prevState) => ({
            cliente_endereco: [...prevState.cliente_endereco, {cep:"", logradouro:""}],
        }));
        console.log(this.state)
    }
    handleChangeEndereco = (e) => {
        if ( ["cep","logradouro","bairro","cidade","uf","complemento"].includes(e.target.className) ) {
          let enderecosChange = [...this.state.cliente_endereco]
          enderecosChange[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ enderecosChange }, () => console.log(this.state.cliente_endereco))
        }
    }
    // FUNÇÕES TELEFONE
    addTelefone = (e) => {
        this.setState((prevState) => ({
            cliente_telefone: [...prevState.cliente_telefone, {numero_telefone:""}],
        }));
        console.log(this.state)
    }
    handleChangeTelefone = (e) => {
        if ( ["numero_telefone"].includes(e.target.className) ) {
          let telefonesChange = [...this.state.cliente_telefone]
          telefonesChange[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ telefonesChange }, () => console.log(this.state.cliente_telefone))
        }
    }
    // FUNÇÕES EMAIL
    addEmail = (e) => {
        this.setState((prevState) => ({
            cliente_email: [...prevState.cliente_email, {email:""}],
        }));
        console.log(this.state)
    }
    handleChangeEmail = (e) => {
        if ( ["email"].includes(e.target.className) ) {
          let emailsChange = [...this.state.cliente_email]
          emailsChange[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ emailsChange }, () => console.log(this.state.emailsChange))
        } 
    }
    // SUBMIT
    handleSubmit = (e) => {e.preventDefault()}
    
    render() {
        let {cliente_nome, cliente_cpf, cliente_endereco, cliente_telefone, cliente_email} = this.state
        return (

            <React.Fragment>
                <form 
                    className="nome-cpf-form"
                >
                    <label>Nome</label>
                    <input
                        type="text"
                        value={cliente_nome} 
                        className="nome"
                        onChange={this.handleChangeNome}
                    />
                    <label>CPF</label>
                    <input
                        type="text"
                        value={cliente_cpf} 
                        className="nome"
                        onChange={this.handleChangeCPF}
                    />
                </form>
                <form 
                    className="endereco-form" 
                    onSubmit={this.handleSubmit} 
                    onChange={this.handleChangeEndereco}
                >
                    <button onClick={this.addEndereco}>Adicionar outro endereco</button>
                    <EnderecoInputs enderecosArray={cliente_endereco} />                
                </form>
                <form 
                    className="telefone-form" 
                    onSubmit={this.handleSubmit} 
                    onChange={this.handleChangeTelefone}
                >
                    <button onClick={this.addTelefone}>Adicionar outro telefone</button>
                    <TelefoneInputs telefonesArray={cliente_telefone} />                
                </form>
                <form
                    className="email-form"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChangeEmail}
                >
                    <button onClick={this.addEmail}>Adicionar outro email</button>
                    <EmailInputs emailsArray={cliente_email} />
                </form>
            </React.Fragment>
        )
    }
}

export default Create