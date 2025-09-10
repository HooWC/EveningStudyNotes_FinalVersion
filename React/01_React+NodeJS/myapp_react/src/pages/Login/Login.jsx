import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/users"); // 登录成功跳转
    } catch (err) {
      alert("登录失败: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>登录</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

export default Login;