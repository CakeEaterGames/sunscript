import { buildBrowserApp, buildLibrary } from './common';


await buildBrowserApp("./pages");
await buildLibrary("./dist", "sun.js", false);
await buildLibrary("./dist", "min.sun.js", true);
