import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context';
import axios from 'axios';

function MyProfile() {
    const { url, token } = useContext(StoreContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const fetchUserData = async () => {
        if (!token) {
            setError("Authentication required. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${url}/api/users/getuserDetails`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data);
            setError(null);
        } catch (error) {
            console.error('Profile fetch error:', error);
            setError(error.response?.data?.message || "Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear any existing messages when user starts typing
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setPasswordError('All password fields are required');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long');
            return;
        }

        try {
            await axios.post(`${url}/api/users/updatePassword`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPasswordSuccess('Password updated successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Failed to update password');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [token, url]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-pulse text-lg text-gray-600">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                </div>
                
                <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                        {/* Profile Image */}
                        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-4xl text-[#006D77]">
                                    {userData?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="md:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">Username</label>
                                    <p className="text-gray-900">{userData?.username}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">Email</label>
                                    <p className="text-gray-900">{userData?.email}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">Member Since</label>
                                    <p className="text-gray-900">
                                        {new Date(userData?.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">Role</label>
                                    <p className="text-gray-900">{userData?.role || 'User'}</p>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="text-purple-800 font-semibold">Active Fines</h3>
                                    <p className="text-2xl font-bold text-purple-600">
                                        ${userData?.fines?.toFixed(2) || '0.00'}
                                    </p>
                                </div>
                            </div>

                            {/* Password Update Section */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Password</h3>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Current Password</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    {passwordError && (
                                        <div className="text-red-600 text-sm">{passwordError}</div>
                                    )}
                                    {passwordSuccess && (
                                        <div className="text-green-600 text-sm">{passwordSuccess}</div>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;