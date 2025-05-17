
# Claude Configuration

## JSPM Conventions

### Project Overview

- package.json: Main package manifest
- src/**/*: Source folder

### Package Configuration

The package.json to defines:

* "name": Package name, which is how the package entry points are imported, by its own name.
* "version": Package version
* "dependencies": Package dependencies
* "devDependencies": Package development dependencies
* "exports": Package entry points

### Entry Points

The package "name" and package entry points "exports" must be defined for import map generation.

Exports may be a string for a single entry point or an object with a `"."` property. Export targets may be objects mapping conditions to subpaths, or may be direct subpath strings. All subpaths must start with `"./"`. Exports may use `"*"` patterns for mapping rules.

### Module Types

#### CSS

Stylesheets ending in `.css` may be imported via `import style from './module.css' with { type: 'css' }`.

When imported the stylesheet may be appended into the page with `document.adoptedStylesheets.push(style)`.

This is the recommended pattern for all CSS and fully supports hot reloading with the watching server.

#### JSON

JSON modules may be imported similarly via `import json from './file.json' with { type: 'json' }`.

#### JavaScript

Native vanilla JavaScript modules are being used in the browser. These support loading external packages with the import map JSPM will automatically generated when running `jspm install` as well as importing relative paths via `../dependency.js` and `./dependency.js`. Always use full file extensions for imports.

#### TypeScript

TypeScript ending in `.ts` or `.mts` may be imported.

TypeStripping is used which comes with the limitations of not supporting features requiring transformations:

* Enum declarations
* Namespace with runtime code
* Legacy module with runtime code
* Parameter properties
* Import aliases

The `import type` or `import { type T }` import type forms should be used whenever possible.

### Assets

JavaScript code may obtain URLs to assets using the `new URL('./asset', import.meta.url)` relative URL pattern.

While stylesheets may be co-located with modules in the `src` folder, it is advisable to write assets into a separate `assets` folder.

### Hot Reloading

Hot reloading is supported including supoprt for `import.meta.hot?.accept?()` to accept changes both to the module itself and its direct dependencies. Without `import.meta.hot.accept` changed dependencies and all their parent importers will be reloaded, which results in double executions. Where possible idempotency should be maintained to allow hot reloading workflows.

### Framework

If the user wants to use a framework requiring JSX, use the `htm` library to handle JSX as JS templates.

If the user has not provided an explicit framework to use, use the below vanilla framework pattern.

src/components/title.js:
```js
import style from './title.css' with { type: 'css' };
import DOMPurify from 'dompurify';

// CSS injection that supports hot reloading without duplication
if (!document.adoptedStyleSheets.includes(style))
  document.adoptedStyleSheets.push(style);

// Render nests other component renders in turn
export function render ({ title }) {
  // always sanitize user inputs
  return `<h1>${DOMPurify.sanitize(title, { ALLOWED_TAGS: [] })}</h1>`;
}

// Attach attaches other component attachments in turn based on container selectors
export function attach (container, { title }) {
  let cnt = 0;
  const h = container.querySelector('h1');
  h.addEventListener('click', () => {
    h.innerText = `${title} ${++cnt}`;
  });
}
```

src/index.js:
```js
import * as page from './components/page.js';

const title = 'hello world';
document.body.innerHTML = page.render({ title });
page.attach(body, { title });
```

Include all HTML elements via the render chain into the main static render function. Avoid dynamic body injections unless necessary for features like popups or toast elements.

Assume the renderer successfully injected elements that were specified when performing attachment, such that in the attch function `container.querySelector('el')` will always return the expected element from the HTML render.

### Dependencies

Import utility libraries and dependencies as needed.

Dependencies not needed for the page load that can be loaded asynchronously should be loaded via dynamic `import()`.

`jspm install` or `jspm serve --watch` will automatically update the `importmap.js` file whenever a new dependency is added to a code path that is statically traceable from one of the entry points defined in the package.json "exports".

package.json "dependencies" and "devDependencies" ranges will be respected. While modules may be imported without being present in this manifest it is recommended to still look up the package and include its range in the package.json.

The `importmap.js` behaves like a lock file itself in that once installed a dependency will remain stable through subsequent reinvocations of `jspm install`.

### Development Commands
- `jspm ls`: Check local entry points available
- `jspm ls pkg`: Lookup an external package version and entry points available
- `jspm install`: Generate importmap.js from package.json entry points and dependencies.
- `jspm serve --watch`: Run the local dev server
- `jspm build -o dist`: Build the application
