/*! 版权所有，翻版必究 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3886c21b1154ee9fa666";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/main.js")(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/exercise.js":
/*!*************************!*\
  !*** ./src/exercise.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var c = 4;\nvar b = 5;\nfunction newSet() {\n    // const s = new Set();\n    // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));\n\n    // for (let i of s) {\n    //     console.log(i);\n    // }\n    var b = 4;\n    return c;\n}\nfunction test() {\n    var a = 4;\n    console.log(a, 6);\n}\nfunction s() {\n    return 6;\n}\nfunction compare(b, c) {\n    if (b > c) {\n        return s();\n    } else {\n        return c;\n    }\n}exports.\n\nnewSet = newSet;exports.test = test;exports.compare = compare;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXhlcmNpc2UuanM/ODY3NSJdLCJuYW1lcyI6WyJjIiwiYiIsIm5ld1NldCIsInRlc3QiLCJhIiwiY29uc29sZSIsImxvZyIsInMiLCJjb21wYXJlIl0sIm1hcHBpbmdzIjoiOERBQUEsSUFBTUEsSUFBSSxDQUFWO0FBQ0EsSUFBTUMsSUFBSSxDQUFWO0FBQ0EsU0FBU0MsTUFBVCxHQUFrQjtBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTUQsSUFBSSxDQUFWO0FBQ0EsV0FBT0QsQ0FBUDtBQUNIO0FBQ0QsU0FBU0csSUFBVCxHQUFnQjtBQUNiLFFBQUlDLElBQUksQ0FBUjtBQUNBQyxZQUFRQyxHQUFSLENBQVlGLENBQVosRUFBYyxDQUFkO0FBQ0Y7QUFDRCxTQUFTRyxDQUFULEdBQVk7QUFDUixXQUFPLENBQVA7QUFDSDtBQUNELFNBQVNDLE9BQVQsQ0FBaUJQLENBQWpCLEVBQW1CRCxDQUFuQixFQUFxQjtBQUNqQixRQUFHQyxJQUFFRCxDQUFMLEVBQU87QUFDSCxlQUFPTyxHQUFQO0FBQ0gsS0FGRCxNQUVLO0FBQ0QsZUFBT1AsQ0FBUDtBQUNIO0FBQ0osQzs7QUFFR0UsTSxHQUFBQSxNLFNBQVFDLEksR0FBQUEsSSxTQUFNSyxPLEdBQUFBLE8iLCJmaWxlIjoiLi9zcmMvZXhlcmNpc2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjID0gNFxyXG5jb25zdCBiID0gNVxyXG5mdW5jdGlvbiBuZXdTZXQoKSB7XHJcbiAgICAvLyBjb25zdCBzID0gbmV3IFNldCgpO1xyXG4gICAgLy8gWzIsIDMsIDUsIDQsIDUsIDIsIDJdLmZvckVhY2goeCA9PiBzLmFkZCh4KSk7XHJcblxyXG4gICAgLy8gZm9yIChsZXQgaSBvZiBzKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coaSk7XHJcbiAgICAvLyB9XHJcbiAgICBjb25zdCBiID0gNFxyXG4gICAgcmV0dXJuIGNcclxufVxyXG5mdW5jdGlvbiB0ZXN0KCkge1xyXG4gICB2YXIgYSA9IDRcclxuICAgY29uc29sZS5sb2coYSw2KVxyXG59XHJcbmZ1bmN0aW9uIHMoKXtcclxuICAgIHJldHVybiA2XHJcbn1cclxuZnVuY3Rpb24gY29tcGFyZShiLGMpe1xyXG4gICAgaWYoYj5jKXtcclxuICAgICAgICByZXR1cm4gcygpXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gY1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHtcclxuICAgIG5ld1NldCwgdGVzdCwgY29tcGFyZVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/exercise.js\n");

/***/ }),

/***/ "./src/linkedList.js":
/*!***************************!*\
  !*** ./src/linkedList.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.linkedList = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); //双向链表\nvar _util = __webpack_require__(/*! ./util */ \"./src/util.js\");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}var\n\n\n\nlinkedList = function () {\n    function linkedList() {var equalsFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _util.defaultEquals;_classCallCheck(this, linkedList);\n        this.header = undefined;\n        this.count = 0;\n        this.equalsFn = equalsFn;\n    }\n    // 链表到达我们需要操作的位置\n    _createClass(linkedList, [{ key: 'getItemAt', value: function getItemAt(index) {\n            var node = this.header;\n            if (index < 0 || index > this.count + 1) {\n                return undefined;\n            } else {\n                for (var i = 0; i < index && node != null; i++) {\n                    node = node.next;\n                }\n                return node;\n            }\n        } }, { key: 'push', value: function push(\n        item) {\n            var Item = new _util.Node(item);\n            var current = void 0;\n            if (this.header == undefined) {\n                this.header = Item;\n            } else {\n                current = this.header;\n                while (current.next !== undefined) {\n                    current = current.next;\n                }\n                current.next = Item;\n                Item.prev = current; //双向链表\n            }\n            this.count++;\n        } }, { key: 'removeAt', value: function removeAt(\n        index) {\n            var current = void 0;\n            var previous = void 0;\n            if (index < 0 || index > this.count + 1) {\n                return undefined;\n            } else {\n                if (index == 0) {\n                    this.header = this.header.next;\n                    this.header.prev = undefined; //双向链表\n                } else {\n                    current = this.getItemAt(index);\n                    previous = current.prev; //双向链表\n                    if (index < this.count - 1) {\n                        previous.next = current.next;\n                        current.next.prev = previous; //双向链表\n                    } else {\n                        previous.next = current.next;\n                    }\n                }\n                this.count--;\n                return current.item;\n            }\n        } }, { key: 'insert', value: function insert(\n        item, index) {\n            if (index < 0 || index > this.count - 1) {\n                return undefined;\n            }\n            var Item = new _util.Node(item);\n            if (index === 0) {\n                Item.next = this.header;\n                this.header.prev = Item;\n                this.header = Item;\n            } else {\n                var current = this.getItemAt(index);\n                var previous = current.prev;\n                Item.prev = previous;\n                current.prev = Item;\n                previous.next = Item;\n                Item.next = current;\n            }\n            this.count++;\n        } }, { key: 'indexOf', value: function indexOf(\n        value) {\n            var current = this.header;\n            for (var i = 0; i < this.count; i++) {\n                if (this.equalsFn(value, current.item)) {\n                    return i;\n                }\n                current = current.next;\n            }\n            return -1;\n        } }, { key: 'remove', value: function remove(\n        value) {\n            var index = this.indexOf(value);\n            if (index === -1) {\n                console.error('value is not in this linkedList');\n            } else {\n                this.removeAt(index);\n            }\n        } }, { key: 'size', value: function size()\n        {\n            return this.count;\n        } }, { key: 'isEmpty', value: function isEmpty()\n        {\n            return this.count === 0;\n        } }, { key: 'getHead', value: function getHead()\n        {\n            return this.header;\n        } }, { key: 'toString', value: function toString()\n        {\n            if (this.header == null) {\n                return '';\n            }\n            var current = this.header;\n            var string = '' + current.item;\n            current = current.next;\n            for (var i = 0; i < this.count && current != null; i++) {\n                string = string + ',' + current.item;\n                current = current.next;\n            }\n            return string;\n        } }]);return linkedList;}();exports.\n\n\n\nlinkedList = linkedList;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGlua2VkTGlzdC5qcz9lZjJjIl0sIm5hbWVzIjpbImxpbmtlZExpc3QiLCJlcXVhbHNGbiIsImRlZmF1bHRFcXVhbHMiLCJoZWFkZXIiLCJ1bmRlZmluZWQiLCJjb3VudCIsImluZGV4Iiwibm9kZSIsImkiLCJuZXh0IiwiaXRlbSIsIkl0ZW0iLCJOb2RlIiwiY3VycmVudCIsInByZXYiLCJwcmV2aW91cyIsImdldEl0ZW1BdCIsInZhbHVlIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZUF0Iiwic3RyaW5nIl0sIm1hcHBpbmdzIjoibW9CQUFBO0FBQ0EsK0Q7Ozs7QUFJTUEsVTtBQUNGLDBCQUFzQyxLQUExQkMsUUFBMEIsdUVBQWZDLG1CQUFlO0FBQ2xDLGFBQUtDLE1BQUwsR0FBY0MsU0FBZDtBQUNBLGFBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBS0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDtBQUNEOzRFQUNVSyxLLEVBQU87QUFDYixnQkFBSUMsT0FBTyxLQUFLSixNQUFoQjtBQUNBLGdCQUFJRyxRQUFRLENBQVIsSUFBYUEsUUFBUSxLQUFLRCxLQUFMLEdBQWEsQ0FBdEMsRUFBeUM7QUFDckMsdUJBQU9ELFNBQVA7QUFDSCxhQUZELE1BRU87QUFDSCxxQkFBSyxJQUFJSSxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLEtBQUosSUFBYUMsUUFBUSxJQUFyQyxFQUEyQ0MsR0FBM0MsRUFBZ0Q7QUFDNUNELDJCQUFPQSxLQUFLRSxJQUFaO0FBQ0g7QUFDRCx1QkFBT0YsSUFBUDtBQUNIO0FBQ0osUztBQUNJRyxZLEVBQU07QUFDUCxnQkFBSUMsT0FBTyxJQUFJQyxVQUFKLENBQVNGLElBQVQsQ0FBWDtBQUNBLGdCQUFJRyxnQkFBSjtBQUNBLGdCQUFJLEtBQUtWLE1BQUwsSUFBZUMsU0FBbkIsRUFBOEI7QUFDMUIscUJBQUtELE1BQUwsR0FBY1EsSUFBZDtBQUNILGFBRkQsTUFFTztBQUNIRSwwQkFBVSxLQUFLVixNQUFmO0FBQ0EsdUJBQU9VLFFBQVFKLElBQVIsS0FBaUJMLFNBQXhCLEVBQW1DO0FBQy9CUyw4QkFBVUEsUUFBUUosSUFBbEI7QUFDSDtBQUNESSx3QkFBUUosSUFBUixHQUFlRSxJQUFmO0FBQ0FBLHFCQUFLRyxJQUFMLEdBQVlELE9BQVosQ0FORyxDQU1pQjtBQUN2QjtBQUNELGlCQUFLUixLQUFMO0FBQ0gsUztBQUNRQyxhLEVBQU87QUFDWixnQkFBSU8sZ0JBQUo7QUFDQSxnQkFBSUUsaUJBQUo7QUFDQSxnQkFBSVQsUUFBUSxDQUFSLElBQWFBLFFBQVEsS0FBS0QsS0FBTCxHQUFhLENBQXRDLEVBQXlDO0FBQ3JDLHVCQUFPRCxTQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsb0JBQUlFLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHlCQUFLSCxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZTSxJQUExQjtBQUNBLHlCQUFLTixNQUFMLENBQVlXLElBQVosR0FBbUJWLFNBQW5CLENBRlksQ0FFaUI7QUFDaEMsaUJBSEQsTUFHTztBQUNIUyw4QkFBVSxLQUFLRyxTQUFMLENBQWVWLEtBQWYsQ0FBVjtBQUNBUywrQkFBV0YsUUFBUUMsSUFBbkIsQ0FGRyxDQUV5QjtBQUM1Qix3QkFBSVIsUUFBUSxLQUFLRCxLQUFMLEdBQWEsQ0FBekIsRUFBNEI7QUFDeEJVLGlDQUFTTixJQUFULEdBQWdCSSxRQUFRSixJQUF4QjtBQUNBSSxnQ0FBUUosSUFBUixDQUFhSyxJQUFiLEdBQW9CQyxRQUFwQixDQUZ3QixDQUVLO0FBQ2hDLHFCQUhELE1BR087QUFDSEEsaUNBQVNOLElBQVQsR0FBZ0JJLFFBQVFKLElBQXhCO0FBQ0g7QUFDSjtBQUNELHFCQUFLSixLQUFMO0FBQ0EsdUJBQU9RLFFBQVFILElBQWY7QUFDSDtBQUNKLFM7QUFDTUEsWSxFQUFNSixLLEVBQU87QUFDaEIsZ0JBQUdBLFFBQVEsQ0FBUixJQUFhQSxRQUFRLEtBQUtELEtBQUwsR0FBYSxDQUFyQyxFQUF1QztBQUNyQyx1QkFBT0QsU0FBUDtBQUNEO0FBQ0EsZ0JBQUlPLE9BQU8sSUFBSUMsVUFBSixDQUFTRixJQUFULENBQVg7QUFDQSxnQkFBR0osVUFBVSxDQUFiLEVBQWU7QUFDYksscUJBQUtGLElBQUwsR0FBWSxLQUFLTixNQUFqQjtBQUNBLHFCQUFLQSxNQUFMLENBQVlXLElBQVosR0FBbUJILElBQW5CO0FBQ0EscUJBQUtSLE1BQUwsR0FBY1EsSUFBZDtBQUNELGFBSkQsTUFJSztBQUNGLG9CQUFJRSxVQUFVLEtBQUtHLFNBQUwsQ0FBZVYsS0FBZixDQUFkO0FBQ0Esb0JBQUlTLFdBQVdGLFFBQVFDLElBQXZCO0FBQ0FILHFCQUFLRyxJQUFMLEdBQVlDLFFBQVo7QUFDQUYsd0JBQVFDLElBQVIsR0FBZUgsSUFBZjtBQUNBSSx5QkFBU04sSUFBVCxHQUFnQkUsSUFBaEI7QUFDQUEscUJBQUtGLElBQUwsR0FBWUksT0FBWjtBQUNGO0FBQ0QsaUJBQUtSLEtBQUw7QUFDSixTO0FBQ09ZLGEsRUFBTTtBQUNaLGdCQUFJSixVQUFVLEtBQUtWLE1BQW5CO0FBQ0EsaUJBQUksSUFBSUssSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS0gsS0FBbkIsRUFBeUJHLEdBQXpCLEVBQTZCO0FBQ3pCLG9CQUFHLEtBQUtQLFFBQUwsQ0FBY2dCLEtBQWQsRUFBb0JKLFFBQVFILElBQTVCLENBQUgsRUFBcUM7QUFDbkMsMkJBQU9GLENBQVA7QUFDRDtBQUNESywwQkFBVUEsUUFBUUosSUFBbEI7QUFDSDtBQUNELG1CQUFPLENBQUMsQ0FBUjtBQUNELFM7QUFDTVEsYSxFQUFNO0FBQ1gsZ0JBQUlYLFFBQVEsS0FBS1ksT0FBTCxDQUFhRCxLQUFiLENBQVo7QUFDQSxnQkFBR1gsVUFBVSxDQUFDLENBQWQsRUFBZ0I7QUFDZGEsd0JBQVFDLEtBQVIsQ0FBYyxpQ0FBZDtBQUNELGFBRkQsTUFFSztBQUNILHFCQUFLQyxRQUFMLENBQWNmLEtBQWQ7QUFDRDtBQUNGLFM7QUFDSztBQUNKLG1CQUFPLEtBQUtELEtBQVo7QUFDRCxTO0FBQ1E7QUFDUCxtQkFBTyxLQUFLQSxLQUFMLEtBQWUsQ0FBdEI7QUFDRCxTO0FBQ1E7QUFDUCxtQkFBTyxLQUFLRixNQUFaO0FBQ0QsUztBQUNTO0FBQ1IsZ0JBQUcsS0FBS0EsTUFBTCxJQUFlLElBQWxCLEVBQXVCO0FBQ3JCLHVCQUFPLEVBQVA7QUFDRDtBQUNELGdCQUFJVSxVQUFVLEtBQUtWLE1BQW5CO0FBQ0EsZ0JBQUltQixjQUFZVCxRQUFRSCxJQUF4QjtBQUNBRyxzQkFBVUEsUUFBUUosSUFBbEI7QUFDQSxpQkFBSSxJQUFJRCxJQUFFLENBQVYsRUFBWUEsSUFBRSxLQUFLSCxLQUFQLElBQWdCUSxXQUFXLElBQXZDLEVBQTRDTCxHQUE1QyxFQUFnRDtBQUM5Q2MseUJBQVlBLE1BQVosU0FBc0JULFFBQVFILElBQTlCO0FBQ0FHLDBCQUFVQSxRQUFRSixJQUFsQjtBQUNEO0FBQ0QsbUJBQU9hLE1BQVA7QUFDRCxTOzs7O0FBSUR0QixVLEdBQUFBLFUiLCJmaWxlIjoiLi9zcmMvbGlua2VkTGlzdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8v5Y+M5ZCR6ZO+6KGoXHJcbmltcG9ydCB7XHJcbiAgICBkZWZhdWx0RXF1YWxzLFxyXG4gICAgTm9kZVxyXG59IGZyb20gJy4vdXRpbCdcclxuY2xhc3MgbGlua2VkTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcXVhbHNGbiA9IGRlZmF1bHRFcXVhbHMpIHtcclxuICAgICAgICB0aGlzLmhlYWRlciA9IHVuZGVmaW5lZFxyXG4gICAgICAgIHRoaXMuY291bnQgPSAwXHJcbiAgICAgICAgdGhpcy5lcXVhbHNGbiA9IGVxdWFsc0ZuXHJcbiAgICB9XHJcbiAgICAvLyDpk77ooajliLDovr7miJHku6zpnIDopoHmk43kvZznmoTkvY3nva5cclxuICAgIGdldEl0ZW1BdChpbmRleCkge1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5oZWFkZXJcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5jb3VudCArIDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2goaXRlbSkge1xyXG4gICAgICAgIGxldCBJdGVtID0gbmV3IE5vZGUoaXRlbSlcclxuICAgICAgICBsZXQgY3VycmVudFxyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBJdGVtXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuaGVhZGVyXHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50Lm5leHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IEl0ZW1cclxuICAgICAgICAgICAgSXRlbS5wcmV2ID0gY3VycmVudCAvL+WPjOWQkemTvuihqFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50KytcclxuICAgIH1cclxuICAgIHJlbW92ZUF0KGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRcclxuICAgICAgICBsZXQgcHJldmlvdXNcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5jb3VudCArIDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVyLm5leHRcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnByZXYgPSB1bmRlZmluZWQgLy/lj4zlkJHpk77ooahcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldEl0ZW1BdChpbmRleClcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudC5wcmV2ICAgICAvL+WPjOWQkemTvuihqFxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5jb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudC5uZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5uZXh0LnByZXYgPSBwcmV2aW91cyAvL+WPjOWQkemTvuihqFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudC5uZXh0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudC0tXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbnNlcnQoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICBpZihpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmNvdW50IC0gMSl7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgICBsZXQgSXRlbSA9IG5ldyBOb2RlKGl0ZW0pICAgIFxyXG4gICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICAgSXRlbS5uZXh0ID0gdGhpcy5oZWFkZXJcclxuICAgICAgICAgICB0aGlzLmhlYWRlci5wcmV2ID0gSXRlbVxyXG4gICAgICAgICAgIHRoaXMuaGVhZGVyID0gSXRlbVxyXG4gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLmdldEl0ZW1BdChpbmRleClcclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudC5wcmV2XHJcbiAgICAgICAgICAgIEl0ZW0ucHJldiA9IHByZXZpb3VzXHJcbiAgICAgICAgICAgIGN1cnJlbnQucHJldiA9IEl0ZW1cclxuICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IEl0ZW1cclxuICAgICAgICAgICAgSXRlbS5uZXh0ID0gY3VycmVudFxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHRoaXMuY291bnQrK1xyXG4gICAgfVxyXG4gICAgaW5kZXhPZih2YWx1ZSl7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5oZWFkZXJcclxuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICBpZih0aGlzLmVxdWFsc0ZuKHZhbHVlLGN1cnJlbnQuaXRlbSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gaVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlKHZhbHVlKXtcclxuICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleE9mKHZhbHVlKVxyXG4gICAgICBpZihpbmRleCA9PT0gLTEpe1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3ZhbHVlIGlzIG5vdCBpbiB0aGlzIGxpbmtlZExpc3QnKVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLnJlbW92ZUF0KGluZGV4KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzaXplKCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvdW50XHJcbiAgICB9XHJcbiAgICBpc0VtcHR5KCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvdW50ID09PSAwXHJcbiAgICB9XHJcbiAgICBnZXRIZWFkKCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmhlYWRlclxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKXtcclxuICAgICAgaWYodGhpcy5oZWFkZXIgPT0gbnVsbCl7XHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLmhlYWRlclxyXG4gICAgICBsZXQgc3RyaW5nID0gYCR7Y3VycmVudC5pdGVtfWBcclxuICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY291bnQgJiYgY3VycmVudCAhPSBudWxsO2krKyl7XHJcbiAgICAgICAgc3RyaW5nID0gYCR7c3RyaW5nfSwke2N1cnJlbnQuaXRlbX1gXHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHJpbmdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGxpbmtlZExpc3RcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/linkedList.js\n");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var _exercise = __webpack_require__(/*! ./exercise */ \"./src/exercise.js\");\n\n\n\nvar _stack = __webpack_require__(/*! ./stack */ \"./src/stack.js\");\nvar _linkedList = __webpack_require__(/*! ./linkedList */ \"./src/linkedList.js\");\nvar _recursive = __webpack_require__(/*! ./recursive */ \"./src/recursive.js\"); // newSet()\n// test()\nvar _console = console,log = _console.log; // let stack = new Stack()\n// log('查看栈是否为空',stack.isEmpty())\n// stack.push(8)\n// stack.push(5)\n// log(stack.peek())\n// log(stack.size())\n// log(stack.isEmpty())\n\n// let newstack = new newStack()\n// log('查看栈是否为空',newstack.isEmpty())\n// newstack.push(8)\n// newstack.push(5)\n// log(newstack.peek())\n// log(newstack.size())\n// log(newstack.isEmpty())\n// //这里存在一个问题，类的私有属性 外界可以随便更改，应该是只有类的私有方法才能更改\n// newstack.count = 0\n// log(newstack.isEmpty())\n//  let linkedlist = new linkedList()\n//  linkedlist.push(1)\n//  linkedlist.push(2)\n//  linkedlist.push(8)\n//  linkedlist.push(5)\n//  console.log(linkedlist)\n//  log(linkedlist.removeAt(3))\n//  console.log(linkedlist)\n//  linkedlist.insert(10,2)\n//  console.log(linkedlist)\n//  log(linkedlist.indexOf(10))\n//  linkedlist.remove(10)\n//  linkedlist.remove(11)\n//  log(linkedlist.toString())\n//  linkedlist.insert(9,0)\n//  console.log(linkedlist)\nlog((0, _recursive.factorial)(5));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz81NmQ3Il0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBSUE7QUFDQTtBQUNBLDhFLENBTEE7QUFDQTtlQUNjQSxPLENBQVJDLEcsWUFBQUEsRyxFQUtOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQ0EsSUFBSSwwQkFBVSxDQUFWLENBQUoiLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bmV3U2V0LCB0ZXN0fSBmcm9tIFwiLi9leGVyY2lzZVwiXHJcbi8vIG5ld1NldCgpXHJcbi8vIHRlc3QoKVxyXG5sZXQgeyBsb2cgfSA9IGNvbnNvbGU7XHJcbmltcG9ydCB7U3RhY2ssIG5ld1N0YWNrfSBmcm9tICcuL3N0YWNrJ1xyXG5pbXBvcnR7bGlua2VkTGlzdH0gZnJvbSAnLi9saW5rZWRMaXN0J1xyXG5pbXBvcnQge2ZhY3RvcmlhbH0gZnJvbSAnLi9yZWN1cnNpdmUnXHJcblxyXG4vLyBsZXQgc3RhY2sgPSBuZXcgU3RhY2soKVxyXG4vLyBsb2coJ+afpeeci+agiOaYr+WQpuS4uuepuicsc3RhY2suaXNFbXB0eSgpKVxyXG4vLyBzdGFjay5wdXNoKDgpXHJcbi8vIHN0YWNrLnB1c2goNSlcclxuLy8gbG9nKHN0YWNrLnBlZWsoKSlcclxuLy8gbG9nKHN0YWNrLnNpemUoKSlcclxuLy8gbG9nKHN0YWNrLmlzRW1wdHkoKSlcclxuXHJcbi8vIGxldCBuZXdzdGFjayA9IG5ldyBuZXdTdGFjaygpXHJcbi8vIGxvZygn5p+l55yL5qCI5piv5ZCm5Li656m6JyxuZXdzdGFjay5pc0VtcHR5KCkpXHJcbi8vIG5ld3N0YWNrLnB1c2goOClcclxuLy8gbmV3c3RhY2sucHVzaCg1KVxyXG4vLyBsb2cobmV3c3RhY2sucGVlaygpKVxyXG4vLyBsb2cobmV3c3RhY2suc2l6ZSgpKVxyXG4vLyBsb2cobmV3c3RhY2suaXNFbXB0eSgpKVxyXG4vLyAvL+i/memHjOWtmOWcqOS4gOS4qumXrumimO+8jOexu+eahOengeacieWxnuaApyDlpJbnlYzlj6/ku6Xpmo/kvr/mm7TmlLnvvIzlupTor6XmmK/lj6rmnInnsbvnmoTnp4HmnInmlrnms5XmiY3og73mm7TmlLlcclxuLy8gbmV3c3RhY2suY291bnQgPSAwXHJcbi8vIGxvZyhuZXdzdGFjay5pc0VtcHR5KCkpXHJcbi8vICBsZXQgbGlua2VkbGlzdCA9IG5ldyBsaW5rZWRMaXN0KClcclxuLy8gIGxpbmtlZGxpc3QucHVzaCgxKVxyXG4vLyAgbGlua2VkbGlzdC5wdXNoKDIpXHJcbi8vICBsaW5rZWRsaXN0LnB1c2goOClcclxuLy8gIGxpbmtlZGxpc3QucHVzaCg1KVxyXG4vLyAgY29uc29sZS5sb2cobGlua2VkbGlzdClcclxuLy8gIGxvZyhsaW5rZWRsaXN0LnJlbW92ZUF0KDMpKVxyXG4vLyAgY29uc29sZS5sb2cobGlua2VkbGlzdClcclxuLy8gIGxpbmtlZGxpc3QuaW5zZXJ0KDEwLDIpXHJcbi8vICBjb25zb2xlLmxvZyhsaW5rZWRsaXN0KVxyXG4vLyAgbG9nKGxpbmtlZGxpc3QuaW5kZXhPZigxMCkpXHJcbi8vICBsaW5rZWRsaXN0LnJlbW92ZSgxMClcclxuLy8gIGxpbmtlZGxpc3QucmVtb3ZlKDExKVxyXG4vLyAgbG9nKGxpbmtlZGxpc3QudG9TdHJpbmcoKSlcclxuLy8gIGxpbmtlZGxpc3QuaW5zZXJ0KDksMClcclxuLy8gIGNvbnNvbGUubG9nKGxpbmtlZGxpc3QpXHJcbiBsb2coZmFjdG9yaWFsKDUpKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ "./src/recursive.js":
/*!**************************!*\
  !*** ./src/recursive.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });function factorial(n) {\n  if (n == 1 || n == 0) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}exports.\n\n\nfactorial = factorial;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVjdXJzaXZlLmpzP2I3MDQiXSwibmFtZXMiOlsiZmFjdG9yaWFsIiwibiJdLCJtYXBwaW5ncyI6IjhEQUFBLFNBQVNBLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXFCO0FBQ25CLE1BQUdBLEtBQUssQ0FBTCxJQUFTQSxLQUFLLENBQWpCLEVBQW1CO0FBQ2pCLFdBQU8sQ0FBUDtBQUNEO0FBQ0QsU0FBT0EsSUFBSUQsVUFBVUMsSUFBRSxDQUFaLENBQVg7QUFDRCxDOzs7QUFHQ0QsUyxHQUFBQSxTIiwiZmlsZSI6Ii4vc3JjL3JlY3Vyc2l2ZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZhY3RvcmlhbChuKXtcclxuICBpZihuID09IDF8fCBuID09IDApe1xyXG4gICAgcmV0dXJuIDFcclxuICB9XHJcbiAgcmV0dXJuIG4gKiBmYWN0b3JpYWwobi0xKVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGZhY3RvcmlhbFxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/recursive.js\n");

/***/ }),

/***/ "./src/stack.js":
/*!**********************!*\
  !*** ./src/stack.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}} // 栈 后进先出\nvar Stack = function () {\n  function Stack() {_classCallCheck(this, Stack);\n    this.items = [];\n  }\n  // 向栈中添加新元素\n  _createClass(Stack, [{ key: 'push', value: function push(item) {\n      this.items.push(item);\n    }\n    // 从栈中移除元素，移除最后的一个元素\n  }, { key: 'pop', value: function pop() {\n      return this.items.pop();\n    }\n    // 查看栈顶元素\n  }, { key: 'peek', value: function peek() {\n      return this.items[this.items.length - 1];\n    }\n    // 检查栈是否为空\n  }, { key: 'isEmpty', value: function isEmpty() {\n      return this.items.length === 0;\n    }\n    // 栈的长度\n  }, { key: 'size', value: function size() {\n      return this.items.length;\n    }\n    // 清除栈元素\n  }, { key: 'clear', value: function clear() {\n      this.items = [];\n    } }]);return Stack;}();var\n\n\n\nnewStack = function () {\n  function newStack() {_classCallCheck(this, newStack);\n    this.count = 0;\n    this.items = {};\n  }\n  // 向栈中添加新元素\n  _createClass(newStack, [{ key: 'push', value: function push(item) {\n      this.items[this.count] = item;\n      this.count++;\n    }\n    // 栈的长度\n  }, { key: 'size', value: function size() {\n      return this.count;\n    }\n    // 检查栈是否为空\n  }, { key: 'isEmpty', value: function isEmpty() {\n      return this.count === 0;\n    }\n    // 从栈中移除元素，移除最后的一个元素,并取出这个元素的值\n  }, { key: 'pop', value: function pop() {\n      if (this.isEmpty()) {\n        return undefined;\n      }\n      this.count--;\n      var result = this.items[this.count];\n      delete this.items[this.count];\n      return result;\n    }\n    // 查看栈顶元素\n  }, { key: 'peek', value: function peek() {\n      if (this.isEmpty()) {\n        return undefined;\n      }\n      return this.items[this.count - 1];\n    } }, { key: 'clear', value: function clear()\n    {\n      this.items = {};\n      this.count = 0;\n    }\n    //这个栈的toString 方法\n  }, { key: 'toString', value: function toString() {\n      if (this.isEmpty()) {\n        return '';\n      }\n      var objString = '' + this.items[0]; // {1}\n      for (var i = 1; i < this.count; i++) {// {2}\n        objString = objString + ',' + this.items[i]; // {3}\n      }\n      return objString;\n    } }]);return newStack;}();exports.\n\nStack = Stack;exports.newStack = newStack;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RhY2suanM/NzA4ZSJdLCJuYW1lcyI6WyJTdGFjayIsIml0ZW1zIiwiaXRlbSIsInB1c2giLCJwb3AiLCJsZW5ndGgiLCJuZXdTdGFjayIsImNvdW50IiwiaXNFbXB0eSIsInVuZGVmaW5lZCIsInJlc3VsdCIsIm9ialN0cmluZyIsImkiXSwibWFwcGluZ3MiOiJ5dkJBQUE7SUFDTUEsSztBQUNKLG1CQUFhO0FBQ1gsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDRDtBQUNEOzJEQUNLQyxJLEVBQUs7QUFDUixXQUFLRCxLQUFMLENBQVdFLElBQVgsQ0FBZ0JELElBQWhCO0FBQ0Q7QUFDRDt5Q0FDSztBQUNILGFBQU8sS0FBS0QsS0FBTCxDQUFXRyxHQUFYLEVBQVA7QUFDRDtBQUNEOzJDQUNNO0FBQ0osYUFBTyxLQUFLSCxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXSSxNQUFYLEdBQW9CLENBQS9CLENBQVA7QUFDRDtBQUNEO2lEQUNTO0FBQ1AsYUFBTyxLQUFLSixLQUFMLENBQVdJLE1BQVgsS0FBc0IsQ0FBN0I7QUFDRDtBQUNEOzJDQUNNO0FBQ0osYUFBTyxLQUFLSixLQUFMLENBQVdJLE1BQWxCO0FBQ0Q7QUFDRDs2Q0FDTztBQUNMLFdBQUtKLEtBQUwsR0FBYSxFQUFiO0FBQ0QsSzs7OztBQUlHSyxRO0FBQ0Qsc0JBQWE7QUFDWCxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtOLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7QUFDSjs4REFDUUMsSSxFQUFLO0FBQ1IsV0FBS0QsS0FBTCxDQUFXLEtBQUtNLEtBQWhCLElBQXlCTCxJQUF6QjtBQUNBLFdBQUtLLEtBQUw7QUFDRDtBQUNKOzJDQUNTO0FBQ0osYUFBTyxLQUFLQSxLQUFaO0FBQ0Q7QUFDSjtpREFDWTtBQUNQLGFBQU8sS0FBS0EsS0FBTCxLQUFlLENBQXRCO0FBQ0Q7QUFDRjt5Q0FDSztBQUNILFVBQUcsS0FBS0MsT0FBTCxFQUFILEVBQWtCO0FBQ2hCLGVBQU9DLFNBQVA7QUFDRDtBQUNELFdBQUtGLEtBQUw7QUFDQSxVQUFJRyxTQUFTLEtBQUtULEtBQUwsQ0FBVyxLQUFLTSxLQUFoQixDQUFiO0FBQ0EsYUFBTyxLQUFLTixLQUFMLENBQVcsS0FBS00sS0FBaEIsQ0FBUDtBQUNBLGFBQU9HLE1BQVA7QUFDRDtBQUNBOzJDQUNHO0FBQ0osVUFBRyxLQUFLRixPQUFMLEVBQUgsRUFBa0I7QUFDaEIsZUFBT0MsU0FBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLUixLQUFMLENBQVcsS0FBS00sS0FBTCxHQUFhLENBQXhCLENBQVA7QUFDRCxLO0FBQ007QUFDTCxXQUFLTixLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUtNLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRDttREFDVztBQUNULFVBQUksS0FBS0MsT0FBTCxFQUFKLEVBQW9CO0FBQ3BCLGVBQU8sRUFBUDtBQUNDO0FBQ0QsVUFBSUcsaUJBQWUsS0FBS1YsS0FBTCxDQUFXLENBQVgsQ0FBbkIsQ0FKUyxDQUkyQjtBQUNwQyxXQUFLLElBQUlXLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLTCxLQUF6QixFQUFnQ0ssR0FBaEMsRUFBcUMsQ0FBRTtBQUN2Q0Qsb0JBQWVBLFNBQWYsU0FBNEIsS0FBS1YsS0FBTCxDQUFXVyxDQUFYLENBQTVCLENBRHFDLENBQ1E7QUFDNUM7QUFDRCxhQUFPRCxTQUFQO0FBQ0MsSzs7QUFFRVgsSyxHQUFBQSxLLFNBQU1NLFEsR0FBQUEsUSIsImZpbGUiOiIuL3NyYy9zdGFjay5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOagiCDlkI7ov5vlhYjlh7pcclxuY2xhc3MgU3RhY2t7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMuaXRlbXMgPSBbXVxyXG4gIH1cclxuICAvLyDlkJHmoIjkuK3mt7vliqDmlrDlhYPntKBcclxuICBwdXNoKGl0ZW0pe1xyXG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pXHJcbiAgfVxyXG4gIC8vIOS7juagiOS4reenu+mZpOWFg+e0oO+8jOenu+mZpOacgOWQjueahOS4gOS4quWFg+e0oFxyXG4gIHBvcCgpe1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXMucG9wKClcclxuICB9XHJcbiAgLy8g5p+l55yL5qCI6aG25YWD57SgXHJcbiAgcGVlaygpe1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGggLSAxXSAgXHJcbiAgfVxyXG4gIC8vIOajgOafpeagiOaYr+WQpuS4uuepulxyXG4gIGlzRW1wdHkoKXtcclxuICAgIHJldHVybiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMFxyXG4gIH1cclxuICAvLyDmoIjnmoTplb/luqZcclxuICBzaXplKCl7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGhcclxuICB9XHJcbiAgLy8g5riF6Zmk5qCI5YWD57SgXHJcbiAgY2xlYXIoKXtcclxuICAgIHRoaXMuaXRlbXMgPSBbXVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIG5ld1N0YWNre1xyXG4gICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICB0aGlzLmNvdW50ID0gMFxyXG4gICAgICAgdGhpcy5pdGVtcyA9IHt9XHJcbiAgICAgfVxyXG4gIC8vIOWQkeagiOS4rea3u+WKoOaWsOWFg+e0oFxyXG4gICAgIHB1c2goaXRlbSl7XHJcbiAgICAgICB0aGlzLml0ZW1zW3RoaXMuY291bnRdID0gaXRlbVxyXG4gICAgICAgdGhpcy5jb3VudCsrXHJcbiAgICAgfVxyXG4gIC8vIOagiOeahOmVv+W6plxyXG4gICAgIHNpemUoKXtcclxuICAgICAgIHJldHVybiB0aGlzLmNvdW50XHJcbiAgICAgfVxyXG4gIC8vIOajgOafpeagiOaYr+WQpuS4uuepulxyXG4gICAgIGlzRW1wdHkoKXtcclxuICAgICAgIHJldHVybiB0aGlzLmNvdW50ID09PSAwXHJcbiAgICAgfVxyXG4gICAgLy8g5LuO5qCI5Lit56e76Zmk5YWD57Sg77yM56e76Zmk5pyA5ZCO55qE5LiA5Liq5YWD57SgLOW5tuWPluWHuui/meS4quWFg+e0oOeahOWAvFxyXG4gICAgcG9wKCl7XHJcbiAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb3VudC0tXHJcbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLml0ZW1zW3RoaXMuY291bnRdXHJcbiAgICAgIGRlbGV0ZSB0aGlzLml0ZW1zW3RoaXMuY291bnRdXHJcbiAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuICAgICAvLyDmn6XnnIvmoIjpobblhYPntKBcclxuICBwZWVrKCl7XHJcbiAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuY291bnQgLSAxXSAgXHJcbiAgfVxyXG4gIGNsZWFyKCl7XHJcbiAgICB0aGlzLml0ZW1zID0ge31cclxuICAgIHRoaXMuY291bnQgPSAwXHJcbiAgfVxyXG4gIC8v6L+Z5Liq5qCI55qEdG9TdHJpbmcg5pa55rOVXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcclxuICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGxldCBvYmpTdHJpbmcgPSBgJHt0aGlzLml0ZW1zWzBdfWA7IC8vIHsxfVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmNvdW50OyBpKyspIHsgLy8gezJ9XHJcbiAgICBvYmpTdHJpbmcgPSBgJHtvYmpTdHJpbmd9LCR7dGhpcy5pdGVtc1tpXX1gOyAvLyB7M31cclxuICAgIH1cclxuICAgIHJldHVybiBvYmpTdHJpbmc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0e1N0YWNrLG5ld1N0YWNrfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/stack.js\n");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function defaultEquals(a, b) {\n  return a === b;\n}var\nNode =\nfunction Node(item) {_classCallCheck(this, Node);\n  this.item = item;\n  this.next = undefined;\n  this.prev = undefined;\n};exports.\n\ndefaultEquals = defaultEquals;exports.Node = Node;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcz9lMGViIl0sIm5hbWVzIjpbImRlZmF1bHRFcXVhbHMiLCJhIiwiYiIsIk5vZGUiLCJpdGVtIiwibmV4dCIsInVuZGVmaW5lZCIsInByZXYiXSwibWFwcGluZ3MiOiJtTkFBQSxTQUFTQSxhQUFULENBQXVCQyxDQUF2QixFQUEwQkMsQ0FBMUIsRUFBNEI7QUFDekIsU0FBT0QsTUFBTUMsQ0FBYjtBQUNGLEM7QUFDS0MsSTtBQUNKLGNBQVlDLElBQVosRUFBaUI7QUFDZixPQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLQyxJQUFMLEdBQVlDLFNBQVo7QUFDQSxPQUFLQyxJQUFMLEdBQVlELFNBQVo7QUFDRCxDOztBQUVJTixhLEdBQUFBLGEsU0FBY0csSSxHQUFBQSxJIiwiZmlsZSI6Ii4vc3JjL3V0aWwuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpe1xyXG4gICByZXR1cm4gYSA9PT0gYlxyXG59XHJcbmNsYXNzIE5vZGV7XHJcbiAgY29uc3RydWN0b3IoaXRlbSl7XHJcbiAgICB0aGlzLml0ZW0gPSBpdGVtXHJcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWRcclxuICAgIHRoaXMucHJldiA9IHVuZGVmaW5lZFxyXG4gIH1cclxufVxyXG5leHBvcnR7ZGVmYXVsdEVxdWFscyxOb2RlfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/util.js\n");

/***/ })

/******/ });