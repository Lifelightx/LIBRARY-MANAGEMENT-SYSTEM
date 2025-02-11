import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context';
import axios from 'axios';

const UserPage = () => {
    const { adminToken, url } = useContext(StoreContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${url}api/users/allusers`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [adminToken, url]);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${url}api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user');
                console.error(err);
            }
        }
    };

    const handleUpdate = async (userId, updatedData) => {
        try {
            await axios.put(`${url}api/users/${userId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            setError('Failed to update user');
            console.error(err);
        }
    };

    return (
        <div className="px-15 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#006D77]">User Management</h1>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-[#006D77] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Username</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Password</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Fines</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users
                            .filter(user => user.role !== "admin") // Exclude admin users
                            .map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    {editingUser === user._id ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    defaultValue={user.username}
                                                    className="w-full px-2 py-1 border rounded"
                                                    onChange={(e) => user.username = e.target.value}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="email"
                                                    defaultValue={user.email}
                                                    className="w-full px-2 py-1 border rounded"
                                                    onChange={(e) => user.email = e.target.value}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    defaultValue={user.password}
                                                    className="w-full px-2 py-1 border rounded"
                                                    onChange={(e) => user.password = e.target.value}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    defaultValue={user.role}
                                                    className="w-full px-2 py-1 border rounded"
                                                    onChange={(e) => user.role = e.target.value}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Staff</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    defaultValue={user.fines}
                                                    className="w-full px-2 py-1 border rounded"
                                                    onChange={(e) => user.fines = Number(e.target.value)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleUpdate(user._id, user)}
                                                    className="bg-[#006D77] text-white px-3 py-1 rounded mr-2 hover:bg-[#005a63]"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingUser(null)}
                                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4">{user.username}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.password}</td>
                                            <td className="px-6 py-4">{user.role}</td>
                                            <td className="px-6 py-4">Rs. {user.fines}.00</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setEditingUser(user._id)}
                                                    className="text-[#006D77] hover:text-[#005a63] mr-4"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserPage;