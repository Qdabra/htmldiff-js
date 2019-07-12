(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HtmlDiff"] = factory();
	else
		root["HtmlDiff"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Action.js
var Action = {
  equal: 0,
  "delete": 1,
  insert: 2,
  none: 3,
  replace: 4
};
/* harmony default export */ var src_Action = (Action);
// CONCATENATED MODULE: ./src/Match.js
function Match_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Match_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Match_createClass(Constructor, protoProps, staticProps) { if (protoProps) Match_defineProperties(Constructor.prototype, protoProps); if (staticProps) Match_defineProperties(Constructor, staticProps); return Constructor; }

var Match =
/*#__PURE__*/
function () {
  function Match(startInOld, startInNew, size) {
    Match_classCallCheck(this, Match);

    this.startInOld = startInOld;
    this.startInNew = startInNew;
    this.size = size;
  }

  Match_createClass(Match, [{
    key: "endInOld",
    get: function get() {
      return this.startInOld + this.size;
    }
  }, {
    key: "endInNew",
    get: function get() {
      return this.startInNew + this.size;
    }
  }]);

  return Match;
}();


;
// CONCATENATED MODULE: ./src/MatchOptions.js
function MatchOptions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatchOptions = function MatchOptions() {
  MatchOptions_classCallCheck(this, MatchOptions);

  this.blockSize = 0;
  this.repeatingWordsAccuracy = 0.0;
  this.ignoreWhitespaceDifferences = false;
};


// CONCATENATED MODULE: ./src/Utils.js
var tagRegex = /^\s*<\/?[^>]+>\s*$/;
var tagWordRegex = /<[^\s>]+/;
var whitespaceRegex = /^(\s|&nbsp;)+$/;
var wordRegex = /[\w\#@]+/;
var specialCaseWordTags = ['<img'];

function isTag(item) {
  if (specialCaseWordTags.some(function (re) {
    return item !== null && item.startsWith(re);
  })) {
    return false;
  }

  return tagRegex.test(item);
}

function stripTagAttributes(word) {
  var tag = tagWordRegex.exec(word)[0];
  word = tag + (word.endsWith("/>") ? "/>" : ">");
  return word;
}

function wrapText(text, tagName, cssClass) {
  return ['<', tagName, ' class="', cssClass, '">', text, '</', tagName, '>'].join('');
}

function isStartOfTag(val) {
  return val === '<';
}

function isEndOfTag(val) {
  return val === '>';
}

function isStartOfEntity(val) {
  return val === '&';
}

function isEndOfEntity(val) {
  return val === ';';
}

function isWhiteSpace(value) {
  return whitespaceRegex.test(value);
}

function stripAnyAttributes(word) {
  if (isTag(word)) {
    return stripTagAttributes(word);
  }

  return word;
}

function isWord(text) {
  return wordRegex.test(text);
}


// CONCATENATED MODULE: ./src/MatchFinder.js
function MatchFinder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MatchFinder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MatchFinder_createClass(Constructor, protoProps, staticProps) { if (protoProps) MatchFinder_defineProperties(Constructor.prototype, protoProps); if (staticProps) MatchFinder_defineProperties(Constructor, staticProps); return Constructor; }





function MatchFinder_putNewWord(block, word, blockSize) {
  block.push(word);

  if (block.length > blockSize) {
    block.shift();
  }

  if (block.length !== blockSize) {
    return null;
  }

  return block.join('');
} // Finds the longest match in given texts. It uses indexing with fixed granularity that is used to compare blocks of text.


var MatchFinder_MatchFinder =
/*#__PURE__*/
function () {
  function MatchFinder(oldWords, newWords, startInOld, endInOld, startInNew, endInNew, options) {
    MatchFinder_classCallCheck(this, MatchFinder);

    this.oldWords = oldWords;
    this.newWords = newWords;
    this.startInOld = startInOld;
    this.endInOld = endInOld;
    this.startInNew = startInNew;
    this.endInNew = endInNew;
    this.options = options;
  }

  MatchFinder_createClass(MatchFinder, [{
    key: "indexNewWords",
    value: function indexNewWords() {
      this.wordIndices = new Map();
      var block = [];

      for (var i = this.startInNew; i < this.endInNew; i++) {
        // if word is a tag, we should ignore attributes as attribute changes are not supported (yet)
        var word = this.normalizeForIndex(this.newWords[i]);
        var key = MatchFinder_putNewWord(block, word, this.options.blockSize);

        if (key === null) {
          continue;
        }

        if (this.wordIndices.has(key)) {
          this.wordIndices.get(key).push(i);
        } else {
          this.wordIndices.set(key, [i]);
        }
      }
    } // Converts the word to index-friendly value so it can be compared with other similar words

  }, {
    key: "normalizeForIndex",
    value: function normalizeForIndex(word) {
      word = stripAnyAttributes(word);

      if (this.options.IgnoreWhiteSpaceDifferences && isWhiteSpace(word)) {
        return ' ';
      }

      return word;
    }
  }, {
    key: "findMatch",
    value: function findMatch() {
      this.indexNewWords();
      this.removeRepeatingWords();

      if (this.wordIndices.length === 0) {
        return null;
      }

      var bestMatchInOld = this.startInOld;
      var bestMatchInNew = this.startInNew;
      var bestMatchSize = 0;
      var matchLengthAt = new Map();
      var blockSize = this.options.blockSize;
      var block = [];

      for (var indexInOld = this.startInOld; indexInOld < this.endInOld; indexInOld++) {
        var word = this.normalizeForIndex(this.oldWords[indexInOld]);
        var index = MatchFinder_putNewWord(block, word, blockSize);

        if (index === null) {
          continue;
        }

        var newMatchLengthAt = new Map();

        if (!this.wordIndices.has(index)) {
          matchLengthAt = newMatchLengthAt;
          continue;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.wordIndices.get(index)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var indexInNew = _step.value;
            var newMatchLength = (matchLengthAt.has(indexInNew - 1) ? matchLengthAt.get(indexInNew - 1) : 0) + 1;
            newMatchLengthAt.set(indexInNew, newMatchLength);

            if (newMatchLength > bestMatchSize) {
              bestMatchInOld = indexInOld - newMatchLength - blockSize + 2;
              bestMatchInNew = indexInNew - newMatchLength - blockSize + 2;
              bestMatchSize = newMatchLength;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        matchLengthAt = newMatchLengthAt;
      }

      return bestMatchSize !== 0 ? new Match(bestMatchInOld, bestMatchInNew, bestMatchSize + blockSize - 1) : null;
    } // This method removes words that occur too many times. This way it reduces total count of comparison operations
    // and as result the diff algoritm takes less time. But the side effect is that it may detect false differences of
    // the repeating words.

  }, {
    key: "removeRepeatingWords",
    value: function removeRepeatingWords() {
      var threshold = this.newWords.length + this.options.repeatingWordsAccuracy;
      var repeatingWords = Array.from(this.wordIndices.entries()).filter(function (i) {
        return i[1].length > threshold;
      }).map(function (i) {
        return i[0];
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = repeatingWords[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var w = _step2.value;
          this.wordIndices["delete"](w);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return MatchFinder;
}();


// CONCATENATED MODULE: ./src/Operation.js
function Operation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operation = function Operation(action, startInOld, endInOld, startInNew, endInNew) {
  Operation_classCallCheck(this, Operation);

  this.action = action;
  this.startInOld = startInOld;
  this.endInOld = endInOld;
  this.startInNew = startInNew;
  this.endInNew = endInNew;
};


// CONCATENATED MODULE: ./src/Mode.js
var Mode = {
  character: 0,
  tag: 1,
  whitespace: 2,
  entity: 3
};
/* harmony default export */ var src_Mode = (Mode);
// CONCATENATED MODULE: ./src/WordSplitter.js



function WordSplitter_convertHtmlToListOfWords(text, blockExpressions) {
  var state = {
    mode: src_Mode.character,
    currentWord: [],
    words: []
  };
  var blockLocations = WordSplitter_findBlocks(text, blockExpressions);
  var isBlockCheckRequired = !!blockLocations.size;
  var isGrouping = false;
  var groupingUntil = -1;

  for (var i = 0; i < text.length; i++) {
    var character = text[i]; // Don't bother executing block checks if we don't have any blocks to check for!

    if (isBlockCheckRequired) {
      // Check if we have completed grouping a text sequence/block
      if (groupingUntil === index) {
        groupingUntil = -1;
        isGrouping = false;
      } // Check if we need to group the next text sequence/block


      var until = 0;

      if (blockLocations.has(index)) {
        until = blockLocations.get(index);
        isGrouping = true;
        groupingUntil = until;
      } // if we are grouping, then we don't care about what type of character we have, it's going to be treated as a word


      if (isGrouping) {
        state.currentWord.push(character);
        state.mode = src_Mode.character;
        continue;
      }
    }

    switch (state.mode) {
      case src_Mode.character:
        if (isStartOfTag(character)) {
          WordSplitter_addClearWordSwitchMode(state, '<', src_Mode.tag);
        } else if (isStartOfEntity(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.entity);
        } else if (isWhiteSpace(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.whitespace);
        } else if (isWord(character) && (state.currentWord.length === 0 || isWord(state.currentWord[state.currentWord.length - 1]))) {
          state.currentWord.push(character);
        } else {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.character);
        }

        break;

      case src_Mode.tag:
        if (isEndOfTag(character)) {
          state.currentWord.push(character);
          state.words.push(state.currentWord.join(''));
          state.currentWord = [];
          state.mode = isWhiteSpace(character) ? src_Mode.whitespace : src_Mode.character;
        } else {
          state.currentWord.push(character);
        }

        break;

      case src_Mode.whitespace:
        if (isStartOfTag(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.tag);
        } else if (isStartOfEntity(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.entity);
        } else if (isWhiteSpace(character)) {
          state.currentWord.push(character);
        } else {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.character);
        }

        break;

      case src_Mode.entity:
        if (isStartOfTag(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.tag);
        } else if (isWhiteSpace(character)) {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.whitespace);
        } else if (isEndOfEntity(character)) {
          var switchToNextMode = true;

          if (state.currentWord.length !== 0) {
            state.currentWord.push(character);
            state.words.push(state.currentWord.join('')); //join &nbsp; entity with last whitespace

            if (state.words.length > 2 && isWhiteSpace(state.words[state.words.length - 2]) && isWhiteSpace(state.words[state.words.length - 1])) {
              var w1 = state.words[state.words.length - 2];
              var w2 = state.words[state.words.length - 1];
              state.words.splice(state.words.length - 2, 2);
              state.currentWord = [(w1 + w2).split()];
              state.mode = src_Mode.whitespace;
              switchToNextMode = false;
            }
          }

          if (switchToNextMode) {
            state.currentWord = [];
            state.mode = src_Mode.character;
          }
        } else if (isWord(character)) {
          state.currentWord.push(character);
        } else {
          WordSplitter_addClearWordSwitchMode(state, character, src_Mode.character);
        }

        break;
    }
  }

  if (state.currentWord.length !== 0) {
    state.words.push(state.currentWord.join(''));
  }

  return state.words;
}

function WordSplitter_addClearWordSwitchMode(state, character, mode) {
  if (state.currentWord.length !== 0) {
    state.words.push(state.currentWord.join(''));
  }

  state.currentWord = [character];
  state.mode = mode;
}

function WordSplitter_findBlocks(text, blockExpressions) {
  var blockLocations = new Map();

  if (blockExpressions === null) {
    return blockLocations;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = blockExpressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var exp = _step.value;
      var m = void 0;

      while ((m = exp.exec(text)) !== null) {
        if (blockLocations.has(m.index)) {
          throw new Error("One or more block expressions result in a text sequence that overlaps. Current expression: " + exp.toString());
        }

        blockLocations.set(m.index, m.index + m[0].length);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return blockLocations;
}


// CONCATENATED MODULE: ./src/Diff.js
function Diff_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Diff_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Diff_createClass(Constructor, protoProps, staticProps) { if (protoProps) Diff_defineProperties(Constructor.prototype, protoProps); if (staticProps) Diff_defineProperties(Constructor, staticProps); return Constructor; }







 // This value defines balance between speed and memory utilization. The higher it is the faster it works and more memory consumes.

var Diff_MatchGranuarityMaximum = 4;
var Diff_specialCaseClosingTags = new Map([['</strong>', 0], ['</em>', 0], ['</b>', 0], ['</i>', 0], ['</big>', 0], ['</small>', 0], ['</u>', 0], ['</sub>', 0], ['</strike>', 0], ['</s>', 0], ['</dfn>', 0]]);
var Diff_specialCaseOpeningTagRegex = /<((strong)|(b)|(i)|(dfn)|(em)|(big)|(small)|(u)|(sub)|(sup)|(strike)|(s))[\>\s]+/ig;

var Diff_HtmlDiff =
/*#__PURE__*/
function () {
  function HtmlDiff(oldText, newText) {
    Diff_classCallCheck(this, HtmlDiff);

    this.content = [];
    this.newText = newText;
    this.oldText = oldText;
    this.specialTagDiffStack = [];
    this.newWords = [];
    this.oldWords = [];
    this.matchGranularity = 0;
    this.blockExpressions = [];
    this.repeatingWordsAccuracy = 1.0;
    this.ignoreWhiteSpaceDifferences = false;
    this.orphanMatchThreshold = 0.0;
  }

  Diff_createClass(HtmlDiff, [{
    key: "build",
    value: function build() {
      if (this.oldText === this.newText) {
        return this.newText;
      }

      this.splitInputsIntoWords();
      this.matchGranularity = Math.min(Diff_MatchGranuarityMaximum, this.oldWords.length, this.newWords.length);
      var operations = this.operations();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = operations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          this.performOperation(item);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.content.join('');
    }
  }, {
    key: "addBlockExpression",
    value: function addBlockExpression(exp) {
      this.blockExpressions.push(exp);
    }
  }, {
    key: "splitInputsIntoWords",
    value: function splitInputsIntoWords() {
      this.oldWords = WordSplitter_convertHtmlToListOfWords(this.oldText, this.blockExpressions); //free memory, allow it for GC

      this.oldText = null;
      this.newWords = WordSplitter_convertHtmlToListOfWords(this.newText, this.blockExpressions); //free memory, allow it for GC

      this.newText = null;
    }
  }, {
    key: "performOperation",
    value: function performOperation(opp) {
      switch (opp.action) {
        case src_Action.equal:
          this.processEqualOperation(opp);
          break;

        case src_Action["delete"]:
          this.processDeleteOperation(opp, "diffdel");
          break;

        case src_Action.insert:
          this.processInsertOperation(opp, "diffins");
          break;

        case src_Action.none:
          break;

        case src_Action.replace:
          this.processReplaceOperation(opp);
          break;
      }
    }
  }, {
    key: "processReplaceOperation",
    value: function processReplaceOperation(opp) {
      this.processDeleteOperation(opp, "diffmod");
      this.processInsertOperation(opp, "diffmod");
    }
  }, {
    key: "processInsertOperation",
    value: function processInsertOperation(opp, cssClass) {
      var text = this.newWords.filter(function (s, pos) {
        return pos >= opp.startInNew && pos < opp.endInNew;
      });
      this.insertTag("ins", cssClass, text);
    }
  }, {
    key: "processDeleteOperation",
    value: function processDeleteOperation(opp, cssClass) {
      var text = this.oldWords.filter(function (s, pos) {
        return pos >= opp.startInOld && pos < opp.endInOld;
      });
      this.insertTag("del", cssClass, text);
    }
  }, {
    key: "processEqualOperation",
    value: function processEqualOperation(opp) {
      var result = this.newWords.filter(function (s, pos) {
        return pos >= opp.startInNew && pos < opp.endInNew;
      });
      this.content.push(result.join(''));
    }
  }, {
    key: "insertTag",
    value: function insertTag(tag, cssClass, words) {
      while (words.length) {
        var nonTags = this.extractConsecutiveWords(words, function (x) {
          return !isTag(x);
        });
        var specialCaseTagInjection = '';
        var specialCaseTagInjectionIsbefore = false;

        if (nonTags.length !== 0) {
          var text = wrapText(nonTags.join(''), tag, cssClass);
          this.content.push(text);
        } else {
          if (Diff_specialCaseOpeningTagRegex.test(words[0])) {
            this.specialTagDiffStack.push(words[0]);
            specialCaseTagInjection = '<ins class="mod">';

            if (tag === 'del') {
              words.shift();

              while (words.length > 0 && Diff_specialCaseOpeningTagRegex.test(words[0])) {
                words.shift();
              }
            }
          } else if (Diff_specialCaseClosingTags.has(words[0])) {
            var openingTag = this.specialTagDiffStack.length === 0 ? null : this.specialTagDiffStack.pop();

            if (!(openingTag === null || openingTag !== words[0].replace(/\//g, ''))) {
              specialCaseTagInjection = '</ins>';
              specialCaseTagInjectionIsbefore = true;
            }

            if (tag === 'del') {
              words.shift();

              while (words.length > 0 && Diff_specialCaseClosingTags.has(words[0])) {
                words.shift();
              }
            }
          }

          if (words.length === 0 && specialCaseTagInjection.length === 0) {
            break;
          }

          if (specialCaseTagInjectionIsbefore) {
            this.content.push(specialCaseTagInjection + this.extractConsecutiveWords(words, isTag).join(''));
          } else {
            this.content.push(this.extractConsecutiveWords(words, isTag).join('') + specialCaseTagInjection);
          }
        }
      }
    }
  }, {
    key: "extractConsecutiveWords",
    value: function extractConsecutiveWords(words, condition) {
      var indexOfFirstTag = null;

      for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (i === 0 && word === ' ') {
          words[i] = '&nbsp;';
        }

        if (!condition(word)) {
          indexOfFirstTag = i;
          break;
        }
      }

      if (indexOfFirstTag !== null) {
        var items = words.filter(function (s, pos) {
          return pos >= 0 && pos < indexOfFirstTag;
        });

        if (indexOfFirstTag > 0) {
          words.splice(0, indexOfFirstTag);
        }

        return items;
      } else {
        var _items = words.filter(function (s, pos) {
          return pos >= 0 && pos < words.length;
        });

        words.splice(0, words.length);
        return _items;
      }
    }
  }, {
    key: "operations",
    value: function operations() {
      var positionInOld = 0;
      var positionInNew = 0;
      var operations = [];
      var matches = this.matchingBlocks();
      matches.push(new Match(this.oldWords.length, this.newWords.length, 0));
      var matchesWithoutOrphans = this.removeOrphans(matches);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = matchesWithoutOrphans[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var match = _step2.value;
          var matchStartsAtCurrentPositionInOld = positionInOld === match.startInOld;
          var matchStartsAtCurrentPositionInNew = positionInNew === match.startInNew;
          var action = void 0;

          if (!matchStartsAtCurrentPositionInOld && !matchStartsAtCurrentPositionInNew) {
            action = src_Action.replace;
          } else if (matchStartsAtCurrentPositionInOld && !matchStartsAtCurrentPositionInNew) {
            action = src_Action.insert;
          } else if (!matchStartsAtCurrentPositionInOld) {
            action = src_Action["delete"];
          } else {
            action = src_Action.none;
          }

          if (action !== src_Action.none) {
            operations.push(new Operation(action, positionInOld, match.startInOld, positionInNew, match.startInNew));
          }

          if (match.length !== 0) {
            operations.push(new Operation(src_Action.equal, match.startInOld, match.endInOld, match.startInNew, match.endInNew));
          }

          positionInOld = match.endInOld;
          positionInNew = match.endInNew;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return operations;
    }
  }, {
    key: "removeOrphans",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function removeOrphans(matches) {
      var prev, curr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, next, tmp, sumLength, oldDistanceInChars, newDistanceInChars, currMatchLengthInChars;

      return regeneratorRuntime.wrap(function removeOrphans$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prev = null;
              curr = null;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 5;
              _iterator3 = matches[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 31;
                break;
              }

              next = _step3.value;

              if (!(curr === null)) {
                _context.next = 13;
                break;
              }

              prev = new Match(0, 0, 0);
              curr = next;
              return _context.abrupt("continue", 28);

            case 13:
              if (!(prev.endInOld === curr.startInOld && prev.endInNew === curr.startInNew || curr.endInOld === next.startInOld && curr.endInNew === next.startInNew)) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return curr;

            case 16:
              tmp = prev = curr; // "let tmp" avoids babel traspiling error

              curr = next;
              return _context.abrupt("continue", 28);

            case 19:
              sumLength = function sumLength(t, n) {
                return t + n.length;
              };

              oldDistanceInChars = this.oldWords.slice(prev.endInOld, next.startInOld).reduce(sumLength, 0);
              newDistanceInChars = this.newWords.slice(prev.endInNew, next.startInNew).reduce(sumLength, 0);
              currMatchLengthInChars = this.newWords.slice(curr.startInNew, curr.endInNew).reduce(sumLength, 0);

              if (!(currMatchLengthInChars > Math.max(oldDistanceInChars, newDistanceInChars) * this.orphanMatchThreshold)) {
                _context.next = 26;
                break;
              }

              _context.next = 26;
              return curr;

            case 26:
              prev = curr;
              curr = next;

            case 28:
              _iteratorNormalCompletion3 = true;
              _context.next = 7;
              break;

            case 31:
              _context.next = 37;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](5);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 37:
              _context.prev = 37;
              _context.prev = 38;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 40:
              _context.prev = 40;

              if (!_didIteratorError3) {
                _context.next = 43;
                break;
              }

              throw _iteratorError3;

            case 43:
              return _context.finish(40);

            case 44:
              return _context.finish(37);

            case 45:
              _context.next = 47;
              return curr;

            case 47:
            case "end":
              return _context.stop();
          }
        }
      }, removeOrphans, this, [[5, 33, 37, 45], [38,, 40, 44]]);
    })
  }, {
    key: "matchingBlocks",
    value: function matchingBlocks() {
      var matchingBlocks = [];
      this.findMatchingBlocks(0, this.oldWords.length, 0, this.newWords.length, matchingBlocks);
      return matchingBlocks;
    }
  }, {
    key: "findMatchingBlocks",
    value: function findMatchingBlocks(startInOld, endInOld, startInNew, endInNew, matchingBlocks) {
      var match = this.findMatch(startInOld, endInOld, startInNew, endInNew);

      if (match !== null) {
        if (startInOld < match.startInOld && startInNew < match.startInNew) {
          this.findMatchingBlocks(startInOld, match.startInOld, startInNew, match.startInNew, matchingBlocks);
        }

        matchingBlocks.push(match);

        if (match.endInOld < endInOld && match.endInNew < endInNew) {
          this.findMatchingBlocks(match.endInOld, endInOld, match.endInNew, endInNew, matchingBlocks);
        }
      }
    }
  }, {
    key: "findMatch",
    value: function findMatch(startInOld, endInOld, startInNew, endInNew) {
      for (var i = this.matchGranularity; i > 0; i--) {
        var options = new MatchOptions();
        options.blockSize = i;
        options.repeatingWordsAccuracy = this.repeatingWordsAccuracy;
        options.ignoreWhitespaceDifferences = this.ignoreWhiteSpaceDifferences;
        var finder = new MatchFinder_MatchFinder(this.oldWords, this.newWords, startInOld, endInOld, startInNew, endInNew, options);
        var match = finder.findMatch();

        if (match !== null) {
          return match;
        }
      }

      return null;
    }
  }]);

  return HtmlDiff;
}();

Diff_HtmlDiff.execute = function (oldText, newText) {
  return new Diff_HtmlDiff(oldText, newText).build();
};

/* harmony default export */ var Diff = __webpack_exports__["default"] = (Diff_HtmlDiff);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});