import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ fullName, email, password })).unwrap();
      navigate("/users"); // 注册成功跳转
    } catch (err) {
      alert("注册失败: " + err.message);
    }
  };

  return (
    <div className="register-page">
      <h2>注册</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="姓名"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
        <button type="submit">注册</button>
      </form>
    </div>
  );
}

export default Register;