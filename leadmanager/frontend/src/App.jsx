import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              {lead.name}-----{lead.email}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
