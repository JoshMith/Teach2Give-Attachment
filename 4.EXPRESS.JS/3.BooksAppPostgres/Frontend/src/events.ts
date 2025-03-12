//file to fetch events 
export const fetchEvents = async (queryParams: string = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/eventsFilter${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return await response.json(); // Return the events data
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return empty array if fetch fails
  }
};
