import React, { useState, useEffect } from 'react';
import instance from '../../../../services/firestore';
import { Form, Button } from 'react-bootstrap'

function ActivityForm({ members }) {
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        console.log('members: ' + { members })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <section className="form-container">
            <h2>Cadastrar Atividade</h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Colaborador</Form.Label>
                    <Form.Select aria-label="Carregando...">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <option value={member.id}>{member.name} ({member.email})</option>
                            ))
                        ) : (
                            <p>Erro ao carregar colaboradores.</p>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={2} />
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
                    <Button>Enviar</Button>
                </Form.Group>
            </Form>
        </section>
    );
}

export default ActivityForm;