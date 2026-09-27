import { useMemo, useState } from 'react'
import './App.css'

const tickets = [
  {
    id: 'WO-1048',
    title: 'HVAC unit rattling in loading dock',
    location: 'North Receiving',
    status: 'In Progress',
    priority: 'High',
    assignee: 'M. Singh',
    eta: 'Today, 3:30 PM',
  },
  {
    id: 'WO-1032',
    title: 'Broken exit sign at west stairwell',
    location: 'Building A / Floor 2',
    status: 'Scheduled',
    priority: 'Medium',
    assignee: 'L. Ortiz',
    eta: 'Tomorrow, 9:00 AM',
  },
  {
    id: 'WO-1019',
    title: 'Restroom sink leaking under cabinet',
    location: 'South Wing',
    status: 'Waiting on Parts',
    priority: 'Urgent',
    assignee: 'J. Patel',
    eta: 'Pending delivery',
  },
  {
    id: 'WO-1006',
    title: 'Parking gate sensor misreading vehicles',
    location: 'Visitor Lot',
    status: 'Open',
    priority: 'Low',
    assignee: 'T. Brooks',
    eta: 'This week',
  },
]

const statusOptions = ['All', 'Open', 'In Progress', 'Scheduled', 'Waiting on Parts']
const priorityOptions = ['All', 'Urgent', 'High', 'Medium', 'Low']

function App() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter

      return matchesStatus && matchesPriority
    })
  }, [statusFilter, priorityFilter])

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations desk</p>
          <h1>Work Orders</h1>
        </div>
        <button type="button" className="primary-button">
          New Ticket
        </button>
      </header>

      <section className="summary-grid" aria-label="Ticket overview">
        <div className="summary-card">
          <span className="summary-label">Open</span>
          <strong>24</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">In progress</span>
          <strong>9</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Due today</span>
          <strong>6</strong>
        </div>
      </section>

      <section className="filter-bar" aria-label="Ticket filters">
        <label>
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="ticket-list" aria-label="Sample work order tickets">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <article key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <div>
                  <p className="ticket-id">{ticket.id}</p>
                  <h2>{ticket.title}</h2>
                </div>
                <span className={`priority priority-${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
              </div>

              <div className="ticket-meta">
                <span>{ticket.location}</span>
                <span>{ticket.assignee}</span>
              </div>

              <div className="ticket-footer">
                <span className={`status status-${ticket.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {ticket.status}
                </span>
                <span className="eta">ETA: {ticket.eta}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">No tickets match the selected filters.</div>
        )}
      </section>
    </main>
  )
}

export default App
