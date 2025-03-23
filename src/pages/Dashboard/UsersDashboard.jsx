import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import UsersTable from '../../components/Dashboard/UsersTable';
import UserActivityLog from '../../components/Dashboard/UserActivityLog';
import { FaUsers, FaUserTie, FaUserShield, FaUserClock, FaFilter } from 'react-icons/fa';

const UsersDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'admin', 'recruiter', 'user'
  
  // Generate users data
  useEffect(() => {
    const generateUsersData = () => {
      const data = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'Admin',
          status: 'Active',
          joinDate: 'Jan 15, 2023',
          lastActive: '2 hours ago',
          avatar: null
        },
        {
          id: 2,
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          role: 'Recruiter',
          status: 'Active',
          joinDate: 'Feb 10, 2023',
          lastActive: '1 day ago',
          avatar: null
        },
        {
          id: 3,
          name: 'Robert Davis',
          email: 'robert.davis@example.com',
          role: 'User',
          status: 'Active',
          joinDate: 'Mar 5, 2023',
          lastActive: '3 days ago',
          avatar: null
        },
        {
          id: 4,
          name: 'Emily Wilson',
          email: 'emily.wilson@example.com',
          role: 'Recruiter',
          status: 'Inactive',
          joinDate: 'Jan 20, 2023',
          lastActive: '2 weeks ago',
          avatar: null
        },
        {
          id: 5,
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          role: 'Admin',
          status: 'Active',
          joinDate: 'Feb 15, 2023',
          lastActive: '1 hour ago',
          avatar: null
        },
        {
          id: 6,
          name: 'Sarah Miller',
          email: 'sarah.miller@example.com',
          role: 'User',
          status: 'Pending',
          joinDate: 'Mar 10, 2023',
          lastActive: 'Never',
          avatar: null
        },
        {
          id: 7,
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          role: 'Recruiter',
          status: 'Active',
          joinDate: 'Jan 25, 2023',
          lastActive: '5 hours ago',
          avatar: null
        },
        {
          id: 8,
          name: 'Jennifer Lee',
          email: 'jennifer.lee@example.com',
          role: 'User',
          status: 'Active',
          joinDate: 'Feb 20, 2023',
          lastActive: '1 day ago',
          avatar: null
        },
        {
          id: 9,
          name: 'Thomas Anderson',
          email: 'thomas.anderson@example.com',
          role: 'Admin',
          status: 'Active',
          joinDate: 'Mar 15, 2023',
          lastActive: '30 minutes ago',
          avatar: null
        },
        {
          id: 10,
          name: 'Jessica Taylor',
          email: 'jessica.taylor@example.com',
          role: 'Recruiter',
          status: 'Inactive',
          joinDate: 'Jan 30, 2023',
          lastActive: '1 month ago',
          avatar: null
        }
      ];
      
      setUsersData(data);
    };
    
    generateUsersData();
  }, []);
  
  // Filter users based on active tab
  const filteredUsers = activeTab === 'all' 
    ? usersData 
    : usersData.filter(user => user.role.toLowerCase() === activeTab);
  
  // Users stats data
  const statsData = [
    { 
      title: 'Total Users', 
      value: usersData.length.toString(), 
      change: '+15%', 
      isPositive: true,
      icon: <FaUsers className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Active Users', 
      value: usersData.filter(user => user.status === 'Active').length.toString(), 
      change: '+10%', 
      isPositive: true,
      icon: <FaUserClock className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Recruiters', 
      value: usersData.filter(user => user.role === 'Recruiter').length.toString(), 
      change: '+20%', 
      isPositive: true,
      icon: <FaUserTie className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Admins', 
      value: usersData.filter(user => user.role === 'Admin').length.toString(), 
      change: '0%', 
      isPositive: true,
      icon: <FaUserShield className="text-[#818cf8] text-xl" />
    },
  ];
  
  // Recent user activities
  const userActivities = [
    { 
      id: 1, 
      type: 'user_registered', 
      title: 'New User Registered', 
      description: 'Sarah Miller joined the platform', 
      time: '2 hours ago',
      user: 'Sarah Miller'
    },
    { 
      id: 2, 
      type: 'role_changed', 
      title: 'Role Changed', 
      description: 'Alice Johnson promoted to Recruiter', 
      time: '3 hours ago',
      user: 'Alice Johnson'
    },
    { 
      id: 3, 
      type: 'user_login', 
      title: 'User Login', 
      description: 'John Smith logged in', 
      time: '5 hours ago',
      user: 'John Smith'
    },
    { 
      id: 4, 
      type: 'user_updated', 
      title: 'Profile Updated', 
      description: 'Robert Davis updated profile', 
      time: '1 day ago',
      user: 'Robert Davis'
    },
    { 
      id: 5, 
      type: 'admin_action', 
      title: 'Admin Action', 
      description: 'Michael Brown reset user password', 
      time: '2 days ago',
      user: 'Michael Brown'
    },
    { 
      id: 6, 
      type: 'user_suspended', 
      title: 'User Suspended', 
      description: 'Jessica Taylor account suspended', 
      time: '3 days ago',
      user: 'Jessica Taylor'
    },
  ];
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Users Dashboard</h1>
          <p className="text-[#94a3b8]">Manage and monitor all users across your platform</p>
        </div>
        
        {/* Users Stats */}
        <DashboardStats stats={statsData} />
        
        {/* Filter Tabs */}
        <div className="flex mb-6 bg-[#1e293b] rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('all')}
          >
            All Users
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'admin' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('admin')}
          >
            <FaUserShield className="mr-2" /> Admins
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'recruiter' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('recruiter')}
          >
            <FaUserTie className="mr-2" /> Recruiters
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'user' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('user')}
          >
            <FaUsers className="mr-2" /> Regular Users
          </button>
        </div>
        
        {/* Users Table and Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <UsersTable 
              users={filteredUsers} 
              showRole={true} 
            />
          </div>
          <div>
            <UserActivityLog activities={userActivities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersDashboard;