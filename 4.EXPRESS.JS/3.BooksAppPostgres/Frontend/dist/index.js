var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { fetchEvents } from "./events";
const displayEvents = (events) => {
    const productList = document.getElementById("product-list");
    if (!productList)
        return;
    productList.innerHTML = events.map(event => `
    <div class="event">
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
    </div>
  `).join("");
};
// Fetch and display events on page load
const loadEvents = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = "") {
    const events = yield fetchEvents(args); // Pass query args to fetchEvents
    displayEvents(events);
});
// Load all events initially
loadEvents();
// Fetch events by location when a button is clicked
(_a = document.getElementById("filterBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const filteredEvents = yield fetchEvents("?location=New York"); // Await the promise
    displayEvents(filteredEvents);
}));
//# sourceMappingURL=index.js.map