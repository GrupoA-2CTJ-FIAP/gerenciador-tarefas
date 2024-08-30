import React, { useState, useEffect } from 'react';
import instance from '../../../../services/firestore';
import { Form, Button } from 'react-bootstrap'

function TeamForm({ teams }) {

    const [teamName, setTeamName] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await instance.post('team', {
                    "name": teamName
                });

                if (!alert('Equipe criada com sucesso!')) { window.location.reload(); }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Erro ao criar equipe!')
            }
        }
        setValidated(true);
    };

    return (
        <div className="team-form">
            <h2>Cadastrar Nova Equipe</h2>
            <Form noValidate>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Nome do time"
                        aria-label="Nome do time"
                    />
                    <Button type="submit" onClick={handleSubmit}>Enviar</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default TeamForm;