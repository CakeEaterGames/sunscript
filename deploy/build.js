import { buildBrowserApp, buildLibrary } from './common';


await buildBrowserApp("./docs");
await buildLibrary("./dist", "sun.js", false);
await buildLibrary("./dist", "min.sun.js", true);
