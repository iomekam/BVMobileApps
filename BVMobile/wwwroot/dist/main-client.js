/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "6835d03b6db7b61e2831"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true,
	  name: ''
	};
	if (true) {
	  var querystring = __webpack_require__(4);
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.name) {
	    options.name = overrides.name;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = __webpack_require__.p + options.path;
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect();
	}
	
	function EventSourceWrapper() {
	  var source;
	  var lastActivity = new Date();
	  var listeners = [];
	
	  init();
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function init() {
	    source = new window.EventSource(options.path);
	    source.onopen = handleOnline;
	    source.onerror = handleDisconnect;
	    source.onmessage = handleMessage;
	  }
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i](event);
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(init, options.timeout);
	  }
	
	  return {
	    addMessageListener: function(fn) {
	      listeners.push(fn);
	    }
	  };
	}
	
	function getEventSourceWrapper() {
	  if (!window.__whmEventSourceWrapper) {
	    window.__whmEventSourceWrapper = {};
	  }
	  if (!window.__whmEventSourceWrapper[options.path]) {
	    // cache the wrapper for other entries loaded on
	    // the same page with the same options.path
	    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
	  }
	  return window.__whmEventSourceWrapper[options.path];
	}
	
	function connect() {
	  getEventSourceWrapper().addMessageListener(handleMessage);
	
	  function handleMessage(event) {
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	}
	
	// the reporter needs to be a singleton on the page
	// in case the client is being used by multiple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	var reporter;
	if (typeof window !== 'undefined') {
	  if (!window[singletonKey]) {
	    window[singletonKey] = createReporter();
	  }
	  reporter = window[singletonKey];
	}
	
	function createReporter() {
	  var strip = __webpack_require__(7);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(9);
	  }
	
	  var styles = {
	    errors: "color: #ff0000;",
	    warnings: "color: #5c3b00;"
	  };
	  var previousProblems = null;
	  function log(type, obj) {
	    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
	    if (previousProblems == newProblems) {
	      return;
	    } else {
	      previousProblems = newProblems;
	    }
	
	    var style = styles[type];
	    var name = obj.name ? "'" + obj.name + "' " : "";
	    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
	    // NOTE: console.warn or console.error will print the stack trace
	    // which isn't helpful here, so using console.log to escape it.
	    if (console.group && console.groupEnd) {
	      console.group("%c" + title, style);
	      console.log("%c" + newProblems, style);
	      console.groupEnd();
	    } else {
	      console.log(
	        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
	        style + "font-weight: bold;",
	        style + "font-weight: normal;"
	      );
	    }
	  }
	
	  return {
	    cleanProblemsCache: function () {
	      previousProblems = null;
	    },
	    problems: function(type, obj) {
	      if (options.warn) {
	        log(type, obj);
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(15);
	
	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  switch(obj.action) {
	    case "building":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilding"
	        );
	      }
	      break;
	    case "built":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilt in " + obj.time + "ms"
	        );
	      }
	      // fall through
	    case "sync":
	      if (obj.name && options.name && obj.name !== options.name) {
	        return;
	      }
	      if (obj.errors.length > 0) {
	        if (reporter) reporter.problems('errors', obj);
	      } else {
	        if (reporter) {
	          if (obj.warnings.length > 0) {
	            reporter.problems('warnings', obj);
	          } else {
	            reporter.cleanProblemsCache();
	          }
	          reporter.success();
	        }
	        processUpdate(obj.hash, obj.modules, options);
	      }
	      break;
	    default:
	      if (customHandler) {
	        customHandler(obj);
	      }
	  }
	
	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?path=http%3A%2F%2Flocalhost%3A1383%2F__webpack_hmr", __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(125);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = vendor_2b867295628df849f98a;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(5);
	exports.encode = exports.stringify = __webpack_require__(6);


/***/ },
/* 5 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(8)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr',
	  textAlign: 'left'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(10);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(11).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict'
	
	module.exports = ansiHTML
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	}
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	}
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.5', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>' // delete
	}
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	}
	
	;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>'
	})
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML (text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!_regANSI.test(text)) {
	    return text
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = []
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq]
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
	        ansiCodes.pop()
	        return '</span>'
	      }
	      // Open tag.
	      ansiCodes.push(seq)
	      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
	    }
	
	    var ct = _closeTags[seq]
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop()
	      return ct
	    }
	    return ''
	  })
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length
	  ;(l > 0) && (ret += Array(l + 1).join('</span>'))
	
	  return ret
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors !== 'object') {
	    throw new Error('`colors` parameter must be an Object.')
	  }
	
	  var _finalColors = {}
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null
	    if (!hex) {
	      _finalColors[key] = _defColors[key]
	      continue
	    }
	    if ('reset' === key) {
	      if (typeof hex === 'string') {
	        hex = [hex]
	      }
	      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
	        return typeof h !== 'string'
	      })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
	      }
	      var defHexColor = _defColors[key]
	      if (!hex[0]) {
	        hex[0] = defHexColor[0]
	      }
	      if (hex.length === 1 || !hex[1]) {
	        hex = [hex[0]]
	        hex.push(defHexColor[1])
	      }
	
	      hex = hex.slice(0, 2)
	    } else if (typeof hex !== 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
	    }
	    _finalColors[key] = hex
	  }
	  _setTags(_finalColors)
	}
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function () {
	  _setTags(_defColors)
	}
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {}
	
	if (Object.defineProperty) {
	  Object.defineProperty(ansiHTML.tags, 'open', {
	    get: function () { return _openTags }
	  })
	  Object.defineProperty(ansiHTML.tags, 'close', {
	    get: function () { return _closeTags }
	  })
	} else {
	  ansiHTML.tags.open = _openTags
	  ansiHTML.tags.close = _closeTags
	}
	
	function _setTags (colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey
	
	  for (var code in _styles) {
	    var color = _styles[code]
	    var oriColor = colors[color] || '000'
	    _openTags[code] = 'color:#' + oriColor
	    code = parseInt(code)
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor
	  }
	}
	
	ansiHTML.reset()


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(12),
	  Html4Entities: __webpack_require__(13),
	  Html5Entities: __webpack_require__(14),
	  AllHtmlEntities: __webpack_require__(14)
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };
	
	module.exports = XmlEntities;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;


/***/ },
/* 14 */
/***/ function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }
	
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result.catch(cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(17);
	var core_1 = __webpack_require__(18);
	var angular2_universal_1 = __webpack_require__(19);
	var app_module_1 = __webpack_require__(20);
	__webpack_require__(66);
	// Enable either Hot Module Reloading or production mode
	if (module['hot']) {
	    module['hot'].accept();
	    module['hot'].dispose(function () { platform.destroy(); });
	}
	else {
	    core_1.enableProdMode();
	}
	// Boot the application, either now or when the DOM content is loaded
	var platform = angular2_universal_1.platformUniversalDynamic();
	var bootApplication = function () { platform.bootstrapModule(app_module_1.AppModule); };
	if (document.readyState === 'complete') {
	    bootApplication();
	}
	else {
	    document.addEventListener('DOMContentLoaded', bootApplication);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(45);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(4);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(48);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(18);
	var angular2_universal_1 = __webpack_require__(19);
	var card_1 = __webpack_require__(21);
	var button_1 = __webpack_require__(22);
	var icon_1 = __webpack_require__(26);
	var icon_2 = __webpack_require__(26);
	var app_component_1 = __webpack_require__(56);
	var device_mockup_module_1 = __webpack_require__(61);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    return AppModule;
	}());
	AppModule = __decorate([
	    core_1.NgModule({
	        bootstrap: [app_component_1.AppComponent],
	        declarations: [
	            app_component_1.AppComponent,
	        ],
	        imports: [
	            angular2_universal_1.UniversalModule,
	            card_1.MdCardModule,
	            button_1.MdButtonModule,
	            icon_1.MdIconModule,
	            device_mockup_module_1.DeviceMockupModule
	        ],
	        providers: [
	            icon_2.MdIconRegistry
	        ]
	    })
	], AppModule);
	exports.AppModule = AppModule;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(18)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	    (factory((global.md = global.md || {}, global.md.card = global.md.card || {}),global.ng.core));
	}(this, (function (exports,_angular_core) { 'use strict';
	
	var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Content of a card, needed as it's used as a selector in the API.
	 */
	var MdCardContent = (function () {
	    function MdCardContent() {
	    }
	    MdCardContent = __decorate([
	        _angular_core.Directive({
	            selector: 'md-card-content'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardContent);
	    return MdCardContent;
	}());
	/**
	 * Title of a card, needed as it's used as a selector in the API.
	 */
	var MdCardTitle = (function () {
	    function MdCardTitle() {
	    }
	    MdCardTitle = __decorate([
	        _angular_core.Directive({
	            selector: 'md-card-title'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardTitle);
	    return MdCardTitle;
	}());
	/**
	 * Sub-title of a card, needed as it's used as a selector in the API.
	 */
	var MdCardSubtitle = (function () {
	    function MdCardSubtitle() {
	    }
	    MdCardSubtitle = __decorate([
	        _angular_core.Directive({
	            selector: 'md-card-subtitle'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardSubtitle);
	    return MdCardSubtitle;
	}());
	/**
	 * Action section of a card, needed as it's used as a selector in the API.
	 */
	var MdCardActions = (function () {
	    function MdCardActions() {
	    }
	    MdCardActions = __decorate([
	        _angular_core.Directive({
	            selector: 'md-card-actions'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardActions);
	    return MdCardActions;
	}());
	/*
	
	<md-card> is a basic content container component that adds the styles of a material design card.
	
	While you can use this component alone,
	it also provides a number of preset styles for common card sections, including:
	 - md-card-title
	 - md-card-subtitle
	 - md-card-content
	 - md-card-actions
	 - md-card-footer
	
	 You can see some examples of cards here:
	 http://embed.plnkr.co/s5O4YcyvbLhIApSrIhtj/
	
	 TODO(kara): update link to demo site when it exists
	
	*/
	var MdCard = (function () {
	    function MdCard() {
	    }
	    MdCard = __decorate([
	        _angular_core.Component({selector: 'md-card',
	            template: "<ng-content></ng-content> ",
	            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ md-card { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); will-change: box-shadow; display: block; position: relative; padding: 24px; border-radius: 2px; font-family: Roboto, \"Helvetica Neue\", sans-serif; background: white; color: black; } md-card:hover { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); } .md-card-flat { box-shadow: none; } md-card-title, md-card-subtitle, md-card-content, md-card-actions { display: block; margin-bottom: 16px; } md-card-title { font-size: 24px; font-weight: 400; } md-card-subtitle { font-size: 14px; color: rgba(0, 0, 0, 0.54); } md-card-content { font-size: 14px; } md-card-actions { margin-left: -16px; margin-right: -16px; padding: 8px 0; } md-card-actions[align='end'] { display: flex; justify-content: flex-end; } [md-card-image] { width: calc(100% + 48px); margin: 0 -24px 16px -24px; } [md-card-xl-image] { width: 240px; height: 240px; margin: -8px; } md-card-footer { position: absolute; bottom: 0; } md-card-actions [md-button], md-card-actions [md-raised-button] { margin: 0 4px; } /* HEADER STYLES */ md-card-header { display: flex; flex-direction: row; height: 40px; margin: -8px 0 16px 0; } .md-card-header-text { height: 40px; margin: 0 8px; } [md-card-avatar] { height: 40px; width: 40px; border-radius: 50%; } md-card-header md-card-title { font-size: 14px; } /* TITLE-GROUP STYLES */ [md-card-sm-image], [md-card-md-image], [md-card-lg-image] { margin: -8px 0; } md-card-title-group { display: flex; justify-content: space-between; margin: 0 -8px; } [md-card-sm-image] { width: 80px; height: 80px; } [md-card-md-image] { width: 112px; height: 112px; } [md-card-lg-image] { width: 152px; height: 152px; } /* MEDIA QUERIES */ @media (max-width: 600px) { md-card { padding: 24px 16px; } [md-card-image] { width: calc(100% + 32px); margin: 16px -16px; } md-card-title-group { margin: 0; } [md-card-xl-image] { margin-left: 0; margin-right: 0; } md-card-header { margin: -8px 0 0 0; } } /* FIRST/LAST CHILD ADJUSTMENTS */ md-card > :first-child, md-card-content > :first-child { margin-top: 0; } md-card > :last-child, md-card-content > :last-child { margin-bottom: 0; } [md-card-image]:first-child { margin-top: -24px; } md-card > md-card-actions:last-child { margin-bottom: -16px; padding-bottom: 0; } md-card-actions [md-button]:first-child, md-card-actions [md-raised-button]:first-child { margin-left: 0; margin-right: 0; } md-card-title:not(:first-child), md-card-subtitle:not(:first-child) { margin-top: -4px; } md-card-header md-card-subtitle:not(:first-child) { margin-top: -8px; } md-card > [md-card-xl-image]:first-child { margin-top: -8px; } md-card > [md-card-xl-image]:last-child { margin-bottom: -8px; } /*# sourceMappingURL=card.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCard);
	    return MdCard;
	}());
	/*  The following components don't have any behavior.
	 They simply use content projection to wrap user content
	 for flex layout purposes in <md-card> (and thus allow a cleaner, boilerplate-free API).
	
	
	<md-card-header> is a component intended to be used within the <md-card> component.
	It adds styles for a preset header section (i.e. a title, subtitle, and avatar layout).
	
	You can see an example of a card with a header here:
	http://embed.plnkr.co/tvJl19z3gZTQd6WmwkIa/
	
	TODO(kara): update link to demo site when it exists
	*/
	var MdCardHeader = (function () {
	    function MdCardHeader() {
	    }
	    MdCardHeader = __decorate([
	        _angular_core.Component({selector: 'md-card-header',
	            template: "<ng-content select=\"[md-card-avatar]\"></ng-content> <div class=\"md-card-header-text\"> <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content> </div> <ng-content></ng-content> ",
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardHeader);
	    return MdCardHeader;
	}());
	/*
	
	<md-card-title-group> is a component intended to be used within the <md-card> component.
	It adds styles for a preset layout that groups an image with a title section.
	
	You can see an example of a card with a title-group section here:
	http://embed.plnkr.co/EDfgCF9eKcXjini1WODm/
	
	TODO(kara): update link to demo site when it exists
	*/
	var MdCardTitleGroup = (function () {
	    function MdCardTitleGroup() {
	    }
	    MdCardTitleGroup = __decorate([
	        _angular_core.Component({selector: 'md-card-title-group',
	            template: "<div> <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content> </div> <ng-content select=\"img\"></ng-content> <ng-content></ng-content> ",
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardTitleGroup);
	    return MdCardTitleGroup;
	}());
	var MdCardModule = (function () {
	    function MdCardModule() {
	    }
	    MdCardModule.forRoot = function () {
	        return {
	            ngModule: MdCardModule,
	            providers: []
	        };
	    };
	    MdCardModule = __decorate([
	        _angular_core.NgModule({
	            exports: [
	                MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
	                MdCardActions
	            ],
	            declarations: [
	                MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
	                MdCardActions
	            ],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCardModule);
	    return MdCardModule;
	}());
	
	exports.MdCardContent = MdCardContent;
	exports.MdCardTitle = MdCardTitle;
	exports.MdCardSubtitle = MdCardSubtitle;
	exports.MdCardActions = MdCardActions;
	exports.MdCard = MdCard;
	exports.MdCardHeader = MdCardHeader;
	exports.MdCardTitleGroup = MdCardTitleGroup;
	exports.MdCardModule = MdCardModule;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(18), __webpack_require__(23), __webpack_require__(24)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular2-material/core'], factory) :
	    (factory((global.md = global.md || {}, global.md.button = global.md.button || {}),global.ng.core,global.ng.common,global.md.core));
	}(this, (function (exports,_angular_core,_angular_common,_angular2Material_core) { 'use strict';
	
	var __extends = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(jelbourn): Make the `isMouseDown` stuff done with one global listener.
	// TODO(kara): Convert attribute selectors to classes when attr maps become available
	var MdButton = (function () {
	    function MdButton(_elementRef, _renderer) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
	        this._isKeyboardFocused = false;
	        /** Whether a mousedown has occurred on this element in the last 100ms. */
	        this._isMouseDown = false;
	        /** Whether the ripple effect on click should be disabled. */
	        this.disableRipple = false;
	    }
	    Object.defineProperty(MdButton.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            this._updateColor(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdButton.prototype._setMousedown = function () {
	        var _this = this;
	        // We only *show* the focus style when focus has come to the button via the keyboard.
	        // The Material Design spec is silent on this topic, and without doing this, the
	        // button continues to look :active after clicking.
	        // @see http://marcysutton.com/button-focus-hell/
	        this._isMouseDown = true;
	        setTimeout(function () { _this._isMouseDown = false; }, 100);
	    };
	    MdButton.prototype._updateColor = function (newColor) {
	        this._setElementColor(this._color, false);
	        this._setElementColor(newColor, true);
	        this._color = newColor;
	    };
	    MdButton.prototype._setElementColor = function (color, isAdd) {
	        if (color != null && color != '') {
	            this._renderer.setElementClass(this._elementRef.nativeElement, "md-" + color, isAdd);
	        }
	    };
	    MdButton.prototype._setKeyboardFocus = function () {
	        this._isKeyboardFocused = !this._isMouseDown;
	    };
	    MdButton.prototype._removeKeyboardFocus = function () {
	        this._isKeyboardFocused = false;
	    };
	    /** TODO(hansl): e2e test this function. */
	    MdButton.prototype.focus = function () {
	        this._elementRef.nativeElement.focus();
	    };
	    MdButton.prototype.getHostElement = function () {
	        return this._elementRef.nativeElement;
	    };
	    MdButton.prototype.isRoundButton = function () {
	        var el = this._elementRef.nativeElement;
	        return el.hasAttribute('md-icon-button') ||
	            el.hasAttribute('md-fab') ||
	            el.hasAttribute('md-mini-fab');
	    };
	    MdButton.prototype.isRippleEnabled = function () {
	        return !this.disableRipple;
	    };
	    __decorate([
	        _angular_core.Input(),
	        _angular2Material_core.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdButton.prototype, "disableRipple", void 0);
	    MdButton = __decorate([
	        _angular_core.Component({selector: 'button[md-button], button[md-raised-button], button[md-icon-button], ' +
	                'button[md-fab], button[md-mini-fab]',
	            inputs: ['color'],
	            host: {
	                '[class.md-button-focus]': '_isKeyboardFocused',
	                '(mousedown)': '_setMousedown()',
	                '(focus)': '_setKeyboardFocus()',
	                '(blur)': '_removeKeyboardFocus()',
	            },
	            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> ",
	            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /** * This mixin overrides default button styles like the gray background, * the border, and the outline. */ /** Applies a property to an md-button element for each of the supported palettes. */ /** Applies a focus style to an md-button element for each of the supported palettes. */ [md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; background: transparent; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab], .md-primary[md-button], .md-primary[md-icon-button] { color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab], .md-accent[md-button], .md-accent[md-icon-button] { color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab], .md-warn[md-button], .md-warn[md-icon-button] { color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-primary[disabled][md-button], .md-primary[disabled][md-icon-button], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-accent[disabled][md-button], .md-accent[disabled][md-icon-button], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], .md-warn[disabled][md-button], .md-warn[disabled][md-icon-button], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab], [disabled][disabled][md-button], [disabled][disabled][md-icon-button] { color: rgba(0, 0, 0, 0.38); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } .md-button-focus.md-primary[md-raised-button]::after, .md-button-focus.md-primary[md-fab]::after, .md-button-focus.md-primary[md-mini-fab]::after, .md-button-focus.md-primary[md-button]::after, .md-button-focus.md-primary[md-icon-button]::after { background-color: rgba(0, 150, 136, 0.12); } .md-button-focus.md-accent[md-raised-button]::after, .md-button-focus.md-accent[md-fab]::after, .md-button-focus.md-accent[md-mini-fab]::after, .md-button-focus.md-accent[md-button]::after, .md-button-focus.md-accent[md-icon-button]::after { background-color: rgba(156, 39, 176, 0.12); } .md-button-focus.md-warn[md-raised-button]::after, .md-button-focus.md-warn[md-fab]::after, .md-button-focus.md-warn[md-mini-fab]::after, .md-button-focus.md-warn[md-button]::after, .md-button-focus.md-warn[md-icon-button]::after { background-color: rgba(244, 67, 54, 0.12); } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); background-color: #fafafa; transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { color: white; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { color: rgba(255, 255, 255, 0.870588); } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { color: white; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { color: rgba(0, 0, 0, 0.38); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { background-color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { background-color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { background-color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { background-color: rgba(0, 0, 0, 0.12); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button]:hover.md-primary::after, [md-icon-button]:hover.md-primary::after { background-color: rgba(0, 150, 136, 0.12); } [md-button]:hover.md-accent::after, [md-icon-button]:hover.md-accent::after { background-color: rgba(156, 39, 176, 0.12); } [md-button]:hover.md-warn::after, [md-icon-button]:hover.md-warn::after { background-color: rgba(244, 67, 54, 0.12); } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdButton);
	    return MdButton;
	}());
	var MdAnchor = (function (_super) {
	    __extends(MdAnchor, _super);
	    function MdAnchor(elementRef, renderer) {
	        _super.call(this, elementRef, renderer);
	        this._disabled = null;
	    }
	    Object.defineProperty(MdAnchor.prototype, "tabIndex", {
	        get: function () {
	            return this.disabled ? -1 : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdAnchor.prototype, "isAriaDisabled", {
	        get: function () {
	            return this.disabled ? 'true' : 'false';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdAnchor.prototype, "disabled", {
	        get: function () { return this._disabled; },
	        set: function (value) {
	            // The presence of *any* disabled value makes the component disabled, *except* for false.
	            this._disabled = (value != null && value != false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdAnchor.prototype._haltDisabledEvents = function (event) {
	        // A disabled button shouldn't apply any actions
	        if (this.disabled) {
	            event.preventDefault();
	            event.stopImmediatePropagation();
	        }
	    };
	    __decorate([
	        _angular_core.HostBinding('tabIndex'), 
	        __metadata('design:type', Number)
	    ], MdAnchor.prototype, "tabIndex", null);
	    __decorate([
	        _angular_core.HostBinding('attr.aria-disabled'), 
	        __metadata('design:type', String)
	    ], MdAnchor.prototype, "isAriaDisabled", null);
	    __decorate([
	        _angular_core.HostBinding('attr.disabled'),
	        _angular_core.Input('disabled'), 
	        __metadata('design:type', Object)
	    ], MdAnchor.prototype, "disabled", null);
	    MdAnchor = __decorate([
	        _angular_core.Component({selector: 'a[md-button], a[md-raised-button], a[md-icon-button], a[md-fab], a[md-mini-fab]',
	            inputs: ['color'],
	            host: {
	                '[class.md-button-focus]': '_isKeyboardFocused',
	                '(mousedown)': '_setMousedown()',
	                '(focus)': '_setKeyboardFocus()',
	                '(blur)': '_removeKeyboardFocus()',
	                '(click)': '_haltDisabledEvents($event)',
	            },
	            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> ",
	            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /** * This mixin overrides default button styles like the gray background, * the border, and the outline. */ /** Applies a property to an md-button element for each of the supported palettes. */ /** Applies a focus style to an md-button element for each of the supported palettes. */ [md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; background: transparent; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab], .md-primary[md-button], .md-primary[md-icon-button] { color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab], .md-accent[md-button], .md-accent[md-icon-button] { color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab], .md-warn[md-button], .md-warn[md-icon-button] { color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-primary[disabled][md-button], .md-primary[disabled][md-icon-button], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-accent[disabled][md-button], .md-accent[disabled][md-icon-button], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], .md-warn[disabled][md-button], .md-warn[disabled][md-icon-button], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab], [disabled][disabled][md-button], [disabled][disabled][md-icon-button] { color: rgba(0, 0, 0, 0.38); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } .md-button-focus.md-primary[md-raised-button]::after, .md-button-focus.md-primary[md-fab]::after, .md-button-focus.md-primary[md-mini-fab]::after, .md-button-focus.md-primary[md-button]::after, .md-button-focus.md-primary[md-icon-button]::after { background-color: rgba(0, 150, 136, 0.12); } .md-button-focus.md-accent[md-raised-button]::after, .md-button-focus.md-accent[md-fab]::after, .md-button-focus.md-accent[md-mini-fab]::after, .md-button-focus.md-accent[md-button]::after, .md-button-focus.md-accent[md-icon-button]::after { background-color: rgba(156, 39, 176, 0.12); } .md-button-focus.md-warn[md-raised-button]::after, .md-button-focus.md-warn[md-fab]::after, .md-button-focus.md-warn[md-mini-fab]::after, .md-button-focus.md-warn[md-button]::after, .md-button-focus.md-warn[md-icon-button]::after { background-color: rgba(244, 67, 54, 0.12); } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); background-color: #fafafa; transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { color: white; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { color: rgba(255, 255, 255, 0.870588); } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { color: white; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { color: rgba(0, 0, 0, 0.38); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { background-color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { background-color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { background-color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { background-color: rgba(0, 0, 0, 0.12); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button]:hover.md-primary::after, [md-icon-button]:hover.md-primary::after { background-color: rgba(0, 150, 136, 0.12); } [md-button]:hover.md-accent::after, [md-icon-button]:hover.md-accent::after { background-color: rgba(156, 39, 176, 0.12); } [md-button]:hover.md-warn::after, [md-icon-button]:hover.md-warn::after { background-color: rgba(244, 67, 54, 0.12); } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdAnchor);
	    return MdAnchor;
	}(MdButton));
	var MdButtonModule = (function () {
	    function MdButtonModule() {
	    }
	    MdButtonModule.forRoot = function () {
	        return {
	            ngModule: MdButtonModule,
	            providers: []
	        };
	    };
	    MdButtonModule = __decorate([
	        _angular_core.NgModule({
	            imports: [_angular_common.CommonModule, _angular2Material_core.MdRippleModule],
	            exports: [MdButton, MdAnchor],
	            declarations: [MdButton, MdAnchor],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdButtonModule);
	    return MdButtonModule;
	}());
	
	exports.MdButton = MdButton;
	exports.MdAnchor = MdAnchor;
	exports.MdButtonModule = MdButtonModule;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(10);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(18), __webpack_require__(24), __webpack_require__(25)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular2-material/core', '@angular/platform-browser'], factory) :
	    (factory((global.md = global.md || {}, global.md.core = global.md.core || {}),global.ng.core,global.md.core,global.ng.platformBrowser));
	}(this, (function (exports,_angular_core,_angular2Material_core,_angular_platformBrowser) { 'use strict';
	
	var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$1 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Shared directive to count lines inside a text area, such as a list item.
	 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
	 * counted by checking the query list's length.
	 */
	var MdLine = (function () {
	    function MdLine() {
	    }
	    MdLine = __decorate$1([
	        _angular_core.Directive({ selector: '[md-line]' }), 
	        __metadata$1('design:paramtypes', [])
	    ], MdLine);
	    return MdLine;
	}());
	/* Helper that takes a query list of lines and sets the correct class on the host */
	var MdLineSetter = (function () {
	    function MdLineSetter(_lines, _renderer, _element) {
	        var _this = this;
	        this._lines = _lines;
	        this._renderer = _renderer;
	        this._element = _element;
	        this._setLineClass(this._lines.length);
	        this._lines.changes.subscribe(function () {
	            _this._setLineClass(_this._lines.length);
	        });
	    }
	    MdLineSetter.prototype._setLineClass = function (count) {
	        this._resetClasses();
	        if (count === 2 || count === 3) {
	            this._setClass("md-" + count + "-line", true);
	        }
	    };
	    MdLineSetter.prototype._resetClasses = function () {
	        this._setClass('md-2-line', false);
	        this._setClass('md-3-line', false);
	    };
	    MdLineSetter.prototype._setClass = function (className, bool) {
	        this._renderer.setElementClass(this._element.nativeElement, className, bool);
	    };
	    return MdLineSetter;
	}());
	var MdLineModule = (function () {
	    function MdLineModule() {
	    }
	    MdLineModule = __decorate$1([
	        _angular_core.NgModule({
	            exports: [MdLine],
	            declarations: [MdLine],
	        }), 
	        __metadata$1('design:paramtypes', [])
	    ], MdLineModule);
	    return MdLineModule;
	}());
	
	var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$2 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Directive to listen to changes of direction of part of the DOM.
	 *
	 * Applications should use this directive instead of the native attribute so that Material
	 * components can listen on changes of direction.
	 */
	var Dir = (function () {
	    function Dir() {
	        this._dir = 'ltr';
	        this.dirChange = new _angular_core.EventEmitter();
	    }
	    Object.defineProperty(Dir.prototype, "dir", {
	        get: function () {
	            return this._dir;
	        },
	        set: function (v) {
	            var old = this._dir;
	            this._dir = v;
	            if (old != this._dir) {
	                this.dirChange.emit(null);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dir.prototype, "value", {
	        get: function () { return this.dir; },
	        set: function (v) { this.dir = v; },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate$2([
	        _angular_core.Input('dir'), 
	        __metadata$2('design:type', String)
	    ], Dir.prototype, "_dir", void 0);
	    __decorate$2([
	        _angular_core.Output(), 
	        __metadata$2('design:type', Object)
	    ], Dir.prototype, "dirChange", void 0);
	    __decorate$2([
	        _angular_core.HostBinding('attr.dir'), 
	        __metadata$2('design:type', String)
	    ], Dir.prototype, "dir", null);
	    Dir = __decorate$2([
	        _angular_core.Directive({
	            selector: '[dir]',
	            // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
	            exportAs: '$implicit'
	        }), 
	        __metadata$2('design:paramtypes', [])
	    ], Dir);
	    return Dir;
	}());
	var RtlModule = (function () {
	    function RtlModule() {
	    }
	    RtlModule.forRoot = function () {
	        return {
	            ngModule: RtlModule,
	            providers: []
	        };
	    };
	    RtlModule = __decorate$2([
	        _angular_core.NgModule({
	            exports: [Dir],
	            declarations: [Dir]
	        }), 
	        __metadata$2('design:paramtypes', [])
	    ], RtlModule);
	    return RtlModule;
	}());
	
	/** TODO: internal */
	var ForegroundRippleState;
	(function (ForegroundRippleState) {
	    ForegroundRippleState[ForegroundRippleState["NEW"] = 0] = "NEW";
	    ForegroundRippleState[ForegroundRippleState["EXPANDING"] = 1] = "EXPANDING";
	    ForegroundRippleState[ForegroundRippleState["FADING_OUT"] = 2] = "FADING_OUT";
	})(ForegroundRippleState || (ForegroundRippleState = {}));
	/**
	 * Wrapper for a foreground ripple DOM element and its animation state.
	 * TODO: internal
	 */
	var ForegroundRipple = (function () {
	    function ForegroundRipple(rippleElement) {
	        this.rippleElement = rippleElement;
	        this.state = ForegroundRippleState.NEW;
	    }
	    return ForegroundRipple;
	}());
	var RIPPLE_SPEED_PX_PER_SECOND = 1000;
	var MIN_RIPPLE_FILL_TIME_SECONDS = 0.1;
	var MAX_RIPPLE_FILL_TIME_SECONDS = 0.3;
	/**
	 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
	 */
	var distanceToFurthestCorner = function (x, y, rect) {
	    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
	    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
	    return Math.sqrt(distX * distX + distY * distY);
	};
	/**
	 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
	 * The constructor takes a reference to the ripple directive's host element and a map of DOM
	 * event handlers to be installed on the element that triggers ripple animations.
	 * This will eventually become a custom renderer once Angular support exists.
	 * TODO: internal
	 */
	var RippleRenderer = (function () {
	    function RippleRenderer(_elementRef, _eventHandlers) {
	        this._eventHandlers = _eventHandlers;
	        this._rippleElement = _elementRef.nativeElement;
	        // It might be nice to delay creating the background until it's needed, but doing this in
	        // fadeInRippleBackground causes the first click event to not be handled reliably.
	        this._backgroundDiv = document.createElement('div');
	        this._backgroundDiv.classList.add('md-ripple-background');
	        this._rippleElement.appendChild(this._backgroundDiv);
	    }
	    /**
	     * Installs event handlers on the given trigger element, and removes event handlers from the
	     * previous trigger if needed.
	     */
	    RippleRenderer.prototype.setTriggerElement = function (newTrigger) {
	        var _this = this;
	        if (this._triggerElement !== newTrigger) {
	            if (this._triggerElement) {
	                this._eventHandlers.forEach(function (eventHandler, eventName) {
	                    _this._triggerElement.removeEventListener(eventName, eventHandler);
	                });
	            }
	            this._triggerElement = newTrigger;
	            if (this._triggerElement) {
	                this._eventHandlers.forEach(function (eventHandler, eventName) {
	                    _this._triggerElement.addEventListener(eventName, eventHandler);
	                });
	            }
	        }
	    };
	    /**
	     * Installs event handlers on the host element of the md-ripple directive.
	     */
	    RippleRenderer.prototype.setTriggerElementToHost = function () {
	        this.setTriggerElement(this._rippleElement);
	    };
	    /**
	     * Removes event handlers from the current trigger element if needed.
	     */
	    RippleRenderer.prototype.clearTriggerElement = function () {
	        this.setTriggerElement(null);
	    };
	    /**
	     * Creates a foreground ripple and sets its animation to expand and fade in from the position
	     * given by rippleOriginLeft and rippleOriginTop (or from the center of the <md-ripple>
	     * bounding rect if centered is true).
	     */
	    RippleRenderer.prototype.createForegroundRipple = function (rippleOriginLeft, rippleOriginTop, color, centered, radius, speedFactor, transitionEndCallback) {
	        var parentRect = this._rippleElement.getBoundingClientRect();
	        // Create a foreground ripple div with the size and position of the fully expanded ripple.
	        // When the div is created, it's given a transform style that causes the ripple to be displayed
	        // small and centered on the event location (or the center of the bounding rect if the centered
	        // argument is true). Removing that transform causes the ripple to animate to its natural size.
	        var startX = centered ? (parentRect.left + parentRect.width / 2) : rippleOriginLeft;
	        var startY = centered ? (parentRect.top + parentRect.height / 2) : rippleOriginTop;
	        var offsetX = startX - parentRect.left;
	        var offsetY = startY - parentRect.top;
	        var maxRadius = radius > 0 ? radius : distanceToFurthestCorner(startX, startY, parentRect);
	        var rippleDiv = document.createElement('div');
	        this._rippleElement.appendChild(rippleDiv);
	        rippleDiv.classList.add('md-ripple-foreground');
	        rippleDiv.style.left = (offsetX - maxRadius) + "px";
	        rippleDiv.style.top = (offsetY - maxRadius) + "px";
	        rippleDiv.style.width = 2 * maxRadius + "px";
	        rippleDiv.style.height = rippleDiv.style.width;
	        // If color input is not set, this will default to the background color defined in CSS.
	        rippleDiv.style.backgroundColor = color;
	        // Start the ripple tiny.
	        rippleDiv.style.transform = "scale(0.001)";
	        var fadeInSeconds = (1 / (speedFactor || 1)) * Math.max(MIN_RIPPLE_FILL_TIME_SECONDS, Math.min(MAX_RIPPLE_FILL_TIME_SECONDS, maxRadius / RIPPLE_SPEED_PX_PER_SECOND));
	        rippleDiv.style.transitionDuration = fadeInSeconds + "s";
	        // https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
	        window.getComputedStyle(rippleDiv).opacity;
	        rippleDiv.classList.add('md-ripple-fade-in');
	        // Clearing the transform property causes the ripple to animate to its full size.
	        rippleDiv.style.transform = '';
	        var ripple = new ForegroundRipple(rippleDiv);
	        ripple.state = ForegroundRippleState.EXPANDING;
	        rippleDiv.addEventListener('transitionend', function (event) { return transitionEndCallback(ripple, event); });
	    };
	    /**
	     * Fades out a foreground ripple after it has fully expanded and faded in.
	     */
	    RippleRenderer.prototype.fadeOutForegroundRipple = function (ripple) {
	        ripple.classList.remove('md-ripple-fade-in');
	        ripple.classList.add('md-ripple-fade-out');
	    };
	    /**
	     * Removes a foreground ripple from the DOM after it has faded out.
	     */
	    RippleRenderer.prototype.removeRippleFromDom = function (ripple) {
	        ripple.parentElement.removeChild(ripple);
	    };
	    /**
	     * Fades in the ripple background.
	     */
	    RippleRenderer.prototype.fadeInRippleBackground = function (color) {
	        this._backgroundDiv.classList.add('md-ripple-active');
	        // If color is not set, this will default to the background color defined in CSS.
	        this._backgroundDiv.style.backgroundColor = color;
	    };
	    /**
	     * Fades out the ripple background.
	     */
	    RippleRenderer.prototype.fadeOutRippleBackground = function () {
	        if (this._backgroundDiv) {
	            this._backgroundDiv.classList.remove('md-ripple-active');
	        }
	    };
	    return RippleRenderer;
	}());
	
	var __decorate$3 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$3 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdRipple = (function () {
	    function MdRipple(_elementRef) {
	        var _this = this;
	        /**
	         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
	         * will be the distance from the center of the ripple to the furthest corner of the host element's
	         * bounding rectangle.
	         */
	        this.maxRadius = 0;
	        /**
	         * If set, the normal duration of ripple animations is divided by this value. For example,
	         * setting it to 0.5 will cause the animations to take twice as long.
	         */
	        this.speedFactor = 1;
	        // These event handlers are attached to the element that triggers the ripple animations.
	        var eventHandlers = new Map();
	        eventHandlers.set('mousedown', function (event) { return _this._mouseDown(event); });
	        eventHandlers.set('click', function (event) { return _this._click(event); });
	        eventHandlers.set('mouseleave', function (event) { return _this._mouseLeave(event); });
	        this._rippleRenderer = new RippleRenderer(_elementRef, eventHandlers);
	    }
	    /** TODO: internal */
	    MdRipple.prototype.ngOnInit = function () {
	        // If no trigger element was explicity set, use the host element
	        if (!this.trigger) {
	            this._rippleRenderer.setTriggerElementToHost();
	        }
	    };
	    /** TODO: internal */
	    MdRipple.prototype.ngOnDestroy = function () {
	        // Remove event listeners on the trigger element.
	        this._rippleRenderer.clearTriggerElement();
	    };
	    /** TODO: internal */
	    MdRipple.prototype.ngOnChanges = function (changes) {
	        // If the trigger element changed (or is being initially set), add event listeners to it.
	        var changedInputs = Object.keys(changes);
	        if (changedInputs.indexOf('trigger') !== -1) {
	            this._rippleRenderer.setTriggerElement(this.trigger);
	        }
	    };
	    /**
	     * Responds to the start of a ripple animation trigger by fading the background in.
	     */
	    MdRipple.prototype.start = function () {
	        this._rippleRenderer.fadeInRippleBackground(this.backgroundColor);
	    };
	    /**
	     * Responds to the end of a ripple animation trigger by fading the background out, and creating a
	     * foreground ripple that expands from the event location (or from the center of the element if
	     * the "centered" property is set or forceCenter is true).
	     */
	    MdRipple.prototype.end = function (left, top, forceCenter) {
	        var _this = this;
	        if (forceCenter === void 0) { forceCenter = true; }
	        this._rippleRenderer.createForegroundRipple(left, top, this.color, this.centered || forceCenter, this.maxRadius, this.speedFactor, function (ripple, e) { return _this._rippleTransitionEnded(ripple, e); });
	        this._rippleRenderer.fadeOutRippleBackground();
	    };
	    MdRipple.prototype._rippleTransitionEnded = function (ripple, event) {
	        if (event.propertyName === 'opacity') {
	            // If the ripple finished expanding, start fading it out. If it finished fading out,
	            // remove it from the DOM.
	            switch (ripple.state) {
	                case ForegroundRippleState.EXPANDING:
	                    this._rippleRenderer.fadeOutForegroundRipple(ripple.rippleElement);
	                    ripple.state = ForegroundRippleState.FADING_OUT;
	                    break;
	                case ForegroundRippleState.FADING_OUT:
	                    this._rippleRenderer.removeRippleFromDom(ripple.rippleElement);
	                    break;
	            }
	        }
	    };
	    /**
	     * Called when the trigger element receives a mousedown event. Starts the ripple animation by
	     * fading in the background.
	     */
	    MdRipple.prototype._mouseDown = function (event) {
	        if (!this.disabled && event.button === 0) {
	            this.start();
	        }
	    };
	    /**
	     * Called when the trigger element receives a click event. Creates a foreground ripple and
	     * runs its animation.
	     */
	    MdRipple.prototype._click = function (event) {
	        if (!this.disabled && event.button === 0) {
	            // If screen and page positions are all 0, this was probably triggered by a keypress.
	            // In that case, use the center of the bounding rect as the ripple origin.
	            // FIXME: This fails on IE11, which still sets pageX/Y and screenX/Y on keyboard clicks.
	            var isKeyEvent = (event.screenX === 0 && event.screenY === 0 && event.pageX === 0 && event.pageY === 0);
	            this.end(event.pageX, event.pageY, isKeyEvent);
	        }
	    };
	    /**
	     * Called when the trigger element receives a mouseleave event. Fades out the background.
	     */
	    MdRipple.prototype._mouseLeave = function (event) {
	        // We can always fade out the background here; It's a no-op if it was already inactive.
	        this._rippleRenderer.fadeOutRippleBackground();
	    };
	    __decorate$3([
	        _angular_core.Input('md-ripple-trigger'), 
	        __metadata$3('design:type', Object)
	    ], MdRipple.prototype, "trigger", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-centered'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "centered", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-disabled'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "disabled", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-max-radius'), 
	        __metadata$3('design:type', Number)
	    ], MdRipple.prototype, "maxRadius", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-speed-factor'), 
	        __metadata$3('design:type', Number)
	    ], MdRipple.prototype, "speedFactor", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-color'), 
	        __metadata$3('design:type', String)
	    ], MdRipple.prototype, "color", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-background-color'), 
	        __metadata$3('design:type', String)
	    ], MdRipple.prototype, "backgroundColor", void 0);
	    __decorate$3([
	        _angular_core.HostBinding('class.md-ripple-focused'),
	        _angular_core.Input('md-ripple-focused'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "focused", void 0);
	    __decorate$3([
	        _angular_core.HostBinding('class.md-ripple-unbounded'),
	        _angular_core.Input('md-ripple-unbounded'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "unbounded", void 0);
	    MdRipple = __decorate$3([
	        _angular_core.Directive({
	            selector: '[md-ripple]',
	        }), 
	        __metadata$3('design:paramtypes', [_angular_core.ElementRef])
	    ], MdRipple);
	    return MdRipple;
	}());
	var MdRippleModule = (function () {
	    function MdRippleModule() {
	    }
	    MdRippleModule.forRoot = function () {
	        return {
	            ngModule: MdRippleModule,
	            providers: []
	        };
	    };
	    MdRippleModule = __decorate$3([
	        _angular_core.NgModule({
	            exports: [MdRipple],
	            declarations: [MdRipple],
	        }), 
	        __metadata$3('design:paramtypes', [])
	    ], MdRippleModule);
	    return MdRippleModule;
	}());
	
	// TODO(kara): Revisit why error messages are not being properly set.
	var __extends$3 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Wrapper around Error that sets the error message.
	 */
	var MdError = (function (_super) {
	    __extends$3(MdError, _super);
	    function MdError(value) {
	        _super.call(this);
	        this.message = value;
	    }
	    return MdError;
	}(Error));
	
	var __extends$2 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
	var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
	    __extends$2(MdComponentPortalAttachedToDomWithoutOriginError, _super);
	    function MdComponentPortalAttachedToDomWithoutOriginError() {
	        _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
	            'because the DOM element is not part of the Angular application context.');
	    }
	    return MdComponentPortalAttachedToDomWithoutOriginError;
	}(MdError));
	/** Exception thrown when attempting to attach a null portal to a host. */
	var MdNullPortalError = (function (_super) {
	    __extends$2(MdNullPortalError, _super);
	    function MdNullPortalError() {
	        _super.call(this, 'Must provide a portal to attach');
	    }
	    return MdNullPortalError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to a host that is already attached. */
	var MdPortalAlreadyAttachedError = (function (_super) {
	    __extends$2(MdPortalAlreadyAttachedError, _super);
	    function MdPortalAlreadyAttachedError() {
	        _super.call(this, 'Host already has a portal attached');
	    }
	    return MdPortalAlreadyAttachedError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to an already-disposed host. */
	var MdPortalHostAlreadyDisposedError = (function (_super) {
	    __extends$2(MdPortalHostAlreadyDisposedError, _super);
	    function MdPortalHostAlreadyDisposedError() {
	        _super.call(this, 'This PortalHost has already been disposed');
	    }
	    return MdPortalHostAlreadyDisposedError;
	}(MdError));
	/** Exception thrown when attempting to attach an unknown portal type. */
	var MdUnknownPortalTypeError = (function (_super) {
	    __extends$2(MdUnknownPortalTypeError, _super);
	    function MdUnknownPortalTypeError() {
	        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
	            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
	    }
	    return MdUnknownPortalTypeError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to a null host. */
	var MdNullPortalHostError = (function (_super) {
	    __extends$2(MdNullPortalHostError, _super);
	    function MdNullPortalHostError() {
	        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
	    }
	    return MdNullPortalHostError;
	}(MdError));
	/** Exception thrown when attempting to detach a portal that is not attached. */
	var MdNoPortalAttachedError = (function (_super) {
	    __extends$2(MdNoPortalAttachedError, _super);
	    function MdNoPortalAttachedError() {
	        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
	    }
	    return MdNoPortalAttachedError;
	}(MdError));
	
	var __extends$1 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A `Portal` is something that you want to render somewhere else.
	 * It can be attach to / detached from a `PortalHost`.
	 */
	var Portal = (function () {
	    function Portal() {
	    }
	    /** Attach this portal to a host. */
	    Portal.prototype.attach = function (host) {
	        if (host == null) {
	            throw new MdNullPortalHostError();
	        }
	        if (host.hasAttached()) {
	            throw new MdPortalAlreadyAttachedError();
	        }
	        this._attachedHost = host;
	        return host.attach(this);
	    };
	    /** Detach this portal from its host */
	    Portal.prototype.detach = function () {
	        var host = this._attachedHost;
	        if (host == null) {
	            throw new MdNoPortalAttachedError();
	        }
	        this._attachedHost = null;
	        return host.detach();
	    };
	    Object.defineProperty(Portal.prototype, "isAttached", {
	        /** Whether this portal is attached to a host. */
	        get: function () {
	            return this._attachedHost != null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Sets the PortalHost reference without performing `attach()`. This is used directly by
	     * the PortalHost when it is performing an `attach()` or `detatch()`.
	     */
	    Portal.prototype.setAttachedHost = function (host) {
	        this._attachedHost = host;
	    };
	    return Portal;
	}());
	/**
	 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
	 */
	var ComponentPortal = (function (_super) {
	    __extends$1(ComponentPortal, _super);
	    function ComponentPortal(component, viewContainerRef, injector) {
	        if (viewContainerRef === void 0) { viewContainerRef = null; }
	        if (injector === void 0) { injector = null; }
	        _super.call(this);
	        this.component = component;
	        this.viewContainerRef = viewContainerRef;
	        this.injector = injector;
	    }
	    return ComponentPortal;
	}(Portal));
	/**
	 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
	 */
	var TemplatePortal = (function (_super) {
	    __extends$1(TemplatePortal, _super);
	    function TemplatePortal(template, viewContainerRef) {
	        _super.call(this);
	        /**
	         * Additional locals for the instantiated embedded view.
	         * These locals can be seen as "exports" for the template, such as how ngFor has
	         * index / event / odd.
	         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
	         */
	        this.locals = new Map();
	        this.templateRef = template;
	        this.viewContainerRef = viewContainerRef;
	    }
	    Object.defineProperty(TemplatePortal.prototype, "origin", {
	        get: function () {
	            return this.templateRef.elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TemplatePortal.prototype.attach = function (host, locals) {
	        this.locals = locals == null ? new Map() : locals;
	        return _super.prototype.attach.call(this, host);
	    };
	    TemplatePortal.prototype.detach = function () {
	        this.locals = new Map();
	        return _super.prototype.detach.call(this);
	    };
	    return TemplatePortal;
	}(Portal));
	/**
	 * Partial implementation of PortalHost that only deals with attaching either a
	 * ComponentPortal or a TemplatePortal.
	 */
	var BasePortalHost = (function () {
	    function BasePortalHost() {
	        /** Whether this host has already been permanently disposed. */
	        this._isDisposed = false;
	    }
	    /** Whether this host has an attached portal. */
	    BasePortalHost.prototype.hasAttached = function () {
	        return this._attachedPortal != null;
	    };
	    BasePortalHost.prototype.attach = function (portal) {
	        if (portal == null) {
	            throw new MdNullPortalError();
	        }
	        if (this.hasAttached()) {
	            throw new MdPortalAlreadyAttachedError();
	        }
	        if (this._isDisposed) {
	            throw new MdPortalHostAlreadyDisposedError();
	        }
	        if (portal instanceof ComponentPortal) {
	            this._attachedPortal = portal;
	            return this.attachComponentPortal(portal);
	        }
	        else if (portal instanceof TemplatePortal) {
	            this._attachedPortal = portal;
	            return this.attachTemplatePortal(portal);
	        }
	        throw new MdUnknownPortalTypeError();
	    };
	    BasePortalHost.prototype.detach = function () {
	        if (this._attachedPortal) {
	            this._attachedPortal.setAttachedHost(null);
	        }
	        this._attachedPortal = null;
	        if (this._disposeFn != null) {
	            this._disposeFn();
	            this._disposeFn = null;
	        }
	    };
	    BasePortalHost.prototype.dispose = function () {
	        if (this.hasAttached()) {
	            this.detach();
	        }
	        this._isDisposed = true;
	    };
	    BasePortalHost.prototype.setDisposeFn = function (fn) {
	        this._disposeFn = fn;
	    };
	    return BasePortalHost;
	}());
	
	var __extends = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$4 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$4 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
	 * the directive instance itself can be attached to a host, enabling declarative use of portals.
	 *
	 * Usage:
	 * <template portal #greeting>
	 *   <p> Hello {{name}} </p>
	 * </template>
	 */
	var TemplatePortalDirective = (function (_super) {
	    __extends(TemplatePortalDirective, _super);
	    function TemplatePortalDirective(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    TemplatePortalDirective = __decorate$4([
	        _angular_core.Directive({
	            selector: '[portal]',
	            exportAs: 'portal',
	        }), 
	        __metadata$4('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], TemplatePortalDirective);
	    return TemplatePortalDirective;
	}(TemplatePortal));
	/**
	 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
	 * directly attached to it, enabling declarative use.
	 *
	 * Usage:
	 * <template [portalHost]="greeting"></template>
	 */
	var PortalHostDirective = (function (_super) {
	    __extends(PortalHostDirective, _super);
	    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
	        _super.call(this);
	        this._componentFactoryResolver = _componentFactoryResolver;
	        this._viewContainerRef = _viewContainerRef;
	    }
	    Object.defineProperty(PortalHostDirective.prototype, "portal", {
	        get: function () {
	            return this._portal;
	        },
	        set: function (p) {
	            this._replaceAttachedPortal(p);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Attach the given ComponentPortal to this PortlHost using the ComponentFactoryResolver. */
	    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
	        portal.setAttachedHost(this);
	        // If the portal specifies an origin, use that as the logical location of the component
	        // in the application tree. Otherwise use the location of this PortalHost.
	        var viewContainerRef = portal.viewContainerRef != null ?
	            portal.viewContainerRef :
	            this._viewContainerRef;
	        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
	        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
	        this.setDisposeFn(function () { return ref.destroy(); });
	        return ref;
	    };
	    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
	    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        portal.setAttachedHost(this);
	        this._viewContainerRef.createEmbeddedView(portal.templateRef);
	        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
	        // TODO(jelbourn): return locals from view
	        return new Map();
	    };
	    /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
	    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
	        if (this.hasAttached()) {
	            this.detach();
	        }
	        if (p) {
	            this.attach(p);
	            this._portal = p;
	        }
	    };
	    PortalHostDirective = __decorate$4([
	        _angular_core.Directive({
	            selector: '[portalHost]',
	            inputs: ['portal: portalHost']
	        }), 
	        __metadata$4('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ViewContainerRef])
	    ], PortalHostDirective);
	    return PortalHostDirective;
	}(BasePortalHost));
	var PortalModule = (function () {
	    function PortalModule() {
	    }
	    PortalModule.forRoot = function () {
	        return {
	            ngModule: PortalModule,
	            providers: []
	        };
	    };
	    PortalModule = __decorate$4([
	        _angular_core.NgModule({
	            exports: [TemplatePortalDirective, PortalHostDirective],
	            declarations: [TemplatePortalDirective, PortalHostDirective],
	        }), 
	        __metadata$4('design:paramtypes', [])
	    ], PortalModule);
	    return PortalModule;
	}());
	
	/**
	 * OverlayState is a bag of values for either the initial configuration or current state of an
	 * overlay.
	 */
	var OverlayState = (function () {
	    function OverlayState() {
	    }
	    return OverlayState;
	}());
	
	var __extends$4 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
	 * application context.
	 *
	 * This is the only part of the portal core that directly touches the DOM.
	 */
	var DomPortalHost = (function (_super) {
	    __extends$4(DomPortalHost, _super);
	    function DomPortalHost(_hostDomElement, _componentFactoryResolver) {
	        _super.call(this);
	        this._hostDomElement = _hostDomElement;
	        this._componentFactoryResolver = _componentFactoryResolver;
	    }
	    /** Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver. */
	    DomPortalHost.prototype.attachComponentPortal = function (portal) {
	        if (portal.viewContainerRef == null) {
	            throw new MdComponentPortalAttachedToDomWithoutOriginError();
	        }
	        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
	        var ref = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
	        var hostView = ref.hostView;
	        this._hostDomElement.appendChild(hostView.rootNodes[0]);
	        this.setDisposeFn(function () { return ref.destroy(); });
	        return ref;
	    };
	    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        var viewContainer = portal.viewContainerRef;
	        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
	        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
	        this.setDisposeFn((function () {
	            var index = viewContainer.indexOf(viewRef);
	            if (index != -1) {
	                viewContainer.remove(index);
	            }
	        }));
	        // TODO(jelbourn): Return locals from view.
	        return new Map();
	    };
	    DomPortalHost.prototype.dispose = function () {
	        _super.prototype.dispose.call(this);
	        if (this._hostDomElement.parentNode != null) {
	            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
	        }
	    };
	    return DomPortalHost;
	}(BasePortalHost));
	
	/**
	 * Reference to an overlay that has been created with the Overlay service.
	 * Used to manipulate or dispose of said overlay.
	 */
	var OverlayRef = (function () {
	    function OverlayRef(_portalHost, _pane, _state) {
	        this._portalHost = _portalHost;
	        this._pane = _pane;
	        this._state = _state;
	    }
	    OverlayRef.prototype.attach = function (portal) {
	        var attachResult = this._portalHost.attach(portal);
	        this.updatePosition();
	        return attachResult;
	    };
	    OverlayRef.prototype.detach = function () {
	        return this._portalHost.detach();
	    };
	    OverlayRef.prototype.dispose = function () {
	        this._portalHost.dispose();
	    };
	    OverlayRef.prototype.hasAttached = function () {
	        return this._portalHost.hasAttached();
	    };
	    /** Gets the current state config of the overlay. */
	    OverlayRef.prototype.getState = function () {
	        return this._state;
	    };
	    /** Updates the position of the overlay based on the position strategy. */
	    OverlayRef.prototype.updatePosition = function () {
	        if (this._state.positionStrategy) {
	            this._state.positionStrategy.apply(this._pane);
	        }
	    };
	    return OverlayRef;
	}());
	
	var __decorate$8 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$8 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Simple utility for getting the bounds of the browser viewport.
	 * TODO: internal
	 */
	var ViewportRuler = (function () {
	    function ViewportRuler() {
	    }
	    // TODO(jelbourn): cache the document's bounding rect and only update it when the window
	    // is resized (debounced).
	    /** Gets a ClientRect for the viewport's bounds. */
	    ViewportRuler.prototype.getViewportRect = function () {
	        // Use the document element's bounding rect rather than the window scroll properties
	        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
	        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
	        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
	        // can disagree when the page is pinch-zoomed (on devices that support touch).
	        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
	        // We use the documentElement instead of the body because, by default (without a css reset)
	        // browsers typically give the document body an 8px margin, which is not included in
	        // getBoundingClientRect().
	        var documentRect = document.documentElement.getBoundingClientRect();
	        var scrollPosition = this.getViewportScrollPosition(documentRect);
	        var height = window.innerHeight;
	        var width = window.innerWidth;
	        return {
	            top: scrollPosition.top,
	            left: scrollPosition.left,
	            bottom: scrollPosition.top + height,
	            right: scrollPosition.left + width,
	            height: height,
	            width: width,
	        };
	    };
	    /**
	     * Gets the (top, left) scroll position of the viewport.
	     * @param documentRect
	     */
	    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
	        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
	        // The top-left-corner of the viewport is determined by the scroll position of the document
	        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
	        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
	        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
	        // `document.documentElement` works consistently, where the `top` and `left` values will
	        // equal negative the scroll position.
	        var top = documentRect.top < 0 && document.body.scrollTop == 0 ?
	            -documentRect.top :
	            document.body.scrollTop;
	        var left = documentRect.left < 0 && document.body.scrollLeft == 0 ?
	            -documentRect.left :
	            document.body.scrollLeft;
	        return { top: top, left: left };
	    };
	    ViewportRuler = __decorate$8([
	        _angular_core.Injectable(), 
	        __metadata$8('design:paramtypes', [])
	    ], ViewportRuler);
	    return ViewportRuler;
	}());
	
	/** The points of the origin element and the overlay element to connect. */
	var ConnectionPositionPair = (function () {
	    function ConnectionPositionPair(origin, overlay) {
	        this.originX = origin.originX;
	        this.originY = origin.originY;
	        this.overlayX = overlay.overlayX;
	        this.overlayY = overlay.overlayY;
	    }
	    return ConnectionPositionPair;
	}());
	
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * implict position relative some origin element. The relative position is defined in terms of
	 * a point on the origin element that is connected to a point on the overlay element. For example,
	 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
	 * of the overlay.
	 */
	var ConnectedPositionStrategy = (function () {
	    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
	        this._connectedTo = _connectedTo;
	        this._originPos = _originPos;
	        this._overlayPos = _overlayPos;
	        this._viewportRuler = _viewportRuler;
	        // TODO(jelbourn): set RTL to the actual value from the app.
	        /** Whether the we're dealing with an RTL context */
	        this._isRtl = false;
	        /** Ordered list of preferred positions, from most to least desirable. */
	        this._preferredPositions = [];
	        this._origin = this._connectedTo.nativeElement;
	        this.withFallbackPosition(_originPos, _overlayPos);
	    }
	    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
	        get: function () {
	            return this._preferredPositions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Updates the position of the overlay element, using whichever preferred position relative
	     * to the origin fits on-screen.
	     * TODO: internal
	     */
	    ConnectedPositionStrategy.prototype.apply = function (element) {
	        // We need the bounding rects for the origin and the overlay to determine how to position
	        // the overlay relative to the origin.
	        var originRect = this._origin.getBoundingClientRect();
	        var overlayRect = element.getBoundingClientRect();
	        // We use the viewport rect to determine whether a position would go off-screen.
	        var viewportRect = this._viewportRuler.getViewportRect();
	        var firstOverlayPoint = null;
	        // We want to place the overlay in the first of the preferred positions such that the
	        // overlay fits on-screen.
	        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
	            var pos = _a[_i];
	            // Get the (x, y) point of connection on the origin, and then use that to get the
	            // (top, left) coordinate for the overlay at `pos`.
	            var originPoint = this._getOriginConnectionPoint(originRect, pos);
	            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
	            firstOverlayPoint = firstOverlayPoint || overlayPoint;
	            // If the overlay in the calculated position fits on-screen, put it there and we're done.
	            if (this._willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect)) {
	                this._setElementPosition(element, overlayPoint);
	                return Promise.resolve(null);
	            }
	        }
	        // TODO(jelbourn): fallback behavior for when none of the preferred positions fit on-screen.
	        // For now, just stick it in the first position and let it go off-screen.
	        this._setElementPosition(element, firstOverlayPoint);
	        return Promise.resolve(null);
	    };
	    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
	        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
	        return this;
	    };
	    /**
	     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
	        return this._isRtl ? rect.right : rect.left;
	    };
	    /**
	     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
	        return this._isRtl ? rect.left : rect.right;
	    };
	    /**
	     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
	     * @param originRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
	        var originStartX = this._getStartX(originRect);
	        var originEndX = this._getEndX(originRect);
	        var x;
	        if (pos.originX == 'center') {
	            x = originStartX + (originRect.width / 2);
	        }
	        else {
	            x = pos.originX == 'start' ? originStartX : originEndX;
	        }
	        var y;
	        if (pos.originY == 'center') {
	            y = originRect.top + (originRect.height / 2);
	        }
	        else {
	            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
	        }
	        return { x: x, y: y };
	    };
	    /**
	     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
	     * origin point to which the overlay should be connected.
	     * @param originPoint
	     * @param overlayRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, pos) {
	        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
	        // relative to the origin point.
	        var overlayStartX;
	        if (pos.overlayX == 'center') {
	            overlayStartX = -overlayRect.width / 2;
	        }
	        else {
	            overlayStartX = pos.overlayX == 'start' ? 0 : -overlayRect.width;
	        }
	        var overlayStartY;
	        if (pos.overlayY == 'center') {
	            overlayStartY = -overlayRect.height / 2;
	        }
	        else {
	            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
	        }
	        return {
	            x: originPoint.x + overlayStartX,
	            y: originPoint.y + overlayStartY
	        };
	    };
	    /**
	     * Gets whether the overlay positioned at the given point will fit on-screen.
	     * @param overlayPoint The top-left coordinate of the overlay.
	     * @param overlayRect Bounding rect of the overlay, used to get its size.
	     * @param viewportRect The bounding viewport.
	     */
	    ConnectedPositionStrategy.prototype._willOverlayFitWithinViewport = function (overlayPoint, overlayRect, viewportRect) {
	        // TODO(jelbourn): probably also want some space between overlay edge and viewport edge.
	        return overlayPoint.x >= viewportRect.left &&
	            overlayPoint.x + overlayRect.width <= viewportRect.right &&
	            overlayPoint.y >= viewportRect.top &&
	            overlayPoint.y + overlayRect.height <= viewportRect.bottom;
	    };
	    /**
	     * Physically positions the overlay element to the given coordinate.
	     * @param element
	     * @param overlayPoint
	     */
	    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
	        var scrollPos = this._viewportRuler.getViewportScrollPosition();
	        var x = overlayPoint.x + scrollPos.left;
	        var y = overlayPoint.y + scrollPos.top;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        _angular2Material_core.applyCssTransform(element, "translateX(" + x + "px) translateY(" + y + "px)");
	    };
	    return ConnectedPositionStrategy;
	}());
	
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * explicit position relative to the browser's viewport.
	 */
	var GlobalPositionStrategy = (function () {
	    function GlobalPositionStrategy() {
	        this._cssPosition = 'absolute';
	        this._top = '';
	        this._bottom = '';
	        this._left = '';
	        this._right = '';
	        /** Array of individual applications of translateX(). Currently only for centering. */
	        this._translateX = [];
	        /** Array of individual applications of translateY(). Currently only for centering. */
	        this._translateY = [];
	    }
	    /** Sets the element to usee CSS position: fixed */
	    GlobalPositionStrategy.prototype.fixed = function () {
	        this._cssPosition = 'fixed';
	        return this;
	    };
	    /** Sets the element to usee CSS position: absolute. This is the default. */
	    GlobalPositionStrategy.prototype.absolute = function () {
	        this._cssPosition = 'absolute';
	        return this;
	    };
	    /** Sets the top position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.top = function (value) {
	        this._bottom = '';
	        this._translateY = [];
	        this._top = value;
	        return this;
	    };
	    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.left = function (value) {
	        this._right = '';
	        this._translateX = [];
	        this._left = value;
	        return this;
	    };
	    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.bottom = function (value) {
	        this._top = '';
	        this._translateY = [];
	        this._bottom = value;
	        return this;
	    };
	    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.right = function (value) {
	        this._left = '';
	        this._translateX = [];
	        this._right = value;
	        return this;
	    };
	    /**
	     * Centers the overlay horizontally with an optional offset.
	     * Clears any previously set horizontal position.
	     */
	    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._left = '50%';
	        this._right = '';
	        this._translateX = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Centers the overlay vertically with an optional offset.
	     * Clears any previously set vertical position.
	     */
	    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._top = '50%';
	        this._bottom = '';
	        this._translateY = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Apply the position to the element.
	     * TODO: internal
	     */
	    GlobalPositionStrategy.prototype.apply = function (element) {
	        element.style.position = this._cssPosition;
	        element.style.top = this._top;
	        element.style.left = this._left;
	        element.style.bottom = this._bottom;
	        element.style.right = this._right;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        var tranlateX = this._reduceTranslateValues('translateX', this._translateX);
	        var translateY = this._reduceTranslateValues('translateY', this._translateY);
	        _angular2Material_core.applyCssTransform(element, tranlateX + " " + translateY);
	        return Promise.resolve(null);
	    };
	    /** Reduce a list of translate values to a string that can be used in the transform property */
	    GlobalPositionStrategy.prototype._reduceTranslateValues = function (translateFn, values) {
	        return values.map(function (t) { return (translateFn + "(" + t + ")"); }).join(' ');
	    };
	    return GlobalPositionStrategy;
	}());
	
	var __decorate$7 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$7 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Builder for overlay position strategy. */
	var OverlayPositionBuilder = (function () {
	    function OverlayPositionBuilder(_viewportRuler) {
	        this._viewportRuler = _viewportRuler;
	    }
	    /** Creates a global position strategy. */
	    OverlayPositionBuilder.prototype.global = function () {
	        return new GlobalPositionStrategy();
	    };
	    /** Creates a relative position strategy. */
	    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
	        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
	    };
	    OverlayPositionBuilder = __decorate$7([
	        _angular_core.Injectable(), 
	        __metadata$7('design:paramtypes', [ViewportRuler])
	    ], OverlayPositionBuilder);
	    return OverlayPositionBuilder;
	}());
	
	/**
	 * The OverlayContainer is the container in which all overlays will load.
	 * It should be provided in the root component to ensure it is properly shared.
	 */
	var OverlayContainer = (function () {
	    function OverlayContainer() {
	    }
	    /**
	     * This method returns the overlay container element.  It will lazily
	     * create the element the first time  it is called to facilitate using
	     * the container in non-browser environments.
	     * @returns {HTMLElement} the container element
	     */
	    OverlayContainer.prototype.getContainerElement = function () {
	        if (!this._containerElement) {
	            this._createContainer();
	        }
	        return this._containerElement;
	    };
	    /**
	     * Create the overlay container element, which is simply a div
	     * with the 'md-overlay-container' class on the document body.
	     */
	    OverlayContainer.prototype._createContainer = function () {
	        var container = document.createElement('div');
	        container.classList.add('md-overlay-container');
	        document.body.appendChild(container);
	        this._containerElement = container;
	    };
	    return OverlayContainer;
	}());
	
	var __decorate$6 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$6 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Next overlay unique ID. */
	var nextUniqueId = 0;
	/** The default state for newly created overlays. */
	var defaultState = new OverlayState();
	/**
	 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
	 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
	 * selects, etc. can all be built using overlays. The service should primarily be used by authors
	 * of re-usable components rather than developers building end-user applications.
	 *
	 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
	 */
	var Overlay = (function () {
	    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
	        this._overlayContainer = _overlayContainer;
	        this._componentFactoryResolver = _componentFactoryResolver;
	        this._positionBuilder = _positionBuilder;
	    }
	    /**
	     * Creates an overlay.
	     * @param state State to apply to the overlay.
	     * @returns A reference to the created overlay.
	     */
	    Overlay.prototype.create = function (state) {
	        if (state === void 0) { state = defaultState; }
	        return this._createOverlayRef(this._createPaneElement(), state);
	    };
	    /**
	     * Returns a position builder that can be used, via fluent API,
	     * to construct and configure a position strategy.
	     */
	    Overlay.prototype.position = function () {
	        return this._positionBuilder;
	    };
	    /**
	     * Creates the DOM element for an overlay and appends it to the overlay container.
	     * @returns Promise resolving to the created element.
	     */
	    Overlay.prototype._createPaneElement = function () {
	        var pane = document.createElement('div');
	        pane.id = "md-overlay-" + nextUniqueId++;
	        pane.classList.add('md-overlay-pane');
	        this._overlayContainer.getContainerElement().appendChild(pane);
	        return pane;
	    };
	    /**
	     * Create a DomPortalHost into which the overlay content can be loaded.
	     * @param pane The DOM element to turn into a portal host.
	     * @returns A portal host for the given DOM element.
	     */
	    Overlay.prototype._createPortalHost = function (pane) {
	        return new DomPortalHost(pane, this._componentFactoryResolver);
	    };
	    /**
	     * Creates an OverlayRef for an overlay in the given DOM element.
	     * @param pane DOM element for the overlay
	     * @param state
	     * @returns {OverlayRef}
	     */
	    Overlay.prototype._createOverlayRef = function (pane, state) {
	        return new OverlayRef(this._createPortalHost(pane), pane, state);
	    };
	    Overlay = __decorate$6([
	        _angular_core.Injectable(), 
	        __metadata$6('design:paramtypes', [OverlayContainer, _angular_core.ComponentFactoryResolver, OverlayPositionBuilder])
	    ], Overlay);
	    return Overlay;
	}());
	/** Providers for Overlay and its related injectables. */
	var OVERLAY_PROVIDERS = [
	    ViewportRuler,
	    OverlayPositionBuilder,
	    Overlay,
	    OverlayContainer,
	];
	
	var __decorate$5 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$5 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
	var defaultPositionList = [
	    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
	    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
	];
	/**
	 * Directive applied to an element to make it usable as an origin for an Overlay using a
	 * ConnectedPositionStrategy.
	 */
	var OverlayOrigin = (function () {
	    function OverlayOrigin(_elementRef) {
	        this._elementRef = _elementRef;
	    }
	    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
	        get: function () {
	            return this._elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    OverlayOrigin = __decorate$5([
	        _angular_core.Directive({
	            selector: '[overlay-origin]',
	            exportAs: 'overlayOrigin',
	        }), 
	        __metadata$5('design:paramtypes', [_angular_core.ElementRef])
	    ], OverlayOrigin);
	    return OverlayOrigin;
	}());
	/**
	 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
	 */
	var ConnectedOverlayDirective = (function () {
	    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
	    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
	        this._overlay = _overlay;
	        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
	    }
	    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
	        get: function () {
	            return this._overlayRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnInit = function () {
	        this._createOverlay();
	    };
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
	        this._destroyOverlay();
	    };
	    /** Creates an overlay and attaches this directive's template to it. */
	    ConnectedOverlayDirective.prototype._createOverlay = function () {
	        if (!this.positions || !this.positions.length) {
	            this.positions = defaultPositionList;
	        }
	        var overlayConfig = new OverlayState();
	        overlayConfig.positionStrategy =
	            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
	        this._overlayRef = this._overlay.create(overlayConfig);
	        this._overlayRef.attach(this._templatePortal);
	    };
	    /** Destroys the overlay created by this directive. */
	    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
	        this._overlayRef.dispose();
	    };
	    __decorate$5([
	        _angular_core.Input(), 
	        __metadata$5('design:type', OverlayOrigin)
	    ], ConnectedOverlayDirective.prototype, "origin", void 0);
	    __decorate$5([
	        _angular_core.Input(), 
	        __metadata$5('design:type', Array)
	    ], ConnectedOverlayDirective.prototype, "positions", void 0);
	    ConnectedOverlayDirective = __decorate$5([
	        _angular_core.Directive({
	            selector: '[connected-overlay]'
	        }), 
	        __metadata$5('design:paramtypes', [Overlay, _angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], ConnectedOverlayDirective);
	    return ConnectedOverlayDirective;
	}());
	var OverlayModule = (function () {
	    function OverlayModule() {
	    }
	    OverlayModule.forRoot = function () {
	        return {
	            ngModule: OverlayModule,
	            providers: OVERLAY_PROVIDERS,
	        };
	    };
	    OverlayModule = __decorate$5([
	        _angular_core.NgModule({
	            imports: [PortalModule],
	            exports: [ConnectedOverlayDirective, OverlayOrigin],
	            declarations: [ConnectedOverlayDirective, OverlayOrigin],
	        }), 
	        __metadata$5('design:paramtypes', [])
	    ], OverlayModule);
	    return OverlayModule;
	}());
	
	var __decorate$9 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$9 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (window && window.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var LIVE_ANNOUNCER_ELEMENT_TOKEN = new _angular_core.OpaqueToken('mdLiveAnnouncerElement');
	var MdLiveAnnouncer = (function () {
	    function MdLiveAnnouncer(elementToken) {
	        // We inject the live element as `any` because the constructor signature cannot reference
	        // browser globals (HTMLElement) on non-browser environments, since having a class decorator
	        // causes TypeScript to preserve the constructor signature types.
	        this._liveElement = elementToken || this._createLiveElement();
	    }
	    /**
	     * @param message Message to be announced to the screenreader
	     * @param politeness The politeness of the announcer element.
	     */
	    MdLiveAnnouncer.prototype.announce = function (message, politeness) {
	        var _this = this;
	        if (politeness === void 0) { politeness = 'polite'; }
	        this._liveElement.textContent = '';
	        // TODO: ensure changing the politeness works on all environments we support.
	        this._liveElement.setAttribute('aria-live', politeness);
	        // This 100ms timeout is necessary for some browser + screen-reader combinations:
	        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
	        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
	        //   second time without clearing and then using a non-zero delay.
	        // (using JAWS 17 at time of this writing).
	        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
	    };
	    MdLiveAnnouncer.prototype._createLiveElement = function () {
	        var liveEl = document.createElement('div');
	        liveEl.classList.add('md-live-announcer');
	        liveEl.setAttribute('aria-atomic', 'true');
	        liveEl.setAttribute('aria-live', 'polite');
	        document.body.appendChild(liveEl);
	        return liveEl;
	    };
	    MdLiveAnnouncer = __decorate$9([
	        _angular_core.Injectable(),
	        __param(0, _angular_core.Optional()),
	        __param(0, _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)), 
	        __metadata$9('design:paramtypes', [Object])
	    ], MdLiveAnnouncer);
	    return MdLiveAnnouncer;
	}());
	
	var __extends$5 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$10 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$10 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/* Adjusts configuration of our gesture library, Hammer. */
	var MdGestureConfig = (function (_super) {
	    __extends$5(MdGestureConfig, _super);
	    function MdGestureConfig() {
	        _super.apply(this, arguments);
	        /* List of new event names to add to the gesture support list */
	        this.events = [
	            'drag',
	            'dragstart',
	            'dragend',
	            'dragright',
	            'dragleft',
	            'longpress',
	            'slide',
	            'slidestart',
	            'slideend',
	            'slideright',
	            'slideleft'
	        ];
	    }
	    /*
	     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
	     *
	     * Our gesture names come from the Material Design gestures spec:
	     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
	     *
	     * More information on default recognizers can be found in Hammer docs:
	     * http://hammerjs.github.io/recognizer-pan/
	     * http://hammerjs.github.io/recognizer-press/
	     *
	     * TODO: Confirm threshold numbers with Material Design UX Team
	     * */
	    MdGestureConfig.prototype.buildHammer = function (element) {
	        var mc = new Hammer(element);
	        // Default Hammer Recognizers.
	        var pan = new Hammer.Pan();
	        var swipe = new Hammer.Swipe();
	        var press = new Hammer.Press();
	        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
	        // Otherwise the previous `recognizeWith` will be dropped.
	        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
	        var drag = this._createRecognizer(slide, { event: 'drag', threshold: 6 }, swipe);
	        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
	        // Overwrite the default `pan` event to use the swipe event.
	        pan.recognizeWith(swipe);
	        // Add customized gestures to Hammer manager
	        mc.add([swipe, press, pan, drag, slide, longpress]);
	        return mc;
	    };
	    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
	    MdGestureConfig.prototype._createRecognizer = function (base, options) {
	        var inheritances = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            inheritances[_i - 2] = arguments[_i];
	        }
	        var recognizer = new base.constructor(options);
	        inheritances.push(base);
	        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
	        return recognizer;
	    };
	    MdGestureConfig = __decorate$10([
	        _angular_core.Injectable(), 
	        __metadata$10('design:paramtypes', [])
	    ], MdGestureConfig);
	    return MdGestureConfig;
	}(_angular_platformBrowser.HammerGestureConfig));
	
	var __decorate$11 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$11 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Class to coordinate unique selection based on name.
	 * Intended to be consumed as an Angular service.
	 * This service is needed because native radio change events are only fired on the item currently
	 * being selected, and we still need to uncheck the previous selection.
	 *
	 * This service does not *store* any IDs and names because they may change at any time, so it is
	 * less error-prone if they are simply passed through when the events occur.
	 */
	var MdUniqueSelectionDispatcher = (function () {
	    function MdUniqueSelectionDispatcher() {
	        this._listeners = [];
	    }
	    /** Notify other items that selection for the given name has been set. */
	    MdUniqueSelectionDispatcher.prototype.notify = function (id, name) {
	        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
	            var listener = _a[_i];
	            listener(id, name);
	        }
	    };
	    /** Listen for future changes to item selection. */
	    MdUniqueSelectionDispatcher.prototype.listen = function (listener) {
	        this._listeners.push(listener);
	    };
	    MdUniqueSelectionDispatcher = __decorate$11([
	        _angular_core.Injectable(), 
	        __metadata$11('design:paramtypes', [])
	    ], MdUniqueSelectionDispatcher);
	    return MdUniqueSelectionDispatcher;
	}());
	
	/**
	 * Applies a CSS transform to an element, including browser-prefixed properties.
	 * @param element
	 * @param transformValue
	 */
	function applyCssTransform$1(element, transformValue) {
	    // It's important to trim the result, because the browser will ignore the set operation
	    // if the string contains only whitespace.
	    var value = transformValue.trim();
	    element.style.transform = value;
	    element.style.webkitTransform = value;
	}
	
	/**
	 * Annotation Factory that allows HTML style boolean attributes. For example,
	 * a field declared like this:
	
	 * @Directive({ selector: 'component' }) class MyComponent {
	 *   @Input() @BooleanFieldValueFactory() myField: boolean;
	 * }
	 *
	 * You could set it up this way:
	 *   <component myField>
	 * or:
	 *   <component myField="">
	 * @deprecated
	 */
	function booleanFieldValueFactory() {
	    return function booleanFieldValueMetadata(target, key) {
	        var defaultValue = target[key];
	        var localKey = "__md_private_symbol_" + key;
	        target[localKey] = defaultValue;
	        Object.defineProperty(target, key, {
	            get: function () { return this[localKey]; },
	            set: function (value) {
	                this[localKey] = value != null && "" + value !== 'false';
	            }
	        });
	    };
	}
	
	// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
	// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
	// we are temporarily using a single (keydown) handler.
	// See: https://github.com/angular/angular/issues/9419
	var UP_ARROW = 38;
	var DOWN_ARROW = 40;
	var RIGHT_ARROW = 39;
	var LEFT_ARROW = 37;
	var ENTER = 13;
	var TAB = 9;
	
	var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdCoreModule = (function () {
	    function MdCoreModule() {
	    }
	    MdCoreModule.forRoot = function () {
	        return {
	            ngModule: MdCoreModule,
	            providers: [MdLiveAnnouncer]
	        };
	    };
	    MdCoreModule = __decorate([
	        _angular_core.NgModule({
	            imports: [MdLineModule, RtlModule, MdRippleModule, PortalModule, OverlayModule],
	            exports: [MdLineModule, RtlModule, MdRippleModule, PortalModule, OverlayModule],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCoreModule);
	    return MdCoreModule;
	}());
	
	exports.MdCoreModule = MdCoreModule;
	exports.Dir = Dir;
	exports.RtlModule = RtlModule;
	exports.Portal = Portal;
	exports.BasePortalHost = BasePortalHost;
	exports.ComponentPortal = ComponentPortal;
	exports.TemplatePortal = TemplatePortal;
	exports.PortalHostDirective = PortalHostDirective;
	exports.TemplatePortalDirective = TemplatePortalDirective;
	exports.PortalModule = PortalModule;
	exports.DomPortalHost = DomPortalHost;
	exports.Overlay = Overlay;
	exports.OVERLAY_PROVIDERS = OVERLAY_PROVIDERS;
	exports.OverlayContainer = OverlayContainer;
	exports.OverlayRef = OverlayRef;
	exports.OverlayState = OverlayState;
	exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
	exports.OverlayOrigin = OverlayOrigin;
	exports.OverlayModule = OverlayModule;
	exports.MdGestureConfig = MdGestureConfig;
	exports.MdRipple = MdRipple;
	exports.MdRippleModule = MdRippleModule;
	exports.MdLiveAnnouncer = MdLiveAnnouncer;
	exports.LIVE_ANNOUNCER_ELEMENT_TOKEN = LIVE_ANNOUNCER_ELEMENT_TOKEN;
	exports.MdUniqueSelectionDispatcher = MdUniqueSelectionDispatcher;
	exports.MdLineModule = MdLineModule;
	exports.MdLine = MdLine;
	exports.MdLineSetter = MdLineSetter;
	exports.applyCssTransform = applyCssTransform$1;
	exports.MdError = MdError;
	exports.BooleanFieldValue = booleanFieldValueFactory;
	exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
	exports.ConnectionPositionPair = ConnectionPositionPair;
	exports.UP_ARROW = UP_ARROW;
	exports.DOWN_ARROW = DOWN_ARROW;
	exports.RIGHT_ARROW = RIGHT_ARROW;
	exports.LEFT_ARROW = LEFT_ARROW;
	exports.ENTER = ENTER;
	exports.TAB = TAB;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(7);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(18), __webpack_require__(27), __webpack_require__(24), __webpack_require__(28), __webpack_require__(29), __webpack_require__(36), __webpack_require__(38), __webpack_require__(40), __webpack_require__(43), __webpack_require__(45), __webpack_require__(52), __webpack_require__(54)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/http', '@angular2-material/core', 'rxjs/Observable', 'rxjs/add/observable/forkJoin', 'rxjs/add/observable/of', 'rxjs/add/operator/map', 'rxjs/add/operator/filter', 'rxjs/add/operator/do', 'rxjs/add/operator/share', 'rxjs/add/operator/finally', 'rxjs/add/operator/catch'], factory) :
	    (factory((global.md = global.md || {}, global.md.icon = global.md.icon || {}),global.ng.core,global.ng.http,global.md.core,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype));
	}(this, (function (exports,_angular_core,_angular_http,_angular2Material_core,rxjs_Observable,rxjs_add_observable_forkJoin,rxjs_add_observable_of,rxjs_add_operator_map,rxjs_add_operator_filter,rxjs_add_operator_do,rxjs_add_operator_share,rxjs_add_operator_finally,rxjs_add_operator_catch) { 'use strict';
	
	var __extends$1 = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$1 = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Exception thrown when attempting to load an icon with a name that cannot be found. */
	var MdIconNameNotFoundError = (function (_super) {
	    __extends$1(MdIconNameNotFoundError, _super);
	    function MdIconNameNotFoundError(iconName) {
	        _super.call(this, "Unable to find icon with the name \"" + iconName + "\"");
	    }
	    return MdIconNameNotFoundError;
	}(_angular2Material_core.MdError));
	/**
	 * Exception thrown when attempting to load SVG content that does not contain the expected
	 * <svg> tag.
	 */
	var MdIconSvgTagNotFoundError = (function (_super) {
	    __extends$1(MdIconSvgTagNotFoundError, _super);
	    function MdIconSvgTagNotFoundError() {
	        _super.call(this, '<svg> tag not found');
	    }
	    return MdIconSvgTagNotFoundError;
	}(_angular2Material_core.MdError));
	/** Configuration for an icon, including the URL and possibly the cached SVG element. */
	var SvgIconConfig = (function () {
	    function SvgIconConfig(url) {
	        this.url = url;
	        this.svgElement = null;
	    }
	    return SvgIconConfig;
	}());
	/** Returns the cache key to use for an icon namespace and name. */
	var iconKey = function (namespace, name) { return namespace + ':' + name; };
	/**
	 * Service to register and display icons used by the <md-icon> component.
	 * - Registers icon URLs by namespace and name.
	 * - Registers icon set URLs by namespace.
	 * - Registers aliases for CSS classes, for use with icon fonts.
	 * - Loads icons from URLs and extracts individual icons from icon sets.
	 */
	var MdIconRegistry = (function () {
	    function MdIconRegistry(_http) {
	        this._http = _http;
	        /**
	         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
	         */
	        this._svgIconConfigs = new Map();
	        /**
	         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
	         * Multiple icon sets can be registered under the same namespace.
	         */
	        this._iconSetConfigs = new Map();
	        /** Cache for icons loaded by direct URLs. */
	        this._cachedIconsByUrl = new Map();
	        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
	        this._inProgressUrlFetches = new Map();
	        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
	        this._fontCssClassesByAlias = new Map();
	        /**
	         * The CSS class to apply when an <md-icon> component has no icon name, url, or font specified.
	         * The default 'material-icons' value assumes that the material icon font has been loaded as
	         * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
	         */
	        this._defaultFontSetClass = 'material-icons';
	    }
	    /** Registers an icon by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIcon = function (iconName, url) {
	        return this.addSvgIconInNamespace('', iconName, url);
	    };
	    /** Registers an icon by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconInNamespace = function (namespace, iconName, url) {
	        var key = iconKey(namespace, iconName);
	        this._svgIconConfigs.set(key, new SvgIconConfig(url));
	        return this;
	    };
	    /** Registers an icon set by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIconSet = function (url) {
	        return this.addSvgIconSetInNamespace('', url);
	    };
	    /** Registers an icon set by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconSetInNamespace = function (namespace, url) {
	        var config = new SvgIconConfig(url);
	        if (this._iconSetConfigs.has(namespace)) {
	            this._iconSetConfigs.get(namespace).push(config);
	        }
	        else {
	            this._iconSetConfigs.set(namespace, [config]);
	        }
	        return this;
	    };
	    /**
	     * Defines an alias for a CSS class name to be used for icon fonts. Creating an mdIcon
	     * component with the alias as the fontSet input will cause the class name to be applied
	     * to the <md-icon> element.
	     */
	    MdIconRegistry.prototype.registerFontClassAlias = function (alias, className) {
	        if (className === void 0) { className = alias; }
	        this._fontCssClassesByAlias.set(alias, className);
	        return this;
	    };
	    /**
	     * Returns the CSS class name associated with the alias by a previous call to
	     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
	     */
	    MdIconRegistry.prototype.classNameForFontAlias = function (alias) {
	        return this._fontCssClassesByAlias.get(alias) || alias;
	    };
	    /**
	     * Sets the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.setDefaultFontSetClass = function (className) {
	        this._defaultFontSetClass = className;
	        return this;
	    };
	    /**
	     * Returns the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.getDefaultFontSetClass = function () {
	        return this._defaultFontSetClass;
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL.
	     * The response from the URL may be cached so this will not always cause an HTTP request, but
	     * the produced element will always be a new copy of the originally fetched icon. (That is,
	     * it will not contain any modifications made to elements previously returned).
	     */
	    MdIconRegistry.prototype.getSvgIconFromUrl = function (url) {
	        var _this = this;
	        if (this._cachedIconsByUrl.has(url)) {
	            return rxjs_Observable.Observable.of(cloneSvg(this._cachedIconsByUrl.get(url)));
	        }
	        return this._loadSvgIconFromConfig(new SvgIconConfig(url))
	            .do(function (svg) { return _this._cachedIconsByUrl.set(url, svg); })
	            .map(function (svg) { return cloneSvg(svg); });
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) with the given name
	     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
	     * if not, the Observable will throw an MdIconNameNotFoundError.
	     */
	    MdIconRegistry.prototype.getNamedSvgIcon = function (name, namespace) {
	        if (namespace === void 0) { namespace = ''; }
	        // Return (copy of) cached icon if possible.
	        var key = iconKey(namespace, name);
	        if (this._svgIconConfigs.has(key)) {
	            return this._getSvgFromConfig(this._svgIconConfigs.get(key));
	        }
	        // See if we have any icon sets registered for the namespace.
	        var iconSetConfigs = this._iconSetConfigs.get(namespace);
	        if (iconSetConfigs) {
	            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
	        }
	        return rxjs_Observable.Observable.throw(new MdIconNameNotFoundError(key));
	    };
	    /**
	     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
	     */
	    MdIconRegistry.prototype._getSvgFromConfig = function (config) {
	        if (config.svgElement) {
	            // We already have the SVG element for this icon, return a copy.
	            return rxjs_Observable.Observable.of(cloneSvg(config.svgElement));
	        }
	        else {
	            // Fetch the icon from the config's URL, cache it, and return a copy.
	            return this._loadSvgIconFromConfig(config)
	                .do(function (svg) { return config.svgElement = svg; })
	                .map(function (svg) { return cloneSvg(svg); });
	        }
	    };
	    /**
	     * Attempts to find an icon with the specified name in any of the SVG icon sets.
	     * First searches the available cached icons for a nested element with a matching name, and
	     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
	     * that have not been cached, and searches again after all fetches are completed.
	     * The returned Observable produces the SVG element if possible, and throws
	     * MdIconNameNotFoundError if no icon with the specified name can be found.
	     */
	    MdIconRegistry.prototype._getSvgFromIconSetConfigs = function (name, iconSetConfigs) {
	        var _this = this;
	        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
	        // requested name.
	        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	        if (namedIcon) {
	            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
	            // time anyway, there's probably not much advantage compared to just always extracting
	            // it from the icon set.
	            return rxjs_Observable.Observable.of(namedIcon);
	        }
	        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
	        // fetched, fetch them now and look for iconName in the results.
	        var iconSetFetchRequests = iconSetConfigs
	            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
	            .map(function (iconSetConfig) {
	            return _this._loadSvgIconSetFromConfig(iconSetConfig)
	                .catch(function (err, caught) {
	                // Swallow errors fetching individual URLs so the combined Observable won't
	                // necessarily fail.
	                console.log("Loading icon set URL: " + iconSetConfig.url + " failed: " + err);
	                return rxjs_Observable.Observable.of(null);
	            })
	                .do(function (svg) {
	                // Cache SVG element.
	                if (svg) {
	                    iconSetConfig.svgElement = svg;
	                }
	            });
	        });
	        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
	        // cached SVG element (unless the request failed), and we can check again for the icon.
	        return rxjs_Observable.Observable.forkJoin(iconSetFetchRequests)
	            .map(function (ignoredResults) {
	            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	            if (!foundIcon) {
	                throw new MdIconNameNotFoundError(name);
	            }
	            return foundIcon;
	        });
	    };
	    /**
	     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractIconWithNameFromAnySet = function (iconName, iconSetConfigs) {
	        // Iterate backwards, so icon sets added later have precedence.
	        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
	            var config = iconSetConfigs[i];
	            if (config.svgElement) {
	                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName, config);
	                if (foundIcon) {
	                    return foundIcon;
	                }
	            }
	        }
	        return null;
	    };
	    /**
	     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconFromConfig = function (config) {
	        var _this = this;
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText, config); });
	    };
	    /**
	     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconSetFromConfig = function (config) {
	        var _this = this;
	        // TODO: Document that icons should only be loaded from trusted sources.
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._svgElementFromString(svgText); });
	    };
	    /**
	     * Creates a DOM element from the given SVG string, and adds default attributes.
	     */
	    MdIconRegistry.prototype._createSvgElementForSingleIcon = function (responseText, config) {
	        var svg = this._svgElementFromString(responseText);
	        this._setSvgAttributes(svg, config);
	        return svg;
	    };
	    /**
	     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractSvgIconFromSet = function (iconSet, iconName, config) {
	        var iconNode = iconSet.querySelector('#' + iconName);
	        if (!iconNode) {
	            return null;
	        }
	        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
	        // the content of a new <svg> node.
	        if (iconNode.tagName.toLowerCase() == 'svg') {
	            return this._setSvgAttributes(iconNode.cloneNode(true), config);
	        }
	        // createElement('SVG') doesn't work as expected; the DOM ends up with
	        // the correct nodes, but the SVG content doesn't render. Instead we
	        // have to create an empty SVG node using innerHTML and append its content.
	        // Elements created using DOMParser.parseFromString have the same problem.
	        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
	        var svg = this._svgElementFromString('<svg></svg>');
	        // Clone the node so we don't remove it from the parent icon set element.
	        svg.appendChild(iconNode.cloneNode(true));
	        return this._setSvgAttributes(svg, config);
	    };
	    /**
	     * Creates a DOM element from the given SVG string.
	     */
	    MdIconRegistry.prototype._svgElementFromString = function (str) {
	        // TODO: Is there a better way than innerHTML? Renderer doesn't appear to have a method for
	        // creating an element from an HTML string.
	        var div = document.createElement('DIV');
	        div.innerHTML = str;
	        var svg = div.querySelector('svg');
	        if (!svg) {
	            throw new MdIconSvgTagNotFoundError();
	        }
	        return svg;
	    };
	    /**
	     * Sets the default attributes for an SVG element to be used as an icon.
	     */
	    MdIconRegistry.prototype._setSvgAttributes = function (svg, config) {
	        if (!svg.getAttribute('xmlns')) {
	            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	        }
	        svg.setAttribute('fit', '');
	        svg.setAttribute('height', '100%');
	        svg.setAttribute('width', '100%');
	        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
	        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
	        return svg;
	    };
	    /**
	     * Returns an Observable which produces the string contents of the given URL. Results may be
	     * cached, so future calls with the same URL may not cause another HTTP request.
	     */
	    MdIconRegistry.prototype._fetchUrl = function (url) {
	        var _this = this;
	        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
	        // already a request in progress for that URL. It's necessary to call share() on the
	        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
	        if (this._inProgressUrlFetches.has(url)) {
	            return this._inProgressUrlFetches.get(url);
	        }
	        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
	        // Observable. Figure out why and fix it.
	        var req = this._http.get(url)
	            .map(function (response) { return response.text(); })
	            .finally(function () {
	            _this._inProgressUrlFetches.delete(url);
	        })
	            .share();
	        this._inProgressUrlFetches.set(url, req);
	        return req;
	    };
	    MdIconRegistry = __decorate$1([
	        _angular_core.Injectable(), 
	        __metadata$1('design:paramtypes', [_angular_http.Http])
	    ], MdIconRegistry);
	    return MdIconRegistry;
	}());
	/** Clones an SVGElement while preserving type information. */
	function cloneSvg(svg) {
	    return svg.cloneNode(true);
	}
	
	var __extends = (window && window.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (window && window.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Exception thrown when an invalid icon name is passed to an md-icon component. */
	var MdIconInvalidNameError = (function (_super) {
	    __extends(MdIconInvalidNameError, _super);
	    function MdIconInvalidNameError(iconName) {
	        _super.call(this, "Invalid icon name: \"" + iconName + "\"");
	    }
	    return MdIconInvalidNameError;
	}(_angular2Material_core.MdError));
	/**
	 * Component to display an icon. It can be used in the following ways:
	 * - Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined
	 *   as a child of the <md-icon> component, so that CSS styles can easily be applied to it.
	 *   The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its
	 *   server must be configured to allow cross-domain requests.
	 *   Example:
	 *     <md-icon svgSrc="assets/arrow.svg"></md-icon>
	 *
	 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
	 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
	 *   MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
	 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
	 *   Examples:
	 *     <md-icon svgIcon="left-arrow"></md-icon>
	 *     <md-icon svgIcon="animals:cat"></md-icon>
	 *
	 * - Use a font ligature as an icon by putting the ligature text in the content of the <md-icon>
	 *   component. By default the Material icons font is used as described at
	 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
	 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
	 *   desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
	 *   Examples:
	 *     <md-icon>home</md-icon>
	 *     <md-icon fontSet="myfont">sun</md-icon>
	 *
	 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
	 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
	 *   CSS class which causes the glyph to be displayed via a :before selector, as in
	 *   https://fortawesome.github.io/Font-Awesome/examples/
	 *   Example:
	 *     <md-icon fontSet="fa" fontIcon="alarm"></md-icon>
	 */
	var MdIcon = (function () {
	    function MdIcon(_element, _renderer, _mdIconRegistry) {
	        this._element = _element;
	        this._renderer = _renderer;
	        this._mdIconRegistry = _mdIconRegistry;
	        this.hostAriaLabel = '';
	    }
	    /**
	     * Splits an svgIcon binding value into its icon set and icon name components.
	     * Returns a 2-element array of [(icon set), (icon name)].
	     * The separator for the two fields is ':'. If there is no separator, an empty
	     * string is returned for the icon set and the entire value is returned for
	     * the icon name. If the argument is falsy, returns an array of two empty strings.
	     * Throws a MdIconInvalidNameError if the name contains two or more ':' separators.
	     * Examples:
	     *   'social:cake' -> ['social', 'cake']
	     *   'penguin' -> ['', 'penguin']
	     *   null -> ['', '']
	     *   'a:b:c' -> (throws MdIconInvalidNameError)
	     */
	    MdIcon.prototype._splitIconName = function (iconName) {
	        if (!iconName) {
	            return ['', ''];
	        }
	        var parts = iconName.split(':');
	        switch (parts.length) {
	            case 1:
	                // Use default namespace.
	                return ['', parts[0]];
	            case 2:
	                return parts;
	            default:
	                throw new MdIconInvalidNameError(iconName);
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        var changedInputs = Object.keys(changes);
	        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
	        if (changedInputs.indexOf('svgIcon') != -1 || changedInputs.indexOf('svgSrc') != -1) {
	            if (this.svgIcon) {
	                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
	                this._mdIconRegistry.getNamedSvgIcon(iconName, namespace).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	            else if (this.svgSrc) {
	                this._mdIconRegistry.getSvgIconFromUrl(this.svgSrc).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	        }
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	        this._updateAriaLabel();
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnInit = function () {
	        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
	        // e.g. <md-icon>arrow</md-icon>. In this case we need to add a CSS class for the default font.
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngAfterViewChecked = function () {
	        // Update aria label here because it may depend on the projected text content.
	        // (e.g. <md-icon>home</md-icon> should use 'home').
	        this._updateAriaLabel();
	    };
	    MdIcon.prototype._updateAriaLabel = function () {
	        var ariaLabel = this._getAriaLabel();
	        if (ariaLabel) {
	            this._renderer.setElementAttribute(this._element.nativeElement, 'aria-label', ariaLabel);
	        }
	    };
	    MdIcon.prototype._getAriaLabel = function () {
	        // If the parent provided an aria-label attribute value, use it as-is. Otherwise look for a
	        // reasonable value from the alt attribute, font icon name, SVG icon name, or (for ligatures)
	        // the text content of the directive.
	        var label = this.hostAriaLabel ||
	            this.alt ||
	            this.fontIcon ||
	            this._splitIconName(this.svgIcon)[1];
	        if (label) {
	            return label;
	        }
	        // The "content" of an SVG icon is not a useful label.
	        if (this._usingFontIcon()) {
	            var text = this._element.nativeElement.textContent;
	            if (text) {
	                return text;
	            }
	        }
	        // TODO: Warn here in dev mode.
	        return null;
	    };
	    MdIcon.prototype._usingFontIcon = function () {
	        return !(this.svgIcon || this.svgSrc);
	    };
	    MdIcon.prototype._setSvgElement = function (svg) {
	        var layoutElement = this._element.nativeElement;
	        // Remove existing child nodes and add the new SVG element.
	        // We would use renderer.detachView(Array.from(layoutElement.childNodes)) here,
	        // but it fails in IE11: https://github.com/angular/angular/issues/6327
	        layoutElement.innerHTML = '';
	        this._renderer.projectNodes(layoutElement, [svg]);
	    };
	    MdIcon.prototype._updateFontIconClasses = function () {
	        if (!this._usingFontIcon()) {
	            return;
	        }
	        var elem = this._element.nativeElement;
	        var fontSetClass = this.fontSet ?
	            this._mdIconRegistry.classNameForFontAlias(this.fontSet) :
	            this._mdIconRegistry.getDefaultFontSetClass();
	        if (fontSetClass != this._previousFontSetClass) {
	            if (this._previousFontSetClass) {
	                this._renderer.setElementClass(elem, this._previousFontSetClass, false);
	            }
	            if (fontSetClass) {
	                this._renderer.setElementClass(elem, fontSetClass, true);
	            }
	            this._previousFontSetClass = fontSetClass;
	        }
	        if (this.fontIcon != this._previousFontIconClass) {
	            if (this._previousFontIconClass) {
	                this._renderer.setElementClass(elem, this._previousFontIconClass, false);
	            }
	            if (this.fontIcon) {
	                this._renderer.setElementClass(elem, this.fontIcon, true);
	            }
	            this._previousFontIconClass = this.fontIcon;
	        }
	    };
	    __decorate([
	        _angular_core.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "svgSrc", void 0);
	    __decorate([
	        _angular_core.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "svgIcon", void 0);
	    __decorate([
	        _angular_core.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "fontSet", void 0);
	    __decorate([
	        _angular_core.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "fontIcon", void 0);
	    __decorate([
	        _angular_core.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "alt", void 0);
	    __decorate([
	        _angular_core.Input('aria-label'), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "hostAriaLabel", void 0);
	    MdIcon = __decorate([
	        _angular_core.Component({template: '<ng-content></ng-content>',
	            selector: 'md-icon',
	            styles: ["/** The width/height of the icon element. */ /** This works because we're using ViewEncapsulation.None. If we used the default encapsulation, the selector would need to be \":host\". */ md-icon { background-repeat: no-repeat; display: inline-block; fill: currentColor; height: 24px; width: 24px; } /*# sourceMappingURL=icon.css.map */ "],
	            host: {
	                'role': 'img',
	            },
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer, MdIconRegistry])
	    ], MdIcon);
	    return MdIcon;
	}());
	var MdIconModule = (function () {
	    function MdIconModule() {
	    }
	    MdIconModule.forRoot = function () {
	        return {
	            ngModule: MdIconModule,
	            providers: [MdIconRegistry],
	        };
	    };
	    MdIconModule = __decorate([
	        _angular_core.NgModule({
	            imports: [_angular_http.HttpModule],
	            exports: [MdIcon],
	            declarations: [MdIcon],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdIconModule);
	    return MdIconModule;
	}());
	
	exports.MdIconInvalidNameError = MdIconInvalidNameError;
	exports.MdIcon = MdIcon;
	exports.MdIconModule = MdIconModule;
	exports.MdIconRegistry = MdIconRegistry;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(25);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(2);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var forkJoin_1 = __webpack_require__(30);
	Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
	//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ForkJoinObservable_1 = __webpack_require__(31);
	exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
	//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(28);
	var EmptyObservable_1 = __webpack_require__(32);
	var isArray_1 = __webpack_require__(33);
	var subscribeToResult_1 = __webpack_require__(34);
	var OuterSubscriber_1 = __webpack_require__(35);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ForkJoinObservable = (function (_super) {
	    __extends(ForkJoinObservable, _super);
	    function ForkJoinObservable(sources, resultSelector) {
	        _super.call(this);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * @param sources
	     * @return {any}
	     * @static true
	     * @name forkJoin
	     * @owner Observable
	     */
	    ForkJoinObservable.create = function () {
	        var sources = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            sources[_i - 0] = arguments[_i];
	        }
	        if (sources === null || arguments.length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        var resultSelector = null;
	        if (typeof sources[sources.length - 1] === 'function') {
	            resultSelector = sources.pop();
	        }
	        // if the first and only other argument besides the resultSelector is an array
	        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
	        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
	            sources = sources[0];
	        }
	        if (sources.length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        return new ForkJoinObservable(sources, resultSelector);
	    };
	    ForkJoinObservable.prototype._subscribe = function (subscriber) {
	        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
	    };
	    return ForkJoinObservable;
	}(Observable_1.Observable));
	exports.ForkJoinObservable = ForkJoinObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ForkJoinSubscriber = (function (_super) {
	    __extends(ForkJoinSubscriber, _super);
	    function ForkJoinSubscriber(destination, sources, resultSelector) {
	        _super.call(this, destination);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	        this.completed = 0;
	        this.haveValues = 0;
	        var len = sources.length;
	        this.total = len;
	        this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            var source = sources[i];
	            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
	            if (innerSubscription) {
	                innerSubscription.outerIndex = i;
	                this.add(innerSubscription);
	            }
	        }
	    }
	    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values[outerIndex] = innerValue;
	        if (!innerSub._hasValue) {
	            innerSub._hasValue = true;
	            this.haveValues++;
	        }
	    };
	    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
	        var destination = this.destination;
	        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
	        var len = values.length;
	        if (!innerSub._hasValue) {
	            destination.complete();
	            return;
	        }
	        this.completed++;
	        if (this.completed !== len) {
	            return;
	        }
	        if (haveValues === len) {
	            var value = resultSelector ? resultSelector.apply(this, values) : values;
	            destination.next(value);
	        }
	        destination.complete();
	    };
	    return ForkJoinSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(34);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(22);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(23);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(15);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var of_1 = __webpack_require__(37);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(102);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var map_1 = __webpack_require__(39);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(108);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var filter_1 = __webpack_require__(41);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(42);
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctKey}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(3);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var do_1 = __webpack_require__(44);
	Observable_1.Observable.prototype.do = do_1._do;
	Observable_1.Observable.prototype._do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(42);
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var share_1 = __webpack_require__(46);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var multicast_1 = __webpack_require__(47);
	var Subject_1 = __webpack_require__(50);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MulticastObservable_1 = __webpack_require__(48);
	var ConnectableObservable_1 = __webpack_require__(49);
	/**
	 * Returns an Observable that emits the results of invoking a specified selector on items
	 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
	 *
	 * <img src="./img/multicast.png" width="100%">
	 *
	 * @param {Function|Subject} Factory function to create an intermediate subject through
	 * which the source sequence's elements will be multicast to the selector function
	 * or Subject to push source elements into.
	 * @param {Function} Optional selector function that can use the multicasted source stream
	 * as many times as needed, without causing multiple subscriptions to the source stream.
	 * Subscribers to the given source will receive all notifications of the source from the
	 * time of the subscription forward.
	 * @return {Observable} an Observable that emits the results of invoking the selector
	 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
	 * the underlying stream.
	 * @method multicast
	 * @owner Observable
	 */
	function multicast(subjectOrSubjectFactory, selector) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    }
	    else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    return !selector ?
	        new ConnectableObservable_1.ConnectableObservable(this, subjectFactory) :
	        new MulticastObservable_1.MulticastObservable(this, subjectFactory, selector);
	}
	exports.multicast = multicast;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(28);
	var ConnectableObservable_1 = __webpack_require__(49);
	var MulticastObservable = (function (_super) {
	    __extends(MulticastObservable, _super);
	    function MulticastObservable(source, subjectFactory, selector) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this.selector = selector;
	    }
	    MulticastObservable.prototype._subscribe = function (subscriber) {
	        var _a = this, selector = _a.selector, source = _a.source;
	        var connectable = new ConnectableObservable_1.ConnectableObservable(source, this.subjectFactory);
	        var subscription = selector(connectable).subscribe(subscriber);
	        subscription.add(connectable.connect());
	        return subscription;
	    };
	    return MulticastObservable;
	}(Observable_1.Observable));
	exports.MulticastObservable = MulticastObservable;
	//# sourceMappingURL=MulticastObservable.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(50);
	var Observable_1 = __webpack_require__(28);
	var Subscriber_1 = __webpack_require__(42);
	var Subscription_1 = __webpack_require__(51);
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this._refCount = 0;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            connection.add(this.source
	                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            }
	            else {
	                this._connection = connection;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return this.lift(new RefCountOperator(this));
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	exports.ConnectableObservable = ConnectableObservable;
	var ConnectableSubscriber = (function (_super) {
	    __extends(ConnectableSubscriber, _super);
	    function ConnectableSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    ConnectableSubscriber.prototype._error = function (err) {
	        this._unsubscribe();
	        _super.prototype._error.call(this, err);
	    };
	    ConnectableSubscriber.prototype._complete = function () {
	        this._unsubscribe();
	        _super.prototype._complete.call(this);
	    };
	    ConnectableSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (connectable) {
	            this.connectable = null;
	            var connection = connectable._connection;
	            connectable._refCount = 0;
	            connectable._subject = null;
	            connectable._connection = null;
	            if (connection) {
	                connection.unsubscribe();
	            }
	        }
	    };
	    return ConnectableSubscriber;
	}(Subject_1.SubjectSubscriber));
	var RefCountOperator = (function () {
	    function RefCountOperator(connectable) {
	        this.connectable = connectable;
	    }
	    RefCountOperator.prototype.call = function (subscriber, source) {
	        var connectable = this.connectable;
	        connectable._refCount++;
	        var refCounter = new RefCountSubscriber(subscriber, connectable);
	        var subscription = source._subscribe(refCounter);
	        if (!refCounter.closed) {
	            refCounter.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountOperator;
	}());
	var RefCountSubscriber = (function (_super) {
	    __extends(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (!connectable) {
	            this.connection = null;
	            return;
	        }
	        this.connectable = null;
	        var refCount = connectable._refCount;
	        if (refCount <= 0) {
	            this.connection = null;
	            return;
	        }
	        connectable._refCount = refCount - 1;
	        if (refCount > 1) {
	            this.connection = null;
	            return;
	        }
	        ///
	        // Compare the local RefCountSubscriber's connection Subscription to the
	        // connection Subscription on the shared ConnectableObservable. In cases
	        // where the ConnectableObservable source synchronously emits values, and
	        // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
	        // execution continues to here before the RefCountOperator has a chance to
	        // supply the RefCountSubscriber with the shared connection Subscription.
	        // For example:
	        // ```
	        // Observable.range(0, 10)
	        //   .publish()
	        //   .refCount()
	        //   .take(5)
	        //   .subscribe();
	        // ```
	        // In order to account for this case, RefCountSubscriber should only dispose
	        // the ConnectableObservable's shared connection Subscription if the
	        // connection Subscription exists, *and* either:
	        //   a. RefCountSubscriber doesn't have a reference to the shared connection
	        //      Subscription yet, or,
	        //   b. RefCountSubscriber's connection Subscription reference is identical
	        //      to the shared connection Subscription
	        ///
	        var connection = this.connection;
	        var sharedConnection = connectable._connection;
	        this.connection = null;
	        if (sharedConnection && (!connection || sharedConnection === connection)) {
	            sharedConnection.unsubscribe();
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(16);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(17);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var finally_1 = __webpack_require__(53);
	Observable_1.Observable.prototype.finally = finally_1._finally;
	Observable_1.Observable.prototype._finally = finally_1._finally;
	//# sourceMappingURL=finally.js.map

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(42);
	var Subscription_1 = __webpack_require__(51);
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} callback function to be called when source terminates.
	 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 * @method finally
	 * @owner Observable
	 */
	function _finally(callback) {
	    return this.lift(new FinallyOperator(callback));
	}
	exports._finally = _finally;
	var FinallyOperator = (function () {
	    function FinallyOperator(callback) {
	        this.callback = callback;
	    }
	    FinallyOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FinallySubscriber(subscriber, this.callback));
	    };
	    return FinallyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FinallySubscriber = (function (_super) {
	    __extends(FinallySubscriber, _super);
	    function FinallySubscriber(destination, callback) {
	        _super.call(this, destination);
	        this.add(new Subscription_1.Subscription(callback));
	    }
	    return FinallySubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=finally.js.map

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(28);
	var catch_1 = __webpack_require__(55);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	Observable_1.Observable.prototype._catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(103);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(18);
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    return AppComponent;
	}());
	AppComponent = __decorate([
	    core_1.Component({
	        selector: 'app',
	        template: __webpack_require__(57),
	        styles: [__webpack_require__(58)]
	    })
	], AppComponent);
	exports.AppComponent = AppComponent;


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div class=\"app-content\">\r\n    <md-card>\r\n        <button md-button>FLAT</button>\r\n        <button md-raised-button>RAISED</button>\r\n    </md-card>\r\n    <md-card>\r\n        <button md-icon-button>\r\n            <md-icon class=\"md-24\">favorite</md-icon>\r\n        </button>\r\n        <button md-fab>\r\n            <md-icon class=\"md-24\">add</md-icon>\r\n        </button>\r\n        <button md-mini-fab>\r\n            <md-icon class=\"md-24\">add</md-icon>\r\n        </button>\r\n    </md-card>\r\n    <md-card>\r\n        <button md-raised-button color=\"primary\">PRIMARY</button>\r\n        <button md-raised-button color=\"accent\">ACCENT</button>\r\n        <button md-raised-button color=\"warn\">WARN</button>\r\n    </md-card>\r\n    <md-card>\r\n        <button md-button disabled>OFF</button>\r\n        <button md-raised-button disabled>OFF</button>\r\n        <button md-mini-fab disabled><md-icon>check</md-icon></button>\r\n    </md-card>\r\n</div>"

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(59);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(60)();
	// imports
	
	
	// module
	exports.push([module.id, ".block {\r\n    display: inline-block;\r\n    vertical-align:top;\r\n}", ""]);
	
	// exports


/***/ },
/* 60 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(18);
	var device_mockup_component_1 = __webpack_require__(62);
	var DeviceMockupModule = (function () {
	    function DeviceMockupModule() {
	    }
	    return DeviceMockupModule;
	}());
	DeviceMockupModule = __decorate([
	    core_1.NgModule({
	        declarations: [
	            device_mockup_component_1.DeviceMockupComponent
	        ],
	        imports: [],
	        providers: [],
	        exports: [
	            device_mockup_component_1.DeviceMockupComponent
	        ]
	    })
	], DeviceMockupModule);
	exports.DeviceMockupModule = DeviceMockupModule;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(18);
	var DeviceMockupComponent = (function () {
	    function DeviceMockupComponent() {
	    }
	    return DeviceMockupComponent;
	}());
	DeviceMockupComponent = __decorate([
	    core_1.Component({
	        selector: 'devicem',
	        template: __webpack_require__(63),
	        styles: [__webpack_require__(64)]
	    })
	], DeviceMockupComponent);
	exports.DeviceMockupComponent = DeviceMockupComponent;


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<div style=\"width:300px\">\r\n    <div class=\"device-mockup\" data-device=\"nexus7\" data-orientation=\"portrait\" data-color=\"black\">\r\n        <div class=\"device\">\r\n            <div class=\"screen\">\r\n                <button>button</button>\r\n            </div>\r\n            <div class=\"button\">\r\n                <!-- You can hook the \"home button\" to some JavaScript events or just remove it -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(65);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(60)();
	// imports
	
	
	// module
	exports.push([module.id, "*{\r\n    -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -ms-box-sizing:border-box; box-sizing: border-box;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nhtml, body {\r\n    width: 100%;\r\n    width: 100%;\r\n    position: relative;\r\n}\r\n\r\nbody {\r\n    margin: 0 auto;\r\n    max-width: 600px;\r\n}\r\n\r\nh1 {\r\n    line-height: 200%;\r\n    margin: 30px auto;\r\n    text-align: center;\r\n    font-family: sans-serif;\r\n    font-weight: 100;\r\n}", ""]);
	
	// exports


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(52);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjgzNWQwM2I2ZGI3YjYxZTI4MzEiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vbW9kdWxlLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhXCIiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0cmlwLWFuc2kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9hbnNpLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktaG90LW1pZGRsZXdhcmUvY2xpZW50LW92ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hbnNpLWh0bWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9odG1sLWVudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaHRtbC1lbnRpdGllcy9saWIveG1sLWVudGl0aWVzLmpzIiwid2VicGFjazovLy8uL34vaHRtbC1lbnRpdGllcy9saWIvaHRtbDQtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9odG1sLWVudGl0aWVzL2xpYi9odG1sNS1lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWhvdC1taWRkbGV3YXJlL3Byb2Nlc3MtdXBkYXRlLmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LWNsaWVudC50cyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHMvYnJvd3Nlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29yZS9idW5kbGVzL2NvcmUudW1kLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hbmd1bGFyMi11bml2ZXJzYWwvYnJvd3Nlci9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9+L0Bhbmd1bGFyMi1tYXRlcmlhbC9jYXJkL2NhcmQudW1kLmpzIiwid2VicGFjazovLy8uL34vQGFuZ3VsYXIyLW1hdGVyaWFsL2J1dHRvbi9idXR0b24udW1kLmpzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL2J1bmRsZXMvY29tbW9uLnVtZC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy8uL34vQGFuZ3VsYXIyLW1hdGVyaWFsL2NvcmUvY29yZS51bWQuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2J1bmRsZXMvcGxhdGZvcm0tYnJvd3Nlci51bWQuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vLi9+L0Bhbmd1bGFyMi1tYXRlcmlhbC9pY29uL2ljb24udW1kLmpzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9idW5kbGVzL2h0dHAudW1kLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmFibGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vLi9+L3J4anMvYWRkL29ic2VydmFibGUvZm9ya0pvaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29ic2VydmFibGUvZm9ya0pvaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29ic2VydmFibGUvRm9ya0pvaW5PYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL0VtcHR5T2JzZXJ2YWJsZS5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL2lzQXJyYXkuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9PdXRlclN1YnNjcmliZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vLi9+L3J4anMvYWRkL29ic2VydmFibGUvb2YuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvb2YuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vLi9+L3J4anMvYWRkL29wZXJhdG9yL21hcC5qcyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3IvbWFwLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL2FkZC9vcGVyYXRvci9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29wZXJhdG9yL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhIiwid2VicGFjazovLy8uL34vcnhqcy9hZGQvb3BlcmF0b3IvZG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29wZXJhdG9yL2RvLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29wZXJhdG9yL3NoYXJlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vcGVyYXRvci9tdWx0aWNhc3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29ic2VydmFibGUvTXVsdGljYXN0T2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3QuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaXB0aW9uLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL2FkZC9vcGVyYXRvci9maW5hbGx5LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vcGVyYXRvci9maW5hbGx5LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2guanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2NhdGNoLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGEiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9hcHAuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLmNvbXBvbmVudC5jc3M/NmMyYSIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2RldmljZU1vY2t1cC9kZXZpY2UtbW9ja3VwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvZGV2aWNlTW9ja3VwL2RldmljZS1tb2NrdXAuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9kZXZpY2VNb2NrdXAvZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvZGV2aWNlTW9ja3VwL2RldmljZS1tb2NrdXAuY29tcG9uZW50LmNzcz9mZmRlIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9kZXZpY2VNb2NrdXAvZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuY3NzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvbnBtLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2Mjhk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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTRCO0FBQzVCLCtCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsbUJBQW1CLEVBQUU7QUFDeEU7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DLHNDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN1BBLGdEOzs7Ozs7QUNBQSw4Qzs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBLDhCQUE2QixZQUFZLElBQUksSUFBSSxNQUFNLElBQUk7QUFDM0Q7Ozs7Ozs7QUNIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsMkJBQTBCLGlCQUFpQixFQUFFO0FBQzdDLDRCQUEyQixjQUFjLEVBQUU7QUFDM0M7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0RBQXNEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxzQkFBc0IsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQsb0RBQW9ELEVBQUU7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0MsaUVBQWlFO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXVELGdCQUFnQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLHNDQUFzQyxFQUFFO0FBQ2hGO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsWUFBWTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxR0FBb0csa0NBQWtDLEVBQUUsa0JBQWtCLHFEQUFxRCxFQUFFO0FBQ2pOO0FBQ0E7QUFDQSwrRkFBOEYsa0NBQWtDLEVBQUUsa0JBQWtCLHFEQUFxRCxFQUFFO0FBQzNNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNQLFFBQVEsRUFBRSxTQUFTO1NBQ25CLFFBQVEsRUFBRSxtQkFBTyxDQUFDLEVBQWdDLENBQUM7U0FDbkQsTUFBTSxFQUFFLENBQUMsbUJBQU8sQ0FBQyxFQUErQixDQUFDLENBQUM7TUFDckQsQ0FBQztJQUVXLHFCQUFxQixDQUFJO0FBQXpCLHVEQUFxQjs7Ozs7OztBQ1JsQyxzZjs7Ozs7OztBQ0NBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7OztBQUdBO0FBQ0EsNkJBQTRCLHVDQUF1Qyw2QkFBNkIsMkJBQTJCLHdCQUF3QixtQkFBbUIsa0JBQWtCLEtBQUssb0JBQW9CLG9CQUFvQixvQkFBb0IsMkJBQTJCLEtBQUssY0FBYyx1QkFBdUIseUJBQXlCLEtBQUssWUFBWSwwQkFBMEIsMEJBQTBCLDJCQUEyQixnQ0FBZ0MseUJBQXlCLEtBQUs7O0FBRXJmOzs7Ozs7O0FDUEEsK0MiLCJmaWxlIjoibWFpbi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xyXG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHR0cnkge1xyXG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuIFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xyXG4gXHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHR9XHJcbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuIFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcclxuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2JlZjQ1YjAvc3JjL3NoYXJlZC91dGlscy9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xyXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcclxuIFx0dHJ5IHtcclxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwieFwiLCB7XHJcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cclxuIFx0XHR9KTtcclxuIFx0XHRjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XHJcbiBcdH0gY2F0Y2goeCkge1xyXG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNjgzNWQwM2I2ZGI3YjYxZTI4MzFcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XHJcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCAoZnVuY3Rpb24obmFtZSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChudWxsLCBmbik7XHJcbiBcdFx0XHRcdH0gZmluYWxseSB7XHJcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xyXG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHR2YWx1ZTogZW5zdXJlXHJcbiBcdFx0XHR9KTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0Zm4uZSA9IGVuc3VyZTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwibnVtYmVyXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RDYWxsYmFjaztcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5LCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gZmFsc2U7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdGhvdERvd25sb2FkTWFuaWZlc3QoZnVuY3Rpb24oZXJyLCB1cGRhdGUpIHtcclxuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xyXG4gXHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXBbdXBkYXRlLmNbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAwO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcclxuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XHJcbiBcdFx0aWYoIWNhbGxiYWNrKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdG9wdGlvbnMgPSB7fTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlKSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcclxuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcclxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxyXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xyXG4gXHRcdFx0XHR2YXIgcmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdFswXSk7XHJcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XHJcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjgzNWQwM2I2ZGI3YjYxZTI4MzEiLCIvKmVzbGludC1lbnYgYnJvd3NlciovXG4vKmdsb2JhbCBfX3Jlc291cmNlUXVlcnkgX193ZWJwYWNrX3B1YmxpY19wYXRoX18qL1xuXG52YXIgb3B0aW9ucyA9IHtcbiAgcGF0aDogXCIvX193ZWJwYWNrX2htclwiLFxuICB0aW1lb3V0OiAyMCAqIDEwMDAsXG4gIG92ZXJsYXk6IHRydWUsXG4gIHJlbG9hZDogZmFsc2UsXG4gIGxvZzogdHJ1ZSxcbiAgd2FybjogdHJ1ZSxcbiAgbmFtZTogJydcbn07XG5pZiAoX19yZXNvdXJjZVF1ZXJ5KSB7XG4gIHZhciBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG4gIHZhciBvdmVycmlkZXMgPSBxdWVyeXN0cmluZy5wYXJzZShfX3Jlc291cmNlUXVlcnkuc2xpY2UoMSkpO1xuICBpZiAob3ZlcnJpZGVzLnBhdGgpIG9wdGlvbnMucGF0aCA9IG92ZXJyaWRlcy5wYXRoO1xuICBpZiAob3ZlcnJpZGVzLnRpbWVvdXQpIG9wdGlvbnMudGltZW91dCA9IG92ZXJyaWRlcy50aW1lb3V0O1xuICBpZiAob3ZlcnJpZGVzLm92ZXJsYXkpIG9wdGlvbnMub3ZlcmxheSA9IG92ZXJyaWRlcy5vdmVybGF5ICE9PSAnZmFsc2UnO1xuICBpZiAob3ZlcnJpZGVzLnJlbG9hZCkgb3B0aW9ucy5yZWxvYWQgPSBvdmVycmlkZXMucmVsb2FkICE9PSAnZmFsc2UnO1xuICBpZiAob3ZlcnJpZGVzLm5vSW5mbyAmJiBvdmVycmlkZXMubm9JbmZvICE9PSAnZmFsc2UnKSB7XG4gICAgb3B0aW9ucy5sb2cgPSBmYWxzZTtcbiAgfVxuICBpZiAob3ZlcnJpZGVzLm5hbWUpIHtcbiAgICBvcHRpb25zLm5hbWUgPSBvdmVycmlkZXMubmFtZTtcbiAgfVxuICBpZiAob3ZlcnJpZGVzLnF1aWV0ICYmIG92ZXJyaWRlcy5xdWlldCAhPT0gJ2ZhbHNlJykge1xuICAgIG9wdGlvbnMubG9nID0gZmFsc2U7XG4gICAgb3B0aW9ucy53YXJuID0gZmFsc2U7XG4gIH1cbiAgaWYgKG92ZXJyaWRlcy5keW5hbWljUHVibGljUGF0aCkge1xuICAgIG9wdGlvbnMucGF0aCA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgb3B0aW9ucy5wYXRoO1xuICB9XG59XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAvLyBkbyBub3RoaW5nXG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuRXZlbnRTb3VyY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gIGNvbnNvbGUud2FybihcbiAgICBcIndlYnBhY2staG90LW1pZGRsZXdhcmUncyBjbGllbnQgcmVxdWlyZXMgRXZlbnRTb3VyY2UgdG8gd29yay4gXCIgK1xuICAgIFwiWW91IHNob3VsZCBpbmNsdWRlIGEgcG9seWZpbGwgaWYgeW91IHdhbnQgdG8gc3VwcG9ydCB0aGlzIGJyb3dzZXI6IFwiICtcbiAgICBcImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZXJ2ZXItc2VudF9ldmVudHMjVG9vbHNcIlxuICApO1xufSBlbHNlIHtcbiAgY29ubmVjdCgpO1xufVxuXG5mdW5jdGlvbiBFdmVudFNvdXJjZVdyYXBwZXIoKSB7XG4gIHZhciBzb3VyY2U7XG4gIHZhciBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgaW5pdCgpO1xuICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBpZiAoKG5ldyBEYXRlKCkgLSBsYXN0QWN0aXZpdHkpID4gb3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICBoYW5kbGVEaXNjb25uZWN0KCk7XG4gICAgfVxuICB9LCBvcHRpb25zLnRpbWVvdXQgLyAyKTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNvdXJjZSA9IG5ldyB3aW5kb3cuRXZlbnRTb3VyY2Uob3B0aW9ucy5wYXRoKTtcbiAgICBzb3VyY2Uub25vcGVuID0gaGFuZGxlT25saW5lO1xuICAgIHNvdXJjZS5vbmVycm9yID0gaGFuZGxlRGlzY29ubmVjdDtcbiAgICBzb3VyY2Uub25tZXNzYWdlID0gaGFuZGxlTWVzc2FnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9ubGluZSgpIHtcbiAgICBpZiAob3B0aW9ucy5sb2cpIGNvbnNvbGUubG9nKFwiW0hNUl0gY29ubmVjdGVkXCIpO1xuICAgIGxhc3RBY3Rpdml0eSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgbGFzdEFjdGl2aXR5ID0gbmV3IERhdGUoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEaXNjb25uZWN0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgIHNvdXJjZS5jbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoaW5pdCwgb3B0aW9ucy50aW1lb3V0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkTWVzc2FnZUxpc3RlbmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgbGlzdGVuZXJzLnB1c2goZm4pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKCkge1xuICBpZiAoIXdpbmRvdy5fX3dobUV2ZW50U291cmNlV3JhcHBlcikge1xuICAgIHdpbmRvdy5fX3dobUV2ZW50U291cmNlV3JhcHBlciA9IHt9O1xuICB9XG4gIGlmICghd2luZG93Ll9fd2htRXZlbnRTb3VyY2VXcmFwcGVyW29wdGlvbnMucGF0aF0pIHtcbiAgICAvLyBjYWNoZSB0aGUgd3JhcHBlciBmb3Igb3RoZXIgZW50cmllcyBsb2FkZWQgb25cbiAgICAvLyB0aGUgc2FtZSBwYWdlIHdpdGggdGhlIHNhbWUgb3B0aW9ucy5wYXRoXG4gICAgd2luZG93Ll9fd2htRXZlbnRTb3VyY2VXcmFwcGVyW29wdGlvbnMucGF0aF0gPSBFdmVudFNvdXJjZVdyYXBwZXIoKTtcbiAgfVxuICByZXR1cm4gd2luZG93Ll9fd2htRXZlbnRTb3VyY2VXcmFwcGVyW29wdGlvbnMucGF0aF07XG59XG5cbmZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGdldEV2ZW50U291cmNlV3JhcHBlcigpLmFkZE1lc3NhZ2VMaXN0ZW5lcihoYW5kbGVNZXNzYWdlKTtcblxuICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmRhdGEgPT0gXCJcXHVEODNEXFx1REM5M1wiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzTWVzc2FnZShKU09OLnBhcnNlKGV2ZW50LmRhdGEpKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIEhNUiBtZXNzYWdlOiBcIiArIGV2ZW50LmRhdGEgKyBcIlxcblwiICsgZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyB0aGUgcmVwb3J0ZXIgbmVlZHMgdG8gYmUgYSBzaW5nbGV0b24gb24gdGhlIHBhZ2Vcbi8vIGluIGNhc2UgdGhlIGNsaWVudCBpcyBiZWluZyB1c2VkIGJ5IG11bHRpcGxlIGJ1bmRsZXNcbi8vIHdlIG9ubHkgd2FudCB0byByZXBvcnQgb25jZS5cbi8vIGFsbCB0aGUgZXJyb3JzIHdpbGwgZ28gdG8gYWxsIGNsaWVudHNcbnZhciBzaW5nbGV0b25LZXkgPSAnX193ZWJwYWNrX2hvdF9taWRkbGV3YXJlX3JlcG9ydGVyX18nO1xudmFyIHJlcG9ydGVyO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlmICghd2luZG93W3NpbmdsZXRvbktleV0pIHtcbiAgICB3aW5kb3dbc2luZ2xldG9uS2V5XSA9IGNyZWF0ZVJlcG9ydGVyKCk7XG4gIH1cbiAgcmVwb3J0ZXIgPSB3aW5kb3dbc2luZ2xldG9uS2V5XTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVwb3J0ZXIoKSB7XG4gIHZhciBzdHJpcCA9IHJlcXVpcmUoJ3N0cmlwLWFuc2knKTtcblxuICB2YXIgb3ZlcmxheTtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucy5vdmVybGF5KSB7XG4gICAgb3ZlcmxheSA9IHJlcXVpcmUoJy4vY2xpZW50LW92ZXJsYXknKTtcbiAgfVxuXG4gIHZhciBzdHlsZXMgPSB7XG4gICAgZXJyb3JzOiBcImNvbG9yOiAjZmYwMDAwO1wiLFxuICAgIHdhcm5pbmdzOiBcImNvbG9yOiAjNWMzYjAwO1wiXG4gIH07XG4gIHZhciBwcmV2aW91c1Byb2JsZW1zID0gbnVsbDtcbiAgZnVuY3Rpb24gbG9nKHR5cGUsIG9iaikge1xuICAgIHZhciBuZXdQcm9ibGVtcyA9IG9ialt0eXBlXS5tYXAoZnVuY3Rpb24obXNnKSB7IHJldHVybiBzdHJpcChtc2cpOyB9KS5qb2luKCdcXG4nKTtcbiAgICBpZiAocHJldmlvdXNQcm9ibGVtcyA9PSBuZXdQcm9ibGVtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c1Byb2JsZW1zID0gbmV3UHJvYmxlbXM7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlID0gc3R5bGVzW3R5cGVdO1xuICAgIHZhciBuYW1lID0gb2JqLm5hbWUgPyBcIidcIiArIG9iai5uYW1lICsgXCInIFwiIDogXCJcIjtcbiAgICB2YXIgdGl0bGUgPSBcIltITVJdIGJ1bmRsZSBcIiArIG5hbWUgKyBcImhhcyBcIiArIG9ialt0eXBlXS5sZW5ndGggKyBcIiBcIiArIHR5cGU7XG4gICAgLy8gTk9URTogY29uc29sZS53YXJuIG9yIGNvbnNvbGUuZXJyb3Igd2lsbCBwcmludCB0aGUgc3RhY2sgdHJhY2VcbiAgICAvLyB3aGljaCBpc24ndCBoZWxwZnVsIGhlcmUsIHNvIHVzaW5nIGNvbnNvbGUubG9nIHRvIGVzY2FwZSBpdC5cbiAgICBpZiAoY29uc29sZS5ncm91cCAmJiBjb25zb2xlLmdyb3VwRW5kKSB7XG4gICAgICBjb25zb2xlLmdyb3VwKFwiJWNcIiArIHRpdGxlLCBzdHlsZSk7XG4gICAgICBjb25zb2xlLmxvZyhcIiVjXCIgKyBuZXdQcm9ibGVtcywgc3R5bGUpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCIlY1wiICsgdGl0bGUgKyBcIlxcblxcdCVjXCIgKyBuZXdQcm9ibGVtcy5yZXBsYWNlKC9cXG4vZywgXCJcXG5cXHRcIiksXG4gICAgICAgIHN0eWxlICsgXCJmb250LXdlaWdodDogYm9sZDtcIixcbiAgICAgICAgc3R5bGUgKyBcImZvbnQtd2VpZ2h0OiBub3JtYWw7XCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhblByb2JsZW1zQ2FjaGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByZXZpb3VzUHJvYmxlbXMgPSBudWxsO1xuICAgIH0sXG4gICAgcHJvYmxlbXM6IGZ1bmN0aW9uKHR5cGUsIG9iaikge1xuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICBsb2codHlwZSwgb2JqKTtcbiAgICAgIH1cbiAgICAgIGlmIChvdmVybGF5ICYmIHR5cGUgIT09ICd3YXJuaW5ncycpIG92ZXJsYXkuc2hvd1Byb2JsZW1zKHR5cGUsIG9ialt0eXBlXSk7XG4gICAgfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvdmVybGF5KSBvdmVybGF5LmNsZWFyKCk7XG4gICAgfSxcbiAgICB1c2VDdXN0b21PdmVybGF5OiBmdW5jdGlvbihjdXN0b21PdmVybGF5KSB7XG4gICAgICBvdmVybGF5ID0gY3VzdG9tT3ZlcmxheTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBwcm9jZXNzVXBkYXRlID0gcmVxdWlyZSgnLi9wcm9jZXNzLXVwZGF0ZScpO1xuXG52YXIgY3VzdG9tSGFuZGxlcjtcbnZhciBzdWJzY3JpYmVBbGxIYW5kbGVyO1xuZnVuY3Rpb24gcHJvY2Vzc01lc3NhZ2Uob2JqKSB7XG4gIHN3aXRjaChvYmouYWN0aW9uKSB7XG4gICAgY2FzZSBcImJ1aWxkaW5nXCI6XG4gICAgICBpZiAob3B0aW9ucy5sb2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbSE1SXSBidW5kbGUgXCIgKyAob2JqLm5hbWUgPyBcIidcIiArIG9iai5uYW1lICsgXCInIFwiIDogXCJcIikgK1xuICAgICAgICAgIFwicmVidWlsZGluZ1wiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiYnVpbHRcIjpcbiAgICAgIGlmIChvcHRpb25zLmxvZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltITVJdIGJ1bmRsZSBcIiArIChvYmoubmFtZSA/IFwiJ1wiICsgb2JqLm5hbWUgKyBcIicgXCIgOiBcIlwiKSArXG4gICAgICAgICAgXCJyZWJ1aWx0IGluIFwiICsgb2JqLnRpbWUgKyBcIm1zXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgIGNhc2UgXCJzeW5jXCI6XG4gICAgICBpZiAob2JqLm5hbWUgJiYgb3B0aW9ucy5uYW1lICYmIG9iai5uYW1lICE9PSBvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKG9iai5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAocmVwb3J0ZXIpIHJlcG9ydGVyLnByb2JsZW1zKCdlcnJvcnMnLCBvYmopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcG9ydGVyKSB7XG4gICAgICAgICAgaWYgKG9iai53YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXBvcnRlci5wcm9ibGVtcygnd2FybmluZ3MnLCBvYmopO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBvcnRlci5jbGVhblByb2JsZW1zQ2FjaGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVwb3J0ZXIuc3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NVcGRhdGUob2JqLmhhc2gsIG9iai5tb2R1bGVzLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoY3VzdG9tSGFuZGxlcikge1xuICAgICAgICBjdXN0b21IYW5kbGVyKG9iaik7XG4gICAgICB9XG4gIH1cblxuICBpZiAoc3Vic2NyaWJlQWxsSGFuZGxlcikge1xuICAgIHN1YnNjcmliZUFsbEhhbmRsZXIob2JqKTtcbiAgfVxufVxuXG5pZiAobW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1YnNjcmliZUFsbDogZnVuY3Rpb24gc3Vic2NyaWJlQWxsKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZUFsbEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUoaGFuZGxlcikge1xuICAgICAgY3VzdG9tSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICB1c2VDdXN0b21PdmVybGF5OiBmdW5jdGlvbiB1c2VDdXN0b21PdmVybGF5KGN1c3RvbU92ZXJsYXkpIHtcbiAgICAgIGlmIChyZXBvcnRlcikgcmVwb3J0ZXIudXNlQ3VzdG9tT3ZlcmxheShjdXN0b21PdmVybGF5KTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjayktaG90LW1pZGRsZXdhcmUvY2xpZW50LmpzP3BhdGg9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTEzODMlMkZfX3dlYnBhY2tfaG1yXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDEyNSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBvYmpba10ubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuc2lSZWdleCA9IHJlcXVpcmUoJ2Fuc2ktcmVnZXgnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyLnJlcGxhY2UoYW5zaVJlZ2V4LCAnJykgOiBzdHI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N0cmlwLWFuc2kvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiAvW1xcdTAwMWJcXHUwMDliXVtbKCkjOz9dKig/OlswLTldezEsNH0oPzo7WzAtOV17MCw0fSkqKT9bMC05QS1QUlpjZi1ucXJ5PT48XS9nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hbnNpLXJlZ2V4L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWVudiBicm93c2VyKi9cblxudmFyIGNsaWVudE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNsaWVudE92ZXJsYXkuaWQgPSAnd2VicGFjay1ob3QtbWlkZGxld2FyZS1jbGllbnRPdmVybGF5JztcbnZhciBzdHlsZXMgPSB7XG4gIGJhY2tncm91bmQ6ICdyZ2JhKDAsMCwwLDAuODUpJyxcbiAgY29sb3I6ICcjRThFOEU4JyxcbiAgbGluZUhlaWdodDogJzEuMicsXG4gIHdoaXRlU3BhY2U6ICdwcmUnLFxuICBmb250RmFtaWx5OiAnTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2UnLFxuICBmb250U2l6ZTogJzEzcHgnLFxuICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgekluZGV4OiA5OTk5LFxuICBwYWRkaW5nOiAnMTBweCcsXG4gIGxlZnQ6IDAsXG4gIHJpZ2h0OiAwLFxuICB0b3A6IDAsXG4gIGJvdHRvbTogMCxcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgZGlyOiAnbHRyJyxcbiAgdGV4dEFsaWduOiAnbGVmdCdcbn07XG5mb3IgKHZhciBrZXkgaW4gc3R5bGVzKSB7XG4gIGNsaWVudE92ZXJsYXkuc3R5bGVba2V5XSA9IHN0eWxlc1trZXldO1xufVxuXG52YXIgYW5zaUhUTUwgPSByZXF1aXJlKCdhbnNpLWh0bWwnKTtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ3RyYW5zcGFyZW50JywgJ3RyYW5zcGFyZW50J10sXG4gIGJsYWNrOiAnMTgxODE4JyxcbiAgcmVkOiAnRTM2MDQ5JyxcbiAgZ3JlZW46ICdCM0NCNzQnLFxuICB5ZWxsb3c6ICdGRkQwODAnLFxuICBibHVlOiAnN0NBRkMyJyxcbiAgbWFnZW50YTogJzdGQUNDQScsXG4gIGN5YW46ICdDM0MyRUYnLFxuICBsaWdodGdyZXk6ICdFQkU3RTMnLFxuICBkYXJrZ3JleTogJzZENzg5MSdcbn07XG5hbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcblxudmFyIEVudGl0aWVzID0gcmVxdWlyZSgnaHRtbC1lbnRpdGllcycpLkFsbEh0bWxFbnRpdGllcztcbnZhciBlbnRpdGllcyA9IG5ldyBFbnRpdGllcygpO1xuXG5leHBvcnRzLnNob3dQcm9ibGVtcyA9XG5mdW5jdGlvbiBzaG93UHJvYmxlbXModHlwZSwgbGluZXMpIHtcbiAgY2xpZW50T3ZlcmxheS5pbm5lckhUTUwgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihtc2cpIHtcbiAgICBtc2cgPSBhbnNpSFRNTChlbnRpdGllcy5lbmNvZGUobXNnKSk7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjZweCc7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2JsZW1UeXBlKHR5cGUpICsgJyBpbiAnICsgbXNnO1xuICAgIGNsaWVudE92ZXJsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfSk7XG4gIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbGllbnRPdmVybGF5KTtcbiAgfVxufTtcblxuZXhwb3J0cy5jbGVhciA9XG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgaWYgKGRvY3VtZW50LmJvZHkgJiYgY2xpZW50T3ZlcmxheS5wYXJlbnROb2RlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjbGllbnRPdmVybGF5KTtcbiAgfVxufTtcblxudmFyIHByb2JsZW1Db2xvcnMgPSB7XG4gIGVycm9yczogY29sb3JzLnJlZCxcbiAgd2FybmluZ3M6IGNvbG9ycy55ZWxsb3dcbn07XG5cbmZ1bmN0aW9uIHByb2JsZW1UeXBlICh0eXBlKSB7XG4gIHZhciBjb2xvciA9IHByb2JsZW1Db2xvcnNbdHlwZV0gfHwgY29sb3JzLnJlZDtcbiAgcmV0dXJuIChcbiAgICAnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMnICsgY29sb3IgKyAnOyBjb2xvcjojZmZmOyBwYWRkaW5nOjJweCA0cHg7IGJvcmRlci1yYWRpdXM6IDJweFwiPicgK1xuICAgICAgdHlwZS5zbGljZSgwLCAtMSkudG9VcHBlckNhc2UoKSArXG4gICAgJzwvc3Bhbj4nXG4gICk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjayktaG90LW1pZGRsZXdhcmUvY2xpZW50LW92ZXJsYXkuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKykqbS9nLCBmdW5jdGlvbiAobWF0Y2gsIHNlcSkge1xuICAgIHZhciBvdCA9IF9vcGVuVGFnc1tzZXFdXG4gICAgaWYgKG90KSB7XG4gICAgICAvLyBJZiBjdXJyZW50IHNlcXVlbmNlIGhhcyBiZWVuIG9wZW5lZCwgY2xvc2UgaXQuXG4gICAgICBpZiAoISF+YW5zaUNvZGVzLmluZGV4T2Yoc2VxKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV4dHJhLWJvb2xlYW4tY2FzdFxuICAgICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgICAgcmV0dXJuICc8L3NwYW4+J1xuICAgICAgfVxuICAgICAgLy8gT3BlbiB0YWcuXG4gICAgICBhbnNpQ29kZXMucHVzaChzZXEpXG4gICAgICByZXR1cm4gb3RbMF0gPT09ICc8JyA/IG90IDogJzxzcGFuIHN0eWxlPVwiJyArIG90ICsgJztcIj4nXG4gICAgfVxuXG4gICAgdmFyIGN0ID0gX2Nsb3NlVGFnc1tzZXFdXG4gICAgaWYgKGN0KSB7XG4gICAgICAvLyBQb3Agc2VxdWVuY2VcbiAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgcmV0dXJuIGN0XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9KVxuXG4gIC8vIE1ha2Ugc3VyZSB0YWdzIGFyZSBjbG9zZWQuXG4gIHZhciBsID0gYW5zaUNvZGVzLmxlbmd0aFxuICA7KGwgPiAwKSAmJiAocmV0ICs9IEFycmF5KGwgKyAxKS5qb2luKCc8L3NwYW4+JykpXG5cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIEN1c3RvbWl6ZSBjb2xvcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gY29sb3JzIHJlZmVyZW5jZSB0byBfZGVmQ29sb3JzXG4gKi9cbmFuc2lIVE1MLnNldENvbG9ycyA9IGZ1bmN0aW9uIChjb2xvcnMpIHtcbiAgaWYgKHR5cGVvZiBjb2xvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgY29sb3JzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBPYmplY3QuJylcbiAgfVxuXG4gIHZhciBfZmluYWxDb2xvcnMgPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gX2RlZkNvbG9ycykge1xuICAgIHZhciBoZXggPSBjb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSA/IGNvbG9yc1trZXldIDogbnVsbFxuICAgIGlmICghaGV4KSB7XG4gICAgICBfZmluYWxDb2xvcnNba2V5XSA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKCdyZXNldCcgPT09IGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBoZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGhleCA9IFtoZXhdXG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGV4KSB8fCBoZXgubGVuZ3RoID09PSAwIHx8IGhleC5zb21lKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaCAhPT0gJ3N0cmluZydcbiAgICAgIH0pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhbiBBcnJheSBhbmQgZWFjaCBpdGVtIGNvdWxkIG9ubHkgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgICAgfVxuICAgICAgdmFyIGRlZkhleENvbG9yID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBpZiAoIWhleFswXSkge1xuICAgICAgICBoZXhbMF0gPSBkZWZIZXhDb2xvclswXVxuICAgICAgfVxuICAgICAgaWYgKGhleC5sZW5ndGggPT09IDEgfHwgIWhleFsxXSkge1xuICAgICAgICBoZXggPSBbaGV4WzBdXVxuICAgICAgICBoZXgucHVzaChkZWZIZXhDb2xvclsxXSlcbiAgICAgIH1cblxuICAgICAgaGV4ID0gaGV4LnNsaWNlKDAsIDIpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICB9XG4gICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBoZXhcbiAgfVxuICBfc2V0VGFncyhfZmluYWxDb2xvcnMpXG59XG5cbi8qKlxuICogUmVzZXQgY29sb3JzLlxuICovXG5hbnNpSFRNTC5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgX3NldFRhZ3MoX2RlZkNvbG9ycylcbn1cblxuLyoqXG4gKiBFeHBvc2UgdGFncywgaW5jbHVkaW5nIG9wZW4gYW5kIGNsb3NlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuYW5zaUhUTUwudGFncyA9IHt9XG5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdvcGVuJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX29wZW5UYWdzIH1cbiAgfSlcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdjbG9zZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9jbG9zZVRhZ3MgfVxuICB9KVxufSBlbHNlIHtcbiAgYW5zaUhUTUwudGFncy5vcGVuID0gX29wZW5UYWdzXG4gIGFuc2lIVE1MLnRhZ3MuY2xvc2UgPSBfY2xvc2VUYWdzXG59XG5cbmZ1bmN0aW9uIF9zZXRUYWdzIChjb2xvcnMpIHtcbiAgLy8gcmVzZXQgYWxsXG4gIF9vcGVuVGFnc1snMCddID0gJ2ZvbnQtd2VpZ2h0Om5vcm1hbDtvcGFjaXR5OjE7Y29sb3I6IycgKyBjb2xvcnMucmVzZXRbMF0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMV1cbiAgLy8gaW52ZXJzZVxuICBfb3BlblRhZ3NbJzcnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5yZXNldFsxXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFswXVxuICAvLyBkYXJrIGdyZXlcbiAgX29wZW5UYWdzWyc5MCddID0gJ2NvbG9yOiMnICsgY29sb3JzLmRhcmtncmV5XG5cbiAgZm9yICh2YXIgY29kZSBpbiBfc3R5bGVzKSB7XG4gICAgdmFyIGNvbG9yID0gX3N0eWxlc1tjb2RlXVxuICAgIHZhciBvcmlDb2xvciA9IGNvbG9yc1tjb2xvcl0gfHwgJzAwMCdcbiAgICBfb3BlblRhZ3NbY29kZV0gPSAnY29sb3I6IycgKyBvcmlDb2xvclxuICAgIGNvZGUgPSBwYXJzZUludChjb2RlKVxuICAgIF9vcGVuVGFnc1soY29kZSArIDEwKS50b1N0cmluZygpXSA9ICdiYWNrZ3JvdW5kOiMnICsgb3JpQ29sb3JcbiAgfVxufVxuXG5hbnNpSFRNTC5yZXNldCgpXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYW5zaS1odG1sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgWG1sRW50aXRpZXM6IHJlcXVpcmUoJy4vbGliL3htbC1lbnRpdGllcy5qcycpLFxuICBIdG1sNEVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNC1lbnRpdGllcy5qcycpLFxuICBIdG1sNUVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNS1lbnRpdGllcy5qcycpLFxuICBBbGxIdG1sRW50aXRpZXM6IHJlcXVpcmUoJy4vbGliL2h0bWw1LWVudGl0aWVzLmpzJylcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaHRtbC1lbnRpdGllcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEFMUEhBX0lOREVYID0ge1xuICAgICcmbHQnOiAnPCcsXG4gICAgJyZndCc6ICc+JyxcbiAgICAnJnF1b3QnOiAnXCInLFxuICAgICcmYXBvcyc6ICdcXCcnLFxuICAgICcmYW1wJzogJyYnLFxuICAgICcmbHQ7JzogJzwnLFxuICAgICcmZ3Q7JzogJz4nLFxuICAgICcmcXVvdDsnOiAnXCInLFxuICAgICcmYXBvczsnOiAnXFwnJyxcbiAgICAnJmFtcDsnOiAnJidcbn07XG5cbnZhciBDSEFSX0lOREVYID0ge1xuICAgIDYwOiAnbHQnLFxuICAgIDYyOiAnZ3QnLFxuICAgIDM0OiAncXVvdCcsXG4gICAgMzk6ICdhcG9zJyxcbiAgICAzODogJ2FtcCdcbn07XG5cbnZhciBDSEFSX1NfSU5ERVggPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmYXBvczsnLFxuICAgICcmJzogJyZhbXA7J1xufTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gWG1sRW50aXRpZXMoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPHw+fFwifCd8Ji9nLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBDSEFSX1NfSU5ERVhbc107XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBYbWxFbnRpdGllcy5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG4gfTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5YbWxFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjP1swLTlhLXpBLVpdKzs/L2csIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgaWYgKHMuY2hhckF0KDEpID09PSAnIycpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gcy5jaGFyQXQoMikudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigzKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigyKSk7XG5cbiAgICAgICAgICAgIGlmIChpc05hTihjb2RlKSB8fCBjb2RlIDwgLTMyNzY4IHx8IGNvZGUgPiA2NTUzNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBTFBIQV9JTkRFWFtzXSB8fCBzO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgIGlmIChzdHJMZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHZhciBhbHBoYSA9IENIQVJfSU5ERVhbY107XG4gICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjIDwgMzIgfHwgYyA+IDEyNikge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmdodCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmdodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5naHQpIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPD0gMjU1KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuIFhtbEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZU5vbkFTQ0lJKHN0cik7XG4gfTtcblxubW9kdWxlLmV4cG9ydHMgPSBYbWxFbnRpdGllcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9odG1sLWVudGl0aWVzL2xpYi94bWwtZW50aXRpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIVE1MX0FMUEhBID0gWydhcG9zJywgJ25ic3AnLCAnaWV4Y2wnLCAnY2VudCcsICdwb3VuZCcsICdjdXJyZW4nLCAneWVuJywgJ2JydmJhcicsICdzZWN0JywgJ3VtbCcsICdjb3B5JywgJ29yZGYnLCAnbGFxdW8nLCAnbm90JywgJ3NoeScsICdyZWcnLCAnbWFjcicsICdkZWcnLCAncGx1c21uJywgJ3N1cDInLCAnc3VwMycsICdhY3V0ZScsICdtaWNybycsICdwYXJhJywgJ21pZGRvdCcsICdjZWRpbCcsICdzdXAxJywgJ29yZG0nLCAncmFxdW8nLCAnZnJhYzE0JywgJ2ZyYWMxMicsICdmcmFjMzQnLCAnaXF1ZXN0JywgJ0FncmF2ZScsICdBYWN1dGUnLCAnQWNpcmMnLCAnQXRpbGRlJywgJ0F1bWwnLCAnQXJpbmcnLCAnQWVsaWcnLCAnQ2NlZGlsJywgJ0VncmF2ZScsICdFYWN1dGUnLCAnRWNpcmMnLCAnRXVtbCcsICdJZ3JhdmUnLCAnSWFjdXRlJywgJ0ljaXJjJywgJ0l1bWwnLCAnRVRIJywgJ050aWxkZScsICdPZ3JhdmUnLCAnT2FjdXRlJywgJ09jaXJjJywgJ090aWxkZScsICdPdW1sJywgJ3RpbWVzJywgJ09zbGFzaCcsICdVZ3JhdmUnLCAnVWFjdXRlJywgJ1VjaXJjJywgJ1V1bWwnLCAnWWFjdXRlJywgJ1RIT1JOJywgJ3N6bGlnJywgJ2FncmF2ZScsICdhYWN1dGUnLCAnYWNpcmMnLCAnYXRpbGRlJywgJ2F1bWwnLCAnYXJpbmcnLCAnYWVsaWcnLCAnY2NlZGlsJywgJ2VncmF2ZScsICdlYWN1dGUnLCAnZWNpcmMnLCAnZXVtbCcsICdpZ3JhdmUnLCAnaWFjdXRlJywgJ2ljaXJjJywgJ2l1bWwnLCAnZXRoJywgJ250aWxkZScsICdvZ3JhdmUnLCAnb2FjdXRlJywgJ29jaXJjJywgJ290aWxkZScsICdvdW1sJywgJ2RpdmlkZScsICdPc2xhc2gnLCAndWdyYXZlJywgJ3VhY3V0ZScsICd1Y2lyYycsICd1dW1sJywgJ3lhY3V0ZScsICd0aG9ybicsICd5dW1sJywgJ3F1b3QnLCAnYW1wJywgJ2x0JywgJ2d0JywgJ29lbGlnJywgJ29lbGlnJywgJ3NjYXJvbicsICdzY2Fyb24nLCAneXVtbCcsICdjaXJjJywgJ3RpbGRlJywgJ2Vuc3AnLCAnZW1zcCcsICd0aGluc3AnLCAnenduaicsICd6d2onLCAnbHJtJywgJ3JsbScsICduZGFzaCcsICdtZGFzaCcsICdsc3F1bycsICdyc3F1bycsICdzYnF1bycsICdsZHF1bycsICdyZHF1bycsICdiZHF1bycsICdkYWdnZXInLCAnZGFnZ2VyJywgJ3Blcm1pbCcsICdsc2FxdW8nLCAncnNhcXVvJywgJ2V1cm8nLCAnZm5vZicsICdhbHBoYScsICdiZXRhJywgJ2dhbW1hJywgJ2RlbHRhJywgJ2Vwc2lsb24nLCAnemV0YScsICdldGEnLCAndGhldGEnLCAnaW90YScsICdrYXBwYScsICdsYW1iZGEnLCAnbXUnLCAnbnUnLCAneGknLCAnb21pY3JvbicsICdwaScsICdyaG8nLCAnc2lnbWEnLCAndGF1JywgJ3Vwc2lsb24nLCAncGhpJywgJ2NoaScsICdwc2knLCAnb21lZ2EnLCAnYWxwaGEnLCAnYmV0YScsICdnYW1tYScsICdkZWx0YScsICdlcHNpbG9uJywgJ3pldGEnLCAnZXRhJywgJ3RoZXRhJywgJ2lvdGEnLCAna2FwcGEnLCAnbGFtYmRhJywgJ211JywgJ251JywgJ3hpJywgJ29taWNyb24nLCAncGknLCAncmhvJywgJ3NpZ21hZicsICdzaWdtYScsICd0YXUnLCAndXBzaWxvbicsICdwaGknLCAnY2hpJywgJ3BzaScsICdvbWVnYScsICd0aGV0YXN5bScsICd1cHNpaCcsICdwaXYnLCAnYnVsbCcsICdoZWxsaXAnLCAncHJpbWUnLCAncHJpbWUnLCAnb2xpbmUnLCAnZnJhc2wnLCAnd2VpZXJwJywgJ2ltYWdlJywgJ3JlYWwnLCAndHJhZGUnLCAnYWxlZnN5bScsICdsYXJyJywgJ3VhcnInLCAncmFycicsICdkYXJyJywgJ2hhcnInLCAnY3JhcnInLCAnbGFycicsICd1YXJyJywgJ3JhcnInLCAnZGFycicsICdoYXJyJywgJ2ZvcmFsbCcsICdwYXJ0JywgJ2V4aXN0JywgJ2VtcHR5JywgJ25hYmxhJywgJ2lzaW4nLCAnbm90aW4nLCAnbmknLCAncHJvZCcsICdzdW0nLCAnbWludXMnLCAnbG93YXN0JywgJ3JhZGljJywgJ3Byb3AnLCAnaW5maW4nLCAnYW5nJywgJ2FuZCcsICdvcicsICdjYXAnLCAnY3VwJywgJ2ludCcsICd0aGVyZTQnLCAnc2ltJywgJ2NvbmcnLCAnYXN5bXAnLCAnbmUnLCAnZXF1aXYnLCAnbGUnLCAnZ2UnLCAnc3ViJywgJ3N1cCcsICduc3ViJywgJ3N1YmUnLCAnc3VwZScsICdvcGx1cycsICdvdGltZXMnLCAncGVycCcsICdzZG90JywgJ2xjZWlsJywgJ3JjZWlsJywgJ2xmbG9vcicsICdyZmxvb3InLCAnbGFuZycsICdyYW5nJywgJ2xveicsICdzcGFkZXMnLCAnY2x1YnMnLCAnaGVhcnRzJywgJ2RpYW1zJ107XG52YXIgSFRNTF9DT0RFUyA9IFszOSwgMTYwLCAxNjEsIDE2MiwgMTYzLCAxNjQsIDE2NSwgMTY2LCAxNjcsIDE2OCwgMTY5LCAxNzAsIDE3MSwgMTcyLCAxNzMsIDE3NCwgMTc1LCAxNzYsIDE3NywgMTc4LCAxNzksIDE4MCwgMTgxLCAxODIsIDE4MywgMTg0LCAxODUsIDE4NiwgMTg3LCAxODgsIDE4OSwgMTkwLCAxOTEsIDE5MiwgMTkzLCAxOTQsIDE5NSwgMTk2LCAxOTcsIDE5OCwgMTk5LCAyMDAsIDIwMSwgMjAyLCAyMDMsIDIwNCwgMjA1LCAyMDYsIDIwNywgMjA4LCAyMDksIDIxMCwgMjExLCAyMTIsIDIxMywgMjE0LCAyMTUsIDIxNiwgMjE3LCAyMTgsIDIxOSwgMjIwLCAyMjEsIDIyMiwgMjIzLCAyMjQsIDIyNSwgMjI2LCAyMjcsIDIyOCwgMjI5LCAyMzAsIDIzMSwgMjMyLCAyMzMsIDIzNCwgMjM1LCAyMzYsIDIzNywgMjM4LCAyMzksIDI0MCwgMjQxLCAyNDIsIDI0MywgMjQ0LCAyNDUsIDI0NiwgMjQ3LCAyNDgsIDI0OSwgMjUwLCAyNTEsIDI1MiwgMjUzLCAyNTQsIDI1NSwgMzQsIDM4LCA2MCwgNjIsIDMzOCwgMzM5LCAzNTIsIDM1MywgMzc2LCA3MTAsIDczMiwgODE5NCwgODE5NSwgODIwMSwgODIwNCwgODIwNSwgODIwNiwgODIwNywgODIxMSwgODIxMiwgODIxNiwgODIxNywgODIxOCwgODIyMCwgODIyMSwgODIyMiwgODIyNCwgODIyNSwgODI0MCwgODI0OSwgODI1MCwgODM2NCwgNDAyLCA5MTMsIDkxNCwgOTE1LCA5MTYsIDkxNywgOTE4LCA5MTksIDkyMCwgOTIxLCA5MjIsIDkyMywgOTI0LCA5MjUsIDkyNiwgOTI3LCA5MjgsIDkyOSwgOTMxLCA5MzIsIDkzMywgOTM0LCA5MzUsIDkzNiwgOTM3LCA5NDUsIDk0NiwgOTQ3LCA5NDgsIDk0OSwgOTUwLCA5NTEsIDk1MiwgOTUzLCA5NTQsIDk1NSwgOTU2LCA5NTcsIDk1OCwgOTU5LCA5NjAsIDk2MSwgOTYyLCA5NjMsIDk2NCwgOTY1LCA5NjYsIDk2NywgOTY4LCA5NjksIDk3NywgOTc4LCA5ODIsIDgyMjYsIDgyMzAsIDgyNDIsIDgyNDMsIDgyNTQsIDgyNjAsIDg0NzIsIDg0NjUsIDg0NzYsIDg0ODIsIDg1MDEsIDg1OTIsIDg1OTMsIDg1OTQsIDg1OTUsIDg1OTYsIDg2MjksIDg2NTYsIDg2NTcsIDg2NTgsIDg2NTksIDg2NjAsIDg3MDQsIDg3MDYsIDg3MDcsIDg3MDksIDg3MTEsIDg3MTIsIDg3MTMsIDg3MTUsIDg3MTksIDg3MjEsIDg3MjIsIDg3MjcsIDg3MzAsIDg3MzMsIDg3MzQsIDg3MzYsIDg3NDMsIDg3NDQsIDg3NDUsIDg3NDYsIDg3NDcsIDg3NTYsIDg3NjQsIDg3NzMsIDg3NzYsIDg4MDAsIDg4MDEsIDg4MDQsIDg4MDUsIDg4MzQsIDg4MzUsIDg4MzYsIDg4MzgsIDg4MzksIDg4NTMsIDg4NTUsIDg4NjksIDg5MDEsIDg5NjgsIDg5NjksIDg5NzAsIDg5NzEsIDkwMDEsIDkwMDIsIDk2NzQsIDk4MjQsIDk4MjcsIDk4MjksIDk4MzBdO1xuXG52YXIgYWxwaGFJbmRleCA9IHt9O1xudmFyIG51bUluZGV4ID0ge307XG5cbnZhciBpID0gMDtcbnZhciBsZW5ndGggPSBIVE1MX0FMUEhBLmxlbmd0aDtcbndoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgdmFyIGEgPSBIVE1MX0FMUEhBW2ldO1xuICAgIHZhciBjID0gSFRNTF9DT0RFU1tpXTtcbiAgICBhbHBoYUluZGV4W2FdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICBudW1JbmRleFtjXSA9IGE7XG4gICAgaSsrO1xufVxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIdG1sNEVudGl0aWVzKCkge31cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJigjP1tcXHdcXGRdKyk7Py9nLCBmdW5jdGlvbihzLCBlbnRpdHkpIHtcbiAgICAgICAgdmFyIGNocjtcbiAgICAgICAgaWYgKGVudGl0eS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IGVudGl0eS5jaGFyQXQoMSkudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICBwYXJzZUludChlbnRpdHkuc3Vic3RyKDIpLCAxNikgOlxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMSkpO1xuXG4gICAgICAgICAgICBpZiAoIShpc05hTihjb2RlKSB8fCBjb2RlIDwgLTMyNzY4IHx8IGNvZGUgPiA2NTUzNSkpIHtcbiAgICAgICAgICAgICAgICBjaHIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hyID0gYWxwaGFJbmRleFtlbnRpdHldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaHIgfHwgcztcbiAgICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5kZWNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5kZWNvZGUoc3RyKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGFscGhhID0gbnVtSW5kZXhbc3RyLmNoYXJDb2RlQXQoaSldO1xuICAgICAgICByZXN1bHQgKz0gYWxwaGEgPyBcIiZcIiArIGFscGhhICsgXCI7XCIgOiBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgIGlmIChzdHJMZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB2YXIgYWxwaGEgPSBudW1JbmRleFtjY107XG4gICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjYyA8IDMyIHx8IGNjID4gMTI2KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gXCImI1wiICsgY2MgKyBcIjtcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5lbmNvZGVOb25VVEYoc3RyKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICBpZiAoc3RyTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbDRFbnRpdGllcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9odG1sLWVudGl0aWVzL2xpYi9odG1sNC1lbnRpdGllcy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEVOVElUSUVTID0gW1snQWFjdXRlJywgWzE5M11dLCBbJ2FhY3V0ZScsIFsyMjVdXSwgWydBYnJldmUnLCBbMjU4XV0sIFsnYWJyZXZlJywgWzI1OV1dLCBbJ2FjJywgWzg3NjZdXSwgWydhY2QnLCBbODc2N11dLCBbJ2FjRScsIFs4NzY2LCA4MTldXSwgWydBY2lyYycsIFsxOTRdXSwgWydhY2lyYycsIFsyMjZdXSwgWydhY3V0ZScsIFsxODBdXSwgWydBY3knLCBbMTA0MF1dLCBbJ2FjeScsIFsxMDcyXV0sIFsnQUVsaWcnLCBbMTk4XV0sIFsnYWVsaWcnLCBbMjMwXV0sIFsnYWYnLCBbODI4OV1dLCBbJ0FmcicsIFsxMjAwNjhdXSwgWydhZnInLCBbMTIwMDk0XV0sIFsnQWdyYXZlJywgWzE5Ml1dLCBbJ2FncmF2ZScsIFsyMjRdXSwgWydhbGVmc3ltJywgWzg1MDFdXSwgWydhbGVwaCcsIFs4NTAxXV0sIFsnQWxwaGEnLCBbOTEzXV0sIFsnYWxwaGEnLCBbOTQ1XV0sIFsnQW1hY3InLCBbMjU2XV0sIFsnYW1hY3InLCBbMjU3XV0sIFsnYW1hbGcnLCBbMTA4MTVdXSwgWydhbXAnLCBbMzhdXSwgWydBTVAnLCBbMzhdXSwgWydhbmRhbmQnLCBbMTA4MzddXSwgWydBbmQnLCBbMTA4MzVdXSwgWydhbmQnLCBbODc0M11dLCBbJ2FuZGQnLCBbMTA4NDRdXSwgWydhbmRzbG9wZScsIFsxMDg0MF1dLCBbJ2FuZHYnLCBbMTA4NDJdXSwgWydhbmcnLCBbODczNl1dLCBbJ2FuZ2UnLCBbMTA2NjBdXSwgWydhbmdsZScsIFs4NzM2XV0sIFsnYW5nbXNkYWEnLCBbMTA2NjRdXSwgWydhbmdtc2RhYicsIFsxMDY2NV1dLCBbJ2FuZ21zZGFjJywgWzEwNjY2XV0sIFsnYW5nbXNkYWQnLCBbMTA2NjddXSwgWydhbmdtc2RhZScsIFsxMDY2OF1dLCBbJ2FuZ21zZGFmJywgWzEwNjY5XV0sIFsnYW5nbXNkYWcnLCBbMTA2NzBdXSwgWydhbmdtc2RhaCcsIFsxMDY3MV1dLCBbJ2FuZ21zZCcsIFs4NzM3XV0sIFsnYW5ncnQnLCBbODczNV1dLCBbJ2FuZ3J0dmInLCBbODg5NF1dLCBbJ2FuZ3J0dmJkJywgWzEwNjUzXV0sIFsnYW5nc3BoJywgWzg3MzhdXSwgWydhbmdzdCcsIFsxOTddXSwgWydhbmd6YXJyJywgWzkwODRdXSwgWydBb2dvbicsIFsyNjBdXSwgWydhb2dvbicsIFsyNjFdXSwgWydBb3BmJywgWzEyMDEyMF1dLCBbJ2FvcGYnLCBbMTIwMTQ2XV0sIFsnYXBhY2lyJywgWzEwODYzXV0sIFsnYXAnLCBbODc3Nl1dLCBbJ2FwRScsIFsxMDg2NF1dLCBbJ2FwZScsIFs4Nzc4XV0sIFsnYXBpZCcsIFs4Nzc5XV0sIFsnYXBvcycsIFszOV1dLCBbJ0FwcGx5RnVuY3Rpb24nLCBbODI4OV1dLCBbJ2FwcHJveCcsIFs4Nzc2XV0sIFsnYXBwcm94ZXEnLCBbODc3OF1dLCBbJ0FyaW5nJywgWzE5N11dLCBbJ2FyaW5nJywgWzIyOV1dLCBbJ0FzY3InLCBbMTE5OTY0XV0sIFsnYXNjcicsIFsxMTk5OTBdXSwgWydBc3NpZ24nLCBbODc4OF1dLCBbJ2FzdCcsIFs0Ml1dLCBbJ2FzeW1wJywgWzg3NzZdXSwgWydhc3ltcGVxJywgWzg3ODFdXSwgWydBdGlsZGUnLCBbMTk1XV0sIFsnYXRpbGRlJywgWzIyN11dLCBbJ0F1bWwnLCBbMTk2XV0sIFsnYXVtbCcsIFsyMjhdXSwgWydhd2NvbmludCcsIFs4NzU1XV0sIFsnYXdpbnQnLCBbMTA3NjldXSwgWydiYWNrY29uZycsIFs4NzgwXV0sIFsnYmFja2Vwc2lsb24nLCBbMTAxNF1dLCBbJ2JhY2twcmltZScsIFs4MjQ1XV0sIFsnYmFja3NpbScsIFs4NzY1XV0sIFsnYmFja3NpbWVxJywgWzg5MDldXSwgWydCYWNrc2xhc2gnLCBbODcyNl1dLCBbJ0JhcnYnLCBbMTA5ODNdXSwgWydiYXJ2ZWUnLCBbODg5M11dLCBbJ2JhcndlZCcsIFs4OTY1XV0sIFsnQmFyd2VkJywgWzg5NjZdXSwgWydiYXJ3ZWRnZScsIFs4OTY1XV0sIFsnYmJyaycsIFs5MTQxXV0sIFsnYmJya3RicmsnLCBbOTE0Ml1dLCBbJ2Jjb25nJywgWzg3ODBdXSwgWydCY3knLCBbMTA0MV1dLCBbJ2JjeScsIFsxMDczXV0sIFsnYmRxdW8nLCBbODIyMl1dLCBbJ2JlY2F1cycsIFs4NzU3XV0sIFsnYmVjYXVzZScsIFs4NzU3XV0sIFsnQmVjYXVzZScsIFs4NzU3XV0sIFsnYmVtcHR5dicsIFsxMDY3Ml1dLCBbJ2JlcHNpJywgWzEwMTRdXSwgWydiZXJub3UnLCBbODQ5Ml1dLCBbJ0Jlcm5vdWxsaXMnLCBbODQ5Ml1dLCBbJ0JldGEnLCBbOTE0XV0sIFsnYmV0YScsIFs5NDZdXSwgWydiZXRoJywgWzg1MDJdXSwgWydiZXR3ZWVuJywgWzg4MTJdXSwgWydCZnInLCBbMTIwMDY5XV0sIFsnYmZyJywgWzEyMDA5NV1dLCBbJ2JpZ2NhcCcsIFs4ODk4XV0sIFsnYmlnY2lyYycsIFs5NzExXV0sIFsnYmlnY3VwJywgWzg4OTldXSwgWydiaWdvZG90JywgWzEwNzUyXV0sIFsnYmlnb3BsdXMnLCBbMTA3NTNdXSwgWydiaWdvdGltZXMnLCBbMTA3NTRdXSwgWydiaWdzcWN1cCcsIFsxMDc1OF1dLCBbJ2JpZ3N0YXInLCBbOTczM11dLCBbJ2JpZ3RyaWFuZ2xlZG93bicsIFs5NjYxXV0sIFsnYmlndHJpYW5nbGV1cCcsIFs5NjUxXV0sIFsnYmlndXBsdXMnLCBbMTA3NTZdXSwgWydiaWd2ZWUnLCBbODg5N11dLCBbJ2JpZ3dlZGdlJywgWzg4OTZdXSwgWydia2Fyb3cnLCBbMTA1MDldXSwgWydibGFja2xvemVuZ2UnLCBbMTA3MzFdXSwgWydibGFja3NxdWFyZScsIFs5NjQyXV0sIFsnYmxhY2t0cmlhbmdsZScsIFs5NjUyXV0sIFsnYmxhY2t0cmlhbmdsZWRvd24nLCBbOTY2Ml1dLCBbJ2JsYWNrdHJpYW5nbGVsZWZ0JywgWzk2NjZdXSwgWydibGFja3RyaWFuZ2xlcmlnaHQnLCBbOTY1Nl1dLCBbJ2JsYW5rJywgWzkyNTFdXSwgWydibGsxMicsIFs5NjE4XV0sIFsnYmxrMTQnLCBbOTYxN11dLCBbJ2JsazM0JywgWzk2MTldXSwgWydibG9jaycsIFs5NjA4XV0sIFsnYm5lJywgWzYxLCA4NDIxXV0sIFsnYm5lcXVpdicsIFs4ODAxLCA4NDIxXV0sIFsnYk5vdCcsIFsxMDk4OV1dLCBbJ2Jub3QnLCBbODk3Nl1dLCBbJ0JvcGYnLCBbMTIwMTIxXV0sIFsnYm9wZicsIFsxMjAxNDddXSwgWydib3QnLCBbODg2OV1dLCBbJ2JvdHRvbScsIFs4ODY5XV0sIFsnYm93dGllJywgWzg5MDRdXSwgWydib3hib3gnLCBbMTA2OTddXSwgWydib3hkbCcsIFs5NDg4XV0sIFsnYm94ZEwnLCBbOTU1N11dLCBbJ2JveERsJywgWzk1NThdXSwgWydib3hETCcsIFs5NTU5XV0sIFsnYm94ZHInLCBbOTQ4NF1dLCBbJ2JveGRSJywgWzk1NTRdXSwgWydib3hEcicsIFs5NTU1XV0sIFsnYm94RFInLCBbOTU1Nl1dLCBbJ2JveGgnLCBbOTQ3Ml1dLCBbJ2JveEgnLCBbOTU1Ml1dLCBbJ2JveGhkJywgWzk1MTZdXSwgWydib3hIZCcsIFs5NTcyXV0sIFsnYm94aEQnLCBbOTU3M11dLCBbJ2JveEhEJywgWzk1NzRdXSwgWydib3hodScsIFs5NTI0XV0sIFsnYm94SHUnLCBbOTU3NV1dLCBbJ2JveGhVJywgWzk1NzZdXSwgWydib3hIVScsIFs5NTc3XV0sIFsnYm94bWludXMnLCBbODg2M11dLCBbJ2JveHBsdXMnLCBbODg2Ml1dLCBbJ2JveHRpbWVzJywgWzg4NjRdXSwgWydib3h1bCcsIFs5NDk2XV0sIFsnYm94dUwnLCBbOTU2M11dLCBbJ2JveFVsJywgWzk1NjRdXSwgWydib3hVTCcsIFs5NTY1XV0sIFsnYm94dXInLCBbOTQ5Ml1dLCBbJ2JveHVSJywgWzk1NjBdXSwgWydib3hVcicsIFs5NTYxXV0sIFsnYm94VVInLCBbOTU2Ml1dLCBbJ2JveHYnLCBbOTQ3NF1dLCBbJ2JveFYnLCBbOTU1M11dLCBbJ2JveHZoJywgWzk1MzJdXSwgWydib3h2SCcsIFs5NTc4XV0sIFsnYm94VmgnLCBbOTU3OV1dLCBbJ2JveFZIJywgWzk1ODBdXSwgWydib3h2bCcsIFs5NTA4XV0sIFsnYm94dkwnLCBbOTU2OV1dLCBbJ2JveFZsJywgWzk1NzBdXSwgWydib3hWTCcsIFs5NTcxXV0sIFsnYm94dnInLCBbOTUwMF1dLCBbJ2JveHZSJywgWzk1NjZdXSwgWydib3hWcicsIFs5NTY3XV0sIFsnYm94VlInLCBbOTU2OF1dLCBbJ2JwcmltZScsIFs4MjQ1XV0sIFsnYnJldmUnLCBbNzI4XV0sIFsnQnJldmUnLCBbNzI4XV0sIFsnYnJ2YmFyJywgWzE2Nl1dLCBbJ2JzY3InLCBbMTE5OTkxXV0sIFsnQnNjcicsIFs4NDkyXV0sIFsnYnNlbWknLCBbODI3MV1dLCBbJ2JzaW0nLCBbODc2NV1dLCBbJ2JzaW1lJywgWzg5MDldXSwgWydic29sYicsIFsxMDY5M11dLCBbJ2Jzb2wnLCBbOTJdXSwgWydic29saHN1YicsIFsxMDE4NF1dLCBbJ2J1bGwnLCBbODIyNl1dLCBbJ2J1bGxldCcsIFs4MjI2XV0sIFsnYnVtcCcsIFs4NzgyXV0sIFsnYnVtcEUnLCBbMTA5MjZdXSwgWydidW1wZScsIFs4NzgzXV0sIFsnQnVtcGVxJywgWzg3ODJdXSwgWydidW1wZXEnLCBbODc4M11dLCBbJ0NhY3V0ZScsIFsyNjJdXSwgWydjYWN1dGUnLCBbMjYzXV0sIFsnY2FwYW5kJywgWzEwODIwXV0sIFsnY2FwYnJjdXAnLCBbMTA4MjVdXSwgWydjYXBjYXAnLCBbMTA4MjddXSwgWydjYXAnLCBbODc0NV1dLCBbJ0NhcCcsIFs4OTE0XV0sIFsnY2FwY3VwJywgWzEwODIzXV0sIFsnY2FwZG90JywgWzEwODE2XV0sIFsnQ2FwaXRhbERpZmZlcmVudGlhbEQnLCBbODUxN11dLCBbJ2NhcHMnLCBbODc0NSwgNjUwMjRdXSwgWydjYXJldCcsIFs4MjU3XV0sIFsnY2Fyb24nLCBbNzExXV0sIFsnQ2F5bGV5cycsIFs4NDkzXV0sIFsnY2NhcHMnLCBbMTA4MjldXSwgWydDY2Fyb24nLCBbMjY4XV0sIFsnY2Nhcm9uJywgWzI2OV1dLCBbJ0NjZWRpbCcsIFsxOTldXSwgWydjY2VkaWwnLCBbMjMxXV0sIFsnQ2NpcmMnLCBbMjY0XV0sIFsnY2NpcmMnLCBbMjY1XV0sIFsnQ2NvbmludCcsIFs4NzUyXV0sIFsnY2N1cHMnLCBbMTA4MjhdXSwgWydjY3Vwc3NtJywgWzEwODMyXV0sIFsnQ2RvdCcsIFsyNjZdXSwgWydjZG90JywgWzI2N11dLCBbJ2NlZGlsJywgWzE4NF1dLCBbJ0NlZGlsbGEnLCBbMTg0XV0sIFsnY2VtcHR5dicsIFsxMDY3NF1dLCBbJ2NlbnQnLCBbMTYyXV0sIFsnY2VudGVyZG90JywgWzE4M11dLCBbJ0NlbnRlckRvdCcsIFsxODNdXSwgWydjZnInLCBbMTIwMDk2XV0sIFsnQ2ZyJywgWzg0OTNdXSwgWydDSGN5JywgWzEwNjNdXSwgWydjaGN5JywgWzEwOTVdXSwgWydjaGVjaycsIFsxMDAwM11dLCBbJ2NoZWNrbWFyaycsIFsxMDAwM11dLCBbJ0NoaScsIFs5MzVdXSwgWydjaGknLCBbOTY3XV0sIFsnY2lyYycsIFs3MTBdXSwgWydjaXJjZXEnLCBbODc5MV1dLCBbJ2NpcmNsZWFycm93bGVmdCcsIFs4NjM0XV0sIFsnY2lyY2xlYXJyb3dyaWdodCcsIFs4NjM1XV0sIFsnY2lyY2xlZGFzdCcsIFs4ODU5XV0sIFsnY2lyY2xlZGNpcmMnLCBbODg1OF1dLCBbJ2NpcmNsZWRkYXNoJywgWzg4NjFdXSwgWydDaXJjbGVEb3QnLCBbODg1N11dLCBbJ2NpcmNsZWRSJywgWzE3NF1dLCBbJ2NpcmNsZWRTJywgWzk0MTZdXSwgWydDaXJjbGVNaW51cycsIFs4ODU0XV0sIFsnQ2lyY2xlUGx1cycsIFs4ODUzXV0sIFsnQ2lyY2xlVGltZXMnLCBbODg1NV1dLCBbJ2NpcicsIFs5Njc1XV0sIFsnY2lyRScsIFsxMDY5MV1dLCBbJ2NpcmUnLCBbODc5MV1dLCBbJ2NpcmZuaW50JywgWzEwNzY4XV0sIFsnY2lybWlkJywgWzEwOTkxXV0sIFsnY2lyc2NpcicsIFsxMDY5MF1dLCBbJ0Nsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzU0XV0sIFsnQ2xvc2VDdXJseURvdWJsZVF1b3RlJywgWzgyMjFdXSwgWydDbG9zZUN1cmx5UXVvdGUnLCBbODIxN11dLCBbJ2NsdWJzJywgWzk4MjddXSwgWydjbHVic3VpdCcsIFs5ODI3XV0sIFsnY29sb24nLCBbNThdXSwgWydDb2xvbicsIFs4NzU5XV0sIFsnQ29sb25lJywgWzEwODY4XV0sIFsnY29sb25lJywgWzg3ODhdXSwgWydjb2xvbmVxJywgWzg3ODhdXSwgWydjb21tYScsIFs0NF1dLCBbJ2NvbW1hdCcsIFs2NF1dLCBbJ2NvbXAnLCBbODcwNV1dLCBbJ2NvbXBmbicsIFs4NzI4XV0sIFsnY29tcGxlbWVudCcsIFs4NzA1XV0sIFsnY29tcGxleGVzJywgWzg0NTBdXSwgWydjb25nJywgWzg3NzNdXSwgWydjb25nZG90JywgWzEwODYxXV0sIFsnQ29uZ3J1ZW50JywgWzg4MDFdXSwgWydjb25pbnQnLCBbODc1MF1dLCBbJ0NvbmludCcsIFs4NzUxXV0sIFsnQ29udG91ckludGVncmFsJywgWzg3NTBdXSwgWydjb3BmJywgWzEyMDE0OF1dLCBbJ0NvcGYnLCBbODQ1MF1dLCBbJ2NvcHJvZCcsIFs4NzIwXV0sIFsnQ29wcm9kdWN0JywgWzg3MjBdXSwgWydjb3B5JywgWzE2OV1dLCBbJ0NPUFknLCBbMTY5XV0sIFsnY29weXNyJywgWzg0NzFdXSwgWydDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsJywgWzg3NTVdXSwgWydjcmFycicsIFs4NjI5XV0sIFsnY3Jvc3MnLCBbMTAwMDddXSwgWydDcm9zcycsIFsxMDc5OV1dLCBbJ0NzY3InLCBbMTE5OTY2XV0sIFsnY3NjcicsIFsxMTk5OTJdXSwgWydjc3ViJywgWzEwOTU5XV0sIFsnY3N1YmUnLCBbMTA5NjFdXSwgWydjc3VwJywgWzEwOTYwXV0sIFsnY3N1cGUnLCBbMTA5NjJdXSwgWydjdGRvdCcsIFs4OTQzXV0sIFsnY3VkYXJybCcsIFsxMDU1Ml1dLCBbJ2N1ZGFycnInLCBbMTA1NDldXSwgWydjdWVwcicsIFs4OTI2XV0sIFsnY3Vlc2MnLCBbODkyN11dLCBbJ2N1bGFycicsIFs4NjMwXV0sIFsnY3VsYXJycCcsIFsxMDU1N11dLCBbJ2N1cGJyY2FwJywgWzEwODI0XV0sIFsnY3VwY2FwJywgWzEwODIyXV0sIFsnQ3VwQ2FwJywgWzg3ODFdXSwgWydjdXAnLCBbODc0Nl1dLCBbJ0N1cCcsIFs4OTE1XV0sIFsnY3VwY3VwJywgWzEwODI2XV0sIFsnY3VwZG90JywgWzg4NDVdXSwgWydjdXBvcicsIFsxMDgyMV1dLCBbJ2N1cHMnLCBbODc0NiwgNjUwMjRdXSwgWydjdXJhcnInLCBbODYzMV1dLCBbJ2N1cmFycm0nLCBbMTA1NTZdXSwgWydjdXJseWVxcHJlYycsIFs4OTI2XV0sIFsnY3VybHllcXN1Y2MnLCBbODkyN11dLCBbJ2N1cmx5dmVlJywgWzg5MTBdXSwgWydjdXJseXdlZGdlJywgWzg5MTFdXSwgWydjdXJyZW4nLCBbMTY0XV0sIFsnY3VydmVhcnJvd2xlZnQnLCBbODYzMF1dLCBbJ2N1cnZlYXJyb3dyaWdodCcsIFs4NjMxXV0sIFsnY3V2ZWUnLCBbODkxMF1dLCBbJ2N1d2VkJywgWzg5MTFdXSwgWydjd2NvbmludCcsIFs4NzU0XV0sIFsnY3dpbnQnLCBbODc1M11dLCBbJ2N5bGN0eScsIFs5MDA1XV0sIFsnZGFnZ2VyJywgWzgyMjRdXSwgWydEYWdnZXInLCBbODIyNV1dLCBbJ2RhbGV0aCcsIFs4NTA0XV0sIFsnZGFycicsIFs4NTk1XV0sIFsnRGFycicsIFs4NjA5XV0sIFsnZEFycicsIFs4NjU5XV0sIFsnZGFzaCcsIFs4MjA4XV0sIFsnRGFzaHYnLCBbMTA5ODBdXSwgWydkYXNodicsIFs4ODY3XV0sIFsnZGJrYXJvdycsIFsxMDUxMV1dLCBbJ2RibGFjJywgWzczM11dLCBbJ0RjYXJvbicsIFsyNzBdXSwgWydkY2Fyb24nLCBbMjcxXV0sIFsnRGN5JywgWzEwNDRdXSwgWydkY3knLCBbMTA3Nl1dLCBbJ2RkYWdnZXInLCBbODIyNV1dLCBbJ2RkYXJyJywgWzg2NTBdXSwgWydERCcsIFs4NTE3XV0sIFsnZGQnLCBbODUxOF1dLCBbJ0REb3RyYWhkJywgWzEwNTEzXV0sIFsnZGRvdHNlcScsIFsxMDg3MV1dLCBbJ2RlZycsIFsxNzZdXSwgWydEZWwnLCBbODcxMV1dLCBbJ0RlbHRhJywgWzkxNl1dLCBbJ2RlbHRhJywgWzk0OF1dLCBbJ2RlbXB0eXYnLCBbMTA2NzNdXSwgWydkZmlzaHQnLCBbMTA2MjNdXSwgWydEZnInLCBbMTIwMDcxXV0sIFsnZGZyJywgWzEyMDA5N11dLCBbJ2RIYXInLCBbMTA1OTddXSwgWydkaGFybCcsIFs4NjQzXV0sIFsnZGhhcnInLCBbODY0Ml1dLCBbJ0RpYWNyaXRpY2FsQWN1dGUnLCBbMTgwXV0sIFsnRGlhY3JpdGljYWxEb3QnLCBbNzI5XV0sIFsnRGlhY3JpdGljYWxEb3VibGVBY3V0ZScsIFs3MzNdXSwgWydEaWFjcml0aWNhbEdyYXZlJywgWzk2XV0sIFsnRGlhY3JpdGljYWxUaWxkZScsIFs3MzJdXSwgWydkaWFtJywgWzg5MDBdXSwgWydkaWFtb25kJywgWzg5MDBdXSwgWydEaWFtb25kJywgWzg5MDBdXSwgWydkaWFtb25kc3VpdCcsIFs5ODMwXV0sIFsnZGlhbXMnLCBbOTgzMF1dLCBbJ2RpZScsIFsxNjhdXSwgWydEaWZmZXJlbnRpYWxEJywgWzg1MThdXSwgWydkaWdhbW1hJywgWzk4OV1dLCBbJ2Rpc2luJywgWzg5NDZdXSwgWydkaXYnLCBbMjQ3XV0sIFsnZGl2aWRlJywgWzI0N11dLCBbJ2RpdmlkZW9udGltZXMnLCBbODkwM11dLCBbJ2Rpdm9ueCcsIFs4OTAzXV0sIFsnREpjeScsIFsxMDI2XV0sIFsnZGpjeScsIFsxMTA2XV0sIFsnZGxjb3JuJywgWzg5OTBdXSwgWydkbGNyb3AnLCBbODk3M11dLCBbJ2RvbGxhcicsIFszNl1dLCBbJ0RvcGYnLCBbMTIwMTIzXV0sIFsnZG9wZicsIFsxMjAxNDldXSwgWydEb3QnLCBbMTY4XV0sIFsnZG90JywgWzcyOV1dLCBbJ0RvdERvdCcsIFs4NDEyXV0sIFsnZG90ZXEnLCBbODc4NF1dLCBbJ2RvdGVxZG90JywgWzg3ODVdXSwgWydEb3RFcXVhbCcsIFs4Nzg0XV0sIFsnZG90bWludXMnLCBbODc2MF1dLCBbJ2RvdHBsdXMnLCBbODcyNF1dLCBbJ2RvdHNxdWFyZScsIFs4ODY1XV0sIFsnZG91YmxlYmFyd2VkZ2UnLCBbODk2Nl1dLCBbJ0RvdWJsZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzUxXV0sIFsnRG91YmxlRG90JywgWzE2OF1dLCBbJ0RvdWJsZURvd25BcnJvdycsIFs4NjU5XV0sIFsnRG91YmxlTGVmdEFycm93JywgWzg2NTZdXSwgWydEb3VibGVMZWZ0UmlnaHRBcnJvdycsIFs4NjYwXV0sIFsnRG91YmxlTGVmdFRlZScsIFsxMDk4MF1dLCBbJ0RvdWJsZUxvbmdMZWZ0QXJyb3cnLCBbMTAyMzJdXSwgWydEb3VibGVMb25nTGVmdFJpZ2h0QXJyb3cnLCBbMTAyMzRdXSwgWydEb3VibGVMb25nUmlnaHRBcnJvdycsIFsxMDIzM11dLCBbJ0RvdWJsZVJpZ2h0QXJyb3cnLCBbODY1OF1dLCBbJ0RvdWJsZVJpZ2h0VGVlJywgWzg4NzJdXSwgWydEb3VibGVVcEFycm93JywgWzg2NTddXSwgWydEb3VibGVVcERvd25BcnJvdycsIFs4NjYxXV0sIFsnRG91YmxlVmVydGljYWxCYXInLCBbODc0MV1dLCBbJ0Rvd25BcnJvd0JhcicsIFsxMDUxNV1dLCBbJ2Rvd25hcnJvdycsIFs4NTk1XV0sIFsnRG93bkFycm93JywgWzg1OTVdXSwgWydEb3duYXJyb3cnLCBbODY1OV1dLCBbJ0Rvd25BcnJvd1VwQXJyb3cnLCBbODY5M11dLCBbJ0Rvd25CcmV2ZScsIFs3ODVdXSwgWydkb3duZG93bmFycm93cycsIFs4NjUwXV0sIFsnZG93bmhhcnBvb25sZWZ0JywgWzg2NDNdXSwgWydkb3duaGFycG9vbnJpZ2h0JywgWzg2NDJdXSwgWydEb3duTGVmdFJpZ2h0VmVjdG9yJywgWzEwNTc2XV0sIFsnRG93bkxlZnRUZWVWZWN0b3InLCBbMTA1OTBdXSwgWydEb3duTGVmdFZlY3RvckJhcicsIFsxMDU4Ml1dLCBbJ0Rvd25MZWZ0VmVjdG9yJywgWzg2MzddXSwgWydEb3duUmlnaHRUZWVWZWN0b3InLCBbMTA1OTFdXSwgWydEb3duUmlnaHRWZWN0b3JCYXInLCBbMTA1ODNdXSwgWydEb3duUmlnaHRWZWN0b3InLCBbODY0MV1dLCBbJ0Rvd25UZWVBcnJvdycsIFs4NjE1XV0sIFsnRG93blRlZScsIFs4ODY4XV0sIFsnZHJia2Fyb3cnLCBbMTA1MTJdXSwgWydkcmNvcm4nLCBbODk5MV1dLCBbJ2RyY3JvcCcsIFs4OTcyXV0sIFsnRHNjcicsIFsxMTk5NjddXSwgWydkc2NyJywgWzExOTk5M11dLCBbJ0RTY3knLCBbMTAyOV1dLCBbJ2RzY3knLCBbMTEwOV1dLCBbJ2Rzb2wnLCBbMTA3NDJdXSwgWydEc3Ryb2snLCBbMjcyXV0sIFsnZHN0cm9rJywgWzI3M11dLCBbJ2R0ZG90JywgWzg5NDVdXSwgWydkdHJpJywgWzk2NjNdXSwgWydkdHJpZicsIFs5NjYyXV0sIFsnZHVhcnInLCBbODY5M11dLCBbJ2R1aGFyJywgWzEwNjA3XV0sIFsnZHdhbmdsZScsIFsxMDY2Ml1dLCBbJ0RaY3knLCBbMTAzOV1dLCBbJ2R6Y3knLCBbMTExOV1dLCBbJ2R6aWdyYXJyJywgWzEwMjM5XV0sIFsnRWFjdXRlJywgWzIwMV1dLCBbJ2VhY3V0ZScsIFsyMzNdXSwgWydlYXN0ZXInLCBbMTA4NjJdXSwgWydFY2Fyb24nLCBbMjgyXV0sIFsnZWNhcm9uJywgWzI4M11dLCBbJ0VjaXJjJywgWzIwMl1dLCBbJ2VjaXJjJywgWzIzNF1dLCBbJ2VjaXInLCBbODc5MF1dLCBbJ2Vjb2xvbicsIFs4Nzg5XV0sIFsnRWN5JywgWzEwNjldXSwgWydlY3knLCBbMTEwMV1dLCBbJ2VERG90JywgWzEwODcxXV0sIFsnRWRvdCcsIFsyNzhdXSwgWydlZG90JywgWzI3OV1dLCBbJ2VEb3QnLCBbODc4NV1dLCBbJ2VlJywgWzg1MTldXSwgWydlZkRvdCcsIFs4Nzg2XV0sIFsnRWZyJywgWzEyMDA3Ml1dLCBbJ2VmcicsIFsxMjAwOThdXSwgWydlZycsIFsxMDkwNl1dLCBbJ0VncmF2ZScsIFsyMDBdXSwgWydlZ3JhdmUnLCBbMjMyXV0sIFsnZWdzJywgWzEwOTAyXV0sIFsnZWdzZG90JywgWzEwOTA0XV0sIFsnZWwnLCBbMTA5MDVdXSwgWydFbGVtZW50JywgWzg3MTJdXSwgWydlbGludGVycycsIFs5MTkxXV0sIFsnZWxsJywgWzg0NjddXSwgWydlbHMnLCBbMTA5MDFdXSwgWydlbHNkb3QnLCBbMTA5MDNdXSwgWydFbWFjcicsIFsyNzRdXSwgWydlbWFjcicsIFsyNzVdXSwgWydlbXB0eScsIFs4NzA5XV0sIFsnZW1wdHlzZXQnLCBbODcwOV1dLCBbJ0VtcHR5U21hbGxTcXVhcmUnLCBbOTcyM11dLCBbJ2VtcHR5dicsIFs4NzA5XV0sIFsnRW1wdHlWZXJ5U21hbGxTcXVhcmUnLCBbOTY0M11dLCBbJ2Vtc3AxMycsIFs4MTk2XV0sIFsnZW1zcDE0JywgWzgxOTddXSwgWydlbXNwJywgWzgxOTVdXSwgWydFTkcnLCBbMzMwXV0sIFsnZW5nJywgWzMzMV1dLCBbJ2Vuc3AnLCBbODE5NF1dLCBbJ0VvZ29uJywgWzI4MF1dLCBbJ2VvZ29uJywgWzI4MV1dLCBbJ0VvcGYnLCBbMTIwMTI0XV0sIFsnZW9wZicsIFsxMjAxNTBdXSwgWydlcGFyJywgWzg5MTddXSwgWydlcGFyc2wnLCBbMTA3MjNdXSwgWydlcGx1cycsIFsxMDg2NV1dLCBbJ2Vwc2knLCBbOTQ5XV0sIFsnRXBzaWxvbicsIFs5MTddXSwgWydlcHNpbG9uJywgWzk0OV1dLCBbJ2Vwc2l2JywgWzEwMTNdXSwgWydlcWNpcmMnLCBbODc5MF1dLCBbJ2VxY29sb24nLCBbODc4OV1dLCBbJ2Vxc2ltJywgWzg3NzBdXSwgWydlcXNsYW50Z3RyJywgWzEwOTAyXV0sIFsnZXFzbGFudGxlc3MnLCBbMTA5MDFdXSwgWydFcXVhbCcsIFsxMDg2OV1dLCBbJ2VxdWFscycsIFs2MV1dLCBbJ0VxdWFsVGlsZGUnLCBbODc3MF1dLCBbJ2VxdWVzdCcsIFs4Nzk5XV0sIFsnRXF1aWxpYnJpdW0nLCBbODY1Ml1dLCBbJ2VxdWl2JywgWzg4MDFdXSwgWydlcXVpdkREJywgWzEwODcyXV0sIFsnZXF2cGFyc2wnLCBbMTA3MjVdXSwgWydlcmFycicsIFsxMDYwOV1dLCBbJ2VyRG90JywgWzg3ODddXSwgWydlc2NyJywgWzg0OTVdXSwgWydFc2NyJywgWzg0OTZdXSwgWydlc2RvdCcsIFs4Nzg0XV0sIFsnRXNpbScsIFsxMDg2N11dLCBbJ2VzaW0nLCBbODc3MF1dLCBbJ0V0YScsIFs5MTldXSwgWydldGEnLCBbOTUxXV0sIFsnRVRIJywgWzIwOF1dLCBbJ2V0aCcsIFsyNDBdXSwgWydFdW1sJywgWzIwM11dLCBbJ2V1bWwnLCBbMjM1XV0sIFsnZXVybycsIFs4MzY0XV0sIFsnZXhjbCcsIFszM11dLCBbJ2V4aXN0JywgWzg3MDddXSwgWydFeGlzdHMnLCBbODcwN11dLCBbJ2V4cGVjdGF0aW9uJywgWzg0OTZdXSwgWydleHBvbmVudGlhbGUnLCBbODUxOV1dLCBbJ0V4cG9uZW50aWFsRScsIFs4NTE5XV0sIFsnZmFsbGluZ2RvdHNlcScsIFs4Nzg2XV0sIFsnRmN5JywgWzEwNjBdXSwgWydmY3knLCBbMTA5Ml1dLCBbJ2ZlbWFsZScsIFs5NzkyXV0sIFsnZmZpbGlnJywgWzY0MjU5XV0sIFsnZmZsaWcnLCBbNjQyNTZdXSwgWydmZmxsaWcnLCBbNjQyNjBdXSwgWydGZnInLCBbMTIwMDczXV0sIFsnZmZyJywgWzEyMDA5OV1dLCBbJ2ZpbGlnJywgWzY0MjU3XV0sIFsnRmlsbGVkU21hbGxTcXVhcmUnLCBbOTcyNF1dLCBbJ0ZpbGxlZFZlcnlTbWFsbFNxdWFyZScsIFs5NjQyXV0sIFsnZmpsaWcnLCBbMTAyLCAxMDZdXSwgWydmbGF0JywgWzk4MzddXSwgWydmbGxpZycsIFs2NDI1OF1dLCBbJ2ZsdG5zJywgWzk2NDldXSwgWydmbm9mJywgWzQwMl1dLCBbJ0ZvcGYnLCBbMTIwMTI1XV0sIFsnZm9wZicsIFsxMjAxNTFdXSwgWydmb3JhbGwnLCBbODcwNF1dLCBbJ0ZvckFsbCcsIFs4NzA0XV0sIFsnZm9yaycsIFs4OTE2XV0sIFsnZm9ya3YnLCBbMTA5NjldXSwgWydGb3VyaWVydHJmJywgWzg0OTddXSwgWydmcGFydGludCcsIFsxMDc2NV1dLCBbJ2ZyYWMxMicsIFsxODldXSwgWydmcmFjMTMnLCBbODUzMV1dLCBbJ2ZyYWMxNCcsIFsxODhdXSwgWydmcmFjMTUnLCBbODUzM11dLCBbJ2ZyYWMxNicsIFs4NTM3XV0sIFsnZnJhYzE4JywgWzg1MzldXSwgWydmcmFjMjMnLCBbODUzMl1dLCBbJ2ZyYWMyNScsIFs4NTM0XV0sIFsnZnJhYzM0JywgWzE5MF1dLCBbJ2ZyYWMzNScsIFs4NTM1XV0sIFsnZnJhYzM4JywgWzg1NDBdXSwgWydmcmFjNDUnLCBbODUzNl1dLCBbJ2ZyYWM1NicsIFs4NTM4XV0sIFsnZnJhYzU4JywgWzg1NDFdXSwgWydmcmFjNzgnLCBbODU0Ml1dLCBbJ2ZyYXNsJywgWzgyNjBdXSwgWydmcm93bicsIFs4OTk0XV0sIFsnZnNjcicsIFsxMTk5OTVdXSwgWydGc2NyJywgWzg0OTddXSwgWydnYWN1dGUnLCBbNTAxXV0sIFsnR2FtbWEnLCBbOTE1XV0sIFsnZ2FtbWEnLCBbOTQ3XV0sIFsnR2FtbWFkJywgWzk4OF1dLCBbJ2dhbW1hZCcsIFs5ODldXSwgWydnYXAnLCBbMTA4ODZdXSwgWydHYnJldmUnLCBbMjg2XV0sIFsnZ2JyZXZlJywgWzI4N11dLCBbJ0djZWRpbCcsIFsyOTBdXSwgWydHY2lyYycsIFsyODRdXSwgWydnY2lyYycsIFsyODVdXSwgWydHY3knLCBbMTA0M11dLCBbJ2djeScsIFsxMDc1XV0sIFsnR2RvdCcsIFsyODhdXSwgWydnZG90JywgWzI4OV1dLCBbJ2dlJywgWzg4MDVdXSwgWydnRScsIFs4ODA3XV0sIFsnZ0VsJywgWzEwODkyXV0sIFsnZ2VsJywgWzg5MjNdXSwgWydnZXEnLCBbODgwNV1dLCBbJ2dlcXEnLCBbODgwN11dLCBbJ2dlcXNsYW50JywgWzEwODc4XV0sIFsnZ2VzY2MnLCBbMTA5MjFdXSwgWydnZXMnLCBbMTA4NzhdXSwgWydnZXNkb3QnLCBbMTA4ODBdXSwgWydnZXNkb3RvJywgWzEwODgyXV0sIFsnZ2VzZG90b2wnLCBbMTA4ODRdXSwgWydnZXNsJywgWzg5MjMsIDY1MDI0XV0sIFsnZ2VzbGVzJywgWzEwOTAwXV0sIFsnR2ZyJywgWzEyMDA3NF1dLCBbJ2dmcicsIFsxMjAxMDBdXSwgWydnZycsIFs4ODExXV0sIFsnR2cnLCBbODkyMV1dLCBbJ2dnZycsIFs4OTIxXV0sIFsnZ2ltZWwnLCBbODUwM11dLCBbJ0dKY3knLCBbMTAyN11dLCBbJ2dqY3knLCBbMTEwN11dLCBbJ2dsYScsIFsxMDkxN11dLCBbJ2dsJywgWzg4MjNdXSwgWydnbEUnLCBbMTA4OThdXSwgWydnbGonLCBbMTA5MTZdXSwgWydnbmFwJywgWzEwODkwXV0sIFsnZ25hcHByb3gnLCBbMTA4OTBdXSwgWydnbmUnLCBbMTA4ODhdXSwgWydnbkUnLCBbODgwOV1dLCBbJ2duZXEnLCBbMTA4ODhdXSwgWydnbmVxcScsIFs4ODA5XV0sIFsnZ25zaW0nLCBbODkzNV1dLCBbJ0dvcGYnLCBbMTIwMTI2XV0sIFsnZ29wZicsIFsxMjAxNTJdXSwgWydncmF2ZScsIFs5Nl1dLCBbJ0dyZWF0ZXJFcXVhbCcsIFs4ODA1XV0sIFsnR3JlYXRlckVxdWFsTGVzcycsIFs4OTIzXV0sIFsnR3JlYXRlckZ1bGxFcXVhbCcsIFs4ODA3XV0sIFsnR3JlYXRlckdyZWF0ZXInLCBbMTA5MTRdXSwgWydHcmVhdGVyTGVzcycsIFs4ODIzXV0sIFsnR3JlYXRlclNsYW50RXF1YWwnLCBbMTA4NzhdXSwgWydHcmVhdGVyVGlsZGUnLCBbODgxOV1dLCBbJ0dzY3InLCBbMTE5OTcwXV0sIFsnZ3NjcicsIFs4NDU4XV0sIFsnZ3NpbScsIFs4ODE5XV0sIFsnZ3NpbWUnLCBbMTA4OTRdXSwgWydnc2ltbCcsIFsxMDg5Nl1dLCBbJ2d0Y2MnLCBbMTA5MTldXSwgWydndGNpcicsIFsxMDg3NF1dLCBbJ2d0JywgWzYyXV0sIFsnR1QnLCBbNjJdXSwgWydHdCcsIFs4ODExXV0sIFsnZ3Rkb3QnLCBbODkxOV1dLCBbJ2d0bFBhcicsIFsxMDY0NV1dLCBbJ2d0cXVlc3QnLCBbMTA4NzZdXSwgWydndHJhcHByb3gnLCBbMTA4ODZdXSwgWydndHJhcnInLCBbMTA2MTZdXSwgWydndHJkb3QnLCBbODkxOV1dLCBbJ2d0cmVxbGVzcycsIFs4OTIzXV0sIFsnZ3RyZXFxbGVzcycsIFsxMDg5Ml1dLCBbJ2d0cmxlc3MnLCBbODgyM11dLCBbJ2d0cnNpbScsIFs4ODE5XV0sIFsnZ3ZlcnRuZXFxJywgWzg4MDksIDY1MDI0XV0sIFsnZ3ZuRScsIFs4ODA5LCA2NTAyNF1dLCBbJ0hhY2VrJywgWzcxMV1dLCBbJ2hhaXJzcCcsIFs4MjAyXV0sIFsnaGFsZicsIFsxODldXSwgWydoYW1pbHQnLCBbODQ1OV1dLCBbJ0hBUkRjeScsIFsxMDY2XV0sIFsnaGFyZGN5JywgWzEwOThdXSwgWydoYXJyY2lyJywgWzEwNTY4XV0sIFsnaGFycicsIFs4NTk2XV0sIFsnaEFycicsIFs4NjYwXV0sIFsnaGFycncnLCBbODYyMV1dLCBbJ0hhdCcsIFs5NF1dLCBbJ2hiYXInLCBbODQ2M11dLCBbJ0hjaXJjJywgWzI5Ml1dLCBbJ2hjaXJjJywgWzI5M11dLCBbJ2hlYXJ0cycsIFs5ODI5XV0sIFsnaGVhcnRzdWl0JywgWzk4MjldXSwgWydoZWxsaXAnLCBbODIzMF1dLCBbJ2hlcmNvbicsIFs4ODg5XV0sIFsnaGZyJywgWzEyMDEwMV1dLCBbJ0hmcicsIFs4NDYwXV0sIFsnSGlsYmVydFNwYWNlJywgWzg0NTldXSwgWydoa3NlYXJvdycsIFsxMDUzM11dLCBbJ2hrc3dhcm93JywgWzEwNTM0XV0sIFsnaG9hcnInLCBbODcwM11dLCBbJ2hvbXRodCcsIFs4NzYzXV0sIFsnaG9va2xlZnRhcnJvdycsIFs4NjE3XV0sIFsnaG9va3JpZ2h0YXJyb3cnLCBbODYxOF1dLCBbJ2hvcGYnLCBbMTIwMTUzXV0sIFsnSG9wZicsIFs4NDYxXV0sIFsnaG9yYmFyJywgWzgyMTNdXSwgWydIb3Jpem9udGFsTGluZScsIFs5NDcyXV0sIFsnaHNjcicsIFsxMTk5OTddXSwgWydIc2NyJywgWzg0NTldXSwgWydoc2xhc2gnLCBbODQ2M11dLCBbJ0hzdHJvaycsIFsyOTRdXSwgWydoc3Ryb2snLCBbMjk1XV0sIFsnSHVtcERvd25IdW1wJywgWzg3ODJdXSwgWydIdW1wRXF1YWwnLCBbODc4M11dLCBbJ2h5YnVsbCcsIFs4MjU5XV0sIFsnaHlwaGVuJywgWzgyMDhdXSwgWydJYWN1dGUnLCBbMjA1XV0sIFsnaWFjdXRlJywgWzIzN11dLCBbJ2ljJywgWzgyOTFdXSwgWydJY2lyYycsIFsyMDZdXSwgWydpY2lyYycsIFsyMzhdXSwgWydJY3knLCBbMTA0OF1dLCBbJ2ljeScsIFsxMDgwXV0sIFsnSWRvdCcsIFszMDRdXSwgWydJRWN5JywgWzEwNDVdXSwgWydpZWN5JywgWzEwNzddXSwgWydpZXhjbCcsIFsxNjFdXSwgWydpZmYnLCBbODY2MF1dLCBbJ2lmcicsIFsxMjAxMDJdXSwgWydJZnInLCBbODQ2NV1dLCBbJ0lncmF2ZScsIFsyMDRdXSwgWydpZ3JhdmUnLCBbMjM2XV0sIFsnaWknLCBbODUyMF1dLCBbJ2lpaWludCcsIFsxMDc2NF1dLCBbJ2lpaW50JywgWzg3NDldXSwgWydpaW5maW4nLCBbMTA3MTZdXSwgWydpaW90YScsIFs4NDg5XV0sIFsnSUpsaWcnLCBbMzA2XV0sIFsnaWpsaWcnLCBbMzA3XV0sIFsnSW1hY3InLCBbMjk4XV0sIFsnaW1hY3InLCBbMjk5XV0sIFsnaW1hZ2UnLCBbODQ2NV1dLCBbJ0ltYWdpbmFyeUknLCBbODUyMF1dLCBbJ2ltYWdsaW5lJywgWzg0NjRdXSwgWydpbWFncGFydCcsIFs4NDY1XV0sIFsnaW1hdGgnLCBbMzA1XV0sIFsnSW0nLCBbODQ2NV1dLCBbJ2ltb2YnLCBbODg4N11dLCBbJ2ltcGVkJywgWzQzN11dLCBbJ0ltcGxpZXMnLCBbODY1OF1dLCBbJ2luY2FyZScsIFs4NDUzXV0sIFsnaW4nLCBbODcxMl1dLCBbJ2luZmluJywgWzg3MzRdXSwgWydpbmZpbnRpZScsIFsxMDcxN11dLCBbJ2lub2RvdCcsIFszMDVdXSwgWydpbnRjYWwnLCBbODg5MF1dLCBbJ2ludCcsIFs4NzQ3XV0sIFsnSW50JywgWzg3NDhdXSwgWydpbnRlZ2VycycsIFs4NDg0XV0sIFsnSW50ZWdyYWwnLCBbODc0N11dLCBbJ2ludGVyY2FsJywgWzg4OTBdXSwgWydJbnRlcnNlY3Rpb24nLCBbODg5OF1dLCBbJ2ludGxhcmhrJywgWzEwNzc1XV0sIFsnaW50cHJvZCcsIFsxMDgxMl1dLCBbJ0ludmlzaWJsZUNvbW1hJywgWzgyOTFdXSwgWydJbnZpc2libGVUaW1lcycsIFs4MjkwXV0sIFsnSU9jeScsIFsxMDI1XV0sIFsnaW9jeScsIFsxMTA1XV0sIFsnSW9nb24nLCBbMzAyXV0sIFsnaW9nb24nLCBbMzAzXV0sIFsnSW9wZicsIFsxMjAxMjhdXSwgWydpb3BmJywgWzEyMDE1NF1dLCBbJ0lvdGEnLCBbOTIxXV0sIFsnaW90YScsIFs5NTNdXSwgWydpcHJvZCcsIFsxMDgxMl1dLCBbJ2lxdWVzdCcsIFsxOTFdXSwgWydpc2NyJywgWzExOTk5OF1dLCBbJ0lzY3InLCBbODQ2NF1dLCBbJ2lzaW4nLCBbODcxMl1dLCBbJ2lzaW5kb3QnLCBbODk0OV1dLCBbJ2lzaW5FJywgWzg5NTNdXSwgWydpc2lucycsIFs4OTQ4XV0sIFsnaXNpbnN2JywgWzg5NDddXSwgWydpc2ludicsIFs4NzEyXV0sIFsnaXQnLCBbODI5MF1dLCBbJ0l0aWxkZScsIFsyOTZdXSwgWydpdGlsZGUnLCBbMjk3XV0sIFsnSXVrY3knLCBbMTAzMF1dLCBbJ2l1a2N5JywgWzExMTBdXSwgWydJdW1sJywgWzIwN11dLCBbJ2l1bWwnLCBbMjM5XV0sIFsnSmNpcmMnLCBbMzA4XV0sIFsnamNpcmMnLCBbMzA5XV0sIFsnSmN5JywgWzEwNDldXSwgWydqY3knLCBbMTA4MV1dLCBbJ0pmcicsIFsxMjAwNzddXSwgWydqZnInLCBbMTIwMTAzXV0sIFsnam1hdGgnLCBbNTY3XV0sIFsnSm9wZicsIFsxMjAxMjldXSwgWydqb3BmJywgWzEyMDE1NV1dLCBbJ0pzY3InLCBbMTE5OTczXV0sIFsnanNjcicsIFsxMTk5OTldXSwgWydKc2VyY3knLCBbMTAzMl1dLCBbJ2pzZXJjeScsIFsxMTEyXV0sIFsnSnVrY3knLCBbMTAyOF1dLCBbJ2p1a2N5JywgWzExMDhdXSwgWydLYXBwYScsIFs5MjJdXSwgWydrYXBwYScsIFs5NTRdXSwgWydrYXBwYXYnLCBbMTAwOF1dLCBbJ0tjZWRpbCcsIFszMTBdXSwgWydrY2VkaWwnLCBbMzExXV0sIFsnS2N5JywgWzEwNTBdXSwgWydrY3knLCBbMTA4Ml1dLCBbJ0tmcicsIFsxMjAwNzhdXSwgWydrZnInLCBbMTIwMTA0XV0sIFsna2dyZWVuJywgWzMxMl1dLCBbJ0tIY3knLCBbMTA2MV1dLCBbJ2toY3knLCBbMTA5M11dLCBbJ0tKY3knLCBbMTAzNl1dLCBbJ2tqY3knLCBbMTExNl1dLCBbJ0tvcGYnLCBbMTIwMTMwXV0sIFsna29wZicsIFsxMjAxNTZdXSwgWydLc2NyJywgWzExOTk3NF1dLCBbJ2tzY3InLCBbMTIwMDAwXV0sIFsnbEFhcnInLCBbODY2Nl1dLCBbJ0xhY3V0ZScsIFszMTNdXSwgWydsYWN1dGUnLCBbMzE0XV0sIFsnbGFlbXB0eXYnLCBbMTA2NzZdXSwgWydsYWdyYW4nLCBbODQ2Nl1dLCBbJ0xhbWJkYScsIFs5MjNdXSwgWydsYW1iZGEnLCBbOTU1XV0sIFsnbGFuZycsIFsxMDIxNl1dLCBbJ0xhbmcnLCBbMTAyMThdXSwgWydsYW5nZCcsIFsxMDY0MV1dLCBbJ2xhbmdsZScsIFsxMDIxNl1dLCBbJ2xhcCcsIFsxMDg4NV1dLCBbJ0xhcGxhY2V0cmYnLCBbODQ2Nl1dLCBbJ2xhcXVvJywgWzE3MV1dLCBbJ2xhcnJiJywgWzg2NzZdXSwgWydsYXJyYmZzJywgWzEwNTI3XV0sIFsnbGFycicsIFs4NTkyXV0sIFsnTGFycicsIFs4NjA2XV0sIFsnbEFycicsIFs4NjU2XV0sIFsnbGFycmZzJywgWzEwNTI1XV0sIFsnbGFycmhrJywgWzg2MTddXSwgWydsYXJybHAnLCBbODYxOV1dLCBbJ2xhcnJwbCcsIFsxMDU1M11dLCBbJ2xhcnJzaW0nLCBbMTA2MTFdXSwgWydsYXJydGwnLCBbODYxMF1dLCBbJ2xhdGFpbCcsIFsxMDUyMV1dLCBbJ2xBdGFpbCcsIFsxMDUyM11dLCBbJ2xhdCcsIFsxMDkyM11dLCBbJ2xhdGUnLCBbMTA5MjVdXSwgWydsYXRlcycsIFsxMDkyNSwgNjUwMjRdXSwgWydsYmFycicsIFsxMDUwOF1dLCBbJ2xCYXJyJywgWzEwNTEwXV0sIFsnbGJicmsnLCBbMTAwOThdXSwgWydsYnJhY2UnLCBbMTIzXV0sIFsnbGJyYWNrJywgWzkxXV0sIFsnbGJya2UnLCBbMTA2MzVdXSwgWydsYnJrc2xkJywgWzEwNjM5XV0sIFsnbGJya3NsdScsIFsxMDYzN11dLCBbJ0xjYXJvbicsIFszMTddXSwgWydsY2Fyb24nLCBbMzE4XV0sIFsnTGNlZGlsJywgWzMxNV1dLCBbJ2xjZWRpbCcsIFszMTZdXSwgWydsY2VpbCcsIFs4OTY4XV0sIFsnbGN1YicsIFsxMjNdXSwgWydMY3knLCBbMTA1MV1dLCBbJ2xjeScsIFsxMDgzXV0sIFsnbGRjYScsIFsxMDU1MF1dLCBbJ2xkcXVvJywgWzgyMjBdXSwgWydsZHF1b3InLCBbODIyMl1dLCBbJ2xkcmRoYXInLCBbMTA1OTldXSwgWydsZHJ1c2hhcicsIFsxMDU3MV1dLCBbJ2xkc2gnLCBbODYyNl1dLCBbJ2xlJywgWzg4MDRdXSwgWydsRScsIFs4ODA2XV0sIFsnTGVmdEFuZ2xlQnJhY2tldCcsIFsxMDIxNl1dLCBbJ0xlZnRBcnJvd0JhcicsIFs4Njc2XV0sIFsnbGVmdGFycm93JywgWzg1OTJdXSwgWydMZWZ0QXJyb3cnLCBbODU5Ml1dLCBbJ0xlZnRhcnJvdycsIFs4NjU2XV0sIFsnTGVmdEFycm93UmlnaHRBcnJvdycsIFs4NjQ2XV0sIFsnbGVmdGFycm93dGFpbCcsIFs4NjEwXV0sIFsnTGVmdENlaWxpbmcnLCBbODk2OF1dLCBbJ0xlZnREb3VibGVCcmFja2V0JywgWzEwMjE0XV0sIFsnTGVmdERvd25UZWVWZWN0b3InLCBbMTA1OTNdXSwgWydMZWZ0RG93blZlY3RvckJhcicsIFsxMDU4NV1dLCBbJ0xlZnREb3duVmVjdG9yJywgWzg2NDNdXSwgWydMZWZ0Rmxvb3InLCBbODk3MF1dLCBbJ2xlZnRoYXJwb29uZG93bicsIFs4NjM3XV0sIFsnbGVmdGhhcnBvb251cCcsIFs4NjM2XV0sIFsnbGVmdGxlZnRhcnJvd3MnLCBbODY0N11dLCBbJ2xlZnRyaWdodGFycm93JywgWzg1OTZdXSwgWydMZWZ0UmlnaHRBcnJvdycsIFs4NTk2XV0sIFsnTGVmdHJpZ2h0YXJyb3cnLCBbODY2MF1dLCBbJ2xlZnRyaWdodGFycm93cycsIFs4NjQ2XV0sIFsnbGVmdHJpZ2h0aGFycG9vbnMnLCBbODY1MV1dLCBbJ2xlZnRyaWdodHNxdWlnYXJyb3cnLCBbODYyMV1dLCBbJ0xlZnRSaWdodFZlY3RvcicsIFsxMDU3NF1dLCBbJ0xlZnRUZWVBcnJvdycsIFs4NjEyXV0sIFsnTGVmdFRlZScsIFs4ODY3XV0sIFsnTGVmdFRlZVZlY3RvcicsIFsxMDU4Nl1dLCBbJ2xlZnR0aHJlZXRpbWVzJywgWzg5MDddXSwgWydMZWZ0VHJpYW5nbGVCYXInLCBbMTA3MDNdXSwgWydMZWZ0VHJpYW5nbGUnLCBbODg4Ml1dLCBbJ0xlZnRUcmlhbmdsZUVxdWFsJywgWzg4ODRdXSwgWydMZWZ0VXBEb3duVmVjdG9yJywgWzEwNTc3XV0sIFsnTGVmdFVwVGVlVmVjdG9yJywgWzEwNTkyXV0sIFsnTGVmdFVwVmVjdG9yQmFyJywgWzEwNTg0XV0sIFsnTGVmdFVwVmVjdG9yJywgWzg2MzldXSwgWydMZWZ0VmVjdG9yQmFyJywgWzEwNTc4XV0sIFsnTGVmdFZlY3RvcicsIFs4NjM2XV0sIFsnbEVnJywgWzEwODkxXV0sIFsnbGVnJywgWzg5MjJdXSwgWydsZXEnLCBbODgwNF1dLCBbJ2xlcXEnLCBbODgwNl1dLCBbJ2xlcXNsYW50JywgWzEwODc3XV0sIFsnbGVzY2MnLCBbMTA5MjBdXSwgWydsZXMnLCBbMTA4NzddXSwgWydsZXNkb3QnLCBbMTA4NzldXSwgWydsZXNkb3RvJywgWzEwODgxXV0sIFsnbGVzZG90b3InLCBbMTA4ODNdXSwgWydsZXNnJywgWzg5MjIsIDY1MDI0XV0sIFsnbGVzZ2VzJywgWzEwODk5XV0sIFsnbGVzc2FwcHJveCcsIFsxMDg4NV1dLCBbJ2xlc3Nkb3QnLCBbODkxOF1dLCBbJ2xlc3NlcWd0cicsIFs4OTIyXV0sIFsnbGVzc2VxcWd0cicsIFsxMDg5MV1dLCBbJ0xlc3NFcXVhbEdyZWF0ZXInLCBbODkyMl1dLCBbJ0xlc3NGdWxsRXF1YWwnLCBbODgwNl1dLCBbJ0xlc3NHcmVhdGVyJywgWzg4MjJdXSwgWydsZXNzZ3RyJywgWzg4MjJdXSwgWydMZXNzTGVzcycsIFsxMDkxM11dLCBbJ2xlc3NzaW0nLCBbODgxOF1dLCBbJ0xlc3NTbGFudEVxdWFsJywgWzEwODc3XV0sIFsnTGVzc1RpbGRlJywgWzg4MThdXSwgWydsZmlzaHQnLCBbMTA2MjBdXSwgWydsZmxvb3InLCBbODk3MF1dLCBbJ0xmcicsIFsxMjAwNzldXSwgWydsZnInLCBbMTIwMTA1XV0sIFsnbGcnLCBbODgyMl1dLCBbJ2xnRScsIFsxMDg5N11dLCBbJ2xIYXInLCBbMTA1OTRdXSwgWydsaGFyZCcsIFs4NjM3XV0sIFsnbGhhcnUnLCBbODYzNl1dLCBbJ2xoYXJ1bCcsIFsxMDYwMl1dLCBbJ2xoYmxrJywgWzk2MDRdXSwgWydMSmN5JywgWzEwMzNdXSwgWydsamN5JywgWzExMTNdXSwgWydsbGFycicsIFs4NjQ3XV0sIFsnbGwnLCBbODgxMF1dLCBbJ0xsJywgWzg5MjBdXSwgWydsbGNvcm5lcicsIFs4OTkwXV0sIFsnTGxlZnRhcnJvdycsIFs4NjY2XV0sIFsnbGxoYXJkJywgWzEwNjAzXV0sIFsnbGx0cmknLCBbOTcyMl1dLCBbJ0xtaWRvdCcsIFszMTldXSwgWydsbWlkb3QnLCBbMzIwXV0sIFsnbG1vdXN0YWNoZScsIFs5MTM2XV0sIFsnbG1vdXN0JywgWzkxMzZdXSwgWydsbmFwJywgWzEwODg5XV0sIFsnbG5hcHByb3gnLCBbMTA4ODldXSwgWydsbmUnLCBbMTA4ODddXSwgWydsbkUnLCBbODgwOF1dLCBbJ2xuZXEnLCBbMTA4ODddXSwgWydsbmVxcScsIFs4ODA4XV0sIFsnbG5zaW0nLCBbODkzNF1dLCBbJ2xvYW5nJywgWzEwMjIwXV0sIFsnbG9hcnInLCBbODcwMV1dLCBbJ2xvYnJrJywgWzEwMjE0XV0sIFsnbG9uZ2xlZnRhcnJvdycsIFsxMDIyOV1dLCBbJ0xvbmdMZWZ0QXJyb3cnLCBbMTAyMjldXSwgWydMb25nbGVmdGFycm93JywgWzEwMjMyXV0sIFsnbG9uZ2xlZnRyaWdodGFycm93JywgWzEwMjMxXV0sIFsnTG9uZ0xlZnRSaWdodEFycm93JywgWzEwMjMxXV0sIFsnTG9uZ2xlZnRyaWdodGFycm93JywgWzEwMjM0XV0sIFsnbG9uZ21hcHN0bycsIFsxMDIzNl1dLCBbJ2xvbmdyaWdodGFycm93JywgWzEwMjMwXV0sIFsnTG9uZ1JpZ2h0QXJyb3cnLCBbMTAyMzBdXSwgWydMb25ncmlnaHRhcnJvdycsIFsxMDIzM11dLCBbJ2xvb3BhcnJvd2xlZnQnLCBbODYxOV1dLCBbJ2xvb3BhcnJvd3JpZ2h0JywgWzg2MjBdXSwgWydsb3BhcicsIFsxMDYyOV1dLCBbJ0xvcGYnLCBbMTIwMTMxXV0sIFsnbG9wZicsIFsxMjAxNTddXSwgWydsb3BsdXMnLCBbMTA3OTddXSwgWydsb3RpbWVzJywgWzEwODA0XV0sIFsnbG93YXN0JywgWzg3MjddXSwgWydsb3diYXInLCBbOTVdXSwgWydMb3dlckxlZnRBcnJvdycsIFs4NjAxXV0sIFsnTG93ZXJSaWdodEFycm93JywgWzg2MDBdXSwgWydsb3onLCBbOTY3NF1dLCBbJ2xvemVuZ2UnLCBbOTY3NF1dLCBbJ2xvemYnLCBbMTA3MzFdXSwgWydscGFyJywgWzQwXV0sIFsnbHBhcmx0JywgWzEwNjQzXV0sIFsnbHJhcnInLCBbODY0Nl1dLCBbJ2xyY29ybmVyJywgWzg5OTFdXSwgWydscmhhcicsIFs4NjUxXV0sIFsnbHJoYXJkJywgWzEwNjA1XV0sIFsnbHJtJywgWzgyMDZdXSwgWydscnRyaScsIFs4ODk1XV0sIFsnbHNhcXVvJywgWzgyNDldXSwgWydsc2NyJywgWzEyMDAwMV1dLCBbJ0xzY3InLCBbODQ2Nl1dLCBbJ2xzaCcsIFs4NjI0XV0sIFsnTHNoJywgWzg2MjRdXSwgWydsc2ltJywgWzg4MThdXSwgWydsc2ltZScsIFsxMDg5M11dLCBbJ2xzaW1nJywgWzEwODk1XV0sIFsnbHNxYicsIFs5MV1dLCBbJ2xzcXVvJywgWzgyMTZdXSwgWydsc3F1b3InLCBbODIxOF1dLCBbJ0xzdHJvaycsIFszMjFdXSwgWydsc3Ryb2snLCBbMzIyXV0sIFsnbHRjYycsIFsxMDkxOF1dLCBbJ2x0Y2lyJywgWzEwODczXV0sIFsnbHQnLCBbNjBdXSwgWydMVCcsIFs2MF1dLCBbJ0x0JywgWzg4MTBdXSwgWydsdGRvdCcsIFs4OTE4XV0sIFsnbHRocmVlJywgWzg5MDddXSwgWydsdGltZXMnLCBbODkwNV1dLCBbJ2x0bGFycicsIFsxMDYxNF1dLCBbJ2x0cXVlc3QnLCBbMTA4NzVdXSwgWydsdHJpJywgWzk2NjddXSwgWydsdHJpZScsIFs4ODg0XV0sIFsnbHRyaWYnLCBbOTY2Nl1dLCBbJ2x0clBhcicsIFsxMDY0Nl1dLCBbJ2x1cmRzaGFyJywgWzEwNTcwXV0sIFsnbHVydWhhcicsIFsxMDU5OF1dLCBbJ2x2ZXJ0bmVxcScsIFs4ODA4LCA2NTAyNF1dLCBbJ2x2bkUnLCBbODgwOCwgNjUwMjRdXSwgWydtYWNyJywgWzE3NV1dLCBbJ21hbGUnLCBbOTc5NF1dLCBbJ21hbHQnLCBbMTAwMTZdXSwgWydtYWx0ZXNlJywgWzEwMDE2XV0sIFsnTWFwJywgWzEwNTAxXV0sIFsnbWFwJywgWzg2MTRdXSwgWydtYXBzdG8nLCBbODYxNF1dLCBbJ21hcHN0b2Rvd24nLCBbODYxNV1dLCBbJ21hcHN0b2xlZnQnLCBbODYxMl1dLCBbJ21hcHN0b3VwJywgWzg2MTNdXSwgWydtYXJrZXInLCBbOTY0Nl1dLCBbJ21jb21tYScsIFsxMDc5M11dLCBbJ01jeScsIFsxMDUyXV0sIFsnbWN5JywgWzEwODRdXSwgWydtZGFzaCcsIFs4MjEyXV0sIFsnbUREb3QnLCBbODc2Ml1dLCBbJ21lYXN1cmVkYW5nbGUnLCBbODczN11dLCBbJ01lZGl1bVNwYWNlJywgWzgyODddXSwgWydNZWxsaW50cmYnLCBbODQ5OV1dLCBbJ01mcicsIFsxMjAwODBdXSwgWydtZnInLCBbMTIwMTA2XV0sIFsnbWhvJywgWzg0ODddXSwgWydtaWNybycsIFsxODFdXSwgWydtaWRhc3QnLCBbNDJdXSwgWydtaWRjaXInLCBbMTA5OTJdXSwgWydtaWQnLCBbODczOV1dLCBbJ21pZGRvdCcsIFsxODNdXSwgWydtaW51c2InLCBbODg2M11dLCBbJ21pbnVzJywgWzg3MjJdXSwgWydtaW51c2QnLCBbODc2MF1dLCBbJ21pbnVzZHUnLCBbMTA3OTRdXSwgWydNaW51c1BsdXMnLCBbODcyM11dLCBbJ21sY3AnLCBbMTA5NzFdXSwgWydtbGRyJywgWzgyMzBdXSwgWydtbnBsdXMnLCBbODcyM11dLCBbJ21vZGVscycsIFs4ODcxXV0sIFsnTW9wZicsIFsxMjAxMzJdXSwgWydtb3BmJywgWzEyMDE1OF1dLCBbJ21wJywgWzg3MjNdXSwgWydtc2NyJywgWzEyMDAwMl1dLCBbJ01zY3InLCBbODQ5OV1dLCBbJ21zdHBvcycsIFs4NzY2XV0sIFsnTXUnLCBbOTI0XV0sIFsnbXUnLCBbOTU2XV0sIFsnbXVsdGltYXAnLCBbODg4OF1dLCBbJ211bWFwJywgWzg4ODhdXSwgWyduYWJsYScsIFs4NzExXV0sIFsnTmFjdXRlJywgWzMyM11dLCBbJ25hY3V0ZScsIFszMjRdXSwgWyduYW5nJywgWzg3MzYsIDg0MDJdXSwgWyduYXAnLCBbODc3N11dLCBbJ25hcEUnLCBbMTA4NjQsIDgyNF1dLCBbJ25hcGlkJywgWzg3NzksIDgyNF1dLCBbJ25hcG9zJywgWzMyOV1dLCBbJ25hcHByb3gnLCBbODc3N11dLCBbJ25hdHVyYWwnLCBbOTgzOF1dLCBbJ25hdHVyYWxzJywgWzg0NjldXSwgWyduYXR1cicsIFs5ODM4XV0sIFsnbmJzcCcsIFsxNjBdXSwgWyduYnVtcCcsIFs4NzgyLCA4MjRdXSwgWyduYnVtcGUnLCBbODc4MywgODI0XV0sIFsnbmNhcCcsIFsxMDgxOV1dLCBbJ05jYXJvbicsIFszMjddXSwgWyduY2Fyb24nLCBbMzI4XV0sIFsnTmNlZGlsJywgWzMyNV1dLCBbJ25jZWRpbCcsIFszMjZdXSwgWyduY29uZycsIFs4Nzc1XV0sIFsnbmNvbmdkb3QnLCBbMTA4NjEsIDgyNF1dLCBbJ25jdXAnLCBbMTA4MThdXSwgWydOY3knLCBbMTA1M11dLCBbJ25jeScsIFsxMDg1XV0sIFsnbmRhc2gnLCBbODIxMV1dLCBbJ25lYXJoaycsIFsxMDUzMl1dLCBbJ25lYXJyJywgWzg1OTldXSwgWyduZUFycicsIFs4NjYzXV0sIFsnbmVhcnJvdycsIFs4NTk5XV0sIFsnbmUnLCBbODgwMF1dLCBbJ25lZG90JywgWzg3ODQsIDgyNF1dLCBbJ05lZ2F0aXZlTWVkaXVtU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVGhpY2tTcGFjZScsIFs4MjAzXV0sIFsnTmVnYXRpdmVUaGluU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVmVyeVRoaW5TcGFjZScsIFs4MjAzXV0sIFsnbmVxdWl2JywgWzg4MDJdXSwgWyduZXNlYXInLCBbMTA1MzZdXSwgWyduZXNpbScsIFs4NzcwLCA4MjRdXSwgWydOZXN0ZWRHcmVhdGVyR3JlYXRlcicsIFs4ODExXV0sIFsnTmVzdGVkTGVzc0xlc3MnLCBbODgxMF1dLCBbJ25leGlzdCcsIFs4NzA4XV0sIFsnbmV4aXN0cycsIFs4NzA4XV0sIFsnTmZyJywgWzEyMDA4MV1dLCBbJ25mcicsIFsxMjAxMDddXSwgWyduZ0UnLCBbODgwNywgODI0XV0sIFsnbmdlJywgWzg4MTddXSwgWyduZ2VxJywgWzg4MTddXSwgWyduZ2VxcScsIFs4ODA3LCA4MjRdXSwgWyduZ2Vxc2xhbnQnLCBbMTA4NzgsIDgyNF1dLCBbJ25nZXMnLCBbMTA4NzgsIDgyNF1dLCBbJ25HZycsIFs4OTIxLCA4MjRdXSwgWyduZ3NpbScsIFs4ODIxXV0sIFsnbkd0JywgWzg4MTEsIDg0MDJdXSwgWyduZ3QnLCBbODgxNV1dLCBbJ25ndHInLCBbODgxNV1dLCBbJ25HdHYnLCBbODgxMSwgODI0XV0sIFsnbmhhcnInLCBbODYyMl1dLCBbJ25oQXJyJywgWzg2NTRdXSwgWyduaHBhcicsIFsxMDk5NF1dLCBbJ25pJywgWzg3MTVdXSwgWyduaXMnLCBbODk1Nl1dLCBbJ25pc2QnLCBbODk1NF1dLCBbJ25pdicsIFs4NzE1XV0sIFsnTkpjeScsIFsxMDM0XV0sIFsnbmpjeScsIFsxMTE0XV0sIFsnbmxhcnInLCBbODYwMl1dLCBbJ25sQXJyJywgWzg2NTNdXSwgWydubGRyJywgWzgyMjldXSwgWydubEUnLCBbODgwNiwgODI0XV0sIFsnbmxlJywgWzg4MTZdXSwgWydubGVmdGFycm93JywgWzg2MDJdXSwgWyduTGVmdGFycm93JywgWzg2NTNdXSwgWydubGVmdHJpZ2h0YXJyb3cnLCBbODYyMl1dLCBbJ25MZWZ0cmlnaHRhcnJvdycsIFs4NjU0XV0sIFsnbmxlcScsIFs4ODE2XV0sIFsnbmxlcXEnLCBbODgwNiwgODI0XV0sIFsnbmxlcXNsYW50JywgWzEwODc3LCA4MjRdXSwgWydubGVzJywgWzEwODc3LCA4MjRdXSwgWydubGVzcycsIFs4ODE0XV0sIFsnbkxsJywgWzg5MjAsIDgyNF1dLCBbJ25sc2ltJywgWzg4MjBdXSwgWyduTHQnLCBbODgxMCwgODQwMl1dLCBbJ25sdCcsIFs4ODE0XV0sIFsnbmx0cmknLCBbODkzOF1dLCBbJ25sdHJpZScsIFs4OTQwXV0sIFsnbkx0dicsIFs4ODEwLCA4MjRdXSwgWydubWlkJywgWzg3NDBdXSwgWydOb0JyZWFrJywgWzgyODhdXSwgWydOb25CcmVha2luZ1NwYWNlJywgWzE2MF1dLCBbJ25vcGYnLCBbMTIwMTU5XV0sIFsnTm9wZicsIFs4NDY5XV0sIFsnTm90JywgWzEwOTg4XV0sIFsnbm90JywgWzE3Ml1dLCBbJ05vdENvbmdydWVudCcsIFs4ODAyXV0sIFsnTm90Q3VwQ2FwJywgWzg4MTNdXSwgWydOb3REb3VibGVWZXJ0aWNhbEJhcicsIFs4NzQyXV0sIFsnTm90RWxlbWVudCcsIFs4NzEzXV0sIFsnTm90RXF1YWwnLCBbODgwMF1dLCBbJ05vdEVxdWFsVGlsZGUnLCBbODc3MCwgODI0XV0sIFsnTm90RXhpc3RzJywgWzg3MDhdXSwgWydOb3RHcmVhdGVyJywgWzg4MTVdXSwgWydOb3RHcmVhdGVyRXF1YWwnLCBbODgxN11dLCBbJ05vdEdyZWF0ZXJGdWxsRXF1YWwnLCBbODgwNywgODI0XV0sIFsnTm90R3JlYXRlckdyZWF0ZXInLCBbODgxMSwgODI0XV0sIFsnTm90R3JlYXRlckxlc3MnLCBbODgyNV1dLCBbJ05vdEdyZWF0ZXJTbGFudEVxdWFsJywgWzEwODc4LCA4MjRdXSwgWydOb3RHcmVhdGVyVGlsZGUnLCBbODgyMV1dLCBbJ05vdEh1bXBEb3duSHVtcCcsIFs4NzgyLCA4MjRdXSwgWydOb3RIdW1wRXF1YWwnLCBbODc4MywgODI0XV0sIFsnbm90aW4nLCBbODcxM11dLCBbJ25vdGluZG90JywgWzg5NDksIDgyNF1dLCBbJ25vdGluRScsIFs4OTUzLCA4MjRdXSwgWydub3RpbnZhJywgWzg3MTNdXSwgWydub3RpbnZiJywgWzg5NTFdXSwgWydub3RpbnZjJywgWzg5NTBdXSwgWydOb3RMZWZ0VHJpYW5nbGVCYXInLCBbMTA3MDMsIDgyNF1dLCBbJ05vdExlZnRUcmlhbmdsZScsIFs4OTM4XV0sIFsnTm90TGVmdFRyaWFuZ2xlRXF1YWwnLCBbODk0MF1dLCBbJ05vdExlc3MnLCBbODgxNF1dLCBbJ05vdExlc3NFcXVhbCcsIFs4ODE2XV0sIFsnTm90TGVzc0dyZWF0ZXInLCBbODgyNF1dLCBbJ05vdExlc3NMZXNzJywgWzg4MTAsIDgyNF1dLCBbJ05vdExlc3NTbGFudEVxdWFsJywgWzEwODc3LCA4MjRdXSwgWydOb3RMZXNzVGlsZGUnLCBbODgyMF1dLCBbJ05vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyJywgWzEwOTE0LCA4MjRdXSwgWydOb3ROZXN0ZWRMZXNzTGVzcycsIFsxMDkxMywgODI0XV0sIFsnbm90bmknLCBbODcxNl1dLCBbJ25vdG5pdmEnLCBbODcxNl1dLCBbJ25vdG5pdmInLCBbODk1OF1dLCBbJ25vdG5pdmMnLCBbODk1N11dLCBbJ05vdFByZWNlZGVzJywgWzg4MzJdXSwgWydOb3RQcmVjZWRlc0VxdWFsJywgWzEwOTI3LCA4MjRdXSwgWydOb3RQcmVjZWRlc1NsYW50RXF1YWwnLCBbODkyOF1dLCBbJ05vdFJldmVyc2VFbGVtZW50JywgWzg3MTZdXSwgWydOb3RSaWdodFRyaWFuZ2xlQmFyJywgWzEwNzA0LCA4MjRdXSwgWydOb3RSaWdodFRyaWFuZ2xlJywgWzg5MzldXSwgWydOb3RSaWdodFRyaWFuZ2xlRXF1YWwnLCBbODk0MV1dLCBbJ05vdFNxdWFyZVN1YnNldCcsIFs4ODQ3LCA4MjRdXSwgWydOb3RTcXVhcmVTdWJzZXRFcXVhbCcsIFs4OTMwXV0sIFsnTm90U3F1YXJlU3VwZXJzZXQnLCBbODg0OCwgODI0XV0sIFsnTm90U3F1YXJlU3VwZXJzZXRFcXVhbCcsIFs4OTMxXV0sIFsnTm90U3Vic2V0JywgWzg4MzQsIDg0MDJdXSwgWydOb3RTdWJzZXRFcXVhbCcsIFs4ODQwXV0sIFsnTm90U3VjY2VlZHMnLCBbODgzM11dLCBbJ05vdFN1Y2NlZWRzRXF1YWwnLCBbMTA5MjgsIDgyNF1dLCBbJ05vdFN1Y2NlZWRzU2xhbnRFcXVhbCcsIFs4OTI5XV0sIFsnTm90U3VjY2VlZHNUaWxkZScsIFs4ODMxLCA4MjRdXSwgWydOb3RTdXBlcnNldCcsIFs4ODM1LCA4NDAyXV0sIFsnTm90U3VwZXJzZXRFcXVhbCcsIFs4ODQxXV0sIFsnTm90VGlsZGUnLCBbODc2OV1dLCBbJ05vdFRpbGRlRXF1YWwnLCBbODc3Ml1dLCBbJ05vdFRpbGRlRnVsbEVxdWFsJywgWzg3NzVdXSwgWydOb3RUaWxkZVRpbGRlJywgWzg3NzddXSwgWydOb3RWZXJ0aWNhbEJhcicsIFs4NzQwXV0sIFsnbnBhcmFsbGVsJywgWzg3NDJdXSwgWyducGFyJywgWzg3NDJdXSwgWyducGFyc2wnLCBbMTEwMDUsIDg0MjFdXSwgWyducGFydCcsIFs4NzA2LCA4MjRdXSwgWyducG9saW50JywgWzEwNzcyXV0sIFsnbnByJywgWzg4MzJdXSwgWyducHJjdWUnLCBbODkyOF1dLCBbJ25wcmVjJywgWzg4MzJdXSwgWyducHJlY2VxJywgWzEwOTI3LCA4MjRdXSwgWyducHJlJywgWzEwOTI3LCA4MjRdXSwgWyducmFycmMnLCBbMTA1NDcsIDgyNF1dLCBbJ25yYXJyJywgWzg2MDNdXSwgWyduckFycicsIFs4NjU1XV0sIFsnbnJhcnJ3JywgWzg2MDUsIDgyNF1dLCBbJ25yaWdodGFycm93JywgWzg2MDNdXSwgWyduUmlnaHRhcnJvdycsIFs4NjU1XV0sIFsnbnJ0cmknLCBbODkzOV1dLCBbJ25ydHJpZScsIFs4OTQxXV0sIFsnbnNjJywgWzg4MzNdXSwgWyduc2NjdWUnLCBbODkyOV1dLCBbJ25zY2UnLCBbMTA5MjgsIDgyNF1dLCBbJ05zY3InLCBbMTE5OTc3XV0sIFsnbnNjcicsIFsxMjAwMDNdXSwgWyduc2hvcnRtaWQnLCBbODc0MF1dLCBbJ25zaG9ydHBhcmFsbGVsJywgWzg3NDJdXSwgWyduc2ltJywgWzg3NjldXSwgWyduc2ltZScsIFs4NzcyXV0sIFsnbnNpbWVxJywgWzg3NzJdXSwgWyduc21pZCcsIFs4NzQwXV0sIFsnbnNwYXInLCBbODc0Ml1dLCBbJ25zcXN1YmUnLCBbODkzMF1dLCBbJ25zcXN1cGUnLCBbODkzMV1dLCBbJ25zdWInLCBbODgzNl1dLCBbJ25zdWJFJywgWzEwOTQ5LCA4MjRdXSwgWyduc3ViZScsIFs4ODQwXV0sIFsnbnN1YnNldCcsIFs4ODM0LCA4NDAyXV0sIFsnbnN1YnNldGVxJywgWzg4NDBdXSwgWyduc3Vic2V0ZXFxJywgWzEwOTQ5LCA4MjRdXSwgWyduc3VjYycsIFs4ODMzXV0sIFsnbnN1Y2NlcScsIFsxMDkyOCwgODI0XV0sIFsnbnN1cCcsIFs4ODM3XV0sIFsnbnN1cEUnLCBbMTA5NTAsIDgyNF1dLCBbJ25zdXBlJywgWzg4NDFdXSwgWyduc3Vwc2V0JywgWzg4MzUsIDg0MDJdXSwgWyduc3Vwc2V0ZXEnLCBbODg0MV1dLCBbJ25zdXBzZXRlcXEnLCBbMTA5NTAsIDgyNF1dLCBbJ250Z2wnLCBbODgyNV1dLCBbJ050aWxkZScsIFsyMDldXSwgWydudGlsZGUnLCBbMjQxXV0sIFsnbnRsZycsIFs4ODI0XV0sIFsnbnRyaWFuZ2xlbGVmdCcsIFs4OTM4XV0sIFsnbnRyaWFuZ2xlbGVmdGVxJywgWzg5NDBdXSwgWydudHJpYW5nbGVyaWdodCcsIFs4OTM5XV0sIFsnbnRyaWFuZ2xlcmlnaHRlcScsIFs4OTQxXV0sIFsnTnUnLCBbOTI1XV0sIFsnbnUnLCBbOTU3XV0sIFsnbnVtJywgWzM1XV0sIFsnbnVtZXJvJywgWzg0NzBdXSwgWydudW1zcCcsIFs4MTk5XV0sIFsnbnZhcCcsIFs4NzgxLCA4NDAyXV0sIFsnbnZkYXNoJywgWzg4NzZdXSwgWydudkRhc2gnLCBbODg3N11dLCBbJ25WZGFzaCcsIFs4ODc4XV0sIFsnblZEYXNoJywgWzg4NzldXSwgWydudmdlJywgWzg4MDUsIDg0MDJdXSwgWydudmd0JywgWzYyLCA4NDAyXV0sIFsnbnZIYXJyJywgWzEwNTAwXV0sIFsnbnZpbmZpbicsIFsxMDcxOF1dLCBbJ252bEFycicsIFsxMDQ5OF1dLCBbJ252bGUnLCBbODgwNCwgODQwMl1dLCBbJ252bHQnLCBbNjAsIDg0MDJdXSwgWydudmx0cmllJywgWzg4ODQsIDg0MDJdXSwgWydudnJBcnInLCBbMTA0OTldXSwgWydudnJ0cmllJywgWzg4ODUsIDg0MDJdXSwgWydudnNpbScsIFs4NzY0LCA4NDAyXV0sIFsnbndhcmhrJywgWzEwNTMxXV0sIFsnbndhcnInLCBbODU5OF1dLCBbJ253QXJyJywgWzg2NjJdXSwgWydud2Fycm93JywgWzg1OThdXSwgWydud25lYXInLCBbMTA1MzVdXSwgWydPYWN1dGUnLCBbMjExXV0sIFsnb2FjdXRlJywgWzI0M11dLCBbJ29hc3QnLCBbODg1OV1dLCBbJ09jaXJjJywgWzIxMl1dLCBbJ29jaXJjJywgWzI0NF1dLCBbJ29jaXInLCBbODg1OF1dLCBbJ09jeScsIFsxMDU0XV0sIFsnb2N5JywgWzEwODZdXSwgWydvZGFzaCcsIFs4ODYxXV0sIFsnT2RibGFjJywgWzMzNl1dLCBbJ29kYmxhYycsIFszMzddXSwgWydvZGl2JywgWzEwODA4XV0sIFsnb2RvdCcsIFs4ODU3XV0sIFsnb2Rzb2xkJywgWzEwNjg0XV0sIFsnT0VsaWcnLCBbMzM4XV0sIFsnb2VsaWcnLCBbMzM5XV0sIFsnb2ZjaXInLCBbMTA2ODddXSwgWydPZnInLCBbMTIwMDgyXV0sIFsnb2ZyJywgWzEyMDEwOF1dLCBbJ29nb24nLCBbNzMxXV0sIFsnT2dyYXZlJywgWzIxMF1dLCBbJ29ncmF2ZScsIFsyNDJdXSwgWydvZ3QnLCBbMTA2ODldXSwgWydvaGJhcicsIFsxMDY3N11dLCBbJ29obScsIFs5MzddXSwgWydvaW50JywgWzg3NTBdXSwgWydvbGFycicsIFs4NjM0XV0sIFsnb2xjaXInLCBbMTA2ODZdXSwgWydvbGNyb3NzJywgWzEwNjgzXV0sIFsnb2xpbmUnLCBbODI1NF1dLCBbJ29sdCcsIFsxMDY4OF1dLCBbJ09tYWNyJywgWzMzMl1dLCBbJ29tYWNyJywgWzMzM11dLCBbJ09tZWdhJywgWzkzN11dLCBbJ29tZWdhJywgWzk2OV1dLCBbJ09taWNyb24nLCBbOTI3XV0sIFsnb21pY3JvbicsIFs5NTldXSwgWydvbWlkJywgWzEwNjc4XV0sIFsnb21pbnVzJywgWzg4NTRdXSwgWydPb3BmJywgWzEyMDEzNF1dLCBbJ29vcGYnLCBbMTIwMTYwXV0sIFsnb3BhcicsIFsxMDY3OV1dLCBbJ09wZW5DdXJseURvdWJsZVF1b3RlJywgWzgyMjBdXSwgWydPcGVuQ3VybHlRdW90ZScsIFs4MjE2XV0sIFsnb3BlcnAnLCBbMTA2ODFdXSwgWydvcGx1cycsIFs4ODUzXV0sIFsnb3JhcnInLCBbODYzNV1dLCBbJ09yJywgWzEwODM2XV0sIFsnb3InLCBbODc0NF1dLCBbJ29yZCcsIFsxMDg0NV1dLCBbJ29yZGVyJywgWzg1MDBdXSwgWydvcmRlcm9mJywgWzg1MDBdXSwgWydvcmRmJywgWzE3MF1dLCBbJ29yZG0nLCBbMTg2XV0sIFsnb3JpZ29mJywgWzg4ODZdXSwgWydvcm9yJywgWzEwODM4XV0sIFsnb3JzbG9wZScsIFsxMDgzOV1dLCBbJ29ydicsIFsxMDg0M11dLCBbJ29TJywgWzk0MTZdXSwgWydPc2NyJywgWzExOTk3OF1dLCBbJ29zY3InLCBbODUwMF1dLCBbJ09zbGFzaCcsIFsyMTZdXSwgWydvc2xhc2gnLCBbMjQ4XV0sIFsnb3NvbCcsIFs4ODU2XV0sIFsnT3RpbGRlJywgWzIxM11dLCBbJ290aWxkZScsIFsyNDVdXSwgWydvdGltZXNhcycsIFsxMDgwNl1dLCBbJ090aW1lcycsIFsxMDgwN11dLCBbJ290aW1lcycsIFs4ODU1XV0sIFsnT3VtbCcsIFsyMTRdXSwgWydvdW1sJywgWzI0Nl1dLCBbJ292YmFyJywgWzkwMjFdXSwgWydPdmVyQmFyJywgWzgyNTRdXSwgWydPdmVyQnJhY2UnLCBbOTE4Ml1dLCBbJ092ZXJCcmFja2V0JywgWzkxNDBdXSwgWydPdmVyUGFyZW50aGVzaXMnLCBbOTE4MF1dLCBbJ3BhcmEnLCBbMTgyXV0sIFsncGFyYWxsZWwnLCBbODc0MV1dLCBbJ3BhcicsIFs4NzQxXV0sIFsncGFyc2ltJywgWzEwOTk1XV0sIFsncGFyc2wnLCBbMTEwMDVdXSwgWydwYXJ0JywgWzg3MDZdXSwgWydQYXJ0aWFsRCcsIFs4NzA2XV0sIFsnUGN5JywgWzEwNTVdXSwgWydwY3knLCBbMTA4N11dLCBbJ3BlcmNudCcsIFszN11dLCBbJ3BlcmlvZCcsIFs0Nl1dLCBbJ3Blcm1pbCcsIFs4MjQwXV0sIFsncGVycCcsIFs4ODY5XV0sIFsncGVydGVuaycsIFs4MjQxXV0sIFsnUGZyJywgWzEyMDA4M11dLCBbJ3BmcicsIFsxMjAxMDldXSwgWydQaGknLCBbOTM0XV0sIFsncGhpJywgWzk2Nl1dLCBbJ3BoaXYnLCBbOTgxXV0sIFsncGhtbWF0JywgWzg0OTldXSwgWydwaG9uZScsIFs5NzQyXV0sIFsnUGknLCBbOTI4XV0sIFsncGknLCBbOTYwXV0sIFsncGl0Y2hmb3JrJywgWzg5MTZdXSwgWydwaXYnLCBbOTgyXV0sIFsncGxhbmNrJywgWzg0NjNdXSwgWydwbGFuY2toJywgWzg0NjJdXSwgWydwbGFua3YnLCBbODQ2M11dLCBbJ3BsdXNhY2lyJywgWzEwNzg3XV0sIFsncGx1c2InLCBbODg2Ml1dLCBbJ3BsdXNjaXInLCBbMTA3ODZdXSwgWydwbHVzJywgWzQzXV0sIFsncGx1c2RvJywgWzg3MjRdXSwgWydwbHVzZHUnLCBbMTA3ODldXSwgWydwbHVzZScsIFsxMDg2Nl1dLCBbJ1BsdXNNaW51cycsIFsxNzddXSwgWydwbHVzbW4nLCBbMTc3XV0sIFsncGx1c3NpbScsIFsxMDc5MF1dLCBbJ3BsdXN0d28nLCBbMTA3OTFdXSwgWydwbScsIFsxNzddXSwgWydQb2luY2FyZXBsYW5lJywgWzg0NjBdXSwgWydwb2ludGludCcsIFsxMDc3M11dLCBbJ3BvcGYnLCBbMTIwMTYxXV0sIFsnUG9wZicsIFs4NDczXV0sIFsncG91bmQnLCBbMTYzXV0sIFsncHJhcCcsIFsxMDkzNV1dLCBbJ1ByJywgWzEwOTM5XV0sIFsncHInLCBbODgyNl1dLCBbJ3ByY3VlJywgWzg4MjhdXSwgWydwcmVjYXBwcm94JywgWzEwOTM1XV0sIFsncHJlYycsIFs4ODI2XV0sIFsncHJlY2N1cmx5ZXEnLCBbODgyOF1dLCBbJ1ByZWNlZGVzJywgWzg4MjZdXSwgWydQcmVjZWRlc0VxdWFsJywgWzEwOTI3XV0sIFsnUHJlY2VkZXNTbGFudEVxdWFsJywgWzg4MjhdXSwgWydQcmVjZWRlc1RpbGRlJywgWzg4MzBdXSwgWydwcmVjZXEnLCBbMTA5MjddXSwgWydwcmVjbmFwcHJveCcsIFsxMDkzN11dLCBbJ3ByZWNuZXFxJywgWzEwOTMzXV0sIFsncHJlY25zaW0nLCBbODkzNl1dLCBbJ3ByZScsIFsxMDkyN11dLCBbJ3ByRScsIFsxMDkzMV1dLCBbJ3ByZWNzaW0nLCBbODgzMF1dLCBbJ3ByaW1lJywgWzgyNDJdXSwgWydQcmltZScsIFs4MjQzXV0sIFsncHJpbWVzJywgWzg0NzNdXSwgWydwcm5hcCcsIFsxMDkzN11dLCBbJ3BybkUnLCBbMTA5MzNdXSwgWydwcm5zaW0nLCBbODkzNl1dLCBbJ3Byb2QnLCBbODcxOV1dLCBbJ1Byb2R1Y3QnLCBbODcxOV1dLCBbJ3Byb2ZhbGFyJywgWzkwMDZdXSwgWydwcm9mbGluZScsIFs4OTc4XV0sIFsncHJvZnN1cmYnLCBbODk3OV1dLCBbJ3Byb3AnLCBbODczM11dLCBbJ1Byb3BvcnRpb25hbCcsIFs4NzMzXV0sIFsnUHJvcG9ydGlvbicsIFs4NzU5XV0sIFsncHJvcHRvJywgWzg3MzNdXSwgWydwcnNpbScsIFs4ODMwXV0sIFsncHJ1cmVsJywgWzg4ODBdXSwgWydQc2NyJywgWzExOTk3OV1dLCBbJ3BzY3InLCBbMTIwMDA1XV0sIFsnUHNpJywgWzkzNl1dLCBbJ3BzaScsIFs5NjhdXSwgWydwdW5jc3AnLCBbODIwMF1dLCBbJ1FmcicsIFsxMjAwODRdXSwgWydxZnInLCBbMTIwMTEwXV0sIFsncWludCcsIFsxMDc2NF1dLCBbJ3FvcGYnLCBbMTIwMTYyXV0sIFsnUW9wZicsIFs4NDc0XV0sIFsncXByaW1lJywgWzgyNzldXSwgWydRc2NyJywgWzExOTk4MF1dLCBbJ3FzY3InLCBbMTIwMDA2XV0sIFsncXVhdGVybmlvbnMnLCBbODQ2MV1dLCBbJ3F1YXRpbnQnLCBbMTA3NzRdXSwgWydxdWVzdCcsIFs2M11dLCBbJ3F1ZXN0ZXEnLCBbODc5OV1dLCBbJ3F1b3QnLCBbMzRdXSwgWydRVU9UJywgWzM0XV0sIFsnckFhcnInLCBbODY2N11dLCBbJ3JhY2UnLCBbODc2NSwgODE3XV0sIFsnUmFjdXRlJywgWzM0MF1dLCBbJ3JhY3V0ZScsIFszNDFdXSwgWydyYWRpYycsIFs4NzMwXV0sIFsncmFlbXB0eXYnLCBbMTA2NzVdXSwgWydyYW5nJywgWzEwMjE3XV0sIFsnUmFuZycsIFsxMDIxOV1dLCBbJ3JhbmdkJywgWzEwNjQyXV0sIFsncmFuZ2UnLCBbMTA2NjFdXSwgWydyYW5nbGUnLCBbMTAyMTddXSwgWydyYXF1bycsIFsxODddXSwgWydyYXJyYXAnLCBbMTA2MTNdXSwgWydyYXJyYicsIFs4Njc3XV0sIFsncmFycmJmcycsIFsxMDUyOF1dLCBbJ3JhcnJjJywgWzEwNTQ3XV0sIFsncmFycicsIFs4NTk0XV0sIFsnUmFycicsIFs4NjA4XV0sIFsnckFycicsIFs4NjU4XV0sIFsncmFycmZzJywgWzEwNTI2XV0sIFsncmFycmhrJywgWzg2MThdXSwgWydyYXJybHAnLCBbODYyMF1dLCBbJ3JhcnJwbCcsIFsxMDU2NV1dLCBbJ3JhcnJzaW0nLCBbMTA2MTJdXSwgWydSYXJydGwnLCBbMTA1MThdXSwgWydyYXJydGwnLCBbODYxMV1dLCBbJ3JhcnJ3JywgWzg2MDVdXSwgWydyYXRhaWwnLCBbMTA1MjJdXSwgWydyQXRhaWwnLCBbMTA1MjRdXSwgWydyYXRpbycsIFs4NzU4XV0sIFsncmF0aW9uYWxzJywgWzg0NzRdXSwgWydyYmFycicsIFsxMDUwOV1dLCBbJ3JCYXJyJywgWzEwNTExXV0sIFsnUkJhcnInLCBbMTA1MTJdXSwgWydyYmJyaycsIFsxMDA5OV1dLCBbJ3JicmFjZScsIFsxMjVdXSwgWydyYnJhY2snLCBbOTNdXSwgWydyYnJrZScsIFsxMDYzNl1dLCBbJ3JicmtzbGQnLCBbMTA2MzhdXSwgWydyYnJrc2x1JywgWzEwNjQwXV0sIFsnUmNhcm9uJywgWzM0NF1dLCBbJ3JjYXJvbicsIFszNDVdXSwgWydSY2VkaWwnLCBbMzQyXV0sIFsncmNlZGlsJywgWzM0M11dLCBbJ3JjZWlsJywgWzg5NjldXSwgWydyY3ViJywgWzEyNV1dLCBbJ1JjeScsIFsxMDU2XV0sIFsncmN5JywgWzEwODhdXSwgWydyZGNhJywgWzEwNTUxXV0sIFsncmRsZGhhcicsIFsxMDYwMV1dLCBbJ3JkcXVvJywgWzgyMjFdXSwgWydyZHF1b3InLCBbODIyMV1dLCBbJ3Jkc2gnLCBbODYyN11dLCBbJ3JlYWwnLCBbODQ3Nl1dLCBbJ3JlYWxpbmUnLCBbODQ3NV1dLCBbJ3JlYWxwYXJ0JywgWzg0NzZdXSwgWydyZWFscycsIFs4NDc3XV0sIFsnUmUnLCBbODQ3Nl1dLCBbJ3JlY3QnLCBbOTY0NV1dLCBbJ3JlZycsIFsxNzRdXSwgWydSRUcnLCBbMTc0XV0sIFsnUmV2ZXJzZUVsZW1lbnQnLCBbODcxNV1dLCBbJ1JldmVyc2VFcXVpbGlicml1bScsIFs4NjUxXV0sIFsnUmV2ZXJzZVVwRXF1aWxpYnJpdW0nLCBbMTA2MDddXSwgWydyZmlzaHQnLCBbMTA2MjFdXSwgWydyZmxvb3InLCBbODk3MV1dLCBbJ3JmcicsIFsxMjAxMTFdXSwgWydSZnInLCBbODQ3Nl1dLCBbJ3JIYXInLCBbMTA1OTZdXSwgWydyaGFyZCcsIFs4NjQxXV0sIFsncmhhcnUnLCBbODY0MF1dLCBbJ3JoYXJ1bCcsIFsxMDYwNF1dLCBbJ1JobycsIFs5MjldXSwgWydyaG8nLCBbOTYxXV0sIFsncmhvdicsIFsxMDA5XV0sIFsnUmlnaHRBbmdsZUJyYWNrZXQnLCBbMTAyMTddXSwgWydSaWdodEFycm93QmFyJywgWzg2NzddXSwgWydyaWdodGFycm93JywgWzg1OTRdXSwgWydSaWdodEFycm93JywgWzg1OTRdXSwgWydSaWdodGFycm93JywgWzg2NThdXSwgWydSaWdodEFycm93TGVmdEFycm93JywgWzg2NDRdXSwgWydyaWdodGFycm93dGFpbCcsIFs4NjExXV0sIFsnUmlnaHRDZWlsaW5nJywgWzg5NjldXSwgWydSaWdodERvdWJsZUJyYWNrZXQnLCBbMTAyMTVdXSwgWydSaWdodERvd25UZWVWZWN0b3InLCBbMTA1ODldXSwgWydSaWdodERvd25WZWN0b3JCYXInLCBbMTA1ODFdXSwgWydSaWdodERvd25WZWN0b3InLCBbODY0Ml1dLCBbJ1JpZ2h0Rmxvb3InLCBbODk3MV1dLCBbJ3JpZ2h0aGFycG9vbmRvd24nLCBbODY0MV1dLCBbJ3JpZ2h0aGFycG9vbnVwJywgWzg2NDBdXSwgWydyaWdodGxlZnRhcnJvd3MnLCBbODY0NF1dLCBbJ3JpZ2h0bGVmdGhhcnBvb25zJywgWzg2NTJdXSwgWydyaWdodHJpZ2h0YXJyb3dzJywgWzg2NDldXSwgWydyaWdodHNxdWlnYXJyb3cnLCBbODYwNV1dLCBbJ1JpZ2h0VGVlQXJyb3cnLCBbODYxNF1dLCBbJ1JpZ2h0VGVlJywgWzg4NjZdXSwgWydSaWdodFRlZVZlY3RvcicsIFsxMDU4N11dLCBbJ3JpZ2h0dGhyZWV0aW1lcycsIFs4OTA4XV0sIFsnUmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNF1dLCBbJ1JpZ2h0VHJpYW5nbGUnLCBbODg4M11dLCBbJ1JpZ2h0VHJpYW5nbGVFcXVhbCcsIFs4ODg1XV0sIFsnUmlnaHRVcERvd25WZWN0b3InLCBbMTA1NzVdXSwgWydSaWdodFVwVGVlVmVjdG9yJywgWzEwNTg4XV0sIFsnUmlnaHRVcFZlY3RvckJhcicsIFsxMDU4MF1dLCBbJ1JpZ2h0VXBWZWN0b3InLCBbODYzOF1dLCBbJ1JpZ2h0VmVjdG9yQmFyJywgWzEwNTc5XV0sIFsnUmlnaHRWZWN0b3InLCBbODY0MF1dLCBbJ3JpbmcnLCBbNzMwXV0sIFsncmlzaW5nZG90c2VxJywgWzg3ODddXSwgWydybGFycicsIFs4NjQ0XV0sIFsncmxoYXInLCBbODY1Ml1dLCBbJ3JsbScsIFs4MjA3XV0sIFsncm1vdXN0YWNoZScsIFs5MTM3XV0sIFsncm1vdXN0JywgWzkxMzddXSwgWydybm1pZCcsIFsxMDk5MF1dLCBbJ3JvYW5nJywgWzEwMjIxXV0sIFsncm9hcnInLCBbODcwMl1dLCBbJ3JvYnJrJywgWzEwMjE1XV0sIFsncm9wYXInLCBbMTA2MzBdXSwgWydyb3BmJywgWzEyMDE2M11dLCBbJ1JvcGYnLCBbODQ3N11dLCBbJ3JvcGx1cycsIFsxMDc5OF1dLCBbJ3JvdGltZXMnLCBbMTA4MDVdXSwgWydSb3VuZEltcGxpZXMnLCBbMTA2MDhdXSwgWydycGFyJywgWzQxXV0sIFsncnBhcmd0JywgWzEwNjQ0XV0sIFsncnBwb2xpbnQnLCBbMTA3NzBdXSwgWydycmFycicsIFs4NjQ5XV0sIFsnUnJpZ2h0YXJyb3cnLCBbODY2N11dLCBbJ3JzYXF1bycsIFs4MjUwXV0sIFsncnNjcicsIFsxMjAwMDddXSwgWydSc2NyJywgWzg0NzVdXSwgWydyc2gnLCBbODYyNV1dLCBbJ1JzaCcsIFs4NjI1XV0sIFsncnNxYicsIFs5M11dLCBbJ3JzcXVvJywgWzgyMTddXSwgWydyc3F1b3InLCBbODIxN11dLCBbJ3J0aHJlZScsIFs4OTA4XV0sIFsncnRpbWVzJywgWzg5MDZdXSwgWydydHJpJywgWzk2NTddXSwgWydydHJpZScsIFs4ODg1XV0sIFsncnRyaWYnLCBbOTY1Nl1dLCBbJ3J0cmlsdHJpJywgWzEwNzAyXV0sIFsnUnVsZURlbGF5ZWQnLCBbMTA3NDBdXSwgWydydWx1aGFyJywgWzEwNjAwXV0sIFsncngnLCBbODQ3OF1dLCBbJ1NhY3V0ZScsIFszNDZdXSwgWydzYWN1dGUnLCBbMzQ3XV0sIFsnc2JxdW8nLCBbODIxOF1dLCBbJ3NjYXAnLCBbMTA5MzZdXSwgWydTY2Fyb24nLCBbMzUyXV0sIFsnc2Nhcm9uJywgWzM1M11dLCBbJ1NjJywgWzEwOTQwXV0sIFsnc2MnLCBbODgyN11dLCBbJ3NjY3VlJywgWzg4MjldXSwgWydzY2UnLCBbMTA5MjhdXSwgWydzY0UnLCBbMTA5MzJdXSwgWydTY2VkaWwnLCBbMzUwXV0sIFsnc2NlZGlsJywgWzM1MV1dLCBbJ1NjaXJjJywgWzM0OF1dLCBbJ3NjaXJjJywgWzM0OV1dLCBbJ3NjbmFwJywgWzEwOTM4XV0sIFsnc2NuRScsIFsxMDkzNF1dLCBbJ3NjbnNpbScsIFs4OTM3XV0sIFsnc2Nwb2xpbnQnLCBbMTA3NzFdXSwgWydzY3NpbScsIFs4ODMxXV0sIFsnU2N5JywgWzEwNTddXSwgWydzY3knLCBbMTA4OV1dLCBbJ3Nkb3RiJywgWzg4NjVdXSwgWydzZG90JywgWzg5MDFdXSwgWydzZG90ZScsIFsxMDg1NF1dLCBbJ3NlYXJoaycsIFsxMDUzM11dLCBbJ3NlYXJyJywgWzg2MDBdXSwgWydzZUFycicsIFs4NjY0XV0sIFsnc2VhcnJvdycsIFs4NjAwXV0sIFsnc2VjdCcsIFsxNjddXSwgWydzZW1pJywgWzU5XV0sIFsnc2Vzd2FyJywgWzEwNTM3XV0sIFsnc2V0bWludXMnLCBbODcyNl1dLCBbJ3NldG1uJywgWzg3MjZdXSwgWydzZXh0JywgWzEwMDM4XV0sIFsnU2ZyJywgWzEyMDA4Nl1dLCBbJ3NmcicsIFsxMjAxMTJdXSwgWydzZnJvd24nLCBbODk5NF1dLCBbJ3NoYXJwJywgWzk4MzldXSwgWydTSENIY3knLCBbMTA2NV1dLCBbJ3NoY2hjeScsIFsxMDk3XV0sIFsnU0hjeScsIFsxMDY0XV0sIFsnc2hjeScsIFsxMDk2XV0sIFsnU2hvcnREb3duQXJyb3cnLCBbODU5NV1dLCBbJ1Nob3J0TGVmdEFycm93JywgWzg1OTJdXSwgWydzaG9ydG1pZCcsIFs4NzM5XV0sIFsnc2hvcnRwYXJhbGxlbCcsIFs4NzQxXV0sIFsnU2hvcnRSaWdodEFycm93JywgWzg1OTRdXSwgWydTaG9ydFVwQXJyb3cnLCBbODU5M11dLCBbJ3NoeScsIFsxNzNdXSwgWydTaWdtYScsIFs5MzFdXSwgWydzaWdtYScsIFs5NjNdXSwgWydzaWdtYWYnLCBbOTYyXV0sIFsnc2lnbWF2JywgWzk2Ml1dLCBbJ3NpbScsIFs4NzY0XV0sIFsnc2ltZG90JywgWzEwODU4XV0sIFsnc2ltZScsIFs4NzcxXV0sIFsnc2ltZXEnLCBbODc3MV1dLCBbJ3NpbWcnLCBbMTA5MTBdXSwgWydzaW1nRScsIFsxMDkxMl1dLCBbJ3NpbWwnLCBbMTA5MDldXSwgWydzaW1sRScsIFsxMDkxMV1dLCBbJ3NpbW5lJywgWzg3NzRdXSwgWydzaW1wbHVzJywgWzEwNzg4XV0sIFsnc2ltcmFycicsIFsxMDYxMF1dLCBbJ3NsYXJyJywgWzg1OTJdXSwgWydTbWFsbENpcmNsZScsIFs4NzI4XV0sIFsnc21hbGxzZXRtaW51cycsIFs4NzI2XV0sIFsnc21hc2hwJywgWzEwODAzXV0sIFsnc21lcGFyc2wnLCBbMTA3MjRdXSwgWydzbWlkJywgWzg3MzldXSwgWydzbWlsZScsIFs4OTk1XV0sIFsnc210JywgWzEwOTIyXV0sIFsnc210ZScsIFsxMDkyNF1dLCBbJ3NtdGVzJywgWzEwOTI0LCA2NTAyNF1dLCBbJ1NPRlRjeScsIFsxMDY4XV0sIFsnc29mdGN5JywgWzExMDBdXSwgWydzb2xiYXInLCBbOTAyM11dLCBbJ3NvbGInLCBbMTA2OTJdXSwgWydzb2wnLCBbNDddXSwgWydTb3BmJywgWzEyMDEzOF1dLCBbJ3NvcGYnLCBbMTIwMTY0XV0sIFsnc3BhZGVzJywgWzk4MjRdXSwgWydzcGFkZXN1aXQnLCBbOTgyNF1dLCBbJ3NwYXInLCBbODc0MV1dLCBbJ3NxY2FwJywgWzg4NTFdXSwgWydzcWNhcHMnLCBbODg1MSwgNjUwMjRdXSwgWydzcWN1cCcsIFs4ODUyXV0sIFsnc3FjdXBzJywgWzg4NTIsIDY1MDI0XV0sIFsnU3FydCcsIFs4NzMwXV0sIFsnc3FzdWInLCBbODg0N11dLCBbJ3Nxc3ViZScsIFs4ODQ5XV0sIFsnc3FzdWJzZXQnLCBbODg0N11dLCBbJ3Nxc3Vic2V0ZXEnLCBbODg0OV1dLCBbJ3Nxc3VwJywgWzg4NDhdXSwgWydzcXN1cGUnLCBbODg1MF1dLCBbJ3Nxc3Vwc2V0JywgWzg4NDhdXSwgWydzcXN1cHNldGVxJywgWzg4NTBdXSwgWydzcXVhcmUnLCBbOTYzM11dLCBbJ1NxdWFyZScsIFs5NjMzXV0sIFsnU3F1YXJlSW50ZXJzZWN0aW9uJywgWzg4NTFdXSwgWydTcXVhcmVTdWJzZXQnLCBbODg0N11dLCBbJ1NxdWFyZVN1YnNldEVxdWFsJywgWzg4NDldXSwgWydTcXVhcmVTdXBlcnNldCcsIFs4ODQ4XV0sIFsnU3F1YXJlU3VwZXJzZXRFcXVhbCcsIFs4ODUwXV0sIFsnU3F1YXJlVW5pb24nLCBbODg1Ml1dLCBbJ3NxdWFyZicsIFs5NjQyXV0sIFsnc3F1JywgWzk2MzNdXSwgWydzcXVmJywgWzk2NDJdXSwgWydzcmFycicsIFs4NTk0XV0sIFsnU3NjcicsIFsxMTk5ODJdXSwgWydzc2NyJywgWzEyMDAwOF1dLCBbJ3NzZXRtbicsIFs4NzI2XV0sIFsnc3NtaWxlJywgWzg5OTVdXSwgWydzc3RhcmYnLCBbODkwMl1dLCBbJ1N0YXInLCBbODkwMl1dLCBbJ3N0YXInLCBbOTczNF1dLCBbJ3N0YXJmJywgWzk3MzNdXSwgWydzdHJhaWdodGVwc2lsb24nLCBbMTAxM11dLCBbJ3N0cmFpZ2h0cGhpJywgWzk4MV1dLCBbJ3N0cm5zJywgWzE3NV1dLCBbJ3N1YicsIFs4ODM0XV0sIFsnU3ViJywgWzg5MTJdXSwgWydzdWJkb3QnLCBbMTA5NDFdXSwgWydzdWJFJywgWzEwOTQ5XV0sIFsnc3ViZScsIFs4ODM4XV0sIFsnc3ViZWRvdCcsIFsxMDk0N11dLCBbJ3N1Ym11bHQnLCBbMTA5NDVdXSwgWydzdWJuRScsIFsxMDk1NV1dLCBbJ3N1Ym5lJywgWzg4NDJdXSwgWydzdWJwbHVzJywgWzEwOTQzXV0sIFsnc3VicmFycicsIFsxMDYxN11dLCBbJ3N1YnNldCcsIFs4ODM0XV0sIFsnU3Vic2V0JywgWzg5MTJdXSwgWydzdWJzZXRlcScsIFs4ODM4XV0sIFsnc3Vic2V0ZXFxJywgWzEwOTQ5XV0sIFsnU3Vic2V0RXF1YWwnLCBbODgzOF1dLCBbJ3N1YnNldG5lcScsIFs4ODQyXV0sIFsnc3Vic2V0bmVxcScsIFsxMDk1NV1dLCBbJ3N1YnNpbScsIFsxMDk1MV1dLCBbJ3N1YnN1YicsIFsxMDk2NV1dLCBbJ3N1YnN1cCcsIFsxMDk2M11dLCBbJ3N1Y2NhcHByb3gnLCBbMTA5MzZdXSwgWydzdWNjJywgWzg4MjddXSwgWydzdWNjY3VybHllcScsIFs4ODI5XV0sIFsnU3VjY2VlZHMnLCBbODgyN11dLCBbJ1N1Y2NlZWRzRXF1YWwnLCBbMTA5MjhdXSwgWydTdWNjZWVkc1NsYW50RXF1YWwnLCBbODgyOV1dLCBbJ1N1Y2NlZWRzVGlsZGUnLCBbODgzMV1dLCBbJ3N1Y2NlcScsIFsxMDkyOF1dLCBbJ3N1Y2NuYXBwcm94JywgWzEwOTM4XV0sIFsnc3VjY25lcXEnLCBbMTA5MzRdXSwgWydzdWNjbnNpbScsIFs4OTM3XV0sIFsnc3VjY3NpbScsIFs4ODMxXV0sIFsnU3VjaFRoYXQnLCBbODcxNV1dLCBbJ3N1bScsIFs4NzIxXV0sIFsnU3VtJywgWzg3MjFdXSwgWydzdW5nJywgWzk4MzRdXSwgWydzdXAxJywgWzE4NV1dLCBbJ3N1cDInLCBbMTc4XV0sIFsnc3VwMycsIFsxNzldXSwgWydzdXAnLCBbODgzNV1dLCBbJ1N1cCcsIFs4OTEzXV0sIFsnc3VwZG90JywgWzEwOTQyXV0sIFsnc3VwZHN1YicsIFsxMDk2OF1dLCBbJ3N1cEUnLCBbMTA5NTBdXSwgWydzdXBlJywgWzg4MzldXSwgWydzdXBlZG90JywgWzEwOTQ4XV0sIFsnU3VwZXJzZXQnLCBbODgzNV1dLCBbJ1N1cGVyc2V0RXF1YWwnLCBbODgzOV1dLCBbJ3N1cGhzb2wnLCBbMTAxODVdXSwgWydzdXBoc3ViJywgWzEwOTY3XV0sIFsnc3VwbGFycicsIFsxMDYxOV1dLCBbJ3N1cG11bHQnLCBbMTA5NDZdXSwgWydzdXBuRScsIFsxMDk1Nl1dLCBbJ3N1cG5lJywgWzg4NDNdXSwgWydzdXBwbHVzJywgWzEwOTQ0XV0sIFsnc3Vwc2V0JywgWzg4MzVdXSwgWydTdXBzZXQnLCBbODkxM11dLCBbJ3N1cHNldGVxJywgWzg4MzldXSwgWydzdXBzZXRlcXEnLCBbMTA5NTBdXSwgWydzdXBzZXRuZXEnLCBbODg0M11dLCBbJ3N1cHNldG5lcXEnLCBbMTA5NTZdXSwgWydzdXBzaW0nLCBbMTA5NTJdXSwgWydzdXBzdWInLCBbMTA5NjRdXSwgWydzdXBzdXAnLCBbMTA5NjZdXSwgWydzd2FyaGsnLCBbMTA1MzRdXSwgWydzd2FycicsIFs4NjAxXV0sIFsnc3dBcnInLCBbODY2NV1dLCBbJ3N3YXJyb3cnLCBbODYwMV1dLCBbJ3N3bndhcicsIFsxMDUzOF1dLCBbJ3N6bGlnJywgWzIyM11dLCBbJ1RhYicsIFs5XV0sIFsndGFyZ2V0JywgWzg5ODJdXSwgWydUYXUnLCBbOTMyXV0sIFsndGF1JywgWzk2NF1dLCBbJ3RicmsnLCBbOTE0MF1dLCBbJ1RjYXJvbicsIFszNTZdXSwgWyd0Y2Fyb24nLCBbMzU3XV0sIFsnVGNlZGlsJywgWzM1NF1dLCBbJ3RjZWRpbCcsIFszNTVdXSwgWydUY3knLCBbMTA1OF1dLCBbJ3RjeScsIFsxMDkwXV0sIFsndGRvdCcsIFs4NDExXV0sIFsndGVscmVjJywgWzg5ODFdXSwgWydUZnInLCBbMTIwMDg3XV0sIFsndGZyJywgWzEyMDExM11dLCBbJ3RoZXJlNCcsIFs4NzU2XV0sIFsndGhlcmVmb3JlJywgWzg3NTZdXSwgWydUaGVyZWZvcmUnLCBbODc1Nl1dLCBbJ1RoZXRhJywgWzkyMF1dLCBbJ3RoZXRhJywgWzk1Ml1dLCBbJ3RoZXRhc3ltJywgWzk3N11dLCBbJ3RoZXRhdicsIFs5NzddXSwgWyd0aGlja2FwcHJveCcsIFs4Nzc2XV0sIFsndGhpY2tzaW0nLCBbODc2NF1dLCBbJ1RoaWNrU3BhY2UnLCBbODI4NywgODIwMl1dLCBbJ1RoaW5TcGFjZScsIFs4MjAxXV0sIFsndGhpbnNwJywgWzgyMDFdXSwgWyd0aGthcCcsIFs4Nzc2XV0sIFsndGhrc2ltJywgWzg3NjRdXSwgWydUSE9STicsIFsyMjJdXSwgWyd0aG9ybicsIFsyNTRdXSwgWyd0aWxkZScsIFs3MzJdXSwgWydUaWxkZScsIFs4NzY0XV0sIFsnVGlsZGVFcXVhbCcsIFs4NzcxXV0sIFsnVGlsZGVGdWxsRXF1YWwnLCBbODc3M11dLCBbJ1RpbGRlVGlsZGUnLCBbODc3Nl1dLCBbJ3RpbWVzYmFyJywgWzEwODAxXV0sIFsndGltZXNiJywgWzg4NjRdXSwgWyd0aW1lcycsIFsyMTVdXSwgWyd0aW1lc2QnLCBbMTA4MDBdXSwgWyd0aW50JywgWzg3NDldXSwgWyd0b2VhJywgWzEwNTM2XV0sIFsndG9wYm90JywgWzkwMTRdXSwgWyd0b3BjaXInLCBbMTA5OTNdXSwgWyd0b3AnLCBbODg2OF1dLCBbJ1RvcGYnLCBbMTIwMTM5XV0sIFsndG9wZicsIFsxMjAxNjVdXSwgWyd0b3Bmb3JrJywgWzEwOTcwXV0sIFsndG9zYScsIFsxMDUzN11dLCBbJ3RwcmltZScsIFs4MjQ0XV0sIFsndHJhZGUnLCBbODQ4Ml1dLCBbJ1RSQURFJywgWzg0ODJdXSwgWyd0cmlhbmdsZScsIFs5NjUzXV0sIFsndHJpYW5nbGVkb3duJywgWzk2NjNdXSwgWyd0cmlhbmdsZWxlZnQnLCBbOTY2N11dLCBbJ3RyaWFuZ2xlbGVmdGVxJywgWzg4ODRdXSwgWyd0cmlhbmdsZXEnLCBbODc5Nl1dLCBbJ3RyaWFuZ2xlcmlnaHQnLCBbOTY1N11dLCBbJ3RyaWFuZ2xlcmlnaHRlcScsIFs4ODg1XV0sIFsndHJpZG90JywgWzk3MDhdXSwgWyd0cmllJywgWzg3OTZdXSwgWyd0cmltaW51cycsIFsxMDgxMF1dLCBbJ1RyaXBsZURvdCcsIFs4NDExXV0sIFsndHJpcGx1cycsIFsxMDgwOV1dLCBbJ3RyaXNiJywgWzEwNzAxXV0sIFsndHJpdGltZScsIFsxMDgxMV1dLCBbJ3RycGV6aXVtJywgWzkxODZdXSwgWydUc2NyJywgWzExOTk4M11dLCBbJ3RzY3InLCBbMTIwMDA5XV0sIFsnVFNjeScsIFsxMDYyXV0sIFsndHNjeScsIFsxMDk0XV0sIFsnVFNIY3knLCBbMTAzNV1dLCBbJ3RzaGN5JywgWzExMTVdXSwgWydUc3Ryb2snLCBbMzU4XV0sIFsndHN0cm9rJywgWzM1OV1dLCBbJ3R3aXh0JywgWzg4MTJdXSwgWyd0d29oZWFkbGVmdGFycm93JywgWzg2MDZdXSwgWyd0d29oZWFkcmlnaHRhcnJvdycsIFs4NjA4XV0sIFsnVWFjdXRlJywgWzIxOF1dLCBbJ3VhY3V0ZScsIFsyNTBdXSwgWyd1YXJyJywgWzg1OTNdXSwgWydVYXJyJywgWzg2MDddXSwgWyd1QXJyJywgWzg2NTddXSwgWydVYXJyb2NpcicsIFsxMDU2OV1dLCBbJ1VicmN5JywgWzEwMzhdXSwgWyd1YnJjeScsIFsxMTE4XV0sIFsnVWJyZXZlJywgWzM2NF1dLCBbJ3VicmV2ZScsIFszNjVdXSwgWydVY2lyYycsIFsyMTldXSwgWyd1Y2lyYycsIFsyNTFdXSwgWydVY3knLCBbMTA1OV1dLCBbJ3VjeScsIFsxMDkxXV0sIFsndWRhcnInLCBbODY0NV1dLCBbJ1VkYmxhYycsIFszNjhdXSwgWyd1ZGJsYWMnLCBbMzY5XV0sIFsndWRoYXInLCBbMTA2MDZdXSwgWyd1ZmlzaHQnLCBbMTA2MjJdXSwgWydVZnInLCBbMTIwMDg4XV0sIFsndWZyJywgWzEyMDExNF1dLCBbJ1VncmF2ZScsIFsyMTddXSwgWyd1Z3JhdmUnLCBbMjQ5XV0sIFsndUhhcicsIFsxMDU5NV1dLCBbJ3VoYXJsJywgWzg2MzldXSwgWyd1aGFycicsIFs4NjM4XV0sIFsndWhibGsnLCBbOTYwMF1dLCBbJ3VsY29ybicsIFs4OTg4XV0sIFsndWxjb3JuZXInLCBbODk4OF1dLCBbJ3VsY3JvcCcsIFs4OTc1XV0sIFsndWx0cmknLCBbOTcyMF1dLCBbJ1VtYWNyJywgWzM2Ml1dLCBbJ3VtYWNyJywgWzM2M11dLCBbJ3VtbCcsIFsxNjhdXSwgWydVbmRlckJhcicsIFs5NV1dLCBbJ1VuZGVyQnJhY2UnLCBbOTE4M11dLCBbJ1VuZGVyQnJhY2tldCcsIFs5MTQxXV0sIFsnVW5kZXJQYXJlbnRoZXNpcycsIFs5MTgxXV0sIFsnVW5pb24nLCBbODg5OV1dLCBbJ1VuaW9uUGx1cycsIFs4ODQ2XV0sIFsnVW9nb24nLCBbMzcwXV0sIFsndW9nb24nLCBbMzcxXV0sIFsnVW9wZicsIFsxMjAxNDBdXSwgWyd1b3BmJywgWzEyMDE2Nl1dLCBbJ1VwQXJyb3dCYXInLCBbMTA1MTRdXSwgWyd1cGFycm93JywgWzg1OTNdXSwgWydVcEFycm93JywgWzg1OTNdXSwgWydVcGFycm93JywgWzg2NTddXSwgWydVcEFycm93RG93bkFycm93JywgWzg2NDVdXSwgWyd1cGRvd25hcnJvdycsIFs4NTk3XV0sIFsnVXBEb3duQXJyb3cnLCBbODU5N11dLCBbJ1VwZG93bmFycm93JywgWzg2NjFdXSwgWydVcEVxdWlsaWJyaXVtJywgWzEwNjA2XV0sIFsndXBoYXJwb29ubGVmdCcsIFs4NjM5XV0sIFsndXBoYXJwb29ucmlnaHQnLCBbODYzOF1dLCBbJ3VwbHVzJywgWzg4NDZdXSwgWydVcHBlckxlZnRBcnJvdycsIFs4NTk4XV0sIFsnVXBwZXJSaWdodEFycm93JywgWzg1OTldXSwgWyd1cHNpJywgWzk2NV1dLCBbJ1Vwc2knLCBbOTc4XV0sIFsndXBzaWgnLCBbOTc4XV0sIFsnVXBzaWxvbicsIFs5MzNdXSwgWyd1cHNpbG9uJywgWzk2NV1dLCBbJ1VwVGVlQXJyb3cnLCBbODYxM11dLCBbJ1VwVGVlJywgWzg4NjldXSwgWyd1cHVwYXJyb3dzJywgWzg2NDhdXSwgWyd1cmNvcm4nLCBbODk4OV1dLCBbJ3VyY29ybmVyJywgWzg5ODldXSwgWyd1cmNyb3AnLCBbODk3NF1dLCBbJ1VyaW5nJywgWzM2Nl1dLCBbJ3VyaW5nJywgWzM2N11dLCBbJ3VydHJpJywgWzk3MjFdXSwgWydVc2NyJywgWzExOTk4NF1dLCBbJ3VzY3InLCBbMTIwMDEwXV0sIFsndXRkb3QnLCBbODk0NF1dLCBbJ1V0aWxkZScsIFszNjBdXSwgWyd1dGlsZGUnLCBbMzYxXV0sIFsndXRyaScsIFs5NjUzXV0sIFsndXRyaWYnLCBbOTY1Ml1dLCBbJ3V1YXJyJywgWzg2NDhdXSwgWydVdW1sJywgWzIyMF1dLCBbJ3V1bWwnLCBbMjUyXV0sIFsndXdhbmdsZScsIFsxMDY2M11dLCBbJ3ZhbmdydCcsIFsxMDY1Ml1dLCBbJ3ZhcmVwc2lsb24nLCBbMTAxM11dLCBbJ3ZhcmthcHBhJywgWzEwMDhdXSwgWyd2YXJub3RoaW5nJywgWzg3MDldXSwgWyd2YXJwaGknLCBbOTgxXV0sIFsndmFycGknLCBbOTgyXV0sIFsndmFycHJvcHRvJywgWzg3MzNdXSwgWyd2YXJyJywgWzg1OTddXSwgWyd2QXJyJywgWzg2NjFdXSwgWyd2YXJyaG8nLCBbMTAwOV1dLCBbJ3ZhcnNpZ21hJywgWzk2Ml1dLCBbJ3ZhcnN1YnNldG5lcScsIFs4ODQyLCA2NTAyNF1dLCBbJ3ZhcnN1YnNldG5lcXEnLCBbMTA5NTUsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxJywgWzg4NDMsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxcScsIFsxMDk1NiwgNjUwMjRdXSwgWyd2YXJ0aGV0YScsIFs5NzddXSwgWyd2YXJ0cmlhbmdsZWxlZnQnLCBbODg4Ml1dLCBbJ3ZhcnRyaWFuZ2xlcmlnaHQnLCBbODg4M11dLCBbJ3ZCYXInLCBbMTA5ODRdXSwgWydWYmFyJywgWzEwOTg3XV0sIFsndkJhcnYnLCBbMTA5ODVdXSwgWydWY3knLCBbMTA0Ml1dLCBbJ3ZjeScsIFsxMDc0XV0sIFsndmRhc2gnLCBbODg2Nl1dLCBbJ3ZEYXNoJywgWzg4NzJdXSwgWydWZGFzaCcsIFs4ODczXV0sIFsnVkRhc2gnLCBbODg3NV1dLCBbJ1ZkYXNobCcsIFsxMDk4Ml1dLCBbJ3ZlZWJhcicsIFs4ODkxXV0sIFsndmVlJywgWzg3NDRdXSwgWydWZWUnLCBbODg5N11dLCBbJ3ZlZWVxJywgWzg3OTRdXSwgWyd2ZWxsaXAnLCBbODk0Ml1dLCBbJ3ZlcmJhcicsIFsxMjRdXSwgWydWZXJiYXInLCBbODIxNF1dLCBbJ3ZlcnQnLCBbMTI0XV0sIFsnVmVydCcsIFs4MjE0XV0sIFsnVmVydGljYWxCYXInLCBbODczOV1dLCBbJ1ZlcnRpY2FsTGluZScsIFsxMjRdXSwgWydWZXJ0aWNhbFNlcGFyYXRvcicsIFsxMDA3Ml1dLCBbJ1ZlcnRpY2FsVGlsZGUnLCBbODc2OF1dLCBbJ1ZlcnlUaGluU3BhY2UnLCBbODIwMl1dLCBbJ1ZmcicsIFsxMjAwODldXSwgWyd2ZnInLCBbMTIwMTE1XV0sIFsndmx0cmknLCBbODg4Ml1dLCBbJ3Zuc3ViJywgWzg4MzQsIDg0MDJdXSwgWyd2bnN1cCcsIFs4ODM1LCA4NDAyXV0sIFsnVm9wZicsIFsxMjAxNDFdXSwgWyd2b3BmJywgWzEyMDE2N11dLCBbJ3Zwcm9wJywgWzg3MzNdXSwgWyd2cnRyaScsIFs4ODgzXV0sIFsnVnNjcicsIFsxMTk5ODVdXSwgWyd2c2NyJywgWzEyMDAxMV1dLCBbJ3ZzdWJuRScsIFsxMDk1NSwgNjUwMjRdXSwgWyd2c3VibmUnLCBbODg0MiwgNjUwMjRdXSwgWyd2c3VwbkUnLCBbMTA5NTYsIDY1MDI0XV0sIFsndnN1cG5lJywgWzg4NDMsIDY1MDI0XV0sIFsnVnZkYXNoJywgWzg4NzRdXSwgWyd2emlnemFnJywgWzEwNjUwXV0sIFsnV2NpcmMnLCBbMzcyXV0sIFsnd2NpcmMnLCBbMzczXV0sIFsnd2VkYmFyJywgWzEwODQ3XV0sIFsnd2VkZ2UnLCBbODc0M11dLCBbJ1dlZGdlJywgWzg4OTZdXSwgWyd3ZWRnZXEnLCBbODc5M11dLCBbJ3dlaWVycCcsIFs4NDcyXV0sIFsnV2ZyJywgWzEyMDA5MF1dLCBbJ3dmcicsIFsxMjAxMTZdXSwgWydXb3BmJywgWzEyMDE0Ml1dLCBbJ3dvcGYnLCBbMTIwMTY4XV0sIFsnd3AnLCBbODQ3Ml1dLCBbJ3dyJywgWzg3NjhdXSwgWyd3cmVhdGgnLCBbODc2OF1dLCBbJ1dzY3InLCBbMTE5OTg2XV0sIFsnd3NjcicsIFsxMjAwMTJdXSwgWyd4Y2FwJywgWzg4OThdXSwgWyd4Y2lyYycsIFs5NzExXV0sIFsneGN1cCcsIFs4ODk5XV0sIFsneGR0cmknLCBbOTY2MV1dLCBbJ1hmcicsIFsxMjAwOTFdXSwgWyd4ZnInLCBbMTIwMTE3XV0sIFsneGhhcnInLCBbMTAyMzFdXSwgWyd4aEFycicsIFsxMDIzNF1dLCBbJ1hpJywgWzkyNl1dLCBbJ3hpJywgWzk1OF1dLCBbJ3hsYXJyJywgWzEwMjI5XV0sIFsneGxBcnInLCBbMTAyMzJdXSwgWyd4bWFwJywgWzEwMjM2XV0sIFsneG5pcycsIFs4OTU1XV0sIFsneG9kb3QnLCBbMTA3NTJdXSwgWydYb3BmJywgWzEyMDE0M11dLCBbJ3hvcGYnLCBbMTIwMTY5XV0sIFsneG9wbHVzJywgWzEwNzUzXV0sIFsneG90aW1lJywgWzEwNzU0XV0sIFsneHJhcnInLCBbMTAyMzBdXSwgWyd4ckFycicsIFsxMDIzM11dLCBbJ1hzY3InLCBbMTE5OTg3XV0sIFsneHNjcicsIFsxMjAwMTNdXSwgWyd4c3FjdXAnLCBbMTA3NThdXSwgWyd4dXBsdXMnLCBbMTA3NTZdXSwgWyd4dXRyaScsIFs5NjUxXV0sIFsneHZlZScsIFs4ODk3XV0sIFsneHdlZGdlJywgWzg4OTZdXSwgWydZYWN1dGUnLCBbMjIxXV0sIFsneWFjdXRlJywgWzI1M11dLCBbJ1lBY3knLCBbMTA3MV1dLCBbJ3lhY3knLCBbMTEwM11dLCBbJ1ljaXJjJywgWzM3NF1dLCBbJ3ljaXJjJywgWzM3NV1dLCBbJ1ljeScsIFsxMDY3XV0sIFsneWN5JywgWzEwOTldXSwgWyd5ZW4nLCBbMTY1XV0sIFsnWWZyJywgWzEyMDA5Ml1dLCBbJ3lmcicsIFsxMjAxMThdXSwgWydZSWN5JywgWzEwMzFdXSwgWyd5aWN5JywgWzExMTFdXSwgWydZb3BmJywgWzEyMDE0NF1dLCBbJ3lvcGYnLCBbMTIwMTcwXV0sIFsnWXNjcicsIFsxMTk5ODhdXSwgWyd5c2NyJywgWzEyMDAxNF1dLCBbJ1lVY3knLCBbMTA3MF1dLCBbJ3l1Y3knLCBbMTEwMl1dLCBbJ3l1bWwnLCBbMjU1XV0sIFsnWXVtbCcsIFszNzZdXSwgWydaYWN1dGUnLCBbMzc3XV0sIFsnemFjdXRlJywgWzM3OF1dLCBbJ1pjYXJvbicsIFszODFdXSwgWyd6Y2Fyb24nLCBbMzgyXV0sIFsnWmN5JywgWzEwNDddXSwgWyd6Y3knLCBbMTA3OV1dLCBbJ1pkb3QnLCBbMzc5XV0sIFsnemRvdCcsIFszODBdXSwgWyd6ZWV0cmYnLCBbODQ4OF1dLCBbJ1plcm9XaWR0aFNwYWNlJywgWzgyMDNdXSwgWydaZXRhJywgWzkxOF1dLCBbJ3pldGEnLCBbOTUwXV0sIFsnemZyJywgWzEyMDExOV1dLCBbJ1pmcicsIFs4NDg4XV0sIFsnWkhjeScsIFsxMDQ2XV0sIFsnemhjeScsIFsxMDc4XV0sIFsnemlncmFycicsIFs4NjY5XV0sIFsnem9wZicsIFsxMjAxNzFdXSwgWydab3BmJywgWzg0ODRdXSwgWydac2NyJywgWzExOTk4OV1dLCBbJ3pzY3InLCBbMTIwMDE1XV0sIFsnendqJywgWzgyMDVdXSwgWyd6d25qJywgWzgyMDRdXV07XG5cbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgY2hhckluZGV4ID0ge307XG5cbmNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSHRtbDVFbnRpdGllcygpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYoIz9bXFx3XFxkXSspOz8vZywgZnVuY3Rpb24ocywgZW50aXR5KSB7XG4gICAgICAgIHZhciBjaHI7XG4gICAgICAgIGlmIChlbnRpdHkuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlbnRpdHkuY2hhckF0KDEpID09PSAneCcgP1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbnRpdHkuc3Vic3RyKDEpKTtcblxuICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgY2hyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociA9IGFscGhhSW5kZXhbZW50aXR5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hyIHx8IHM7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gY2hhckluZGV4W3N0ci5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgaWYgKGNoYXJJbmZvKSB7XG4gICAgICAgICAgICB2YXIgYWxwaGEgPSBjaGFySW5mb1tzdHIuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICAgICAgaWYgKGFscGhhKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGNoYXJJbmZvWycnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gY2hhckluZGV4W2NdO1xuICAgICAgICBpZiAoY2hhckluZm8pIHtcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IGNoYXJJbmZvW3N0ci5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFscGhhID0gY2hhckluZm9bJyddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFscGhhKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTI2KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICBpZiAoc3RyTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiB9O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbHBoYUluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY2hhckluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KSB7XG4gICAgdmFyIGkgPSBFTlRJVElFUy5sZW5ndGg7XG4gICAgdmFyIF9yZXN1bHRzID0gW107XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZSA9IEVOVElUSUVTW2ldO1xuICAgICAgICB2YXIgYWxwaGEgPSBlWzBdO1xuICAgICAgICB2YXIgY2hhcnMgPSBlWzFdO1xuICAgICAgICB2YXIgY2hyID0gY2hhcnNbMF07XG4gICAgICAgIHZhciBhZGRDaGFyID0gKGNociA8IDMyIHx8IGNociA+IDEyNikgfHwgY2hyID09PSA2MiB8fCBjaHIgPT09IDYwIHx8IGNociA9PT0gMzggfHwgY2hyID09PSAzNCB8fCBjaHIgPT09IDM5O1xuICAgICAgICB2YXIgY2hhckluZm87XG4gICAgICAgIGlmIChhZGRDaGFyKSB7XG4gICAgICAgICAgICBjaGFySW5mbyA9IGNoYXJJbmRleFtjaHJdID0gY2hhckluZGV4W2Nocl0gfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXJzWzFdKSB7XG4gICAgICAgICAgICB2YXIgY2hyMiA9IGNoYXJzWzFdO1xuICAgICAgICAgICAgYWxwaGFJbmRleFthbHBoYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpO1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChhZGRDaGFyICYmIChjaGFySW5mb1tjaHIyXSA9IGFscGhhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbHBoYUluZGV4W2FscGhhXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goYWRkQ2hhciAmJiAoY2hhckluZm9bJyddID0gYWxwaGEpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sNUVudGl0aWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2h0bWwtZW50aXRpZXMvbGliL2h0bWw1LWVudGl0aWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEJhc2VkIGhlYXZpbHkgb24gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9ibG9iL1xuICogIGMwYWZkZjljNmFiYzFkZDcwNzA3YzU5NGU0NzM4MDJhNTY2ZjdiNmUvaG90L29ubHktZGV2LXNlcnZlci5qc1xuICogT3JpZ2luYWwgY29weXJpZ2h0IFRvYmlhcyBLb3BwZXJzIEBzb2tyYSAoTUlUIGxpY2Vuc2UpXG4gKi9cblxuLyogZ2xvYmFsIHdpbmRvdyBfX3dlYnBhY2tfaGFzaF9fICovXG5cbmlmICghbW9kdWxlLmhvdCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cblxudmFyIGhtckRvY3NVcmwgPSBcImh0dHA6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnQtd2l0aC13ZWJwYWNrLmh0bWxcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG5cbnZhciBsYXN0SGFzaDtcbnZhciBmYWlsdXJlU3RhdHVzZXMgPSB7IGFib3J0OiAxLCBmYWlsOiAxIH07XG52YXIgYXBwbHlPcHRpb25zID0geyBpZ25vcmVVbmFjY2VwdGVkOiB0cnVlIH07XG5cbmZ1bmN0aW9uIHVwVG9EYXRlKGhhc2gpIHtcbiAgaWYgKGhhc2gpIGxhc3RIYXNoID0gaGFzaDtcbiAgcmV0dXJuIGxhc3RIYXNoID09IF9fd2VicGFja19oYXNoX187XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGFzaCwgbW9kdWxlTWFwLCBvcHRpb25zKSB7XG4gIHZhciByZWxvYWQgPSBvcHRpb25zLnJlbG9hZDtcbiAgaWYgKCF1cFRvRGF0ZShoYXNoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09IFwiaWRsZVwiKSB7XG4gICAgaWYgKG9wdGlvbnMubG9nKSBjb25zb2xlLmxvZyhcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG4gICAgY2hlY2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKGVyciwgdXBkYXRlZE1vZHVsZXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBoYW5kbGVFcnJvcihlcnIpO1xuXG4gICAgICBpZighdXBkYXRlZE1vZHVsZXMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZSAoRnVsbCByZWxvYWQgbmVlZGVkKVwiKTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSAoUHJvYmFibHkgYmVjYXVzZSBvZiByZXN0YXJ0aW5nIHRoZSBzZXJ2ZXIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHBlcmZvcm1SZWxvYWQoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcHBseUNhbGxiYWNrID0gZnVuY3Rpb24oYXBwbHlFcnIsIHJlbmV3ZWRNb2R1bGVzKSB7XG4gICAgICAgIGlmIChhcHBseUVycikgcmV0dXJuIGhhbmRsZUVycm9yKGFwcGx5RXJyKTtcblxuICAgICAgICBpZiAoIXVwVG9EYXRlKCkpIGNoZWNrKCk7XG5cbiAgICAgICAgbG9nVXBkYXRlcyh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGFwcGx5UmVzdWx0ID0gbW9kdWxlLmhvdC5hcHBseShhcHBseU9wdGlvbnMsIGFwcGx5Q2FsbGJhY2spO1xuICAgICAgLy8gd2VicGFjayAyIHByb21pc2VcbiAgICAgIGlmIChhcHBseVJlc3VsdCAmJiBhcHBseVJlc3VsdC50aGVuKSB7XG4gICAgICAgIC8vIEhvdE1vZHVsZVJlcGxhY2VtZW50LnJ1bnRpbWUuanMgcmVmZXJzIHRvIHRoZSByZXN1bHQgYXMgYG91dGRhdGVkTW9kdWxlc2BcbiAgICAgICAgYXBwbHlSZXN1bHQudGhlbihmdW5jdGlvbihvdXRkYXRlZE1vZHVsZXMpIHtcbiAgICAgICAgICBhcHBseUNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcHBseVJlc3VsdC5jYXRjaChhcHBseUNhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgcmVzdWx0ID0gbW9kdWxlLmhvdC5jaGVjayhmYWxzZSwgY2IpO1xuICAgIC8vIHdlYnBhY2sgMiBwcm9taXNlXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikge1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbih1cGRhdGVkTW9kdWxlcykge1xuICAgICAgICAgICAgY2IobnVsbCwgdXBkYXRlZE1vZHVsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LmNhdGNoKGNiKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2dVcGRhdGVzKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuICAgIHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xuICAgICAgcmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcbiAgICB9KTtcblxuICAgIGlmKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiBcIiArXG4gICAgICAgICAgXCIoRnVsbCByZWxvYWQgbmVlZGVkKVxcblwiICtcbiAgICAgICAgICBcIlRoaXMgaXMgdXN1YWxseSBiZWNhdXNlIHRoZSBtb2R1bGVzIHdoaWNoIGhhdmUgY2hhbmdlZCBcIiArXG4gICAgICAgICAgXCIoYW5kIHRoZWlyIHBhcmVudHMpIGRvIG5vdCBrbm93IGhvdyB0byBob3QgcmVsb2FkIHRoZW1zZWx2ZXMuIFwiICtcbiAgICAgICAgICBcIlNlZSBcIiArIGhtckRvY3NVcmwgKyBcIiBmb3IgbW9yZSBkZXRhaWxzLlwiXG4gICAgICAgICk7XG4gICAgICAgIHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSAgLSBcIiArIG1vZHVsZU1hcFttb2R1bGVJZF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHBlcmZvcm1SZWxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5sb2cpIHtcbiAgICAgIGlmKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcbiAgICAgICAgcmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVNYXBbbW9kdWxlSWRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1cFRvRGF0ZSgpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICAgIGlmIChtb2R1bGUuaG90LnN0YXR1cygpIGluIGZhaWx1cmVTdGF0dXNlcykge1xuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSBDYW5ub3QgY2hlY2sgZm9yIHVwZGF0ZSAoRnVsbCByZWxvYWQgbmVlZGVkKVwiKTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0hNUl0gXCIgKyBlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcGVyZm9ybVJlbG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSBVcGRhdGUgY2hlY2sgZmFpbGVkOiBcIiArIGVyci5zdGFjayB8fCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybVJlbG9hZCgpIHtcbiAgICBpZiAocmVsb2FkKSB7XG4gICAgICBpZiAob3B0aW9ucy53YXJuKSBjb25zb2xlLndhcm4oXCJbSE1SXSBSZWxvYWRpbmcgcGFnZVwiKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjayktaG90LW1pZGRsZXdhcmUvcHJvY2Vzcy11cGRhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnYW5ndWxhcjItdW5pdmVyc2FsLXBvbHlmaWxscy9icm93c2VyJztcbmltcG9ydCB7IGVuYWJsZVByb2RNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGF0Zm9ybVVuaXZlcnNhbER5bmFtaWMgfSBmcm9tICdhbmd1bGFyMi11bml2ZXJzYWwnO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XG5pbXBvcnQgJ2Jvb3RzdHJhcCc7XG5cbi8vIEVuYWJsZSBlaXRoZXIgSG90IE1vZHVsZSBSZWxvYWRpbmcgb3IgcHJvZHVjdGlvbiBtb2RlXG5pZiAobW9kdWxlWydob3QnXSkge1xuICAgIG1vZHVsZVsnaG90J10uYWNjZXB0KCk7XG4gICAgbW9kdWxlWydob3QnXS5kaXNwb3NlKCgpID0+IHsgcGxhdGZvcm0uZGVzdHJveSgpOyB9KTtcbn0gZWxzZSB7XG4gICAgZW5hYmxlUHJvZE1vZGUoKTtcbn1cblxuLy8gQm9vdCB0aGUgYXBwbGljYXRpb24sIGVpdGhlciBub3cgb3Igd2hlbiB0aGUgRE9NIGNvbnRlbnQgaXMgbG9hZGVkXG5jb25zdCBwbGF0Zm9ybSA9IHBsYXRmb3JtVW5pdmVyc2FsRHluYW1pYygpO1xuY29uc3QgYm9vdEFwcGxpY2F0aW9uID0gKCkgPT4geyBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTsgfTtcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgYm9vdEFwcGxpY2F0aW9uKCk7XG59IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBib290QXBwbGljYXRpb24pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3QtY2xpZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygzKSkoNDUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hbmd1bGFyMi11bml2ZXJzYWwtcG9seWZpbGxzL2Jyb3dzZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygzKSkoNCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvYnVuZGxlcy9jb3JlLnVtZC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKSg0OCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXVuaXZlcnNhbC9icm93c2VyL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVW5pdmVyc2FsTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdW5pdmVyc2FsJztcblxuaW1wb3J0IHsgTWRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL2NhcmQnO1xyXG5pbXBvcnQgeyBNZEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNZEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcjItbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1kSWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL2ljb24nO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnXG5pbXBvcnQgeyBEZXZpY2VNb2NrdXBNb2R1bGUgfSBmcm9tICcuLi9kZXZpY2VNb2NrdXAvZGV2aWNlLW1vY2t1cC5tb2R1bGUnXG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbIEFwcENvbXBvbmVudCBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFVuaXZlcnNhbE1vZHVsZSwgLy8gTXVzdCBiZSBmaXJzdCBpbXBvcnQuIFRoaXMgYXV0b21hdGljYWxseSBpbXBvcnRzIEJyb3dzZXJNb2R1bGUsIEh0dHBNb2R1bGUsIGFuZCBKc29ucE1vZHVsZSB0b28uXG4gICAgICAgIE1kQ2FyZE1vZHVsZSxcbiAgICAgICAgTWRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1kSWNvbk1vZHVsZSxcbiAgICAgICAgRGV2aWNlTW9ja3VwTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgXG4gICAgICAgIE1kSWNvblJlZ2lzdHJ5XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvYXBwL2FwcC5tb2R1bGUudHMiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnQGFuZ3VsYXIvY29yZScpKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cycsICdAYW5ndWxhci9jb3JlJ10sIGZhY3RvcnkpIDpcbiAgICAoZmFjdG9yeSgoZ2xvYmFsLm1kID0gZ2xvYmFsLm1kIHx8IHt9LCBnbG9iYWwubWQuY2FyZCA9IGdsb2JhbC5tZC5jYXJkIHx8IHt9KSxnbG9iYWwubmcuY29yZSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMsX2FuZ3VsYXJfY29yZSkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX2RlY29yYXRlID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG52YXIgTWRDYXJkQ29udGVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRDYXJkQ29udGVudCgpIHtcbiAgICB9XG4gICAgTWRDYXJkQ29udGVudCA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkRpcmVjdGl2ZSh7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ21kLWNhcmQtY29udGVudCdcbiAgICAgICAgfSksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtdKVxuICAgIF0sIE1kQ2FyZENvbnRlbnQpO1xuICAgIHJldHVybiBNZENhcmRDb250ZW50O1xufSgpKTtcbi8qKlxuICogVGl0bGUgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xudmFyIE1kQ2FyZFRpdGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZENhcmRUaXRsZSgpIHtcbiAgICB9XG4gICAgTWRDYXJkVGl0bGUgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5EaXJlY3RpdmUoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdtZC1jYXJkLXRpdGxlJ1xuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRDYXJkVGl0bGUpO1xuICAgIHJldHVybiBNZENhcmRUaXRsZTtcbn0oKSk7XG4vKipcbiAqIFN1Yi10aXRsZSBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG52YXIgTWRDYXJkU3VidGl0bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kQ2FyZFN1YnRpdGxlKCkge1xuICAgIH1cbiAgICBNZENhcmRTdWJ0aXRsZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkRpcmVjdGl2ZSh7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ21kLWNhcmQtc3VidGl0bGUnXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZENhcmRTdWJ0aXRsZSk7XG4gICAgcmV0dXJuIE1kQ2FyZFN1YnRpdGxlO1xufSgpKTtcbi8qKlxuICogQWN0aW9uIHNlY3Rpb24gb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xudmFyIE1kQ2FyZEFjdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kQ2FyZEFjdGlvbnMoKSB7XG4gICAgfVxuICAgIE1kQ2FyZEFjdGlvbnMgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5EaXJlY3RpdmUoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdtZC1jYXJkLWFjdGlvbnMnXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZENhcmRBY3Rpb25zKTtcbiAgICByZXR1cm4gTWRDYXJkQWN0aW9ucztcbn0oKSk7XG4vKlxuXG48bWQtY2FyZD4gaXMgYSBiYXNpYyBjb250ZW50IGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBhZGRzIHRoZSBzdHlsZXMgb2YgYSBtYXRlcmlhbCBkZXNpZ24gY2FyZC5cblxuV2hpbGUgeW91IGNhbiB1c2UgdGhpcyBjb21wb25lbnQgYWxvbmUsXG5pdCBhbHNvIHByb3ZpZGVzIGEgbnVtYmVyIG9mIHByZXNldCBzdHlsZXMgZm9yIGNvbW1vbiBjYXJkIHNlY3Rpb25zLCBpbmNsdWRpbmc6XG4gLSBtZC1jYXJkLXRpdGxlXG4gLSBtZC1jYXJkLXN1YnRpdGxlXG4gLSBtZC1jYXJkLWNvbnRlbnRcbiAtIG1kLWNhcmQtYWN0aW9uc1xuIC0gbWQtY2FyZC1mb290ZXJcblxuIFlvdSBjYW4gc2VlIHNvbWUgZXhhbXBsZXMgb2YgY2FyZHMgaGVyZTpcbiBodHRwOi8vZW1iZWQucGxua3IuY28vczVPNFljeXZiTGhJQXBTcklodGovXG5cbiBUT0RPKGthcmEpOiB1cGRhdGUgbGluayB0byBkZW1vIHNpdGUgd2hlbiBpdCBleGlzdHNcblxuKi9cbnZhciBNZENhcmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kQ2FyZCgpIHtcbiAgICB9XG4gICAgTWRDYXJkID0gX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuQ29tcG9uZW50KHtzZWxlY3RvcjogJ21kLWNhcmQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBcIixcbiAgICAgICAgICAgIHN0eWxlczogW1wiLyoqICogQSBjb2xsZWN0aW9uIG9mIG1peGlucyBhbmQgQ1NTIGNsYXNzZXMgdGhhdCBjYW4gYmUgdXNlZCB0byBhcHBseSBlbGV2YXRpb24gdG8gYSBtYXRlcmlhbCAqIGVsZW1lbnQuICogU2VlOiBodHRwczovL3d3dy5nb29nbGUuY29tL2Rlc2lnbi9zcGVjL3doYXQtaXMtbWF0ZXJpYWwvZWxldmF0aW9uLXNoYWRvd3MuaHRtbCAqIEV4YW1wbGVzOiAqICogKiAubWQtZm9vIHsgKiAgIEBpbmNsdWRlICRtZC1lbGV2YXRpb24oMik7ICogKiAgICY6YWN0aXZlIHsgKiAgICAgQGluY2x1ZGUgJG1kLWVsZXZhdGlvbig4KTsgKiAgIH0gKiB9ICogKiA8ZGl2IGlkPVxcXCJleHRlcm5hbC1jYXJkXFxcIiBjbGFzcz1cXFwibWQtZWxldmF0aW9uLXoyXFxcIj48cD5Tb21lIGNvbnRlbnQ8L3A+PC9kaXY+ICogKiBGb3IgYW4gZXhwbGFuYXRpb24gb2YgdGhlIGRlc2lnbiBiZWhpbmQgaG93IGVsZXZhdGlvbiBpcyBpbXBsZW1lbnRlZCwgc2VlIHRoZSBkZXNpZ24gZG9jIGF0ICogaHR0cHM6Ly9nb28uZ2wvS3EwazlaLiAqLyAvKiogKiBUaGUgY3NzIHByb3BlcnR5IHVzZWQgZm9yIGVsZXZhdGlvbi4gSW4gbW9zdCBjYXNlcyB0aGlzIHNob3VsZCBub3QgYmUgY2hhbmdlZC4gSXQgaXMgZXhwb3NlZCAqIGFzIGEgdmFyaWFibGUgZm9yIGFic3RyYWN0aW9uIC8gZWFzeSB1c2Ugd2hlbiBuZWVkaW5nIHRvIHJlZmVyZW5jZSB0aGUgcHJvcGVydHkgZGlyZWN0bHksIGZvciAqIGV4YW1wbGUgaW4gYSB3aWxsLWNoYW5nZSBydWxlLiAqLyAvKiogVGhlIGRlZmF1bHQgZHVyYXRpb24gdmFsdWUgZm9yIGVsZXZhdGlvbiB0cmFuc2l0aW9ucy4gKi8gLyoqIFRoZSBkZWZhdWx0IGVhc2luZyB2YWx1ZSBmb3IgZWxldmF0aW9uIHRyYW5zaXRpb25zLiAqLyAvKiogKiBBcHBsaWVzIHRoZSBjb3JyZWN0IGNzcyBydWxlcyB0byBhbiBlbGVtZW50IHRvIGdpdmUgaXQgdGhlIGVsZXZhdGlvbiBzcGVjaWZpZWQgYnkgJHpWYWx1ZS4gKiBUaGUgJHpWYWx1ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMjQuICovIC8qKiAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgdmFsdWUgZm9yIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eSBmb3IgZWxldmF0aW9uLiAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiBkaXJlY3RseSBpcyB1c2VmdWwgaW4gc2l0dWF0aW9ucyB3aGVyZSBhIGNvbXBvbmVudCBuZWVkcyB0byB0cmFuc2l0aW9uICogbW9yZSB0aGFuIG9uZSBwcm9wZXJ0eS4gKiAqIC5mb28geyAqICAgdHJhbnNpdGlvbjogbWQtZWxldmF0aW9uLXRyYW5zaXRpb24tcHJvcGVydHktdmFsdWUoKSwgb3BhY2l0eSAxMDBtcyBlYXNlOyAqICAgd2lsbC1jaGFuZ2U6ICRtZC1lbGV2YXRpb24tcHJvcGVydHksIG9wYWNpdHk7ICogfSAqLyAvKiogKiBBcHBsaWVzIHRoZSBjb3JyZWN0IGNzcyBydWxlcyBuZWVkZWQgdG8gaGF2ZSBhbiBlbGVtZW50IHRyYW5zaXRpb24gYmV0d2VlbiBlbGV2YXRpb25zLiAqIFRoaXMgbWl4aW4gc2hvdWxkIGJlIGFwcGxpZWQgdG8gZWxlbWVudHMgd2hvc2UgZWxldmF0aW9uIHZhbHVlcyB3aWxsIGNoYW5nZSBkZXBlbmRpbmcgb24gdGhlaXIgKiBjb250ZXh0IChlLmcuIHdoZW4gYWN0aXZlIG9yIGRpc2FibGVkKS4gKi8gbWQtY2FyZCB7IGJveC1zaGFkb3c6IDBweCAycHggMXB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggMXB4IDFweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7IHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgd2lsbC1jaGFuZ2U6IGJveC1zaGFkb3c7IGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IHBhZGRpbmc6IDI0cHg7IGJvcmRlci1yYWRpdXM6IDJweDsgZm9udC1mYW1pbHk6IFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjsgYmFja2dyb3VuZDogd2hpdGU7IGNvbG9yOiBibGFjazsgfSBtZC1jYXJkOmhvdmVyIHsgYm94LXNoYWRvdzogMHB4IDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAycHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTsgfSAubWQtY2FyZC1mbGF0IHsgYm94LXNoYWRvdzogbm9uZTsgfSBtZC1jYXJkLXRpdGxlLCBtZC1jYXJkLXN1YnRpdGxlLCBtZC1jYXJkLWNvbnRlbnQsIG1kLWNhcmQtYWN0aW9ucyB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiAxNnB4OyB9IG1kLWNhcmQtdGl0bGUgeyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiA0MDA7IH0gbWQtY2FyZC1zdWJ0aXRsZSB7IGZvbnQtc2l6ZTogMTRweDsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7IH0gbWQtY2FyZC1jb250ZW50IHsgZm9udC1zaXplOiAxNHB4OyB9IG1kLWNhcmQtYWN0aW9ucyB7IG1hcmdpbi1sZWZ0OiAtMTZweDsgbWFyZ2luLXJpZ2h0OiAtMTZweDsgcGFkZGluZzogOHB4IDA7IH0gbWQtY2FyZC1hY3Rpb25zW2FsaWduPSdlbmQnXSB7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH0gW21kLWNhcmQtaW1hZ2VdIHsgd2lkdGg6IGNhbGMoMTAwJSArIDQ4cHgpOyBtYXJnaW46IDAgLTI0cHggMTZweCAtMjRweDsgfSBbbWQtY2FyZC14bC1pbWFnZV0geyB3aWR0aDogMjQwcHg7IGhlaWdodDogMjQwcHg7IG1hcmdpbjogLThweDsgfSBtZC1jYXJkLWZvb3RlciB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm90dG9tOiAwOyB9IG1kLWNhcmQtYWN0aW9ucyBbbWQtYnV0dG9uXSwgbWQtY2FyZC1hY3Rpb25zIFttZC1yYWlzZWQtYnV0dG9uXSB7IG1hcmdpbjogMCA0cHg7IH0gLyogSEVBREVSIFNUWUxFUyAqLyBtZC1jYXJkLWhlYWRlciB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiByb3c7IGhlaWdodDogNDBweDsgbWFyZ2luOiAtOHB4IDAgMTZweCAwOyB9IC5tZC1jYXJkLWhlYWRlci10ZXh0IHsgaGVpZ2h0OiA0MHB4OyBtYXJnaW46IDAgOHB4OyB9IFttZC1jYXJkLWF2YXRhcl0geyBoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0gbWQtY2FyZC1oZWFkZXIgbWQtY2FyZC10aXRsZSB7IGZvbnQtc2l6ZTogMTRweDsgfSAvKiBUSVRMRS1HUk9VUCBTVFlMRVMgKi8gW21kLWNhcmQtc20taW1hZ2VdLCBbbWQtY2FyZC1tZC1pbWFnZV0sIFttZC1jYXJkLWxnLWltYWdlXSB7IG1hcmdpbjogLThweCAwOyB9IG1kLWNhcmQtdGl0bGUtZ3JvdXAgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IG1hcmdpbjogMCAtOHB4OyB9IFttZC1jYXJkLXNtLWltYWdlXSB7IHdpZHRoOiA4MHB4OyBoZWlnaHQ6IDgwcHg7IH0gW21kLWNhcmQtbWQtaW1hZ2VdIHsgd2lkdGg6IDExMnB4OyBoZWlnaHQ6IDExMnB4OyB9IFttZC1jYXJkLWxnLWltYWdlXSB7IHdpZHRoOiAxNTJweDsgaGVpZ2h0OiAxNTJweDsgfSAvKiBNRURJQSBRVUVSSUVTICovIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkgeyBtZC1jYXJkIHsgcGFkZGluZzogMjRweCAxNnB4OyB9IFttZC1jYXJkLWltYWdlXSB7IHdpZHRoOiBjYWxjKDEwMCUgKyAzMnB4KTsgbWFyZ2luOiAxNnB4IC0xNnB4OyB9IG1kLWNhcmQtdGl0bGUtZ3JvdXAgeyBtYXJnaW46IDA7IH0gW21kLWNhcmQteGwtaW1hZ2VdIHsgbWFyZ2luLWxlZnQ6IDA7IG1hcmdpbi1yaWdodDogMDsgfSBtZC1jYXJkLWhlYWRlciB7IG1hcmdpbjogLThweCAwIDAgMDsgfSB9IC8qIEZJUlNUL0xBU1QgQ0hJTEQgQURKVVNUTUVOVFMgKi8gbWQtY2FyZCA+IDpmaXJzdC1jaGlsZCwgbWQtY2FyZC1jb250ZW50ID4gOmZpcnN0LWNoaWxkIHsgbWFyZ2luLXRvcDogMDsgfSBtZC1jYXJkID4gOmxhc3QtY2hpbGQsIG1kLWNhcmQtY29udGVudCA+IDpsYXN0LWNoaWxkIHsgbWFyZ2luLWJvdHRvbTogMDsgfSBbbWQtY2FyZC1pbWFnZV06Zmlyc3QtY2hpbGQgeyBtYXJnaW4tdG9wOiAtMjRweDsgfSBtZC1jYXJkID4gbWQtY2FyZC1hY3Rpb25zOmxhc3QtY2hpbGQgeyBtYXJnaW4tYm90dG9tOiAtMTZweDsgcGFkZGluZy1ib3R0b206IDA7IH0gbWQtY2FyZC1hY3Rpb25zIFttZC1idXR0b25dOmZpcnN0LWNoaWxkLCBtZC1jYXJkLWFjdGlvbnMgW21kLXJhaXNlZC1idXR0b25dOmZpcnN0LWNoaWxkIHsgbWFyZ2luLWxlZnQ6IDA7IG1hcmdpbi1yaWdodDogMDsgfSBtZC1jYXJkLXRpdGxlOm5vdCg6Zmlyc3QtY2hpbGQpLCBtZC1jYXJkLXN1YnRpdGxlOm5vdCg6Zmlyc3QtY2hpbGQpIHsgbWFyZ2luLXRvcDogLTRweDsgfSBtZC1jYXJkLWhlYWRlciBtZC1jYXJkLXN1YnRpdGxlOm5vdCg6Zmlyc3QtY2hpbGQpIHsgbWFyZ2luLXRvcDogLThweDsgfSBtZC1jYXJkID4gW21kLWNhcmQteGwtaW1hZ2VdOmZpcnN0LWNoaWxkIHsgbWFyZ2luLXRvcDogLThweDsgfSBtZC1jYXJkID4gW21kLWNhcmQteGwtaW1hZ2VdOmxhc3QtY2hpbGQgeyBtYXJnaW4tYm90dG9tOiAtOHB4OyB9IC8qIyBzb3VyY2VNYXBwaW5nVVJMPWNhcmQuY3NzLm1hcCAqLyBcIl0sXG4gICAgICAgICAgICBlbmNhcHN1bGF0aW9uOiBfYW5ndWxhcl9jb3JlLlZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IF9hbmd1bGFyX2NvcmUuQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRDYXJkKTtcbiAgICByZXR1cm4gTWRDYXJkO1xufSgpKTtcbi8qICBUaGUgZm9sbG93aW5nIGNvbXBvbmVudHMgZG9uJ3QgaGF2ZSBhbnkgYmVoYXZpb3IuXG4gVGhleSBzaW1wbHkgdXNlIGNvbnRlbnQgcHJvamVjdGlvbiB0byB3cmFwIHVzZXIgY29udGVudFxuIGZvciBmbGV4IGxheW91dCBwdXJwb3NlcyBpbiA8bWQtY2FyZD4gKGFuZCB0aHVzIGFsbG93IGEgY2xlYW5lciwgYm9pbGVycGxhdGUtZnJlZSBBUEkpLlxuXG5cbjxtZC1jYXJkLWhlYWRlcj4gaXMgYSBjb21wb25lbnQgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoaW4gdGhlIDxtZC1jYXJkPiBjb21wb25lbnQuXG5JdCBhZGRzIHN0eWxlcyBmb3IgYSBwcmVzZXQgaGVhZGVyIHNlY3Rpb24gKGkuZS4gYSB0aXRsZSwgc3VidGl0bGUsIGFuZCBhdmF0YXIgbGF5b3V0KS5cblxuWW91IGNhbiBzZWUgYW4gZXhhbXBsZSBvZiBhIGNhcmQgd2l0aCBhIGhlYWRlciBoZXJlOlxuaHR0cDovL2VtYmVkLnBsbmtyLmNvL3R2SmwxOXozZ1pUUWQ2V213a0lhL1xuXG5UT0RPKGthcmEpOiB1cGRhdGUgbGluayB0byBkZW1vIHNpdGUgd2hlbiBpdCBleGlzdHNcbiovXG52YXIgTWRDYXJkSGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZENhcmRIZWFkZXIoKSB7XG4gICAgfVxuICAgIE1kQ2FyZEhlYWRlciA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkNvbXBvbmVudCh7c2VsZWN0b3I6ICdtZC1jYXJkLWhlYWRlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudCBzZWxlY3Q9XFxcIlttZC1jYXJkLWF2YXRhcl1cXFwiPjwvbmctY29udGVudD4gPGRpdiBjbGFzcz1cXFwibWQtY2FyZC1oZWFkZXItdGV4dFxcXCI+IDxuZy1jb250ZW50IHNlbGVjdD1cXFwibWQtY2FyZC10aXRsZSwgbWQtY2FyZC1zdWJ0aXRsZVxcXCI+PC9uZy1jb250ZW50PiA8L2Rpdj4gPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBcIixcbiAgICAgICAgICAgIGVuY2Fwc3VsYXRpb246IF9hbmd1bGFyX2NvcmUuVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogX2FuZ3VsYXJfY29yZS5DaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZENhcmRIZWFkZXIpO1xuICAgIHJldHVybiBNZENhcmRIZWFkZXI7XG59KCkpO1xuLypcblxuPG1kLWNhcmQtdGl0bGUtZ3JvdXA+IGlzIGEgY29tcG9uZW50IGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIHRoZSA8bWQtY2FyZD4gY29tcG9uZW50LlxuSXQgYWRkcyBzdHlsZXMgZm9yIGEgcHJlc2V0IGxheW91dCB0aGF0IGdyb3VwcyBhbiBpbWFnZSB3aXRoIGEgdGl0bGUgc2VjdGlvbi5cblxuWW91IGNhbiBzZWUgYW4gZXhhbXBsZSBvZiBhIGNhcmQgd2l0aCBhIHRpdGxlLWdyb3VwIHNlY3Rpb24gaGVyZTpcbmh0dHA6Ly9lbWJlZC5wbG5rci5jby9FRGZnQ0Y5ZUtjWGppbmkxV09EbS9cblxuVE9ETyhrYXJhKTogdXBkYXRlIGxpbmsgdG8gZGVtbyBzaXRlIHdoZW4gaXQgZXhpc3RzXG4qL1xudmFyIE1kQ2FyZFRpdGxlR3JvdXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kQ2FyZFRpdGxlR3JvdXAoKSB7XG4gICAgfVxuICAgIE1kQ2FyZFRpdGxlR3JvdXAgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5Db21wb25lbnQoe3NlbGVjdG9yOiAnbWQtY2FyZC10aXRsZS1ncm91cCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2PiA8bmctY29udGVudCBzZWxlY3Q9XFxcIm1kLWNhcmQtdGl0bGUsIG1kLWNhcmQtc3VidGl0bGVcXFwiPjwvbmctY29udGVudD4gPC9kaXY+IDxuZy1jb250ZW50IHNlbGVjdD1cXFwiaW1nXFxcIj48L25nLWNvbnRlbnQ+IDxuZy1jb250ZW50PjwvbmctY29udGVudD4gXCIsXG4gICAgICAgICAgICBlbmNhcHN1bGF0aW9uOiBfYW5ndWxhcl9jb3JlLlZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IF9hbmd1bGFyX2NvcmUuQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRDYXJkVGl0bGVHcm91cCk7XG4gICAgcmV0dXJuIE1kQ2FyZFRpdGxlR3JvdXA7XG59KCkpO1xudmFyIE1kQ2FyZE1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRDYXJkTW9kdWxlKCkge1xuICAgIH1cbiAgICBNZENhcmRNb2R1bGUuZm9yUm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBNZENhcmRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNZENhcmRNb2R1bGUgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5OZ01vZHVsZSh7XG4gICAgICAgICAgICBleHBvcnRzOiBbXG4gICAgICAgICAgICAgICAgTWRDYXJkLCBNZENhcmRIZWFkZXIsIE1kQ2FyZFRpdGxlR3JvdXAsIE1kQ2FyZENvbnRlbnQsIE1kQ2FyZFRpdGxlLCBNZENhcmRTdWJ0aXRsZSxcbiAgICAgICAgICAgICAgICBNZENhcmRBY3Rpb25zXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgICAgICAgICAgTWRDYXJkLCBNZENhcmRIZWFkZXIsIE1kQ2FyZFRpdGxlR3JvdXAsIE1kQ2FyZENvbnRlbnQsIE1kQ2FyZFRpdGxlLCBNZENhcmRTdWJ0aXRsZSxcbiAgICAgICAgICAgICAgICBNZENhcmRBY3Rpb25zXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRDYXJkTW9kdWxlKTtcbiAgICByZXR1cm4gTWRDYXJkTW9kdWxlO1xufSgpKTtcblxuZXhwb3J0cy5NZENhcmRDb250ZW50ID0gTWRDYXJkQ29udGVudDtcbmV4cG9ydHMuTWRDYXJkVGl0bGUgPSBNZENhcmRUaXRsZTtcbmV4cG9ydHMuTWRDYXJkU3VidGl0bGUgPSBNZENhcmRTdWJ0aXRsZTtcbmV4cG9ydHMuTWRDYXJkQWN0aW9ucyA9IE1kQ2FyZEFjdGlvbnM7XG5leHBvcnRzLk1kQ2FyZCA9IE1kQ2FyZDtcbmV4cG9ydHMuTWRDYXJkSGVhZGVyID0gTWRDYXJkSGVhZGVyO1xuZXhwb3J0cy5NZENhcmRUaXRsZUdyb3VwID0gTWRDYXJkVGl0bGVHcm91cDtcbmV4cG9ydHMuTWRDYXJkTW9kdWxlID0gTWRDYXJkTW9kdWxlO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9AYW5ndWxhcjItbWF0ZXJpYWwvY2FyZC9jYXJkLnVtZC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUnKSwgcmVxdWlyZSgnQGFuZ3VsYXIvY29tbW9uJyksIHJlcXVpcmUoJ0Bhbmd1bGFyMi1tYXRlcmlhbC9jb3JlJykpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ0Bhbmd1bGFyL2NvcmUnLCAnQGFuZ3VsYXIvY29tbW9uJywgJ0Bhbmd1bGFyMi1tYXRlcmlhbC9jb3JlJ10sIGZhY3RvcnkpIDpcbiAgICAoZmFjdG9yeSgoZ2xvYmFsLm1kID0gZ2xvYmFsLm1kIHx8IHt9LCBnbG9iYWwubWQuYnV0dG9uID0gZ2xvYmFsLm1kLmJ1dHRvbiB8fCB7fSksZ2xvYmFsLm5nLmNvcmUsZ2xvYmFsLm5nLmNvbW1vbixnbG9iYWwubWQuY29yZSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMsX2FuZ3VsYXJfY29yZSxfYW5ndWxhcl9jb21tb24sX2FuZ3VsYXIyTWF0ZXJpYWxfY29yZSkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX2V4dGVuZHMgPSAod2luZG93ICYmIHdpbmRvdy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBfX2RlY29yYXRlID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8vIFRPRE8oamVsYm91cm4pOiBNYWtlIHRoZSBgaXNNb3VzZURvd25gIHN0dWZmIGRvbmUgd2l0aCBvbmUgZ2xvYmFsIGxpc3RlbmVyLlxuLy8gVE9ETyhrYXJhKTogQ29udmVydCBhdHRyaWJ1dGUgc2VsZWN0b3JzIHRvIGNsYXNzZXMgd2hlbiBhdHRyIG1hcHMgYmVjb21lIGF2YWlsYWJsZVxudmFyIE1kQnV0dG9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZEJ1dHRvbihfZWxlbWVudFJlZiwgX3JlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYgPSBfZWxlbWVudFJlZjtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSBfcmVuZGVyZXI7XG4gICAgICAgIC8qKiBXaGV0aGVyIHRoZSBidXR0b24gaGFzIGZvY3VzIGZyb20gdGhlIGtleWJvYXJkIChub3QgdGhlIG1vdXNlKS4gVXNlZCBmb3IgY2xhc3MgYmluZGluZy4gKi9cbiAgICAgICAgdGhpcy5faXNLZXlib2FyZEZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqIFdoZXRoZXIgYSBtb3VzZWRvd24gaGFzIG9jY3VycmVkIG9uIHRoaXMgZWxlbWVudCBpbiB0aGUgbGFzdCAxMDBtcy4gKi9cbiAgICAgICAgdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgLyoqIFdoZXRoZXIgdGhlIHJpcHBsZSBlZmZlY3Qgb24gY2xpY2sgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICAgICAgICB0aGlzLmRpc2FibGVSaXBwbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1kQnV0dG9uLnByb3RvdHlwZSwgXCJjb2xvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29sb3IodmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuX3NldE1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gV2Ugb25seSAqc2hvdyogdGhlIGZvY3VzIHN0eWxlIHdoZW4gZm9jdXMgaGFzIGNvbWUgdG8gdGhlIGJ1dHRvbiB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAgICAvLyBUaGUgTWF0ZXJpYWwgRGVzaWduIHNwZWMgaXMgc2lsZW50IG9uIHRoaXMgdG9waWMsIGFuZCB3aXRob3V0IGRvaW5nIHRoaXMsIHRoZVxuICAgICAgICAvLyBidXR0b24gY29udGludWVzIHRvIGxvb2sgOmFjdGl2ZSBhZnRlciBjbGlja2luZy5cbiAgICAgICAgLy8gQHNlZSBodHRwOi8vbWFyY3lzdXR0b24uY29tL2J1dHRvbi1mb2N1cy1oZWxsL1xuICAgICAgICB0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBfdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTsgfSwgMTAwKTtcbiAgICB9O1xuICAgIE1kQnV0dG9uLnByb3RvdHlwZS5fdXBkYXRlQ29sb3IgPSBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudENvbG9yKHRoaXMuX2NvbG9yLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnRDb2xvcihuZXdDb2xvciwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gbmV3Q29sb3I7XG4gICAgfTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuX3NldEVsZW1lbnRDb2xvciA9IGZ1bmN0aW9uIChjb2xvciwgaXNBZGQpIHtcbiAgICAgICAgaWYgKGNvbG9yICE9IG51bGwgJiYgY29sb3IgIT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFwibWQtXCIgKyBjb2xvciwgaXNBZGQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuX3NldEtleWJvYXJkRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2lzS2V5Ym9hcmRGb2N1c2VkID0gIXRoaXMuX2lzTW91c2VEb3duO1xuICAgIH07XG4gICAgTWRCdXR0b24ucHJvdG90eXBlLl9yZW1vdmVLZXlib2FyZEZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pc0tleWJvYXJkRm9jdXNlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgLyoqIFRPRE8oaGFuc2wpOiBlMmUgdGVzdCB0aGlzIGZ1bmN0aW9uLiAqL1xuICAgIE1kQnV0dG9uLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuZ2V0SG9zdEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuaXNSb3VuZEJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKCdtZC1pY29uLWJ1dHRvbicpIHx8XG4gICAgICAgICAgICBlbC5oYXNBdHRyaWJ1dGUoJ21kLWZhYicpIHx8XG4gICAgICAgICAgICBlbC5oYXNBdHRyaWJ1dGUoJ21kLW1pbmktZmFiJyk7XG4gICAgfTtcbiAgICBNZEJ1dHRvbi5wcm90b3R5cGUuaXNSaXBwbGVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuZGlzYWJsZVJpcHBsZTtcbiAgICB9O1xuICAgIF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLklucHV0KCksXG4gICAgICAgIF9hbmd1bGFyMk1hdGVyaWFsX2NvcmUuQm9vbGVhbkZpZWxkVmFsdWUoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcbiAgICBdLCBNZEJ1dHRvbi5wcm90b3R5cGUsIFwiZGlzYWJsZVJpcHBsZVwiLCB2b2lkIDApO1xuICAgIE1kQnV0dG9uID0gX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuQ29tcG9uZW50KHtzZWxlY3RvcjogJ2J1dHRvblttZC1idXR0b25dLCBidXR0b25bbWQtcmFpc2VkLWJ1dHRvbl0sIGJ1dHRvblttZC1pY29uLWJ1dHRvbl0sICcgK1xuICAgICAgICAgICAgICAgICdidXR0b25bbWQtZmFiXSwgYnV0dG9uW21kLW1pbmktZmFiXScsXG4gICAgICAgICAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAnW2NsYXNzLm1kLWJ1dHRvbi1mb2N1c10nOiAnX2lzS2V5Ym9hcmRGb2N1c2VkJyxcbiAgICAgICAgICAgICAgICAnKG1vdXNlZG93biknOiAnX3NldE1vdXNlZG93bigpJyxcbiAgICAgICAgICAgICAgICAnKGZvY3VzKSc6ICdfc2V0S2V5Ym9hcmRGb2N1cygpJyxcbiAgICAgICAgICAgICAgICAnKGJsdXIpJzogJ19yZW1vdmVLZXlib2FyZEZvY3VzKCknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxzcGFuIGNsYXNzPVxcXCJtZC1idXR0b24td3JhcHBlclxcXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj4gXCIsXG4gICAgICAgICAgICBzdHlsZXM6IFtcIi8qKiAqIEEgY29sbGVjdGlvbiBvZiBtaXhpbnMgYW5kIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgZWxldmF0aW9uIHRvIGEgbWF0ZXJpYWwgKiBlbGVtZW50LiAqIFNlZTogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9kZXNpZ24vc3BlYy93aGF0LWlzLW1hdGVyaWFsL2VsZXZhdGlvbi1zaGFkb3dzLmh0bWwgKiBFeGFtcGxlczogKiAqICogLm1kLWZvbyB7ICogICBAaW5jbHVkZSAkbWQtZWxldmF0aW9uKDIpOyAqICogICAmOmFjdGl2ZSB7ICogICAgIEBpbmNsdWRlICRtZC1lbGV2YXRpb24oOCk7ICogICB9ICogfSAqICogPGRpdiBpZD1cXFwiZXh0ZXJuYWwtY2FyZFxcXCIgY2xhc3M9XFxcIm1kLWVsZXZhdGlvbi16MlxcXCI+PHA+U29tZSBjb250ZW50PC9wPjwvZGl2PiAqICogRm9yIGFuIGV4cGxhbmF0aW9uIG9mIHRoZSBkZXNpZ24gYmVoaW5kIGhvdyBlbGV2YXRpb24gaXMgaW1wbGVtZW50ZWQsIHNlZSB0aGUgZGVzaWduIGRvYyBhdCAqIGh0dHBzOi8vZ29vLmdsL0txMGs5Wi4gKi8gLyoqICogVGhlIGNzcyBwcm9wZXJ0eSB1c2VkIGZvciBlbGV2YXRpb24uIEluIG1vc3QgY2FzZXMgdGhpcyBzaG91bGQgbm90IGJlIGNoYW5nZWQuIEl0IGlzIGV4cG9zZWQgKiBhcyBhIHZhcmlhYmxlIGZvciBhYnN0cmFjdGlvbiAvIGVhc3kgdXNlIHdoZW4gbmVlZGluZyB0byByZWZlcmVuY2UgdGhlIHByb3BlcnR5IGRpcmVjdGx5LCBmb3IgKiBleGFtcGxlIGluIGEgd2lsbC1jaGFuZ2UgcnVsZS4gKi8gLyoqIFRoZSBkZWZhdWx0IGR1cmF0aW9uIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuICovIC8qKiBUaGUgZGVmYXVsdCBlYXNpbmcgdmFsdWUgZm9yIGVsZXZhdGlvbiB0cmFuc2l0aW9ucy4gKi8gLyoqICogQXBwbGllcyB0aGUgY29ycmVjdCBjc3MgcnVsZXMgdG8gYW4gZWxlbWVudCB0byBnaXZlIGl0IHRoZSBlbGV2YXRpb24gc3BlY2lmaWVkIGJ5ICR6VmFsdWUuICogVGhlICR6VmFsdWUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDI0LiAqLyAvKiogKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHZhbHVlIGZvciBhIHRyYW5zaXRpb24gcHJvcGVydHkgZm9yIGVsZXZhdGlvbi4gKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gZGlyZWN0bHkgaXMgdXNlZnVsIGluIHNpdHVhdGlvbnMgd2hlcmUgYSBjb21wb25lbnQgbmVlZHMgdG8gdHJhbnNpdGlvbiAqIG1vcmUgdGhhbiBvbmUgcHJvcGVydHkuICogKiAuZm9vIHsgKiAgIHRyYW5zaXRpb246IG1kLWVsZXZhdGlvbi10cmFuc2l0aW9uLXByb3BlcnR5LXZhbHVlKCksIG9wYWNpdHkgMTAwbXMgZWFzZTsgKiAgIHdpbGwtY2hhbmdlOiAkbWQtZWxldmF0aW9uLXByb3BlcnR5LCBvcGFjaXR5OyAqIH0gKi8gLyoqICogQXBwbGllcyB0aGUgY29ycmVjdCBjc3MgcnVsZXMgbmVlZGVkIHRvIGhhdmUgYW4gZWxlbWVudCB0cmFuc2l0aW9uIGJldHdlZW4gZWxldmF0aW9ucy4gKiBUaGlzIG1peGluIHNob3VsZCBiZSBhcHBsaWVkIHRvIGVsZW1lbnRzIHdob3NlIGVsZXZhdGlvbiB2YWx1ZXMgd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIHRoZWlyICogY29udGV4dCAoZS5nLiB3aGVuIGFjdGl2ZSBvciBkaXNhYmxlZCkuICovIC8qKiAqIFRoaXMgbWl4aW4gb3ZlcnJpZGVzIGRlZmF1bHQgYnV0dG9uIHN0eWxlcyBsaWtlIHRoZSBncmF5IGJhY2tncm91bmQsICogdGhlIGJvcmRlciwgYW5kIHRoZSBvdXRsaW5lLiAqLyAvKiogQXBwbGllcyBhIHByb3BlcnR5IHRvIGFuIG1kLWJ1dHRvbiBlbGVtZW50IGZvciBlYWNoIG9mIHRoZSBzdXBwb3J0ZWQgcGFsZXR0ZXMuICovIC8qKiBBcHBsaWVzIGEgZm9jdXMgc3R5bGUgdG8gYW4gbWQtYnV0dG9uIGVsZW1lbnQgZm9yIGVhY2ggb2YgdGhlIHN1cHBvcnRlZCBwYWxldHRlcy4gKi8gW21kLXJhaXNlZC1idXR0b25dLCBbbWQtZmFiXSwgW21kLW1pbmktZmFiXSwgW21kLWJ1dHRvbl0sIFttZC1pY29uLWJ1dHRvbl0geyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBwb3NpdGlvbjogcmVsYXRpdmU7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjdXJzb3I6IHBvaW50ZXI7IHVzZXItc2VsZWN0OiBub25lOyBvdXRsaW5lOiBub25lOyBib3JkZXI6IG5vbmU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IGZvbnQtc2l6ZTogMTRweDsgZm9udC1mYW1pbHk6IFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IDUwMDsgY29sb3I6IGN1cnJlbnRDb2xvcjsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW46IDA7IG1pbi13aWR0aDogODhweDsgbGluZS1oZWlnaHQ6IDM2cHg7IHBhZGRpbmc6IDAgMTZweDsgYm9yZGVyLXJhZGl1czogM3B4OyB9IC5tZC1wcmltYXJ5W21kLXJhaXNlZC1idXR0b25dLCAubWQtcHJpbWFyeVttZC1mYWJdLCAubWQtcHJpbWFyeVttZC1taW5pLWZhYl0sIC5tZC1wcmltYXJ5W21kLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W21kLWljb24tYnV0dG9uXSB7IGNvbG9yOiAjMDA5Njg4OyB9IC5tZC1hY2NlbnRbbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbbWQtZmFiXSwgLm1kLWFjY2VudFttZC1taW5pLWZhYl0sIC5tZC1hY2NlbnRbbWQtYnV0dG9uXSwgLm1kLWFjY2VudFttZC1pY29uLWJ1dHRvbl0geyBjb2xvcjogIzljMjdiMDsgfSAubWQtd2FyblttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLXdhcm5bbWQtZmFiXSwgLm1kLXdhcm5bbWQtbWluaS1mYWJdLCAubWQtd2FyblttZC1idXR0b25dLCAubWQtd2FyblttZC1pY29uLWJ1dHRvbl0geyBjb2xvcjogI2Y0NDMzNjsgfSAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W2Rpc2FibGVkXVttZC1mYWJdLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtbWluaS1mYWJdLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtYnV0dG9uXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLWljb24tYnV0dG9uXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLWZhYl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtYnV0dG9uXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtaWNvbi1idXR0b25dLCAubWQtd2FybltkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC13YXJuW2Rpc2FibGVkXVttZC1mYWJdLCAubWQtd2FybltkaXNhYmxlZF1bbWQtbWluaS1mYWJdLCAubWQtd2FybltkaXNhYmxlZF1bbWQtYnV0dG9uXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLWljb24tYnV0dG9uXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLWZhYl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtYnV0dG9uXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtaWNvbi1idXR0b25dIHsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7IH0gW2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgW2Rpc2FibGVkXVttZC1mYWJdLCBbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgW2Rpc2FibGVkXVttZC1idXR0b25dLCBbZGlzYWJsZWRdW21kLWljb24tYnV0dG9uXSB7IGN1cnNvcjogZGVmYXVsdDsgfSAubWQtYnV0dG9uLWZvY3VzW21kLXJhaXNlZC1idXR0b25dOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1c1ttZC1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1c1ttZC1taW5pLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzW21kLWJ1dHRvbl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzW21kLWljb24tYnV0dG9uXTo6YWZ0ZXIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgYm90dG9tOiAwOyByaWdodDogMDsgY29udGVudDogJyc7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xMik7IGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7IHBvaW50ZXItZXZlbnRzOiBub25lOyB9IC5tZC1idXR0b24tZm9jdXMubWQtcHJpbWFyeVttZC1yYWlzZWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtcHJpbWFyeVttZC1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC1wcmltYXJ5W21kLW1pbmktZmFiXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtcHJpbWFyeVttZC1idXR0b25dOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC1wcmltYXJ5W21kLWljb24tYnV0dG9uXTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDE1MCwgMTM2LCAwLjEyKTsgfSAubWQtYnV0dG9uLWZvY3VzLm1kLWFjY2VudFttZC1yYWlzZWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtYWNjZW50W21kLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLWFjY2VudFttZC1taW5pLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLWFjY2VudFttZC1idXR0b25dOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC1hY2NlbnRbbWQtaWNvbi1idXR0b25dOjphZnRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTU2LCAzOSwgMTc2LCAwLjEyKTsgfSAubWQtYnV0dG9uLWZvY3VzLm1kLXdhcm5bbWQtcmFpc2VkLWJ1dHRvbl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXdhcm5bbWQtZmFiXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtd2FyblttZC1taW5pLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXdhcm5bbWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtd2FyblttZC1pY29uLWJ1dHRvbl06OmFmdGVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDQsIDY3LCA1NCwgMC4xMik7IH0gW21kLXJhaXNlZC1idXR0b25dLCBbbWQtZmFiXSwgW21kLW1pbmktZmFiXSB7IGJveC1zaGFkb3c6IDBweCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDFweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7IGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IHRyYW5zaXRpb246IGJhY2tncm91bmQgNDAwbXMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSksIGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfSAubWQtcHJpbWFyeVttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLXByaW1hcnlbbWQtZmFiXSwgLm1kLXByaW1hcnlbbWQtbWluaS1mYWJdIHsgY29sb3I6IHdoaXRlOyB9IC5tZC1hY2NlbnRbbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbbWQtZmFiXSwgLm1kLWFjY2VudFttZC1taW5pLWZhYl0geyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg3MDU4OCk7IH0gLm1kLXdhcm5bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC13YXJuW21kLWZhYl0sIC5tZC13YXJuW21kLW1pbmktZmFiXSB7IGNvbG9yOiB3aGl0ZTsgfSAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W2Rpc2FibGVkXVttZC1mYWJdLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtbWluaS1mYWJdLCAubWQtYWNjZW50W2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtbWluaS1mYWJdLCAubWQtd2FybltkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC13YXJuW2Rpc2FibGVkXVttZC1mYWJdLCAubWQtd2FybltkaXNhYmxlZF1bbWQtbWluaS1mYWJdLCBbZGlzYWJsZWRdW2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtZmFiXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtbWluaS1mYWJdIHsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7IH0gLm1kLXByaW1hcnlbbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W21kLWZhYl0sIC5tZC1wcmltYXJ5W21kLW1pbmktZmFiXSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDk2ODg7IH0gLm1kLWFjY2VudFttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLWFjY2VudFttZC1mYWJdLCAubWQtYWNjZW50W21kLW1pbmktZmFiXSB7IGJhY2tncm91bmQtY29sb3I6ICM5YzI3YjA7IH0gLm1kLXdhcm5bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC13YXJuW21kLWZhYl0sIC5tZC13YXJuW21kLW1pbmktZmFiXSB7IGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7IH0gLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLWZhYl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtd2FybltkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLWZhYl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLW1pbmktZmFiXSB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xMik7IH0gW21kLXJhaXNlZC1idXR0b25dOmFjdGl2ZSwgW21kLWZhYl06YWN0aXZlLCBbbWQtbWluaS1mYWJdOmFjdGl2ZSB7IGJveC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTsgfSBbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCBbZGlzYWJsZWRdW21kLWZhYl0sIFtkaXNhYmxlZF1bbWQtbWluaS1mYWJdIHsgYm94LXNoYWRvdzogbm9uZTsgfSBbbWQtYnV0dG9uXTpob3Zlcjo6YWZ0ZXIsIFttZC1pY29uLWJ1dHRvbl06aG92ZXI6OmFmdGVyIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGJvdHRvbTogMDsgcmlnaHQ6IDA7IGNvbnRlbnQ6ICcnOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTIpOyBib3JkZXItcmFkaXVzOiBpbmhlcml0OyBwb2ludGVyLWV2ZW50czogbm9uZTsgfSBbbWQtYnV0dG9uXTpob3Zlci5tZC1wcmltYXJ5OjphZnRlciwgW21kLWljb24tYnV0dG9uXTpob3Zlci5tZC1wcmltYXJ5OjphZnRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTUwLCAxMzYsIDAuMTIpOyB9IFttZC1idXR0b25dOmhvdmVyLm1kLWFjY2VudDo6YWZ0ZXIsIFttZC1pY29uLWJ1dHRvbl06aG92ZXIubWQtYWNjZW50OjphZnRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTU2LCAzOSwgMTc2LCAwLjEyKTsgfSBbbWQtYnV0dG9uXTpob3Zlci5tZC13YXJuOjphZnRlciwgW21kLWljb24tYnV0dG9uXTpob3Zlci5tZC13YXJuOjphZnRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ0LCA2NywgNTQsIDAuMTIpOyB9IFttZC1idXR0b25dW2Rpc2FibGVkXTpob3Zlci5tZC1wcmltYXJ5LCBbbWQtYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtYWNjZW50LCBbbWQtYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtd2FybiwgW21kLWJ1dHRvbl1bZGlzYWJsZWRdOmhvdmVyOjphZnRlciwgW21kLWljb24tYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtcHJpbWFyeSwgW21kLWljb24tYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtYWNjZW50LCBbbWQtaWNvbi1idXR0b25dW2Rpc2FibGVkXTpob3Zlci5tZC13YXJuLCBbbWQtaWNvbi1idXR0b25dW2Rpc2FibGVkXTpob3Zlcjo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfSBbbWQtZmFiXSB7IG1pbi13aWR0aDogMDsgYm9yZGVyLXJhZGl1czogNTAlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjOWMyN2IwOyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg3MDU4OCk7IHdpZHRoOiA1NnB4OyBoZWlnaHQ6IDU2cHg7IHBhZGRpbmc6IDA7IH0gW21kLWZhYl0gaSwgW21kLWZhYl0gbWQtaWNvbiB7IHBhZGRpbmc6IDE2cHggMDsgfSBbbWQtbWluaS1mYWJdIHsgbWluLXdpZHRoOiAwOyBib3JkZXItcmFkaXVzOiA1MCU7IGJhY2tncm91bmQtY29sb3I6ICM5YzI3YjA7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODcwNTg4KTsgd2lkdGg6IDQwcHg7IGhlaWdodDogNDBweDsgcGFkZGluZzogMDsgfSBbbWQtbWluaS1mYWJdIGksIFttZC1taW5pLWZhYl0gbWQtaWNvbiB7IHBhZGRpbmc6IDhweCAwOyB9IFttZC1pY29uLWJ1dHRvbl0geyBtaW4td2lkdGg6IDA7IHBhZGRpbmc6IDA7IHdpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiAyNHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0gW21kLWljb24tYnV0dG9uXSAubWQtYnV0dG9uLXdyYXBwZXIgPiAqIHsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSAubWQtYnV0dG9uLXJpcHBsZSB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBib3R0b206IDA7IHJpZ2h0OiAwOyB9IC5tZC1idXR0b24tcmlwcGxlLXJvdW5kIHsgYm9yZGVyLXJhZGl1czogNTAlOyB6LWluZGV4OiAxOyB9IEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7IC5tZC1yYWlzZWQtYnV0dG9uLCAubWQtZmFiLCAubWQtbWluaS1mYWIgeyBib3JkZXI6IDFweCBzb2xpZCAjZmZmOyB9IH0gLyojIHNvdXJjZU1hcHBpbmdVUkw9YnV0dG9uLmNzcy5tYXAgKi8gXCJdLFxuICAgICAgICAgICAgZW5jYXBzdWxhdGlvbjogX2FuZ3VsYXJfY29yZS5WaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBfYW5ndWxhcl9jb3JlLkNoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICAgICAgfSksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtfYW5ndWxhcl9jb3JlLkVsZW1lbnRSZWYsIF9hbmd1bGFyX2NvcmUuUmVuZGVyZXJdKVxuICAgIF0sIE1kQnV0dG9uKTtcbiAgICByZXR1cm4gTWRCdXR0b247XG59KCkpO1xudmFyIE1kQW5jaG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWRBbmNob3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWRBbmNob3IoZWxlbWVudFJlZiwgcmVuZGVyZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZEFuY2hvci5wcm90b3R5cGUsIFwidGFiSW5kZXhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWRBbmNob3IucHJvdG90eXBlLCBcImlzQXJpYURpc2FibGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZEFuY2hvci5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gVGhlIHByZXNlbmNlIG9mICphbnkqIGRpc2FibGVkIHZhbHVlIG1ha2VzIHRoZSBjb21wb25lbnQgZGlzYWJsZWQsICpleGNlcHQqIGZvciBmYWxzZS5cbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT0gZmFsc2UpID8gdHJ1ZSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1kQW5jaG9yLnByb3RvdHlwZS5faGFsdERpc2FibGVkRXZlbnRzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEEgZGlzYWJsZWQgYnV0dG9uIHNob3VsZG4ndCBhcHBseSBhbnkgYWN0aW9uc1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5Ib3N0QmluZGluZygndGFiSW5kZXgnKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgTnVtYmVyKVxuICAgIF0sIE1kQW5jaG9yLnByb3RvdHlwZSwgXCJ0YWJJbmRleFwiLCBudWxsKTtcbiAgICBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5Ib3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJyksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcbiAgICBdLCBNZEFuY2hvci5wcm90b3R5cGUsIFwiaXNBcmlhRGlzYWJsZWRcIiwgbnVsbCk7XG4gICAgX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKSxcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgnZGlzYWJsZWQnKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgT2JqZWN0KVxuICAgIF0sIE1kQW5jaG9yLnByb3RvdHlwZSwgXCJkaXNhYmxlZFwiLCBudWxsKTtcbiAgICBNZEFuY2hvciA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkNvbXBvbmVudCh7c2VsZWN0b3I6ICdhW21kLWJ1dHRvbl0sIGFbbWQtcmFpc2VkLWJ1dHRvbl0sIGFbbWQtaWNvbi1idXR0b25dLCBhW21kLWZhYl0sIGFbbWQtbWluaS1mYWJdJyxcbiAgICAgICAgICAgIGlucHV0czogWydjb2xvciddLFxuICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICdbY2xhc3MubWQtYnV0dG9uLWZvY3VzXSc6ICdfaXNLZXlib2FyZEZvY3VzZWQnLFxuICAgICAgICAgICAgICAgICcobW91c2Vkb3duKSc6ICdfc2V0TW91c2Vkb3duKCknLFxuICAgICAgICAgICAgICAgICcoZm9jdXMpJzogJ19zZXRLZXlib2FyZEZvY3VzKCknLFxuICAgICAgICAgICAgICAgICcoYmx1ciknOiAnX3JlbW92ZUtleWJvYXJkRm9jdXMoKScsXG4gICAgICAgICAgICAgICAgJyhjbGljayknOiAnX2hhbHREaXNhYmxlZEV2ZW50cygkZXZlbnQpJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8c3BhbiBjbGFzcz1cXFwibWQtYnV0dG9uLXdyYXBwZXJcXFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+IFwiLFxuICAgICAgICAgICAgc3R5bGVzOiBbXCIvKiogKiBBIGNvbGxlY3Rpb24gb2YgbWl4aW5zIGFuZCBDU1MgY2xhc3NlcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IGVsZXZhdGlvbiB0byBhIG1hdGVyaWFsICogZWxlbWVudC4gKiBTZWU6IGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vZGVzaWduL3NwZWMvd2hhdC1pcy1tYXRlcmlhbC9lbGV2YXRpb24tc2hhZG93cy5odG1sICogRXhhbXBsZXM6ICogKiAqIC5tZC1mb28geyAqICAgQGluY2x1ZGUgJG1kLWVsZXZhdGlvbigyKTsgKiAqICAgJjphY3RpdmUgeyAqICAgICBAaW5jbHVkZSAkbWQtZWxldmF0aW9uKDgpOyAqICAgfSAqIH0gKiAqIDxkaXYgaWQ9XFxcImV4dGVybmFsLWNhcmRcXFwiIGNsYXNzPVxcXCJtZC1lbGV2YXRpb24tejJcXFwiPjxwPlNvbWUgY29udGVudDwvcD48L2Rpdj4gKiAqIEZvciBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZGVzaWduIGJlaGluZCBob3cgZWxldmF0aW9uIGlzIGltcGxlbWVudGVkLCBzZWUgdGhlIGRlc2lnbiBkb2MgYXQgKiBodHRwczovL2dvby5nbC9LcTBrOVouICovIC8qKiAqIFRoZSBjc3MgcHJvcGVydHkgdXNlZCBmb3IgZWxldmF0aW9uLiBJbiBtb3N0IGNhc2VzIHRoaXMgc2hvdWxkIG5vdCBiZSBjaGFuZ2VkLiBJdCBpcyBleHBvc2VkICogYXMgYSB2YXJpYWJsZSBmb3IgYWJzdHJhY3Rpb24gLyBlYXN5IHVzZSB3aGVuIG5lZWRpbmcgdG8gcmVmZXJlbmNlIHRoZSBwcm9wZXJ0eSBkaXJlY3RseSwgZm9yICogZXhhbXBsZSBpbiBhIHdpbGwtY2hhbmdlIHJ1bGUuICovIC8qKiBUaGUgZGVmYXVsdCBkdXJhdGlvbiB2YWx1ZSBmb3IgZWxldmF0aW9uIHRyYW5zaXRpb25zLiAqLyAvKiogVGhlIGRlZmF1bHQgZWFzaW5nIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuICovIC8qKiAqIEFwcGxpZXMgdGhlIGNvcnJlY3QgY3NzIHJ1bGVzIHRvIGFuIGVsZW1lbnQgdG8gZ2l2ZSBpdCB0aGUgZWxldmF0aW9uIHNwZWNpZmllZCBieSAkelZhbHVlLiAqIFRoZSAkelZhbHVlIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAyNC4gKi8gLyoqICogUmV0dXJucyBhIHN0cmluZyB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSB2YWx1ZSBmb3IgYSB0cmFuc2l0aW9uIHByb3BlcnR5IGZvciBlbGV2YXRpb24uICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIGRpcmVjdGx5IGlzIHVzZWZ1bCBpbiBzaXR1YXRpb25zIHdoZXJlIGEgY29tcG9uZW50IG5lZWRzIHRvIHRyYW5zaXRpb24gKiBtb3JlIHRoYW4gb25lIHByb3BlcnR5LiAqICogLmZvbyB7ICogICB0cmFuc2l0aW9uOiBtZC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZSgpLCBvcGFjaXR5IDEwMG1zIGVhc2U7ICogICB3aWxsLWNoYW5nZTogJG1kLWVsZXZhdGlvbi1wcm9wZXJ0eSwgb3BhY2l0eTsgKiB9ICovIC8qKiAqIEFwcGxpZXMgdGhlIGNvcnJlY3QgY3NzIHJ1bGVzIG5lZWRlZCB0byBoYXZlIGFuIGVsZW1lbnQgdHJhbnNpdGlvbiBiZXR3ZWVuIGVsZXZhdGlvbnMuICogVGhpcyBtaXhpbiBzaG91bGQgYmUgYXBwbGllZCB0byBlbGVtZW50cyB3aG9zZSBlbGV2YXRpb24gdmFsdWVzIHdpbGwgY2hhbmdlIGRlcGVuZGluZyBvbiB0aGVpciAqIGNvbnRleHQgKGUuZy4gd2hlbiBhY3RpdmUgb3IgZGlzYWJsZWQpLiAqLyAvKiogKiBUaGlzIG1peGluIG92ZXJyaWRlcyBkZWZhdWx0IGJ1dHRvbiBzdHlsZXMgbGlrZSB0aGUgZ3JheSBiYWNrZ3JvdW5kLCAqIHRoZSBib3JkZXIsIGFuZCB0aGUgb3V0bGluZS4gKi8gLyoqIEFwcGxpZXMgYSBwcm9wZXJ0eSB0byBhbiBtZC1idXR0b24gZWxlbWVudCBmb3IgZWFjaCBvZiB0aGUgc3VwcG9ydGVkIHBhbGV0dGVzLiAqLyAvKiogQXBwbGllcyBhIGZvY3VzIHN0eWxlIHRvIGFuIG1kLWJ1dHRvbiBlbGVtZW50IGZvciBlYWNoIG9mIHRoZSBzdXBwb3J0ZWQgcGFsZXR0ZXMuICovIFttZC1yYWlzZWQtYnV0dG9uXSwgW21kLWZhYl0sIFttZC1taW5pLWZhYl0sIFttZC1idXR0b25dLCBbbWQtaWNvbi1idXR0b25dIHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgcG9zaXRpb246IHJlbGF0aXZlOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY3Vyc29yOiBwb2ludGVyOyB1c2VyLXNlbGVjdDogbm9uZTsgb3V0bGluZTogbm9uZTsgYm9yZGVyOiBub25lOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdoaXRlLXNwYWNlOiBub3dyYXA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyBmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBSb2JvdG8sIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA1MDA7IGNvbG9yOiBjdXJyZW50Q29sb3I7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAwOyBtaW4td2lkdGg6IDg4cHg7IGxpbmUtaGVpZ2h0OiAzNnB4OyBwYWRkaW5nOiAwIDE2cHg7IGJvcmRlci1yYWRpdXM6IDNweDsgfSAubWQtcHJpbWFyeVttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLXByaW1hcnlbbWQtZmFiXSwgLm1kLXByaW1hcnlbbWQtbWluaS1mYWJdLCAubWQtcHJpbWFyeVttZC1idXR0b25dLCAubWQtcHJpbWFyeVttZC1pY29uLWJ1dHRvbl0geyBjb2xvcjogIzAwOTY4ODsgfSAubWQtYWNjZW50W21kLXJhaXNlZC1idXR0b25dLCAubWQtYWNjZW50W21kLWZhYl0sIC5tZC1hY2NlbnRbbWQtbWluaS1mYWJdLCAubWQtYWNjZW50W21kLWJ1dHRvbl0sIC5tZC1hY2NlbnRbbWQtaWNvbi1idXR0b25dIHsgY29sb3I6ICM5YzI3YjA7IH0gLm1kLXdhcm5bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC13YXJuW21kLWZhYl0sIC5tZC13YXJuW21kLW1pbmktZmFiXSwgLm1kLXdhcm5bbWQtYnV0dG9uXSwgLm1kLXdhcm5bbWQtaWNvbi1idXR0b25dIHsgY29sb3I6ICNmNDQzMzY7IH0gLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W2Rpc2FibGVkXVttZC1pY29uLWJ1dHRvbl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtYWNjZW50W2Rpc2FibGVkXVttZC1mYWJdLCAubWQtYWNjZW50W2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLWJ1dHRvbl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLWljb24tYnV0dG9uXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtd2FybltkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLWJ1dHRvbl0sIC5tZC13YXJuW2Rpc2FibGVkXVttZC1pY29uLWJ1dHRvbl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCBbZGlzYWJsZWRdW2Rpc2FibGVkXVttZC1mYWJdLCBbZGlzYWJsZWRdW2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLWJ1dHRvbl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLWljb24tYnV0dG9uXSB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzgpOyB9IFtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIFtkaXNhYmxlZF1bbWQtZmFiXSwgW2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIFtkaXNhYmxlZF1bbWQtYnV0dG9uXSwgW2Rpc2FibGVkXVttZC1pY29uLWJ1dHRvbl0geyBjdXJzb3I6IGRlZmF1bHQ7IH0gLm1kLWJ1dHRvbi1mb2N1c1ttZC1yYWlzZWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXNbbWQtZmFiXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXNbbWQtbWluaS1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1c1ttZC1idXR0b25dOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1c1ttZC1pY29uLWJ1dHRvbl06OmFmdGVyIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGJvdHRvbTogMDsgcmlnaHQ6IDA7IGNvbnRlbnQ6ICcnOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTIpOyBib3JkZXItcmFkaXVzOiBpbmhlcml0OyBwb2ludGVyLWV2ZW50czogbm9uZTsgfSAubWQtYnV0dG9uLWZvY3VzLm1kLXByaW1hcnlbbWQtcmFpc2VkLWJ1dHRvbl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXByaW1hcnlbbWQtZmFiXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtcHJpbWFyeVttZC1taW5pLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXByaW1hcnlbbWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtcHJpbWFyeVttZC1pY29uLWJ1dHRvbl06OmFmdGVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxNTAsIDEzNiwgMC4xMik7IH0gLm1kLWJ1dHRvbi1mb2N1cy5tZC1hY2NlbnRbbWQtcmFpc2VkLWJ1dHRvbl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLWFjY2VudFttZC1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC1hY2NlbnRbbWQtbWluaS1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC1hY2NlbnRbbWQtYnV0dG9uXTo6YWZ0ZXIsIC5tZC1idXR0b24tZm9jdXMubWQtYWNjZW50W21kLWljb24tYnV0dG9uXTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1NiwgMzksIDE3NiwgMC4xMik7IH0gLm1kLWJ1dHRvbi1mb2N1cy5tZC13YXJuW21kLXJhaXNlZC1idXR0b25dOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC13YXJuW21kLWZhYl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXdhcm5bbWQtbWluaS1mYWJdOjphZnRlciwgLm1kLWJ1dHRvbi1mb2N1cy5tZC13YXJuW21kLWJ1dHRvbl06OmFmdGVyLCAubWQtYnV0dG9uLWZvY3VzLm1kLXdhcm5bbWQtaWNvbi1idXR0b25dOjphZnRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ0LCA2NywgNTQsIDAuMTIpOyB9IFttZC1yYWlzZWQtYnV0dG9uXSwgW21kLWZhYl0sIFttZC1taW5pLWZhYl0geyBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDJweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDQwMG1zIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCBib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7IH0gLm1kLXByaW1hcnlbbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1wcmltYXJ5W21kLWZhYl0sIC5tZC1wcmltYXJ5W21kLW1pbmktZmFiXSB7IGNvbG9yOiB3aGl0ZTsgfSAubWQtYWNjZW50W21kLXJhaXNlZC1idXR0b25dLCAubWQtYWNjZW50W21kLWZhYl0sIC5tZC1hY2NlbnRbbWQtbWluaS1mYWJdIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NzA1ODgpOyB9IC5tZC13YXJuW21kLXJhaXNlZC1idXR0b25dLCAubWQtd2FyblttZC1mYWJdLCAubWQtd2FyblttZC1taW5pLWZhYl0geyBjb2xvcjogd2hpdGU7IH0gLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtcHJpbWFyeVtkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLWFjY2VudFtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLWZhYl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtd2FybltkaXNhYmxlZF1bbWQtZmFiXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLW1pbmktZmFiXSwgW2Rpc2FibGVkXVtkaXNhYmxlZF1bbWQtcmFpc2VkLWJ1dHRvbl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLWZhYl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLW1pbmktZmFiXSB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzgpOyB9IC5tZC1wcmltYXJ5W21kLXJhaXNlZC1idXR0b25dLCAubWQtcHJpbWFyeVttZC1mYWJdLCAubWQtcHJpbWFyeVttZC1taW5pLWZhYl0geyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5Njg4OyB9IC5tZC1hY2NlbnRbbWQtcmFpc2VkLWJ1dHRvbl0sIC5tZC1hY2NlbnRbbWQtZmFiXSwgLm1kLWFjY2VudFttZC1taW5pLWZhYl0geyBiYWNrZ3JvdW5kLWNvbG9yOiAjOWMyN2IwOyB9IC5tZC13YXJuW21kLXJhaXNlZC1idXR0b25dLCAubWQtd2FyblttZC1mYWJdLCAubWQtd2FyblttZC1taW5pLWZhYl0geyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2OyB9IC5tZC1wcmltYXJ5W2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLXByaW1hcnlbZGlzYWJsZWRdW21kLWZhYl0sIC5tZC1wcmltYXJ5W2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIC5tZC1hY2NlbnRbZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCAubWQtYWNjZW50W2Rpc2FibGVkXVttZC1mYWJdLCAubWQtYWNjZW50W2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIC5tZC13YXJuW2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgLm1kLXdhcm5bZGlzYWJsZWRdW21kLWZhYl0sIC5tZC13YXJuW2Rpc2FibGVkXVttZC1taW5pLWZhYl0sIFtkaXNhYmxlZF1bZGlzYWJsZWRdW21kLXJhaXNlZC1idXR0b25dLCBbZGlzYWJsZWRdW2Rpc2FibGVkXVttZC1mYWJdLCBbZGlzYWJsZWRdW2Rpc2FibGVkXVttZC1taW5pLWZhYl0geyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTIpOyB9IFttZC1yYWlzZWQtYnV0dG9uXTphY3RpdmUsIFttZC1mYWJdOmFjdGl2ZSwgW21kLW1pbmktZmFiXTphY3RpdmUgeyBib3gtc2hhZG93OiAwcHggNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMik7IH0gW2Rpc2FibGVkXVttZC1yYWlzZWQtYnV0dG9uXSwgW2Rpc2FibGVkXVttZC1mYWJdLCBbZGlzYWJsZWRdW21kLW1pbmktZmFiXSB7IGJveC1zaGFkb3c6IG5vbmU7IH0gW21kLWJ1dHRvbl06aG92ZXI6OmFmdGVyLCBbbWQtaWNvbi1idXR0b25dOmhvdmVyOjphZnRlciB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBib3R0b206IDA7IHJpZ2h0OiAwOyBjb250ZW50OiAnJzsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEyKTsgYm9yZGVyLXJhZGl1czogaW5oZXJpdDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IH0gW21kLWJ1dHRvbl06aG92ZXIubWQtcHJpbWFyeTo6YWZ0ZXIsIFttZC1pY29uLWJ1dHRvbl06aG92ZXIubWQtcHJpbWFyeTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDE1MCwgMTM2LCAwLjEyKTsgfSBbbWQtYnV0dG9uXTpob3Zlci5tZC1hY2NlbnQ6OmFmdGVyLCBbbWQtaWNvbi1idXR0b25dOmhvdmVyLm1kLWFjY2VudDo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1NiwgMzksIDE3NiwgMC4xMik7IH0gW21kLWJ1dHRvbl06aG92ZXIubWQtd2Fybjo6YWZ0ZXIsIFttZC1pY29uLWJ1dHRvbl06aG92ZXIubWQtd2Fybjo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NCwgNjcsIDU0LCAwLjEyKTsgfSBbbWQtYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtcHJpbWFyeSwgW21kLWJ1dHRvbl1bZGlzYWJsZWRdOmhvdmVyLm1kLWFjY2VudCwgW21kLWJ1dHRvbl1bZGlzYWJsZWRdOmhvdmVyLm1kLXdhcm4sIFttZC1idXR0b25dW2Rpc2FibGVkXTpob3Zlcjo6YWZ0ZXIsIFttZC1pY29uLWJ1dHRvbl1bZGlzYWJsZWRdOmhvdmVyLm1kLXByaW1hcnksIFttZC1pY29uLWJ1dHRvbl1bZGlzYWJsZWRdOmhvdmVyLm1kLWFjY2VudCwgW21kLWljb24tYnV0dG9uXVtkaXNhYmxlZF06aG92ZXIubWQtd2FybiwgW21kLWljb24tYnV0dG9uXVtkaXNhYmxlZF06aG92ZXI6OmFmdGVyIHsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH0gW21kLWZhYl0geyBtaW4td2lkdGg6IDA7IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZC1jb2xvcjogIzljMjdiMDsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NzA1ODgpOyB3aWR0aDogNTZweDsgaGVpZ2h0OiA1NnB4OyBwYWRkaW5nOiAwOyB9IFttZC1mYWJdIGksIFttZC1mYWJdIG1kLWljb24geyBwYWRkaW5nOiAxNnB4IDA7IH0gW21kLW1pbmktZmFiXSB7IG1pbi13aWR0aDogMDsgYm9yZGVyLXJhZGl1czogNTAlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjOWMyN2IwOyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg3MDU4OCk7IHdpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IHBhZGRpbmc6IDA7IH0gW21kLW1pbmktZmFiXSBpLCBbbWQtbWluaS1mYWJdIG1kLWljb24geyBwYWRkaW5nOiA4cHggMDsgfSBbbWQtaWNvbi1idXR0b25dIHsgbWluLXdpZHRoOiAwOyBwYWRkaW5nOiAwOyB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogMjRweDsgYm9yZGVyLXJhZGl1czogNTAlOyB9IFttZC1pY29uLWJ1dHRvbl0gLm1kLWJ1dHRvbi13cmFwcGVyID4gKiB7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gLm1kLWJ1dHRvbi1yaXBwbGUgeyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgYm90dG9tOiAwOyByaWdodDogMDsgfSAubWQtYnV0dG9uLXJpcHBsZS1yb3VuZCB7IGJvcmRlci1yYWRpdXM6IDUwJTsgei1pbmRleDogMTsgfSBAbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkgeyAubWQtcmFpc2VkLWJ1dHRvbiwgLm1kLWZhYiwgLm1kLW1pbmktZmFiIHsgYm9yZGVyOiAxcHggc29saWQgI2ZmZjsgfSB9IC8qIyBzb3VyY2VNYXBwaW5nVVJMPWJ1dHRvbi5jc3MubWFwICovIFwiXSxcbiAgICAgICAgICAgIGVuY2Fwc3VsYXRpb246IF9hbmd1bGFyX2NvcmUuVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW19hbmd1bGFyX2NvcmUuRWxlbWVudFJlZiwgX2FuZ3VsYXJfY29yZS5SZW5kZXJlcl0pXG4gICAgXSwgTWRBbmNob3IpO1xuICAgIHJldHVybiBNZEFuY2hvcjtcbn0oTWRCdXR0b24pKTtcbnZhciBNZEJ1dHRvbk1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRCdXR0b25Nb2R1bGUoKSB7XG4gICAgfVxuICAgIE1kQnV0dG9uTW9kdWxlLmZvclJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogTWRCdXR0b25Nb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNZEJ1dHRvbk1vZHVsZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLk5nTW9kdWxlKHtcbiAgICAgICAgICAgIGltcG9ydHM6IFtfYW5ndWxhcl9jb21tb24uQ29tbW9uTW9kdWxlLCBfYW5ndWxhcjJNYXRlcmlhbF9jb3JlLk1kUmlwcGxlTW9kdWxlXSxcbiAgICAgICAgICAgIGV4cG9ydHM6IFtNZEJ1dHRvbiwgTWRBbmNob3JdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbTWRCdXR0b24sIE1kQW5jaG9yXSxcbiAgICAgICAgfSksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtdKVxuICAgIF0sIE1kQnV0dG9uTW9kdWxlKTtcbiAgICByZXR1cm4gTWRCdXR0b25Nb2R1bGU7XG59KCkpO1xuXG5leHBvcnRzLk1kQnV0dG9uID0gTWRCdXR0b247XG5leHBvcnRzLk1kQW5jaG9yID0gTWRBbmNob3I7XG5leHBvcnRzLk1kQnV0dG9uTW9kdWxlID0gTWRCdXR0b25Nb2R1bGU7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L0Bhbmd1bGFyMi1tYXRlcmlhbC9idXR0b24vYnV0dG9uLnVtZC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygzKSkoMTApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9AYW5ndWxhci9jb21tb24vYnVuZGxlcy9jb21tb24udW1kLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCdAYW5ndWxhci9jb3JlJyksIHJlcXVpcmUoJ0Bhbmd1bGFyMi1tYXRlcmlhbC9jb3JlJyksIHJlcXVpcmUoJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInKSkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnLCAnQGFuZ3VsYXIvY29yZScsICdAYW5ndWxhcjItbWF0ZXJpYWwvY29yZScsICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ10sIGZhY3RvcnkpIDpcbiAgICAoZmFjdG9yeSgoZ2xvYmFsLm1kID0gZ2xvYmFsLm1kIHx8IHt9LCBnbG9iYWwubWQuY29yZSA9IGdsb2JhbC5tZC5jb3JlIHx8IHt9KSxnbG9iYWwubmcuY29yZSxnbG9iYWwubWQuY29yZSxnbG9iYWwubmcucGxhdGZvcm1Ccm93c2VyKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyxfYW5ndWxhcl9jb3JlLF9hbmd1bGFyMk1hdGVyaWFsX2NvcmUsX2FuZ3VsYXJfcGxhdGZvcm1Ccm93c2VyKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIF9fZGVjb3JhdGUkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKlxuICogU2hhcmVkIGRpcmVjdGl2ZSB0byBjb3VudCBsaW5lcyBpbnNpZGUgYSB0ZXh0IGFyZWEsIHN1Y2ggYXMgYSBsaXN0IGl0ZW0uXG4gKiBMaW5lIGVsZW1lbnRzIGNhbiBiZSBleHRyYWN0ZWQgd2l0aCBhIEBDb250ZW50Q2hpbGRyZW4oTWRMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xudmFyIE1kTGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRMaW5lKCkge1xuICAgIH1cbiAgICBNZExpbmUgPSBfX2RlY29yYXRlJDEoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkRpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21kLWxpbmVdJyB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkMSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZExpbmUpO1xuICAgIHJldHVybiBNZExpbmU7XG59KCkpO1xuLyogSGVscGVyIHRoYXQgdGFrZXMgYSBxdWVyeSBsaXN0IG9mIGxpbmVzIGFuZCBzZXRzIHRoZSBjb3JyZWN0IGNsYXNzIG9uIHRoZSBob3N0ICovXG52YXIgTWRMaW5lU2V0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZExpbmVTZXR0ZXIoX2xpbmVzLCBfcmVuZGVyZXIsIF9lbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2xpbmVzID0gX2xpbmVzO1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IF9yZW5kZXJlcjtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IF9lbGVtZW50O1xuICAgICAgICB0aGlzLl9zZXRMaW5lQ2xhc3ModGhpcy5fbGluZXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fbGluZXMuY2hhbmdlcy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3NldExpbmVDbGFzcyhfdGhpcy5fbGluZXMubGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE1kTGluZVNldHRlci5wcm90b3R5cGUuX3NldExpbmVDbGFzcyA9IGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICB0aGlzLl9yZXNldENsYXNzZXMoKTtcbiAgICAgICAgaWYgKGNvdW50ID09PSAyIHx8IGNvdW50ID09PSAzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRDbGFzcyhcIm1kLVwiICsgY291bnQgKyBcIi1saW5lXCIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZExpbmVTZXR0ZXIucHJvdG90eXBlLl9yZXNldENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NldENsYXNzKCdtZC0yLWxpbmUnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NldENsYXNzKCdtZC0zLWxpbmUnLCBmYWxzZSk7XG4gICAgfTtcbiAgICBNZExpbmVTZXR0ZXIucHJvdG90eXBlLl9zZXRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGJvb2wpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lLCBib29sKTtcbiAgICB9O1xuICAgIHJldHVybiBNZExpbmVTZXR0ZXI7XG59KCkpO1xudmFyIE1kTGluZU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRMaW5lTW9kdWxlKCkge1xuICAgIH1cbiAgICBNZExpbmVNb2R1bGUgPSBfX2RlY29yYXRlJDEoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLk5nTW9kdWxlKHtcbiAgICAgICAgICAgIGV4cG9ydHM6IFtNZExpbmVdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbTWRMaW5lXSxcbiAgICAgICAgfSksIFxuICAgICAgICBfX21ldGFkYXRhJDEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRMaW5lTW9kdWxlKTtcbiAgICByZXR1cm4gTWRMaW5lTW9kdWxlO1xufSgpKTtcblxudmFyIF9fZGVjb3JhdGUkMiA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkMiA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKlxuICogRGlyZWN0aXZlIHRvIGxpc3RlbiB0byBjaGFuZ2VzIG9mIGRpcmVjdGlvbiBvZiBwYXJ0IG9mIHRoZSBET00uXG4gKlxuICogQXBwbGljYXRpb25zIHNob3VsZCB1c2UgdGhpcyBkaXJlY3RpdmUgaW5zdGVhZCBvZiB0aGUgbmF0aXZlIGF0dHJpYnV0ZSBzbyB0aGF0IE1hdGVyaWFsXG4gKiBjb21wb25lbnRzIGNhbiBsaXN0ZW4gb24gY2hhbmdlcyBvZiBkaXJlY3Rpb24uXG4gKi9cbnZhciBEaXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpcigpIHtcbiAgICAgICAgdGhpcy5fZGlyID0gJ2x0cic7XG4gICAgICAgIHRoaXMuZGlyQ2hhbmdlID0gbmV3IF9hbmd1bGFyX2NvcmUuRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXIucHJvdG90eXBlLCBcImRpclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2RpcjtcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHY7XG4gICAgICAgICAgICBpZiAob2xkICE9IHRoaXMuX2Rpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXIucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcjsgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikgeyB0aGlzLmRpciA9IHY7IH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF9fZGVjb3JhdGUkMihbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoJ2RpcicpLCBcbiAgICAgICAgX19tZXRhZGF0YSQyKCdkZXNpZ246dHlwZScsIFN0cmluZylcbiAgICBdLCBEaXIucHJvdG90eXBlLCBcIl9kaXJcIiwgdm9pZCAwKTtcbiAgICBfX2RlY29yYXRlJDIoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLk91dHB1dCgpLCBcbiAgICAgICAgX19tZXRhZGF0YSQyKCdkZXNpZ246dHlwZScsIE9iamVjdClcbiAgICBdLCBEaXIucHJvdG90eXBlLCBcImRpckNoYW5nZVwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUkMihbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSG9zdEJpbmRpbmcoJ2F0dHIuZGlyJyksIFxuICAgICAgICBfX21ldGFkYXRhJDIoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxuICAgIF0sIERpci5wcm90b3R5cGUsIFwiZGlyXCIsIG51bGwpO1xuICAgIERpciA9IF9fZGVjb3JhdGUkMihbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuRGlyZWN0aXZlKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW2Rpcl0nLFxuICAgICAgICAgICAgLy8gVE9ETyhoYW5zbCk6IG1heWJlIGAkaW1wbGljaXRgIGlzbid0IHRoZSBiZXN0IG9wdGlvbiBoZXJlLCBidXQgZm9yIG5vdyB0aGF0J3MgdGhlIGJlc3Qgd2UgZ290LlxuICAgICAgICAgICAgZXhwb3J0QXM6ICckaW1wbGljaXQnXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSQyKCdkZXNpZ246cGFyYW10eXBlcycsIFtdKVxuICAgIF0sIERpcik7XG4gICAgcmV0dXJuIERpcjtcbn0oKSk7XG52YXIgUnRsTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSdGxNb2R1bGUoKSB7XG4gICAgfVxuICAgIFJ0bE1vZHVsZS5mb3JSb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFJ0bE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFJ0bE1vZHVsZSA9IF9fZGVjb3JhdGUkMihbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuTmdNb2R1bGUoe1xuICAgICAgICAgICAgZXhwb3J0czogW0Rpcl0sXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtEaXJdXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSQyKCdkZXNpZ246cGFyYW10eXBlcycsIFtdKVxuICAgIF0sIFJ0bE1vZHVsZSk7XG4gICAgcmV0dXJuIFJ0bE1vZHVsZTtcbn0oKSk7XG5cbi8qKiBUT0RPOiBpbnRlcm5hbCAqL1xudmFyIEZvcmVncm91bmRSaXBwbGVTdGF0ZTtcbihmdW5jdGlvbiAoRm9yZWdyb3VuZFJpcHBsZVN0YXRlKSB7XG4gICAgRm9yZWdyb3VuZFJpcHBsZVN0YXRlW0ZvcmVncm91bmRSaXBwbGVTdGF0ZVtcIk5FV1wiXSA9IDBdID0gXCJORVdcIjtcbiAgICBGb3JlZ3JvdW5kUmlwcGxlU3RhdGVbRm9yZWdyb3VuZFJpcHBsZVN0YXRlW1wiRVhQQU5ESU5HXCJdID0gMV0gPSBcIkVYUEFORElOR1wiO1xuICAgIEZvcmVncm91bmRSaXBwbGVTdGF0ZVtGb3JlZ3JvdW5kUmlwcGxlU3RhdGVbXCJGQURJTkdfT1VUXCJdID0gMl0gPSBcIkZBRElOR19PVVRcIjtcbn0pKEZvcmVncm91bmRSaXBwbGVTdGF0ZSB8fCAoRm9yZWdyb3VuZFJpcHBsZVN0YXRlID0ge30pKTtcbi8qKlxuICogV3JhcHBlciBmb3IgYSBmb3JlZ3JvdW5kIHJpcHBsZSBET00gZWxlbWVudCBhbmQgaXRzIGFuaW1hdGlvbiBzdGF0ZS5cbiAqIFRPRE86IGludGVybmFsXG4gKi9cbnZhciBGb3JlZ3JvdW5kUmlwcGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JlZ3JvdW5kUmlwcGxlKHJpcHBsZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yaXBwbGVFbGVtZW50ID0gcmlwcGxlRWxlbWVudDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEZvcmVncm91bmRSaXBwbGVTdGF0ZS5ORVc7XG4gICAgfVxuICAgIHJldHVybiBGb3JlZ3JvdW5kUmlwcGxlO1xufSgpKTtcbnZhciBSSVBQTEVfU1BFRURfUFhfUEVSX1NFQ09ORCA9IDEwMDA7XG52YXIgTUlOX1JJUFBMRV9GSUxMX1RJTUVfU0VDT05EUyA9IDAuMTtcbnZhciBNQVhfUklQUExFX0ZJTExfVElNRV9TRUNPTkRTID0gMC4zO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBwb2ludCAoeCwgeSkgdG8gdGhlIGZ1cnRoZXN0IGNvcm5lciBvZiBhIHJlY3RhbmdsZS5cbiAqL1xudmFyIGRpc3RhbmNlVG9GdXJ0aGVzdENvcm5lciA9IGZ1bmN0aW9uICh4LCB5LCByZWN0KSB7XG4gICAgdmFyIGRpc3RYID0gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHJlY3QubGVmdCksIE1hdGguYWJzKHggLSByZWN0LnJpZ2h0KSk7XG4gICAgdmFyIGRpc3RZID0gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHJlY3QudG9wKSwgTWF0aC5hYnMoeSAtIHJlY3QuYm90dG9tKSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkaXN0WCAqIGRpc3RYICsgZGlzdFkgKiBkaXN0WSk7XG59O1xuLyoqXG4gKiBIZWxwZXIgc2VydmljZSB0aGF0IHBlcmZvcm1zIERPTSBtYW5pcHVsYXRpb25zLiBOb3QgaW50ZW5kZWQgdG8gYmUgdXNlZCBvdXRzaWRlIHRoaXMgbW9kdWxlLlxuICogVGhlIGNvbnN0cnVjdG9yIHRha2VzIGEgcmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgZGlyZWN0aXZlJ3MgaG9zdCBlbGVtZW50IGFuZCBhIG1hcCBvZiBET01cbiAqIGV2ZW50IGhhbmRsZXJzIHRvIGJlIGluc3RhbGxlZCBvbiB0aGUgZWxlbWVudCB0aGF0IHRyaWdnZXJzIHJpcHBsZSBhbmltYXRpb25zLlxuICogVGhpcyB3aWxsIGV2ZW50dWFsbHkgYmVjb21lIGEgY3VzdG9tIHJlbmRlcmVyIG9uY2UgQW5ndWxhciBzdXBwb3J0IGV4aXN0cy5cbiAqIFRPRE86IGludGVybmFsXG4gKi9cbnZhciBSaXBwbGVSZW5kZXJlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmlwcGxlUmVuZGVyZXIoX2VsZW1lbnRSZWYsIF9ldmVudEhhbmRsZXJzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMgPSBfZXZlbnRIYW5kbGVycztcbiAgICAgICAgdGhpcy5fcmlwcGxlRWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vIEl0IG1pZ2h0IGJlIG5pY2UgdG8gZGVsYXkgY3JlYXRpbmcgdGhlIGJhY2tncm91bmQgdW50aWwgaXQncyBuZWVkZWQsIGJ1dCBkb2luZyB0aGlzIGluXG4gICAgICAgIC8vIGZhZGVJblJpcHBsZUJhY2tncm91bmQgY2F1c2VzIHRoZSBmaXJzdCBjbGljayBldmVudCB0byBub3QgYmUgaGFuZGxlZCByZWxpYWJseS5cbiAgICAgICAgdGhpcy5fYmFja2dyb3VuZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kRGl2LmNsYXNzTGlzdC5hZGQoJ21kLXJpcHBsZS1iYWNrZ3JvdW5kJyk7XG4gICAgICAgIHRoaXMuX3JpcHBsZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fYmFja2dyb3VuZERpdik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc3RhbGxzIGV2ZW50IGhhbmRsZXJzIG9uIHRoZSBnaXZlbiB0cmlnZ2VyIGVsZW1lbnQsIGFuZCByZW1vdmVzIGV2ZW50IGhhbmRsZXJzIGZyb20gdGhlXG4gICAgICogcHJldmlvdXMgdHJpZ2dlciBpZiBuZWVkZWQuXG4gICAgICovXG4gICAgUmlwcGxlUmVuZGVyZXIucHJvdG90eXBlLnNldFRyaWdnZXJFbGVtZW50ID0gZnVuY3Rpb24gKG5ld1RyaWdnZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbGVtZW50ICE9PSBuZXdUcmlnZ2VyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50SGFuZGxlciwgZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbGVtZW50ID0gbmV3VHJpZ2dlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRIYW5kbGVyLCBldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnN0YWxscyBldmVudCBoYW5kbGVycyBvbiB0aGUgaG9zdCBlbGVtZW50IG9mIHRoZSBtZC1yaXBwbGUgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgIFJpcHBsZVJlbmRlcmVyLnByb3RvdHlwZS5zZXRUcmlnZ2VyRWxlbWVudFRvSG9zdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRUcmlnZ2VyRWxlbWVudCh0aGlzLl9yaXBwbGVFbGVtZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgY3VycmVudCB0cmlnZ2VyIGVsZW1lbnQgaWYgbmVlZGVkLlxuICAgICAqL1xuICAgIFJpcHBsZVJlbmRlcmVyLnByb3RvdHlwZS5jbGVhclRyaWdnZXJFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFRyaWdnZXJFbGVtZW50KG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZvcmVncm91bmQgcmlwcGxlIGFuZCBzZXRzIGl0cyBhbmltYXRpb24gdG8gZXhwYW5kIGFuZCBmYWRlIGluIGZyb20gdGhlIHBvc2l0aW9uXG4gICAgICogZ2l2ZW4gYnkgcmlwcGxlT3JpZ2luTGVmdCBhbmQgcmlwcGxlT3JpZ2luVG9wIChvciBmcm9tIHRoZSBjZW50ZXIgb2YgdGhlIDxtZC1yaXBwbGU+XG4gICAgICogYm91bmRpbmcgcmVjdCBpZiBjZW50ZXJlZCBpcyB0cnVlKS5cbiAgICAgKi9cbiAgICBSaXBwbGVSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlRm9yZWdyb3VuZFJpcHBsZSA9IGZ1bmN0aW9uIChyaXBwbGVPcmlnaW5MZWZ0LCByaXBwbGVPcmlnaW5Ub3AsIGNvbG9yLCBjZW50ZXJlZCwgcmFkaXVzLCBzcGVlZEZhY3RvciwgdHJhbnNpdGlvbkVuZENhbGxiYWNrKSB7XG4gICAgICAgIHZhciBwYXJlbnRSZWN0ID0gdGhpcy5fcmlwcGxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZm9yZWdyb3VuZCByaXBwbGUgZGl2IHdpdGggdGhlIHNpemUgYW5kIHBvc2l0aW9uIG9mIHRoZSBmdWxseSBleHBhbmRlZCByaXBwbGUuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpdiBpcyBjcmVhdGVkLCBpdCdzIGdpdmVuIGEgdHJhbnNmb3JtIHN0eWxlIHRoYXQgY2F1c2VzIHRoZSByaXBwbGUgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgIC8vIHNtYWxsIGFuZCBjZW50ZXJlZCBvbiB0aGUgZXZlbnQgbG9jYXRpb24gKG9yIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIHJlY3QgaWYgdGhlIGNlbnRlcmVkXG4gICAgICAgIC8vIGFyZ3VtZW50IGlzIHRydWUpLiBSZW1vdmluZyB0aGF0IHRyYW5zZm9ybSBjYXVzZXMgdGhlIHJpcHBsZSB0byBhbmltYXRlIHRvIGl0cyBuYXR1cmFsIHNpemUuXG4gICAgICAgIHZhciBzdGFydFggPSBjZW50ZXJlZCA/IChwYXJlbnRSZWN0LmxlZnQgKyBwYXJlbnRSZWN0LndpZHRoIC8gMikgOiByaXBwbGVPcmlnaW5MZWZ0O1xuICAgICAgICB2YXIgc3RhcnRZID0gY2VudGVyZWQgPyAocGFyZW50UmVjdC50b3AgKyBwYXJlbnRSZWN0LmhlaWdodCAvIDIpIDogcmlwcGxlT3JpZ2luVG9wO1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IHN0YXJ0WCAtIHBhcmVudFJlY3QubGVmdDtcbiAgICAgICAgdmFyIG9mZnNldFkgPSBzdGFydFkgLSBwYXJlbnRSZWN0LnRvcDtcbiAgICAgICAgdmFyIG1heFJhZGl1cyA9IHJhZGl1cyA+IDAgPyByYWRpdXMgOiBkaXN0YW5jZVRvRnVydGhlc3RDb3JuZXIoc3RhcnRYLCBzdGFydFksIHBhcmVudFJlY3QpO1xuICAgICAgICB2YXIgcmlwcGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3JpcHBsZUVsZW1lbnQuYXBwZW5kQ2hpbGQocmlwcGxlRGl2KTtcbiAgICAgICAgcmlwcGxlRGl2LmNsYXNzTGlzdC5hZGQoJ21kLXJpcHBsZS1mb3JlZ3JvdW5kJyk7XG4gICAgICAgIHJpcHBsZURpdi5zdHlsZS5sZWZ0ID0gKG9mZnNldFggLSBtYXhSYWRpdXMpICsgXCJweFwiO1xuICAgICAgICByaXBwbGVEaXYuc3R5bGUudG9wID0gKG9mZnNldFkgLSBtYXhSYWRpdXMpICsgXCJweFwiO1xuICAgICAgICByaXBwbGVEaXYuc3R5bGUud2lkdGggPSAyICogbWF4UmFkaXVzICsgXCJweFwiO1xuICAgICAgICByaXBwbGVEaXYuc3R5bGUuaGVpZ2h0ID0gcmlwcGxlRGl2LnN0eWxlLndpZHRoO1xuICAgICAgICAvLyBJZiBjb2xvciBpbnB1dCBpcyBub3Qgc2V0LCB0aGlzIHdpbGwgZGVmYXVsdCB0byB0aGUgYmFja2dyb3VuZCBjb2xvciBkZWZpbmVkIGluIENTUy5cbiAgICAgICAgcmlwcGxlRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgICAvLyBTdGFydCB0aGUgcmlwcGxlIHRpbnkuXG4gICAgICAgIHJpcHBsZURpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDAuMDAxKVwiO1xuICAgICAgICB2YXIgZmFkZUluU2Vjb25kcyA9ICgxIC8gKHNwZWVkRmFjdG9yIHx8IDEpKSAqIE1hdGgubWF4KE1JTl9SSVBQTEVfRklMTF9USU1FX1NFQ09ORFMsIE1hdGgubWluKE1BWF9SSVBQTEVfRklMTF9USU1FX1NFQ09ORFMsIG1heFJhZGl1cyAvIFJJUFBMRV9TUEVFRF9QWF9QRVJfU0VDT05EKSk7XG4gICAgICAgIHJpcHBsZURpdi5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBmYWRlSW5TZWNvbmRzICsgXCJzXCI7XG4gICAgICAgIC8vIGh0dHBzOi8vdGltdGF1YmVydC5kZS9ibG9nLzIwMTIvMDkvY3NzLXRyYW5zaXRpb25zLWZvci1keW5hbWljYWxseS1jcmVhdGVkLWRvbS1lbGVtZW50cy9cbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUocmlwcGxlRGl2KS5vcGFjaXR5O1xuICAgICAgICByaXBwbGVEaXYuY2xhc3NMaXN0LmFkZCgnbWQtcmlwcGxlLWZhZGUtaW4nKTtcbiAgICAgICAgLy8gQ2xlYXJpbmcgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSBjYXVzZXMgdGhlIHJpcHBsZSB0byBhbmltYXRlIHRvIGl0cyBmdWxsIHNpemUuXG4gICAgICAgIHJpcHBsZURpdi5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgdmFyIHJpcHBsZSA9IG5ldyBGb3JlZ3JvdW5kUmlwcGxlKHJpcHBsZURpdik7XG4gICAgICAgIHJpcHBsZS5zdGF0ZSA9IEZvcmVncm91bmRSaXBwbGVTdGF0ZS5FWFBBTkRJTkc7XG4gICAgICAgIHJpcHBsZURpdi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiB0cmFuc2l0aW9uRW5kQ2FsbGJhY2socmlwcGxlLCBldmVudCk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmFkZXMgb3V0IGEgZm9yZWdyb3VuZCByaXBwbGUgYWZ0ZXIgaXQgaGFzIGZ1bGx5IGV4cGFuZGVkIGFuZCBmYWRlZCBpbi5cbiAgICAgKi9cbiAgICBSaXBwbGVSZW5kZXJlci5wcm90b3R5cGUuZmFkZU91dEZvcmVncm91bmRSaXBwbGUgPSBmdW5jdGlvbiAocmlwcGxlKSB7XG4gICAgICAgIHJpcHBsZS5jbGFzc0xpc3QucmVtb3ZlKCdtZC1yaXBwbGUtZmFkZS1pbicpO1xuICAgICAgICByaXBwbGUuY2xhc3NMaXN0LmFkZCgnbWQtcmlwcGxlLWZhZGUtb3V0Jyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgZm9yZWdyb3VuZCByaXBwbGUgZnJvbSB0aGUgRE9NIGFmdGVyIGl0IGhhcyBmYWRlZCBvdXQuXG4gICAgICovXG4gICAgUmlwcGxlUmVuZGVyZXIucHJvdG90eXBlLnJlbW92ZVJpcHBsZUZyb21Eb20gPSBmdW5jdGlvbiAocmlwcGxlKSB7XG4gICAgICAgIHJpcHBsZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHJpcHBsZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGYWRlcyBpbiB0aGUgcmlwcGxlIGJhY2tncm91bmQuXG4gICAgICovXG4gICAgUmlwcGxlUmVuZGVyZXIucHJvdG90eXBlLmZhZGVJblJpcHBsZUJhY2tncm91bmQgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fYmFja2dyb3VuZERpdi5jbGFzc0xpc3QuYWRkKCdtZC1yaXBwbGUtYWN0aXZlJyk7XG4gICAgICAgIC8vIElmIGNvbG9yIGlzIG5vdCBzZXQsIHRoaXMgd2lsbCBkZWZhdWx0IHRvIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGRlZmluZWQgaW4gQ1NTLlxuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmFkZXMgb3V0IHRoZSByaXBwbGUgYmFja2dyb3VuZC5cbiAgICAgKi9cbiAgICBSaXBwbGVSZW5kZXJlci5wcm90b3R5cGUuZmFkZU91dFJpcHBsZUJhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iYWNrZ3JvdW5kRGl2KSB7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJpcHBsZS1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFJpcHBsZVJlbmRlcmVyO1xufSgpKTtcblxudmFyIF9fZGVjb3JhdGUkMyA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkMyA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbnZhciBNZFJpcHBsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRSaXBwbGUoX2VsZW1lbnRSZWYpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCwgdGhlIHJhZGl1cyBpbiBwaXhlbHMgb2YgZm9yZWdyb3VuZCByaXBwbGVzIHdoZW4gZnVsbHkgZXhwYW5kZWQuIElmIHVuc2V0LCB0aGUgcmFkaXVzXG4gICAgICAgICAqIHdpbGwgYmUgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgcmlwcGxlIHRvIHRoZSBmdXJ0aGVzdCBjb3JuZXIgb2YgdGhlIGhvc3QgZWxlbWVudCdzXG4gICAgICAgICAqIGJvdW5kaW5nIHJlY3RhbmdsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF4UmFkaXVzID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCwgdGhlIG5vcm1hbCBkdXJhdGlvbiBvZiByaXBwbGUgYW5pbWF0aW9ucyBpcyBkaXZpZGVkIGJ5IHRoaXMgdmFsdWUuIEZvciBleGFtcGxlLFxuICAgICAgICAgKiBzZXR0aW5nIGl0IHRvIDAuNSB3aWxsIGNhdXNlIHRoZSBhbmltYXRpb25zIHRvIHRha2UgdHdpY2UgYXMgbG9uZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3BlZWRGYWN0b3IgPSAxO1xuICAgICAgICAvLyBUaGVzZSBldmVudCBoYW5kbGVycyBhcmUgYXR0YWNoZWQgdG8gdGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VycyB0aGUgcmlwcGxlIGFuaW1hdGlvbnMuXG4gICAgICAgIHZhciBldmVudEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICBldmVudEhhbmRsZXJzLnNldCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBfdGhpcy5fbW91c2VEb3duKGV2ZW50KTsgfSk7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc2V0KCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gX3RoaXMuX2NsaWNrKGV2ZW50KTsgfSk7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc2V0KCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBfdGhpcy5fbW91c2VMZWF2ZShldmVudCk7IH0pO1xuICAgICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlciA9IG5ldyBSaXBwbGVSZW5kZXJlcihfZWxlbWVudFJlZiwgZXZlbnRIYW5kbGVycyk7XG4gICAgfVxuICAgIC8qKiBUT0RPOiBpbnRlcm5hbCAqL1xuICAgIE1kUmlwcGxlLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSWYgbm8gdHJpZ2dlciBlbGVtZW50IHdhcyBleHBsaWNpdHkgc2V0LCB1c2UgdGhlIGhvc3QgZWxlbWVudFxuICAgICAgICBpZiAoIXRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuc2V0VHJpZ2dlckVsZW1lbnRUb0hvc3QoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIFRPRE86IGludGVybmFsICovXG4gICAgTWRSaXBwbGUucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLmNsZWFyVHJpZ2dlckVsZW1lbnQoKTtcbiAgICB9O1xuICAgIC8qKiBUT0RPOiBpbnRlcm5hbCAqL1xuICAgIE1kUmlwcGxlLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIC8vIElmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgY2hhbmdlZCAob3IgaXMgYmVpbmcgaW5pdGlhbGx5IHNldCksIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaXQuXG4gICAgICAgIHZhciBjaGFuZ2VkSW5wdXRzID0gT2JqZWN0LmtleXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VkSW5wdXRzLmluZGV4T2YoJ3RyaWdnZXInKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnNldFRyaWdnZXJFbGVtZW50KHRoaXMudHJpZ2dlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc3BvbmRzIHRvIHRoZSBzdGFydCBvZiBhIHJpcHBsZSBhbmltYXRpb24gdHJpZ2dlciBieSBmYWRpbmcgdGhlIGJhY2tncm91bmQgaW4uXG4gICAgICovXG4gICAgTWRSaXBwbGUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5mYWRlSW5SaXBwbGVCYWNrZ3JvdW5kKHRoaXMuYmFja2dyb3VuZENvbG9yKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc3BvbmRzIHRvIHRoZSBlbmQgb2YgYSByaXBwbGUgYW5pbWF0aW9uIHRyaWdnZXIgYnkgZmFkaW5nIHRoZSBiYWNrZ3JvdW5kIG91dCwgYW5kIGNyZWF0aW5nIGFcbiAgICAgKiBmb3JlZ3JvdW5kIHJpcHBsZSB0aGF0IGV4cGFuZHMgZnJvbSB0aGUgZXZlbnQgbG9jYXRpb24gKG9yIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgZWxlbWVudCBpZlxuICAgICAqIHRoZSBcImNlbnRlcmVkXCIgcHJvcGVydHkgaXMgc2V0IG9yIGZvcmNlQ2VudGVyIGlzIHRydWUpLlxuICAgICAqL1xuICAgIE1kUmlwcGxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAobGVmdCwgdG9wLCBmb3JjZUNlbnRlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZm9yY2VDZW50ZXIgPT09IHZvaWQgMCkgeyBmb3JjZUNlbnRlciA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuY3JlYXRlRm9yZWdyb3VuZFJpcHBsZShsZWZ0LCB0b3AsIHRoaXMuY29sb3IsIHRoaXMuY2VudGVyZWQgfHwgZm9yY2VDZW50ZXIsIHRoaXMubWF4UmFkaXVzLCB0aGlzLnNwZWVkRmFjdG9yLCBmdW5jdGlvbiAocmlwcGxlLCBlKSB7IHJldHVybiBfdGhpcy5fcmlwcGxlVHJhbnNpdGlvbkVuZGVkKHJpcHBsZSwgZSk7IH0pO1xuICAgICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5mYWRlT3V0UmlwcGxlQmFja2dyb3VuZCgpO1xuICAgIH07XG4gICAgTWRSaXBwbGUucHJvdG90eXBlLl9yaXBwbGVUcmFuc2l0aW9uRW5kZWQgPSBmdW5jdGlvbiAocmlwcGxlLCBldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSByaXBwbGUgZmluaXNoZWQgZXhwYW5kaW5nLCBzdGFydCBmYWRpbmcgaXQgb3V0LiBJZiBpdCBmaW5pc2hlZCBmYWRpbmcgb3V0LFxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gdGhlIERPTS5cbiAgICAgICAgICAgIHN3aXRjaCAocmlwcGxlLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBGb3JlZ3JvdW5kUmlwcGxlU3RhdGUuRVhQQU5ESU5HOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5mYWRlT3V0Rm9yZWdyb3VuZFJpcHBsZShyaXBwbGUucmlwcGxlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJpcHBsZS5zdGF0ZSA9IEZvcmVncm91bmRSaXBwbGVTdGF0ZS5GQURJTkdfT1VUO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEZvcmVncm91bmRSaXBwbGVTdGF0ZS5GQURJTkdfT1VUOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5yZW1vdmVSaXBwbGVGcm9tRG9tKHJpcHBsZS5yaXBwbGVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB0cmlnZ2VyIGVsZW1lbnQgcmVjZWl2ZXMgYSBtb3VzZWRvd24gZXZlbnQuIFN0YXJ0cyB0aGUgcmlwcGxlIGFuaW1hdGlvbiBieVxuICAgICAqIGZhZGluZyBpbiB0aGUgYmFja2dyb3VuZC5cbiAgICAgKi9cbiAgICBNZFJpcHBsZS5wcm90b3R5cGUuX21vdXNlRG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB0cmlnZ2VyIGVsZW1lbnQgcmVjZWl2ZXMgYSBjbGljayBldmVudC4gQ3JlYXRlcyBhIGZvcmVncm91bmQgcmlwcGxlIGFuZFxuICAgICAqIHJ1bnMgaXRzIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICBNZFJpcHBsZS5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiBldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNjcmVlbiBhbmQgcGFnZSBwb3NpdGlvbnMgYXJlIGFsbCAwLCB0aGlzIHdhcyBwcm9iYWJseSB0cmlnZ2VyZWQgYnkgYSBrZXlwcmVzcy5cbiAgICAgICAgICAgIC8vIEluIHRoYXQgY2FzZSwgdXNlIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIHJlY3QgYXMgdGhlIHJpcHBsZSBvcmlnaW4uXG4gICAgICAgICAgICAvLyBGSVhNRTogVGhpcyBmYWlscyBvbiBJRTExLCB3aGljaCBzdGlsbCBzZXRzIHBhZ2VYL1kgYW5kIHNjcmVlblgvWSBvbiBrZXlib2FyZCBjbGlja3MuXG4gICAgICAgICAgICB2YXIgaXNLZXlFdmVudCA9IChldmVudC5zY3JlZW5YID09PSAwICYmIGV2ZW50LnNjcmVlblkgPT09IDAgJiYgZXZlbnQucGFnZVggPT09IDAgJiYgZXZlbnQucGFnZVkgPT09IDApO1xuICAgICAgICAgICAgdGhpcy5lbmQoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCBpc0tleUV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHRyaWdnZXIgZWxlbWVudCByZWNlaXZlcyBhIG1vdXNlbGVhdmUgZXZlbnQuIEZhZGVzIG91dCB0aGUgYmFja2dyb3VuZC5cbiAgICAgKi9cbiAgICBNZFJpcHBsZS5wcm90b3R5cGUuX21vdXNlTGVhdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gV2UgY2FuIGFsd2F5cyBmYWRlIG91dCB0aGUgYmFja2dyb3VuZCBoZXJlOyBJdCdzIGEgbm8tb3AgaWYgaXQgd2FzIGFscmVhZHkgaW5hY3RpdmUuXG4gICAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLmZhZGVPdXRSaXBwbGVCYWNrZ3JvdW5kKCk7XG4gICAgfTtcbiAgICBfX2RlY29yYXRlJDMoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLklucHV0KCdtZC1yaXBwbGUtdHJpZ2dlcicpLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246dHlwZScsIE9iamVjdClcbiAgICBdLCBNZFJpcHBsZS5wcm90b3R5cGUsIFwidHJpZ2dlclwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUkMyhbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoJ21kLXJpcHBsZS1jZW50ZXJlZCcpLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246dHlwZScsIEJvb2xlYW4pXG4gICAgXSwgTWRSaXBwbGUucHJvdG90eXBlLCBcImNlbnRlcmVkXCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZSQzKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgnbWQtcmlwcGxlLWRpc2FibGVkJyksIFxuICAgICAgICBfX21ldGFkYXRhJDMoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcbiAgICBdLCBNZFJpcHBsZS5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwgdm9pZCAwKTtcbiAgICBfX2RlY29yYXRlJDMoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLklucHV0KCdtZC1yaXBwbGUtbWF4LXJhZGl1cycpLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246dHlwZScsIE51bWJlcilcbiAgICBdLCBNZFJpcHBsZS5wcm90b3R5cGUsIFwibWF4UmFkaXVzXCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZSQzKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgnbWQtcmlwcGxlLXNwZWVkLWZhY3RvcicpLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246dHlwZScsIE51bWJlcilcbiAgICBdLCBNZFJpcHBsZS5wcm90b3R5cGUsIFwic3BlZWRGYWN0b3JcIiwgdm9pZCAwKTtcbiAgICBfX2RlY29yYXRlJDMoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLklucHV0KCdtZC1yaXBwbGUtY29sb3InKSwgXG4gICAgICAgIF9fbWV0YWRhdGEkMygnZGVzaWduOnR5cGUnLCBTdHJpbmcpXG4gICAgXSwgTWRSaXBwbGUucHJvdG90eXBlLCBcImNvbG9yXCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZSQzKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgnbWQtcmlwcGxlLWJhY2tncm91bmQtY29sb3InKSwgXG4gICAgICAgIF9fbWV0YWRhdGEkMygnZGVzaWduOnR5cGUnLCBTdHJpbmcpXG4gICAgXSwgTWRSaXBwbGUucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUkMyhbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSG9zdEJpbmRpbmcoJ2NsYXNzLm1kLXJpcHBsZS1mb2N1c2VkJyksXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoJ21kLXJpcHBsZS1mb2N1c2VkJyksIFxuICAgICAgICBfX21ldGFkYXRhJDMoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcbiAgICBdLCBNZFJpcHBsZS5wcm90b3R5cGUsIFwiZm9jdXNlZFwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUkMyhbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSG9zdEJpbmRpbmcoJ2NsYXNzLm1kLXJpcHBsZS11bmJvdW5kZWQnKSxcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgnbWQtcmlwcGxlLXVuYm91bmRlZCcpLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246dHlwZScsIEJvb2xlYW4pXG4gICAgXSwgTWRSaXBwbGUucHJvdG90eXBlLCBcInVuYm91bmRlZFwiLCB2b2lkIDApO1xuICAgIE1kUmlwcGxlID0gX19kZWNvcmF0ZSQzKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5EaXJlY3RpdmUoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbWQtcmlwcGxlXScsXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSQzKCdkZXNpZ246cGFyYW10eXBlcycsIFtfYW5ndWxhcl9jb3JlLkVsZW1lbnRSZWZdKVxuICAgIF0sIE1kUmlwcGxlKTtcbiAgICByZXR1cm4gTWRSaXBwbGU7XG59KCkpO1xudmFyIE1kUmlwcGxlTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZFJpcHBsZU1vZHVsZSgpIHtcbiAgICB9XG4gICAgTWRSaXBwbGVNb2R1bGUuZm9yUm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBNZFJpcHBsZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1kUmlwcGxlTW9kdWxlID0gX19kZWNvcmF0ZSQzKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5OZ01vZHVsZSh7XG4gICAgICAgICAgICBleHBvcnRzOiBbTWRSaXBwbGVdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbTWRSaXBwbGVdLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkMygnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZFJpcHBsZU1vZHVsZSk7XG4gICAgcmV0dXJuIE1kUmlwcGxlTW9kdWxlO1xufSgpKTtcblxuLy8gVE9ETyhrYXJhKTogUmV2aXNpdCB3aHkgZXJyb3IgbWVzc2FnZXMgYXJlIG5vdCBiZWluZyBwcm9wZXJseSBzZXQuXG52YXIgX19leHRlbmRzJDMgPSAod2luZG93ICYmIHdpbmRvdy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbi8qKlxuICogV3JhcHBlciBhcm91bmQgRXJyb3IgdGhhdCBzZXRzIHRoZSBlcnJvciBtZXNzYWdlLlxuICovXG52YXIgTWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDMoTWRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZEVycm9yKHZhbHVlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIE1kRXJyb3I7XG59KEVycm9yKSk7XG5cbnZhciBfX2V4dGVuZHMkMiA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqIEV4Y2VwdGlvbiB0aHJvd24gd2hlbiBhIENvbXBvbmVudFBvcnRhbCBpcyBhdHRhY2hlZCB0byBhIERvbVBvcnRhbEhvc3Qgd2l0aG91dCBhbiBvcmlnaW4uICovXG52YXIgTWRDb21wb25lbnRQb3J0YWxBdHRhY2hlZFRvRG9tV2l0aG91dE9yaWdpbkVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMihNZENvbXBvbmVudFBvcnRhbEF0dGFjaGVkVG9Eb21XaXRob3V0T3JpZ2luRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWRDb21wb25lbnRQb3J0YWxBdHRhY2hlZFRvRG9tV2l0aG91dE9yaWdpbkVycm9yKCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAnQSBDb21wb25lbnRQb3J0YWwgbXVzdCBoYXZlIGFuIG9yaWdpbiBzZXQgd2hlbiBhdHRhY2hlZCB0byBhIERvbVBvcnRhbEhvc3QgJyArXG4gICAgICAgICAgICAnYmVjYXVzZSB0aGUgRE9NIGVsZW1lbnQgaXMgbm90IHBhcnQgb2YgdGhlIEFuZ3VsYXIgYXBwbGljYXRpb24gY29udGV4dC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIE1kQ29tcG9uZW50UG9ydGFsQXR0YWNoZWRUb0RvbVdpdGhvdXRPcmlnaW5FcnJvcjtcbn0oTWRFcnJvcikpO1xuLyoqIEV4Y2VwdGlvbiB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhIG51bGwgcG9ydGFsIHRvIGEgaG9zdC4gKi9cbnZhciBNZE51bGxQb3J0YWxFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDIoTWROdWxsUG9ydGFsRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWROdWxsUG9ydGFsRXJyb3IoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsICdNdXN0IHByb3ZpZGUgYSBwb3J0YWwgdG8gYXR0YWNoJyk7XG4gICAgfVxuICAgIHJldHVybiBNZE51bGxQb3J0YWxFcnJvcjtcbn0oTWRFcnJvcikpO1xuLyoqIEV4Y2VwdGlvbiB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhIHBvcnRhbCB0byBhIGhvc3QgdGhhdCBpcyBhbHJlYWR5IGF0dGFjaGVkLiAqL1xudmFyIE1kUG9ydGFsQWxyZWFkeUF0dGFjaGVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQyKE1kUG9ydGFsQWxyZWFkeUF0dGFjaGVkRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWRQb3J0YWxBbHJlYWR5QXR0YWNoZWRFcnJvcigpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJ0hvc3QgYWxyZWFkeSBoYXMgYSBwb3J0YWwgYXR0YWNoZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIE1kUG9ydGFsQWxyZWFkeUF0dGFjaGVkRXJyb3I7XG59KE1kRXJyb3IpKTtcbi8qKiBFeGNlcHRpb24gdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBhdHRhY2ggYSBwb3J0YWwgdG8gYW4gYWxyZWFkeS1kaXNwb3NlZCBob3N0LiAqL1xudmFyIE1kUG9ydGFsSG9zdEFscmVhZHlEaXNwb3NlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMihNZFBvcnRhbEhvc3RBbHJlYWR5RGlzcG9zZWRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZFBvcnRhbEhvc3RBbHJlYWR5RGlzcG9zZWRFcnJvcigpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJ1RoaXMgUG9ydGFsSG9zdCBoYXMgYWxyZWFkeSBiZWVuIGRpc3Bvc2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBNZFBvcnRhbEhvc3RBbHJlYWR5RGlzcG9zZWRFcnJvcjtcbn0oTWRFcnJvcikpO1xuLyoqIEV4Y2VwdGlvbiB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhbiB1bmtub3duIHBvcnRhbCB0eXBlLiAqL1xudmFyIE1kVW5rbm93blBvcnRhbFR5cGVFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDIoTWRVbmtub3duUG9ydGFsVHlwZUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1kVW5rbm93blBvcnRhbFR5cGVFcnJvcigpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIGFuIHVua25vd24gUG9ydGFsIHR5cGUuICcgK1xuICAgICAgICAgICAgJ0Jhc2VQb3J0YWxIb3N0IGFjY2VwdHMgZWl0aGVyIGEgQ29tcG9uZW50UG9ydGFsIG9yIGEgVGVtcGxhdGVQb3J0YWwuJyk7XG4gICAgfVxuICAgIHJldHVybiBNZFVua25vd25Qb3J0YWxUeXBlRXJyb3I7XG59KE1kRXJyb3IpKTtcbi8qKiBFeGNlcHRpb24gdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBhdHRhY2ggYSBwb3J0YWwgdG8gYSBudWxsIGhvc3QuICovXG52YXIgTWROdWxsUG9ydGFsSG9zdEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMihNZE51bGxQb3J0YWxIb3N0RXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWROdWxsUG9ydGFsSG9zdEVycm9yKCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAnQXR0ZW1wdGluZyB0byBhdHRhY2ggYSBwb3J0YWwgdG8gYSBudWxsIFBvcnRhbEhvc3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIE1kTnVsbFBvcnRhbEhvc3RFcnJvcjtcbn0oTWRFcnJvcikpO1xuLyoqIEV4Y2VwdGlvbiB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGRldGFjaCBhIHBvcnRhbCB0aGF0IGlzIG5vdCBhdHRhY2hlZC4gKi9cbnZhciBNZE5vUG9ydGFsQXR0YWNoZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDIoTWROb1BvcnRhbEF0dGFjaGVkRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWROb1BvcnRhbEF0dGFjaGVkRXJyb3IoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsICdBdHRlbXB0aW5nIHRvIGRldGFjaCBhIHBvcnRhbCB0aGF0IGlzIG5vdCBhdHRhY2hlZCB0byBhIGhvc3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIE1kTm9Qb3J0YWxBdHRhY2hlZEVycm9yO1xufShNZEVycm9yKSk7XG5cbnZhciBfX2V4dGVuZHMkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBIGBQb3J0YWxgIGlzIHNvbWV0aGluZyB0aGF0IHlvdSB3YW50IHRvIHJlbmRlciBzb21ld2hlcmUgZWxzZS5cbiAqIEl0IGNhbiBiZSBhdHRhY2ggdG8gLyBkZXRhY2hlZCBmcm9tIGEgYFBvcnRhbEhvc3RgLlxuICovXG52YXIgUG9ydGFsID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb3J0YWwoKSB7XG4gICAgfVxuICAgIC8qKiBBdHRhY2ggdGhpcyBwb3J0YWwgdG8gYSBob3N0LiAqL1xuICAgIFBvcnRhbC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgICAgICAgaWYgKGhvc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1kTnVsbFBvcnRhbEhvc3RFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3N0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZFBvcnRhbEFscmVhZHlBdHRhY2hlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgICAgICAgcmV0dXJuIGhvc3QuYXR0YWNoKHRoaXMpO1xuICAgIH07XG4gICAgLyoqIERldGFjaCB0aGlzIHBvcnRhbCBmcm9tIGl0cyBob3N0ICovXG4gICAgUG9ydGFsLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBob3N0ID0gdGhpcy5fYXR0YWNoZWRIb3N0O1xuICAgICAgICBpZiAoaG9zdCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWROb1BvcnRhbEF0dGFjaGVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSBudWxsO1xuICAgICAgICByZXR1cm4gaG9zdC5kZXRhY2goKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQb3J0YWwucHJvdG90eXBlLCBcImlzQXR0YWNoZWRcIiwge1xuICAgICAgICAvKiogV2hldGhlciB0aGlzIHBvcnRhbCBpcyBhdHRhY2hlZCB0byBhIGhvc3QuICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaGVkSG9zdCAhPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBQb3J0YWxIb3N0IHJlZmVyZW5jZSB3aXRob3V0IHBlcmZvcm1pbmcgYGF0dGFjaCgpYC4gVGhpcyBpcyB1c2VkIGRpcmVjdGx5IGJ5XG4gICAgICogdGhlIFBvcnRhbEhvc3Qgd2hlbiBpdCBpcyBwZXJmb3JtaW5nIGFuIGBhdHRhY2goKWAgb3IgYGRldGF0Y2goKWAuXG4gICAgICovXG4gICAgUG9ydGFsLnByb3RvdHlwZS5zZXRBdHRhY2hlZEhvc3QgPSBmdW5jdGlvbiAoaG9zdCkge1xuICAgICAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSBob3N0O1xuICAgIH07XG4gICAgcmV0dXJuIFBvcnRhbDtcbn0oKSk7XG4vKipcbiAqIEEgYENvbXBvbmVudFBvcnRhbGAgaXMgYSBwb3J0YWwgdGhhdCBpbnN0YW50aWF0ZXMgc29tZSBDb21wb25lbnQgdXBvbiBhdHRhY2htZW50LlxuICovXG52YXIgQ29tcG9uZW50UG9ydGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMShDb21wb25lbnRQb3J0YWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudCwgdmlld0NvbnRhaW5lclJlZiwgaW5qZWN0b3IpIHtcbiAgICAgICAgaWYgKHZpZXdDb250YWluZXJSZWYgPT09IHZvaWQgMCkgeyB2aWV3Q29udGFpbmVyUmVmID0gbnVsbDsgfVxuICAgICAgICBpZiAoaW5qZWN0b3IgPT09IHZvaWQgMCkgeyBpbmplY3RvciA9IG51bGw7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICB0aGlzLmluamVjdG9yID0gaW5qZWN0b3I7XG4gICAgfVxuICAgIHJldHVybiBDb21wb25lbnRQb3J0YWw7XG59KFBvcnRhbCkpO1xuLyoqXG4gKiBBIGBUZW1wbGF0ZVBvcnRhbGAgaXMgYSBwb3J0YWwgdGhhdCByZXByZXNlbnRzIHNvbWUgZW1iZWRkZWQgdGVtcGxhdGUgKFRlbXBsYXRlUmVmKS5cbiAqL1xudmFyIFRlbXBsYXRlUG9ydGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMShUZW1wbGF0ZVBvcnRhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUZW1wbGF0ZVBvcnRhbCh0ZW1wbGF0ZSwgdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGl0aW9uYWwgbG9jYWxzIGZvciB0aGUgaW5zdGFudGlhdGVkIGVtYmVkZGVkIHZpZXcuXG4gICAgICAgICAqIFRoZXNlIGxvY2FscyBjYW4gYmUgc2VlbiBhcyBcImV4cG9ydHNcIiBmb3IgdGhlIHRlbXBsYXRlLCBzdWNoIGFzIGhvdyBuZ0ZvciBoYXNcbiAgICAgICAgICogaW5kZXggLyBldmVudCAvIG9kZC5cbiAgICAgICAgICogU2VlIGh0dHBzOi8vYW5ndWxhci5pby9kb2NzL3RzL2xhdGVzdC9hcGkvY29yZS9FbWJlZGRlZFZpZXdSZWYtY2xhc3MuaHRtbFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2NhbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRlbXBsYXRlUG9ydGFsLnByb3RvdHlwZSwgXCJvcmlnaW5cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlUmVmLmVsZW1lbnRSZWY7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFRlbXBsYXRlUG9ydGFsLnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoaG9zdCwgbG9jYWxzKSB7XG4gICAgICAgIHRoaXMubG9jYWxzID0gbG9jYWxzID09IG51bGwgPyBuZXcgTWFwKCkgOiBsb2NhbHM7XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmF0dGFjaC5jYWxsKHRoaXMsIGhvc3QpO1xuICAgIH07XG4gICAgVGVtcGxhdGVQb3J0YWwucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sb2NhbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmRldGFjaC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFRlbXBsYXRlUG9ydGFsO1xufShQb3J0YWwpKTtcbi8qKlxuICogUGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiBQb3J0YWxIb3N0IHRoYXQgb25seSBkZWFscyB3aXRoIGF0dGFjaGluZyBlaXRoZXIgYVxuICogQ29tcG9uZW50UG9ydGFsIG9yIGEgVGVtcGxhdGVQb3J0YWwuXG4gKi9cbnZhciBCYXNlUG9ydGFsSG9zdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZVBvcnRhbEhvc3QoKSB7XG4gICAgICAgIC8qKiBXaGV0aGVyIHRoaXMgaG9zdCBoYXMgYWxyZWFkeSBiZWVuIHBlcm1hbmVudGx5IGRpc3Bvc2VkLiAqL1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKiBXaGV0aGVyIHRoaXMgaG9zdCBoYXMgYW4gYXR0YWNoZWQgcG9ydGFsLiAqL1xuICAgIEJhc2VQb3J0YWxIb3N0LnByb3RvdHlwZS5oYXNBdHRhY2hlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaGVkUG9ydGFsICE9IG51bGw7XG4gICAgfTtcbiAgICBCYXNlUG9ydGFsSG9zdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKHBvcnRhbCkge1xuICAgICAgICBpZiAocG9ydGFsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZE51bGxQb3J0YWxFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZFBvcnRhbEFscmVhZHlBdHRhY2hlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZFBvcnRhbEhvc3RBbHJlYWR5RGlzcG9zZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3J0YWwgaW5zdGFuY2VvZiBDb21wb25lbnRQb3J0YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsID0gcG9ydGFsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9ydGFsIGluc3RhbmNlb2YgVGVtcGxhdGVQb3J0YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsID0gcG9ydGFsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgTWRVbmtub3duUG9ydGFsVHlwZUVycm9yKCk7XG4gICAgfTtcbiAgICBCYXNlUG9ydGFsSG9zdC5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fYXR0YWNoZWRQb3J0YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsLnNldEF0dGFjaGVkSG9zdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9kaXNwb3NlRm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcG9zZUZuKCk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlRm4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCYXNlUG9ydGFsSG9zdC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9O1xuICAgIEJhc2VQb3J0YWxIb3N0LnByb3RvdHlwZS5zZXREaXNwb3NlRm4gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZUZuID0gZm47XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZVBvcnRhbEhvc3Q7XG59KCkpO1xuXG52YXIgX19leHRlbmRzID0gKHdpbmRvdyAmJiB3aW5kb3cuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgX19kZWNvcmF0ZSQ0ID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSQ0ID0gKHdpbmRvdyAmJiB3aW5kb3cuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xuLyoqXG4gKiBEaXJlY3RpdmUgdmVyc2lvbiBvZiBhIGBUZW1wbGF0ZVBvcnRhbGAuIEJlY2F1c2UgdGhlIGRpcmVjdGl2ZSAqaXMqIGEgVGVtcGxhdGVQb3J0YWwsXG4gKiB0aGUgZGlyZWN0aXZlIGluc3RhbmNlIGl0c2VsZiBjYW4gYmUgYXR0YWNoZWQgdG8gYSBob3N0LCBlbmFibGluZyBkZWNsYXJhdGl2ZSB1c2Ugb2YgcG9ydGFscy5cbiAqXG4gKiBVc2FnZTpcbiAqIDx0ZW1wbGF0ZSBwb3J0YWwgI2dyZWV0aW5nPlxuICogICA8cD4gSGVsbG8ge3tuYW1lfX0gPC9wPlxuICogPC90ZW1wbGF0ZT5cbiAqL1xudmFyIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUodGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cbiAgICBUZW1wbGF0ZVBvcnRhbERpcmVjdGl2ZSA9IF9fZGVjb3JhdGUkNChbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuRGlyZWN0aXZlKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW3BvcnRhbF0nLFxuICAgICAgICAgICAgZXhwb3J0QXM6ICdwb3J0YWwnLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNCgnZGVzaWduOnBhcmFtdHlwZXMnLCBbX2FuZ3VsYXJfY29yZS5UZW1wbGF0ZVJlZiwgX2FuZ3VsYXJfY29yZS5WaWV3Q29udGFpbmVyUmVmXSlcbiAgICBdLCBUZW1wbGF0ZVBvcnRhbERpcmVjdGl2ZSk7XG4gICAgcmV0dXJuIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlO1xufShUZW1wbGF0ZVBvcnRhbCkpO1xuLyoqXG4gKiBEaXJlY3RpdmUgdmVyc2lvbiBvZiBhIFBvcnRhbEhvc3QuIEJlY2F1c2UgdGhlIGRpcmVjdGl2ZSAqaXMqIGEgUG9ydGFsSG9zdCwgcG9ydGFscyBjYW4gYmVcbiAqIGRpcmVjdGx5IGF0dGFjaGVkIHRvIGl0LCBlbmFibGluZyBkZWNsYXJhdGl2ZSB1c2UuXG4gKlxuICogVXNhZ2U6XG4gKiA8dGVtcGxhdGUgW3BvcnRhbEhvc3RdPVwiZ3JlZXRpbmdcIj48L3RlbXBsYXRlPlxuICovXG52YXIgUG9ydGFsSG9zdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBvcnRhbEhvc3REaXJlY3RpdmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUG9ydGFsSG9zdERpcmVjdGl2ZShfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBfdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyID0gX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IF92aWV3Q29udGFpbmVyUmVmO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUG9ydGFsSG9zdERpcmVjdGl2ZS5wcm90b3R5cGUsIFwicG9ydGFsXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXBsYWNlQXR0YWNoZWRQb3J0YWwocCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKiBBdHRhY2ggdGhlIGdpdmVuIENvbXBvbmVudFBvcnRhbCB0byB0aGlzIFBvcnRsSG9zdCB1c2luZyB0aGUgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLiAqL1xuICAgIFBvcnRhbEhvc3REaXJlY3RpdmUucHJvdG90eXBlLmF0dGFjaENvbXBvbmVudFBvcnRhbCA9IGZ1bmN0aW9uIChwb3J0YWwpIHtcbiAgICAgICAgcG9ydGFsLnNldEF0dGFjaGVkSG9zdCh0aGlzKTtcbiAgICAgICAgLy8gSWYgdGhlIHBvcnRhbCBzcGVjaWZpZXMgYW4gb3JpZ2luLCB1c2UgdGhhdCBhcyB0aGUgbG9naWNhbCBsb2NhdGlvbiBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgIC8vIGluIHRoZSBhcHBsaWNhdGlvbiB0cmVlLiBPdGhlcndpc2UgdXNlIHRoZSBsb2NhdGlvbiBvZiB0aGlzIFBvcnRhbEhvc3QuXG4gICAgICAgIHZhciB2aWV3Q29udGFpbmVyUmVmID0gcG9ydGFsLnZpZXdDb250YWluZXJSZWYgIT0gbnVsbCA/XG4gICAgICAgICAgICBwb3J0YWwudmlld0NvbnRhaW5lclJlZiA6XG4gICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICB2YXIgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShwb3J0YWwuY29tcG9uZW50KTtcbiAgICAgICAgdmFyIHJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIHZpZXdDb250YWluZXJSZWYubGVuZ3RoLCBwb3J0YWwuaW5qZWN0b3IgfHwgdmlld0NvbnRhaW5lclJlZi5wYXJlbnRJbmplY3Rvcik7XG4gICAgICAgIHRoaXMuc2V0RGlzcG9zZUZuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZi5kZXN0cm95KCk7IH0pO1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH07XG4gICAgLyoqIEF0dGFjaCB0aGUgZ2l2ZW4gVGVtcGxhdGVQb3J0YWwgdG8gdGhpcyBQb3J0bEhvc3QgYXMgYW4gZW1iZWRkZWQgVmlldy4gKi9cbiAgICBQb3J0YWxIb3N0RGlyZWN0aXZlLnByb3RvdHlwZS5hdHRhY2hUZW1wbGF0ZVBvcnRhbCA9IGZ1bmN0aW9uIChwb3J0YWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcG9ydGFsLnNldEF0dGFjaGVkSG9zdCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcocG9ydGFsLnRlbXBsYXRlUmVmKTtcbiAgICAgICAgdGhpcy5zZXREaXNwb3NlRm4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3ZpZXdDb250YWluZXJSZWYuY2xlYXIoKTsgfSk7XG4gICAgICAgIC8vIFRPRE8oamVsYm91cm4pOiByZXR1cm4gbG9jYWxzIGZyb20gdmlld1xuICAgICAgICByZXR1cm4gbmV3IE1hcCgpO1xuICAgIH07XG4gICAgLyoqIERldGF0Y2hlcyB0aGUgY3VycmVudGx5IGF0dGFjaGVkIFBvcnRhbCAoaWYgdGhlcmUgaXMgb25lKSBhbmQgYXR0YWNoZXMgdGhlIGdpdmVuIFBvcnRhbC4gKi9cbiAgICBQb3J0YWxIb3N0RGlyZWN0aXZlLnByb3RvdHlwZS5fcmVwbGFjZUF0dGFjaGVkUG9ydGFsID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2gocCk7XG4gICAgICAgICAgICB0aGlzLl9wb3J0YWwgPSBwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQb3J0YWxIb3N0RGlyZWN0aXZlID0gX19kZWNvcmF0ZSQ0KFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5EaXJlY3RpdmUoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbcG9ydGFsSG9zdF0nLFxuICAgICAgICAgICAgaW5wdXRzOiBbJ3BvcnRhbDogcG9ydGFsSG9zdCddXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSQ0KCdkZXNpZ246cGFyYW10eXBlcycsIFtfYW5ndWxhcl9jb3JlLkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgX2FuZ3VsYXJfY29yZS5WaWV3Q29udGFpbmVyUmVmXSlcbiAgICBdLCBQb3J0YWxIb3N0RGlyZWN0aXZlKTtcbiAgICByZXR1cm4gUG9ydGFsSG9zdERpcmVjdGl2ZTtcbn0oQmFzZVBvcnRhbEhvc3QpKTtcbnZhciBQb3J0YWxNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvcnRhbE1vZHVsZSgpIHtcbiAgICB9XG4gICAgUG9ydGFsTW9kdWxlLmZvclJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogUG9ydGFsTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUG9ydGFsTW9kdWxlID0gX19kZWNvcmF0ZSQ0KFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5OZ01vZHVsZSh7XG4gICAgICAgICAgICBleHBvcnRzOiBbVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUsIFBvcnRhbEhvc3REaXJlY3RpdmVdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUsIFBvcnRhbEhvc3REaXJlY3RpdmVdLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNCgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBQb3J0YWxNb2R1bGUpO1xuICAgIHJldHVybiBQb3J0YWxNb2R1bGU7XG59KCkpO1xuXG4vKipcbiAqIE92ZXJsYXlTdGF0ZSBpcyBhIGJhZyBvZiB2YWx1ZXMgZm9yIGVpdGhlciB0aGUgaW5pdGlhbCBjb25maWd1cmF0aW9uIG9yIGN1cnJlbnQgc3RhdGUgb2YgYW5cbiAqIG92ZXJsYXkuXG4gKi9cbnZhciBPdmVybGF5U3RhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlTdGF0ZSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIE92ZXJsYXlTdGF0ZTtcbn0oKSk7XG5cbnZhciBfX2V4dGVuZHMkNCA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBIFBvcnRhbEhvc3QgZm9yIGF0dGFjaGluZyBwb3J0YWxzIHRvIGFuIGFyYml0cmFyeSBET00gZWxlbWVudCBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiBjb250ZXh0LlxuICpcbiAqIFRoaXMgaXMgdGhlIG9ubHkgcGFydCBvZiB0aGUgcG9ydGFsIGNvcmUgdGhhdCBkaXJlY3RseSB0b3VjaGVzIHRoZSBET00uXG4gKi9cbnZhciBEb21Qb3J0YWxIb3N0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkNChEb21Qb3J0YWxIb3N0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvbVBvcnRhbEhvc3QoX2hvc3REb21FbGVtZW50LCBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9ob3N0RG9tRWxlbWVudCA9IF9ob3N0RG9tRWxlbWVudDtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyID0gX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcbiAgICB9XG4gICAgLyoqIEF0dGFjaCB0aGUgZ2l2ZW4gQ29tcG9uZW50UG9ydGFsIHRvIERPTSBlbGVtZW50IHVzaW5nIHRoZSBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIuICovXG4gICAgRG9tUG9ydGFsSG9zdC5wcm90b3R5cGUuYXR0YWNoQ29tcG9uZW50UG9ydGFsID0gZnVuY3Rpb24gKHBvcnRhbCkge1xuICAgICAgICBpZiAocG9ydGFsLnZpZXdDb250YWluZXJSZWYgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1kQ29tcG9uZW50UG9ydGFsQXR0YWNoZWRUb0RvbVdpdGhvdXRPcmlnaW5FcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHBvcnRhbC5jb21wb25lbnQpO1xuICAgICAgICB2YXIgcmVmID0gcG9ydGFsLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIHBvcnRhbC52aWV3Q29udGFpbmVyUmVmLmxlbmd0aCwgcG9ydGFsLmluamVjdG9yIHx8IHBvcnRhbC52aWV3Q29udGFpbmVyUmVmLnBhcmVudEluamVjdG9yKTtcbiAgICAgICAgdmFyIGhvc3RWaWV3ID0gcmVmLmhvc3RWaWV3O1xuICAgICAgICB0aGlzLl9ob3N0RG9tRWxlbWVudC5hcHBlbmRDaGlsZChob3N0Vmlldy5yb290Tm9kZXNbMF0pO1xuICAgICAgICB0aGlzLnNldERpc3Bvc2VGbihmdW5jdGlvbiAoKSB7IHJldHVybiByZWYuZGVzdHJveSgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHJlZjtcbiAgICB9O1xuICAgIERvbVBvcnRhbEhvc3QucHJvdG90eXBlLmF0dGFjaFRlbXBsYXRlUG9ydGFsID0gZnVuY3Rpb24gKHBvcnRhbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdmlld0NvbnRhaW5lciA9IHBvcnRhbC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICB2YXIgdmlld1JlZiA9IHZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHBvcnRhbC50ZW1wbGF0ZVJlZik7XG4gICAgICAgIHZpZXdSZWYucm9vdE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKHJvb3ROb2RlKSB7IHJldHVybiBfdGhpcy5faG9zdERvbUVsZW1lbnQuYXBwZW5kQ2hpbGQocm9vdE5vZGUpOyB9KTtcbiAgICAgICAgdGhpcy5zZXREaXNwb3NlRm4oKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHZpZXdDb250YWluZXIuaW5kZXhPZih2aWV3UmVmKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBUT0RPKGplbGJvdXJuKTogUmV0dXJuIGxvY2FscyBmcm9tIHZpZXcuXG4gICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgfTtcbiAgICBEb21Qb3J0YWxIb3N0LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX2hvc3REb21FbGVtZW50LnBhcmVudE5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5faG9zdERvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9ob3N0RG9tRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEb21Qb3J0YWxIb3N0O1xufShCYXNlUG9ydGFsSG9zdCkpO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhbiBvdmVybGF5IHRoYXQgaGFzIGJlZW4gY3JlYXRlZCB3aXRoIHRoZSBPdmVybGF5IHNlcnZpY2UuXG4gKiBVc2VkIHRvIG1hbmlwdWxhdGUgb3IgZGlzcG9zZSBvZiBzYWlkIG92ZXJsYXkuXG4gKi9cbnZhciBPdmVybGF5UmVmID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5UmVmKF9wb3J0YWxIb3N0LCBfcGFuZSwgX3N0YXRlKSB7XG4gICAgICAgIHRoaXMuX3BvcnRhbEhvc3QgPSBfcG9ydGFsSG9zdDtcbiAgICAgICAgdGhpcy5fcGFuZSA9IF9wYW5lO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IF9zdGF0ZTtcbiAgICB9XG4gICAgT3ZlcmxheVJlZi5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKHBvcnRhbCkge1xuICAgICAgICB2YXIgYXR0YWNoUmVzdWx0ID0gdGhpcy5fcG9ydGFsSG9zdC5hdHRhY2gocG9ydGFsKTtcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICByZXR1cm4gYXR0YWNoUmVzdWx0O1xuICAgIH07XG4gICAgT3ZlcmxheVJlZi5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsSG9zdC5kZXRhY2goKTtcbiAgICB9O1xuICAgIE92ZXJsYXlSZWYucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BvcnRhbEhvc3QuZGlzcG9zZSgpO1xuICAgIH07XG4gICAgT3ZlcmxheVJlZi5wcm90b3R5cGUuaGFzQXR0YWNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWxIb3N0Lmhhc0F0dGFjaGVkKCk7XG4gICAgfTtcbiAgICAvKiogR2V0cyB0aGUgY3VycmVudCBzdGF0ZSBjb25maWcgb2YgdGhlIG92ZXJsYXkuICovXG4gICAgT3ZlcmxheVJlZi5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9O1xuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBiYXNlZCBvbiB0aGUgcG9zaXRpb24gc3RyYXRlZ3kuICovXG4gICAgT3ZlcmxheVJlZi5wcm90b3R5cGUudXBkYXRlUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5LmFwcGx5KHRoaXMuX3BhbmUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3ZlcmxheVJlZjtcbn0oKSk7XG5cbnZhciBfX2RlY29yYXRlJDggPSAod2luZG93ICYmIHdpbmRvdy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhJDggPSAod2luZG93ICYmIHdpbmRvdy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG4vKipcbiAqIFNpbXBsZSB1dGlsaXR5IGZvciBnZXR0aW5nIHRoZSBib3VuZHMgb2YgdGhlIGJyb3dzZXIgdmlld3BvcnQuXG4gKiBUT0RPOiBpbnRlcm5hbFxuICovXG52YXIgVmlld3BvcnRSdWxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmlld3BvcnRSdWxlcigpIHtcbiAgICB9XG4gICAgLy8gVE9ETyhqZWxib3Vybik6IGNhY2hlIHRoZSBkb2N1bWVudCdzIGJvdW5kaW5nIHJlY3QgYW5kIG9ubHkgdXBkYXRlIGl0IHdoZW4gdGhlIHdpbmRvd1xuICAgIC8vIGlzIHJlc2l6ZWQgKGRlYm91bmNlZCkuXG4gICAgLyoqIEdldHMgYSBDbGllbnRSZWN0IGZvciB0aGUgdmlld3BvcnQncyBib3VuZHMuICovXG4gICAgVmlld3BvcnRSdWxlci5wcm90b3R5cGUuZ2V0Vmlld3BvcnRSZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBVc2UgdGhlIGRvY3VtZW50IGVsZW1lbnQncyBib3VuZGluZyByZWN0IHJhdGhlciB0aGFuIHRoZSB3aW5kb3cgc2Nyb2xsIHByb3BlcnRpZXNcbiAgICAgICAgLy8gKGUuZy4gcGFnZVlPZmZzZXQsIHNjcm9sbFkpIGR1ZSB0byBpbiBpc3N1ZSBpbiBDaHJvbWUgYW5kIElFIHdoZXJlIHdpbmRvdyBzY3JvbGxcbiAgICAgICAgLy8gcHJvcGVydGllcyBhbmQgY2xpZW50IGNvb3JkaW5hdGVzIChib3VuZGluZ0NsaWVudFJlY3QsIGNsaWVudFgvWSwgZXRjLikgYXJlIGluIGRpZmZlcmVudFxuICAgICAgICAvLyBjb25jZXB0dWFsIHZpZXdwb3J0cy4gVW5kZXIgbW9zdCBjaXJjdW1zdGFuY2VzIHRoZXNlIHZpZXdwb3J0cyBhcmUgZXF1aXZhbGVudCwgYnV0IHRoZXlcbiAgICAgICAgLy8gY2FuIGRpc2FncmVlIHdoZW4gdGhlIHBhZ2UgaXMgcGluY2gtem9vbWVkIChvbiBkZXZpY2VzIHRoYXQgc3VwcG9ydCB0b3VjaCkuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00ODkyMDYjYzRcbiAgICAgICAgLy8gV2UgdXNlIHRoZSBkb2N1bWVudEVsZW1lbnQgaW5zdGVhZCBvZiB0aGUgYm9keSBiZWNhdXNlLCBieSBkZWZhdWx0ICh3aXRob3V0IGEgY3NzIHJlc2V0KVxuICAgICAgICAvLyBicm93c2VycyB0eXBpY2FsbHkgZ2l2ZSB0aGUgZG9jdW1lbnQgYm9keSBhbiA4cHggbWFyZ2luLCB3aGljaCBpcyBub3QgaW5jbHVkZWQgaW5cbiAgICAgICAgLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuXG4gICAgICAgIHZhciBkb2N1bWVudFJlY3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbihkb2N1bWVudFJlY3QpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogc2Nyb2xsUG9zaXRpb24udG9wLFxuICAgICAgICAgICAgbGVmdDogc2Nyb2xsUG9zaXRpb24ubGVmdCxcbiAgICAgICAgICAgIGJvdHRvbTogc2Nyb2xsUG9zaXRpb24udG9wICsgaGVpZ2h0LFxuICAgICAgICAgICAgcmlnaHQ6IHNjcm9sbFBvc2l0aW9uLmxlZnQgKyB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgKHRvcCwgbGVmdCkgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSB2aWV3cG9ydC5cbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRSZWN0XG4gICAgICovXG4gICAgVmlld3BvcnRSdWxlci5wcm90b3R5cGUuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbiA9IGZ1bmN0aW9uIChkb2N1bWVudFJlY3QpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50UmVjdCA9PT0gdm9pZCAwKSB7IGRvY3VtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgfVxuICAgICAgICAvLyBUaGUgdG9wLWxlZnQtY29ybmVyIG9mIHRoZSB2aWV3cG9ydCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGRvY3VtZW50XG4gICAgICAgIC8vIGJvZHksIG5vcm1hbGx5IGp1c3QgKHNjcm9sbExlZnQsIHNjcm9sbFRvcCkuIEhvd2V2ZXIsIENocm9tZSBhbmQgRmlyZWZveCBkaXNhZ3JlZSBhYm91dFxuICAgICAgICAvLyB3aGV0aGVyIGBkb2N1bWVudC5ib2R5YCBvciBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50YCBpcyB0aGUgc2Nyb2xsZWQgZWxlbWVudCwgc28gcmVhZGluZ1xuICAgICAgICAvLyBgc2Nyb2xsVG9wYCBhbmQgYHNjcm9sbExlZnRgIGlzIGluY29uc2lzdGVudC4gSG93ZXZlciwgdXNpbmcgdGhlIGJvdW5kaW5nIHJlY3Qgb2ZcbiAgICAgICAgLy8gYGRvY3VtZW50LmRvY3VtZW50RWxlbWVudGAgd29ya3MgY29uc2lzdGVudGx5LCB3aGVyZSB0aGUgYHRvcGAgYW5kIGBsZWZ0YCB2YWx1ZXMgd2lsbFxuICAgICAgICAvLyBlcXVhbCBuZWdhdGl2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgICB2YXIgdG9wID0gZG9jdW1lbnRSZWN0LnRvcCA8IDAgJiYgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPT0gMCA/XG4gICAgICAgICAgICAtZG9jdW1lbnRSZWN0LnRvcCA6XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGxlZnQgPSBkb2N1bWVudFJlY3QubGVmdCA8IDAgJiYgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID09IDAgP1xuICAgICAgICAgICAgLWRvY3VtZW50UmVjdC5sZWZ0IDpcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgICB9O1xuICAgIFZpZXdwb3J0UnVsZXIgPSBfX2RlY29yYXRlJDgoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkluamVjdGFibGUoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEkOCgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBWaWV3cG9ydFJ1bGVyKTtcbiAgICByZXR1cm4gVmlld3BvcnRSdWxlcjtcbn0oKSk7XG5cbi8qKiBUaGUgcG9pbnRzIG9mIHRoZSBvcmlnaW4gZWxlbWVudCBhbmQgdGhlIG92ZXJsYXkgZWxlbWVudCB0byBjb25uZWN0LiAqL1xudmFyIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIob3JpZ2luLCBvdmVybGF5KSB7XG4gICAgICAgIHRoaXMub3JpZ2luWCA9IG9yaWdpbi5vcmlnaW5YO1xuICAgICAgICB0aGlzLm9yaWdpblkgPSBvcmlnaW4ub3JpZ2luWTtcbiAgICAgICAgdGhpcy5vdmVybGF5WCA9IG92ZXJsYXkub3ZlcmxheVg7XG4gICAgICAgIHRoaXMub3ZlcmxheVkgPSBvdmVybGF5Lm92ZXJsYXlZO1xuICAgIH1cbiAgICByZXR1cm4gQ29ubmVjdGlvblBvc2l0aW9uUGFpcjtcbn0oKSk7XG5cbi8qKlxuICogQSBzdHJhdGVneSBmb3IgcG9zaXRpb25pbmcgb3ZlcmxheXMuIFVzaW5nIHRoaXMgc3RyYXRlZ3ksIGFuIG92ZXJsYXkgaXMgZ2l2ZW4gYW5cbiAqIGltcGxpY3QgcG9zaXRpb24gcmVsYXRpdmUgc29tZSBvcmlnaW4gZWxlbWVudC4gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIGlzIGRlZmluZWQgaW4gdGVybXMgb2ZcbiAqIGEgcG9pbnQgb24gdGhlIG9yaWdpbiBlbGVtZW50IHRoYXQgaXMgY29ubmVjdGVkIHRvIGEgcG9pbnQgb24gdGhlIG92ZXJsYXkgZWxlbWVudC4gRm9yIGV4YW1wbGUsXG4gKiBhIGJhc2ljIGRyb3Bkb3duIGlzIGNvbm5lY3RpbmcgdGhlIGJvdHRvbS1sZWZ0IGNvcm5lciBvZiB0aGUgb3JpZ2luIHRvIHRoZSB0b3AtbGVmdCBjb3JuZXJcbiAqIG9mIHRoZSBvdmVybGF5LlxuICovXG52YXIgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneShfY29ubmVjdGVkVG8sIF9vcmlnaW5Qb3MsIF9vdmVybGF5UG9zLCBfdmlld3BvcnRSdWxlcikge1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWRUbyA9IF9jb25uZWN0ZWRUbztcbiAgICAgICAgdGhpcy5fb3JpZ2luUG9zID0gX29yaWdpblBvcztcbiAgICAgICAgdGhpcy5fb3ZlcmxheVBvcyA9IF9vdmVybGF5UG9zO1xuICAgICAgICB0aGlzLl92aWV3cG9ydFJ1bGVyID0gX3ZpZXdwb3J0UnVsZXI7XG4gICAgICAgIC8vIFRPRE8oamVsYm91cm4pOiBzZXQgUlRMIHRvIHRoZSBhY3R1YWwgdmFsdWUgZnJvbSB0aGUgYXBwLlxuICAgICAgICAvKiogV2hldGhlciB0aGUgd2UncmUgZGVhbGluZyB3aXRoIGFuIFJUTCBjb250ZXh0ICovXG4gICAgICAgIHRoaXMuX2lzUnRsID0gZmFsc2U7XG4gICAgICAgIC8qKiBPcmRlcmVkIGxpc3Qgb2YgcHJlZmVycmVkIHBvc2l0aW9ucywgZnJvbSBtb3N0IHRvIGxlYXN0IGRlc2lyYWJsZS4gKi9cbiAgICAgICAgdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMuX29yaWdpbiA9IHRoaXMuX2Nvbm5lY3RlZFRvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMud2l0aEZhbGxiYWNrUG9zaXRpb24oX29yaWdpblBvcywgX292ZXJsYXlQb3MpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUsIFwicG9zaXRpb25zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBlbGVtZW50LCB1c2luZyB3aGljaGV2ZXIgcHJlZmVycmVkIHBvc2l0aW9uIHJlbGF0aXZlXG4gICAgICogdG8gdGhlIG9yaWdpbiBmaXRzIG9uLXNjcmVlbi5cbiAgICAgKiBUT0RPOiBpbnRlcm5hbFxuICAgICAqL1xuICAgIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0aGUgYm91bmRpbmcgcmVjdHMgZm9yIHRoZSBvcmlnaW4gYW5kIHRoZSBvdmVybGF5IHRvIGRldGVybWluZSBob3cgdG8gcG9zaXRpb25cbiAgICAgICAgLy8gdGhlIG92ZXJsYXkgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cbiAgICAgICAgdmFyIG9yaWdpblJlY3QgPSB0aGlzLl9vcmlnaW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBvdmVybGF5UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIFdlIHVzZSB0aGUgdmlld3BvcnQgcmVjdCB0byBkZXRlcm1pbmUgd2hldGhlciBhIHBvc2l0aW9uIHdvdWxkIGdvIG9mZi1zY3JlZW4uXG4gICAgICAgIHZhciB2aWV3cG9ydFJlY3QgPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0UmVjdCgpO1xuICAgICAgICB2YXIgZmlyc3RPdmVybGF5UG9pbnQgPSBudWxsO1xuICAgICAgICAvLyBXZSB3YW50IHRvIHBsYWNlIHRoZSBvdmVybGF5IGluIHRoZSBmaXJzdCBvZiB0aGUgcHJlZmVycmVkIHBvc2l0aW9ucyBzdWNoIHRoYXQgdGhlXG4gICAgICAgIC8vIG92ZXJsYXkgZml0cyBvbi1zY3JlZW4uXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9wcmVmZXJyZWRQb3NpdGlvbnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gX2FbX2ldO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSAoeCwgeSkgcG9pbnQgb2YgY29ubmVjdGlvbiBvbiB0aGUgb3JpZ2luLCBhbmQgdGhlbiB1c2UgdGhhdCB0byBnZXQgdGhlXG4gICAgICAgICAgICAvLyAodG9wLCBsZWZ0KSBjb29yZGluYXRlIGZvciB0aGUgb3ZlcmxheSBhdCBgcG9zYC5cbiAgICAgICAgICAgIHZhciBvcmlnaW5Qb2ludCA9IHRoaXMuX2dldE9yaWdpbkNvbm5lY3Rpb25Qb2ludChvcmlnaW5SZWN0LCBwb3MpO1xuICAgICAgICAgICAgdmFyIG92ZXJsYXlQb2ludCA9IHRoaXMuX2dldE92ZXJsYXlQb2ludChvcmlnaW5Qb2ludCwgb3ZlcmxheVJlY3QsIHBvcyk7XG4gICAgICAgICAgICBmaXJzdE92ZXJsYXlQb2ludCA9IGZpcnN0T3ZlcmxheVBvaW50IHx8IG92ZXJsYXlQb2ludDtcbiAgICAgICAgICAgIC8vIElmIHRoZSBvdmVybGF5IGluIHRoZSBjYWxjdWxhdGVkIHBvc2l0aW9uIGZpdHMgb24tc2NyZWVuLCBwdXQgaXQgdGhlcmUgYW5kIHdlJ3JlIGRvbmUuXG4gICAgICAgICAgICBpZiAodGhpcy5fd2lsbE92ZXJsYXlGaXRXaXRoaW5WaWV3cG9ydChvdmVybGF5UG9pbnQsIG92ZXJsYXlSZWN0LCB2aWV3cG9ydFJlY3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQsIG92ZXJsYXlQb2ludCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPKGplbGJvdXJuKTogZmFsbGJhY2sgYmVoYXZpb3IgZm9yIHdoZW4gbm9uZSBvZiB0aGUgcHJlZmVycmVkIHBvc2l0aW9ucyBmaXQgb24tc2NyZWVuLlxuICAgICAgICAvLyBGb3Igbm93LCBqdXN0IHN0aWNrIGl0IGluIHRoZSBmaXJzdCBwb3NpdGlvbiBhbmQgbGV0IGl0IGdvIG9mZi1zY3JlZW4uXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50LCBmaXJzdE92ZXJsYXlQb2ludCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfTtcbiAgICBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LnByb3RvdHlwZS53aXRoRmFsbGJhY2tQb3NpdGlvbiA9IGZ1bmN0aW9uIChvcmlnaW5Qb3MsIG92ZXJsYXlQb3MpIHtcbiAgICAgICAgdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zLnB1c2gobmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIob3JpZ2luUG9zLCBvdmVybGF5UG9zKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaG9yaXpvbnRhbCAoeCkgXCJzdGFydFwiIGRpbWVuc2lvbiBiYXNlZCBvbiB3aGV0aGVyIHRoZSBvdmVybGF5IGlzIGluIGFuIFJUTCBjb250ZXh0LlxuICAgICAqIEBwYXJhbSByZWN0XG4gICAgICovXG4gICAgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuX2dldFN0YXJ0WCA9IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1J0bCA/IHJlY3QucmlnaHQgOiByZWN0LmxlZnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBob3Jpem9udGFsICh4KSBcImVuZFwiIGRpbWVuc2lvbiBiYXNlZCBvbiB3aGV0aGVyIHRoZSBvdmVybGF5IGlzIGluIGFuIFJUTCBjb250ZXh0LlxuICAgICAqIEBwYXJhbSByZWN0XG4gICAgICovXG4gICAgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuX2dldEVuZFggPSBmdW5jdGlvbiAocmVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNSdGwgPyByZWN0LmxlZnQgOiByZWN0LnJpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgKHgsIHkpIGNvb3JkaW5hdGUgb2YgYSBjb25uZWN0aW9uIHBvaW50IG9uIHRoZSBvcmlnaW4gYmFzZWQgb24gYSByZWxhdGl2ZSBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0gb3JpZ2luUmVjdFxuICAgICAqIEBwYXJhbSBwb3NcbiAgICAgKi9cbiAgICBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5fZ2V0T3JpZ2luQ29ubmVjdGlvblBvaW50ID0gZnVuY3Rpb24gKG9yaWdpblJlY3QsIHBvcykge1xuICAgICAgICB2YXIgb3JpZ2luU3RhcnRYID0gdGhpcy5fZ2V0U3RhcnRYKG9yaWdpblJlY3QpO1xuICAgICAgICB2YXIgb3JpZ2luRW5kWCA9IHRoaXMuX2dldEVuZFgob3JpZ2luUmVjdCk7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBpZiAocG9zLm9yaWdpblggPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIHggPSBvcmlnaW5TdGFydFggKyAob3JpZ2luUmVjdC53aWR0aCAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IHBvcy5vcmlnaW5YID09ICdzdGFydCcgPyBvcmlnaW5TdGFydFggOiBvcmlnaW5FbmRYO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5O1xuICAgICAgICBpZiAocG9zLm9yaWdpblkgPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIHkgPSBvcmlnaW5SZWN0LnRvcCArIChvcmlnaW5SZWN0LmhlaWdodCAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeSA9IHBvcy5vcmlnaW5ZID09ICd0b3AnID8gb3JpZ2luUmVjdC50b3AgOiBvcmlnaW5SZWN0LmJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSAoeCwgeSkgY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSBvdmVybGF5IGdpdmVuIGEgZ2l2ZW4gcG9zaXRpb24gYW5kXG4gICAgICogb3JpZ2luIHBvaW50IHRvIHdoaWNoIHRoZSBvdmVybGF5IHNob3VsZCBiZSBjb25uZWN0ZWQuXG4gICAgICogQHBhcmFtIG9yaWdpblBvaW50XG4gICAgICogQHBhcmFtIG92ZXJsYXlSZWN0XG4gICAgICogQHBhcmFtIHBvc1xuICAgICAqL1xuICAgIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLl9nZXRPdmVybGF5UG9pbnQgPSBmdW5jdGlvbiAob3JpZ2luUG9pbnQsIG92ZXJsYXlSZWN0LCBwb3MpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSAob3ZlcmxheVN0YXJ0WCwgb3ZlcmxheVN0YXJ0WSksIHRoZSBzdGFydCBvZiB0aGUgcG90ZW50aWFsIG92ZXJsYXkgcG9zaXRpb25cbiAgICAgICAgLy8gcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBwb2ludC5cbiAgICAgICAgdmFyIG92ZXJsYXlTdGFydFg7XG4gICAgICAgIGlmIChwb3Mub3ZlcmxheVggPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIG92ZXJsYXlTdGFydFggPSAtb3ZlcmxheVJlY3Qud2lkdGggLyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3ZlcmxheVN0YXJ0WCA9IHBvcy5vdmVybGF5WCA9PSAnc3RhcnQnID8gMCA6IC1vdmVybGF5UmVjdC53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3ZlcmxheVN0YXJ0WTtcbiAgICAgICAgaWYgKHBvcy5vdmVybGF5WSA9PSAnY2VudGVyJykge1xuICAgICAgICAgICAgb3ZlcmxheVN0YXJ0WSA9IC1vdmVybGF5UmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3ZlcmxheVN0YXJ0WSA9IHBvcy5vdmVybGF5WSA9PSAndG9wJyA/IDAgOiAtb3ZlcmxheVJlY3QuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBvcmlnaW5Qb2ludC54ICsgb3ZlcmxheVN0YXJ0WCxcbiAgICAgICAgICAgIHk6IG9yaWdpblBvaW50LnkgKyBvdmVybGF5U3RhcnRZXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG92ZXJsYXkgcG9zaXRpb25lZCBhdCB0aGUgZ2l2ZW4gcG9pbnQgd2lsbCBmaXQgb24tc2NyZWVuLlxuICAgICAqIEBwYXJhbSBvdmVybGF5UG9pbnQgVGhlIHRvcC1sZWZ0IGNvb3JkaW5hdGUgb2YgdGhlIG92ZXJsYXkuXG4gICAgICogQHBhcmFtIG92ZXJsYXlSZWN0IEJvdW5kaW5nIHJlY3Qgb2YgdGhlIG92ZXJsYXksIHVzZWQgdG8gZ2V0IGl0cyBzaXplLlxuICAgICAqIEBwYXJhbSB2aWV3cG9ydFJlY3QgVGhlIGJvdW5kaW5nIHZpZXdwb3J0LlxuICAgICAqL1xuICAgIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLl93aWxsT3ZlcmxheUZpdFdpdGhpblZpZXdwb3J0ID0gZnVuY3Rpb24gKG92ZXJsYXlQb2ludCwgb3ZlcmxheVJlY3QsIHZpZXdwb3J0UmVjdCkge1xuICAgICAgICAvLyBUT0RPKGplbGJvdXJuKTogcHJvYmFibHkgYWxzbyB3YW50IHNvbWUgc3BhY2UgYmV0d2VlbiBvdmVybGF5IGVkZ2UgYW5kIHZpZXdwb3J0IGVkZ2UuXG4gICAgICAgIHJldHVybiBvdmVybGF5UG9pbnQueCA+PSB2aWV3cG9ydFJlY3QubGVmdCAmJlxuICAgICAgICAgICAgb3ZlcmxheVBvaW50LnggKyBvdmVybGF5UmVjdC53aWR0aCA8PSB2aWV3cG9ydFJlY3QucmlnaHQgJiZcbiAgICAgICAgICAgIG92ZXJsYXlQb2ludC55ID49IHZpZXdwb3J0UmVjdC50b3AgJiZcbiAgICAgICAgICAgIG92ZXJsYXlQb2ludC55ICsgb3ZlcmxheVJlY3QuaGVpZ2h0IDw9IHZpZXdwb3J0UmVjdC5ib3R0b207XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQaHlzaWNhbGx5IHBvc2l0aW9ucyB0aGUgb3ZlcmxheSBlbGVtZW50IHRvIHRoZSBnaXZlbiBjb29yZGluYXRlLlxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIG92ZXJsYXlQb2ludFxuICAgICAqL1xuICAgIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLl9zZXRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCwgb3ZlcmxheVBvaW50KSB7XG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHggPSBvdmVybGF5UG9pbnQueCArIHNjcm9sbFBvcy5sZWZ0O1xuICAgICAgICB2YXIgeSA9IG92ZXJsYXlQb2ludC55ICsgc2Nyb2xsUG9zLnRvcDtcbiAgICAgICAgLy8gVE9ETyhqZWxib3Vybik6IHdlIGRvbid0IHdhbnQgdG8gYWx3YXlzIG92ZXJ3cml0ZSB0aGUgdHJhbnNmb3JtIHByb3BlcnR5IGhlcmUsXG4gICAgICAgIC8vIGJlY2F1c2UgaXQgd2lsbCBuZWVkIHRvIGJlIHVzZWQgZm9yIGFuaW1hdGlvbnMuXG4gICAgICAgIF9hbmd1bGFyMk1hdGVyaWFsX2NvcmUuYXBwbHlDc3NUcmFuc2Zvcm0oZWxlbWVudCwgXCJ0cmFuc2xhdGVYKFwiICsgeCArIFwicHgpIHRyYW5zbGF0ZVkoXCIgKyB5ICsgXCJweClcIik7XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbn0oKSk7XG5cbi8qKlxuICogQSBzdHJhdGVneSBmb3IgcG9zaXRpb25pbmcgb3ZlcmxheXMuIFVzaW5nIHRoaXMgc3RyYXRlZ3ksIGFuIG92ZXJsYXkgaXMgZ2l2ZW4gYW5cbiAqIGV4cGxpY2l0IHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBicm93c2VyJ3Mgdmlld3BvcnQuXG4gKi9cbnZhciBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5KCkge1xuICAgICAgICB0aGlzLl9jc3NQb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3RvcCA9ICcnO1xuICAgICAgICB0aGlzLl9ib3R0b20gPSAnJztcbiAgICAgICAgdGhpcy5fbGVmdCA9ICcnO1xuICAgICAgICB0aGlzLl9yaWdodCA9ICcnO1xuICAgICAgICAvKiogQXJyYXkgb2YgaW5kaXZpZHVhbCBhcHBsaWNhdGlvbnMgb2YgdHJhbnNsYXRlWCgpLiBDdXJyZW50bHkgb25seSBmb3IgY2VudGVyaW5nLiAqL1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVYID0gW107XG4gICAgICAgIC8qKiBBcnJheSBvZiBpbmRpdmlkdWFsIGFwcGxpY2F0aW9ucyBvZiB0cmFuc2xhdGVZKCkuIEN1cnJlbnRseSBvbmx5IGZvciBjZW50ZXJpbmcuICovXG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVkgPSBbXTtcbiAgICB9XG4gICAgLyoqIFNldHMgdGhlIGVsZW1lbnQgdG8gdXNlZSBDU1MgcG9zaXRpb246IGZpeGVkICovXG4gICAgR2xvYmFsUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuZml4ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2Nzc1Bvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiogU2V0cyB0aGUgZWxlbWVudCB0byB1c2VlIENTUyBwb3NpdGlvbjogYWJzb2x1dGUuIFRoaXMgaXMgdGhlIGRlZmF1bHQuICovXG4gICAgR2xvYmFsUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuYWJzb2x1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2Nzc1Bvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiogU2V0cyB0aGUgdG9wIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5LiBDbGVhcnMgYW55IHByZXZpb3VzbHkgc2V0IHZlcnRpY2FsIHBvc2l0aW9uLiAqL1xuICAgIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLnRvcCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ib3R0b20gPSAnJztcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWSA9IFtdO1xuICAgICAgICB0aGlzLl90b3AgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiogU2V0cyB0aGUgbGVmdCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheS4gQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCBob3Jpem9udGFsIHBvc2l0aW9uLiAqL1xuICAgIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmxlZnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmlnaHQgPSAnJztcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWCA9IFtdO1xuICAgICAgICB0aGlzLl9sZWZ0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqIFNldHMgdGhlIGJvdHRvbSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheS4gQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCB2ZXJ0aWNhbCBwb3NpdGlvbi4gKi9cbiAgICBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5ib3R0b20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdG9wID0gJyc7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVkgPSBbXTtcbiAgICAgICAgdGhpcy5fYm90dG9tID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqIFNldHMgdGhlIHJpZ2h0IHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5LiBDbGVhcnMgYW55IHByZXZpb3VzbHkgc2V0IGhvcml6b250YWwgcG9zaXRpb24uICovXG4gICAgR2xvYmFsUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUucmlnaHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGVmdCA9ICcnO1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVYID0gW107XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgb3ZlcmxheSBob3Jpem9udGFsbHkgd2l0aCBhbiBvcHRpb25hbCBvZmZzZXQuXG4gICAgICogQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCBob3Jpem9udGFsIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmNlbnRlckhvcml6b250YWxseSA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9ICcwcHgnOyB9XG4gICAgICAgIHRoaXMuX2xlZnQgPSAnNTAlJztcbiAgICAgICAgdGhpcy5fcmlnaHQgPSAnJztcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWCA9IFsnLTUwJScsIG9mZnNldF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgb3ZlcmxheSB2ZXJ0aWNhbGx5IHdpdGggYW4gb3B0aW9uYWwgb2Zmc2V0LlxuICAgICAqIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgdmVydGljYWwgcG9zaXRpb24uXG4gICAgICovXG4gICAgR2xvYmFsUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuY2VudGVyVmVydGljYWxseSA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9ICcwcHgnOyB9XG4gICAgICAgIHRoaXMuX3RvcCA9ICc1MCUnO1xuICAgICAgICB0aGlzLl9ib3R0b20gPSAnJztcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWSA9IFsnLTUwJScsIG9mZnNldF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIHBvc2l0aW9uIHRvIHRoZSBlbGVtZW50LlxuICAgICAqIFRPRE86IGludGVybmFsXG4gICAgICovXG4gICAgR2xvYmFsUG9zaXRpb25TdHJhdGVneS5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gdGhpcy5fY3NzUG9zaXRpb247XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gdGhpcy5fdG9wO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0aGlzLl9sZWZ0O1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJvdHRvbSA9IHRoaXMuX2JvdHRvbTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yaWdodCA9IHRoaXMuX3JpZ2h0O1xuICAgICAgICAvLyBUT0RPKGplbGJvdXJuKTogd2UgZG9uJ3Qgd2FudCB0byBhbHdheXMgb3ZlcndyaXRlIHRoZSB0cmFuc2Zvcm0gcHJvcGVydHkgaGVyZSxcbiAgICAgICAgLy8gYmVjYXVzZSBpdCB3aWxsIG5lZWQgdG8gYmUgdXNlZCBmb3IgYW5pbWF0aW9ucy5cbiAgICAgICAgdmFyIHRyYW5sYXRlWCA9IHRoaXMuX3JlZHVjZVRyYW5zbGF0ZVZhbHVlcygndHJhbnNsYXRlWCcsIHRoaXMuX3RyYW5zbGF0ZVgpO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IHRoaXMuX3JlZHVjZVRyYW5zbGF0ZVZhbHVlcygndHJhbnNsYXRlWScsIHRoaXMuX3RyYW5zbGF0ZVkpO1xuICAgICAgICBfYW5ndWxhcjJNYXRlcmlhbF9jb3JlLmFwcGx5Q3NzVHJhbnNmb3JtKGVsZW1lbnQsIHRyYW5sYXRlWCArIFwiIFwiICsgdHJhbnNsYXRlWSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfTtcbiAgICAvKiogUmVkdWNlIGEgbGlzdCBvZiB0cmFuc2xhdGUgdmFsdWVzIHRvIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgaW4gdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSAqL1xuICAgIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kucHJvdG90eXBlLl9yZWR1Y2VUcmFuc2xhdGVWYWx1ZXMgPSBmdW5jdGlvbiAodHJhbnNsYXRlRm4sIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbiAodCkgeyByZXR1cm4gKHRyYW5zbGF0ZUZuICsgXCIoXCIgKyB0ICsgXCIpXCIpOyB9KS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gR2xvYmFsUG9zaXRpb25TdHJhdGVneTtcbn0oKSk7XG5cbnZhciBfX2RlY29yYXRlJDcgPSAod2luZG93ICYmIHdpbmRvdy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhJDcgPSAod2luZG93ICYmIHdpbmRvdy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG4vKiogQnVpbGRlciBmb3Igb3ZlcmxheSBwb3NpdGlvbiBzdHJhdGVneS4gKi9cbnZhciBPdmVybGF5UG9zaXRpb25CdWlsZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5UG9zaXRpb25CdWlsZGVyKF92aWV3cG9ydFJ1bGVyKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdwb3J0UnVsZXIgPSBfdmlld3BvcnRSdWxlcjtcbiAgICB9XG4gICAgLyoqIENyZWF0ZXMgYSBnbG9iYWwgcG9zaXRpb24gc3RyYXRlZ3kuICovXG4gICAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlci5wcm90b3R5cGUuZ2xvYmFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3koKTtcbiAgICB9O1xuICAgIC8qKiBDcmVhdGVzIGEgcmVsYXRpdmUgcG9zaXRpb24gc3RyYXRlZ3kuICovXG4gICAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlci5wcm90b3R5cGUuY29ubmVjdGVkVG8gPSBmdW5jdGlvbiAoZWxlbWVudFJlZiwgb3JpZ2luUG9zLCBvdmVybGF5UG9zKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneShlbGVtZW50UmVmLCBvcmlnaW5Qb3MsIG92ZXJsYXlQb3MsIHRoaXMuX3ZpZXdwb3J0UnVsZXIpO1xuICAgIH07XG4gICAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlciA9IF9fZGVjb3JhdGUkNyhbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5qZWN0YWJsZSgpLCBcbiAgICAgICAgX19tZXRhZGF0YSQ3KCdkZXNpZ246cGFyYW10eXBlcycsIFtWaWV3cG9ydFJ1bGVyXSlcbiAgICBdLCBPdmVybGF5UG9zaXRpb25CdWlsZGVyKTtcbiAgICByZXR1cm4gT3ZlcmxheVBvc2l0aW9uQnVpbGRlcjtcbn0oKSk7XG5cbi8qKlxuICogVGhlIE92ZXJsYXlDb250YWluZXIgaXMgdGhlIGNvbnRhaW5lciBpbiB3aGljaCBhbGwgb3ZlcmxheXMgd2lsbCBsb2FkLlxuICogSXQgc2hvdWxkIGJlIHByb3ZpZGVkIGluIHRoZSByb290IGNvbXBvbmVudCB0byBlbnN1cmUgaXQgaXMgcHJvcGVybHkgc2hhcmVkLlxuICovXG52YXIgT3ZlcmxheUNvbnRhaW5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbnRhaW5lcigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgb3ZlcmxheSBjb250YWluZXIgZWxlbWVudC4gIEl0IHdpbGwgbGF6aWx5XG4gICAgICogY3JlYXRlIHRoZSBlbGVtZW50IHRoZSBmaXJzdCB0aW1lICBpdCBpcyBjYWxsZWQgdG8gZmFjaWxpdGF0ZSB1c2luZ1xuICAgICAqIHRoZSBjb250YWluZXIgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzLlxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdGhlIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG4gICAgT3ZlcmxheUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVDb250YWluZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyRWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb250YWluZXIgZWxlbWVudCwgd2hpY2ggaXMgc2ltcGx5IGEgZGl2XG4gICAgICogd2l0aCB0aGUgJ21kLW92ZXJsYXktY29udGFpbmVyJyBjbGFzcyBvbiB0aGUgZG9jdW1lbnQgYm9keS5cbiAgICAgKi9cbiAgICBPdmVybGF5Q29udGFpbmVyLnByb3RvdHlwZS5fY3JlYXRlQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtZC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfTtcbiAgICByZXR1cm4gT3ZlcmxheUNvbnRhaW5lcjtcbn0oKSk7XG5cbnZhciBfX2RlY29yYXRlJDYgPSAod2luZG93ICYmIHdpbmRvdy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhJDYgPSAod2luZG93ICYmIHdpbmRvdy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG4vKiogTmV4dCBvdmVybGF5IHVuaXF1ZSBJRC4gKi9cbnZhciBuZXh0VW5pcXVlSWQgPSAwO1xuLyoqIFRoZSBkZWZhdWx0IHN0YXRlIGZvciBuZXdseSBjcmVhdGVkIG92ZXJsYXlzLiAqL1xudmFyIGRlZmF1bHRTdGF0ZSA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbi8qKlxuICogU2VydmljZSB0byBjcmVhdGUgT3ZlcmxheXMuIE92ZXJsYXlzIGFyZSBkeW5hbWljYWxseSBhZGRlZCBwaWVjZXMgb2YgZmxvYXRpbmcgVUksIG1lYW50IHRvIGJlXG4gKiB1c2VkIGFzIGEgbG93LWxldmVsIGJ1aWxkaW5nIGJ1aWxkaW5nIGJsb2NrIGZvciBvdGhlciBjb21wb25lbnRzLiBEaWFsb2dzLCB0b29sdGlwcywgbWVudXMsXG4gKiBzZWxlY3RzLCBldGMuIGNhbiBhbGwgYmUgYnVpbHQgdXNpbmcgb3ZlcmxheXMuIFRoZSBzZXJ2aWNlIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBieSBhdXRob3JzXG4gKiBvZiByZS11c2FibGUgY29tcG9uZW50cyByYXRoZXIgdGhhbiBkZXZlbG9wZXJzIGJ1aWxkaW5nIGVuZC11c2VyIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBBbiBvdmVybGF5ICppcyogYSBQb3J0YWxIb3N0LCBzbyBhbnkga2luZCBvZiBQb3J0YWwgY2FuIGJlIGxvYWRlZCBpbnRvIG9uZS5cbiAqL1xudmFyIE92ZXJsYXkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXkoX292ZXJsYXlDb250YWluZXIsIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIF9wb3NpdGlvbkJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxheUNvbnRhaW5lciA9IF9vdmVybGF5Q29udGFpbmVyO1xuICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgPSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbkJ1aWxkZXIgPSBfcG9zaXRpb25CdWlsZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkuXG4gICAgICogQHBhcmFtIHN0YXRlIFN0YXRlIHRvIGFwcGx5IHRvIHRoZSBvdmVybGF5LlxuICAgICAqIEByZXR1cm5zIEEgcmVmZXJlbmNlIHRvIHRoZSBjcmVhdGVkIG92ZXJsYXkuXG4gICAgICovXG4gICAgT3ZlcmxheS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gZGVmYXVsdFN0YXRlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVPdmVybGF5UmVmKHRoaXMuX2NyZWF0ZVBhbmVFbGVtZW50KCksIHN0YXRlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwb3NpdGlvbiBidWlsZGVyIHRoYXQgY2FuIGJlIHVzZWQsIHZpYSBmbHVlbnQgQVBJLFxuICAgICAqIHRvIGNvbnN0cnVjdCBhbmQgY29uZmlndXJlIGEgcG9zaXRpb24gc3RyYXRlZ3kuXG4gICAgICovXG4gICAgT3ZlcmxheS5wcm90b3R5cGUucG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkJ1aWxkZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBET00gZWxlbWVudCBmb3IgYW4gb3ZlcmxheSBhbmQgYXBwZW5kcyBpdCB0byB0aGUgb3ZlcmxheSBjb250YWluZXIuXG4gICAgICogQHJldHVybnMgUHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIGNyZWF0ZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBPdmVybGF5LnByb3RvdHlwZS5fY3JlYXRlUGFuZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBhbmUuaWQgPSBcIm1kLW92ZXJsYXktXCIgKyBuZXh0VW5pcXVlSWQrKztcbiAgICAgICAgcGFuZS5jbGFzc0xpc3QuYWRkKCdtZC1vdmVybGF5LXBhbmUnKTtcbiAgICAgICAgdGhpcy5fb3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCkuYXBwZW5kQ2hpbGQocGFuZSk7XG4gICAgICAgIHJldHVybiBwYW5lO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgRG9tUG9ydGFsSG9zdCBpbnRvIHdoaWNoIHRoZSBvdmVybGF5IGNvbnRlbnQgY2FuIGJlIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0gcGFuZSBUaGUgRE9NIGVsZW1lbnQgdG8gdHVybiBpbnRvIGEgcG9ydGFsIGhvc3QuXG4gICAgICogQHJldHVybnMgQSBwb3J0YWwgaG9zdCBmb3IgdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgICAqL1xuICAgIE92ZXJsYXkucHJvdG90eXBlLl9jcmVhdGVQb3J0YWxIb3N0ID0gZnVuY3Rpb24gKHBhbmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21Qb3J0YWxIb3N0KHBhbmUsIHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE92ZXJsYXlSZWYgZm9yIGFuIG92ZXJsYXkgaW4gdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBwYW5lIERPTSBlbGVtZW50IGZvciB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqIEByZXR1cm5zIHtPdmVybGF5UmVmfVxuICAgICAqL1xuICAgIE92ZXJsYXkucHJvdG90eXBlLl9jcmVhdGVPdmVybGF5UmVmID0gZnVuY3Rpb24gKHBhbmUsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheVJlZih0aGlzLl9jcmVhdGVQb3J0YWxIb3N0KHBhbmUpLCBwYW5lLCBzdGF0ZSk7XG4gICAgfTtcbiAgICBPdmVybGF5ID0gX19kZWNvcmF0ZSQ2KFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbmplY3RhYmxlKCksIFxuICAgICAgICBfX21ldGFkYXRhJDYoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW092ZXJsYXlDb250YWluZXIsIF9hbmd1bGFyX2NvcmUuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBPdmVybGF5UG9zaXRpb25CdWlsZGVyXSlcbiAgICBdLCBPdmVybGF5KTtcbiAgICByZXR1cm4gT3ZlcmxheTtcbn0oKSk7XG4vKiogUHJvdmlkZXJzIGZvciBPdmVybGF5IGFuZCBpdHMgcmVsYXRlZCBpbmplY3RhYmxlcy4gKi9cbnZhciBPVkVSTEFZX1BST1ZJREVSUyA9IFtcbiAgICBWaWV3cG9ydFJ1bGVyLFxuICAgIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29udGFpbmVyLFxuXTtcblxudmFyIF9fZGVjb3JhdGUkNSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkNSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKiBEZWZhdWx0IHNldCBvZiBwb3NpdGlvbnMgZm9yIHRoZSBvdmVybGF5LiBGb2xsb3dzIHRoZSBiZWhhdmlvciBvZiBhIGRyb3Bkb3duLiAqL1xudmFyIGRlZmF1bHRQb3NpdGlvbkxpc3QgPSBbXG4gICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSksXG5dO1xuLyoqXG4gKiBEaXJlY3RpdmUgYXBwbGllZCB0byBhbiBlbGVtZW50IHRvIG1ha2UgaXQgdXNhYmxlIGFzIGFuIG9yaWdpbiBmb3IgYW4gT3ZlcmxheSB1c2luZyBhXG4gKiBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LlxuICovXG52YXIgT3ZlcmxheU9yaWdpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheU9yaWdpbihfZWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmID0gX2VsZW1lbnRSZWY7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPdmVybGF5T3JpZ2luLnByb3RvdHlwZSwgXCJlbGVtZW50UmVmXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT3ZlcmxheU9yaWdpbiA9IF9fZGVjb3JhdGUkNShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuRGlyZWN0aXZlKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW292ZXJsYXktb3JpZ2luXScsXG4gICAgICAgICAgICBleHBvcnRBczogJ292ZXJsYXlPcmlnaW4nLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbX2FuZ3VsYXJfY29yZS5FbGVtZW50UmVmXSlcbiAgICBdLCBPdmVybGF5T3JpZ2luKTtcbiAgICByZXR1cm4gT3ZlcmxheU9yaWdpbjtcbn0oKSk7XG4vKipcbiAqIERpcmVjdGl2ZSB0byBmYWNpbGl0YXRlIGRlY2xhcmF0aXZlIGNyZWF0aW9uIG9mIGFuIE92ZXJsYXkgdXNpbmcgYSBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LlxuICovXG52YXIgQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETyhqZWxib3Vybik6IGlucHV0cyBmb3Igc2l6ZSwgc2Nyb2xsIGJlaGF2aW9yLCBhbmltYXRpb24sIGV0Yy5cbiAgICBmdW5jdGlvbiBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlKF9vdmVybGF5LCB0ZW1wbGF0ZVJlZiwgdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICB0aGlzLl9vdmVybGF5ID0gX292ZXJsYXk7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlUG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRlbXBsYXRlUmVmLCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbm5lY3RlZE92ZXJsYXlEaXJlY3RpdmUucHJvdG90eXBlLCBcIm92ZXJsYXlSZWZcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vdmVybGF5UmVmO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKiogVE9ETzogaW50ZXJuYWwgKi9cbiAgICBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIH07XG4gICAgLyoqIFRPRE86IGludGVybmFsICovXG4gICAgQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZS5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lPdmVybGF5KCk7XG4gICAgfTtcbiAgICAvKiogQ3JlYXRlcyBhbiBvdmVybGF5IGFuZCBhdHRhY2hlcyB0aGlzIGRpcmVjdGl2ZSdzIHRlbXBsYXRlIHRvIGl0LiAqL1xuICAgIENvbm5lY3RlZE92ZXJsYXlEaXJlY3RpdmUucHJvdG90eXBlLl9jcmVhdGVPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9zaXRpb25zIHx8ICF0aGlzLnBvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zID0gZGVmYXVsdFBvc2l0aW9uTGlzdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgICAgb3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID1cbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5jb25uZWN0ZWRUbyh0aGlzLm9yaWdpbi5lbGVtZW50UmVmLCB7IG9yaWdpblg6IHRoaXMucG9zaXRpb25zWzBdLm92ZXJsYXlYLCBvcmlnaW5ZOiB0aGlzLnBvc2l0aW9uc1swXS5vcmlnaW5ZIH0sIHsgb3ZlcmxheVg6IHRoaXMucG9zaXRpb25zWzBdLm92ZXJsYXlYLCBvdmVybGF5WTogdGhpcy5wb3NpdGlvbnNbMF0ub3ZlcmxheVkgfSk7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fdGVtcGxhdGVQb3J0YWwpO1xuICAgIH07XG4gICAgLyoqIERlc3Ryb3lzIHRoZSBvdmVybGF5IGNyZWF0ZWQgYnkgdGhpcyBkaXJlY3RpdmUuICovXG4gICAgQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZS5wcm90b3R5cGUuX2Rlc3Ryb3lPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICB9O1xuICAgIF9fZGVjb3JhdGUkNShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNSgnZGVzaWduOnR5cGUnLCBPdmVybGF5T3JpZ2luKVxuICAgIF0sIENvbm5lY3RlZE92ZXJsYXlEaXJlY3RpdmUucHJvdG90eXBlLCBcIm9yaWdpblwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUkNShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNSgnZGVzaWduOnR5cGUnLCBBcnJheSlcbiAgICBdLCBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZSwgXCJwb3NpdGlvbnNcIiwgdm9pZCAwKTtcbiAgICBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlID0gX19kZWNvcmF0ZSQ1KFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5EaXJlY3RpdmUoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbY29ubmVjdGVkLW92ZXJsYXldJ1xuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEkNSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbT3ZlcmxheSwgX2FuZ3VsYXJfY29yZS5UZW1wbGF0ZVJlZiwgX2FuZ3VsYXJfY29yZS5WaWV3Q29udGFpbmVyUmVmXSlcbiAgICBdLCBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlKTtcbiAgICByZXR1cm4gQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZTtcbn0oKSk7XG52YXIgT3ZlcmxheU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheU1vZHVsZSgpIHtcbiAgICB9XG4gICAgT3ZlcmxheU1vZHVsZS5mb3JSb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IE92ZXJsYXlNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IE9WRVJMQVlfUFJPVklERVJTLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgT3ZlcmxheU1vZHVsZSA9IF9fZGVjb3JhdGUkNShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuTmdNb2R1bGUoe1xuICAgICAgICAgICAgaW1wb3J0czogW1BvcnRhbE1vZHVsZV0sXG4gICAgICAgICAgICBleHBvcnRzOiBbQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSwgT3ZlcmxheU9yaWdpbl0sXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlLCBPdmVybGF5T3JpZ2luXSxcbiAgICAgICAgfSksIFxuICAgICAgICBfX21ldGFkYXRhJDUoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgT3ZlcmxheU1vZHVsZSk7XG4gICAgcmV0dXJuIE92ZXJsYXlNb2R1bGU7XG59KCkpO1xuXG52YXIgX19kZWNvcmF0ZSQ5ID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSQ5ID0gKHdpbmRvdyAmJiB3aW5kb3cuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xudmFyIF9fcGFyYW0gPSAod2luZG93ICYmIHdpbmRvdy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xudmFyIExJVkVfQU5OT1VOQ0VSX0VMRU1FTlRfVE9LRU4gPSBuZXcgX2FuZ3VsYXJfY29yZS5PcGFxdWVUb2tlbignbWRMaXZlQW5ub3VuY2VyRWxlbWVudCcpO1xudmFyIE1kTGl2ZUFubm91bmNlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRMaXZlQW5ub3VuY2VyKGVsZW1lbnRUb2tlbikge1xuICAgICAgICAvLyBXZSBpbmplY3QgdGhlIGxpdmUgZWxlbWVudCBhcyBgYW55YCBiZWNhdXNlIHRoZSBjb25zdHJ1Y3RvciBzaWduYXR1cmUgY2Fubm90IHJlZmVyZW5jZVxuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHMgKEhUTUxFbGVtZW50KSBvbiBub24tYnJvd3NlciBlbnZpcm9ubWVudHMsIHNpbmNlIGhhdmluZyBhIGNsYXNzIGRlY29yYXRvclxuICAgICAgICAvLyBjYXVzZXMgVHlwZVNjcmlwdCB0byBwcmVzZXJ2ZSB0aGUgY29uc3RydWN0b3Igc2lnbmF0dXJlIHR5cGVzLlxuICAgICAgICB0aGlzLl9saXZlRWxlbWVudCA9IGVsZW1lbnRUb2tlbiB8fCB0aGlzLl9jcmVhdGVMaXZlRWxlbWVudCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBNZXNzYWdlIHRvIGJlIGFubm91bmNlZCB0byB0aGUgc2NyZWVucmVhZGVyXG4gICAgICogQHBhcmFtIHBvbGl0ZW5lc3MgVGhlIHBvbGl0ZW5lc3Mgb2YgdGhlIGFubm91bmNlciBlbGVtZW50LlxuICAgICAqL1xuICAgIE1kTGl2ZUFubm91bmNlci5wcm90b3R5cGUuYW5ub3VuY2UgPSBmdW5jdGlvbiAobWVzc2FnZSwgcG9saXRlbmVzcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocG9saXRlbmVzcyA9PT0gdm9pZCAwKSB7IHBvbGl0ZW5lc3MgPSAncG9saXRlJzsgfVxuICAgICAgICB0aGlzLl9saXZlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBUT0RPOiBlbnN1cmUgY2hhbmdpbmcgdGhlIHBvbGl0ZW5lc3Mgd29ya3Mgb24gYWxsIGVudmlyb25tZW50cyB3ZSBzdXBwb3J0LlxuICAgICAgICB0aGlzLl9saXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsIHBvbGl0ZW5lc3MpO1xuICAgICAgICAvLyBUaGlzIDEwMG1zIHRpbWVvdXQgaXMgbmVjZXNzYXJ5IGZvciBzb21lIGJyb3dzZXIgKyBzY3JlZW4tcmVhZGVyIGNvbWJpbmF0aW9uczpcbiAgICAgICAgLy8gLSBCb3RoIEpBV1MgYW5kIE5WREEgb3ZlciBJRTExIHdpbGwgbm90IGFubm91bmNlIGFueXRoaW5nIHdpdGhvdXQgYSBub24temVybyB0aW1lb3V0LlxuICAgICAgICAvLyAtIFdpdGggQ2hyb21lIGFuZCBJRTExIHdpdGggTlZEQSBvciBKQVdTLCBhIHJlcGVhdGVkIChpZGVudGljYWwpIG1lc3NhZ2Ugd29uJ3QgYmUgcmVhZCBhXG4gICAgICAgIC8vICAgc2Vjb25kIHRpbWUgd2l0aG91dCBjbGVhcmluZyBhbmQgdGhlbiB1c2luZyBhIG5vbi16ZXJvIGRlbGF5LlxuICAgICAgICAvLyAodXNpbmcgSkFXUyAxNyBhdCB0aW1lIG9mIHRoaXMgd3JpdGluZykuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2xpdmVFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTsgfSwgMTAwKTtcbiAgICB9O1xuICAgIE1kTGl2ZUFubm91bmNlci5wcm90b3R5cGUuX2NyZWF0ZUxpdmVFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGl2ZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpdmVFbC5jbGFzc0xpc3QuYWRkKCdtZC1saXZlLWFubm91bmNlcicpO1xuICAgICAgICBsaXZlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XG4gICAgICAgIGxpdmVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaXZlRWwpO1xuICAgICAgICByZXR1cm4gbGl2ZUVsO1xuICAgIH07XG4gICAgTWRMaXZlQW5ub3VuY2VyID0gX19kZWNvcmF0ZSQ5KFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbmplY3RhYmxlKCksXG4gICAgICAgIF9fcGFyYW0oMCwgX2FuZ3VsYXJfY29yZS5PcHRpb25hbCgpKSxcbiAgICAgICAgX19wYXJhbSgwLCBfYW5ndWxhcl9jb3JlLkluamVjdChMSVZFX0FOTk9VTkNFUl9FTEVNRU5UX1RPS0VOKSksIFxuICAgICAgICBfX21ldGFkYXRhJDkoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW09iamVjdF0pXG4gICAgXSwgTWRMaXZlQW5ub3VuY2VyKTtcbiAgICByZXR1cm4gTWRMaXZlQW5ub3VuY2VyO1xufSgpKTtcblxudmFyIF9fZXh0ZW5kcyQ1ID0gKHdpbmRvdyAmJiB3aW5kb3cuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgX19kZWNvcmF0ZSQxMCA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkMTAgPSAod2luZG93ICYmIHdpbmRvdy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG4vKiBBZGp1c3RzIGNvbmZpZ3VyYXRpb24gb2Ygb3VyIGdlc3R1cmUgbGlicmFyeSwgSGFtbWVyLiAqL1xudmFyIE1kR2VzdHVyZUNvbmZpZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDUoTWRHZXN0dXJlQ29uZmlnLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1kR2VzdHVyZUNvbmZpZygpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIC8qIExpc3Qgb2YgbmV3IGV2ZW50IG5hbWVzIHRvIGFkZCB0byB0aGUgZ2VzdHVyZSBzdXBwb3J0IGxpc3QgKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXG4gICAgICAgICAgICAnZHJhZycsXG4gICAgICAgICAgICAnZHJhZ3N0YXJ0JyxcbiAgICAgICAgICAgICdkcmFnZW5kJyxcbiAgICAgICAgICAgICdkcmFncmlnaHQnLFxuICAgICAgICAgICAgJ2RyYWdsZWZ0JyxcbiAgICAgICAgICAgICdsb25ncHJlc3MnLFxuICAgICAgICAgICAgJ3NsaWRlJyxcbiAgICAgICAgICAgICdzbGlkZXN0YXJ0JyxcbiAgICAgICAgICAgICdzbGlkZWVuZCcsXG4gICAgICAgICAgICAnc2xpZGVyaWdodCcsXG4gICAgICAgICAgICAnc2xpZGVsZWZ0J1xuICAgICAgICBdO1xuICAgIH1cbiAgICAvKlxuICAgICAqIEJ1aWxkcyBIYW1tZXIgaW5zdGFuY2UgbWFudWFsbHkgdG8gYWRkIGN1c3RvbSByZWNvZ25pemVycyB0aGF0IG1hdGNoIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbiAgICAgKlxuICAgICAqIE91ciBnZXN0dXJlIG5hbWVzIGNvbWUgZnJvbSB0aGUgTWF0ZXJpYWwgRGVzaWduIGdlc3R1cmVzIHNwZWM6XG4gICAgICogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9kZXNpZ24vc3BlYy9wYXR0ZXJucy9nZXN0dXJlcy5odG1sI2dlc3R1cmVzLXRvdWNoLW1lY2hhbmljc1xuICAgICAqXG4gICAgICogTW9yZSBpbmZvcm1hdGlvbiBvbiBkZWZhdWx0IHJlY29nbml6ZXJzIGNhbiBiZSBmb3VuZCBpbiBIYW1tZXIgZG9jczpcbiAgICAgKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL3JlY29nbml6ZXItcGFuL1xuICAgICAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vcmVjb2duaXplci1wcmVzcy9cbiAgICAgKlxuICAgICAqIFRPRE86IENvbmZpcm0gdGhyZXNob2xkIG51bWJlcnMgd2l0aCBNYXRlcmlhbCBEZXNpZ24gVVggVGVhbVxuICAgICAqICovXG4gICAgTWRHZXN0dXJlQ29uZmlnLnByb3RvdHlwZS5idWlsZEhhbW1lciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIoZWxlbWVudCk7XG4gICAgICAgIC8vIERlZmF1bHQgSGFtbWVyIFJlY29nbml6ZXJzLlxuICAgICAgICB2YXIgcGFuID0gbmV3IEhhbW1lci5QYW4oKTtcbiAgICAgICAgdmFyIHN3aXBlID0gbmV3IEhhbW1lci5Td2lwZSgpO1xuICAgICAgICB2YXIgcHJlc3MgPSBuZXcgSGFtbWVyLlByZXNzKCk7XG4gICAgICAgIC8vIE5vdGljZSB0aGF0IGEgSGFtbWVySlMgcmVjb2duaXplciBjYW4gb25seSBkZXBlbmQgb24gb25lIG90aGVyIHJlY29nbml6ZXIgb25jZS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBwcmV2aW91cyBgcmVjb2duaXplV2l0aGAgd2lsbCBiZSBkcm9wcGVkLlxuICAgICAgICB2YXIgc2xpZGUgPSB0aGlzLl9jcmVhdGVSZWNvZ25pemVyKHBhbiwgeyBldmVudDogJ3NsaWRlJywgdGhyZXNob2xkOiAwIH0sIHN3aXBlKTtcbiAgICAgICAgdmFyIGRyYWcgPSB0aGlzLl9jcmVhdGVSZWNvZ25pemVyKHNsaWRlLCB7IGV2ZW50OiAnZHJhZycsIHRocmVzaG9sZDogNiB9LCBzd2lwZSk7XG4gICAgICAgIHZhciBsb25ncHJlc3MgPSB0aGlzLl9jcmVhdGVSZWNvZ25pemVyKHByZXNzLCB7IGV2ZW50OiAnbG9uZ3ByZXNzJywgdGltZTogNTAwIH0pO1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGRlZmF1bHQgYHBhbmAgZXZlbnQgdG8gdXNlIHRoZSBzd2lwZSBldmVudC5cbiAgICAgICAgcGFuLnJlY29nbml6ZVdpdGgoc3dpcGUpO1xuICAgICAgICAvLyBBZGQgY3VzdG9taXplZCBnZXN0dXJlcyB0byBIYW1tZXIgbWFuYWdlclxuICAgICAgICBtYy5hZGQoW3N3aXBlLCBwcmVzcywgcGFuLCBkcmFnLCBzbGlkZSwgbG9uZ3ByZXNzXSk7XG4gICAgICAgIHJldHVybiBtYztcbiAgICB9O1xuICAgIC8qKiBDcmVhdGVzIGEgbmV3IHJlY29nbml6ZXIsIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBkZWZhdWx0IHJlY29nbml6ZXJzIG9mIEhhbW1lckpTICovXG4gICAgTWRHZXN0dXJlQ29uZmlnLnByb3RvdHlwZS5fY3JlYXRlUmVjb2duaXplciA9IGZ1bmN0aW9uIChiYXNlLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBpbmhlcml0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGluaGVyaXRhbmNlc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjb2duaXplciA9IG5ldyBiYXNlLmNvbnN0cnVjdG9yKG9wdGlvbnMpO1xuICAgICAgICBpbmhlcml0YW5jZXMucHVzaChiYXNlKTtcbiAgICAgICAgaW5oZXJpdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtKTsgfSk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH07XG4gICAgTWRHZXN0dXJlQ29uZmlnID0gX19kZWNvcmF0ZSQxMChbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5qZWN0YWJsZSgpLCBcbiAgICAgICAgX19tZXRhZGF0YSQxMCgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZEdlc3R1cmVDb25maWcpO1xuICAgIHJldHVybiBNZEdlc3R1cmVDb25maWc7XG59KF9hbmd1bGFyX3BsYXRmb3JtQnJvd3Nlci5IYW1tZXJHZXN0dXJlQ29uZmlnKSk7XG5cbnZhciBfX2RlY29yYXRlJDExID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSQxMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKlxuICogQ2xhc3MgdG8gY29vcmRpbmF0ZSB1bmlxdWUgc2VsZWN0aW9uIGJhc2VkIG9uIG5hbWUuXG4gKiBJbnRlbmRlZCB0byBiZSBjb25zdW1lZCBhcyBhbiBBbmd1bGFyIHNlcnZpY2UuXG4gKiBUaGlzIHNlcnZpY2UgaXMgbmVlZGVkIGJlY2F1c2UgbmF0aXZlIHJhZGlvIGNoYW5nZSBldmVudHMgYXJlIG9ubHkgZmlyZWQgb24gdGhlIGl0ZW0gY3VycmVudGx5XG4gKiBiZWluZyBzZWxlY3RlZCwgYW5kIHdlIHN0aWxsIG5lZWQgdG8gdW5jaGVjayB0aGUgcHJldmlvdXMgc2VsZWN0aW9uLlxuICpcbiAqIFRoaXMgc2VydmljZSBkb2VzIG5vdCAqc3RvcmUqIGFueSBJRHMgYW5kIG5hbWVzIGJlY2F1c2UgdGhleSBtYXkgY2hhbmdlIGF0IGFueSB0aW1lLCBzbyBpdCBpc1xuICogbGVzcyBlcnJvci1wcm9uZSBpZiB0aGV5IGFyZSBzaW1wbHkgcGFzc2VkIHRocm91Z2ggd2hlbiB0aGUgZXZlbnRzIG9jY3VyLlxuICovXG52YXIgTWRVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIoKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICAvKiogTm90aWZ5IG90aGVyIGl0ZW1zIHRoYXQgc2VsZWN0aW9uIGZvciB0aGUgZ2l2ZW4gbmFtZSBoYXMgYmVlbiBzZXQuICovXG4gICAgTWRVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiAoaWQsIG5hbWUpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2xpc3RlbmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IF9hW19pXTtcbiAgICAgICAgICAgIGxpc3RlbmVyKGlkLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIExpc3RlbiBmb3IgZnV0dXJlIGNoYW5nZXMgdG8gaXRlbSBzZWxlY3Rpb24uICovXG4gICAgTWRVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyLnByb3RvdHlwZS5saXN0ZW4gPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH07XG4gICAgTWRVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyID0gX19kZWNvcmF0ZSQxMShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5qZWN0YWJsZSgpLCBcbiAgICAgICAgX19tZXRhZGF0YSQxMSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIpO1xuICAgIHJldHVybiBNZFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXI7XG59KCkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBDU1MgdHJhbnNmb3JtIHRvIGFuIGVsZW1lbnQsIGluY2x1ZGluZyBicm93c2VyLXByZWZpeGVkIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHBhcmFtIHRyYW5zZm9ybVZhbHVlXG4gKi9cbmZ1bmN0aW9uIGFwcGx5Q3NzVHJhbnNmb3JtJDEoZWxlbWVudCwgdHJhbnNmb3JtVmFsdWUpIHtcbiAgICAvLyBJdCdzIGltcG9ydGFudCB0byB0cmltIHRoZSByZXN1bHQsIGJlY2F1c2UgdGhlIGJyb3dzZXIgd2lsbCBpZ25vcmUgdGhlIHNldCBvcGVyYXRpb25cbiAgICAvLyBpZiB0aGUgc3RyaW5nIGNvbnRhaW5zIG9ubHkgd2hpdGVzcGFjZS5cbiAgICB2YXIgdmFsdWUgPSB0cmFuc2Zvcm1WYWx1ZS50cmltKCk7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB2YWx1ZTtcbiAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIEFubm90YXRpb24gRmFjdG9yeSB0aGF0IGFsbG93cyBIVE1MIHN0eWxlIGJvb2xlYW4gYXR0cmlidXRlcy4gRm9yIGV4YW1wbGUsXG4gKiBhIGZpZWxkIGRlY2xhcmVkIGxpa2UgdGhpczpcblxuICogQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY29tcG9uZW50JyB9KSBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIEBJbnB1dCgpIEBCb29sZWFuRmllbGRWYWx1ZUZhY3RvcnkoKSBteUZpZWxkOiBib29sZWFuO1xuICogfVxuICpcbiAqIFlvdSBjb3VsZCBzZXQgaXQgdXAgdGhpcyB3YXk6XG4gKiAgIDxjb21wb25lbnQgbXlGaWVsZD5cbiAqIG9yOlxuICogICA8Y29tcG9uZW50IG15RmllbGQ9XCJcIj5cbiAqIEBkZXByZWNhdGVkXG4gKi9cbmZ1bmN0aW9uIGJvb2xlYW5GaWVsZFZhbHVlRmFjdG9yeSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm9vbGVhbkZpZWxkVmFsdWVNZXRhZGF0YSh0YXJnZXQsIGtleSkge1xuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgICAgIHZhciBsb2NhbEtleSA9IFwiX19tZF9wcml2YXRlX3N5bWJvbF9cIiArIGtleTtcbiAgICAgICAgdGFyZ2V0W2xvY2FsS2V5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXNbbG9jYWxLZXldOyB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2xvY2FsS2V5XSA9IHZhbHVlICE9IG51bGwgJiYgXCJcIiArIHZhbHVlICE9PSAnZmFsc2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG4vLyBEdWUgdG8gYSBidWcgaW4gdGhlIENocm9tZURyaXZlciwgQW5ndWxhciAyIGtleWJvYXJkIGV2ZW50cyBhcmUgbm90IHRyaWdnZXJlZCBieSBgc2VuZEtleXNgXG4vLyBkdXJpbmcgRTJFIHRlc3RzIHdoZW4gdXNpbmcgZG90IG5vdGF0aW9uIHN1Y2ggYXMgYChrZXlkb3duLnJpZ2h0QXJyb3cpYC4gVG8gZ2V0IGFyb3VuZCB0aGlzLFxuLy8gd2UgYXJlIHRlbXBvcmFyaWx5IHVzaW5nIGEgc2luZ2xlIChrZXlkb3duKSBoYW5kbGVyLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85NDE5XG52YXIgVVBfQVJST1cgPSAzODtcbnZhciBET1dOX0FSUk9XID0gNDA7XG52YXIgUklHSFRfQVJST1cgPSAzOTtcbnZhciBMRUZUX0FSUk9XID0gMzc7XG52YXIgRU5URVIgPSAxMztcbnZhciBUQUIgPSA5O1xuXG52YXIgX19kZWNvcmF0ZSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAod2luZG93ICYmIHdpbmRvdy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG52YXIgTWRDb3JlTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZENvcmVNb2R1bGUoKSB7XG4gICAgfVxuICAgIE1kQ29yZU1vZHVsZS5mb3JSb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IE1kQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW01kTGl2ZUFubm91bmNlcl1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1kQ29yZU1vZHVsZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLk5nTW9kdWxlKHtcbiAgICAgICAgICAgIGltcG9ydHM6IFtNZExpbmVNb2R1bGUsIFJ0bE1vZHVsZSwgTWRSaXBwbGVNb2R1bGUsIFBvcnRhbE1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gICAgICAgICAgICBleHBvcnRzOiBbTWRMaW5lTW9kdWxlLCBSdGxNb2R1bGUsIE1kUmlwcGxlTW9kdWxlLCBQb3J0YWxNb2R1bGUsIE92ZXJsYXlNb2R1bGVdLFxuICAgICAgICB9KSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXG4gICAgXSwgTWRDb3JlTW9kdWxlKTtcbiAgICByZXR1cm4gTWRDb3JlTW9kdWxlO1xufSgpKTtcblxuZXhwb3J0cy5NZENvcmVNb2R1bGUgPSBNZENvcmVNb2R1bGU7XG5leHBvcnRzLkRpciA9IERpcjtcbmV4cG9ydHMuUnRsTW9kdWxlID0gUnRsTW9kdWxlO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLkJhc2VQb3J0YWxIb3N0ID0gQmFzZVBvcnRhbEhvc3Q7XG5leHBvcnRzLkNvbXBvbmVudFBvcnRhbCA9IENvbXBvbmVudFBvcnRhbDtcbmV4cG9ydHMuVGVtcGxhdGVQb3J0YWwgPSBUZW1wbGF0ZVBvcnRhbDtcbmV4cG9ydHMuUG9ydGFsSG9zdERpcmVjdGl2ZSA9IFBvcnRhbEhvc3REaXJlY3RpdmU7XG5leHBvcnRzLlRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlID0gVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmU7XG5leHBvcnRzLlBvcnRhbE1vZHVsZSA9IFBvcnRhbE1vZHVsZTtcbmV4cG9ydHMuRG9tUG9ydGFsSG9zdCA9IERvbVBvcnRhbEhvc3Q7XG5leHBvcnRzLk92ZXJsYXkgPSBPdmVybGF5O1xuZXhwb3J0cy5PVkVSTEFZX1BST1ZJREVSUyA9IE9WRVJMQVlfUFJPVklERVJTO1xuZXhwb3J0cy5PdmVybGF5Q29udGFpbmVyID0gT3ZlcmxheUNvbnRhaW5lcjtcbmV4cG9ydHMuT3ZlcmxheVJlZiA9IE92ZXJsYXlSZWY7XG5leHBvcnRzLk92ZXJsYXlTdGF0ZSA9IE92ZXJsYXlTdGF0ZTtcbmV4cG9ydHMuQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSA9IENvbm5lY3RlZE92ZXJsYXlEaXJlY3RpdmU7XG5leHBvcnRzLk92ZXJsYXlPcmlnaW4gPSBPdmVybGF5T3JpZ2luO1xuZXhwb3J0cy5PdmVybGF5TW9kdWxlID0gT3ZlcmxheU1vZHVsZTtcbmV4cG9ydHMuTWRHZXN0dXJlQ29uZmlnID0gTWRHZXN0dXJlQ29uZmlnO1xuZXhwb3J0cy5NZFJpcHBsZSA9IE1kUmlwcGxlO1xuZXhwb3J0cy5NZFJpcHBsZU1vZHVsZSA9IE1kUmlwcGxlTW9kdWxlO1xuZXhwb3J0cy5NZExpdmVBbm5vdW5jZXIgPSBNZExpdmVBbm5vdW5jZXI7XG5leHBvcnRzLkxJVkVfQU5OT1VOQ0VSX0VMRU1FTlRfVE9LRU4gPSBMSVZFX0FOTk9VTkNFUl9FTEVNRU5UX1RPS0VOO1xuZXhwb3J0cy5NZFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIgPSBNZFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXI7XG5leHBvcnRzLk1kTGluZU1vZHVsZSA9IE1kTGluZU1vZHVsZTtcbmV4cG9ydHMuTWRMaW5lID0gTWRMaW5lO1xuZXhwb3J0cy5NZExpbmVTZXR0ZXIgPSBNZExpbmVTZXR0ZXI7XG5leHBvcnRzLmFwcGx5Q3NzVHJhbnNmb3JtID0gYXBwbHlDc3NUcmFuc2Zvcm0kMTtcbmV4cG9ydHMuTWRFcnJvciA9IE1kRXJyb3I7XG5leHBvcnRzLkJvb2xlYW5GaWVsZFZhbHVlID0gYm9vbGVhbkZpZWxkVmFsdWVGYWN0b3J5O1xuZXhwb3J0cy5Db25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5ID0gQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbmV4cG9ydHMuQ29ubmVjdGlvblBvc2l0aW9uUGFpciA9IENvbm5lY3Rpb25Qb3NpdGlvblBhaXI7XG5leHBvcnRzLlVQX0FSUk9XID0gVVBfQVJST1c7XG5leHBvcnRzLkRPV05fQVJST1cgPSBET1dOX0FSUk9XO1xuZXhwb3J0cy5SSUdIVF9BUlJPVyA9IFJJR0hUX0FSUk9XO1xuZXhwb3J0cy5MRUZUX0FSUk9XID0gTEVGVF9BUlJPVztcbmV4cG9ydHMuRU5URVIgPSBFTlRFUjtcbmV4cG9ydHMuVEFCID0gVEFCO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9AYW5ndWxhcjItbWF0ZXJpYWwvY29yZS9jb3JlLnVtZC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygzKSkoNyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYnVuZGxlcy9wbGF0Zm9ybS1icm93c2VyLnVtZC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnQGFuZ3VsYXIvY29yZScpLCByZXF1aXJlKCdAYW5ndWxhci9odHRwJyksIHJlcXVpcmUoJ0Bhbmd1bGFyMi1tYXRlcmlhbC9jb3JlJyksIHJlcXVpcmUoJ3J4anMvT2JzZXJ2YWJsZScpLCByZXF1aXJlKCdyeGpzL2FkZC9vYnNlcnZhYmxlL2ZvcmtKb2luJyksIHJlcXVpcmUoJ3J4anMvYWRkL29ic2VydmFibGUvb2YnKSwgcmVxdWlyZSgncnhqcy9hZGQvb3BlcmF0b3IvbWFwJyksIHJlcXVpcmUoJ3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlcicpLCByZXF1aXJlKCdyeGpzL2FkZC9vcGVyYXRvci9kbycpLCByZXF1aXJlKCdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZScpLCByZXF1aXJlKCdyeGpzL2FkZC9vcGVyYXRvci9maW5hbGx5JyksIHJlcXVpcmUoJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJykpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ0Bhbmd1bGFyL2NvcmUnLCAnQGFuZ3VsYXIvaHR0cCcsICdAYW5ndWxhcjItbWF0ZXJpYWwvY29yZScsICdyeGpzL09ic2VydmFibGUnLCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mb3JrSm9pbicsICdyeGpzL2FkZC9vYnNlcnZhYmxlL29mJywgJ3J4anMvYWRkL29wZXJhdG9yL21hcCcsICdyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXInLCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nLCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnLCAncnhqcy9hZGQvb3BlcmF0b3IvZmluYWxseScsICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCddLCBmYWN0b3J5KSA6XG4gICAgKGZhY3RvcnkoKGdsb2JhbC5tZCA9IGdsb2JhbC5tZCB8fCB7fSwgZ2xvYmFsLm1kLmljb24gPSBnbG9iYWwubWQuaWNvbiB8fCB7fSksZ2xvYmFsLm5nLmNvcmUsZ2xvYmFsLm5nLmh0dHAsZ2xvYmFsLm1kLmNvcmUsZ2xvYmFsLlJ4LGdsb2JhbC5SeC5PYnNlcnZhYmxlLGdsb2JhbC5SeC5PYnNlcnZhYmxlLGdsb2JhbC5SeC5PYnNlcnZhYmxlLnByb3RvdHlwZSxnbG9iYWwuUnguT2JzZXJ2YWJsZS5wcm90b3R5cGUsZ2xvYmFsLlJ4Lk9ic2VydmFibGUucHJvdG90eXBlLGdsb2JhbC5SeC5PYnNlcnZhYmxlLnByb3RvdHlwZSxnbG9iYWwuUnguT2JzZXJ2YWJsZS5wcm90b3R5cGUsZ2xvYmFsLlJ4Lk9ic2VydmFibGUucHJvdG90eXBlKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyxfYW5ndWxhcl9jb3JlLF9hbmd1bGFyX2h0dHAsX2FuZ3VsYXIyTWF0ZXJpYWxfY29yZSxyeGpzX09ic2VydmFibGUscnhqc19hZGRfb2JzZXJ2YWJsZV9mb3JrSm9pbixyeGpzX2FkZF9vYnNlcnZhYmxlX29mLHJ4anNfYWRkX29wZXJhdG9yX21hcCxyeGpzX2FkZF9vcGVyYXRvcl9maWx0ZXIscnhqc19hZGRfb3BlcmF0b3JfZG8scnhqc19hZGRfb3BlcmF0b3Jfc2hhcmUscnhqc19hZGRfb3BlcmF0b3JfZmluYWxseSxyeGpzX2FkZF9vcGVyYXRvcl9jYXRjaCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX2V4dGVuZHMkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIF9fZGVjb3JhdGUkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEkMSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKiBFeGNlcHRpb24gdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBsb2FkIGFuIGljb24gd2l0aCBhIG5hbWUgdGhhdCBjYW5ub3QgYmUgZm91bmQuICovXG52YXIgTWRJY29uTmFtZU5vdEZvdW5kRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQxKE1kSWNvbk5hbWVOb3RGb3VuZEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1kSWNvbk5hbWVOb3RGb3VuZEVycm9yKGljb25OYW1lKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIFwiVW5hYmxlIHRvIGZpbmQgaWNvbiB3aXRoIHRoZSBuYW1lIFxcXCJcIiArIGljb25OYW1lICsgXCJcXFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gTWRJY29uTmFtZU5vdEZvdW5kRXJyb3I7XG59KF9hbmd1bGFyMk1hdGVyaWFsX2NvcmUuTWRFcnJvcikpO1xuLyoqXG4gKiBFeGNlcHRpb24gdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBsb2FkIFNWRyBjb250ZW50IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgZXhwZWN0ZWRcbiAqIDxzdmc+IHRhZy5cbiAqL1xudmFyIE1kSWNvblN2Z1RhZ05vdEZvdW5kRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQxKE1kSWNvblN2Z1RhZ05vdEZvdW5kRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWRJY29uU3ZnVGFnTm90Rm91bmRFcnJvcigpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJzxzdmc+IHRhZyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIE1kSWNvblN2Z1RhZ05vdEZvdW5kRXJyb3I7XG59KF9hbmd1bGFyMk1hdGVyaWFsX2NvcmUuTWRFcnJvcikpO1xuLyoqIENvbmZpZ3VyYXRpb24gZm9yIGFuIGljb24sIGluY2x1ZGluZyB0aGUgVVJMIGFuZCBwb3NzaWJseSB0aGUgY2FjaGVkIFNWRyBlbGVtZW50LiAqL1xudmFyIFN2Z0ljb25Db25maWcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN2Z0ljb25Db25maWcodXJsKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLnN2Z0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gU3ZnSWNvbkNvbmZpZztcbn0oKSk7XG4vKiogUmV0dXJucyB0aGUgY2FjaGUga2V5IHRvIHVzZSBmb3IgYW4gaWNvbiBuYW1lc3BhY2UgYW5kIG5hbWUuICovXG52YXIgaWNvbktleSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG5hbWUpIHsgcmV0dXJuIG5hbWVzcGFjZSArICc6JyArIG5hbWU7IH07XG4vKipcbiAqIFNlcnZpY2UgdG8gcmVnaXN0ZXIgYW5kIGRpc3BsYXkgaWNvbnMgdXNlZCBieSB0aGUgPG1kLWljb24+IGNvbXBvbmVudC5cbiAqIC0gUmVnaXN0ZXJzIGljb24gVVJMcyBieSBuYW1lc3BhY2UgYW5kIG5hbWUuXG4gKiAtIFJlZ2lzdGVycyBpY29uIHNldCBVUkxzIGJ5IG5hbWVzcGFjZS5cbiAqIC0gUmVnaXN0ZXJzIGFsaWFzZXMgZm9yIENTUyBjbGFzc2VzLCBmb3IgdXNlIHdpdGggaWNvbiBmb250cy5cbiAqIC0gTG9hZHMgaWNvbnMgZnJvbSBVUkxzIGFuZCBleHRyYWN0cyBpbmRpdmlkdWFsIGljb25zIGZyb20gaWNvbiBzZXRzLlxuICovXG52YXIgTWRJY29uUmVnaXN0cnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kSWNvblJlZ2lzdHJ5KF9odHRwKSB7XG4gICAgICAgIHRoaXMuX2h0dHAgPSBfaHR0cDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVSTHMgYW5kIGNhY2hlZCBTVkcgZWxlbWVudHMgZm9yIGluZGl2aWR1YWwgaWNvbnMuIEtleXMgYXJlIG9mIHRoZSBmb3JtYXQgXCJbbmFtZXNwYWNlXTpbaWNvbl1cIi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3N2Z0ljb25Db25maWdzID0gbmV3IE1hcCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3ZnSWNvbkNvbmZpZyBvYmplY3RzIGFuZCBjYWNoZWQgU1ZHIGVsZW1lbnRzIGZvciBpY29uIHNldHMsIGtleWVkIGJ5IG5hbWVzcGFjZS5cbiAgICAgICAgICogTXVsdGlwbGUgaWNvbiBzZXRzIGNhbiBiZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzYW1lIG5hbWVzcGFjZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2ljb25TZXRDb25maWdzID0gbmV3IE1hcCgpO1xuICAgICAgICAvKiogQ2FjaGUgZm9yIGljb25zIGxvYWRlZCBieSBkaXJlY3QgVVJMcy4gKi9cbiAgICAgICAgdGhpcy5fY2FjaGVkSWNvbnNCeVVybCA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqIEluLXByb2dyZXNzIGljb24gZmV0Y2hlcy4gVXNlZCB0byBjb2FsZXNjZSBtdWx0aXBsZSByZXF1ZXN0cyB0byB0aGUgc2FtZSBVUkwuICovXG4gICAgICAgIHRoaXMuX2luUHJvZ3Jlc3NVcmxGZXRjaGVzID0gbmV3IE1hcCgpO1xuICAgICAgICAvKiogTWFwIGZyb20gZm9udCBpZGVudGlmaWVycyB0byB0aGVpciBDU1MgY2xhc3MgbmFtZXMuIFVzZWQgZm9yIGljb24gZm9udHMuICovXG4gICAgICAgIHRoaXMuX2ZvbnRDc3NDbGFzc2VzQnlBbGlhcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBDU1MgY2xhc3MgdG8gYXBwbHkgd2hlbiBhbiA8bWQtaWNvbj4gY29tcG9uZW50IGhhcyBubyBpY29uIG5hbWUsIHVybCwgb3IgZm9udCBzcGVjaWZpZWQuXG4gICAgICAgICAqIFRoZSBkZWZhdWx0ICdtYXRlcmlhbC1pY29ucycgdmFsdWUgYXNzdW1lcyB0aGF0IHRoZSBtYXRlcmlhbCBpY29uIGZvbnQgaGFzIGJlZW4gbG9hZGVkIGFzXG4gICAgICAgICAqIGRlc2NyaWJlZCBhdCBodHRwOi8vZ29vZ2xlLmdpdGh1Yi5pby9tYXRlcmlhbC1kZXNpZ24taWNvbnMvI2ljb24tZm9udC1mb3ItdGhlLXdlYlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZGVmYXVsdEZvbnRTZXRDbGFzcyA9ICdtYXRlcmlhbC1pY29ucyc7XG4gICAgfVxuICAgIC8qKiBSZWdpc3RlcnMgYW4gaWNvbiBieSBVUkwgaW4gdGhlIGRlZmF1bHQgbmFtZXNwYWNlLiAqL1xuICAgIE1kSWNvblJlZ2lzdHJ5LnByb3RvdHlwZS5hZGRTdmdJY29uID0gZnVuY3Rpb24gKGljb25OYW1lLCB1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCcnLCBpY29uTmFtZSwgdXJsKTtcbiAgICB9O1xuICAgIC8qKiBSZWdpc3RlcnMgYW4gaWNvbiBieSBVUkwgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLmFkZFN2Z0ljb25Jbk5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGljb25OYW1lLCB1cmwpIHtcbiAgICAgICAgdmFyIGtleSA9IGljb25LZXkobmFtZXNwYWNlLCBpY29uTmFtZSk7XG4gICAgICAgIHRoaXMuX3N2Z0ljb25Db25maWdzLnNldChrZXksIG5ldyBTdmdJY29uQ29uZmlnKHVybCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZWdpc3RlcnMgYW4gaWNvbiBzZXQgYnkgVVJMIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS4gKi9cbiAgICBNZEljb25SZWdpc3RyeS5wcm90b3R5cGUuYWRkU3ZnSWNvblNldCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ZnSWNvblNldEluTmFtZXNwYWNlKCcnLCB1cmwpO1xuICAgIH07XG4gICAgLyoqIFJlZ2lzdGVycyBhbiBpY29uIHNldCBieSBVUkwgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLmFkZFN2Z0ljb25TZXRJbk5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIHVybCkge1xuICAgICAgICB2YXIgY29uZmlnID0gbmV3IFN2Z0ljb25Db25maWcodXJsKTtcbiAgICAgICAgaWYgKHRoaXMuX2ljb25TZXRDb25maWdzLmhhcyhuYW1lc3BhY2UpKSB7XG4gICAgICAgICAgICB0aGlzLl9pY29uU2V0Q29uZmlncy5nZXQobmFtZXNwYWNlKS5wdXNoKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pY29uU2V0Q29uZmlncy5zZXQobmFtZXNwYWNlLCBbY29uZmlnXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGFsaWFzIGZvciBhIENTUyBjbGFzcyBuYW1lIHRvIGJlIHVzZWQgZm9yIGljb24gZm9udHMuIENyZWF0aW5nIGFuIG1kSWNvblxuICAgICAqIGNvbXBvbmVudCB3aXRoIHRoZSBhbGlhcyBhcyB0aGUgZm9udFNldCBpbnB1dCB3aWxsIGNhdXNlIHRoZSBjbGFzcyBuYW1lIHRvIGJlIGFwcGxpZWRcbiAgICAgKiB0byB0aGUgPG1kLWljb24+IGVsZW1lbnQuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLnJlZ2lzdGVyRm9udENsYXNzQWxpYXMgPSBmdW5jdGlvbiAoYWxpYXMsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB2b2lkIDApIHsgY2xhc3NOYW1lID0gYWxpYXM7IH1cbiAgICAgICAgdGhpcy5fZm9udENzc0NsYXNzZXNCeUFsaWFzLnNldChhbGlhcywgY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBDU1MgY2xhc3MgbmFtZSBhc3NvY2lhdGVkIHdpdGggdGhlIGFsaWFzIGJ5IGEgcHJldmlvdXMgY2FsbCB0b1xuICAgICAqIHJlZ2lzdGVyRm9udENsYXNzQWxpYXMuIElmIG5vIENTUyBjbGFzcyBoYXMgYmVlbiBhc3NvY2lhdGVkLCByZXR1cm5zIHRoZSBhbGlhcyB1bm1vZGlmaWVkLlxuICAgICAqL1xuICAgIE1kSWNvblJlZ2lzdHJ5LnByb3RvdHlwZS5jbGFzc05hbWVGb3JGb250QWxpYXMgPSBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbnRDc3NDbGFzc2VzQnlBbGlhcy5nZXQoYWxpYXMpIHx8IGFsaWFzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgQ1NTIGNsYXNzIG5hbWUgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cyB3aGVuIGFuIDxtZC1pY29uPiBjb21wb25lbnQgZG9lcyBub3RcbiAgICAgKiBoYXZlIGEgZm9udFNldCBpbnB1dCB2YWx1ZSwgYW5kIGlzIG5vdCBsb2FkaW5nIGFuIGljb24gYnkgbmFtZSBvciBVUkwuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLnNldERlZmF1bHRGb250U2V0Q2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRGb250U2V0Q2xhc3MgPSBjbGFzc05hbWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgQ1NTIGNsYXNzIG5hbWUgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cyB3aGVuIGFuIDxtZC1pY29uPiBjb21wb25lbnQgZG9lcyBub3RcbiAgICAgKiBoYXZlIGEgZm9udFNldCBpbnB1dCB2YWx1ZSwgYW5kIGlzIG5vdCBsb2FkaW5nIGFuIGljb24gYnkgbmFtZSBvciBVUkwuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLmdldERlZmF1bHRGb250U2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Rm9udFNldENsYXNzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcHJvZHVjZXMgdGhlIGljb24gKGFzIGFuIDxzdmc+IERPTSBlbGVtZW50KSBmcm9tIHRoZSBnaXZlbiBVUkwuXG4gICAgICogVGhlIHJlc3BvbnNlIGZyb20gdGhlIFVSTCBtYXkgYmUgY2FjaGVkIHNvIHRoaXMgd2lsbCBub3QgYWx3YXlzIGNhdXNlIGFuIEhUVFAgcmVxdWVzdCwgYnV0XG4gICAgICogdGhlIHByb2R1Y2VkIGVsZW1lbnQgd2lsbCBhbHdheXMgYmUgYSBuZXcgY29weSBvZiB0aGUgb3JpZ2luYWxseSBmZXRjaGVkIGljb24uIChUaGF0IGlzLFxuICAgICAqIGl0IHdpbGwgbm90IGNvbnRhaW4gYW55IG1vZGlmaWNhdGlvbnMgbWFkZSB0byBlbGVtZW50cyBwcmV2aW91c2x5IHJldHVybmVkKS5cbiAgICAgKi9cbiAgICBNZEljb25SZWdpc3RyeS5wcm90b3R5cGUuZ2V0U3ZnSWNvbkZyb21VcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZWRJY29uc0J5VXJsLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gcnhqc19PYnNlcnZhYmxlLk9ic2VydmFibGUub2YoY2xvbmVTdmcodGhpcy5fY2FjaGVkSWNvbnNCeVVybC5nZXQodXJsKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkU3ZnSWNvbkZyb21Db25maWcobmV3IFN2Z0ljb25Db25maWcodXJsKSlcbiAgICAgICAgICAgIC5kbyhmdW5jdGlvbiAoc3ZnKSB7IHJldHVybiBfdGhpcy5fY2FjaGVkSWNvbnNCeVVybC5zZXQodXJsLCBzdmcpOyB9KVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoc3ZnKSB7IHJldHVybiBjbG9uZVN2ZyhzdmcpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IHByb2R1Y2VzIHRoZSBpY29uIChhcyBhbiA8c3ZnPiBET00gZWxlbWVudCkgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuICAgICAqIGFuZCBuYW1lc3BhY2UuIFRoZSBpY29uIG11c3QgaGF2ZSBiZWVuIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIGFkZEljb24gb3IgYWRkSWNvblNldDtcbiAgICAgKiBpZiBub3QsIHRoZSBPYnNlcnZhYmxlIHdpbGwgdGhyb3cgYW4gTWRJY29uTmFtZU5vdEZvdW5kRXJyb3IuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLmdldE5hbWVkU3ZnSWNvbiA9IGZ1bmN0aW9uIChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgaWYgKG5hbWVzcGFjZSA9PT0gdm9pZCAwKSB7IG5hbWVzcGFjZSA9ICcnOyB9XG4gICAgICAgIC8vIFJldHVybiAoY29weSBvZikgY2FjaGVkIGljb24gaWYgcG9zc2libGUuXG4gICAgICAgIHZhciBrZXkgPSBpY29uS2V5KG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICAgIGlmICh0aGlzLl9zdmdJY29uQ29uZmlncy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN2Z0Zyb21Db25maWcodGhpcy5fc3ZnSWNvbkNvbmZpZ3MuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBoYXZlIGFueSBpY29uIHNldHMgcmVnaXN0ZXJlZCBmb3IgdGhlIG5hbWVzcGFjZS5cbiAgICAgICAgdmFyIGljb25TZXRDb25maWdzID0gdGhpcy5faWNvblNldENvbmZpZ3MuZ2V0KG5hbWVzcGFjZSk7XG4gICAgICAgIGlmIChpY29uU2V0Q29uZmlncykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN2Z0Zyb21JY29uU2V0Q29uZmlncyhuYW1lLCBpY29uU2V0Q29uZmlncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ4anNfT2JzZXJ2YWJsZS5PYnNlcnZhYmxlLnRocm93KG5ldyBNZEljb25OYW1lTm90Rm91bmRFcnJvcihrZXkpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhY2hlZCBpY29uIGZvciBhIFN2Z0ljb25Db25maWcgaWYgYXZhaWxhYmxlLCBvciBmZXRjaGVzIGl0IGZyb20gaXRzIFVSTCBpZiBub3QuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLl9nZXRTdmdGcm9tQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLnN2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFdlIGFscmVhZHkgaGF2ZSB0aGUgU1ZHIGVsZW1lbnQgZm9yIHRoaXMgaWNvbiwgcmV0dXJuIGEgY29weS5cbiAgICAgICAgICAgIHJldHVybiByeGpzX09ic2VydmFibGUuT2JzZXJ2YWJsZS5vZihjbG9uZVN2Zyhjb25maWcuc3ZnRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIGljb24gZnJvbSB0aGUgY29uZmlnJ3MgVVJMLCBjYWNoZSBpdCwgYW5kIHJldHVybiBhIGNvcHkuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFN2Z0ljb25Gcm9tQ29uZmlnKGNvbmZpZylcbiAgICAgICAgICAgICAgICAuZG8oZnVuY3Rpb24gKHN2ZykgeyByZXR1cm4gY29uZmlnLnN2Z0VsZW1lbnQgPSBzdmc7IH0pXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoc3ZnKSB7IHJldHVybiBjbG9uZVN2ZyhzdmcpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZmluZCBhbiBpY29uIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGluIGFueSBvZiB0aGUgU1ZHIGljb24gc2V0cy5cbiAgICAgKiBGaXJzdCBzZWFyY2hlcyB0aGUgYXZhaWxhYmxlIGNhY2hlZCBpY29ucyBmb3IgYSBuZXN0ZWQgZWxlbWVudCB3aXRoIGEgbWF0Y2hpbmcgbmFtZSwgYW5kXG4gICAgICogaWYgZm91bmQgY29waWVzIHRoZSBlbGVtZW50IHRvIGEgbmV3IDxzdmc+IGVsZW1lbnQuIElmIG5vdCBmb3VuZCwgZmV0Y2hlcyBhbGwgaWNvbiBzZXRzXG4gICAgICogdGhhdCBoYXZlIG5vdCBiZWVuIGNhY2hlZCwgYW5kIHNlYXJjaGVzIGFnYWluIGFmdGVyIGFsbCBmZXRjaGVzIGFyZSBjb21wbGV0ZWQuXG4gICAgICogVGhlIHJldHVybmVkIE9ic2VydmFibGUgcHJvZHVjZXMgdGhlIFNWRyBlbGVtZW50IGlmIHBvc3NpYmxlLCBhbmQgdGhyb3dzXG4gICAgICogTWRJY29uTmFtZU5vdEZvdW5kRXJyb3IgaWYgbm8gaWNvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBjYW4gYmUgZm91bmQuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLl9nZXRTdmdGcm9tSWNvblNldENvbmZpZ3MgPSBmdW5jdGlvbiAobmFtZSwgaWNvblNldENvbmZpZ3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gRm9yIGFsbCB0aGUgaWNvbiBzZXQgU1ZHIGVsZW1lbnRzIHdlJ3ZlIGZldGNoZWQsIHNlZSBpZiBhbnkgY29udGFpbiBhbiBpY29uIHdpdGggdGhlXG4gICAgICAgIC8vIHJlcXVlc3RlZCBuYW1lLlxuICAgICAgICB2YXIgbmFtZWRJY29uID0gdGhpcy5fZXh0cmFjdEljb25XaXRoTmFtZUZyb21BbnlTZXQobmFtZSwgaWNvblNldENvbmZpZ3MpO1xuICAgICAgICBpZiAobmFtZWRJY29uKSB7XG4gICAgICAgICAgICAvLyBXZSBjb3VsZCBjYWNoZSBuYW1lZEljb24gaW4gX3N2Z0ljb25Db25maWdzLCBidXQgc2luY2Ugd2UgaGF2ZSB0byBtYWtlIGEgY29weSBldmVyeVxuICAgICAgICAgICAgLy8gdGltZSBhbnl3YXksIHRoZXJlJ3MgcHJvYmFibHkgbm90IG11Y2ggYWR2YW50YWdlIGNvbXBhcmVkIHRvIGp1c3QgYWx3YXlzIGV4dHJhY3RpbmdcbiAgICAgICAgICAgIC8vIGl0IGZyb20gdGhlIGljb24gc2V0LlxuICAgICAgICAgICAgcmV0dXJuIHJ4anNfT2JzZXJ2YWJsZS5PYnNlcnZhYmxlLm9mKG5hbWVkSWNvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90IGZvdW5kIGluIGFueSBjYWNoZWQgaWNvbiBzZXRzLiBJZiB0aGVyZSBhcmUgaWNvbiBzZXRzIHdpdGggVVJMcyB0aGF0IHdlIGhhdmVuJ3RcbiAgICAgICAgLy8gZmV0Y2hlZCwgZmV0Y2ggdGhlbSBub3cgYW5kIGxvb2sgZm9yIGljb25OYW1lIGluIHRoZSByZXN1bHRzLlxuICAgICAgICB2YXIgaWNvblNldEZldGNoUmVxdWVzdHMgPSBpY29uU2V0Q29uZmlnc1xuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaWNvblNldENvbmZpZykgeyByZXR1cm4gIWljb25TZXRDb25maWcuc3ZnRWxlbWVudDsgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGljb25TZXRDb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fbG9hZFN2Z0ljb25TZXRGcm9tQ29uZmlnKGljb25TZXRDb25maWcpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIsIGNhdWdodCkge1xuICAgICAgICAgICAgICAgIC8vIFN3YWxsb3cgZXJyb3JzIGZldGNoaW5nIGluZGl2aWR1YWwgVVJMcyBzbyB0aGUgY29tYmluZWQgT2JzZXJ2YWJsZSB3b24ndFxuICAgICAgICAgICAgICAgIC8vIG5lY2Vzc2FyaWx5IGZhaWwuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkaW5nIGljb24gc2V0IFVSTDogXCIgKyBpY29uU2V0Q29uZmlnLnVybCArIFwiIGZhaWxlZDogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByeGpzX09ic2VydmFibGUuT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRvKGZ1bmN0aW9uIChzdmcpIHtcbiAgICAgICAgICAgICAgICAvLyBDYWNoZSBTVkcgZWxlbWVudC5cbiAgICAgICAgICAgICAgICBpZiAoc3ZnKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25TZXRDb25maWcuc3ZnRWxlbWVudCA9IHN2ZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZldGNoIGFsbCB0aGUgaWNvbiBzZXQgVVJMcy4gV2hlbiB0aGUgcmVxdWVzdHMgY29tcGxldGUsIGV2ZXJ5IEljb25TZXQgc2hvdWxkIGhhdmUgYVxuICAgICAgICAvLyBjYWNoZWQgU1ZHIGVsZW1lbnQgKHVubGVzcyB0aGUgcmVxdWVzdCBmYWlsZWQpLCBhbmQgd2UgY2FuIGNoZWNrIGFnYWluIGZvciB0aGUgaWNvbi5cbiAgICAgICAgcmV0dXJuIHJ4anNfT2JzZXJ2YWJsZS5PYnNlcnZhYmxlLmZvcmtKb2luKGljb25TZXRGZXRjaFJlcXVlc3RzKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaWdub3JlZFJlc3VsdHMpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZEljb24gPSBfdGhpcy5fZXh0cmFjdEljb25XaXRoTmFtZUZyb21BbnlTZXQobmFtZSwgaWNvblNldENvbmZpZ3MpO1xuICAgICAgICAgICAgaWYgKCFmb3VuZEljb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWRJY29uTmFtZU5vdEZvdW5kRXJyb3IobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm91bmRJY29uO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBjYWNoZWQgU1ZHIGVsZW1lbnRzIGZvciB0aGUgZ2l2ZW4gaWNvbiBzZXRzIGZvciBhIG5lc3RlZCBpY29uIGVsZW1lbnQgd2hvc2UgXCJpZFwiXG4gICAgICogdGFnIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBuYW1lLiBJZiBmb3VuZCwgY29waWVzIHRoZSBuZXN0ZWQgZWxlbWVudCB0byBhIG5ldyBTVkcgZWxlbWVudCBhbmRcbiAgICAgKiByZXR1cm5zIGl0LiBSZXR1cm5zIG51bGwgaWYgbm8gbWF0Y2hpbmcgZWxlbWVudCBpcyBmb3VuZC5cbiAgICAgKi9cbiAgICBNZEljb25SZWdpc3RyeS5wcm90b3R5cGUuX2V4dHJhY3RJY29uV2l0aE5hbWVGcm9tQW55U2V0ID0gZnVuY3Rpb24gKGljb25OYW1lLCBpY29uU2V0Q29uZmlncykge1xuICAgICAgICAvLyBJdGVyYXRlIGJhY2t3YXJkcywgc28gaWNvbiBzZXRzIGFkZGVkIGxhdGVyIGhhdmUgcHJlY2VkZW5jZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IGljb25TZXRDb25maWdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gaWNvblNldENvbmZpZ3NbaV07XG4gICAgICAgICAgICBpZiAoY29uZmlnLnN2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmRJY29uID0gdGhpcy5fZXh0cmFjdFN2Z0ljb25Gcm9tU2V0KGNvbmZpZy5zdmdFbGVtZW50LCBpY29uTmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZEljb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbnRlbnQgb2YgdGhlIGljb24gVVJMIHNwZWNpZmllZCBpbiB0aGUgU3ZnSWNvbkNvbmZpZyBhbmQgY3JlYXRlcyBhbiBTVkcgZWxlbWVudFxuICAgICAqIGZyb20gaXQuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLl9sb2FkU3ZnSWNvbkZyb21Db25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9mZXRjaFVybChjb25maWcudXJsKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoc3ZnVGV4dCkgeyByZXR1cm4gX3RoaXMuX2NyZWF0ZVN2Z0VsZW1lbnRGb3JTaW5nbGVJY29uKHN2Z1RleHQsIGNvbmZpZyk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbnRlbnQgb2YgdGhlIGljb24gc2V0IFVSTCBzcGVjaWZpZWQgaW4gdGhlIFN2Z0ljb25Db25maWcgYW5kIGNyZWF0ZXMgYW4gU1ZHIGVsZW1lbnRcbiAgICAgKiBmcm9tIGl0LlxuICAgICAqL1xuICAgIE1kSWNvblJlZ2lzdHJ5LnByb3RvdHlwZS5fbG9hZFN2Z0ljb25TZXRGcm9tQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBUT0RPOiBEb2N1bWVudCB0aGF0IGljb25zIHNob3VsZCBvbmx5IGJlIGxvYWRlZCBmcm9tIHRydXN0ZWQgc291cmNlcy5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZldGNoVXJsKGNvbmZpZy51cmwpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChzdmdUZXh0KSB7IHJldHVybiBfdGhpcy5fc3ZnRWxlbWVudEZyb21TdHJpbmcoc3ZnVGV4dCk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZyb20gdGhlIGdpdmVuIFNWRyBzdHJpbmcsIGFuZCBhZGRzIGRlZmF1bHQgYXR0cmlidXRlcy5cbiAgICAgKi9cbiAgICBNZEljb25SZWdpc3RyeS5wcm90b3R5cGUuX2NyZWF0ZVN2Z0VsZW1lbnRGb3JTaW5nbGVJY29uID0gZnVuY3Rpb24gKHJlc3BvbnNlVGV4dCwgY29uZmlnKSB7XG4gICAgICAgIHZhciBzdmcgPSB0aGlzLl9zdmdFbGVtZW50RnJvbVN0cmluZyhyZXNwb25zZVRleHQpO1xuICAgICAgICB0aGlzLl9zZXRTdmdBdHRyaWJ1dGVzKHN2ZywgY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHN2ZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBjYWNoZWQgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gU3ZnSWNvbkNvbmZpZyBmb3IgYSBuZXN0ZWQgaWNvbiBlbGVtZW50IHdob3NlIFwiaWRcIlxuICAgICAqIHRhZyBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgbmFtZS4gSWYgZm91bmQsIGNvcGllcyB0aGUgbmVzdGVkIGVsZW1lbnQgdG8gYSBuZXcgU1ZHIGVsZW1lbnQgYW5kXG4gICAgICogcmV0dXJucyBpdC4gUmV0dXJucyBudWxsIGlmIG5vIG1hdGNoaW5nIGVsZW1lbnQgaXMgZm91bmQuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLl9leHRyYWN0U3ZnSWNvbkZyb21TZXQgPSBmdW5jdGlvbiAoaWNvblNldCwgaWNvbk5hbWUsIGNvbmZpZykge1xuICAgICAgICB2YXIgaWNvbk5vZGUgPSBpY29uU2V0LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaWNvbk5hbWUpO1xuICAgICAgICBpZiAoIWljb25Ob2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgaWNvbiBub2RlIGlzIGl0c2VsZiBhbiA8c3ZnPiBub2RlLCBjbG9uZSBhbmQgcmV0dXJuIGl0IGRpcmVjdGx5LiBJZiBub3QsIHNldCBpdCBhc1xuICAgICAgICAvLyB0aGUgY29udGVudCBvZiBhIG5ldyA8c3ZnPiBub2RlLlxuICAgICAgICBpZiAoaWNvbk5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICdzdmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0U3ZnQXR0cmlidXRlcyhpY29uTm9kZS5jbG9uZU5vZGUodHJ1ZSksIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY3JlYXRlRWxlbWVudCgnU1ZHJykgZG9lc24ndCB3b3JrIGFzIGV4cGVjdGVkOyB0aGUgRE9NIGVuZHMgdXAgd2l0aFxuICAgICAgICAvLyB0aGUgY29ycmVjdCBub2RlcywgYnV0IHRoZSBTVkcgY29udGVudCBkb2Vzbid0IHJlbmRlci4gSW5zdGVhZCB3ZVxuICAgICAgICAvLyBoYXZlIHRvIGNyZWF0ZSBhbiBlbXB0eSBTVkcgbm9kZSB1c2luZyBpbm5lckhUTUwgYW5kIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgICAgLy8gRWxlbWVudHMgY3JlYXRlZCB1c2luZyBET01QYXJzZXIucGFyc2VGcm9tU3RyaW5nIGhhdmUgdGhlIHNhbWUgcHJvYmxlbS5cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzAwMzI3OC9zdmctaW5uZXJodG1sLWluLWZpcmVmb3gtY2FuLW5vdC1kaXNwbGF5XG4gICAgICAgIHZhciBzdmcgPSB0aGlzLl9zdmdFbGVtZW50RnJvbVN0cmluZygnPHN2Zz48L3N2Zz4nKTtcbiAgICAgICAgLy8gQ2xvbmUgdGhlIG5vZGUgc28gd2UgZG9uJ3QgcmVtb3ZlIGl0IGZyb20gdGhlIHBhcmVudCBpY29uIHNldCBlbGVtZW50LlxuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoaWNvbk5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldFN2Z0F0dHJpYnV0ZXMoc3ZnLCBjb25maWcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZyb20gdGhlIGdpdmVuIFNWRyBzdHJpbmcuXG4gICAgICovXG4gICAgTWRJY29uUmVnaXN0cnkucHJvdG90eXBlLl9zdmdFbGVtZW50RnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgLy8gVE9ETzogSXMgdGhlcmUgYSBiZXR0ZXIgd2F5IHRoYW4gaW5uZXJIVE1MPyBSZW5kZXJlciBkb2Vzbid0IGFwcGVhciB0byBoYXZlIGEgbWV0aG9kIGZvclxuICAgICAgICAvLyBjcmVhdGluZyBhbiBlbGVtZW50IGZyb20gYW4gSFRNTCBzdHJpbmcuXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHN0cjtcbiAgICAgICAgdmFyIHN2ZyA9IGRpdi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcbiAgICAgICAgaWYgKCFzdmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZEljb25TdmdUYWdOb3RGb3VuZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN2ZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgYXR0cmlidXRlcyBmb3IgYW4gU1ZHIGVsZW1lbnQgdG8gYmUgdXNlZCBhcyBhbiBpY29uLlxuICAgICAqL1xuICAgIE1kSWNvblJlZ2lzdHJ5LnByb3RvdHlwZS5fc2V0U3ZnQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChzdmcsIGNvbmZpZykge1xuICAgICAgICBpZiAoIXN2Zy5nZXRBdHRyaWJ1dGUoJ3htbG5zJykpIHtcbiAgICAgICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnZml0JywgJycpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pZFlNaWQgbWVldCcpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdmb2N1c2FibGUnLCAnZmFsc2UnKTsgLy8gRGlzYWJsZSBJRTExIGRlZmF1bHQgYmVoYXZpb3IgdG8gbWFrZSBTVkdzIGZvY3VzYWJsZS5cbiAgICAgICAgcmV0dXJuIHN2ZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB3aGljaCBwcm9kdWNlcyB0aGUgc3RyaW5nIGNvbnRlbnRzIG9mIHRoZSBnaXZlbiBVUkwuIFJlc3VsdHMgbWF5IGJlXG4gICAgICogY2FjaGVkLCBzbyBmdXR1cmUgY2FsbHMgd2l0aCB0aGUgc2FtZSBVUkwgbWF5IG5vdCBjYXVzZSBhbm90aGVyIEhUVFAgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBNZEljb25SZWdpc3RyeS5wcm90b3R5cGUuX2ZldGNoVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBTdG9yZSBpbi1wcm9ncmVzcyBmZXRjaGVzIHRvIGF2b2lkIHNlbmRpbmcgYSBkdXBsaWNhdGUgcmVxdWVzdCBmb3IgYSBVUkwgd2hlbiB0aGVyZSBpc1xuICAgICAgICAvLyBhbHJlYWR5IGEgcmVxdWVzdCBpbiBwcm9ncmVzcyBmb3IgdGhhdCBVUkwuIEl0J3MgbmVjZXNzYXJ5IHRvIGNhbGwgc2hhcmUoKSBvbiB0aGVcbiAgICAgICAgLy8gT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBodHRwLmdldCgpIHNvIHRoYXQgbXVsdGlwbGUgc3Vic2NyaWJlcnMgZG9uJ3QgY2F1c2UgbXVsdGlwbGUgWEhScy5cbiAgICAgICAgaWYgKHRoaXMuX2luUHJvZ3Jlc3NVcmxGZXRjaGVzLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5Qcm9ncmVzc1VybEZldGNoZXMuZ2V0KHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyhqZWxib3Vybik6IGZvciBzb21lIHJlYXNvbiwgdGhlIGBmaW5hbGx5YCBvcGVyYXRvciBcImxvc2VzXCIgdGhlIGdlbmVyaWMgdHlwZSBvbiB0aGVcbiAgICAgICAgLy8gT2JzZXJ2YWJsZS4gRmlndXJlIG91dCB3aHkgYW5kIGZpeCBpdC5cbiAgICAgICAgdmFyIHJlcSA9IHRoaXMuX2h0dHAuZ2V0KHVybClcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS50ZXh0KCk7IH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5faW5Qcm9ncmVzc1VybEZldGNoZXMuZGVsZXRlKHVybCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuc2hhcmUoKTtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzc1VybEZldGNoZXMuc2V0KHVybCwgcmVxKTtcbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICB9O1xuICAgIE1kSWNvblJlZ2lzdHJ5ID0gX19kZWNvcmF0ZSQxKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbmplY3RhYmxlKCksIFxuICAgICAgICBfX21ldGFkYXRhJDEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW19hbmd1bGFyX2h0dHAuSHR0cF0pXG4gICAgXSwgTWRJY29uUmVnaXN0cnkpO1xuICAgIHJldHVybiBNZEljb25SZWdpc3RyeTtcbn0oKSk7XG4vKiogQ2xvbmVzIGFuIFNWR0VsZW1lbnQgd2hpbGUgcHJlc2VydmluZyB0eXBlIGluZm9ybWF0aW9uLiAqL1xuZnVuY3Rpb24gY2xvbmVTdmcoc3ZnKSB7XG4gICAgcmV0dXJuIHN2Zy5jbG9uZU5vZGUodHJ1ZSk7XG59XG5cbnZhciBfX2V4dGVuZHMgPSAod2luZG93ICYmIHdpbmRvdy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBfX2RlY29yYXRlID0gKHdpbmRvdyAmJiB3aW5kb3cuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh3aW5kb3cgJiYgd2luZG93Ll9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbi8qKiBFeGNlcHRpb24gdGhyb3duIHdoZW4gYW4gaW52YWxpZCBpY29uIG5hbWUgaXMgcGFzc2VkIHRvIGFuIG1kLWljb24gY29tcG9uZW50LiAqL1xudmFyIE1kSWNvbkludmFsaWROYW1lRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZEljb25JbnZhbGlkTmFtZUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1kSWNvbkludmFsaWROYW1lRXJyb3IoaWNvbk5hbWUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgXCJJbnZhbGlkIGljb24gbmFtZTogXFxcIlwiICsgaWNvbk5hbWUgKyBcIlxcXCJcIik7XG4gICAgfVxuICAgIHJldHVybiBNZEljb25JbnZhbGlkTmFtZUVycm9yO1xufShfYW5ndWxhcjJNYXRlcmlhbF9jb3JlLk1kRXJyb3IpKTtcbi8qKlxuICogQ29tcG9uZW50IHRvIGRpc3BsYXkgYW4gaWNvbi4gSXQgY2FuIGJlIHVzZWQgaW4gdGhlIGZvbGxvd2luZyB3YXlzOlxuICogLSBTcGVjaWZ5IHRoZSBzdmdTcmMgaW5wdXQgdG8gbG9hZCBhbiBTVkcgaWNvbiBmcm9tIGEgVVJMLiBUaGUgU1ZHIGNvbnRlbnQgaXMgZGlyZWN0bHkgaW5saW5lZFxuICogICBhcyBhIGNoaWxkIG9mIHRoZSA8bWQtaWNvbj4gY29tcG9uZW50LCBzbyB0aGF0IENTUyBzdHlsZXMgY2FuIGVhc2lseSBiZSBhcHBsaWVkIHRvIGl0LlxuICogICBUaGUgVVJMIGlzIGxvYWRlZCB2aWEgYW4gWE1MSHR0cFJlcXVlc3QsIHNvIGl0IG11c3QgYmUgb24gdGhlIHNhbWUgZG9tYWluIGFzIHRoZSBwYWdlIG9yIGl0c1xuICogICBzZXJ2ZXIgbXVzdCBiZSBjb25maWd1cmVkIHRvIGFsbG93IGNyb3NzLWRvbWFpbiByZXF1ZXN0cy5cbiAqICAgRXhhbXBsZTpcbiAqICAgICA8bWQtaWNvbiBzdmdTcmM9XCJhc3NldHMvYXJyb3cuc3ZnXCI+PC9tZC1pY29uPlxuICpcbiAqIC0gU3BlY2lmeSB0aGUgc3ZnSWNvbiBpbnB1dCB0byBsb2FkIGFuIFNWRyBpY29uIGZyb20gYSBVUkwgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlXG4gKiAgIGFkZFN2Z0ljb24sIGFkZFN2Z0ljb25Jbk5hbWVzcGFjZSwgYWRkU3ZnSWNvblNldCwgb3IgYWRkU3ZnSWNvblNldEluTmFtZXNwYWNlIG1ldGhvZHMgb2ZcbiAqICAgTWRJY29uUmVnaXN0cnkuIElmIHRoZSBzdmdJY29uIHZhbHVlIGNvbnRhaW5zIGEgY29sb24gaXQgaXMgYXNzdW1lZCB0byBiZSBpbiB0aGUgZm9ybWF0XG4gKiAgIFwiW25hbWVzcGFjZV06W25hbWVdXCIsIGlmIG5vdCB0aGUgdmFsdWUgd2lsbCBiZSB0aGUgbmFtZSBvZiBhbiBpY29uIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAqICAgRXhhbXBsZXM6XG4gKiAgICAgPG1kLWljb24gc3ZnSWNvbj1cImxlZnQtYXJyb3dcIj48L21kLWljb24+XG4gKiAgICAgPG1kLWljb24gc3ZnSWNvbj1cImFuaW1hbHM6Y2F0XCI+PC9tZC1pY29uPlxuICpcbiAqIC0gVXNlIGEgZm9udCBsaWdhdHVyZSBhcyBhbiBpY29uIGJ5IHB1dHRpbmcgdGhlIGxpZ2F0dXJlIHRleHQgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxtZC1pY29uPlxuICogICBjb21wb25lbnQuIEJ5IGRlZmF1bHQgdGhlIE1hdGVyaWFsIGljb25zIGZvbnQgaXMgdXNlZCBhcyBkZXNjcmliZWQgYXRcbiAqICAgaHR0cDovL2dvb2dsZS5naXRodWIuaW8vbWF0ZXJpYWwtZGVzaWduLWljb25zLyNpY29uLWZvbnQtZm9yLXRoZS13ZWIuIFlvdSBjYW4gc3BlY2lmeSBhblxuICogICBhbHRlcm5hdGUgZm9udCBieSBzZXR0aW5nIHRoZSBmb250U2V0IGlucHV0IHRvIGVpdGhlciB0aGUgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIHVzZSB0aGVcbiAqICAgZGVzaXJlZCBmb250LCBvciB0byBhbiBhbGlhcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCBNZEljb25SZWdpc3RyeS5yZWdpc3RlckZvbnRDbGFzc0FsaWFzLlxuICogICBFeGFtcGxlczpcbiAqICAgICA8bWQtaWNvbj5ob21lPC9tZC1pY29uPlxuICogICAgIDxtZC1pY29uIGZvbnRTZXQ9XCJteWZvbnRcIj5zdW48L21kLWljb24+XG4gKlxuICogLSBTcGVjaWZ5IGEgZm9udCBnbHlwaCB0byBiZSBpbmNsdWRlZCB2aWEgQ1NTIHJ1bGVzIGJ5IHNldHRpbmcgdGhlIGZvbnRTZXQgaW5wdXQgdG8gc3BlY2lmeSB0aGVcbiAqICAgZm9udCwgYW5kIHRoZSBmb250SWNvbiBpbnB1dCB0byBzcGVjaWZ5IHRoZSBpY29uLiBUeXBpY2FsbHkgdGhlIGZvbnRJY29uIHdpbGwgc3BlY2lmeSBhXG4gKiAgIENTUyBjbGFzcyB3aGljaCBjYXVzZXMgdGhlIGdseXBoIHRvIGJlIGRpc3BsYXllZCB2aWEgYSA6YmVmb3JlIHNlbGVjdG9yLCBhcyBpblxuICogICBodHRwczovL2ZvcnRhd2Vzb21lLmdpdGh1Yi5pby9Gb250LUF3ZXNvbWUvZXhhbXBsZXMvXG4gKiAgIEV4YW1wbGU6XG4gKiAgICAgPG1kLWljb24gZm9udFNldD1cImZhXCIgZm9udEljb249XCJhbGFybVwiPjwvbWQtaWNvbj5cbiAqL1xudmFyIE1kSWNvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWRJY29uKF9lbGVtZW50LCBfcmVuZGVyZXIsIF9tZEljb25SZWdpc3RyeSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gX2VsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyID0gX3JlbmRlcmVyO1xuICAgICAgICB0aGlzLl9tZEljb25SZWdpc3RyeSA9IF9tZEljb25SZWdpc3RyeTtcbiAgICAgICAgdGhpcy5ob3N0QXJpYUxhYmVsID0gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhbiBzdmdJY29uIGJpbmRpbmcgdmFsdWUgaW50byBpdHMgaWNvbiBzZXQgYW5kIGljb24gbmFtZSBjb21wb25lbnRzLlxuICAgICAqIFJldHVybnMgYSAyLWVsZW1lbnQgYXJyYXkgb2YgWyhpY29uIHNldCksIChpY29uIG5hbWUpXS5cbiAgICAgKiBUaGUgc2VwYXJhdG9yIGZvciB0aGUgdHdvIGZpZWxkcyBpcyAnOicuIElmIHRoZXJlIGlzIG5vIHNlcGFyYXRvciwgYW4gZW1wdHlcbiAgICAgKiBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIHRoZSBpY29uIHNldCBhbmQgdGhlIGVudGlyZSB2YWx1ZSBpcyByZXR1cm5lZCBmb3JcbiAgICAgKiB0aGUgaWNvbiBuYW1lLiBJZiB0aGUgYXJndW1lbnQgaXMgZmFsc3ksIHJldHVybnMgYW4gYXJyYXkgb2YgdHdvIGVtcHR5IHN0cmluZ3MuXG4gICAgICogVGhyb3dzIGEgTWRJY29uSW52YWxpZE5hbWVFcnJvciBpZiB0aGUgbmFtZSBjb250YWlucyB0d28gb3IgbW9yZSAnOicgc2VwYXJhdG9ycy5cbiAgICAgKiBFeGFtcGxlczpcbiAgICAgKiAgICdzb2NpYWw6Y2FrZScgLT4gWydzb2NpYWwnLCAnY2FrZSddXG4gICAgICogICAncGVuZ3VpbicgLT4gWycnLCAncGVuZ3VpbiddXG4gICAgICogICBudWxsIC0+IFsnJywgJyddXG4gICAgICogICAnYTpiOmMnIC0+ICh0aHJvd3MgTWRJY29uSW52YWxpZE5hbWVFcnJvcilcbiAgICAgKi9cbiAgICBNZEljb24ucHJvdG90eXBlLl9zcGxpdEljb25OYW1lID0gZnVuY3Rpb24gKGljb25OYW1lKSB7XG4gICAgICAgIGlmICghaWNvbk5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBbJycsICcnXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFydHMgPSBpY29uTmFtZS5zcGxpdCgnOicpO1xuICAgICAgICBzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIFVzZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgICByZXR1cm4gWycnLCBwYXJ0c1swXV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnRzO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWRJY29uSW52YWxpZE5hbWVFcnJvcihpY29uTmFtZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKiBUT0RPOiBpbnRlcm5hbCAqL1xuICAgIE1kSWNvbi5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY2hhbmdlZElucHV0cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgaW5saW5lIFNWRyBpY29uIGlmIHRoZSBpbnB1dHMgY2hhbmdlZCwgdG8gYXZvaWQgdW5uZWNlc3NhcnkgRE9NIG9wZXJhdGlvbnMuXG4gICAgICAgIGlmIChjaGFuZ2VkSW5wdXRzLmluZGV4T2YoJ3N2Z0ljb24nKSAhPSAtMSB8fCBjaGFuZ2VkSW5wdXRzLmluZGV4T2YoJ3N2Z1NyYycpICE9IC0xKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdmdJY29uKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5fc3BsaXRJY29uTmFtZSh0aGlzLnN2Z0ljb24pLCBuYW1lc3BhY2UgPSBfYVswXSwgaWNvbk5hbWUgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZEljb25SZWdpc3RyeS5nZXROYW1lZFN2Z0ljb24oaWNvbk5hbWUsIG5hbWVzcGFjZSkuc3Vic2NyaWJlKGZ1bmN0aW9uIChzdmcpIHsgcmV0dXJuIF90aGlzLl9zZXRTdmdFbGVtZW50KHN2Zyk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGNvbnNvbGUubG9nKFwiRXJyb3IgcmV0cmlldmluZyBpY29uOiBcIiArIGVycik7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdmdTcmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZEljb25SZWdpc3RyeS5nZXRTdmdJY29uRnJvbVVybCh0aGlzLnN2Z1NyYykuc3Vic2NyaWJlKGZ1bmN0aW9uIChzdmcpIHsgcmV0dXJuIF90aGlzLl9zZXRTdmdFbGVtZW50KHN2Zyk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGNvbnNvbGUubG9nKFwiRXJyb3IgcmV0cmlldmluZyBpY29uOiBcIiArIGVycik7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0ZvbnRJY29uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvbnRJY29uQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFyaWFMYWJlbCgpO1xuICAgIH07XG4gICAgLyoqIFRPRE86IGludGVybmFsICovXG4gICAgTWRJY29uLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXBkYXRlIGZvbnQgY2xhc3NlcyBiZWNhdXNlIG5nT25DaGFuZ2VzIHdvbid0IGJlIGNhbGxlZCBpZiBub25lIG9mIHRoZSBpbnB1dHMgYXJlIHByZXNlbnQsXG4gICAgICAgIC8vIGUuZy4gPG1kLWljb24+YXJyb3c8L21kLWljb24+LiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBhZGQgYSBDU1MgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGZvbnQuXG4gICAgICAgIGlmICh0aGlzLl91c2luZ0ZvbnRJY29uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvbnRJY29uQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKiogVE9ETzogaW50ZXJuYWwgKi9cbiAgICBNZEljb24ucHJvdG90eXBlLm5nQWZ0ZXJWaWV3Q2hlY2tlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXBkYXRlIGFyaWEgbGFiZWwgaGVyZSBiZWNhdXNlIGl0IG1heSBkZXBlbmQgb24gdGhlIHByb2plY3RlZCB0ZXh0IGNvbnRlbnQuXG4gICAgICAgIC8vIChlLmcuIDxtZC1pY29uPmhvbWU8L21kLWljb24+IHNob3VsZCB1c2UgJ2hvbWUnKS5cbiAgICAgICAgdGhpcy5fdXBkYXRlQXJpYUxhYmVsKCk7XG4gICAgfTtcbiAgICBNZEljb24ucHJvdG90eXBlLl91cGRhdGVBcmlhTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmlhTGFiZWwgPSB0aGlzLl9nZXRBcmlhTGFiZWwoKTtcbiAgICAgICAgaWYgKGFyaWFMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhcmlhLWxhYmVsJywgYXJpYUxhYmVsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTWRJY29uLnByb3RvdHlwZS5fZ2V0QXJpYUxhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJZiB0aGUgcGFyZW50IHByb3ZpZGVkIGFuIGFyaWEtbGFiZWwgYXR0cmlidXRlIHZhbHVlLCB1c2UgaXQgYXMtaXMuIE90aGVyd2lzZSBsb29rIGZvciBhXG4gICAgICAgIC8vIHJlYXNvbmFibGUgdmFsdWUgZnJvbSB0aGUgYWx0IGF0dHJpYnV0ZSwgZm9udCBpY29uIG5hbWUsIFNWRyBpY29uIG5hbWUsIG9yIChmb3IgbGlnYXR1cmVzKVxuICAgICAgICAvLyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBkaXJlY3RpdmUuXG4gICAgICAgIHZhciBsYWJlbCA9IHRoaXMuaG9zdEFyaWFMYWJlbCB8fFxuICAgICAgICAgICAgdGhpcy5hbHQgfHxcbiAgICAgICAgICAgIHRoaXMuZm9udEljb24gfHxcbiAgICAgICAgICAgIHRoaXMuX3NwbGl0SWNvbk5hbWUodGhpcy5zdmdJY29uKVsxXTtcbiAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIFwiY29udGVudFwiIG9mIGFuIFNWRyBpY29uIGlzIG5vdCBhIHVzZWZ1bCBsYWJlbC5cbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nRm9udEljb24oKSkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IFdhcm4gaGVyZSBpbiBkZXYgbW9kZS5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBNZEljb24ucHJvdG90eXBlLl91c2luZ0ZvbnRJY29uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLnN2Z0ljb24gfHwgdGhpcy5zdmdTcmMpO1xuICAgIH07XG4gICAgTWRJY29uLnByb3RvdHlwZS5fc2V0U3ZnRWxlbWVudCA9IGZ1bmN0aW9uIChzdmcpIHtcbiAgICAgICAgdmFyIGxheW91dEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBjaGlsZCBub2RlcyBhbmQgYWRkIHRoZSBuZXcgU1ZHIGVsZW1lbnQuXG4gICAgICAgIC8vIFdlIHdvdWxkIHVzZSByZW5kZXJlci5kZXRhY2hWaWV3KEFycmF5LmZyb20obGF5b3V0RWxlbWVudC5jaGlsZE5vZGVzKSkgaGVyZSxcbiAgICAgICAgLy8gYnV0IGl0IGZhaWxzIGluIElFMTE6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzYzMjdcbiAgICAgICAgbGF5b3V0RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucHJvamVjdE5vZGVzKGxheW91dEVsZW1lbnQsIFtzdmddKTtcbiAgICB9O1xuICAgIE1kSWNvbi5wcm90b3R5cGUuX3VwZGF0ZUZvbnRJY29uQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl91c2luZ0ZvbnRJY29uKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbSA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdmFyIGZvbnRTZXRDbGFzcyA9IHRoaXMuZm9udFNldCA/XG4gICAgICAgICAgICB0aGlzLl9tZEljb25SZWdpc3RyeS5jbGFzc05hbWVGb3JGb250QWxpYXModGhpcy5mb250U2V0KSA6XG4gICAgICAgICAgICB0aGlzLl9tZEljb25SZWdpc3RyeS5nZXREZWZhdWx0Rm9udFNldENsYXNzKCk7XG4gICAgICAgIGlmIChmb250U2V0Q2xhc3MgIT0gdGhpcy5fcHJldmlvdXNGb250U2V0Q2xhc3MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcmV2aW91c0ZvbnRTZXRDbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyhlbGVtLCB0aGlzLl9wcmV2aW91c0ZvbnRTZXRDbGFzcywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvbnRTZXRDbGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyhlbGVtLCBmb250U2V0Q2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNGb250U2V0Q2xhc3MgPSBmb250U2V0Q2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZm9udEljb24gIT0gdGhpcy5fcHJldmlvdXNGb250SWNvbkNsYXNzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNGb250SWNvbkNsYXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKGVsZW0sIHRoaXMuX3ByZXZpb3VzRm9udEljb25DbGFzcywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZm9udEljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3MoZWxlbSwgdGhpcy5mb250SWNvbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c0ZvbnRJY29uQ2xhc3MgPSB0aGlzLmZvbnRJY29uO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgpLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBTdHJpbmcpXG4gICAgXSwgTWRJY29uLnByb3RvdHlwZSwgXCJzdmdTcmNcIiwgdm9pZCAwKTtcbiAgICBfX2RlY29yYXRlKFtcbiAgICAgICAgX2FuZ3VsYXJfY29yZS5JbnB1dCgpLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBTdHJpbmcpXG4gICAgXSwgTWRJY29uLnByb3RvdHlwZSwgXCJzdmdJY29uXCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxuICAgIF0sIE1kSWNvbi5wcm90b3R5cGUsIFwiZm9udFNldFwiLCB2b2lkIDApO1xuICAgIF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLklucHV0KCksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcbiAgICBdLCBNZEljb24ucHJvdG90eXBlLCBcImZvbnRJY29uXCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxuICAgIF0sIE1kSWNvbi5wcm90b3R5cGUsIFwiYWx0XCIsIHZvaWQgMCk7XG4gICAgX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuSW5wdXQoJ2FyaWEtbGFiZWwnKSwgXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxuICAgIF0sIE1kSWNvbi5wcm90b3R5cGUsIFwiaG9zdEFyaWFMYWJlbFwiLCB2b2lkIDApO1xuICAgIE1kSWNvbiA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBfYW5ndWxhcl9jb3JlLkNvbXBvbmVudCh7dGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnbWQtaWNvbicsXG4gICAgICAgICAgICBzdHlsZXM6IFtcIi8qKiBUaGUgd2lkdGgvaGVpZ2h0IG9mIHRoZSBpY29uIGVsZW1lbnQuICovIC8qKiBUaGlzIHdvcmtzIGJlY2F1c2Ugd2UncmUgdXNpbmcgVmlld0VuY2Fwc3VsYXRpb24uTm9uZS4gSWYgd2UgdXNlZCB0aGUgZGVmYXVsdCBlbmNhcHN1bGF0aW9uLCB0aGUgc2VsZWN0b3Igd291bGQgbmVlZCB0byBiZSBcXFwiOmhvc3RcXFwiLiAqLyBtZC1pY29uIHsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBmaWxsOiBjdXJyZW50Q29sb3I7IGhlaWdodDogMjRweDsgd2lkdGg6IDI0cHg7IH0gLyojIHNvdXJjZU1hcHBpbmdVUkw9aWNvbi5jc3MubWFwICovIFwiXSxcbiAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAncm9sZSc6ICdpbWcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuY2Fwc3VsYXRpb246IF9hbmd1bGFyX2NvcmUuVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogX2FuZ3VsYXJfY29yZS5DaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbX2FuZ3VsYXJfY29yZS5FbGVtZW50UmVmLCBfYW5ndWxhcl9jb3JlLlJlbmRlcmVyLCBNZEljb25SZWdpc3RyeV0pXG4gICAgXSwgTWRJY29uKTtcbiAgICByZXR1cm4gTWRJY29uO1xufSgpKTtcbnZhciBNZEljb25Nb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kSWNvbk1vZHVsZSgpIHtcbiAgICB9XG4gICAgTWRJY29uTW9kdWxlLmZvclJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogTWRJY29uTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbTWRJY29uUmVnaXN0cnldLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWRJY29uTW9kdWxlID0gX19kZWNvcmF0ZShbXG4gICAgICAgIF9hbmd1bGFyX2NvcmUuTmdNb2R1bGUoe1xuICAgICAgICAgICAgaW1wb3J0czogW19hbmd1bGFyX2h0dHAuSHR0cE1vZHVsZV0sXG4gICAgICAgICAgICBleHBvcnRzOiBbTWRJY29uXSxcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW01kSWNvbl0sXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcbiAgICBdLCBNZEljb25Nb2R1bGUpO1xuICAgIHJldHVybiBNZEljb25Nb2R1bGU7XG59KCkpO1xuXG5leHBvcnRzLk1kSWNvbkludmFsaWROYW1lRXJyb3IgPSBNZEljb25JbnZhbGlkTmFtZUVycm9yO1xuZXhwb3J0cy5NZEljb24gPSBNZEljb247XG5leHBvcnRzLk1kSWNvbk1vZHVsZSA9IE1kSWNvbk1vZHVsZTtcbmV4cG9ydHMuTWRJY29uUmVnaXN0cnkgPSBNZEljb25SZWdpc3RyeTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vQGFuZ3VsYXIyLW1hdGVyaWFsL2ljb24vaWNvbi51bWQuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDI1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9idW5kbGVzL2h0dHAudW1kLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmFibGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIGZvcmtKb2luXzEgPSByZXF1aXJlKCcuLi8uLi9vYnNlcnZhYmxlL2ZvcmtKb2luJyk7XG5PYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5mb3JrSm9pbiA9IGZvcmtKb2luXzEuZm9ya0pvaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JrSm9pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9hZGQvb2JzZXJ2YWJsZS9mb3JrSm9pbi5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRm9ya0pvaW5PYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL0ZvcmtKb2luT2JzZXJ2YWJsZScpO1xuZXhwb3J0cy5mb3JrSm9pbiA9IEZvcmtKb2luT2JzZXJ2YWJsZV8xLkZvcmtKb2luT2JzZXJ2YWJsZS5jcmVhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JrSm9pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9vYnNlcnZhYmxlL2ZvcmtKb2luLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL09ic2VydmFibGUnKTtcbnZhciBFbXB0eU9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vRW1wdHlPYnNlcnZhYmxlJyk7XG52YXIgaXNBcnJheV8xID0gcmVxdWlyZSgnLi4vdXRpbC9pc0FycmF5Jyk7XG52YXIgc3Vic2NyaWJlVG9SZXN1bHRfMSA9IHJlcXVpcmUoJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnKTtcbnZhciBPdXRlclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL091dGVyU3Vic2NyaWJlcicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbnZhciBGb3JrSm9pbk9ic2VydmFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb3JrSm9pbk9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9ya0pvaW5PYnNlcnZhYmxlKHNvdXJjZXMsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdG9yID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfVxuICAgIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvdXJjZXNcbiAgICAgKiBAcmV0dXJuIHthbnl9XG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgZm9ya0pvaW5cbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEZvcmtKb2luT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzb3VyY2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBzb3VyY2VzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VzID09PSBudWxsIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlXzEuRW1wdHlPYnNlcnZhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXMubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gc291cmNlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIG9ubHkgb3RoZXIgYXJndW1lbnQgYmVzaWRlcyB0aGUgcmVzdWx0U2VsZWN0b3IgaXMgYW4gYXJyYXlcbiAgICAgICAgLy8gYXNzdW1lIGl0J3MgYmVlbiBjYWxsZWQgd2l0aCBgZm9ya0pvaW4oW29iczEsIG9iczIsIG9iczNdLCByZXN1bHRTZWxlY3RvcilgXG4gICAgICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5XzEuaXNBcnJheShzb3VyY2VzWzBdKSkge1xuICAgICAgICAgICAgc291cmNlcyA9IHNvdXJjZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVtcHR5T2JzZXJ2YWJsZV8xLkVtcHR5T2JzZXJ2YWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRm9ya0pvaW5PYnNlcnZhYmxlKHNvdXJjZXMsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9O1xuICAgIEZvcmtKb2luT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRm9ya0pvaW5TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuc291cmNlcywgdGhpcy5yZXN1bHRTZWxlY3Rvcik7XG4gICAgfTtcbiAgICByZXR1cm4gRm9ya0pvaW5PYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5Gb3JrSm9pbk9ic2VydmFibGUgPSBGb3JrSm9pbk9ic2VydmFibGU7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEZvcmtKb2luU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvcmtKb2luU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JrSm9pblN1YnNjcmliZXIoZGVzdGluYXRpb24sIHNvdXJjZXMsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IDA7XG4gICAgICAgIHRoaXMuaGF2ZVZhbHVlcyA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBzb3VyY2VzLmxlbmd0aDtcbiAgICAgICAgdGhpcy50b3RhbCA9IGxlbjtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICAgICAgICB2YXIgaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdF8xLnN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHNvdXJjZSwgbnVsbCwgaSk7XG4gICAgICAgICAgICBpZiAoaW5uZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBpbm5lclN1YnNjcmlwdGlvbi5vdXRlckluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChpbm5lclN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgRm9ya0pvaW5TdWJzY3JpYmVyLnByb3RvdHlwZS5ub3RpZnlOZXh0ID0gZnVuY3Rpb24gKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgsIGlubmVyU3ViKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW291dGVySW5kZXhdID0gaW5uZXJWYWx1ZTtcbiAgICAgICAgaWYgKCFpbm5lclN1Yi5faGFzVmFsdWUpIHtcbiAgICAgICAgICAgIGlubmVyU3ViLl9oYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhhdmVWYWx1ZXMrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgRm9ya0pvaW5TdWJzY3JpYmVyLnByb3RvdHlwZS5ub3RpZnlDb21wbGV0ZSA9IGZ1bmN0aW9uIChpbm5lclN1Yikge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXZlVmFsdWVzID0gX2EuaGF2ZVZhbHVlcywgcmVzdWx0U2VsZWN0b3IgPSBfYS5yZXN1bHRTZWxlY3RvciwgdmFsdWVzID0gX2EudmFsdWVzO1xuICAgICAgICB2YXIgbGVuID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKCFpbm5lclN1Yi5faGFzVmFsdWUpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wbGV0ZWQrKztcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkICE9PSBsZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGF2ZVZhbHVlcyA9PT0gbGVuKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHRTZWxlY3RvciA/IHJlc3VsdFNlbGVjdG9yLmFwcGx5KHRoaXMsIHZhbHVlcykgOiB2YWx1ZXM7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIEZvcmtKb2luU3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyXzEuT3V0ZXJTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Gb3JrSm9pbk9ic2VydmFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb2JzZXJ2YWJsZS9Gb3JrSm9pbk9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDM0KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL0VtcHR5T2JzZXJ2YWJsZS5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKSgyMik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDIzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3N1YnNjcmliZVRvUmVzdWx0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDE1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9PdXRlclN1YnNjcmliZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIG9mXzEgPSByZXF1aXJlKCcuLi8uLi9vYnNlcnZhYmxlL29mJyk7XG5PYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5vZiA9IG9mXzEub2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9hZGQvb2JzZXJ2YWJsZS9vZi5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygzKSkoMTAyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL29mLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBtYXBfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9yL21hcCcpO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLm1hcCA9IG1hcF8xLm1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9hZGQvb3BlcmF0b3IvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKSgxMDgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL21hcC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgdmVuZG9yXzJiODY3Mjk1NjI4ZGY4NDlmOThhXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi8uLi9PYnNlcnZhYmxlJyk7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRvci9maWx0ZXInKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmaWx0ZXJfMS5maWx0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpYmVyJyk7XG4vKipcbiAqIEZpbHRlciBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBvbmx5IGVtaXR0aW5nIHRob3NlIHRoYXRcbiAqIHNhdGlzZnkgYSBzcGVjaWZpZWQgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MaWtlXG4gKiBbQXJyYXkucHJvdG90eXBlLmZpbHRlcigpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXIpLFxuICogaXQgb25seSBlbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBpZiBpdCBwYXNzZXMgYSBjcml0ZXJpb24gZnVuY3Rpb24uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZmlsdGVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwta25vd24gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZCwgdGhpcyBvcGVyYXRvclxuICogdGFrZXMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBwYXNzZXMgdGhlbSB0aHJvdWdoIGEgYHByZWRpY2F0ZWBcbiAqIGZ1bmN0aW9uIGFuZCBvbmx5IGVtaXRzIHRob3NlIHZhbHVlcyB0aGF0IHlpZWxkZWQgYHRydWVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSBjbGljayBldmVudHMgd2hvc2UgdGFyZ2V0IHdhcyBhIERJViBlbGVtZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBjbGlja3NPbkRpdnMgPSBjbGlja3MuZmlsdGVyKGV2ID0+IGV2LnRhcmdldC50YWdOYW1lID09PSAnRElWJyk7XG4gKiBjbGlja3NPbkRpdnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0fVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RLZXl9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgaWdub3JlRWxlbWVudHN9XG4gKiBAc2VlIHtAbGluayBwYXJ0aXRpb259XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBib29sZWFufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiB0aGF0XG4gKiBldmFsdWF0ZXMgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgaXQgcmV0dXJucyBgdHJ1ZWAsXG4gKiB0aGUgdmFsdWUgaXMgZW1pdHRlZCwgaWYgYGZhbHNlYCB0aGUgdmFsdWUgaXMgbm90IHBhc3NlZCB0byB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLiBUaGUgYGluZGV4YCBwYXJhbWV0ZXIgaXMgdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIHNvdXJjZVxuICogZW1pc3Npb24gdGhhdCBoYXMgaGFwcGVuZWQgc2luY2UgdGhlIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyXG4gKiBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRldGVybWluZSB0aGUgdmFsdWUgb2YgYHRoaXNgXG4gKiBpbiB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgdGhhdCB3ZXJlXG4gKiBhbGxvd2VkIGJ5IHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEBtZXRob2QgZmlsdGVyXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSk7XG59XG5leHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbnZhciBGaWx0ZXJPcGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBGaWx0ZXJPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBGaWx0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnRoaXNBcmcpKTtcbiAgICB9O1xuICAgIHJldHVybiBGaWx0ZXJPcGVyYXRvcjtcbn0oKSk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEZpbHRlclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGaWx0ZXJTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZpbHRlclN1YnNjcmliZXIoZGVzdGluYXRpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgfVxuICAgIC8vIHRoZSB0cnkgY2F0Y2ggYmxvY2sgYmVsb3cgaXMgbGVmdCBzcGVjaWZpY2FsbHkgZm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGFuZCBwZXJmIHJlYXNvbnMuIGEgdHJ5Q2F0Y2hlciBpcyBub3QgbmVjZXNzYXJ5IGhlcmUuXG4gICAgRmlsdGVyU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlLmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZpbHRlclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb3BlcmF0b3IvZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKSgzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJzY3JpYmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBkb18xID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0b3IvZG8nKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5kbyA9IGRvXzEuX2RvO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLl9kbyA9IGRvXzEuX2RvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG8uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvYWRkL29wZXJhdG9yL2RvLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbi8qKlxuICogUGVyZm9ybSBhIHNpZGUgZWZmZWN0IGZvciBldmVyeSBlbWlzc2lvbiBvbiB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCByZXR1cm5cbiAqIGFuIE9ic2VydmFibGUgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhlIHNvdXJjZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SW50ZXJjZXB0cyBlYWNoIGVtaXNzaW9uIG9uIHRoZSBzb3VyY2UgYW5kIHJ1bnMgYVxuICogZnVuY3Rpb24sIGJ1dCByZXR1cm5zIGFuIG91dHB1dCB3aGljaCBpcyBpZGVudGljYWwgdG8gdGhlIHNvdXJjZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kby5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGEgbWlycm9yZWQgT2JzZXJ2YWJsZSBvZiB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBtb2RpZmllZCBzbyB0aGF0XG4gKiB0aGUgcHJvdmlkZWQgT2JzZXJ2ZXIgaXMgY2FsbGVkIHRvIHBlcmZvcm0gYSBzaWRlIGVmZmVjdCBmb3IgZXZlcnkgdmFsdWUsXG4gKiBlcnJvciwgYW5kIGNvbXBsZXRpb24gZW1pdHRlZCBieSB0aGUgc291cmNlLiBBbnkgZXJyb3JzIHRoYXQgYXJlIHRocm93biBpblxuICogdGhlIGFmb3JlbWVudGlvbmVkIE9ic2VydmVyIG9yIGhhbmRsZXJzIGFyZSBzYWZlbHkgc2VudCBkb3duIHRoZSBlcnJvciBwYXRoXG4gKiBvZiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogVGhpcyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGRlYnVnZ2luZyB5b3VyIE9ic2VydmFibGVzIGZvciB0aGUgY29ycmVjdCB2YWx1ZXNcbiAqIG9yIHBlcmZvcm1pbmcgb3RoZXIgc2lkZSBlZmZlY3RzLlxuICpcbiAqIE5vdGU6IHRoaXMgaXMgZGlmZmVyZW50IHRvIGEgYHN1YnNjcmliZWAgb24gdGhlIE9ic2VydmFibGUuIElmIHRoZSBPYnNlcnZhYmxlXG4gKiByZXR1cm5lZCBieSBgZG9gIGlzIG5vdCBzdWJzY3JpYmVkLCB0aGUgc2lkZSBlZmZlY3RzIHNwZWNpZmllZCBieSB0aGVcbiAqIE9ic2VydmVyIHdpbGwgbmV2ZXIgaGFwcGVuLiBgZG9gIHRoZXJlZm9yZSBzaW1wbHkgc3BpZXMgb24gZXhpc3RpbmdcbiAqIGV4ZWN1dGlvbiwgaXQgZG9lcyBub3QgdHJpZ2dlciBhbiBleGVjdXRpb24gdG8gaGFwcGVuIGxpa2UgYHN1YnNjcmliZWAgZG9lcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgZXZlcnkgY2xpY2sgdG8gdGhlIGNsaWVudFggcG9zaXRpb24gb2YgdGhhdCBjbGljaywgd2hpbGUgYWxzbyBsb2dnaW5nIHRoZSBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG9zaXRpb25zID0gY2xpY2tzXG4gKiAgIC5kbyhldiA9PiBjb25zb2xlLmxvZyhldikpXG4gKiAgIC5tYXAoZXYgPT4gZXYuY2xpZW50WCk7XG4gKiBwb3NpdGlvbnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1hcH1cbiAqIEBzZWUge0BsaW5rIHN1YnNjcmliZX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9ufSBbbmV4dE9yT2JzZXJ2ZXJdIEEgbm9ybWFsIE9ic2VydmVyIG9iamVjdCBvciBhXG4gKiBjYWxsYmFjayBmb3IgYG5leHRgLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vycm9yXSBDYWxsYmFjayBmb3IgZXJyb3JzIGluIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY29tcGxldGVdIENhbGxiYWNrIGZvciB0aGUgY29tcGxldGlvbiBvZiB0aGUgc291cmNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBpZGVudGljYWwgdG8gdGhlIHNvdXJjZSwgYnV0IHJ1bnMgdGhlXG4gKiBzcGVjaWZpZWQgT2JzZXJ2ZXIgb3IgY2FsbGJhY2socykgZm9yIGVhY2ggaXRlbS5cbiAqIEBtZXRob2QgZG9cbiAqIEBuYW1lIGRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBfZG8obmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IERvT3BlcmF0b3IobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkpO1xufVxuZXhwb3J0cy5fZG8gPSBfZG87XG52YXIgRG9PcGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9PcGVyYXRvcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMubmV4dE9yT2JzZXJ2ZXIgPSBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gY29tcGxldGU7XG4gICAgfVxuICAgIERvT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRG9TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMubmV4dE9yT2JzZXJ2ZXIsIHRoaXMuZXJyb3IsIHRoaXMuY29tcGxldGUpKTtcbiAgICB9O1xuICAgIHJldHVybiBEb09wZXJhdG9yO1xufSgpKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgRG9TdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRG9TdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgbmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHZhciBzYWZlU3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGQoc2FmZVN1YnNjcmliZXIpO1xuICAgICAgICB0aGlzLnNhZmVTdWJzY3JpYmVyID0gc2FmZVN1YnNjcmliZXI7XG4gICAgfVxuICAgIERvU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHNhZmVTdWJzY3JpYmVyID0gdGhpcy5zYWZlU3Vic2NyaWJlcjtcbiAgICAgICAgc2FmZVN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGlmIChzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3Ioc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRG9TdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBzYWZlU3Vic2NyaWJlciA9IHRoaXMuc2FmZVN1YnNjcmliZXI7XG4gICAgICAgIHNhZmVTdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIGlmIChzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3Ioc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEb1N1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNhZmVTdWJzY3JpYmVyID0gdGhpcy5zYWZlU3Vic2NyaWJlcjtcbiAgICAgICAgc2FmZVN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgaWYgKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93bikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEb1N1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kby5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9vcGVyYXRvci9kby5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIHNoYXJlXzEgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRvci9zaGFyZScpO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLnNoYXJlID0gc2hhcmVfMS5zaGFyZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL2FkZC9vcGVyYXRvci9zaGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgbXVsdGljYXN0XzEgPSByZXF1aXJlKCcuL211bHRpY2FzdCcpO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoJy4uL1N1YmplY3QnKTtcbmZ1bmN0aW9uIHNoYXJlU3ViamVjdEZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IE9ic2VydmFibGUgdGhhdCBtdWx0aWNhc3RzIChzaGFyZXMpIHRoZSBvcmlnaW5hbCBPYnNlcnZhYmxlLiBBcyBsb25nIGFzIHRoZXJlIGlzIGF0IGxlYXN0IG9uZVxuICogU3Vic2NyaWJlciB0aGlzIE9ic2VydmFibGUgd2lsbCBiZSBzdWJzY3JpYmVkIGFuZCBlbWl0dGluZyBkYXRhLiBXaGVuIGFsbCBzdWJzY3JpYmVycyBoYXZlIHVuc3Vic2NyaWJlZCBpdCB3aWxsXG4gKiB1bnN1YnNjcmliZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gQmVjYXVzZSB0aGUgT2JzZXJ2YWJsZSBpcyBtdWx0aWNhc3RpbmcgaXQgbWFrZXMgdGhlIHN0cmVhbSBgaG90YC5cbiAqIFRoaXMgaXMgYW4gYWxpYXMgZm9yIC5wdWJsaXNoKCkucmVmQ291bnQoKS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3NoYXJlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IGFuIE9ic2VydmFibGUgdGhhdCB1cG9uIGNvbm5lY3Rpb24gY2F1c2VzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0byBlbWl0IGl0ZW1zIHRvIGl0cyBPYnNlcnZlcnNcbiAqIEBtZXRob2Qgc2hhcmVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHNoYXJlKCkge1xuICAgIHJldHVybiBtdWx0aWNhc3RfMS5tdWx0aWNhc3QuY2FsbCh0aGlzLCBzaGFyZVN1YmplY3RGYWN0b3J5KS5yZWZDb3VudCgpO1xufVxuZXhwb3J0cy5zaGFyZSA9IHNoYXJlO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb3BlcmF0b3Ivc2hhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE11bHRpY2FzdE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL29ic2VydmFibGUvTXVsdGljYXN0T2JzZXJ2YWJsZScpO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUnKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2YgaW52b2tpbmcgYSBzcGVjaWZpZWQgc2VsZWN0b3Igb24gaXRlbXNcbiAqIGVtaXR0ZWQgYnkgYSBDb25uZWN0YWJsZU9ic2VydmFibGUgdGhhdCBzaGFyZXMgYSBzaW5nbGUgc3Vic2NyaXB0aW9uIHRvIHRoZSB1bmRlcmx5aW5nIHN0cmVhbS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL211bHRpY2FzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN1YmplY3R9IEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGludGVybWVkaWF0ZSBzdWJqZWN0IHRocm91Z2hcbiAqIHdoaWNoIHRoZSBzb3VyY2Ugc2VxdWVuY2UncyBlbGVtZW50cyB3aWxsIGJlIG11bHRpY2FzdCB0byB0aGUgc2VsZWN0b3IgZnVuY3Rpb25cbiAqIG9yIFN1YmplY3QgdG8gcHVzaCBzb3VyY2UgZWxlbWVudHMgaW50by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IE9wdGlvbmFsIHNlbGVjdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIHVzZSB0aGUgbXVsdGljYXN0ZWQgc291cmNlIHN0cmVhbVxuICogYXMgbWFueSB0aW1lcyBhcyBuZWVkZWQsIHdpdGhvdXQgY2F1c2luZyBtdWx0aXBsZSBzdWJzY3JpcHRpb25zIHRvIHRoZSBzb3VyY2Ugc3RyZWFtLlxuICogU3Vic2NyaWJlcnMgdG8gdGhlIGdpdmVuIHNvdXJjZSB3aWxsIHJlY2VpdmUgYWxsIG5vdGlmaWNhdGlvbnMgb2YgdGhlIHNvdXJjZSBmcm9tIHRoZVxuICogdGltZSBvZiB0aGUgc3Vic2NyaXB0aW9uIGZvcndhcmQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2YgaW52b2tpbmcgdGhlIHNlbGVjdG9yXG4gKiBvbiB0aGUgaXRlbXMgZW1pdHRlZCBieSBhIGBDb25uZWN0YWJsZU9ic2VydmFibGVgIHRoYXQgc2hhcmVzIGEgc2luZ2xlIHN1YnNjcmlwdGlvbiB0b1xuICogdGhlIHVuZGVybHlpbmcgc3RyZWFtLlxuICogQG1ldGhvZCBtdWx0aWNhc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG11bHRpY2FzdChzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSwgc2VsZWN0b3IpIHtcbiAgICB2YXIgc3ViamVjdEZhY3Rvcnk7XG4gICAgaWYgKHR5cGVvZiBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdWJqZWN0RmFjdG9yeSA9IHN1YmplY3RPclN1YmplY3RGYWN0b3J5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3ViamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBzdWJqZWN0RmFjdG9yeSgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuICFzZWxlY3RvciA/XG4gICAgICAgIG5ldyBDb25uZWN0YWJsZU9ic2VydmFibGVfMS5Db25uZWN0YWJsZU9ic2VydmFibGUodGhpcywgc3ViamVjdEZhY3RvcnkpIDpcbiAgICAgICAgbmV3IE11bHRpY2FzdE9ic2VydmFibGVfMS5NdWx0aWNhc3RPYnNlcnZhYmxlKHRoaXMsIHN1YmplY3RGYWN0b3J5LCBzZWxlY3Rvcik7XG59XG5leHBvcnRzLm11bHRpY2FzdCA9IG11bHRpY2FzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW11bHRpY2FzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9vcGVyYXRvci9tdWx0aWNhc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2YWJsZScpO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUnKTtcbnZhciBNdWx0aWNhc3RPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTXVsdGljYXN0T2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNdWx0aWNhc3RPYnNlcnZhYmxlKHNvdXJjZSwgc3ViamVjdEZhY3RvcnksIHNlbGVjdG9yKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5zdWJqZWN0RmFjdG9yeSA9IHN1YmplY3RGYWN0b3J5O1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgfVxuICAgIE11bHRpY2FzdE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBzZWxlY3RvciA9IF9hLnNlbGVjdG9yLCBzb3VyY2UgPSBfYS5zb3VyY2U7XG4gICAgICAgIHZhciBjb25uZWN0YWJsZSA9IG5ldyBDb25uZWN0YWJsZU9ic2VydmFibGVfMS5Db25uZWN0YWJsZU9ic2VydmFibGUoc291cmNlLCB0aGlzLnN1YmplY3RGYWN0b3J5KTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHNlbGVjdG9yKGNvbm5lY3RhYmxlKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoY29ubmVjdGFibGUuY29ubmVjdCgpKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIHJldHVybiBNdWx0aWNhc3RPYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5NdWx0aWNhc3RPYnNlcnZhYmxlID0gTXVsdGljYXN0T2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU11bHRpY2FzdE9ic2VydmFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb2JzZXJ2YWJsZS9NdWx0aWNhc3RPYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoJy4uL1N1YmplY3QnKTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZhYmxlJyk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaXB0aW9uJyk7XG4vKipcbiAqIEBjbGFzcyBDb25uZWN0YWJsZU9ic2VydmFibGU8VD5cbiAqL1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb25uZWN0YWJsZU9ic2VydmFibGUoc291cmNlLCBzdWJqZWN0RmFjdG9yeSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHRoaXMuc3ViamVjdEZhY3RvcnkgPSBzdWJqZWN0RmFjdG9yeTtcbiAgICAgICAgdGhpcy5fcmVmQ291bnQgPSAwO1xuICAgIH1cbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJqZWN0KCkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5nZXRTdWJqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3ViamVjdCA9IHRoaXMuX3N1YmplY3Q7XG4gICAgICAgIGlmICghc3ViamVjdCB8fCBzdWJqZWN0LmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuc3ViamVjdEZhY3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdDtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgICAgICBpZiAoIWNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5hZGQodGhpcy5zb3VyY2VcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKG5ldyBDb25uZWN0YWJsZVN1YnNjcmliZXIodGhpcy5nZXRTdWJqZWN0KCksIHRoaXMpKSk7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLnJlZkNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZWZDb3VudE9wZXJhdG9yKHRoaXMpKTtcbiAgICB9O1xuICAgIHJldHVybiBDb25uZWN0YWJsZU9ic2VydmFibGU7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTtcbnZhciBDb25uZWN0YWJsZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb25uZWN0YWJsZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGFibGVTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBjb25uZWN0YWJsZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBjb25uZWN0YWJsZTtcbiAgICB9XG4gICAgQ29ubmVjdGFibGVTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuX2Vycm9yLmNhbGwodGhpcywgZXJyKTtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb25uZWN0YWJsZSA9IHRoaXMuY29ubmVjdGFibGU7XG4gICAgICAgIGlmIChjb25uZWN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uO1xuICAgICAgICAgICAgY29ubmVjdGFibGUuX3JlZkNvdW50ID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3RhYmxlLl9zdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGFibGVTdWJzY3JpYmVyO1xufShTdWJqZWN0XzEuU3ViamVjdFN1YnNjcmliZXIpKTtcbnZhciBSZWZDb3VudE9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWZDb3VudE9wZXJhdG9yKGNvbm5lY3RhYmxlKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBjb25uZWN0YWJsZTtcbiAgICB9XG4gICAgUmVmQ291bnRPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIGNvbm5lY3RhYmxlID0gdGhpcy5jb25uZWN0YWJsZTtcbiAgICAgICAgY29ubmVjdGFibGUuX3JlZkNvdW50Kys7XG4gICAgICAgIHZhciByZWZDb3VudGVyID0gbmV3IFJlZkNvdW50U3Vic2NyaWJlcihzdWJzY3JpYmVyLCBjb25uZWN0YWJsZSk7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBzb3VyY2UuX3N1YnNjcmliZShyZWZDb3VudGVyKTtcbiAgICAgICAgaWYgKCFyZWZDb3VudGVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmVmQ291bnRlci5jb25uZWN0aW9uID0gY29ubmVjdGFibGUuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICByZXR1cm4gUmVmQ291bnRPcGVyYXRvcjtcbn0oKSk7XG52YXIgUmVmQ291bnRTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVmQ291bnRTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlZkNvdW50U3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgY29ubmVjdGFibGUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3RhYmxlID0gY29ubmVjdGFibGU7XG4gICAgfVxuICAgIFJlZkNvdW50U3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29ubmVjdGFibGUgPSB0aGlzLmNvbm5lY3RhYmxlO1xuICAgICAgICBpZiAoIWNvbm5lY3RhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgICAgICB2YXIgcmVmQ291bnQgPSBjb25uZWN0YWJsZS5fcmVmQ291bnQ7XG4gICAgICAgIGlmIChyZWZDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3RhYmxlLl9yZWZDb3VudCA9IHJlZkNvdW50IC0gMTtcbiAgICAgICAgaWYgKHJlZkNvdW50ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLy9cbiAgICAgICAgLy8gQ29tcGFyZSB0aGUgbG9jYWwgUmVmQ291bnRTdWJzY3JpYmVyJ3MgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gdG8gdGhlXG4gICAgICAgIC8vIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIG9uIHRoZSBzaGFyZWQgQ29ubmVjdGFibGVPYnNlcnZhYmxlLiBJbiBjYXNlc1xuICAgICAgICAvLyB3aGVyZSB0aGUgQ29ubmVjdGFibGVPYnNlcnZhYmxlIHNvdXJjZSBzeW5jaHJvbm91c2x5IGVtaXRzIHZhbHVlcywgYW5kXG4gICAgICAgIC8vIHRoZSBSZWZDb3VudFN1YnNjcmliZXIncyBkb3dzdHJlYW0gT2JzZXJ2ZXJzIHN5bmNocm9ub3VzbHkgdW5zdWJzY3JpYmUsXG4gICAgICAgIC8vIGV4ZWN1dGlvbiBjb250aW51ZXMgdG8gaGVyZSBiZWZvcmUgdGhlIFJlZkNvdW50T3BlcmF0b3IgaGFzIGEgY2hhbmNlIHRvXG4gICAgICAgIC8vIHN1cHBseSB0aGUgUmVmQ291bnRTdWJzY3JpYmVyIHdpdGggdGhlIHNoYXJlZCBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbi5cbiAgICAgICAgLy8gRm9yIGV4YW1wbGU6XG4gICAgICAgIC8vIGBgYFxuICAgICAgICAvLyBPYnNlcnZhYmxlLnJhbmdlKDAsIDEwKVxuICAgICAgICAvLyAgIC5wdWJsaXNoKClcbiAgICAgICAgLy8gICAucmVmQ291bnQoKVxuICAgICAgICAvLyAgIC50YWtlKDUpXG4gICAgICAgIC8vICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAvLyBgYGBcbiAgICAgICAgLy8gSW4gb3JkZXIgdG8gYWNjb3VudCBmb3IgdGhpcyBjYXNlLCBSZWZDb3VudFN1YnNjcmliZXIgc2hvdWxkIG9ubHkgZGlzcG9zZVxuICAgICAgICAvLyB0aGUgQ29ubmVjdGFibGVPYnNlcnZhYmxlJ3Mgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIGlmIHRoZVxuICAgICAgICAvLyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiBleGlzdHMsICphbmQqIGVpdGhlcjpcbiAgICAgICAgLy8gICBhLiBSZWZDb3VudFN1YnNjcmliZXIgZG9lc24ndCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzaGFyZWQgY29ubmVjdGlvblxuICAgICAgICAvLyAgICAgIFN1YnNjcmlwdGlvbiB5ZXQsIG9yLFxuICAgICAgICAvLyAgIGIuIFJlZkNvdW50U3Vic2NyaWJlcidzIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIHJlZmVyZW5jZSBpcyBpZGVudGljYWxcbiAgICAgICAgLy8gICAgICB0byB0aGUgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uXG4gICAgICAgIC8vL1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbjtcbiAgICAgICAgdmFyIHNoYXJlZENvbm5lY3Rpb24gPSBjb25uZWN0YWJsZS5fY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKHNoYXJlZENvbm5lY3Rpb24gJiYgKCFjb25uZWN0aW9uIHx8IHNoYXJlZENvbm5lY3Rpb24gPT09IGNvbm5lY3Rpb24pKSB7XG4gICAgICAgICAgICBzaGFyZWRDb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBSZWZDb3VudFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db25uZWN0YWJsZU9ic2VydmFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDE2KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDE3KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJzY3JpcHRpb24uanMgZnJvbSBkbGwtcmVmZXJlbmNlIHZlbmRvcl8yYjg2NzI5NTYyOGRmODQ5Zjk4YVxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIGZpbmFsbHlfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9yL2ZpbmFsbHknKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5maW5hbGx5ID0gZmluYWxseV8xLl9maW5hbGx5O1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLl9maW5hbGx5ID0gZmluYWxseV8xLl9maW5hbGx5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmluYWxseS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9hZGQvb3BlcmF0b3IvZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpYmVyJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpcHRpb24nKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCB3aWxsIGNhbGwgYSBzcGVjaWZpZWQgZnVuY3Rpb24gd2hlblxuICogdGhlIHNvdXJjZSB0ZXJtaW5hdGVzIG9uIGNvbXBsZXRlIG9yIGVycm9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gc291cmNlIHRlcm1pbmF0ZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlLCBidXQgd2lsbCBjYWxsIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gb24gdGVybWluYXRpb24uXG4gKiBAbWV0aG9kIGZpbmFsbHlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIF9maW5hbGx5KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgRmluYWxseU9wZXJhdG9yKGNhbGxiYWNrKSk7XG59XG5leHBvcnRzLl9maW5hbGx5ID0gX2ZpbmFsbHk7XG52YXIgRmluYWxseU9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGaW5hbGx5T3BlcmF0b3IoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBGaW5hbGx5T3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRmluYWxseVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jYWxsYmFjaykpO1xuICAgIH07XG4gICAgcmV0dXJuIEZpbmFsbHlPcGVyYXRvcjtcbn0oKSk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEZpbmFsbHlTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmluYWxseVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRmluYWxseVN1YnNjcmliZXIoZGVzdGluYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5hZGQobmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbihjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gRmluYWxseVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5hbGx5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29wZXJhdG9yL2ZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBjYXRjaF8xID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0b3IvY2F0Y2gnKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5jYXRjaCA9IGNhdGNoXzEuX2NhdGNoO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLl9jYXRjaCA9IGNhdGNoXzEuX2NhdGNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2F0Y2guanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvYWRkL29wZXJhdG9yL2NhdGNoLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKSgxMDMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2NhdGNoLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vYXBwLmNvbXBvbmVudC5odG1sJyksXG4gICAgc3R5bGVzOiBbcmVxdWlyZSgnLi9hcHAuY29tcG9uZW50LmNzcycpXVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7IH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9hcHAvYXBwLmNvbXBvbmVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJhcHAtY29udGVudFxcXCI+XFxyXFxuICAgIDxtZC1jYXJkPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1idXR0b24+RkxBVDwvYnV0dG9uPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1yYWlzZWQtYnV0dG9uPlJBSVNFRDwvYnV0dG9uPlxcclxcbiAgICA8L21kLWNhcmQ+XFxyXFxuICAgIDxtZC1jYXJkPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1pY29uLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cXFwibWQtMjRcXFwiPmZhdm9yaXRlPC9tZC1pY29uPlxcclxcbiAgICAgICAgPC9idXR0b24+XFxyXFxuICAgICAgICA8YnV0dG9uIG1kLWZhYj5cXHJcXG4gICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cXFwibWQtMjRcXFwiPmFkZDwvbWQtaWNvbj5cXHJcXG4gICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1taW5pLWZhYj5cXHJcXG4gICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cXFwibWQtMjRcXFwiPmFkZDwvbWQtaWNvbj5cXHJcXG4gICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICA8L21kLWNhcmQ+XFxyXFxuICAgIDxtZC1jYXJkPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1yYWlzZWQtYnV0dG9uIGNvbG9yPVxcXCJwcmltYXJ5XFxcIj5QUklNQVJZPC9idXR0b24+XFxyXFxuICAgICAgICA8YnV0dG9uIG1kLXJhaXNlZC1idXR0b24gY29sb3I9XFxcImFjY2VudFxcXCI+QUNDRU5UPC9idXR0b24+XFxyXFxuICAgICAgICA8YnV0dG9uIG1kLXJhaXNlZC1idXR0b24gY29sb3I9XFxcIndhcm5cXFwiPldBUk48L2J1dHRvbj5cXHJcXG4gICAgPC9tZC1jYXJkPlxcclxcbiAgICA8bWQtY2FyZD5cXHJcXG4gICAgICAgIDxidXR0b24gbWQtYnV0dG9uIGRpc2FibGVkPk9GRjwvYnV0dG9uPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1yYWlzZWQtYnV0dG9uIGRpc2FibGVkPk9GRjwvYnV0dG9uPlxcclxcbiAgICAgICAgPGJ1dHRvbiBtZC1taW5pLWZhYiBkaXNhYmxlZD48bWQtaWNvbj5jaGVjazwvbWQtaWNvbj48L2J1dHRvbj5cXHJcXG4gICAgPC9tZC1jYXJkPlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2FwcC5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jb21wb25lbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvYXBwLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5ibG9jayB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246dG9wO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvYXBwLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBEZXZpY2VNb2NrdXBDb21wb25lbnQgfSBmcm9tICcuL2RldmljZS1tb2NrdXAuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGV2aWNlTW9ja3VwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG5cbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERldmljZU1vY2t1cENvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBEZXZpY2VNb2NrdXBNb2R1bGUgeyB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvZGV2aWNlTW9ja3VwL2RldmljZS1tb2NrdXAubW9kdWxlLnRzIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGV2aWNlbScsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuaHRtbCcpLFxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuY3NzJyldXG59KVxuXG5leHBvcnQgY2xhc3MgRGV2aWNlTW9ja3VwQ29tcG9uZW50IHsgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2RldmljZU1vY2t1cC9kZXZpY2UtbW9ja3VwLmNvbXBvbmVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IHN0eWxlPVxcXCJ3aWR0aDozMDBweFxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImRldmljZS1tb2NrdXBcXFwiIGRhdGEtZGV2aWNlPVxcXCJuZXh1czdcXFwiIGRhdGEtb3JpZW50YXRpb249XFxcInBvcnRyYWl0XFxcIiBkYXRhLWNvbG9yPVxcXCJibGFja1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXZpY2VcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNjcmVlblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxidXR0b24+YnV0dG9uPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYnV0dG9uXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPCEtLSBZb3UgY2FuIGhvb2sgdGhlIFxcXCJob21lIGJ1dHRvblxcXCIgdG8gc29tZSBKYXZhU2NyaXB0IGV2ZW50cyBvciBqdXN0IHJlbW92ZSBpdCAtLT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2RldmljZU1vY2t1cC9kZXZpY2UtbW9ja3VwLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9kZXZpY2VNb2NrdXAvZGV2aWNlLW1vY2t1cC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIqe1xcclxcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7IC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsgLW1zLWJveC1zaXppbmc6Ym9yZGVyLWJveDsgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLCBib2R5IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgbWF4LXdpZHRoOiA2MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICBsaW5lLWhlaWdodDogMjAwJTtcXHJcXG4gICAgbWFyZ2luOiAzMHB4IGF1dG87XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vQ2xpZW50QXBwL2RldmljZU1vY2t1cC9kZXZpY2UtbW9ja3VwLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMykpKDUyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvbnBtLmpzIGZyb20gZGxsLXJlZmVyZW5jZSB2ZW5kb3JfMmI4NjcyOTU2MjhkZjg0OWY5OGFcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=