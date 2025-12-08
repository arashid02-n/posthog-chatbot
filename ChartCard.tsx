export default function ChartCard({ chart }: { chart: any }) {
  return (
    <div className="bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Generated Chart</h2>

      <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-auto">
        {JSON.stringify(chart, null, 2)}
      </pre>

      <p className="text-sm text-slate-500 mt-4">
        *This is demo output. Final version will render real PostHog charts.*
      </p>
    </div>
  );
}
