import React from 'react'

const CatInputs = (props) => {
    return (
        props.catsArray.map((val, idx)=> {
            let catId = `cat-${idx}`
            let ageId = `age-${idx}`
            return (
            <div key={idx}>
                <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
                <input
                type="text"
                name={catId}
                data-id={idx}
                id={catId}
                value={props.catsArray[idx].name} 
                className="name"
                />
                <label htmlFor={ageId}>Age</label>
                <input
                type="text"
                name={ageId}
                data-id={idx}
                id={ageId}
                value={props.catsArray[idx].age} 
                className="age"
                />
            </div>
            )
        })
    )
}

export default CatInputs