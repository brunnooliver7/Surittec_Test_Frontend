import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import Card from "../Card"

export default class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientesList: []
        }
    }
    
    render() {
        return (
            <div style={{marginTop: 20}}>
                <input 
                    className='form-control'
                    placeholder='Procure por um cliente'
                />
                <div>
                    <Card />
                </div>
            </div>
        )
    }
}
