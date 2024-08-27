import React, { useState, useEffect } from 'react';
import instance from '../../../../services/firestore';
import { Form, Button } from 'react-bootstrap'

function ActivityForm({ members }) {
    const [duration, setDuration] = useState(1);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Form is invalid.');
        }else{
            console.log('Form is valid!');
        }

        setValidated(true);
    };

    return (
        <section className="form-container">
            <h2>Cadastrar Atividade</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Colaborador</Form.Label>
                    <Form.Select aria-label="Carregando...">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <option key={member.id} value={member.id}>{member.name} ({member.email})</option>
                            ))
                        ) : (
                            'Erro ao carregar colaboradores.'
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={2} required/>
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
        </section>
    );
}

export default ActivityForm;