/** 
* JSPM Import Map Injection Script
* Include in any HTML page with <script src="importmap.js"></script>
*/
(map => {
  const mapUrl = document.currentScript.src;
  const resolve = imports => Object.fromEntries(Object.entries(imports ).map(([k, v]) => [k, new URL(v, mapUrl).href]));
  document.head.appendChild(Object.assign(document.createElement("script"), {
    type: "importmap",
    innerHTML: JSON.stringify({
      imports: resolve(map.imports),
      scopes: Object.fromEntries(Object.entries(map.scopes).map(([k, v]) => [new URL(k, mapUrl).href, resolve(v)]))
    })
  }));
})
({
  "imports": {
    "jspm-io": "./src/index.js"
  },
  "scopes": {
    "./": {
      "dompurify": "https://ga.jspm.io/npm:dompurify@3.2.5/dist/purify.es.mjs"
    },
    "https://ga.jspm.io/npm:@babel/core@7.26.10/": {
      "#lib/config/files/index.js": "https://ga.jspm.io/npm:@babel/core@7.26.10/lib/config/files/index-browser.js",
      "#lib/config/resolve-targets.js": "https://ga.jspm.io/npm:@babel/core@7.26.10/lib/config/resolve-targets-browser.js",
      "#lib/transform-file.js": "https://ga.jspm.io/npm:@babel/core@7.26.10/lib/transform-file-browser.js"
    },
    "https://ga.jspm.io/npm:browserslist@4.24.5/": {
      "#node.js": "https://ga.jspm.io/npm:browserslist@4.24.5/browser.js"
    }
  }
});
