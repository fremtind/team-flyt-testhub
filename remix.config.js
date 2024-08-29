/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ["**/.*"],
    // appDirectory: "app",
    assetsBuildDirectory: "build",
    // serverBuildPath: "build/index.js",
    publicPath: "/build/",
    serverModuleFormat: "cjs",
    tailwind: true,
    future: {},
    serverDependenciesToBundle: [
        /^remix-utils.*/,
        // If you installed is-ip optional dependency you will need these too
        "is-ip",
        "ip-regex",
        "super-regex",
        "clone-regexp",
        "function-timeout",
        "time-span",
        "convert-hrtime",
        "is-regexp",
    ],
};
