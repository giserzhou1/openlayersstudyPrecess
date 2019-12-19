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
/******/ 	var hotCurrentHash = "75ac9ebaf070021dc47a";
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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar c = 4;\nvar b = 5;\nfunction newSet() {\n    // const s = new Set();\n    // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));\n\n    // for (let i of s) {\n    //     console.log(i);\n    // }\n    var b = 4;\n    return c;\n}\nfunction test() {\n    var a = 4;\n    console.log(a, 6);\n}\nfunction s() {\n    return 6;\n}\nfunction compare(b, c) {\n    if (b > c) {\n        return s();\n    } else {\n        return c;\n    }\n}\nexports.newSet = newSet;\nexports.test = test;\nexports.compare = compare;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXhlcmNpc2UuanM/ODY3NSJdLCJuYW1lcyI6WyJjIiwiYiIsIm5ld1NldCIsInRlc3QiLCJhIiwiY29uc29sZSIsImxvZyIsInMiLCJjb21wYXJlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLElBQUksQ0FBVjtBQUNBLElBQU1DLElBQUksQ0FBVjtBQUNBLFNBQVNDLE1BQVQsR0FBa0I7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU1ELElBQUksQ0FBVjtBQUNBLFdBQU9ELENBQVA7QUFDSDtBQUNELFNBQVNHLElBQVQsR0FBZ0I7QUFDYixRQUFJQyxJQUFJLENBQVI7QUFDQUMsWUFBUUMsR0FBUixDQUFZRixDQUFaLEVBQWMsQ0FBZDtBQUNGO0FBQ0QsU0FBU0csQ0FBVCxHQUFZO0FBQ1IsV0FBTyxDQUFQO0FBQ0g7QUFDRCxTQUFTQyxPQUFULENBQWlCUCxDQUFqQixFQUFtQkQsQ0FBbkIsRUFBcUI7QUFDakIsUUFBR0MsSUFBRUQsQ0FBTCxFQUFPO0FBQ0gsZUFBT08sR0FBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU9QLENBQVA7QUFDSDtBQUNKO1FBRUdFLE0sR0FBQUEsTTtRQUFRQyxJLEdBQUFBLEk7UUFBTUssTyxHQUFBQSxPIiwiZmlsZSI6Ii4vc3JjL2V4ZXJjaXNlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYyA9IDRcclxuY29uc3QgYiA9IDVcclxuZnVuY3Rpb24gbmV3U2V0KCkge1xyXG4gICAgLy8gY29uc3QgcyA9IG5ldyBTZXQoKTtcclxuICAgIC8vIFsyLCAzLCA1LCA0LCA1LCAyLCAyXS5mb3JFYWNoKHggPT4gcy5hZGQoeCkpO1xyXG5cclxuICAgIC8vIGZvciAobGV0IGkgb2Ygcykge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgLy8gfVxyXG4gICAgY29uc3QgYiA9IDRcclxuICAgIHJldHVybiBjXHJcbn1cclxuZnVuY3Rpb24gdGVzdCgpIHtcclxuICAgdmFyIGEgPSA0XHJcbiAgIGNvbnNvbGUubG9nKGEsNilcclxufVxyXG5mdW5jdGlvbiBzKCl7XHJcbiAgICByZXR1cm4gNlxyXG59XHJcbmZ1bmN0aW9uIGNvbXBhcmUoYixjKXtcclxuICAgIGlmKGI+Yyl7XHJcbiAgICAgICAgcmV0dXJuIHMoKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIGNcclxuICAgIH1cclxufVxyXG5leHBvcnR7XHJcbiAgICBuZXdTZXQsIHRlc3QsIGNvbXBhcmVcclxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/exercise.js\n");

/***/ }),

/***/ "./src/linkedList.js":
/*!***************************!*\
  !*** ./src/linkedList.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.linkedList = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //双向链表\n\n\nvar _util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar linkedList = function () {\n    function linkedList() {\n        var equalsFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _util.defaultEquals;\n\n        _classCallCheck(this, linkedList);\n\n        this.header = undefined;\n        this.count = 0;\n        this.equalsFn = equalsFn;\n    }\n    // 链表到达我们需要操作的位置\n\n\n    _createClass(linkedList, [{\n        key: 'getItemAt',\n        value: function getItemAt(index) {\n            var node = this.header;\n            if (index < 0 || index > this.count + 1) {\n                return undefined;\n            } else {\n                for (var i = 0; i < index && node != null; i++) {\n                    node = node.next;\n                }\n                return node;\n            }\n        }\n    }, {\n        key: 'push',\n        value: function push(item) {\n            var Item = new _util.Node(item);\n            var current = void 0;\n            if (this.header == undefined) {\n                this.header = Item;\n            } else {\n                current = this.header;\n                while (current.next !== undefined) {\n                    current = current.next;\n                }\n                current.next = Item;\n                Item.prev = current; //双向链表\n            }\n            this.count++;\n        }\n    }, {\n        key: 'removeAt',\n        value: function removeAt(index) {\n            var current = void 0;\n            var previous = void 0;\n            if (index < 0 || index > this.count + 1) {\n                return undefined;\n            } else {\n                if (index == 0) {\n                    this.header = this.header.next;\n                    this.header.prev = undefined; //双向链表\n                } else {\n                    current = this.getItemAt(index);\n                    previous = current.prev; //双向链表\n                    if (index < this.count - 1) {\n                        previous.next = current.next;\n                        current.next.prev = previous; //双向链表\n                    } else {\n                        previous.next = current.next;\n                    }\n                }\n                this.count--;\n                return current.item;\n            }\n        }\n    }, {\n        key: 'insert',\n        value: function insert(item, index) {\n            if (index < 0 || index > this.count - 1) {\n                return undefined;\n            }\n            var Item = new _util.Node(item);\n            if (index === 0) {\n                Item.next = this.header;\n                this.header.prev = Item;\n                this.header = Item;\n            } else {\n                var current = this.getItemAt(index);\n                var previous = current.prev;\n                Item.prev = previous;\n                current.prev = Item;\n                previous.next = Item;\n                Item.next = current;\n            }\n            this.count++;\n        }\n    }, {\n        key: 'indexOf',\n        value: function indexOf(value) {\n            var current = this.header;\n            for (var i = 0; i < this.count; i++) {\n                if (this.equalsFn(value, current.item)) {\n                    return i;\n                }\n                current = current.next;\n            }\n            return -1;\n        }\n    }, {\n        key: 'remove',\n        value: function remove(value) {\n            var index = this.indexOf(value);\n            if (index === -1) {\n                console.error('value is not in this linkedList');\n            } else {\n                this.removeAt(index);\n            }\n        }\n    }, {\n        key: 'size',\n        value: function size() {\n            return this.count;\n        }\n    }, {\n        key: 'isEmpty',\n        value: function isEmpty() {\n            return this.count === 0;\n        }\n    }, {\n        key: 'getHead',\n        value: function getHead() {\n            return this.header;\n        }\n    }, {\n        key: 'toString',\n        value: function toString() {\n            if (this.header == null) {\n                return '';\n            }\n            var current = this.header;\n            var string = '' + current.item;\n            current = current.next;\n            for (var i = 0; i < this.count && current != null; i++) {\n                string = string + ',' + current.item;\n                current = current.next;\n            }\n            return string;\n        }\n    }]);\n\n    return linkedList;\n}();\n\nexports.linkedList = linkedList;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGlua2VkTGlzdC5qcz9lZjJjIl0sIm5hbWVzIjpbImxpbmtlZExpc3QiLCJlcXVhbHNGbiIsImRlZmF1bHRFcXVhbHMiLCJoZWFkZXIiLCJ1bmRlZmluZWQiLCJjb3VudCIsImluZGV4Iiwibm9kZSIsImkiLCJuZXh0IiwiaXRlbSIsIkl0ZW0iLCJOb2RlIiwiY3VycmVudCIsInByZXYiLCJwcmV2aW91cyIsImdldEl0ZW1BdCIsInZhbHVlIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZUF0Iiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7Ozs7SUFJTUEsVTtBQUNGLDBCQUFzQztBQUFBLFlBQTFCQyxRQUEwQix1RUFBZkMsbUJBQWU7O0FBQUE7O0FBQ2xDLGFBQUtDLE1BQUwsR0FBY0MsU0FBZDtBQUNBLGFBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBS0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDtBQUNEOzs7OztrQ0FDVUssSyxFQUFPO0FBQ2IsZ0JBQUlDLE9BQU8sS0FBS0osTUFBaEI7QUFDQSxnQkFBSUcsUUFBUSxDQUFSLElBQWFBLFFBQVEsS0FBS0QsS0FBTCxHQUFhLENBQXRDLEVBQXlDO0FBQ3JDLHVCQUFPRCxTQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixLQUFKLElBQWFDLFFBQVEsSUFBckMsRUFBMkNDLEdBQTNDLEVBQWdEO0FBQzVDRCwyQkFBT0EsS0FBS0UsSUFBWjtBQUNIO0FBQ0QsdUJBQU9GLElBQVA7QUFDSDtBQUNKOzs7NkJBQ0lHLEksRUFBTTtBQUNQLGdCQUFJQyxPQUFPLElBQUlDLFVBQUosQ0FBU0YsSUFBVCxDQUFYO0FBQ0EsZ0JBQUlHLGdCQUFKO0FBQ0EsZ0JBQUksS0FBS1YsTUFBTCxJQUFlQyxTQUFuQixFQUE4QjtBQUMxQixxQkFBS0QsTUFBTCxHQUFjUSxJQUFkO0FBQ0gsYUFGRCxNQUVPO0FBQ0hFLDBCQUFVLEtBQUtWLE1BQWY7QUFDQSx1QkFBT1UsUUFBUUosSUFBUixLQUFpQkwsU0FBeEIsRUFBbUM7QUFDL0JTLDhCQUFVQSxRQUFRSixJQUFsQjtBQUNIO0FBQ0RJLHdCQUFRSixJQUFSLEdBQWVFLElBQWY7QUFDQUEscUJBQUtHLElBQUwsR0FBWUQsT0FBWixDQU5HLENBTWlCO0FBQ3ZCO0FBQ0QsaUJBQUtSLEtBQUw7QUFDSDs7O2lDQUNRQyxLLEVBQU87QUFDWixnQkFBSU8sZ0JBQUo7QUFDQSxnQkFBSUUsaUJBQUo7QUFDQSxnQkFBSVQsUUFBUSxDQUFSLElBQWFBLFFBQVEsS0FBS0QsS0FBTCxHQUFhLENBQXRDLEVBQXlDO0FBQ3JDLHVCQUFPRCxTQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsb0JBQUlFLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHlCQUFLSCxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZTSxJQUExQjtBQUNBLHlCQUFLTixNQUFMLENBQVlXLElBQVosR0FBbUJWLFNBQW5CLENBRlksQ0FFaUI7QUFDaEMsaUJBSEQsTUFHTztBQUNIUyw4QkFBVSxLQUFLRyxTQUFMLENBQWVWLEtBQWYsQ0FBVjtBQUNBUywrQkFBV0YsUUFBUUMsSUFBbkIsQ0FGRyxDQUV5QjtBQUM1Qix3QkFBSVIsUUFBUSxLQUFLRCxLQUFMLEdBQWEsQ0FBekIsRUFBNEI7QUFDeEJVLGlDQUFTTixJQUFULEdBQWdCSSxRQUFRSixJQUF4QjtBQUNBSSxnQ0FBUUosSUFBUixDQUFhSyxJQUFiLEdBQW9CQyxRQUFwQixDQUZ3QixDQUVLO0FBQ2hDLHFCQUhELE1BR087QUFDSEEsaUNBQVNOLElBQVQsR0FBZ0JJLFFBQVFKLElBQXhCO0FBQ0g7QUFDSjtBQUNELHFCQUFLSixLQUFMO0FBQ0EsdUJBQU9RLFFBQVFILElBQWY7QUFDSDtBQUNKOzs7K0JBQ01BLEksRUFBTUosSyxFQUFPO0FBQ2hCLGdCQUFHQSxRQUFRLENBQVIsSUFBYUEsUUFBUSxLQUFLRCxLQUFMLEdBQWEsQ0FBckMsRUFBdUM7QUFDckMsdUJBQU9ELFNBQVA7QUFDRDtBQUNBLGdCQUFJTyxPQUFPLElBQUlDLFVBQUosQ0FBU0YsSUFBVCxDQUFYO0FBQ0EsZ0JBQUdKLFVBQVUsQ0FBYixFQUFlO0FBQ2JLLHFCQUFLRixJQUFMLEdBQVksS0FBS04sTUFBakI7QUFDQSxxQkFBS0EsTUFBTCxDQUFZVyxJQUFaLEdBQW1CSCxJQUFuQjtBQUNBLHFCQUFLUixNQUFMLEdBQWNRLElBQWQ7QUFDRCxhQUpELE1BSUs7QUFDRixvQkFBSUUsVUFBVSxLQUFLRyxTQUFMLENBQWVWLEtBQWYsQ0FBZDtBQUNBLG9CQUFJUyxXQUFXRixRQUFRQyxJQUF2QjtBQUNBSCxxQkFBS0csSUFBTCxHQUFZQyxRQUFaO0FBQ0FGLHdCQUFRQyxJQUFSLEdBQWVILElBQWY7QUFDQUkseUJBQVNOLElBQVQsR0FBZ0JFLElBQWhCO0FBQ0FBLHFCQUFLRixJQUFMLEdBQVlJLE9BQVo7QUFDRjtBQUNELGlCQUFLUixLQUFMO0FBQ0o7OztnQ0FDT1ksSyxFQUFNO0FBQ1osZ0JBQUlKLFVBQVUsS0FBS1YsTUFBbkI7QUFDQSxpQkFBSSxJQUFJSyxJQUFFLENBQVYsRUFBWUEsSUFBRSxLQUFLSCxLQUFuQixFQUF5QkcsR0FBekIsRUFBNkI7QUFDekIsb0JBQUcsS0FBS1AsUUFBTCxDQUFjZ0IsS0FBZCxFQUFvQkosUUFBUUgsSUFBNUIsQ0FBSCxFQUFxQztBQUNuQywyQkFBT0YsQ0FBUDtBQUNEO0FBQ0RLLDBCQUFVQSxRQUFRSixJQUFsQjtBQUNIO0FBQ0QsbUJBQU8sQ0FBQyxDQUFSO0FBQ0Q7OzsrQkFDTVEsSyxFQUFNO0FBQ1gsZ0JBQUlYLFFBQVEsS0FBS1ksT0FBTCxDQUFhRCxLQUFiLENBQVo7QUFDQSxnQkFBR1gsVUFBVSxDQUFDLENBQWQsRUFBZ0I7QUFDZGEsd0JBQVFDLEtBQVIsQ0FBYyxpQ0FBZDtBQUNELGFBRkQsTUFFSztBQUNILHFCQUFLQyxRQUFMLENBQWNmLEtBQWQ7QUFDRDtBQUNGOzs7K0JBQ0s7QUFDSixtQkFBTyxLQUFLRCxLQUFaO0FBQ0Q7OztrQ0FDUTtBQUNQLG1CQUFPLEtBQUtBLEtBQUwsS0FBZSxDQUF0QjtBQUNEOzs7a0NBQ1E7QUFDUCxtQkFBTyxLQUFLRixNQUFaO0FBQ0Q7OzttQ0FDUztBQUNSLGdCQUFHLEtBQUtBLE1BQUwsSUFBZSxJQUFsQixFQUF1QjtBQUNyQix1QkFBTyxFQUFQO0FBQ0Q7QUFDRCxnQkFBSVUsVUFBVSxLQUFLVixNQUFuQjtBQUNBLGdCQUFJbUIsY0FBWVQsUUFBUUgsSUFBeEI7QUFDQUcsc0JBQVVBLFFBQVFKLElBQWxCO0FBQ0EsaUJBQUksSUFBSUQsSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS0gsS0FBUCxJQUFnQlEsV0FBVyxJQUF2QyxFQUE0Q0wsR0FBNUMsRUFBZ0Q7QUFDOUNjLHlCQUFZQSxNQUFaLFNBQXNCVCxRQUFRSCxJQUE5QjtBQUNBRywwQkFBVUEsUUFBUUosSUFBbEI7QUFDRDtBQUNELG1CQUFPYSxNQUFQO0FBQ0Q7Ozs7OztRQUlEdEIsVSxHQUFBQSxVIiwiZmlsZSI6Ii4vc3JjL2xpbmtlZExpc3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL+WPjOWQkemTvuihqFxyXG5pbXBvcnQge1xyXG4gICAgZGVmYXVsdEVxdWFscyxcclxuICAgIE5vZGVcclxufSBmcm9tICcuL3V0aWwnXHJcbmNsYXNzIGxpbmtlZExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoZXF1YWxzRm4gPSBkZWZhdWx0RXF1YWxzKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB1bmRlZmluZWRcclxuICAgICAgICB0aGlzLmNvdW50ID0gMFxyXG4gICAgICAgIHRoaXMuZXF1YWxzRm4gPSBlcXVhbHNGblxyXG4gICAgfVxyXG4gICAgLy8g6ZO+6KGo5Yiw6L6+5oiR5Lus6ZyA6KaB5pON5L2c55qE5L2N572uXHJcbiAgICBnZXRJdGVtQXQoaW5kZXgpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuaGVhZGVyXHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuY291bnQgKyAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4ICYmIG5vZGUgIT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdXNoKGl0ZW0pIHtcclxuICAgICAgICBsZXQgSXRlbSA9IG5ldyBOb2RlKGl0ZW0pXHJcbiAgICAgICAgbGV0IGN1cnJlbnRcclxuICAgICAgICBpZiAodGhpcy5oZWFkZXIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gSXRlbVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmhlYWRlclxyXG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBJdGVtXHJcbiAgICAgICAgICAgIEl0ZW0ucHJldiA9IGN1cnJlbnQgLy/lj4zlkJHpk77ooahcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCsrXHJcbiAgICB9XHJcbiAgICByZW1vdmVBdChpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50XHJcbiAgICAgICAgbGV0IHByZXZpb3VzXHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuY291bnQgKyAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlci5uZXh0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlci5wcmV2ID0gdW5kZWZpbmVkIC8v5Y+M5ZCR6ZO+6KGoXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXRJdGVtQXQoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQucHJldiAgICAgLy/lj4zlkJHpk77ooahcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuY291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQubmV4dC5wcmV2ID0gcHJldmlvdXMgLy/lj4zlkJHpk77ooahcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnQubmV4dFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQtLVxyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5zZXJ0KGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgaWYoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5jb3VudCAtIDEpe1xyXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICAgbGV0IEl0ZW0gPSBuZXcgTm9kZShpdGVtKSAgICBcclxuICAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgIEl0ZW0ubmV4dCA9IHRoaXMuaGVhZGVyXHJcbiAgICAgICAgICAgdGhpcy5oZWFkZXIucHJldiA9IEl0ZW1cclxuICAgICAgICAgICB0aGlzLmhlYWRlciA9IEl0ZW1cclxuICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRJdGVtQXQoaW5kZXgpXHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnQucHJldlxyXG4gICAgICAgICAgICBJdGVtLnByZXYgPSBwcmV2aW91c1xyXG4gICAgICAgICAgICBjdXJyZW50LnByZXYgPSBJdGVtXHJcbiAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBJdGVtXHJcbiAgICAgICAgICAgIEl0ZW0ubmV4dCA9IGN1cnJlbnRcclxuICAgICAgICAgfVxyXG4gICAgICAgICB0aGlzLmNvdW50KytcclxuICAgIH1cclxuICAgIGluZGV4T2YodmFsdWUpe1xyXG4gICAgICBsZXQgY3VycmVudCA9IHRoaXMuaGVhZGVyXHJcbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jb3VudDtpKyspe1xyXG4gICAgICAgICAgaWYodGhpcy5lcXVhbHNGbih2YWx1ZSxjdXJyZW50Lml0ZW0pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJlbW92ZSh2YWx1ZSl7XHJcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZih2YWx1ZSlcclxuICAgICAgaWYoaW5kZXggPT09IC0xKXtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCd2YWx1ZSBpcyBub3QgaW4gdGhpcyBsaW5rZWRMaXN0JylcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBdChpbmRleClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2l6ZSgpe1xyXG4gICAgICByZXR1cm4gdGhpcy5jb3VudFxyXG4gICAgfVxyXG4gICAgaXNFbXB0eSgpe1xyXG4gICAgICByZXR1cm4gdGhpcy5jb3VudCA9PT0gMFxyXG4gICAgfVxyXG4gICAgZ2V0SGVhZCgpe1xyXG4gICAgICByZXR1cm4gdGhpcy5oZWFkZXJcclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCl7XHJcbiAgICAgIGlmKHRoaXMuaGVhZGVyID09IG51bGwpe1xyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5oZWFkZXJcclxuICAgICAgbGV0IHN0cmluZyA9IGAke2N1cnJlbnQuaXRlbX1gXHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRcclxuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50ICYmIGN1cnJlbnQgIT0gbnVsbDtpKyspe1xyXG4gICAgICAgIHN0cmluZyA9IGAke3N0cmluZ30sJHtjdXJyZW50Lml0ZW19YFxyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyaW5nXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsaW5rZWRMaXN0XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/linkedList.js\n");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _exercise = __webpack_require__(/*! ./exercise */ \"./src/exercise.js\");\n\nvar _stack = __webpack_require__(/*! ./stack */ \"./src/stack.js\");\n\nvar _linkedList = __webpack_require__(/*! ./linkedList */ \"./src/linkedList.js\");\n\n// newSet()\n// test()\nvar _console = console,\n    log = _console.log;\n\n\n// let stack = new Stack()\n// log('查看栈是否为空',stack.isEmpty())\n// stack.push(8)\n// stack.push(5)\n// log(stack.peek())\n// log(stack.size())\n// log(stack.isEmpty())\n\n// let newstack = new newStack()\n// log('查看栈是否为空',newstack.isEmpty())\n// newstack.push(8)\n// newstack.push(5)\n// log(newstack.peek())\n// log(newstack.size())\n// log(newstack.isEmpty())\n// //这里存在一个问题，类的私有属性 外界可以随便更改，应该是只有类的私有方法才能更改\n// newstack.count = 0\n// log(newstack.isEmpty())\nvar linkedlist = new _linkedList.linkedList();\nlinkedlist.push(1);\nlinkedlist.push(2);\nlinkedlist.push(8);\nlinkedlist.push(5);\nconsole.log(linkedlist);\nlog(linkedlist.removeAt(3));\nconsole.log(linkedlist);\nlinkedlist.insert(10, 2);\nconsole.log(linkedlist);\nlog(linkedlist.indexOf(10));\nlinkedlist.remove(10);\nlinkedlist.remove(11);\nlog(linkedlist.toString());\nlinkedlist.insert(9, 0);\nconsole.log(linkedlist);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz81NmQ3Il0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJsaW5rZWRsaXN0IiwibGlua2VkTGlzdCIsInB1c2giLCJyZW1vdmVBdCIsImluc2VydCIsImluZGV4T2YiLCJyZW1vdmUiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFJQTs7QUFDQTs7QUFKQTtBQUNBO2VBQ2NBLE87SUFBUkMsRyxZQUFBQSxHOzs7QUFJTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNDLElBQUlDLGFBQWEsSUFBSUMsc0JBQUosRUFBakI7QUFDQUQsV0FBV0UsSUFBWCxDQUFnQixDQUFoQjtBQUNBRixXQUFXRSxJQUFYLENBQWdCLENBQWhCO0FBQ0FGLFdBQVdFLElBQVgsQ0FBZ0IsQ0FBaEI7QUFDQUYsV0FBV0UsSUFBWCxDQUFnQixDQUFoQjtBQUNBSixRQUFRQyxHQUFSLENBQVlDLFVBQVo7QUFDQUQsSUFBSUMsV0FBV0csUUFBWCxDQUFvQixDQUFwQixDQUFKO0FBQ0FMLFFBQVFDLEdBQVIsQ0FBWUMsVUFBWjtBQUNBQSxXQUFXSSxNQUFYLENBQWtCLEVBQWxCLEVBQXFCLENBQXJCO0FBQ0FOLFFBQVFDLEdBQVIsQ0FBWUMsVUFBWjtBQUNBRCxJQUFJQyxXQUFXSyxPQUFYLENBQW1CLEVBQW5CLENBQUo7QUFDQUwsV0FBV00sTUFBWCxDQUFrQixFQUFsQjtBQUNBTixXQUFXTSxNQUFYLENBQWtCLEVBQWxCO0FBQ0FQLElBQUlDLFdBQVdPLFFBQVgsRUFBSjtBQUNBUCxXQUFXSSxNQUFYLENBQWtCLENBQWxCLEVBQW9CLENBQXBCO0FBQ0FOLFFBQVFDLEdBQVIsQ0FBWUMsVUFBWiIsImZpbGUiOiIuL3NyYy9tYWluLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtuZXdTZXQsIHRlc3R9IGZyb20gXCIuL2V4ZXJjaXNlXCJcclxuLy8gbmV3U2V0KClcclxuLy8gdGVzdCgpXHJcbmxldCB7IGxvZyB9ID0gY29uc29sZTtcclxuaW1wb3J0IHtTdGFjaywgbmV3U3RhY2t9IGZyb20gJy4vc3RhY2snXHJcbmltcG9ydHtsaW5rZWRMaXN0fSBmcm9tICcuL2xpbmtlZExpc3QnXHJcblxyXG4vLyBsZXQgc3RhY2sgPSBuZXcgU3RhY2soKVxyXG4vLyBsb2coJ+afpeeci+agiOaYr+WQpuS4uuepuicsc3RhY2suaXNFbXB0eSgpKVxyXG4vLyBzdGFjay5wdXNoKDgpXHJcbi8vIHN0YWNrLnB1c2goNSlcclxuLy8gbG9nKHN0YWNrLnBlZWsoKSlcclxuLy8gbG9nKHN0YWNrLnNpemUoKSlcclxuLy8gbG9nKHN0YWNrLmlzRW1wdHkoKSlcclxuXHJcbi8vIGxldCBuZXdzdGFjayA9IG5ldyBuZXdTdGFjaygpXHJcbi8vIGxvZygn5p+l55yL5qCI5piv5ZCm5Li656m6JyxuZXdzdGFjay5pc0VtcHR5KCkpXHJcbi8vIG5ld3N0YWNrLnB1c2goOClcclxuLy8gbmV3c3RhY2sucHVzaCg1KVxyXG4vLyBsb2cobmV3c3RhY2sucGVlaygpKVxyXG4vLyBsb2cobmV3c3RhY2suc2l6ZSgpKVxyXG4vLyBsb2cobmV3c3RhY2suaXNFbXB0eSgpKVxyXG4vLyAvL+i/memHjOWtmOWcqOS4gOS4qumXrumimO+8jOexu+eahOengeacieWxnuaApyDlpJbnlYzlj6/ku6Xpmo/kvr/mm7TmlLnvvIzlupTor6XmmK/lj6rmnInnsbvnmoTnp4HmnInmlrnms5XmiY3og73mm7TmlLlcclxuLy8gbmV3c3RhY2suY291bnQgPSAwXHJcbi8vIGxvZyhuZXdzdGFjay5pc0VtcHR5KCkpXHJcbiBsZXQgbGlua2VkbGlzdCA9IG5ldyBsaW5rZWRMaXN0KClcclxuIGxpbmtlZGxpc3QucHVzaCgxKVxyXG4gbGlua2VkbGlzdC5wdXNoKDIpXHJcbiBsaW5rZWRsaXN0LnB1c2goOClcclxuIGxpbmtlZGxpc3QucHVzaCg1KVxyXG4gY29uc29sZS5sb2cobGlua2VkbGlzdClcclxuIGxvZyhsaW5rZWRsaXN0LnJlbW92ZUF0KDMpKVxyXG4gY29uc29sZS5sb2cobGlua2VkbGlzdClcclxuIGxpbmtlZGxpc3QuaW5zZXJ0KDEwLDIpXHJcbiBjb25zb2xlLmxvZyhsaW5rZWRsaXN0KVxyXG4gbG9nKGxpbmtlZGxpc3QuaW5kZXhPZigxMCkpXHJcbiBsaW5rZWRsaXN0LnJlbW92ZSgxMClcclxuIGxpbmtlZGxpc3QucmVtb3ZlKDExKVxyXG4gbG9nKGxpbmtlZGxpc3QudG9TdHJpbmcoKSlcclxuIGxpbmtlZGxpc3QuaW5zZXJ0KDksMClcclxuIGNvbnNvbGUubG9nKGxpbmtlZGxpc3QpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ "./src/stack.js":
/*!**********************!*\
  !*** ./src/stack.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// 栈 后进先出\nvar Stack = function () {\n  function Stack() {\n    _classCallCheck(this, Stack);\n\n    this.items = [];\n  }\n  // 向栈中添加新元素\n\n\n  _createClass(Stack, [{\n    key: 'push',\n    value: function push(item) {\n      this.items.push(item);\n    }\n    // 从栈中移除元素，移除最后的一个元素\n\n  }, {\n    key: 'pop',\n    value: function pop() {\n      return this.items.pop();\n    }\n    // 查看栈顶元素\n\n  }, {\n    key: 'peek',\n    value: function peek() {\n      return this.items[this.items.length - 1];\n    }\n    // 检查栈是否为空\n\n  }, {\n    key: 'isEmpty',\n    value: function isEmpty() {\n      return this.items.length === 0;\n    }\n    // 栈的长度\n\n  }, {\n    key: 'size',\n    value: function size() {\n      return this.items.length;\n    }\n    // 清除栈元素\n\n  }, {\n    key: 'clear',\n    value: function clear() {\n      this.items = [];\n    }\n  }]);\n\n  return Stack;\n}();\n\nvar newStack = function () {\n  function newStack() {\n    _classCallCheck(this, newStack);\n\n    this.count = 0;\n    this.items = {};\n  }\n  // 向栈中添加新元素\n\n\n  _createClass(newStack, [{\n    key: 'push',\n    value: function push(item) {\n      this.items[this.count] = item;\n      this.count++;\n    }\n    // 栈的长度\n\n  }, {\n    key: 'size',\n    value: function size() {\n      return this.count;\n    }\n    // 检查栈是否为空\n\n  }, {\n    key: 'isEmpty',\n    value: function isEmpty() {\n      return this.count === 0;\n    }\n    // 从栈中移除元素，移除最后的一个元素,并取出这个元素的值\n\n  }, {\n    key: 'pop',\n    value: function pop() {\n      if (this.isEmpty()) {\n        return undefined;\n      }\n      this.count--;\n      var result = this.items[this.count];\n      delete this.items[this.count];\n      return result;\n    }\n    // 查看栈顶元素\n\n  }, {\n    key: 'peek',\n    value: function peek() {\n      if (this.isEmpty()) {\n        return undefined;\n      }\n      return this.items[this.count - 1];\n    }\n  }, {\n    key: 'clear',\n    value: function clear() {\n      this.items = {};\n      this.count = 0;\n    }\n    //这个栈的toString 方法\n\n  }, {\n    key: 'toString',\n    value: function toString() {\n      if (this.isEmpty()) {\n        return '';\n      }\n      var objString = '' + this.items[0]; // {1}\n      for (var i = 1; i < this.count; i++) {\n        // {2}\n        objString = objString + ',' + this.items[i]; // {3}\n      }\n      return objString;\n    }\n  }]);\n\n  return newStack;\n}();\n\nexports.Stack = Stack;\nexports.newStack = newStack;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RhY2suanM/NzA4ZSJdLCJuYW1lcyI6WyJTdGFjayIsIml0ZW1zIiwiaXRlbSIsInB1c2giLCJwb3AiLCJsZW5ndGgiLCJuZXdTdGFjayIsImNvdW50IiwiaXNFbXB0eSIsInVuZGVmaW5lZCIsInJlc3VsdCIsIm9ialN0cmluZyIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtJQUNNQSxLO0FBQ0osbUJBQWE7QUFBQTs7QUFDWCxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNEO0FBQ0Q7Ozs7O3lCQUNLQyxJLEVBQUs7QUFDUixXQUFLRCxLQUFMLENBQVdFLElBQVgsQ0FBZ0JELElBQWhCO0FBQ0Q7QUFDRDs7OzswQkFDSztBQUNILGFBQU8sS0FBS0QsS0FBTCxDQUFXRyxHQUFYLEVBQVA7QUFDRDtBQUNEOzs7OzJCQUNNO0FBQ0osYUFBTyxLQUFLSCxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXSSxNQUFYLEdBQW9CLENBQS9CLENBQVA7QUFDRDtBQUNEOzs7OzhCQUNTO0FBQ1AsYUFBTyxLQUFLSixLQUFMLENBQVdJLE1BQVgsS0FBc0IsQ0FBN0I7QUFDRDtBQUNEOzs7OzJCQUNNO0FBQ0osYUFBTyxLQUFLSixLQUFMLENBQVdJLE1BQWxCO0FBQ0Q7QUFDRDs7Ozs0QkFDTztBQUNMLFdBQUtKLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7Ozs7OztJQUlHSyxRO0FBQ0Qsc0JBQWE7QUFBQTs7QUFDWCxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtOLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7QUFDSjs7Ozs7eUJBQ1FDLEksRUFBSztBQUNSLFdBQUtELEtBQUwsQ0FBVyxLQUFLTSxLQUFoQixJQUF5QkwsSUFBekI7QUFDQSxXQUFLSyxLQUFMO0FBQ0Q7QUFDSjs7OzsyQkFDUztBQUNKLGFBQU8sS0FBS0EsS0FBWjtBQUNEO0FBQ0o7Ozs7OEJBQ1k7QUFDUCxhQUFPLEtBQUtBLEtBQUwsS0FBZSxDQUF0QjtBQUNEO0FBQ0Y7Ozs7MEJBQ0s7QUFDSCxVQUFHLEtBQUtDLE9BQUwsRUFBSCxFQUFrQjtBQUNoQixlQUFPQyxTQUFQO0FBQ0Q7QUFDRCxXQUFLRixLQUFMO0FBQ0EsVUFBSUcsU0FBUyxLQUFLVCxLQUFMLENBQVcsS0FBS00sS0FBaEIsQ0FBYjtBQUNBLGFBQU8sS0FBS04sS0FBTCxDQUFXLEtBQUtNLEtBQWhCLENBQVA7QUFDQSxhQUFPRyxNQUFQO0FBQ0Q7QUFDQTs7OzsyQkFDRztBQUNKLFVBQUcsS0FBS0YsT0FBTCxFQUFILEVBQWtCO0FBQ2hCLGVBQU9DLFNBQVA7QUFDRDtBQUNELGFBQU8sS0FBS1IsS0FBTCxDQUFXLEtBQUtNLEtBQUwsR0FBYSxDQUF4QixDQUFQO0FBQ0Q7Ozs0QkFDTTtBQUNMLFdBQUtOLEtBQUwsR0FBYSxFQUFiO0FBQ0EsV0FBS00sS0FBTCxHQUFhLENBQWI7QUFDRDtBQUNEOzs7OytCQUNXO0FBQ1QsVUFBSSxLQUFLQyxPQUFMLEVBQUosRUFBb0I7QUFDcEIsZUFBTyxFQUFQO0FBQ0M7QUFDRCxVQUFJRyxpQkFBZSxLQUFLVixLQUFMLENBQVcsQ0FBWCxDQUFuQixDQUpTLENBSTJCO0FBQ3BDLFdBQUssSUFBSVcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtMLEtBQXpCLEVBQWdDSyxHQUFoQyxFQUFxQztBQUFFO0FBQ3ZDRCxvQkFBZUEsU0FBZixTQUE0QixLQUFLVixLQUFMLENBQVdXLENBQVgsQ0FBNUIsQ0FEcUMsQ0FDUTtBQUM1QztBQUNELGFBQU9ELFNBQVA7QUFDQzs7Ozs7O1FBRUVYLEssR0FBQUEsSztRQUFNTSxRLEdBQUFBLFEiLCJmaWxlIjoiLi9zcmMvc3RhY2suanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmoIgg5ZCO6L+b5YWI5Ye6XHJcbmNsYXNzIFN0YWNre1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLml0ZW1zID0gW11cclxuICB9XHJcbiAgLy8g5ZCR5qCI5Lit5re75Yqg5paw5YWD57SgXHJcbiAgcHVzaChpdGVtKXtcclxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKVxyXG4gIH1cclxuICAvLyDku47moIjkuK3np7vpmaTlhYPntKDvvIznp7vpmaTmnIDlkI7nmoTkuIDkuKrlhYPntKBcclxuICBwb3AoKXtcclxuICAgIHJldHVybiB0aGlzLml0ZW1zLnBvcCgpXHJcbiAgfVxyXG4gIC8vIOafpeeci+agiOmhtuWFg+e0oFxyXG4gIHBlZWsoKXtcclxuICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV0gIFxyXG4gIH1cclxuICAvLyDmo4Dmn6XmoIjmmK/lkKbkuLrnqbpcclxuICBpc0VtcHR5KCl7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPT09IDBcclxuICB9XHJcbiAgLy8g5qCI55qE6ZW/5bqmXHJcbiAgc2l6ZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoXHJcbiAgfVxyXG4gIC8vIOa4hemZpOagiOWFg+e0oFxyXG4gIGNsZWFyKCl7XHJcbiAgICB0aGlzLml0ZW1zID0gW11cclxuICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBuZXdTdGFja3tcclxuICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgdGhpcy5jb3VudCA9IDBcclxuICAgICAgIHRoaXMuaXRlbXMgPSB7fVxyXG4gICAgIH1cclxuICAvLyDlkJHmoIjkuK3mt7vliqDmlrDlhYPntKBcclxuICAgICBwdXNoKGl0ZW0pe1xyXG4gICAgICAgdGhpcy5pdGVtc1t0aGlzLmNvdW50XSA9IGl0ZW1cclxuICAgICAgIHRoaXMuY291bnQrK1xyXG4gICAgIH1cclxuICAvLyDmoIjnmoTplb/luqZcclxuICAgICBzaXplKCl7XHJcbiAgICAgICByZXR1cm4gdGhpcy5jb3VudFxyXG4gICAgIH1cclxuICAvLyDmo4Dmn6XmoIjmmK/lkKbkuLrnqbpcclxuICAgICBpc0VtcHR5KCl7XHJcbiAgICAgICByZXR1cm4gdGhpcy5jb3VudCA9PT0gMFxyXG4gICAgIH1cclxuICAgIC8vIOS7juagiOS4reenu+mZpOWFg+e0oO+8jOenu+mZpOacgOWQjueahOS4gOS4quWFg+e0oCzlubblj5blh7rov5nkuKrlhYPntKDnmoTlgLxcclxuICAgIHBvcCgpe1xyXG4gICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY291bnQtLVxyXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5pdGVtc1t0aGlzLmNvdW50XVxyXG4gICAgICBkZWxldGUgdGhpcy5pdGVtc1t0aGlzLmNvdW50XVxyXG4gICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcbiAgICAgLy8g5p+l55yL5qCI6aG25YWD57SgXHJcbiAgcGVlaygpe1xyXG4gICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtc1t0aGlzLmNvdW50IC0gMV0gIFxyXG4gIH1cclxuICBjbGVhcigpe1xyXG4gICAgdGhpcy5pdGVtcyA9IHt9XHJcbiAgICB0aGlzLmNvdW50ID0gMFxyXG4gIH1cclxuICAvL+i/meS4quagiOeahHRvU3RyaW5nIOaWueazlVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgb2JqU3RyaW5nID0gYCR7dGhpcy5pdGVtc1swXX1gOyAvLyB7MX1cclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7IC8vIHsyfVxyXG4gICAgb2JqU3RyaW5nID0gYCR7b2JqU3RyaW5nfSwke3RoaXMuaXRlbXNbaV19YDsgLy8gezN9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqU3RyaW5nO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHtTdGFjayxuZXdTdGFja30iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/stack.js\n");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction defaultEquals(a, b) {\n  return a === b;\n}\n\nvar Node = function Node(item) {\n  _classCallCheck(this, Node);\n\n  this.item = item;\n  this.next = undefined;\n  this.prev = undefined;\n};\n\nexports.defaultEquals = defaultEquals;\nexports.Node = Node;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcz9lMGViIl0sIm5hbWVzIjpbImRlZmF1bHRFcXVhbHMiLCJhIiwiYiIsIk5vZGUiLCJpdGVtIiwibmV4dCIsInVuZGVmaW5lZCIsInByZXYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsU0FBU0EsYUFBVCxDQUF1QkMsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTRCO0FBQ3pCLFNBQU9ELE1BQU1DLENBQWI7QUFDRjs7SUFDS0MsSSxHQUNKLGNBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFDZixPQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLQyxJQUFMLEdBQVlDLFNBQVo7QUFDQSxPQUFLQyxJQUFMLEdBQVlELFNBQVo7QUFDRCxDOztRQUVJTixhLEdBQUFBLGE7UUFBY0csSSxHQUFBQSxJIiwiZmlsZSI6Ii4vc3JjL3V0aWwuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpe1xyXG4gICByZXR1cm4gYSA9PT0gYlxyXG59XHJcbmNsYXNzIE5vZGV7XHJcbiAgY29uc3RydWN0b3IoaXRlbSl7XHJcbiAgICB0aGlzLml0ZW0gPSBpdGVtXHJcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWRcclxuICAgIHRoaXMucHJldiA9IHVuZGVmaW5lZFxyXG4gIH1cclxufVxyXG5leHBvcnR7ZGVmYXVsdEVxdWFscyxOb2RlfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/util.js\n");

/***/ })

/******/ });