import { fetchEvents } from "./events";

const displayEvents = (events: any[]) => {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = events.map(event => `
    <div class="event">
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
    </div>
  `).join("");
};

// Fetch and display events on page load
const loadEvents = async (args: string = "") => {
  const events = await fetchEvents(args);  // Pass query args to fetchEvents
  displayEvents(events);
};

// Load all events initially
loadEvents();

// Fetch events by location when a button is clicked
document.getElementById("filterBtn")?.addEventListener("click", async () => {
  const filteredEvents = await fetchEvents("?location=New York"); // Await the promise
  displayEvents(filteredEvents);
});
