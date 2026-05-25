const SUPABASE_URL = "https://nrwhupzgdwlsdnwdfpig.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_4I-i-becqQZHBXK-skXDfA_gQLOID3a";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function loadNewsFeed() {

const { data, error } = await client
.from("news_feed")
.select("*")
.order("created_at", { ascending: false });

const container =
document.getElementById("live-feed");

if (!container) return;

container.innerHTML = "";

data.forEach(news => {

container.innerHTML += `

<div class="card">

<h3>${news.title}</h3>

<p>${news.content}</p>

</div>

`;

});

}

loadNewsFeed();
