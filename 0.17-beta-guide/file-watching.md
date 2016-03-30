# File Watching

When you're working on small applications, one of the best features of jspm is that you don't need to run any form of watch task.
jspm loads and transpiles everything in the browser, and in development this workflow works really well.
However, when your app reaches a certain size the overhead of running everything in the browser leads to your app taking multiple seconds to refresh.

At this point, you can switch to bundling your application whenever you save a file to generate a large, unminified bundle file which you can give to your browser.
This is made possible thanks to recent additions to jspm that enable builds to make use of a build cache.

An alternative to this approach is to use hot-reloading whis is covered in the next chapter.

To start watching files, we will use the `jspm bundle` command with the new `watch` flag
> jspm bundle test.js dev-bundle.js --watch

Which should output:

      Building the bundle tree for test.js...
         
           github:jspm/nodelibs-process@0.2.0-alpha.json
           github:jspm/nodelibs-process@0.2.0-alpha/process.js
           jspm-react-component/component.js
           npm:fbjs@0.6.1.json
           npm:fbjs@0.6.1/lib/EventListener.js
           npm:fbjs@0.6.1/lib/ExecutionEnvironment.js
           npm:fbjs@0.6.1/lib/camelize.js
           npm:fbjs@0.6.1/lib/camelizeStyleName.js
           npm:fbjs@0.6.1/lib/containsNode.js
           npm:fbjs@0.6.1/lib/createArrayFromMixed.js
           npm:fbjs@0.6.1/lib/createNodesFromMarkup.js
           npm:fbjs@0.6.1/lib/emptyFunction.js
           npm:fbjs@0.6.1/lib/emptyObject.js
           ...
           npm:react@0.14.8/react.js
           npm:systemjs-plugin-babel@0.0.8.json
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/classCallCheck.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/createClass.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/inherits.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/possibleConstructorReturn.js
           test.js
         
    ok   Built into dev-bundle.js with source maps, unminified.
    Watchman:  Watchman was not found in PATH.  See https://facebook.github.io/watchman/docs/install.html for installation instructions
         Watching . for changes with Node native watcher...

We then include this bundle file in our HTML after the configuration, but before our SystemJS.import statement:

    <!docype html>
    <meta charset="utf-8">
    <script src="jspm_packages/system.js"></script>
    <script src="jspm.browser.js"></script>
    <script src="jspm.config.js"></script>
    <script src="dev-bundle.js"></script>
    <body>
      <div id="container"></div>
      <script>
        SystemJS.import('test.js');
      </script>

Reloading the page in the browser should be now faster that before.

Now when you change and save a file (for example, src/component.js), you will see this output

    ok   File src/component.js changed, rebuilding...
         Building the bundle tree for test.js...
         
           github:jspm/nodelibs-process@0.2.0-alpha.json
           github:jspm/nodelibs-process@0.2.0-alpha/process.js
           jspm-react-component/component.js
           npm:fbjs@0.6.1.json
           npm:fbjs@0.6.1/lib/EventListener.js
           npm:fbjs@0.6.1/lib/ExecutionEnvironment.js
           npm:fbjs@0.6.1/lib/camelize.js
           npm:fbjs@0.6.1/lib/camelizeStyleName.js
           npm:fbjs@0.6.1/lib/containsNode.js
           npm:fbjs@0.6.1/lib/createArrayFromMixed.js
           npm:fbjs@0.6.1/lib/createNodesFromMarkup.js
           npm:fbjs@0.6.1/lib/emptyFunction.js
           npm:fbjs@0.6.1/lib/emptyObject.js
           ...
           npm:react@0.14.8/react.js
           npm:systemjs-plugin-babel@0.0.8.json
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/classCallCheck.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/createClass.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/inherits.js
           npm:systemjs-plugin-babel@0.0.8/babel-helpers/possibleConstructorReturn.js
           test.js
         
    ok   Built into dev-bundle.js with source maps, unminified.
         Watching . for changes with Node native watcher...

And you can now reload the page in the browser to see your changes.
