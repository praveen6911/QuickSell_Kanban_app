import React, { useState, useRef, useEffect } from 'react';
import displayicon from './assets/icons/Display.svg';
import downIcon from './assets/icons/down.svg';

const DisplayMenu = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="display-menu" ref={menuRef}>
      <button onClick={toggleMenu} className="display-button">
        <span className="icon"><img src={displayicon} alt="" /></span> Display <span className="arrow"><img src={downIcon} alt="" /></span>
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-item">
            <label>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-item">
            <label>Ordering</label>
            <select
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayMenu;