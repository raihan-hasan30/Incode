import { useEffect, useState } from "react";
import UserTable from "../../components/admin/UserTable";
import getUsersApi from "../../repository/get-users-api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsersApi();
        setUsers(res.data.users || []);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-zinc-100">Registered Users</h1>
      {loading ? <div className="text-zinc-400">Loading...</div> : <UserTable users={users} />}
    </div>
  );
}
