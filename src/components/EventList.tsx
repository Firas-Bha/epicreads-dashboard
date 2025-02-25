import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: string;
  printerId: string;
  timestamp: string;
  status: string;
}

interface EventListProps {
  printerId: string;
}

const EventList: React.FC<EventListProps> = ({ printerId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!printerId) return;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/printers/${printerId}/events`);
        setEvents(response.data);
      } catch (err) {
        setError("Error loading events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [printerId]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Events for Printer {printerId}</h3>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;
