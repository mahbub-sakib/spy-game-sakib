export async function getLocationFromAI(theme) {
    const response = await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
    });

    const data = await response.json();
    return data.location;
}