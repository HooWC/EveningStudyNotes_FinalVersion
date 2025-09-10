import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users"); // 调用 Node API
        setUsers(res.data);
      } catch (err) {
        setError("获取用户失败，请先登录");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="users">
      <h1>用户列表</h1>
      {users.length === 0 ? (
        <p>暂无用户数据</p>
      ) : (
        <ul className="user-list">
          {users.map((u) => (
            <li key={u.UserID}>
              <strong>{u.FullName}</strong> - {u.Email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;