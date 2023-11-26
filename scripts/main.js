import { DomService } from "./Services/Dom.service.js";
import { LocalStorageService } from "./Services/LocalStorage.service.js";

const storage = new LocalStorageService();

const dom = new DomService(storage);