Brackets-InteractiveLinter
===========================

<p>Brackets integration with JSHint, JSLint, and CoffeeLint!  Interactive Linter runs linters as you work on your code and gives instant feedback right on your document.  You can access the details of the lint report by clicking on the light bulbs on the line gutters.
<p>Interactive linter provides a plugin system to integrate with your own linter.</p>
<p>Supports traversing up the directory tree to load the closest hint config file.</p>


JSHint/JSLint
===================
<p>Interactive Linter automatically loads .jshintrc and .jslintrc files in your project.</p>
<p>All jshint settings that already exists inline in your JavaScript files will continue to work along side any .jshintrc/.jslintrc file.</p>
<p>Integration with http://jslinterrors.com/ to find out details about what's reported by JSHint.</p>
<p>This was inspired by Joachim's extensions brackets-continuous-compilation (https://github.com/JoachimK/brackets-continuous-compilation)</p>


 CoffeeLint
===================
<p>CoffeeLinter does not yet have a standard file that's loaded and processed by the linter itself.  So, while this is resolved by CoffeeLint, I have added support for .coffeelintrc to follow analogous system to JSLint and JSHint.</p>

Screenshots
===================

![jshint](https://raw.github.com/wiki/MiguelCastillo/Brackets-InteractiveLinter/images/jshint.png)

![coffeelint](https://raw.github.com/wiki/MiguelCastillo/Brackets-InteractiveLinter/images/coffeelint.png)

How to
===================

* Install... Go through the Brackets Extensions Manager.


FAQ
===================

* Use JSLint instead of JSHint? Yes, it is possible. Although it requires manual intervention.
    - Open up the plugins directory in Interactive Linter
    - Go into jshint/main.js, find "language: javascript" and rename to "language: disabled-javascript"
    - Go into jslint/main.js, find "language: disabled-javascript" and rename to "language: javascript"
    - Reload Bracket and enjoy JSLint

* Are .jshintrc supported?
    - Yes, they are supported but in the context of a project.


Links
===================
Brackets? Right here... http://brackets.io/ <br>
Brackets github? Right here... https://github.com/adobe/brackets


Contact me
===================

If you have any issues or want to just drop in a line, you can use my personal email at manchagnu@gmail.com

License
===================

Licensed under MIT
