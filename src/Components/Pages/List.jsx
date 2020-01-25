import React, { Component } from 'react'
import axios from 'axios'

import Card from "../Card"

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
    
    render() {
        return (
            <div style={{marginTop: 20}}>
                <input 
                    className='form-control'
                    placeholder='Procure por um cliente'
                />
                <Card list={this.state.clientesList}/>
            </div>
        )
    }
}

export default List