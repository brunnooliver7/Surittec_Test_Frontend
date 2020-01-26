import React, { Component } from 'react'
import axios from 'axios'

import TelefoneInputs from '../Forms/TelefoneInputs'
import EmailInputs from '../Forms/EmailInputs'
import EnderecoInputs from '../Forms/EnderecoInputs'

export default class Create extends Component {
    
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
            cliente_telefone: [{numero: ''}],
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
        this.onSubmitCliente = this.onSubmitCliente.bind(this)

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
          let cliente_endereco = [...this.state.cliente_endereco]
          cliente_endereco[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ cliente_endereco }, () => console.log(this.state.cliente_endereco))
        }
    }
    // FUNÇÕES TELEFONE
    addTelefone = (e) => {
        this.setState((prevState) => ({
            cliente_telefone: [...prevState.cliente_telefone, {numero:""}],
        }));
        console.log(this.state)
    }
    handleChangeTelefone = (e) => {
        if ( ["numero"].includes(e.target.className) ) {
          let cliente_telefone = [...this.state.cliente_telefone]
          cliente_telefone[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ cliente_telefone }, () => console.log(this.state.cliente_telefone))
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
          let cliente_email = [...this.state.cliente_email]
          cliente_email[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ cliente_email }, () => console.log(this.state.cliente_email))
        } 
    }
    // SUBMIT
    handleSubmit = (e) => {e.preventDefault()}
    onSubmitCliente = (e) => {

        e.preventDefault()

        console.log(this.state)

        console.log(`Form submited`)
        console.log(`Nome: ${this.state.cliente_nome}`)
        console.log(`CPF: ${this.state.cliente_cpf}`)
        console.log(`Endereco: ${this.state.cliente_endereco}`)
        console.log(`Telefone: ${this.state.cliente_telefone}`)
        console.log(`Email: ${this.state.cliente_email}`)

        const newClient = {
            nome: this.state.cliente_nome,
            cpf: this.state.cliente_cpf,
            endereco: this.state.cliente_endereco,
            telefone: this.state.cliente_telefone,
            email: this.state.cliente_email
        }
        
        console.log(newClient)

        axios.post('http://localhost:8080/clientes', newClient) 
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        this.setState({
            client_nome: '',
            client_cpf: '',
            client_telefone: '',
            client_endereco: '',
            client_email: ''
        })

    }
    
    render() {
        let {cliente_nome, cliente_cpf, cliente_endereco, cliente_telefone, cliente_email} = this.state
        return (
            <div className="create-forms">
                <form 
                    className="nome-cpf-form"
                >
                    <label>Nome</label>
                    <br />
                    <input
                        type="text"
                        value={cliente_nome} 
                        className="nome"
                        onChange={this.handleChangeNome}
                        min="1"
                        max="3"
                    />
                    <br/>
                    <label>CPF</label>
                    <br/>
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
                    <div className="form-group">
                    <EnderecoInputs enderecosArray={cliente_endereco} />                
                    <button onClick={this.addEndereco} className="btn-add-endereco">Adicionar outro endereco</button>

                    </div>
                </form>
                <form 
                    className="telefone-form" 
                    onSubmit={this.handleSubmit} 
                    onChange={this.handleChangeTelefone}
                >
                    <TelefoneInputs telefonesArray={cliente_telefone} />                
                    <button onClick={this.addTelefone}>Adicionar outro telefone</button>
                </form>
                <form
                    className="email-form"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChangeEmail}
                >
                    <EmailInputs emailsArray={cliente_email} />
                    <button onClick={this.addEmail}>Adicionar outro email</button>
                </form>
                <form
                    onSubmit={this.onSubmitCliente}
                >
                    <input 
                        type="submit" 
                        value="Criar Cliente" 
                        className="btn btn-primary" 
                    />
                </form>
            </div>
        )
    }
}