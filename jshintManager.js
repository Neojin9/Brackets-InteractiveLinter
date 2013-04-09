/*
 * Copyright (c) 2013 Miguel Castillo.
 *
 * Licensed under MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint plusplus: true, nomen: true, regexp: true, maxerr: 50 */

define(function (require, exports, module) {
    'use strict';

    var jshintReporter = require('jshintReporter'),
        jshintSettings = require('jshintrc');

    // Running a modified version of jshint to fix the issue with unused function parameters.
    require('lib/jshint-1.1.0-stable-mod');


    /**
    * BUG: jshint gives the wrong character index when dealing with tabs.
    * https://github.com/jshint/jshint/issues/430
    * I am stuck only expecting correct results when the files uses white
    * spaces. Arrrggh!
    */
    var jshintManager = (function(){
        var _cm = null, _timer = null;

        function run() {
            if (!_cm) {
                return;
            }

            // Get document as a string to be passed into JSHint
            var docValue = _cm.getDoc().getValue();

            // I could let JSHint pick up .jshintrc, but since I am already reading it
            // I am just going to feed that data directly into JSHint.
            var result = JSHINT(docValue, jshintSettings, jshintSettings.globals);

            // If result is false, then JSHint has some errors it needs to report
            if (result === false) {
                jshintReporter.report(_cm, JSHINT.errors, jshintSettings);
            }
        }


        function trackChanges() {
            if (_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            _timer = setTimeout(function () {
                _timer = null;
                run();
            }, 1000);
        }


        /**
        * Show line details
        */
        function gutterClick(cm, lineIndex, gutterId, event) {
            if (gutterId !== "interactive-jshint-gutter"){
                return;
            }

            jshintReporter.showLineDetails(cm, lineIndex, gutterId, event);
        }


        /**
        * We will only handle one document at a time
        */
        function setDocument(cm) {
            if (_cm) {
                CodeMirror.off(_cm.getDoc(), "change", trackChanges);
                _cm.setOption("gutters", []);
                _cm.off('gutterClick', gutterClick);
            }

            if (cm && cm.getDoc().getMode().name === 'javascript') {
                CodeMirror.on(cm.getDoc(), "change", trackChanges);
                _cm = cm;
                _cm.setOption("gutters", ["interactive-jshint-gutter"]);
                _cm.on('gutterClick', gutterClick);
            }
        }


        function setSettings(settings) {
            jshintSettings = settings;
        }


        return {
            setDocument: setDocument,
            setSettings: setSettings,
            run: run
        };

    })();


    return jshintManager;
});

