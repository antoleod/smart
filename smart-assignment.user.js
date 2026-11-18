// ==UserScript==
// @name         SmartAssignment 2.0
// @namespace    https://github.com/antoleod/SmartAssignment
// @version      2.0.5
// @description  Intelligent ServiceNow ticket dispatch (queue monitoring, staggered delay, verified assignment).
// @match        https://*.service-now.com/*
// @match        https://*.servicenow.com/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==
// OPTIONAL loader. SmartAssignment is fully usable through the bookmarklet.
// This file only automates injection on ServiceNow page load, and must be
// installed in an authorised userscript manager. Replace https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.5/smart-assignment.bundle.js with
// your approved distribution URL, or use the generated copy in dist/.
(function () {
  "use strict";
  var BUNDLE = "https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.5/smart-assignment.bundle.js";
  var VERSION = "2.0.5";
  var running = window.__SMART_ASSIGNMENT_2__;
  // Same version already running: nothing to do. A different version means this
  // page still executes stale code, so the old bundle is replaced below.
  if (running && running.instance && running.version === VERSION) return;

  var previous = document.getElementById("smart-assignment-bundle");
  if (previous && previous.parentNode) previous.parentNode.removeChild(previous);

  var script = document.createElement("script");
  script.id = "smart-assignment-bundle";
  script.src = BUNDLE + (BUNDLE.indexOf("?") < 0 ? "?" : "&") + "v=" + Date.now();
  script.async = true;
  script.onload = function () {
    try {
      if (window.SmartAssignment && typeof window.SmartAssignment.start === "function") {
        // Reuses persisted settings and ticket deadlines after a reload.
        window.SmartAssignment.start();
      }
    } catch (error) {
      console.error("[SmartAssignment] start failed", error);
    }
  };
  script.onerror = function () {
    console.error("[SmartAssignment] could not load bundle from " + BUNDLE);
  };
  document.head.appendChild(script);
})();
