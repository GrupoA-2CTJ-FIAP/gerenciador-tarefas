import { Modal, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import instance from '../../../../services/firestore';

function MemberModal({ team }) {
    const { Formik } = formik;
    const [show, setShow] = useState(false);
    const [changes, setChanges] = useState(false);
    const handleClose = () => { if (changes) { window.location.reload(); } else { setShow(false) } };
    const handleShow = () => setShow(true);

    const schema = yup.object().shape({
        name: yup.string()
            .required('Preencha com o nome do colaborador.')
            .matches(/^[a-zA-Z\s]+$/, 'O nome deve conter apenas letras.')
            .min(3, 'Deve ter ao menos 3 letras.'),
        email: yup.string()
            .required('Insira o e-mail.')
            .email('E-mail inválido'),
        password: yup.string()
            .required('Insira uma senha.')
            .min(6, 'Senha muito curta (menos de 6 caracteres).')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'A senha deve conter letras, números e ao menos 8 caracteres.'),
        confirmPassword: yup.string()
            .required('Confirme sua senha.')
            .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await instance.post('members', {
                "name": values.name,
                "email": values.email,
                "teamId": team.id,
                "password": values.password,
            });
            alert('Colaborador criado com sucesso!');
            setChanges(true);
            resetForm();  // Optionally reset the form after successful submission
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Erro ao criar colaborador!');  // Show an error message
        } finally {
            setSubmitting(false);  // Set submitting to false when done
        }
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
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="validationFormik01">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback>Válido</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} mb="4" controlId="validationFormikUsername">
                                        <Form.Label>E-mail</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text>@</InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="nome@mail.com"
                                                aria-describedby="inputGroupPrepend"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormikPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Senha"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="validationFormikConfirmPassword">
                                        <Form.Label>Confirme a Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirme a senha"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        )}
                    </Formik>
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