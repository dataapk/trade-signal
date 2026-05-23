```js
// =========================
// SUPABASE CONNECTION
// =========================

const supabaseUrl =
"https://nrwhupzgdwlsdnwdfpig.supabase.co";

const supabaseKey =
"sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";


const supabaseClient =
window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// =========================
// SIGNAL ADD FUNCTION
// =========================

async function createSignal() {

  let pair =
  document.getElementById("pair").value;

  let type =
  document.getElementById("type").value;

  let entry =
  document.getElementById("entry").value;

  let strength =
  document.getElementById("strength").value;

  let target =
  document.getElementById("target").value;

  let stoploss =
  document.getElementById("stoploss").value;


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


  loadSignals();

}


// =========================
// LOAD SIGNALS
// =========================

async function loadSignals() {

  let { data, error } =
  await supabaseClient
    .from("signals")
    .select("*")
    .order("id", {
      ascending: false
    });


  const container =
  document.querySelector(
    ".dashboard-content"
  );


  if (!container) return;


  container.innerHTML = "";


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
// PAGE LOAD
// =========================

document.addEventListener(
  "DOMContentLoaded",
  loadSignals
);



// =========================
// LOGOUT
// =========================

function logout(){

  localStorage.removeItem(
    "adminLoggedIn"
  );

  window.location.href =
  "admin.html";

}
```
