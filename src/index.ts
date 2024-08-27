import { SizeHint, Webview } from "@webview/webview";

const html = `
<html>
  <head>
    <style>
    body {
      background-color: gray;
    }
    </style>
  </head>
  <body>
    <h1>Hello from deno v${Deno.version.deno}</h1>
    <button onclick="openFile('./src/index.ts').then((text) => log(text));">Open</button>
  </body>
</html>
`;

const webview = new Webview(true, {
  hint: SizeHint.MIN,
  width: 500,
  height: 500
});

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);

webview.bind("openFile", (file) => {
  return Deno.readTextFileSync(file)
});

webview.bind("log", (...args) => console.log(...args));

webview.title = 'Hello World!'
webview.run();
