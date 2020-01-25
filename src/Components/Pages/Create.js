import React, { Component } from 'react'
import axios from 'axios'
import DForm from '../Forms/DForm'

class Create extends Component {

    constructor(props) {
        
        super(props)

        this.onChangeNome = this.onChangeNome.bind(this)
        this.onChangeCPF = this.onChangeCPF.bind(this)
        this.onChangeTelefone = this.onChangeTelefone.bind(this)
        this.onChangeEndereco_cep = this.onChangeEndereco_cep.bind(this)
        this.onChangeEndereco_logradouro = this.onChangeEndereco_logradouro.bind(this)
        this.onChangeEndereco_bairro = this.onChangeEndereco_bairro.bind(this)
        this.onChangeEndereco_cidade = this.onChangeEndereco_cidade.bind(this)
        this.onChangeEndereco_uf = this.onChangeEndereco_uf.bind(this)
        this.onChangeEndereco_complemento = this.onChangeEndereco_complemento.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            client_nome: '',
            client_cpf: '',
            client_endereco: [{
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ''
            }],
            client_telefone: [],
            client_email: []
        }

    }

    onChangeNome(e) {
        this.setState({
            client_nome: e.target.value
        })
    }
    onChangeCPF(e) {
        this.setState({
            client_cpf: e.target.value
        })
    }
    onChangeEndereco_cep(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeEndereco_logradouro(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeEndereco_bairro(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeEndereco_cidade(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeEndereco_uf(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeEndereco_complemento(e) {
        this.setState({
            client_endereco: e.target.value
        })
    }
    onChangeTelefone(e) {
        this.setState({
            client_telefone: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            client_email: e.target.value
        })
    }

    onSubmit(e) {

        e.preventDefault()

        console.log(`Form submited`)
        console.log(`Nome: ${this.state.client_nome}`)
        console.log(`CPF: ${this.state.client_cpf}`)
        console.log(`Endereco: ${this.state.client_endereco}`)
        console.log(`Telefone: ${this.state.client_telefone}`)
        console.log(`Email: ${this.state.client_email}`)

        const newClient = {
            nome: this.state.client_nome,
            cpf: this.state.client_cpf,
            endereco: this.state.client_endereco,
            telefone: this.state.client_telefone,
            email: this.state.client_email
        }
        
        console.log(newClient)

        axios.post('http://localhost:8080/clientes',newClient) 
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
        return(
            <div style={{marginTop: 20}}> 
                <h3>Criar novo cliente</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input  type="text"
                            className="form-control"
                            id="nome-form"
                            value={this.state.client_nome}
                            onChange={this.onChangeNome}
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input  type="text"
                            className="form-control"
                            id="cpf-form"
                            value={this.state.client_cpf}
                            onChange={this.onChangeCPF}
                        />
                    </div>
                    {/* <div className="form-group">
                        <p>Endereco</p>
                        <label>CEP</label>
                        <input  type="text"
                            className="form-control"
                            id="cep-form"
                            value={this.state.client_endereco.cep}
                            onChange={this.onChangeEndereco_cep}
                        />
                       <label>Logradouro</label>
                        <input  type="text"
                            className="form-control"
                            id="logradouro-form"
                            value={this.state.client_endereco.logradouro}
                            onChange={this.onChangeEndereco_logradouro}
                        />
                        <label>Bairro</label>
                        <input  type="text"
                            className="form-control"
                            id="bairro-form"
                            value={this.state.client_endereco.bairro}
                            onChange={this.onChangeEndereco_bairro}
                        />
                        <label>Cidade</label>
                        <input  type="text"
                            className="form-control"
                            id="cidade-form"
                            value={this.state.client_endereco.cidade}
                            onChange={this.onChangeEndereco_cidade}
                        />
                        <label>UF</label>
                        <input  type="text"
                            className="form-control"
                            id="uf-form"
                            value={this.state.client_endereco.uf}
                            onChange={this.onChangeEndereco_uf}
                        />
                        <label>Complemento</label>
                        <input  type="text"
                            className="form-control"
                            id="complemento-form"
                            value={this.state.client_endereco.complemento}
                            onChange={this.onChangeEndereco_complemento}
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Telefone</label>
                        {/* <TelefoneForm telefoneArray={this.state.client_telefone}/> */}
                        <input  
                            type="text"
                            className="form-control"
                            value={this.state.client_telefone}
                            // telefoneArray={this.client_telefone}
                            onChange={this.onChangeTelefone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input  type="text"
                            className="form-control"
                            value={this.state.client_email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Criar" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    <DForm />
                </div>
            </div>
        )
    }
}

// const TelefoneForm = (telefoneArray) => {

//     let telefoneArray = props.telefoneArray
//     let itens = []
//     for (let i = 0; i < telefoneArray.length; i++) { 
//         itens.push(
//             <input key={i}>
//                 {telefoneArray[i].numero}
//             </option>
//         )
//     }
//     return(<select>{itens}</select>)

//     return(
//         <div>
//             <input  type="text"
//                 className="form-control"
//                 value={this.state.client_telefone}
//                 onChange={this.onChangeTelefone}
//             />
//         </div>
//     )

// }

export default Create