"use client"
import React, { useState } from 'react';
import { Button, Input, Form, Typography, notification } from 'antd';
import styles from './page.module.css';

const { Title } = Typography;

const LoginSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const onFinish = (values: any) => {
    if (isSignUp) {
      console.log('Sign Up Values:', values);
      notification.success({
        message: 'Sign Up Successful',
        description: 'You have successfully signed up!',
      });
      return;
    }

    if (values.email === 'user@example.com' && values.password === 'password') { // waiting until backend is made
      console.log('Login Values:', values);
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });
    } else {
      notification.error({
        message: 'Login Failed',
        description: 'Invalid email or password!',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Title level={2}>{isSignUp ? 'Sign Up' : 'Login'}</Title>
        <Form
          className={styles.form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {isSignUp && (
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
        <Button
          className={styles.switchButton}
          type="link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </Button>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
