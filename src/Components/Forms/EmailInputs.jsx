import React from 'react'

const EmailInputs = (props) => {
    return (
        props.emailsArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <label>{`Email ${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    defaultValue={props.emailsArray[idx].email} 
                    className="email form-control"
                    placeholder={`Email ${idx + 1}`}
                />
            </div>
            )
        })
    )
}

export default EmailInputs