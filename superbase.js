const SUPABASE_URL = "https://nrwhupzgdwlsdnwdfpig.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
async function loadSignals() {

const { data, error } = await client
.from("signals")
.select("*");

console.log(data);

const container =
document.getElementById("signals");

container.innerHTML = "";

data.forEach(signal => {

container.innerHTML += `

<div class="card">

<h3>${signal.pair}</h3>

<p>${signal.type}</p>

</div>

`;

});

}

loadSignals();
