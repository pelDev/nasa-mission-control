const API_URL = "v1";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const lauches = await response.json();
  return lauches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    const lauch = await fetch(`${API_URL}/launches`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await lauch.json();
  } catch (error) {
    return null;
  }
}

async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    return null;
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
