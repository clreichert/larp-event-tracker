import IssueLogger from '../IssueLogger';

export default function IssueLoggerExample() {
  return (
    <div className="p-6 max-w-4xl">
      <IssueLogger onSubmit={(issue) => console.log('Issue submitted:', issue)} />
    </div>
  );
}
