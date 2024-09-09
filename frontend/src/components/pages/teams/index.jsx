import React from 'react'
import TeamForm from './teamForm'
import TeamList from './teamList'
import './teams.css'


const Teams = () => {
    return (
        <><h1>Gerenciar Equipes</h1>
            <div className='teamForm'>
                <TeamForm />
                <TeamList/>
            </div>
        </>
    )
}

export default Teams