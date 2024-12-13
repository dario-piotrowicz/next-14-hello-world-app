// @ts-check

console.log('Benchmarking fetch latency of apps...');

const appsToBenchmark = [
    {
        appType: 'next-on-pages',
        url: 'https://e202f854.next-14-hello-world-app--next-on-pages.pages.dev/api/hello',
    },
    {
        appType: 'next-on-pages (on workers)',
        url: 'https://3fb633e3-next-14-hello-world-app--next-on-pages.web-experiments.workers.dev/api/hello',
    },
    {
        appType: 'open-next',
        url: 'https://8b6bc9e4-next-14-hello-world-app--open-next.web-experiments.workers.dev/api/hello',
    },
];

const results = {};

for (const { appType, url } of appsToBenchmark) {
    results[appType] = {};

    const fetchStart = performance.now();
    const resp = await fetch(url);
    const respText = await resp.text();
    const fetchEnd = performance.now();
    if (respText !== 'Hello World') {
        throw new Error(`Benchmarking failed since a fetch didn't return the expected result (expected "Hello World", received "${respText}")`);
    }
    const fetchDuration = fetchEnd - fetchStart;
    results[appType].fetchDuration = fetchDuration;
}

console.log(`\n= Results ====================\n`, JSON.stringify({ results }));