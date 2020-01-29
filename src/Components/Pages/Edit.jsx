import React, { Component } from 'react';
import axios from 'axios'
import EnderecoInputs from '../Forms/EnderecoInputs'
import TelefoneInputs from '../Forms/TelefoneInputs'
import EmailInputs from '../Forms/EmailInputs'

class Edit extends Component {
    
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

        //Binds

    }

    componentDidMount() {

        let text = window.location.href
        let textArray = text.split("/")
        let codigo = textArray[textArray.length-1]
        let url = 'http://localhost:8080/clientes/' + codigo

        axios.get(url)
        .then(response => {
            this.setState({
                cliente_nome: response.data.nome,
                cliente_cpf: response.data.cpf,
                cliente_endereco: response.data.endereco,
                cliente_telefone: response.data.telefone,
                cliente_email: response.data.email
            })
        })
        .catch(function(error) {
            console.log(error)
        })
           
    }
    
    render() {
        console.log(this.state)
        let {cliente_nome, cliente_cpf, cliente_endereco, cliente_telefone, cliente_email} = this.state
        return(
            <div>
                <div>
                    <h3 className="edit-title">Editar cliente</h3>
                </div>
                <div>
                    <form 
                        className="edit-forms nome-cpf-form"
                    >             
                        <div className="form-head">
                            <i className="fa fa-user-circle-o"></i>
                            <span>Informações Pessoais</span>
                        </div>
                        <label>Nome</label>
                        <input
                            type="text"
                            defaultValue={cliente_nome} 
                            className="nome form-control"
                            onChange={this.handleChangeNome}
                        />
                        <label>CPF</label>
                        <input
                            type="text"
                            defaultValue={cliente_cpf} 
                            className="cpf form-control"
                            onChange={this.handleChangeCPF}
                        />
                    </form> 
                    <form 
                        className="edit-forms endereco-form" 
                        onSubmit={this.handleSubmit} 
                        onChange={this.handleChangeEndereco}
                    >
                        <div className="form-head">
                            <i className="fa fa-map-marker"></i>
                            <span>Endereços</span>
                        </div>
                        <div>
                            <EnderecoInputs enderecosArray={cliente_endereco} />                
                            <button onClick={this.addEndereco} className="btn-add-endereco btn btn-secondary btn-block">Adicionar outro endereco</button>
                        </div>
                    </form>
                    <form 
                        className="edit-forms telefone-form" 
                        onSubmit={this.handleSubmit} 
                        onChange={this.handleChangeTelefone}
                    >
                        <div className="form-head">
                            <i className="fa fa-phone"></i>
                            <span>Telefones</span>
                        </div>
                        <TelefoneInputs telefonesArray={cliente_telefone} />                
                        <button onClick={this.addTelefone} className="btn-add-telefone btn btn-secondary btn-block">Adicionar outro telefone</button>
                    </form>
                    <form
                        className="edit-forms email-form"
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChangeEmail}
                    >
                        <div className="form-head">
                            <i className="fa fa-envelope"></i>
                            <span>Emails</span>
                        </div>
                        <EmailInputs emailsArray={cliente_email} />
                        <button onClick={this.addEmail} className="btn-add-email btn btn-secondary btn-block">Adicionar outro email</button>
                    </form>
                    <form
                        onSubmit={this.onSubmitCliente}
                        className="edit-btn-form"
                    >
                        <input 
                            type="submit" 
                            value="Atualizar Cliente" 
                            className="btn btn-primary btn-lg" 
                        />
                    </form>
                </div>
            </div>
        )
    }

    handleChangeNome = (e) => {
        this.setState({
            cliente_nome: e.target.value
        })
    }

    handleChangeCPF = (e) => {
        this.setState({
            cliente_cpf: e.target.value
        })
    }

    handleChangeEndereco = (e) => {
        
        let className = e.target.className
        className = className.split(" ")
        className = className[0]
        
        if ( ["cep","logradouro","bairro","cidade","uf","complemento"].includes(className) ) {
            let cliente_endereco = [...this.state.cliente_endereco]
            cliente_endereco[e.target.dataset.id][className] = e.target.value
            this.setState({ cliente_endereco }, () => console.log(this.state.cliente_endereco))
        }
    }

    handleChangeTelefone = (e) => {

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if ( ["numero"].includes(className) ) {
          let cliente_telefone = [...this.state.cliente_telefone]
          cliente_telefone[e.target.dataset.id][className] = e.target.value
          this.setState({ cliente_telefone }, () => console.log(this.state.cliente_telefone))
        }
    }

    handleChangeEmail = (e) => {

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if ( ["email"].includes(className) ) {
          let cliente_email = [...this.state.cliente_email]
          cliente_email[e.target.dataset.id][className] = e.target.value
          this.setState({ cliente_email }, () => console.log(this.state.cliente_email))
        } 
    }
    
    addEndereco = (e) => {
        this.setState((prevState) => ({
            cliente_endereco: [...prevState.cliente_endereco, {cep:"", logradouro:""}],
        }));
        console.log(this.state)
    }

    addTelefone = (e) => {
        this.setState((prevState) => ({
            cliente_telefone: [...prevState.cliente_telefone, {numero:""}],
        }));
        console.log(this.state)
    }

    addEmail = (e) => {
        this.setState((prevState) => ({
            cliente_email: [...prevState.cliente_email, {email:""}],
        }));
        console.log(this.state)
    }
    
    handleSubmit = (e) => {e.preventDefault()}

    onSubmitCliente = (e) => {

        e.preventDefault()

        let text = window.location.href
        let textArray = text.split("/")
        let codigo = textArray[textArray.length-1]
        let url = 'http://localhost:8080/clientes/'+codigo

        const newClient = {
            nome: this.state.cliente_nome,
            cpf: this.state.cliente_cpf,
            endereco: this.state.cliente_endereco,
            telefone: this.state.cliente_telefone,
            email: this.state.cliente_email
        }

        console.log(newClient)
        
        axios.put(url, newClient) 
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location.replace("http://localhost:3000");

    }

}

export default Edit