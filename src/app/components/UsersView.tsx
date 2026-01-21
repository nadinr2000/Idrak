import { Users, Plus, Edit, Trash2, Shield } from 'lucide-react';

const users = [
  { id: '1', name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'active', lastActive: '5m ago' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Manager', status: 'active', lastActive: '2h ago' },
  { id: '3', name: 'Mike Wilson', email: 'mike@company.com', role: 'Technician', status: 'active', lastActive: '1d ago' },
  { id: '4', name: 'Emily Davis', email: 'emily@company.com', role: 'Viewer', status: 'inactive', lastActive: '5d ago' },
];

export function UsersView() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage user access and permissions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <Plus className="size-5" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Active Users</p>
          <p className="text-3xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Admins</p>
          <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'Admin').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Inactive</p>
          <p className="text-3xl font-bold text-red-600">{users.filter(u => u.status === 'inactive').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-gray-400" />
                    <span className="text-gray-900">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastActive}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <Edit className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded transition-colors">
                      <Trash2 className="size-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
