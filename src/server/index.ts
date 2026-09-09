import { serveDir } from '@std/http/file-server';

const dist = import.meta.dirname + '/../../dist/frontend';

const win = new Deno.BrowserWindow();

win.addEventListener('close', () => {
  win.close();
})


Deno.serve((request) => {
  return serveDir(request, {fsRoot: dist});
});
