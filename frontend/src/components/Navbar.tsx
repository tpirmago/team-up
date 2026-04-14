import './Navbar.css';

const Navbar = () => {
  const menuItems = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'My Projects', id: 'my-projects' },
    { name: 'Create Project', id: 'create-project' },
    { name: 'Find New Project', id: 'find-project' },
    { name: 'Connect with students', id: 'connect', active: true },
    { name: 'Notifications', id: 'notifications' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button 
            key={item.id} 
            className={`menu-item ${item.active ? 'active-btn' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
