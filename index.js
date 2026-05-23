// =========================
// SUPABASE CONNECTION
// এই অংশ সবসময় index.js এর একদম উপরে থাকবে
// =========================

const supabaseUrl = "https://nrwhupzgdwlsdnwdfpig.supabase.co";
const supabaseKey = "NEXT_PUBLIC_SUPABASE_URL=https://nrwhupzgdwlsdnwdfpig.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// =========================
// SIGNAL ADD FUNCTION
// এডমিন প্যানেল থেকে সিগন্যাল যোগ করবে
// =========================

async function createSignal() {

  let pair = document.getElementById("pair").value;
  let type = document.getElementById("type").value;
  let entry = document.getElementById("entry").value;
  let strength = document.getElementById("strength").value;
  let target = document.getElementById("target").value;
  let stoploss = document.getElementById("stoploss").value;

  // SUPABASE DATABASE এ DATA SAVE
  await supabaseClient
    .from("signals")
    .insert([
      {
        pair: pair,
        type: type,
        entry: entry,
        strength: strength,
        target: target,
        stoploss: stoploss
      }
    ]);

  // SAVE হওয়ার পরে Dashboard reload
  loadSignals();
}


// =========================
// DASHBOARD এ SIGNAL SHOW করবে
// =========================

async function loadSignals() {

  let { data, error } = await supabaseClient
    .from("signals")
    .select("*")
    .order("id", { ascending: false });

  const container = document.querySelector(".dashboard-content");

  // যদি dashboard page না থাকে
  if (!container) return;

  container.innerHTML = "";

  // SIGNAL CARD SHOW
  data.forEach(signal => {

    container.innerHTML += `

      <div class="card">

        <h3>${signal.pair}</h3>

        <p>${signal.type}</p>

        <p>Entry: ${signal.entry}</p>

        <p>Strength: ${signal.strength}</p>

        <p>TP: ${signal.target}</p>

        <p>SL: ${signal.stoploss}</p>

      </div>

    `;
  });

}


// =========================
// PAGE LOAD হলে SIGNAL LOAD
// =========================

document.addEventListener(
  "DOMContentLoaded",
  loadSignals
);

