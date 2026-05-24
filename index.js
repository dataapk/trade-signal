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
// CREATE SIGNAL
// =========================

async function createSignal() {

  let pair =
  document.getElementById("pair").value.trim();

  let type =
  document.getElementById("type").value;

  let entry =
  document.getElementById("entry").value.trim();

  let strength =
  document.getElementById("strength").value.trim();

  let target =
  document.getElementById("target").value.trim();

  let stoploss =
  document.getElementById("stoploss").value.trim();


  // =========================
  // VALIDATION
  // =========================

  if(
    !pair ||
    !entry ||
    !strength ||
    !target ||
    !stoploss
  ){

    alert("Please fill all fields");

    return;

  }


  // =========================
  // INSERT SIGNAL
  // =========================

  const { error } =
  await supabaseClient
    .from("signals")
    .insert([
      {
        pair,
        type,
        entry,
        strength,
        target,
        stoploss
      }
    ]);


  // =========================
  // ERROR HANDLING
  // =========================

  if(error){

    console.error(error);

    alert("Failed to add signal");

    return;

  }


  alert("Signal Added Successfully");


  // =========================
  // CLEAR INPUTS
  // =========================

  document.getElementById("pair").value = "";

  document.getElementById("entry").value = "";

  document.getElementById("strength").value = "";

  document.getElementById("target").value = "";

  document.getElementById("stoploss").value = "";


  // =========================
  // RELOAD SIGNALS
  // =========================

  loadSignals();

}


// =========================
// LOAD SIGNALS
// =========================

async function loadSignals() {

  const { data, error } =
  await supabaseClient
    .from("signals")
    .select("*")
    .order("id", {
      ascending: false
    });


  // =========================
  // ERROR CHECK
  // =========================

  if(error){

    console.error(error);

    return;

  }


  const container =
  document.querySelector(
    ".dashboard-content"
  );


  if(!container) return;


  container.innerHTML = "";


  // =========================
  // EMPTY STATE
  // =========================

  if(data.length === 0){

    container.innerHTML = `
      <p>No Signals Available</p>
    `;

    return;

  }


  // =========================
  // RENDER SIGNALS
  // =========================

  data.forEach(signal => {

    container.innerHTML += `

      <div class="card">

        <h3>${signal.pair}</h3>

        <p>
          <strong>${signal.type}</strong>
        </p>

        <p>
          Entry: ${signal.entry}
        </p>

        <p>
          Strength: ${signal.strength}
        </p>

        <p>
          TP: ${signal.target}
        </p>

        <p>
          SL: ${signal.stoploss}
        </p>

      </div>

    `;

  });

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadSignals();

  }
);


// =========================
// LOGOUT
// =========================

function logout(){

  localStorage.removeItem(
    "adminLoggedIn"
  );

  window.location.href =
  "admin-login.html";

}
