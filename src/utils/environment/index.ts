const spotEnvironmentHostname = new RegExp(".+.connect.dev.q4inc.com");

export const isLocalEnvironment = window.location.hostname === "localhost";
export const isSpotEnvironment = spotEnvironmentHostname.test(window.location.hostname);
