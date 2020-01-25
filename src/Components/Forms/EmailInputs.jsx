import React from 'react'

const EmailInputs = (props) => {
    return (
        props.emailsArray.map((val, idx)=> {
            return (
            <div key={idx}>
                <label>{`Email #${idx + 1}`}</label>
                <input
                    type="text"
                    data-id={idx}
                    value={props.emailsArray[idx].email} 
                    className="email"
                />
            </div>
            )
        })
    )
}

export default EmailInputs