import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn.jsx';
import backlog from './assets/icons/Backlog.svg';
import cancelled from './assets/icons/Cancelled.svg';
import done from './assets/icons/Done.svg';
import user from './assets/icons/user.png';
import inprogress from './assets/icons/in-progress.svg';
import todo from './assets/icons/To-do.svg';

import urgentPriority from './assets/icons/SVG - Urgent Priority colour.svg';
import highPriority from './assets/icons/Img - High Priority.svg';
import mediumPriority from './assets/icons/Img - Medium Priority.svg';
import lowPriority from './assets/icons/Img - Low Priority.svg';
import noPriority from './assets/icons/No-priority.svg';

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  const groupedAndSortedTickets = useMemo(() => {
    let groups = {};
    let statusGroups = ['Todo', 'In progress', 'Done', 'Canceled', 'Backlog'];

    if (grouping === 'status') {
      groups = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
        return acc;
      }, {});
      statusGroups.forEach(status => {
        if (!groups[status]) groups[status] = [];
      });
    } else if (grouping === 'user') {
      groups = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        acc[user.name] = [...(acc[user.name] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      groups = tickets.reduce((acc, ticket) => {
        acc[priorityNames[ticket.priority]] = [...(acc[priorityNames[ticket.priority]] || []), ticket];
        return acc;
      }, {});
      priorityNames.forEach(priority => {
        if (!groups[priority]) groups[priority] = [];
      });
    }

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return a.priority - b.priority;
        } else if (sorting === 'title') {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  }, [tickets, users, grouping, sorting]);

  const getGroupIcon = (groupName) => {
    const icons = {
      'Todo': todo,
      'In progress': inprogress,
      'Done': done,
      'Canceled': cancelled,
      'Backlog': backlog,
    };
    const priorityIcons = {
      'No priority': noPriority,
      'Low': lowPriority,
      'Medium': mediumPriority,
      'High': highPriority,
      'Urgent': urgentPriority
    };
    if(grouping === 'user') return user;
    if(grouping === 'priority') return priorityIcons[groupName];
    if(grouping === 'status')
    return icons[groupName] || '📌';
  };

  return (
    <div className="kanban-board">
      {Object.entries(groupedAndSortedTickets).map(([groupName, groupTickets]) => (
        <KanbanColumn 
          key={groupName} 
          title={groupName} 
          grouping={grouping}
          sorting={sorting}
          tickets={groupTickets} 
          icon={getGroupIcon(groupName)}
          count={groupTickets.length}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;