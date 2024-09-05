import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import instance from '../../../../services/firestore';

function MemberModal({ team }) {
    const [show, setShow] = useState(false);
    const [changes, setChanges] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        console.log(password);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await instance.post('members', {
                    "name": name,
                    "email": email,
                    "teamId": team.id,
                    "password": password
                });

                if (!alert('Colaborador criado com sucesso na equipe:' + team.name)) { window.location.reload(); }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Erro ao criar colaborador!')
            }
        }
        setValidated(true);
    };


    return (
        <>
            <Button style={{ backgroundColor: 'lightseagreen' }} onClick={handleShow}>
                Adicionar Colaborador
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{team.name}</Modal.Title><br></br>
                </Modal.Header>
                <Modal.Body>
                    <h5>Novo Colaborador</h5>
                    <Form noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                id="nameInput"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do colaborador"
                                aria-label="Nome do colaborador"
                            />
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                id="emailInput"
                                type="mail"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail do colaborador"
                                aria-label="E-mail do colaborador"
                            />
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                id="pwdInput"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha"
                                aria-label="Senha"
                            />
                            <Button type="submit" onClick={handleSubmit} className='memberModalButton'>Enviar</Button>
                        </Form.Group>
                    </Form>
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

export default MemberModal;