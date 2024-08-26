import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../../../../services/firestore';

function Example({ member }) {
    const [show, setShow] = useState(false);
    const [activities, setActivities] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        instance
            .get('tasks')
            .then((res) => {
                // Filter activities based on the assignedTo property matching member.id
                const filteredActivities = res.data.filter(activity => activity.assignedTo === member.id);
                setActivities(filteredActivities);
            });
    }, [member.id]); // Add member.id as a dependency to re-fetch if the member changes

    return (
        <>
            <Button variant="secondary" onClick={handleShow} disabled={activities.length === 0}>
                Ver Atividades
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
                                <strong>Atividade:</strong> {activity.description || 'No task name provided'} <br/>
                                <strong>Carga Horária:</strong> {activity.duration} hora(s)<br />
                                <Button variant='danger' size='sm'>Excluir</Button>
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

export default Example;