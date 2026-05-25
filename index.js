const supabaseUrl =
"https://nrwhupzgdwlsdnwdfpig.supabase.co";

const supabaseKey =
"sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";

const supabaseClient =
window.supabase.createClient(supabaseUrl, supabaseKey);



// =========================
// CREATE SIGNAL
// =========================

async function createSignal() {

  let pair = document.getElementById("pair").value.trim();
  let type = document.getElementById("type").value;

  let entry = document.getElementById("entry").value.trim();
  let strength = document.getElementById("strength").value.trim();
  let target = document.getElementById("target").value.trim();
  let stoploss = document.getElementById("stoploss").value.trim();

  if (!pair || !entry || !strength || !target || !stoploss) {
    alert("Please fill all fields");
    return;
  }

  const { error } = await supabaseClient
    .from("signals")
    .insert([
      {
        pair,
        type,
        entry: Number(entry),
        strength,
        target: Number(target),
        stoploss: Number(stoploss)
      }
    ]);

  if (error) {
    console.log("SUPABASE ERROR:", error);
    alert("Failed: " + error.message);
    return;
  }

  alert("Signal Added Successfully");

  document.getElementById("pair").value = "";
  document.getElementById("entry").value = "";
  document.getElementById("strength").value = "";
  document.getElementById("target").value = "";
  document.getElementById("stoploss").value = "";

  loadSignals();
}



// =========================
// LOAD SIGNALS
// =========================

async function loadSignals() {

  const { data, error } = await supabaseClient
    .from("signals")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("LOAD ERROR:", error);
    return;
  }

  const container = document.getElementById("signals");
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `
      <p style="color:#888;text-align:center;">No Signals Available</p>
    `;
    return;
  }

  let html = "";

  data.forEach(signal => {

    let typeColor =
      signal.type === "BUY" ? "#22c55e" :
      signal.type === "SELL" ? "#ef4444" :
      "#facc15";

    html += `
      <div class="card" style="border-left:5px solid ${typeColor};">

        <h3>${signal.pair}</h3>

        <p style="color:${typeColor}">
          <strong>${signal.type}</strong>
        </p>

        <p>Entry: ${signal.entry}</p>
        <p>Strength: ${signal.strength}</p>
        <p>TP: ${signal.target}</p>
        <p>SL: ${signal.stoploss}</p>

      </div>
    `;
  });

  container.innerHTML = html;
}



// =========================
// REALTIME (IMPORTANT FIX)
// =========================

function realtimeSignals() {

  supabaseClient
    .channel('signals-live')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'signals'
    }, payload => {

      console.log("LIVE UPDATE:", payload);

      loadSignals(); // auto refresh UI instantly
    })
    .subscribe();
}



// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
  loadSignals();
  realtimeSignals();
});



// =========================
// LOGOUT
// =========================

function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}
