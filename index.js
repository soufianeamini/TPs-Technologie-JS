#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = require("@inquirer/prompts");
function get(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function loadPokemon(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(url)];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
function loadPokemons() {
    return __awaiter(this, void 0, void 0, function () {
        var url, result, pokemons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
                    return [4 /*yield*/, get(url)];
                case 1:
                    result = _a.sent();
                    pokemons = result.results;
                    return [2 /*return*/, pokemons];
            }
        });
    });
}
function selectPokemon(pokemons) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonFound, finalPokemon, _loop_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pokemonFound = false;
                    finalPokemon = undefined;
                    _loop_1 = function () {
                        var pokemonName;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, (0, prompts_1.input)({
                                        message: "What pokemon do you want to use?",
                                    })];
                                case 1:
                                    pokemonName = _b.sent();
                                    finalPokemon = pokemons.find(function (p) { return p.name === pokemonName.toLowerCase(); });
                                    if (!finalPokemon) return [3 /*break*/, 3];
                                    console.log("Pokemon found!");
                                    console.log({ pokemon: finalPokemon });
                                    console.log("Do you want to use this pokemon?");
                                    return [4 /*yield*/, (0, prompts_1.select)({
                                            message: "Do you want to use this pokemon?",
                                            choices: [
                                                { name: "yes", value: true },
                                                { name: "no", value: false },
                                            ],
                                        })];
                                case 2:
                                    pokemonFound = _b.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    finalPokemon = pokemons.find(function (p) {
                                        return p.name.includes(pokemonName.toLowerCase());
                                    });
                                    if (!finalPokemon) return [3 /*break*/, 5];
                                    console.log("Similarly named Pokemon found!");
                                    console.log({ pokemon: finalPokemon });
                                    return [4 /*yield*/, (0, prompts_1.select)({
                                            message: "Did you mean to choose ".concat(finalPokemon.name, "?"),
                                            choices: [
                                                { name: "yes", value: true },
                                                { name: "no", value: false },
                                            ],
                                        })];
                                case 4:
                                    pokemonFound = _b.sent();
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!!pokemonFound) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, finalPokemon];
            }
        });
    });
}
function loadAttack(pokemon) {
    return __awaiter(this, void 0, void 0, function () {
        var stat, charac;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(pokemon.stats.find(function (stat) { return stat.stat.name === "attack"; }).stat.url)];
                case 1:
                    stat = _a.sent();
                    return [4 /*yield*/, get(stat.characteristics[1].url)];
                case 2:
                    charac = _a.sent();
                    return [2 /*return*/, charac.possible_values.pop()];
            }
        });
    });
}
function getRandom(list) {
    var index = Math.floor(Math.random() * list.length);
    var value = list[index];
    list.splice(index, index + 1);
    return value;
}
function loadMoves(pokemon) {
    return __awaiter(this, void 0, void 0, function () {
        var moveDataArray, i, move, promises, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    moveDataArray = [];
                    for (i = 0; i < 5; i++) {
                        move = getRandom(pokemon.moves);
                        moveDataArray.push(move);
                    }
                    promises = moveDataArray.map(function (move) { return get(move.move.url); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var pokemons, selectedPokemon, activePokemon, moves, opponentPokemon, player, enemy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Please wait, fetching pokemon data from api..");
                    return [4 /*yield*/, loadPokemons()];
                case 1:
                    pokemons = _a.sent();
                    return [4 /*yield*/, selectPokemon(pokemons)];
                case 2:
                    selectedPokemon = _a.sent();
                    return [4 /*yield*/, loadPokemon(selectedPokemon.url)];
                case 3:
                    activePokemon = _a.sent();
                    return [4 /*yield*/, loadMoves(activePokemon)];
                case 4:
                    moves = _a.sent();
                    console.log("Your pokemon is ready to fight. Choosing random pokemon opponent...");
                    return [4 /*yield*/, loadPokemon(getRandom(pokemons).url)];
                case 5:
                    opponentPokemon = _a.sent();
                    console.log("Your opponent is: ", opponentPokemon.name);
                    player = {
                        data: activePokemon,
                        hp: 300,
                        moves: moves,
                    };
                    enemy = {
                        data: opponentPokemon,
                        hp: 300,
                        moves: moves,
                    };
                    runFight(player, enemy);
                    return [2 /*return*/];
            }
        });
    });
}
function runFight(player, enemy) {
    return __awaiter(this, void 0, void 0, function () {
        var i, choices, playerMove, enemyMove;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    i = 1;
                    _c.label = 1;
                case 1:
                    if (!(player.hp > 0 && enemy.hp > 0)) return [3 /*break*/, 3];
                    console.log("---------");
                    console.log("Turn ".concat(i));
                    console.log("---------");
                    i++;
                    choices = player.moves.map(function (move) {
                        var _a;
                        return ({
                            name: "".concat(move.name, " - Power: ").concat((_a = move.power) !== null && _a !== void 0 ? _a : 0),
                            value: move,
                        });
                    });
                    return [4 /*yield*/, (0, prompts_1.select)({ message: "Choose your move", choices: choices })];
                case 2:
                    playerMove = _c.sent();
                    playerMove.pp -= 1;
                    console.log("");
                    console.log("Your pokemon uses ".concat(playerMove.name, "!"));
                    if (Math.random() * 100 <= playerMove.accuracy) {
                        console.log("It deals ".concat((_a = playerMove.power) !== null && _a !== void 0 ? _a : 0, " damage!"));
                        enemy.hp -= playerMove.power;
                        if (enemy.hp < 0)
                            enemy.hp = 0;
                        console.log("Your pokemon hp: ".concat(player.hp, " - Enemy pokemon hp: ").concat(enemy.hp));
                    }
                    else {
                        console.log("Your pokemon misses its attack!");
                    }
                    if (enemy.hp <= 0)
                        return [3 /*break*/, 3];
                    enemyMove = getRandom(enemy.moves.slice());
                    console.log("");
                    console.log("Enemy pokemon ".concat(enemy.data.name, " uses ").concat(enemyMove.name, "!"));
                    if (Math.random() * 100 <= enemyMove.accuracy) {
                        console.log("It deals ".concat((_b = enemyMove.power) !== null && _b !== void 0 ? _b : 0, " damage!"));
                        player.hp -= enemyMove.power;
                        if (player.hp < 0)
                            player.hp = 0;
                        console.log("Your pokemon hp: ".concat(player.hp, " - Enemy pokemon hp: ").concat(enemy.hp));
                    }
                    else {
                        console.log("Enemy pokemon misses its attack!");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    if (player.hp <= 0) {
                        console.log("You lost the fight against", enemy.data.name);
                    }
                    else if (enemy.hp <= 0) {
                        console.log("You won the fight against", enemy.data.name, "with your ", player.data.name, "!");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
