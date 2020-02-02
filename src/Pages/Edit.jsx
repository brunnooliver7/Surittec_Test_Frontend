import React, { Component } from 'react';
import axios from 'axios'
import MaskedInput from 'react-text-mask';

export default class Edit extends Component {
    
    _isMounted = false

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
            cliente_telefone: [{
                numero: '',
                tipo: ''
            }],
            cliente_email: [{email: ''}],
            nomeErro1: '',
            nomeErro2: '',
            cpfErro: '',
            enderecoErro: [{
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
            }],
            telefoneErro: [{numero: ''}],
            emailErro: [{email: ''}],
            alert_msg: {
                Success: '',
                NomeFail: '',
                CpfFail: '',
                EnderecoFail: '',
                TelefoneFail: '',
                EmailFail: ''
            }
        }

        // Render
        this.renderEndereco = this.renderEndereco.bind(this)
        this.renderTelefone = this.renderTelefone.bind(this)
        this.renderEmail = this.renderEmail.bind(this)
        // Submit
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSubmitCliente = this.onSubmitCliente.bind(this)
        this.enviarRequest = this.enviarRequest.bind(this)
        // handleChange
        this.handleChangeNome = this.handleChangeNome.bind(this)
        this.handleChangeCPF = this.handleChangeCPF.bind(this)
        this.handleChangeEndereco = this.handleChangeEndereco.bind(this)
        this.handleChangeTelefone = this.handleChangeTelefone.bind(this)
        this.handlChangeSelectTelefone = this.handlChangeSelectTelefone.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        // Add
        this.addEndereco = this.addEndereco.bind(this)
        this.addTelefone = this.addTelefone.bind(this)
        this.addEmail = this.addEmail.bind(this)
        // Remove
        this.removerEndereco = this.removerEndereco.bind(this)
        this.removerTelefone = this.removerTelefone.bind(this)
        this.removerEmail = this.removerEmail.bind(this)
        // Validate onChange
        this.validarNomeOnChange = this.validarNomeOnChange.bind(this)
        this.validarCpfOnChange = this.validarCpfOnChange.bind(this)
        this.validarTelefoneOnChange = this.validarTelefoneOnChange.bind(this)
        this.validarEmailOnChange = this.validarEmailOnChange.bind(this)
        this.validarEnderecoOnChange = this.validarEnderecoOnChange.bind(this)
        // Validar onSubmit
        this.validarNomeOnSubmit = this.validarNomeOnSubmit.bind(this)
        this.validarCpfOnSubmit = this.validarCpfOnSubmit.bind(this)
        this.validarEnderecoOnSubmit = this.validarEnderecoOnSubmit.bind(this)
        this.validarTelefoneOnSubmit = this.validarTelefoneOnSubmit.bind(this)
        this.validarEmailOnSubmit = this.validarEmailOnSubmit.bind(this)
        // Alerts
        this.AlertSuccess = this.AlertSuccess.bind(this)
        this.AlertNome = this.AlertNome.bind(this)
        this.AlertCpf = this.AlertCpf.bind(this)
        this.AlertEndereco = this.AlertEndereco.bind(this)
        this.AlertTelefone = this.AlertTelefone.bind(this)
        this.AlertEmail = this.AlertEmail.bind(this)
        // Others
        this.buscarCEP = this.buscarCEP.bind(this)
        this.maskTelefone = this.maskTelefone.bind(this)
    }
    componentDidMount() {

        var userAuthenticated = localStorage.getItem('userAuthenticated')
        var adminAuthenticated = localStorage.getItem('adminAuthenticated')

        if(userAuthenticated === 'false') {
            window.location.replace("http://localhost:3000/login");
        } else if(adminAuthenticated === 'false') {
            window.location.replace("http://localhost:3000/list");
        }

        this._isMounted = true;

        if (this._isMounted) {

            let text = window.location.href
            let textArray = text.split("/")
            let codigo = textArray[textArray.length-1]
            let url = 'http://localhost:8080/get/' + codigo

            var user = localStorage.getItem('user')
            var password = localStorage.getItem('password')

            axios({
                method:'get',
                url: url,
                auth: {
                    username: user,
                    password: password
                }
            })
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
        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }    
    render() {    

        let cliente_nome = this.state.cliente_nome
        let cliente_cpf = this.state.cliente_cpf

        return (
            <div className="create-page-body">
                <div 
                    className="create-forms nome-cpf-form"
                >
                    <div className="form-head">
                        <i className="fa fa-user-circle-o"></i>
                        <span>Informações Pessoais</span>
                    </div>
                    <label htmlFor="">Nome</label>
                    <input
                        type="text"
                        value={cliente_nome} 
                        className="nome form-control"
                        onChange={this.handleChangeNome}
                        placeholder="Nome"
                    />
                    <div className="validar">{this.state.nomeErro1}</div>
                    <div className="validar">{this.state.nomeErro2}</div>
                    <label htmlFor="">CPF</label>
                    <MaskedInput
                            defaultValue={cliente_cpf} 
                            className="cpf form-control"
                            placeholder="CPF"
                            onChange={this.handleChangeCPF}
                            mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]}
                    />
                    <div className="validar">{this.state.cpfErro}</div>
                </div>
                <div 
                    className="create-forms endereco-form" 
                    onSubmit={this.handleSubmit} 
                    onChange={this.handleChangeEndereco}
                >
                    <div className="form-head">
                        <i className="fa fa-map-marker"></i>
                        <span>Endereços</span>
                    </div>
                    <this.renderEndereco />
                    <button 
                        onClick={this.addEndereco} 
                        className="btn-add-endereco btn btn-secondary btn-block"
                        >Adicionar endereco
                    </button>
                </div>
                <div 
                    className="create-forms telefone-form" 
                >
                    <div className="form-head">
                        <i className="fa fa-phone"></i>
                        <span>Telefones</span>
                    </div>
                    <this.renderTelefone />
                    <button 
                        onClick={this.addTelefone} 
                        className="btn-add-telefone btn btn-secondary btn-block"
                        >Adicionar telefone
                    </button>
                </div>
                <div
                    className="create-forms email-form"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChangeEmail}
                >
                    <div className="form-head">
                        <i className="fa fa-envelope"></i>
                        <span>Emails</span>
                    </div>
                    <this.renderEmail />
                    <button 
                        onClick={this.addEmail} 
                        className="btn-add-email btn btn-secondary btn-block"
                        >Adicionar email
                    </button>
                </div>
                {this.state.alert_msg.Success==='sucesso'?<this.AlertSuccess/>:null}
                {this.state.alert_msg.NomeFail==='erro'?<this.AlertNome/>:null}
                {this.state.alert_msg.CpfFail==='erro'?<this.AlertCpf/>:null}
                {this.state.alert_msg.EnderecoFail==='erro'?<this.AlertEndereco/>:null}
                {this.state.alert_msg.TelefoneFail==='erro'?<this.AlertTelefone/>:null}
                {this.state.alert_msg.EmailFail==='erro'?<this.AlertEmail/>:null}
                <form
                    onSubmit={this.onSubmitCliente}
                    className="edit-btn-form"
                >
                    <input type="submit" value="Atualizar Cliente" className="btn btn-primary btn-lg"/>
                </form>
            </div>
        )

    }
    renderEndereco = () => {
        let cliente_endereco = this.state.cliente_endereco
        return cliente_endereco.map((val, idx)=> {
            return (
                <div key={idx}>
                    <div>
                        <div className="endereco-enum">Endereco {`${idx + 1}`}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`CEP ${idx + 1}`}</label>
                        <MaskedInput
                            data-id={idx}
                            defaultValue={cliente_endereco[idx].cep} 
                            className={`cep form-control cep-${idx + 1}`} 
                            placeholder={`CEP ${idx + 1}`}
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        />
                        <div className="validar">{this.state.enderecoErro[idx].cep}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`Logradouro ${idx + 1}`}</label>
                        <input
                            type="text"
                            data-id={idx}
                            defaultValue={this.state.cliente_endereco[idx].logradouro} 
                            className="logradouro form-control"
                            placeholder={`Logradouro ${idx + 1}`}
                        />
                        <div className="validar">{this.state.enderecoErro[idx].logradouro}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`Bairro ${idx + 1}`}</label>
                        <input
                            type="text"
                            data-id={idx}
                            defaultValue={this.state.cliente_endereco[idx].bairro} 
                            className="bairro form-control"
                            placeholder={`Bairro ${idx + 1}`}
                        />
                        <div className="validar">{this.state.enderecoErro[idx].bairro}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`Cidade ${idx + 1}`}</label>
                        <input
                            type="text"
                            data-id={idx}
                            defaultValue={this.state.cliente_endereco[idx].cidade} 
                            className="cidade form-control"
                            placeholder={`Cidade ${idx + 1}`}
                        />
                        <div className="validar">{this.state.enderecoErro[idx].cidade}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`UF ${idx + 1}`}</label>
                        <input
                            type="text"
                            data-id={idx}
                            defaultValue={this.state.cliente_endereco[idx].uf} 
                            className="uf form-control"
                            placeholder={`UF ${idx + 1}`}
                        />
                        <div className="validar">{this.state.enderecoErro[idx].uf}</div>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{`Complemento ${idx + 1}`}</label>
                        <input
                            type="text"
                            data-id={idx}
                            defaultValue={this.state.cliente_endereco[idx].complemento} 
                            className="complemento form-control"
                            placeholder={`Complemento ${idx + 1}`}
                        />
                    </div>
                    <button 
                        className="btn btn-danger" 
                        data-id={idx}
                        onClick={this.removerEndereco}
                        >Remover endereço {idx + 1}
                    </button>
                </div>
            )
        })                        
    }
    renderTelefone = () => {
        let cliente_telefone = this.state.cliente_telefone
        return cliente_telefone.map((val, idx)=> {
            return (
                <div key={idx}>
                    <label>{`Telefone ${idx + 1}`}</label>
                    <form
                        onChange={this.handlChangeSelectTelefone}
                    >
                        <select 
                            data-id={idx}
                            defaultValue={cliente_telefone[idx].tipo}                                         
                            className="tipo browser-default custom-select"
                        >
                            <option value="Residencial">Residencial</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Celular">Celular</option>
                        </select>
                    </form>
                    <form
                        onSubmit={this.handleSubmit} 
                        onChange={this.handleChangeTelefone}                                    
                    >
                        <MaskedInput
                            data-id={idx}
                            defaultValue={cliente_telefone[idx].numero} 
                            className="numero form-control"
                            placeholder={`Telefone ${idx + 1}`} 
                            mask={this.maskTelefone({idx})}
                        />
                    </form>
                    <div className="validar">{this.state.telefoneErro[idx].numero}</div>
                    <button 
                        className="btn btn-danger" 
                        data-id={idx}
                        onClick={this.removerTelefone}
                        >Remover telefone {idx + 1}
                    </button>
                </div>
            )
        })        
    }    
    renderEmail = () => {
        let cliente_email = this.state.cliente_email
        return cliente_email.map((val, idx)=> {
            return (
                <div key={idx}>
                    <label>{`Email ${idx + 1}`}</label>
                    <input
                        type="text"
                        data-id={idx}
                        defaultValue={cliente_email[idx].email} 
                        className="email form-control"
                        placeholder={`Email ${idx + 1}`}
                    />
                    <div className="validar">{this.state.emailErro[idx].email}</div>
                    <button 
                        className="btn btn-danger" 
                        data-id={idx}
                        onClick={this.removerEmail}
                        >Remover email {idx + 1}
                    </button>
                </div>
            )
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
    }
    onSubmitCliente = (e) => {

        e.preventDefault()

        const nomeValido = this.validarNomeOnSubmit()
        const cpfValido = this.validarCpfOnSubmit()
        const enderecoValido = this.validarEnderecoOnSubmit()
        const telefoneValido = this.validarTelefoneOnSubmit()
        const emailValido = this.validarEmailOnSubmit()

        const folga = 35

        if(!nomeValido) {

            var nomeForm = document.getElementsByClassName('fa-user-circle-o')
            var nomePosition = nomeForm[0].offsetTop;

            window.scrollTo({top: nomePosition-folga, left: 0, behavior: 'smooth' });

            this.setState({alert_msg: {NomeFail: 'erro'}})

        } else if(!cpfValido) {

            var cpfForm = document.getElementsByClassName('fa-user-circle-o')
            var cpfPosition = cpfForm[0].offsetTop;
            
            window.scrollTo({top: cpfPosition-folga, left: 0, behavior: 'smooth' });

            this.setState({alert_msg: {NomeFail: ''}})
            this.setState({alert_msg:{CpfFail: 'erro'}})


        } else if(!enderecoValido) {

            var enderecoForm = document.getElementsByClassName('fa-map-marker')
            var enderecoPosition = enderecoForm[0].offsetTop;

            window.scrollTo({top: enderecoPosition-folga, left: 0, behavior: 'smooth' });

            this.setState({alert_msg: {NomeCpf: ''}})
            this.setState({alert_msg: {EnderecoFail: 'erro'}})

        } else if(!telefoneValido) {

            var telefoneForm = document.getElementsByClassName('fa-phone')
            var telefonePosition = telefoneForm[0].offsetTop;

            window.scrollTo({top: telefonePosition-folga, left: 0, behavior: 'smooth' });

            this.setState({alert_msg: {EnderecoFail: ''}})
            this.setState({alert_msg: {TelefoneFail: 'erro'}})

        } else if(!emailValido) {

            var emailForm = document.getElementsByClassName('fa-envelope')
            var emailPosition = emailForm[0].offsetTop;

            window.scrollTo({top: emailPosition-folga, left: 0, behavior: 'smooth' });

            this.setState({alert_msg: {TelefoneFail: ''}})
            this.setState({alert_msg: {EmailFail: 'erro'}})

        } else {

            this.enviarRequest()

            this.setState({alert_msg: {EmailFail: ''}})
            this.setState({alert_msg: {Success: 'sucesso'}})
        }
    }
    enviarRequest = () => {

        const newClient = {
            nome: this.state.cliente_nome,
            cpf: this.state.cliente_cpf,
            endereco: this.state.cliente_endereco,
            telefone: this.state.cliente_telefone,
            email: this.state.cliente_email
        }

        let text = window.location.href
        let textArray = text.split("/")
        let codigo = textArray[textArray.length-1]
        let url = 'http://localhost:8080/put/'+codigo
        let user = localStorage.getItem('user')
        let password = localStorage.getItem('password')

        axios({
            method:'put',
            url: url,
            auth: {
                username: user,
                password: password
            },
            data: newClient
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

    }
    handleChangeNome = (e) => {
        this.setState({cliente_nome: e.target.value})
        this.validarNomeOnChange(e)
    }
    handleChangeCPF = (e) => {

        let value = e.target.value
        value = value.replace(/[.]/g, '')
        value = value.replace(/[-]/g, '')
        
        this.setState({cliente_cpf: value})
        this.validarCpfOnChange(e)
        
    }
    handleChangeEndereco = (e) => {
    
        let className = e.target.className
        let value = e.target.value
        let id = e.target.dataset.id

        className = className.split(" ")
        className = className[0]


        if(className === 'cep') {
            value = value.replace(/[-]/g, '')
        }
        
        if ( ["cep","logradouro","bairro","cidade","uf","complemento"].includes(className) ) {
            let cliente_endereco = [...this.state.cliente_endereco]
            cliente_endereco[id][className] = value
            this.setState({ cliente_endereco })
        }

        if(className === 'cep') {
            let cep = value
            cep = cep.replace(/[_]/g, '')
            if(cep.length === 8) {
                this.buscarCEP(cep, id)
            }    
        }

        this.validarEnderecoOnChange(e)

    }
    handleChangeTelefone = (e) => {

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        let value = e.target.value
        value = value.replace(/[()\s-]/g, '')

        if ( ["numero"].includes(className) ) {
          let cliente_telefone = [...this.state.cliente_telefone]
          cliente_telefone[e.target.dataset.id][className] = value
          this.setState({ cliente_telefone })
        }

        this.validarTelefoneOnChange(e)

    }
    handlChangeSelectTelefone = (e) => {

        let value = e.target.value

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if ( ["tipo"].includes(className) ) {
            let cliente_telefone = [...this.state.cliente_telefone]
            cliente_telefone[e.target.dataset.id][className] = value
            this.setState({ cliente_telefone })
        }

    }
    handleChangeEmail = (e) => {

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if ( ["email"].includes(className) ) {
          let cliente_email = [...this.state.cliente_email]
          cliente_email[e.target.dataset.id][className] = e.target.value
          this.setState({ cliente_email })
        } 

        this.validarEmailOnChange(e)

    }
    addEndereco = (e) => {
        this.setState((prevState) => ({
            cliente_endereco: [
                ...prevState.cliente_endereco, 
                {
                    cep:"", 
                    logradouro:"", 
                    bairro:"", 
                    cidade: "", 
                    uf: "", 
                    complemento: ""
                }
            ],
            enderecoErro: [
                ...prevState.enderecoErro, 
                {
                    cep:"Este campo é obrigatório", 
                    logradouro:"Este campo é obrigatório", 
                    bairro:"Este campo é obrigatório", 
                    cidade: "Este campo é obrigatório", 
                    uf: "Este campo é obrigatório", 
                }
            ]
        }));
    }
    addTelefone = (e) => {
        this.setState((prevState) => ({
            cliente_telefone: [...prevState.cliente_telefone, {numero:'', tipo:'Residencial'}],
            telefoneErro: [ ...prevState.telefoneErro, {numero:'Este campo é obrigatório'}]
        }))
    }
    addEmail = (e) => {
        this.setState((prevState) => ({
            cliente_email: [...prevState.cliente_email, {email:""}],
            emailErro: [...prevState.emailErro, {email:"Este campo é obrigatório"}]
        }));
    }
    removerEndereco = (e) => {
        let id = e.target.dataset.id
        let cliente_endereco = this.state.cliente_endereco
        cliente_endereco.splice(id, 1)
        this.setState({cliente_endereco})
    }
    removerTelefone = (e) => {
        let id = e.target.dataset.id
        let cliente_telefone = this.state.cliente_telefone
        cliente_telefone.splice(id, 1)
        this.setState({cliente_telefone})
    }
    removerEmail = (e) => {
        let id = e.target.dataset.id
        let cliente_email = this.state.cliente_email
        cliente_email.splice(id, 1)
        this.setState({cliente_email})
    }
    validarNomeOnChange = (e) => {

        let nome = e.target.value

        // Erro1
        if(nome.length === 0) { 
            this.setState({nomeErro1: 'Este campo é obrigatório'})
        } else if((nome.length>=1 && nome.length<3) || nome.length>100) {
            this.setState({nomeErro1: 'Insira um nome entre 3 e 100 caracteres'})
        } else {
            this.setState({nomeErro1: ''})
        }

        // Erro2
        var filtro = /^[A-Za-z0-9áéíóúãõâêôçÁÉÍÓÚÃÕÂÊÔÇ\s]*$/g
        if (!filtro.test(nome)) {
            this.setState({nomeErro2: 'Você só pode inserir letras e números'})
        } else {
            this.setState({nomeErro2: ''})
        }

    }
    validarCpfOnChange = (e) => {
        let cpf = e.target.value
        if(cpf.length === 0) {
            this.setState({cpfErro: 'Este campo é obrigatório'})
        } else {
            this.setState({cpfErro: ''})
        }
    }
    validarEnderecoOnChange = (e) => {

        let enderecoValue = e.target.value

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if(enderecoValue.length === 0) {
            let enderecoErro = [...this.state.enderecoErro]
            enderecoErro[e.target.dataset.id][className] = 'Este campo é obrigatório'
            this.setState({enderecoErro})
        } else {
            let enderecoErro = [...this.state.enderecoErro]
            enderecoErro[e.target.dataset.id][className] = ''
            this.setState({enderecoErro})
        }
    }
    validarTelefoneOnChange = (e) => {

        // retirar a máscara
        let telefoneValue = e.target.value
        telefoneValue = telefoneValue.replace(/[()\s-]/g, '')
        
        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if(telefoneValue.length === 0) {
            let telefoneErro = [...this.state.telefoneErro]
            telefoneErro[e.target.dataset.id][className] = 'Este campo é obrigatório'
            this.setState({telefoneErro})
        } else {
            let telefoneErro = [...this.state.telefoneErro]
            telefoneErro[e.target.dataset.id][className] = ''
            this.setState({telefoneErro})
        }

    }
    validarEmailOnChange = (e) => {

        let emailValue = e.target.value

        let className = e.target.className
        className = className.split(" ")
        className = className[0]

        if(emailValue.length === 0) {
            let emailErro = [...this.state.emailErro]
            emailErro[e.target.dataset.id][className] = 'Este campo é obrigatório'
            this.setState({emailErro})
        } else if(!emailValue.includes("@")) {
            let emailErro = [...this.state.emailErro]
            emailErro[e.target.dataset.id][className] = 'E-mail inválido'
            this.setState({emailErro})
        } else {
            let emailErro = [...this.state.emailErro]
            emailErro[e.target.dataset.id][className] = ''
            this.setState({emailErro})
        }

    }
    validarNomeOnSubmit = () => {
        let nome = this.state.cliente_nome
        if(nome.length === 0) { 
            return false
        } else if((nome.length>=1 && nome.length<3) || nome.length>100) {
            return false
        } else {
            return true
        }
    }
    validarCpfOnSubmit = () => {
        let cpf = this.state.cliente_cpf
        if(cpf.length === 0) {
            return false
        } else {
            return true
        }
    }
    validarEnderecoOnSubmit = () => {

        let cliente_endereco = this.state.cliente_endereco
        
        let result = false
        
        for(let i=0; i<cliente_endereco.length; i++) {
            if(cliente_endereco[i].cep === '') {
                result = false
            } else if(cliente_endereco[i].logradouro === '') {
                result = false
            } else if(cliente_endereco[i].bairro === '') {
                result = false
            } else if(cliente_endereco[i].cidade === '') {
                result = false
            } else if(cliente_endereco[i].uf === '') {
                result = false
            } else {
                result = true
            }
        }
        
        return result

    }
    validarTelefoneOnSubmit = () => {

        let cliente_telefone = this.state.cliente_telefone
        
        let result = false
        let contador = 0

        for(let i=0; i<cliente_telefone.length; i++) {
            if(cliente_telefone[i].numero === '') {
                contador++
            } 
        }

        if(contador === 0) {
            result = true
        }

        return result
        
    }
    validarEmailOnSubmit = () => {

        let cliente_email = this.state.cliente_email
        
        let result = false
        let contador = 0

        for(let i=0; i<cliente_email.length; i++) {
            if(cliente_email[i].email === '') {
                contador++
            } else if(!cliente_email[i].email.includes("@")) {
                contador++
            }
        }

        if(contador === 0) {
            result = true
        }

        return result

    }
    AlertSuccess = () => {
        return (
            <div className="alert alert-success" role="alert">
                Cliente atualizado com sucesso!
            </div>
        )
    }
    AlertNome = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Confira o preenchimento dos dados de Nome
            </div>
        )
    }
    AlertCpf = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Confira o preenchimento dos dados de CPF
            </div>
        )
    }
    AlertEndereco = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Confira o preenchimento dos dados de Endereço (pelo menos um endereço deve ser registrado)
            </div>
        )
    }
    AlertTelefone = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Confira o preenchimento dos dados de Telefone (pelo menos um telefone deve ser registrado)
            </div>
        )
    }
    AlertEmail = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Confira o preenchimento dos dados de Email (pelo menos um email deve ser registrado)
            </div>
        )
    }
    buscarCEP = (cep, id) => {

        let url = 'https://viacep.com.br/ws/'
        url = url.concat(cep)
        url = url.concat('/json/')

        fetch(url).then(res => res.json()).then(data => {
            
            const cliente_endereco = [...this.state.cliente_endereco]
            const enderecoErro = [...this.state.enderecoErro]

            cliente_endereco[id].logradouro = data.logradouro
            enderecoErro[id].logradouro = ''
            
            cliente_endereco[id].bairro = data.bairro
            enderecoErro[id].bairro = ''

            cliente_endereco[id].cidade = data.localidade
            enderecoErro[id].cidade = ''

            cliente_endereco[id].uf = data.uf
            enderecoErro[id].uf = ''

            this.setState(
                {cliente_endereco}
            )

        }).catch()

    }
    maskTelefone = (idx) => {

        let i = idx.idx
        let selectType = this.state.cliente_telefone[i].tipo
        let mask

        if(selectType === 'Residencial') {
            mask = ['(', /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        } else if(selectType === 'Comercial') {
            mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        } else if(selectType === 'Celular') {
            mask = ['(', /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
        } else {
            mask = []
        }
        return mask
    }
}
