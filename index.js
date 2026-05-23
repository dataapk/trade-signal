const supabaseUrl = "https://nrwhupzgdwlsdnwdfpig.supabase.co";
const supabaseKey = "NEXT_PUBLIC_SUPABASE_URL=https://nrwhupzgdwlsdnwdfpig.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);
// CREATE SIGNAL
function createSignal() {
  let pair = document.getElementById("pair").value;
  let type = document.getElementById("type").value;
  let strength = document.getElementById("strength").value;

  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  signals.push({
    id: Date.now(),
    pair,
    type,
    strength
  });

  localStorage.setItem("signals", JSON.stringify(signals));

  loadAdminSignals();
  loadDashboardSignals();
}

// LOAD ADMIN PANEL SIGNALS
function loadAdminSignals() {
  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  const container = document.querySelector(".admin-signals");
  if (!container) return;

  container.innerHTML = "";

  signals.forEach(s => {
    container.innerHTML += `
      <div class="card">
        <h4>${s.pair}</h4>
        <p>${s.type}</p>
        <p>${s.strength}</p>
        <button onclick="deleteSignal(${s.id})">Delete</button>
      </div>
    `;
  });
}

// DELETE SIGNAL
function deleteSignal(id) {
  let signals = JSON.parse(localStorage.getItem("signals")) || [];

  signals = signals.filter(s => s.id !== id);

  localStorage.setItem("signals", JSON.stringify(signals));

  loadAdminSignals();
  loadDashboardSignals();
}

// LOAD DASHBOARD
function loadDashboardSignals() {
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
      </div>
    `;
  });
}

// AUTO LOAD ON OPEN
document.addEventListener("DOMContentLoaded", () => {
  loadAdminSignals();
  loadDashboardSignals();
});
