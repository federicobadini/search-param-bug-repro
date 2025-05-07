interface TargetPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TargetPage(props: TargetPageProps) {
  const searchParams = await props.searchParams;
  console.log("[TargetPage] Received searchParams on page:", searchParams);

  if (!searchParams || Object.keys(searchParams).length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <div className="container mx-auto p-4 pt-8 md:p-8 max-w-3xl">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Target Page</h1>
            <p className="text-lg text-slate-600 mt-1">
              Displays Rewritten Query Params
            </p>
          </header>
          <div className="bg-white p-6 border border-slate-300 rounded-lg shadow-sm">
            <p className="text-slate-700">
              No search parameters were received on this page.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const paramsToDisplay = [];
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        paramsToDisplay.push({ key, value: item });
      }
    } else {
      paramsToDisplay.push({ key, value });
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 pt-8 md:p-8 max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Target Page</h1>
          <p className="text-lg text-slate-600 mt-1">
            Displays Rewritten Query Params
          </p>
        </header>

        <section className="bg-white p-6 border border-slate-300 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">
            <code>searchParams</code> Prop Received by Page (JSON):
          </h2>
          <pre className="bg-slate-100 p-4 rounded-md border border-slate-200 text-sm text-slate-700 overflow-x-auto whitespace-pre-wrap break-all">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </section>

        <section className="bg-white p-6 border border-slate-300 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Detailed List of Parameters:
          </h2>
          {paramsToDisplay.length > 0 ? (
            <ul className="space-y-3">
              {paramsToDisplay.map((param, index) => (
                <li
                  key={index}
                  className="flex items-baseline pb-3 border-b border-slate-200 last:border-b-0"
                >
                  <strong
                    className="text-slate-600 w-1/3 truncate pr-2"
                    title={param.key}
                  >
                    {param.key}:
                  </strong>
                  <span
                    className={`w-2/3 break-all ${
                      param.value === ""
                        ? "text-red-500 italic"
                        : "text-slate-800"
                    }`}
                  >
                    {param.value === "" ? "(empty string)" : param.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-600">
              No search parameters in the list to display.
            </p>
          )}
        </section>

        <footer className="mt-10 pt-6 border-t border-slate-300 text-sm text-slate-500">
          <p>
            This page displays the <code>searchParams</code> after being
            rewritten by the middleware. Review the server console for detailed
            middleware logs.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Paths starting with <code>/test-rewrite/buggy/...</code>{" "}
              demonstrate the issue.
            </li>
            <li>
              Paths starting with <code>/test-rewrite/fixed/...</code>{" "}
              demonstrate the workaround.
            </li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
