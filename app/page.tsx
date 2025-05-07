import Link from "next/link";

export default function HomePage() {
  const commonQuery = "name+key=value&another=val&third+space=test+value";
  const testUrlBuggy = `/test-rewrite/buggy/product?${commonQuery}`;
  const testUrlFixed = `/test-rewrite/fixed/product?${commonQuery}`;

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 pt-8 md:p-8 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Middleware Rewrite Bug & Workaround Demonstration
          </h1>
          <p className="text-md text-slate-600">
            These links will rewrite via middleware to <code>/target-page</code>
            , passing along query parameters. Observe the{" "}
            <code>searchParams</code> displayed on the target page and check the
            server console for middleware logs.
          </p>
        </header>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <Link
              href={testUrlBuggy}
              className="block p-4 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              <strong className="text-blue-600 hover:text-blue-800">
                Trigger Buggy Behavior:
              </strong>
              <code className="block text-sm text-slate-500 mt-1 break-all">
                {testUrlBuggy}
              </code>
            </Link>
            <Link
              href={testUrlFixed}
              className="block p-4 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              <strong className="text-green-600 hover:text-green-800">
                Trigger Fixed Behavior (Workaround):
              </strong>
              <code className="block text-sm text-slate-500 mt-1 break-all">
                {testUrlFixed}
              </code>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
