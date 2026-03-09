import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const links = [
    { to: '/admin', icon: 'lucide:layout-dashboard', label: 'Dashboard' },
    { to: '/admin/clients', icon: 'lucide:users', label: 'Clients' },
    { to: '/admin/commission', icon: 'lucide:banknote', label: 'Commission' },
  ];

  const systemLinks = [
    { to: '/admin/sms', icon: 'lucide:message-square', label: 'SMS Settings' },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col fixed h-full">
      <div className="p-6">
        <span className="text-xl font-bold text-[#ED1C24]">Classic Cuts</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? 'bg-slate-100 text-[#ED1C24]' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <span className="iconify text-lg" data-icon={link.icon}></span>
            {link.label}
          </NavLink>
        ))}
        
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2 px-2">System</p>
        {systemLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? 'bg-slate-100 text-[#ED1C24]' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <span className="iconify text-lg" data-icon={link.icon}></span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;