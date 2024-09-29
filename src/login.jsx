import React, { useState,useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 获取本地存储的用户信息
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const data = JSON.parse(userInfo);
      form.setFieldsValue({ ...data });
    }
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 登录请求
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        message.success("登录成功");
        if (values.remember == true) {
          localStorage.setItem("userInfo", JSON.stringify(values));
        }
      } else {
        message.error("用户名或密码错误111");
      }
    } catch (error) {
      console.log(error);

      message.error("请求失败，请重试");
    } finally {
      setLoading(false);
    }
  };
  const goRegister= ()=> {
    props.onChangeFlag(1);
  }
  return (
    <Form
      form={form}
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          {
            validator: (_, value) => {
              if (value && value.length < 8) {
                return Promise.reject(new Error("密码长度至少为8位"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
        <Button onClick={goRegister}>Register</Button>
      </Form.Item>
    </Form>
  );
};
export default Login;