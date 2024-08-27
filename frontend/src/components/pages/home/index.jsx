import React, { useEffect, useState } from 'react';
import instance from '../../../services/firestore';
import { Card, Button } from 'react-bootstrap';
import './home.css';
import CardModal from './cardModal'
import ActivityForm from './activityForm';

function Home() {
    const [members, setMembers] = useState([]);
    const [teams, setTeams] = useState([]);
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

    useEffect(() => {
        instance
            .get('team')
            .then((res) => {
                setTeams(res.data);
            });
        instance
            .get('members')
            .then((res) => {
                setMembers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1>Gerenciar Atividades</h1>

            <div>
                {teams.map((team, index) => {
                    const teamMembers = members.filter((member) => member.teamId === team.id);

                    return (
                        <section key={team.id} className="mb" style={{ backgroundColor: colors[index % colors.length] }}>
                            <h2 className='team-heading'>{team.name}</h2>
                            <div className='carousel-container'>
                                {teamMembers.length > 0 ? (
                                    <div className="team-carousel">
                                        {teamMembers.map((filteredMember) => (
                                            <div key={filteredMember.id}>
                                                <Card className='member-card'>
                                                    <Card.Body>
                                                        <Card.Title>{filteredMember.name || 'N/A'}</Card.Title>
                                                        <Card.Text>
                                                            <span>{filteredMember.email || 'N/A'} </span><br/>

                                                        </Card.Text>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}><CardModal member={filteredMember}></CardModal><h3 className={filteredMember.totalHours === '0'? 'grey-text' : ''}>{filteredMember.totalHours}h</h3></div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-center">Não há colaboradores nesta equipe.</span>
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>
            <div className='activityForm'>
                <ActivityForm members={members}></ActivityForm>
            </div>
        </>
    );
}

export default Home;
