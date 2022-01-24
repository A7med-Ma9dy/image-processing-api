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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const processing_1 = __importDefault(require("./processing"));
class control {
    //image paths
    static getImagePath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename) {
                return null;
            }
            const filePath = params.width && params.height
                ? path_1.default.resolve(control.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`)
                : path_1.default.resolve(control.imagesFullPath, `${params.filename}.jpg`);
            try {
                yield fs_1.promises.access(filePath); //check if file exists
                return filePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    //image availability check
    static isImageAvailable(filename = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false;
            }
            return (yield control.getAvailableImageNames()).includes(filename);
        });
    }
    //Get  Images available
    static getAvailableImageNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(control.imagesFullPath)).map((filename) => filename.split(".")[0]);
            }
            catch (_a) {
                return [];
            }
        });
    }
    //check if there was a thumb created for image
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return false;
            }
            const filePath = path_1.default.resolve(control.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(control.imagesThumbPath);
            }
            catch (_a) {
                fs_1.promises.mkdir(control.imagesThumbPath);
            }
        });
    }
    //create a thumb file
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return null;
            }
            const filePathFull = path_1.default.resolve(control.imagesFullPath, `${params.filename}.jpg`);
            const filePathThumb = path_1.default.resolve(control.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            console.log(`Creating thumb ${filePathThumb}`);
            // Resize & store as thumb
            return yield (0, processing_1.default)({
                source: filePathFull,
                target: filePathThumb,
                width: parseInt(params.width),
                height: parseInt(params.height),
            });
        });
    }
}
exports.default = control;
// Default paths
control.imagesFullPath = path_1.default.resolve(__dirname, "../images/full");
control.imagesThumbPath = path_1.default.resolve(__dirname, "../images/thumb");
