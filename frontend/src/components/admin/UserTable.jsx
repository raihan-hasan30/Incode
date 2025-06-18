function UserTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-800">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-900 divide-y divide-zinc-800">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-zinc-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-zinc-100 font-semibold text-base">{u.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-100">{u.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-100">{u.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-300">{u.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{u.role}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-sm">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
