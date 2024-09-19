import React from 'react';
import urgentPriority from './assets/icons/SVG - Urgent Priority colour.svg';
import highPriority from './assets/icons/Img - High Priority.svg';
import mediumPriority from './assets/icons/Img - Medium Priority.svg';
import lowPriority from './assets/icons/Img - Low Priority.svg';
import noPriority from './assets/icons/No-priority.svg';

import backlog from './assets/icons/Backlog.svg';
import cancelled from './assets/icons/Cancelled.svg';
import done from './assets/icons/Done.svg';
import inprogress from './assets/icons/in-progress.svg';
import todo from './assets/icons/To-do.svg';

const TicketCard = ({ ticket, grouping, sorting }) => {
  const priorityIcons = [urgentPriority, highPriority, mediumPriority, lowPriority, noPriority];

  const icons = {
    'Todo': todo,
    'In progress': inprogress,
    'Done': done,
    'Canceled': cancelled,
    'Backlog': backlog,
  };

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping != "user" ? <span className="user-avatar">👤</span> : <></>}
      </div>
      <div className='ticket-title-out'>
        {grouping != "status" ? <span className="ticket-status"><img src={icons[ticket.status]} alt="" /></span> : <></>}
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="ticket-tags">
        <span className="priority-tag">
          <img src={priorityIcons[ticket.priority]} alt=""/>
        </span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="feature-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;