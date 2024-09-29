import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

const Register = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
    //   注册请求
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.status === 'success') {
        message.success('注册成功');
        props.onChangeFlag(2);
      } else {
        message.error('注册失败，请重试');
      }
    } catch (error) {
        console.log(error);
        
      message.error('请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名!' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱!' },
          { type: 'email', message: '请输入正确的邮箱地址!' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码!' },
          { min: 8, message: '密码长度至少为8位' },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致!'));
            },
          }),
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;