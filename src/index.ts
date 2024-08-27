import { Webview } from "@webview/webview";

const html = `
<html>
<body>
<h1>Hello from deno v${Deno.version.deno}</h1>
<button onclick="openFile('./src/index.ts').then(log);">Open</button>
</body>
</html>
`;

const webview = new Webview(true);

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);

webview.bind("openFile", (file) => {
  return Deno.readTextFileSync(file)
});

webview.bind("log", (...args) => console.log(...args));

webview.run();
