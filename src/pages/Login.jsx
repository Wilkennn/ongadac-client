/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import fotoLogin from '../assets/login-image.png';
import logo from '../assets/adaclogoredonda.png';
import AuthService from '../services/AuthService';
import '../styles/Login.css';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await AuthService.login(values.email, values.senha);
            if (response && response.user) {
                message.success('Login realizado com sucesso!');
                navigate(`/dashboard`);
            } else {
                message.error('Erro ao realizar login. Verifique suas credenciais.');
            }
        } catch (error) {
            // Mostrar erro mais detalhado
            console.error(error);
            message.error('Erro ao realizar login. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Login-container">
            <div className="Login-image">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <img src={fotoLogin} alt="Login" />
            </div>
            <div className="Login-form">
                <h1>Login</h1>
                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ prefix: '55' }}
                    scrollToFirstError={false}
                >
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    { type: 'email', message: 'O e-mail inserido não é válido!' },
                                    { required: true, message: 'Por favor, insira seu e-mail!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                label="Senha"
                                name="senha"
                                rules={[
                                    { required: true, message: 'Por favor, insira sua senha!' },
                                    { min: 6, message: 'A senha deve ter pelo menos 6 caracteres.' },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{marginLeft: '10rem'}}>
                            Entrar
                        </Button>
                        <div className='possuiConta'>
                            <p style={{ margin: 0 }}>
                                Ainda não tem cadastro?
                                <Link to="/Cadastro">
                                    <span style={{ fontWeight: 'bold', color: '#1890ff', marginLeft: '15px' }}> Cadastre-se </span>
                                </Link>
                                <span style={{ margin: '2.4px' }}> | </span>
                                <Link to="/recover-password" style={{ color: '#FF743C', fontWeight: 'bold' }}> Esqueceu sua senha?</Link>
                            </p>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
