"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("./mongodb"));
var Restaurant_1 = __importDefault(require("./models/Restaurant"));
var Category_1 = __importDefault(require("./models/Category"));
var MenuItem_1 = __importDefault(require("./models/MenuItem"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
// Read seed data from JSON file
var seedDataPath = path.join(__dirname, 'seedData.json');
var seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var createdCategories, categoryIdMap_1, _loop_1, _i, _a, restaurant, totalMenuItems, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    console.log('🌱 Starting database seeding...');
                    // Connect to database
                    return [4 /*yield*/, (0, mongodb_1.default)()];
                case 1:
                    // Connect to database
                    _b.sent();
                    // Clear existing data
                    console.log('🗑️  Clearing existing data...');
                    return [4 /*yield*/, Restaurant_1.default.deleteMany({})];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Category_1.default.deleteMany({})];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, MenuItem_1.default.deleteMany({})];
                case 4:
                    _b.sent();
                    // Seed categories
                    console.log('📁 Seeding categories...');
                    return [4 /*yield*/, Category_1.default.insertMany(seedData.categories)];
                case 5:
                    createdCategories = _b.sent();
                    categoryIdMap_1 = {};
                    createdCategories.forEach(function (cat) {
                        categoryIdMap_1[cat.id] = cat._id.toString();
                    });
                    console.log("\u2705 Seeded ".concat(seedData.categories.length, " categories"));
                    // Seed restaurants and menu items
                    console.log('🍽️  Seeding restaurants and menu items...');
                    _loop_1 = function (restaurant) {
                        var menuItems, menu, restaurantData, createdRestaurant, menuItemsWithIds;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    menuItems = restaurant.menu;
                                    menu = restaurant.menu, restaurantData = __rest(restaurant, ["menu"]);
                                    return [4 /*yield*/, Restaurant_1.default.create(restaurantData)];
                                case 1:
                                    createdRestaurant = _c.sent();
                                    menuItemsWithIds = menuItems.map(function (item) { return (__assign(__assign({}, item), { restaurantId: createdRestaurant._id.toString(), categoryId: categoryIdMap_1[item.categoryId] || item.categoryId })); });
                                    // Debug: log the first menu item to verify IDs
                                    if (menuItemsWithIds.length > 0) {
                                        console.log("    DEBUG: First menu item restaurantId: ".concat(menuItemsWithIds[0].restaurantId));
                                        console.log("    DEBUG: First menu item categoryId: ".concat(menuItemsWithIds[0].categoryId));
                                    }
                                    return [4 /*yield*/, MenuItem_1.default.insertMany(menuItemsWithIds)];
                                case 2:
                                    _c.sent();
                                    console.log("  \u2705 Seeded ".concat(restaurant.name, " with ").concat(menuItems.length, " menu items"));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = seedData.restaurants;
                    _b.label = 6;
                case 6:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    restaurant = _a[_i];
                    return [5 /*yield**/, _loop_1(restaurant)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log('\n🎉 Database seeding completed successfully!');
                    console.log("\uD83D\uDCCA Summary:");
                    console.log("   - ".concat(seedData.categories.length, " categories"));
                    console.log("   - ".concat(seedData.restaurants.length, " restaurants"));
                    totalMenuItems = seedData.restaurants.reduce(function (sum, r) { return sum + r.menu.length; }, 0);
                    console.log("   - ".concat(totalMenuItems, " menu items"));
                    process.exit(0);
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    console.error('❌ Error seeding database:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
seed();
