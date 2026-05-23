
// CREATE SIGNAL (ADMIN)
function createSignal() {
  let pair = document.getElementById("pair").value;
  let type = document.getElementById("type").value;
  let strength = document.getElementById("strength").value;

  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  signals.push({
    pair: pair,
    type: type,
    strength: strength,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("signals", JSON.stringify(signals));

  alert("Signal Added");

  loadSignals(); // dashboard update
}

// LOAD SIGNALS (DASHBOARD)
function loadSignals() {
  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  const container = document.querySelector(".dashboard-content");
  if (!container) return;

  container.innerHTML = "";

  signals.reverse().forEach(s => {
    container.innerHTML += `
      <div class="card">
        <h3>${s.pair}</h3>
        <p>${s.type}</p>
        <p>${s.strength}</p>
        <small>${s.time}</small>
      </div>
    `;
  });
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded", loadSignals);
