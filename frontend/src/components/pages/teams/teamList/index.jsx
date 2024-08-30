import { useEffect, useState } from "react";
import instance from "../../../../services/firestore";
import { Table, Button, Accordion } from "react-bootstrap";

function TeamList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        instance
            .get('team')
            .then((res) => {
                if (res.data && Array.isArray(res.data)) {
                    setTeams(res.data);
                    console.log(res.data); // Check the structure here
                }
            })
            .catch((err) => console.log(err));
    }, []);

    function handleDelete(tId,tName) {
        if (confirm("Deseja excluir a equipe " + tName + "?")) {
            instance
                .delete(`/team/${tId}`)
                .then(() => {
                    setTeams(teams.filter(teams => teams.id !== tId));
                })
                .catch(error => {
                    console.error('Error deleting team:', error);
                });
        }
    }
    function handleDeleteMember(mId,mName) {
        if (confirm("Deseja excluir o colaborador " + mName + "?")) {
            instance
                .delete(`/members/${mId}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error deleting member:', error);
                });
        }
    }

    return (
        <div className="team-list">
            <h2 className='title'>Equipes</h2>
            <div className="container">
                <Accordion>
                    {teams.map((team) => (
                        <Accordion.Item eventKey={team.id} key={team.id}>
                            <Accordion.Header>{team.name}</Accordion.Header>
                            <Accordion.Body>
                                {team.membersteam && Object.keys(team.membersteam).length > 0 ? (
                                    <ul>
                                        {Object.entries(team.membersteam).map(([key, member]) => (
                                            <li key={key}>
                                                {member.name} - {member.email} - {member.totalHours} horas
                                                {member.totalHours ===0?(<Button size="sm" className="deleteMemberButton" variant="danger" onClick={() => handleDeleteMember(member.id,member.name)}> Excluir </Button>):(<></>)}
                                                <hr/>
                                            </li>           
                                        ))}
                                    </ul>
                                ) : (
                                    <div>
                                        <p>Não há membros</p>
                                        <Button variant="danger" onClick={() => handleDelete(team.id,team.name)} className="deleteTeamButton">Excluir Equipe</Button>
                                    </div>
                                )}
                                <Button>Adicionar colaborador</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default TeamList;