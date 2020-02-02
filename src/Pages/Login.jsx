import React, { Component } from 'react'

export default class Login extends Component {
   
    constructor(props) { 
        super(props)
        this.state =  {
            user: '',
            password: '',
        }
        this.onChangeNome = this.onChangeNome.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.logar = this.logar.bind(this)
    }

    componentDidMount() {        
        localStorage.setItem('user', '')
        localStorage.setItem('password', '')
        localStorage.setItem('userAuthenticated', false)
        localStorage.setItem('adminAuthenticated', false)
    }
    
    render() {
        return(
            <div className="login-form">
                    <form
                        onSubmit={this.logar}
                    >
                        <label >Usuário</label>
                        <input type="text" value={this.state.user} onChange={this.onChangeNome} className="form-control"/>
                        <label>Senha</label>
                        <input type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control"/>
                        <input type="submit" value="Entrar" className="btn btn-primary btn-entrar"/>
                    </form>
            </div>
        )
    }

    onChangeNome = (e) => {
        this.setState({user: e.target.value})
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }

    logar = (e) => {
        
        e.preventDefault()

        if(this.state.user === 'admin' && this.state.password === '123456') {
            localStorage.setItem('user', this.state.user)
            localStorage.setItem('password', this.state.password)
            localStorage.setItem('userAuthenticated', true)
            localStorage.setItem('adminAuthenticated', true)
            window.location.replace("http://localhost:3000/list");
        } else if(this.state.user === 'comum' && this.state.password === '123456') {
            localStorage.setItem('user', this.state.user)
            localStorage.setItem('password', this.state.password)
            localStorage.setItem('userAuthenticated', true)
            localStorage.setItem('adminAuthenticated', false)
            window.location.replace("http://localhost:3000/list");
        } else {
            localStorage.setItem('userAuthenticated', false)
            localStorage.setItem('adminAuthenticated', false)
        }
    }

}