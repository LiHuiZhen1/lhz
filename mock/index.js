export default [
  {
    url: "/api/register",
    method: "post",
    response: ({ body }) => {
      const { username, email, password, confirm } = body;
      if (password === confirm) {
        return { status: "success" };
      } else {
        return { status: "error", message: "两次输入的密码不一致" };
      }
    },
  },
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      if (username === "admin" && password === "Password123") {
        return {
          code: 0,
          status: "success",
          message: "登录成功",
          data: { token: "fakeToken123" },
        };
      } else {
        return {
          code: 1,
          message: "用户名或密码错误",
        };
      }
    },
  },
];
