import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../../../../services/firestore';

function cardModal({ member }) {
    const [show, setShow] = useState(false);
    const [changes, setChanges] = useState(false);
    const [activities, setActivities] = useState([]);
    const handleClose = () => { if (changes) { window.location.reload(); } else { setShow(false) } };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!(member.totalHours === 0)) {
            instance
                .get('tasks')
                .then((res) => {
                    // Filter activities based on the assignedTo property matching member.id
                    const filteredActivities = res.data.filter(activity => activity.assignedTo === member.id);
                    setActivities(filteredActivities);
                    console.log('getting activities for: ' + member.name + ' hours:' + member.totalHours);
                });
        }
    }, [member.id]); // Add member.id as a dependency to re-fetch if the member changes

    function handleDelete(aId) {
        console.log(aId);
        if (confirm("Deseja excluir a atividade " + aId + "?")) {
            instance
                .delete(`/tasks/${aId}`)
                .then(() => {
                    setActivities(activities.filter(activity => activity.id !== aId));
                    setChanges(true);
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                });
        }

    }

    return (
        <>
            <Button style={{ backgroundColor: 'cadetblue' }} onClick={handleShow} disabled={activities.length === 0}>
                {activities.length === 0 ? ("Nenhuma Atividade") : ("Ver Atividades")}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{member.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div key={activity.id}>
                                <strong>ID:</strong> {activity.id} <br />
                                <strong>Atividade:</strong> {activity.description || 'No task name provided'} <br />
                                <strong>Carga Horária:</strong> {activity.duration} hora(s)<br />
                                <Button variant='danger' size='sm' onClick={() => handleDelete(activity.id)}>Excluir</Button>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>Sem atividades designadas a este colaborador.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default cardModal;