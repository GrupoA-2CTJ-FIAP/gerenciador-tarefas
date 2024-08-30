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

    function handleDelete(tId) {
        console.log(tId);
        if (confirm("Deseja excluir a atividade " + tId + "?")) {
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

    return (
        <div className="team-list">
            <h2 className='title'>Equipes</h2>
            <Table className="table">
                <thead>
                    <tr>
                        <th>Equipe</th>
                        <th>ID</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.name || 'N/A'}</td>
                                <td>{team.id || 'N/A'}</td>
                                <td><Button variant='danger' onClick={() => handleDelete(team.id)}>X</Button></td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3">Erro ao carregar equipes.</td></tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default TeamList;