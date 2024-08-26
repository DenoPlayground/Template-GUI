import { Webview } from "@webview/webview";

const webview = new Webview();

webview.navigate(new URL(`${import.meta.dirname}/index.html`));
webview.title = "Hello world!";

webview.run();
