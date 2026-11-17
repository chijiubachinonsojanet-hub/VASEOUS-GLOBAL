import { useEffect, useState } from 'react';
import { leadRecords } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

function LeadsPage() {
  const [leads, setLeads] = useState(leadRecords);

  useEffect(() => {
    let active = true;
    const loadLeads = async () => {
      const data = await getDashboardData();
      if (active && data.leads?.length) {
        setLeads(data.leads);
      }
    };

    loadLeads();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Leads</p>
          <h2>Prospective buyers</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Source</th>
              <th>Next follow-up</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.name || lead.id}>
                <td>{lead.name}</td>
                <td>{lead.interest}</td>
                <td>{lead.source}</td>
                <td>{lead.follow_up ?? lead.followUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsPage;
