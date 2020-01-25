import React, { Component } from 'react'
import CatInputs from './CatInput'

class DForm extends Component {

  constructor (props) {

    super(props)
    
    this.state = {
        cats: [{name: "", age: ""}],
        owner: "",
        description: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.addCat = this.addCat.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

    handleChange = (e) => {
        if (["name", "age"].includes(e.target.className) ) {
          let catsChange = [...this.state.cats]   
          catsChange[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ catsChange }, () => console.log(this.state.cats))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
    }
      
    addCat = (e) => {
        this.setState((prevState) => ({
            cats: [...prevState.cats, {name:"", age:""}],
        }));
    }

    handleSubmit = (e) => { e.preventDefault() }
    
    render() {
        let {owner, description, cats} = this.state
        return (
          <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            
            <label htmlFor="name">Owner</label> 
            <input type="text" name="owner" id="owner" value={owner} />
            
            <label htmlFor="description">Description</label> 
            <input type="text" name="description" id="description" value={description} />
            
            <button onClick={this.addCat}>Add new cat</button>
            
            <CatInputs catsArray={cats} />
            <input type="submit" value="Submit" /> 
          
          </form>
        )
    }
}

export default DForm