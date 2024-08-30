import React, { useState, useEffect } from 'react';
import instance from '../../../../services/firestore';
import { Form, Button } from 'react-bootstrap'

function ActivityForm({ members }) {
    const [duration, setDuration] = useState(1);
    const [validated, setValidated] = useState(false);
    const [description, setDescription] = useState();
    const [assignedTo, setAssignedTo] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                // Perform form submission
                await instance.post('tasks', {
                    "description": description,
                    "endDate": getTodayDate(),
                    "priority": 'Alta',
                    "status": 'Em progresso',
                    "assignedTo": assignedTo,
                    "duration": duration
                });

                if (!alert('Atividade criada com sucesso!')) { window.location.reload(); }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Erro ao criar atividade!')
            }
        }
        setValidated(true);
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const sortedMembers = members.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="form-container">
            <h2>Cadastrar Atividade</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Colaborador</Form.Label>
                    <Form.Select aria-label="Carregando..." onChange={(e) => setAssignedTo(e.target.value)}>
                        {sortedMembers.length > 0 ? (
                            sortedMembers.map((member) => (
                                <option key={member.id} value={member.id}>{member.name} ({member.email})</option>
                            ))
                        ) : (
                            'Erro ao carregar colaboradores.'
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={(e) => setDescription(e.target.value)} required />
                    <br />
                    <div className='slider-container'>
                        <label htmlFor="slider">Quantidade de horas</label>
                        <input
                            id="slider"
                            type="range"
                            min="1"
                            max="72"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <span id='slider-value'>{duration} hora(s).</span>
                    </div>
                    <br />
                    <Button type="submit">Enviar</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default ActivityForm;