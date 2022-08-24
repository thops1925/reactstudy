import React from 'react'

const Note = ({ id, text, complete, remove, completeID }) => {
    return (
        <div>
            <p>{text}</p>
            <button onClick={() => complete(id)} className='' style={{ backgroundColor: completeID ? 'green' : '' }} >Complete</button>
            <button onClick={() => remove(id)}>X</button>

        </div>
    )
}

export default Note