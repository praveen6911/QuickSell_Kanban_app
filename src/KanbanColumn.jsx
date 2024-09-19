import React from 'react';
import TicketCard from './TicketCard.jsx';
import add from './assets/icons/add.svg';
import menu3dot from './assets/icons/3 dot menu.svg';

const KanbanColumn = ({ title, tickets, icon, count, grouping, sorting }) => {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <span className="icon"><img src={icon} alt=""/></span>
        <h2>{title}<span className="count">{count}</span></h2>
        
        <button className="add-button"><img src={add} alt="" /></button>
        <button className="more-button"><img src={menu3dot} alt="" style={{border: 'none', outline: 'none'}}/></button>
      </div>
      <div className="tickets-container">
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} sorting={sorting}/>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;