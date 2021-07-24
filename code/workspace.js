/**
 * Frankest's Code
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly and Python for Frankest's Code.
 * @author juan.delafuente@fi.uncoma.edu.ar (Juan de la Fuente)
 */
/*jslint browser: true */
/* global console, require, window */
"use strict";

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Define server URL
 */

// Code.server = "file:///home/jota/Git/Frankest_Blockly/code";
Code.SERVER = "http://localhost/FrankLab/code/";
Code.BACKEND = "http://localhost:3000";
/***
 * Initialize list of special blocks
 */

Code.SPECIAL_BLOCKS = new Set();

/**
 * Lookup for available libraries.
 * TODO: request to server
 */
Code.LIBRARY = {
  basic: "",
  advance: "av",
};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
  ar: "العربية",
  "be-tarask": "Taraškievica",
  br: "Brezhoneg",
  ca: "Català",
  cs: "Česky",
  da: "Dansk",
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  et: "Eesti",
  fa: "فارسی",
  fr: "Français",
  he: "עברית",
  hrx: "Hunsrik",
  hu: "Magyar",
  ia: "Interlingua",
  is: "Íslenska",
  it: "Italiano",
  ja: "日本語",
  kab: "Kabyle",
  ko: "한국어",
  mk: "Македонски",
  ms: "Bahasa Melayu",
  nb: "Norsk Bokmål",
  nl: "Nederlands, Vlaams",
  oc: "Lenga d'òc",
  pl: "Polski",
  pms: "Piemontèis",
  "pt-br": "Português Brasileiro",
  ro: "Română",
  ru: "Русский",
  sc: "Sardu",
  sk: "Slovenčina",
  sr: "Српски",
  sv: "Svenska",
  ta: "தமிழ்",
  th: "ภาษาไทย",
  tlh: "tlhIngan Hol",
  tr: "Türkçe",
  uk: "Українська",
  vi: "Tiếng Việt",
  "zh-hans": "简体中文",
  "zh-hant": "正體中文",
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ["ar", "fa", "he", "lki"];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Blockly's main library dir.
 * @type string
 */
Code.libpath = "lib/";

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function (name, defaultValue) {
  var val = location.search.match(new RegExp("[?&]" + name + "=([^&]+)"));
  return val ? decodeURIComponent(val[1].replace(/\+/g, "%20")) : defaultValue;
};

/**
 * Lookup for user libraries
 */
Code.key = Code.getStringParamFromUrl("lib", "");
Code.xml = Code.getStringParamFromUrl("id", "");
Code.remix = Code.getStringParamFromUrl("remix", "");

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function () {
  var lang = Code.getStringParamFromUrl("lang", "");
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to Spanish.
    lang = "es";
  }
  return lang;
};

// /**
//  * Get the robot of this user from the URL.
//  * @return {string} User's robot.
//  */
// Code.getRobot = function () {
//   var frank = Code.getStringParamFromUrl("robot", "");
//   if (Code.ROBOT_NAME[frank] === undefined) {
//     // Default to simulator.
//     frank = "Simulador";
//   }
//   return frank;
// };

/**
 * Get the library version of this user from the URL.
 * @return {string} User's library version.
 */
Code.getLibrary = function () {
  let lib = Code.libpath.concat("frankest_def_");
  if (Code.LIBRARY[Code.key] !== undefined) {
    lib = lib.concat(Code.LIBRARY[Code.key]);
  }

  return lib.concat(".js");
};

/***
 * Get the comunicador module.
 * This module performs the execution of code to the backend server
 */

Code.getComm = function(){
  return Code.libpath.concat("comunicador.js");
};

/**
 * Get the toolbox version of this user from the URL.
 * @return {string} User's toolbox version.
 */
Code.getToolbox = function () {
  let lib = Code.libpath.concat("frankest_def_");
  if (Code.LIBRARY[Code.key] !== undefined) {
    lib = lib.concat(Code.LIBRARY[Code.key]);
  }

  return lib.concat(".xml");
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function () {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function (defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ("BlocklyStorage" in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if ("BlocklyStorage" in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function () {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById("languageMenu");
  var newLang = encodeURIComponent(
    languageMenu.options[languageMenu.selectedIndex].value
  );
  var search = window.location.search;
  if (search.length <= 1) {
    search = "?lang=" + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, "$1" + newLang);
  } else {
    search = search.replace(/\?/, "?lang=" + newLang + "&");
  }

  window.location =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    search;
};

/*
 * Change robot value for frankest commands
 */
Code.changeRobot = function () {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var robotMenu = document.getElementById("robotMenu");
  var newRobot = encodeURIComponent(
    robotMenu.options[robotMenu.selectedIndex].value
  );
  var search = window.location.search;
  if (search.length <= 1) {
    search = "?robot=" + newRobot;
  } else if (search.match(/[?&]robot=[^&]*/)) {
    search = search.replace(/([?&]robot=)[^&]*/, "$1" + newRobot);
  } else {
    search = search.replace(/\?/, "?robot=" + newRobot + "&");
  }
  // Code.robot = robotMenu.options[robotMenu.selectedIndex].value
  window.location =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    search;
  // document.getElementById('robotMenu').value=newRobot;
};

/**
 * Changes the output language by clicking the tab matching
 * the selected language in the codeMenu.
 */
Code.changeCodingLanguage = function () {
  var codeMenu = document.getElementById("code_menu");
  Code.tabClick(codeMenu.options[codeMenu.selectedIndex].value);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function (el, func) {
  if (typeof el == "string") {
    el = document.getElementById(el);
  }
  el.addEventListener("click", func, true);
  el.addEventListener("touchend", func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function () {
  var script = document.createElement("script");
  script.setAttribute(
    "src",
    "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"
  );
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function (element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y,
  };
};

/**
 * User's language (e.g. "es").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * User's robot (e.g. "robofaiRojo").
 * @type {string}
 */
// Code.robot = Code.getRobot();

/**
 * List of tab names.
 * @private
 */
Code.TABS_DISPLAY_ = ["Blocks", "Python", "XML"];
Code.TABS_ = ["blocks", "python", "xml"];
Code.selected = "blocks";


Code.loadXMLDoc = function() {
  const myInit = {
    method: "GET",
    headers: {
      Accept: "text/xml",
    },
    mode: "cors",
    cache: "default",
  };

  let myRequest = new Request(Code.getToolbox(), myInit);
  fetch(myRequest)
    .then((response) => response.text())
    .then((text) => document.getElementById("toolbox_div").innerHTML = text)
    .then((loaded) => Code.init());
};

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function (clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById("tab_xml").classList.contains("tabon")) {
    var xmlTextarea = document.getElementById("content_xml");
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q = window.confirm(MSG["badXml"].replace("%1", e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    }
  }

  if (document.getElementById("tab_blocks").classList.contains("tabon")) {
    Code.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    var tab = document.getElementById("tab_" + name);
    tab.classList.add("taboff");
    tab.classList.remove("tabon");
    document.getElementById("content_" + name).style.visibility = "hidden";
  }

  // Select the active tab.
  Code.selected = clickedName;
  var selectedTab = document.getElementById("tab_" + clickedName);
  selectedTab.classList.remove("taboff");
  selectedTab.classList.add("tabon");
  // Show the selected pane.
  document.getElementById("content_" + clickedName).style.visibility =
    "visible";
  Code.renderContent();
  // The code menu tab is on if the blocks tab is off.
  var codeMenuTab = document.getElementById("tab_code");
  if (clickedName == "blocks") {
    Code.workspace.setVisible(true);
    codeMenuTab.className = "taboff";
  } else {
    codeMenuTab.className = "tabon";
  }
  // Sync the menu's value with the clicked tab value if needed.
  var codeMenu = document.getElementById("code_menu");
  for (let i = 0; i < codeMenu.options.length; i++) {
    if (codeMenu.options[i].value == clickedName) {
      codeMenu.selectedIndex = i;
      break;
    }
  }
  Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function () {
  var content = document.getElementById("content_" + Code.selected);
  // Initialize the pane.
  if (content.id == "content_xml") {
    var xmlTextarea = document.getElementById("content_xml");
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
    // } else if (content.id == 'content_javascript') {
    // Code.attemptCodeGeneration(Blockly.JavaScript, 'js');
  } else if (content.id == "content_python") {
    Code.attemptCodeGeneration(Blockly.Python);
  } // else if (content.id == 'content_php') {
  //   Code.attemptCodeGeneration(Blockly.PHP);
  // } else if (content.id == 'content_dart') {
  //   Code.attemptCodeGeneration(Blockly.Dart);
  // } else if (content.id == 'content_lua') {
  //   Code.attemptCodeGeneration(Blockly.Lua);
  // }
  if (typeof PR == "object") {
    PR.prettyPrint();
  }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
Code.attemptCodeGeneration = function (generator) {
  var content = document.getElementById("content_" + Code.selected);
  content.textContent = "";
  if (Code.checkAllGeneratorFunctionsDefined(generator)) {
    var code = generator.workspaceToCode(Code.workspace);

    content.textContent = code;
    // Remove the 'prettyprinted' class, so that Prettify will recalculate.
    content.className = content.className.replace("prettyprinted", "");
  }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
  var blocks = Code.workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) == -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg =
      "The generator code for the following blocks not specified for " +
      generator.name_ +
      ":\n - " +
      missingBlockGenerators.join("\n - ");
    Blockly.alert(msg); // Assuming synchronous. No callback.
  }
  return valid;
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function () {
  Code.initLanguage();
  // Code.initRobot();
  var rtl = Code.isRtl();
  var container = document.getElementById("content_area");
  var onresize = function (e) {
    var bBox = Code.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById("content_" + Code.TABS_[i]);
      el.style.top = bBox.y + "px";
      el.style.left = bBox.x + "px";
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + "px";
      el.style.height = 2 * bBox.height - el.offsetHeight + "px";
      el.style.width = bBox.width + "px";
      el.style.width = 2 * bBox.width - el.offsetWidth + "px";
    }
    // Make the 'Blocks' tab line up with the toolbox.
    // if (Code.workspace && Code.workspace.getToolbox().width) {
    //   document.getElementById("tab_blocks").style.minWidth =
    //     Code.workspace.getToolbox().width - 38 + "px";
    //   // Account for the 19 pixel margin and on each side.
    // }
  };
  window.addEventListener("resize", onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of through this for-loop.
  for (var messageKey in MSG) {
    if (messageKey.indexOf("cat") == 0) {
      Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
    }
  }

  // Construct the toolbox XML, replacing translated variable names.
  // var toolboxText = await Code.loadXMLDoc();
  var toolboxText = document.getElementById("toolbox").outerHTML;
  toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g, function (m, p1, p2) {
    return p1 + MSG[p2];
  });

  // var toolboxXML = Blockly.Xml.textToDom();


  Code.workspace = Blockly.inject("content_blocks", {
    toolbox: toolbox,
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    media: Code.SERVER.concat("media/"),
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    zoom:
    {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    },
    grid:
    {
      spacing: 30,
      length: 3,
      colour: '#ccc',
      snap: true
    },
  });

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  // Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  Code.loadBlocks("");

  if ("BlocklyStorage" in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code.workspace);
  }

  Code.tabClick(Code.selected);

  Code.bindClick("trashButton", function () {
    Code.discard();
    Code.renderContent();
  });
  Code.bindClick("runButton", Code.runJS);
  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById("linkButton");
  var remixButton = document.getElementById("remixButton");
  // if ("BlocklyStorage" in window) {
  //   BlocklyStorage["HTTPREQUEST_ERROR"] = MSG["httpRequestError"];
  //   BlocklyStorage["LINK_ALERT"] = MSG["linkAlert"];
  //   BlocklyStorage["HASH_ERROR"] = MSG["hashError"];
  //   BlocklyStorage["XML_ERROR"] = MSG["xmlError"];
  //   Code.bindClick(linkButton, function () {
  //     BlocklyStorage.link(Code.workspace);
  //   });
  // } else if (linkButton) {
  //   linkButton.className = "disabled";
  // }

  Code.bindClick(linkButton, function () {
    let xml = Code.workspaceToXML();
    let id = '';
    if (sessionStorage.getItem("idURL") && sessionStorage.getItem("idURL")!='undefined') {
      id = sessionStorage.getItem("idURL");
    }
    saveWorkspace(xml,id);
  });

  Code.bindClick(remixButton, function () {
    let xml = Code.workspaceToXML();
    let id = '';
    if (sessionStorage.getItem("idURL") && sessionStorage.getItem("idURL") != 'undefined') {
      id = sessionStorage.getItem("idURL");
    }
    saveWorkspace(xml, id, true);
  });

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick(
      "tab_" + name,
      (function (name_) {
        return function () {
          Code.tabClick(name_);
        };
      })(name)
    );
  }
  Code.bindClick("tab_code", function (e) {
    if (e.target !== document.getElementById("tab_code")) {
      // Prevent clicks on child codeMenu from triggering a tab click.
      return;
    }
    Code.changeCodingLanguage();
  });

  onresize();
  Blockly.svgResize(Code.workspace);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(Code.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function () {
  // Set the HTML's language and direction.
  var rtl = Code.isRtl();
  document.dir = rtl ? "rtl" : "ltr";
  document.head.parentElement.setAttribute("lang", Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (let lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function (a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById("languageMenu");
  languageMenu.options.length = 0;
  for (let i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == Code.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.addEventListener("change", Code.changeLanguage, true);

  // Populate the coding language selection menu.
  var codeMenu = document.getElementById("code_menu");
  codeMenu.options.length = 0;
  for (let i = 1; i < Code.TABS_.length; i++) {
    codeMenu.options.add(new Option(Code.TABS_DISPLAY_[i], Code.TABS_[i]));
  }
  codeMenu.addEventListener("change", Code.changeCodingLanguage);

  // Inject language strings.
  document.title += " " + MSG["title"];
  document.getElementById("title").textContent = MSG["title"];
  document.getElementById("tab_blocks").textContent = MSG["blocks"];

  document.getElementById("linkButton").title = MSG["linkTooltip"];
  document.getElementById("remixButton").title = MSG["remixTooltip"];
  document.getElementById("runButton").title = MSG["runTooltip"];
  document.getElementById("trashButton").title = MSG["trashTooltip"];
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function () {
  var count = Code.workspace.getAllBlocks(false).length;
  if (
    count < 2 ||
    window.confirm(Blockly.Msg["DELETE_ALL_BLOCKS"].replace("%1", count))
  ) {
    Code.workspace.clear();
    if (window.location.hash) {
      window.location.hash = "";
    }
  }
};

/**
 * Generate a minimal XML string from workspace
 *
 * @returns String with minimal XML
 */
Code.workspaceToXML = function (){
  var xml = Blockly.Xml.workspaceToDom(Code.workspace);
  var xml_text = Blockly.Xml.domToText(xml);
  return xml_text;
};

Code.loadXML = function (xml_text) {
  let xml = Blockly.Xml.textToDom(xml_text);
  Blockly.Xml.domToWorkspace(Code.workspace, xml);
};

Code.loadURL = function(id){
  overlayOn();
  setTimeout(function () {
    Code.workspace.clear();
    loadWorkspace(id);
    overlayOff();
  }, 4000);
};

Code.saveURL = function(id){
  let url = Code.SERVER.concat("?id=").concat(id);
  sessionStorage.setItem("idURL", id);
  sessionStorage.setItem("url", url);
  showModal(url);
};

Code.saveRemixURL = function (id) {
  let url = Code.SERVER.concat("?remix=").concat(id);
  if (sessionStorage.getItem("idURL") && sessionStorage.getItem("idURL") != 'undefined'){
    sessionStorage.setItem("idURL", id);
    sessionStorage.setItem("url", url);
  }
  showModal(url);
};

// Load the language strings.
document.write(`<script src="msg/${Code.LANG}.js"></script>\n`);
// Load Blockly's language strings.
document.write(`<script src="msg/js/${Code.LANG}.js"></script>\n`);
// Load toolbox library
document.write(`<script src="${Code.getLibrary()}"></script>\n`);
// Load comm library
document.write(`<script src="${Code.getComm()}"></script>\n`);

// window.addEventListener("load", Code.loadXML);
Code.loadXMLDoc();
if (Code.xml != "" || Code.remix != ""){
  if (Code.xml != ""){
    sessionStorage.setItem("idURL", Code.xml);
  }
  Code.loadURL(Code.xml || Code.remix);
}
