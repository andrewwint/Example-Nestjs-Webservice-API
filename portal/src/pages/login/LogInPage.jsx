import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Row, Form, Col, Button } from 'react-bootstrap';
import './LogInPage.scss';
import * as AuthService from '../../services/auth.service';

/**
 * Yup Validation @see https://github.com/jquense/yup for details
 * Custom Hook with Resolver @see https://react-hook-form.com/advanced-usage/#CustomHookwithResolver for details
 */
const Schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(4)
    .max(64),
  password: yup
    .string()
    .required()
    .min(8)
    .max(128)
});

const LogInPage = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    setMessage('');
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        props.history.push('/dashboard');
        window.location.reload();
      },
      (error) => {
        const resMessage = AuthService.getErrorMessage(error);
        setLoading(false);
        setMessage(resMessage);
      }
    );

    setLoading(false);
  };

  return (
    <Row className="justify-content-md-center align-middle pt-5">
      <Col xs lg="5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row}>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Email
            </Form.Label>

            <Col className="text-center text-uppercase">
              <h3>Portal Login</h3>
              <p>
                <img
                  src="/assets/icons/person-circle.svg"
                  alt="Portal Login"
                  width="40%"
                  height="40%"
                />
              </p>
              <Form.Control
                type="username"
                placeholder="Username"
                name="username"
                ref={register}
                size="lg"
              />
              <p className="text-danger">{errors.username?.message}</p>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Password
            </Form.Label>
            <Col className="text-center text-uppercase">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                ref={register}
                size="lg"
              />
              <p className="text-danger">{errors.password?.message}</p>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Button type="submit" block size="lg" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Login</span>
              </Button>
            </Col>
          </Form.Group>
          {message && (
            <Form.Group as={Row}>
              <Col>
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </Col>
            </Form.Group>
          )}
        </Form>
      </Col>
    </Row>
  );
};
export default LogInPage;
