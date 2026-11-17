import { pipelineColumns } from '../../data/adminSeed';

function PipelinePage() {
  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Sales pipeline</p>
          <h2>Pipeline board</h2>
        </div>
      </div>

      <div className="pipeline-board">
        {pipelineColumns.map((column) => (
          <div className="pipeline-column" key={column.stage}>
            <div className="pipeline-header">{column.stage}</div>
            <div className="pipeline-cards">
              {column.items.map((item) => (
                <div className="pipeline-card" key={`${column.stage}-${item}`}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PipelinePage;
