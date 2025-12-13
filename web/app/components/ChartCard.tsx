export default function ChartCard({ chart }: { chart: any }) {
  return (
    <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-8 max-w-3xl mx-auto transition-transform transform hover:scale-[1.01]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Generated Chart
      </h2>

      {chart && chart.length ? (
        <pre className="bg-gray-50 p-4 rounded-2xl text-sm overflow-auto font-mono max-h-[400px]">
          {JSON.stringify(chart, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-500 text-center">No data available for this URL.</p>
      )}

      <p className="text-sm text-gray-400 mt-4 italic text-center">
        *This is real PostHog data.*
      </p>
    </div>
  );
}
