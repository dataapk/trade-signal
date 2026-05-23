function loadSignals() {
  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  const container = document.getElementById("signalContainer");
  if (!container) return;

  container.innerHTML = "";

  signals.forEach(s => {
    container.innerHTML += `
      <div class="card">
        <h3>${s.pair}</h3>
        <p>${s.type}</p>
        <p>${s.strength}</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadSignals);
