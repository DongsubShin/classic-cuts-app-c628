import React from 'react';
import AdminSidebar from '../components/layout/AdminSidebar';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-md text-sm font-medium">
              Export Report
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$4,250', icon: 'lucide:dollar-sign', color: 'text-green-600' },
            { label: 'Appointments', value: '24', icon: 'lucide:calendar', color: 'text-blue-600' },
            { label: 'New Clients', value: '12', icon: 'lucide:user-plus', color: 'text-purple-600' },
            { label: 'Commission Due', value: '$840', icon: 'lucide:banknote', color: 'text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <span className="iconify text-xl" data-icon={stat.icon}></span>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Recent Bookings</h2>
            <button className="text-[#ED1C24] text-sm font-medium hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Client</th>
                <th className="px-6 py-3 font-semibold">Service</th>
                <th className="px-6 py-3 font-semibold">Time</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">John Doe</div>
                    <div className="text-xs text-slate-500">john@example.com</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Classic Haircut</td>
                  <td className="px-6 py-4 text-sm text-slate-600">10:30 AM</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;