// RecipeShare demo logic. DEMO ONLY: data is kept in the browser (localStorage),
// not in a database, and "login" is not real authentication.
const $ = (s) => document.querySelector(s);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const userRecipes = () => store.get("rs_recipes", []);
const allRecipes = () => [...RECIPES, ...userRecipes()];
const favIds = () => store.get("rs_favs", []);
const currentUser = () => store.get("rs_user", null);
const page = document.body.dataset.page;

// ---- Shared navbar and footer ----
function renderLayout() {
  const links = [["index.html","Home","home"],["browse.html","Browse","browse"],["add-recipe.html","Add Recipe","add"],
    ["my-recipes.html","My Recipes","my"],["favorites.html","Favorites","favorites"],["profile.html","Profile","profile"],["admin.html","Admin","admin"]];
  const u = currentUser();
  $("#nav").innerHTML = `<div class="demo">Prototype: frontend demo only. No real login, database or security yet.</div>
  <header class="nav"><div class="nav-in"><a class="logo" href="index.html">🍲 RecipeShare</a>
  ${links.map(l => `<a class="link ${l[2]===page?"active":""}" href="${l[0]}">${l[1]}</a>`).join("")}
  ${u ? `<a class="btn alt" href="#" id="logout">Logout</a>` : `<a class="btn" href="login.html">Login</a>`}</div></header>`;
  $("#foot").innerHTML = `<footer>RecipeShare | College project prototype | HTML, CSS, JavaScript</footer>`;
  const lo = $("#logout");
  if (lo) lo.onclick = (e) => { e.preventDefault(); localStorage.removeItem("rs_user"); location.href = "index.html"; };
}

// ---- Recipe card ----
function card(r) {
  const on = favIds().includes(r.id);
  return `<article class="card"><a href="recipe.html?id=${r.id}"><div class="thumb">${esc(r.emoji)}</div></a>
  <button class="fav ${on?"on":""}" data-id="${r.id}" title="Add to favorites">♥</button>
  <div class="body"><span class="tag">${esc(r.category)}</span><h3>${esc(r.title)}</h3>
  <div class="meta">${r.time} min, ${esc(r.difficulty)}<br>by ${esc(r.author)}</div></div></article>`;
}
function showCards(list, el, emptyMsg) {
  el.innerHTML = list.length ? list.map(card).join("") : `<p class="muted">${emptyMsg}</p>`;
}
// One click handler for every heart button on every page
document.addEventListener("click", (e) => {
  const b = e.target.closest(".fav");
  if (!b) return;
  const id = Number(b.dataset.id), f = favIds();
  store.set("rs_favs", f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  if (page === "favorites") pages.favorites(); else b.classList.toggle("on");
});

// ---- Page-specific code ----
const pages = {
  home() {
    $("#chips").innerHTML = CATEGORIES.map(c => `<a class="chip" href="browse.html?cat=${c}">${c}</a>`).join("");
    showCards(RECIPES.slice(0, 4), $("#featured"), "");
  },
  browse() {
    const cat = $("#cat"), q = $("#q");
    cat.innerHTML = `<option value="">All categories</option>` + CATEGORIES.map(c => `<option>${c}</option>`).join("");
    cat.value = new URLSearchParams(location.search).get("cat") || "";
    const draw = () => showCards(allRecipes().filter(r =>
      (!cat.value || r.category === cat.value) &&
      (r.title + r.ingredients.join(" ")).toLowerCase().includes(q.value.toLowerCase())),
      $("#list"), "No recipes match your search. Try a different word or category.");
    q.oninput = draw; cat.onchange = draw; draw();
  },
  recipe() {
    const r = allRecipes().find(x => x.id === Number(new URLSearchParams(location.search).get("id")));
    if (!r) { $("#main").innerHTML = `<p>Recipe not found. <a href="browse.html">Back to recipes</a></p>`; return; }
    $("#main").innerHTML = `<a href="browse.html">Back to recipes</a><div class="detail" style="margin-top:1rem">
    <div><div class="thumb">${esc(r.emoji)}</div></div>
    <div><span class="tag">${esc(r.category)}</span><h1>${esc(r.title)}</h1><p>${esc(r.desc)}</p>
    <p class="meta">${r.time} min, ${esc(r.difficulty)}, by ${esc(r.author)}</p>
    <button class="fav" style="position:static" data-id="${r.id}">♥</button></div></div>
    <h2 style="margin-top:1.5rem">Ingredients</h2><ul>${r.ingredients.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    <h2>Steps</h2><ol>${r.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`;
    $(".fav").classList.toggle("on", favIds().includes(r.id));
  },
  login() {
    const show = (w) => { $("#loginForm").hidden = w !== "login"; $("#regForm").hidden = w !== "reg"; };
    $("#tabLogin").onclick = () => show("login"); $("#tabReg").onclick = () => show("reg"); show("login");
    const done = (name, email) => { store.set("rs_user", {name, email}); location.href = "profile.html"; };
    $("#loginForm").onsubmit = (e) => { e.preventDefault(); const em = $("#lEmail").value; done(em.split("@")[0], em); };
    $("#regForm").onsubmit = (e) => {
      e.preventDefault();
      if ($("#rPass").value !== $("#rPass2").value) { $("#regMsg").textContent = "Passwords do not match."; return; }
      done($("#rName").value.trim(), $("#rEmail").value);
    };
  },
  add() {
    $("#cat").innerHTML = CATEGORIES.map(c => `<option>${c}</option>`).join("");
    $("#addForm").onsubmit = (e) => {
      e.preventDefault();
      const u = currentUser();
      if (!u) { $("#msg").innerHTML = `Please <a href="login.html">log in</a> first.`; return; }
      const lines = (id) => $(id).value.split("\n").map(s => s.trim()).filter(Boolean);
      const list = userRecipes();
      list.push({id: Date.now(), title: $("#title").value.trim(), category: $("#cat").value, emoji: "🍽️",
        time: Number($("#time").value), difficulty: $("#diff").value, author: u.name, desc: $("#desc").value.trim(),
        ingredients: lines("#ing"), steps: lines("#steps")});
      store.set("rs_recipes", list);
      location.href = "my-recipes.html";
    };
  },
  my() {
    const u = currentUser();
    if (!u) { $("#list").innerHTML = `<p class="muted">Log in to see your recipes. <a href="login.html">Login</a></p>`; return; }
    const mine = userRecipes().filter(r => r.author === u.name);
    showCards(mine, $("#list"), "You have not added any recipes yet. Use Add Recipe to share your first one.");
  },
  favorites() {
    showCards(allRecipes().filter(r => favIds().includes(r.id)), $("#list"), "No favorites yet. Tap the heart on any recipe to save it here.");
  },
  profile() {
    const u = currentUser();
    if (!u) { $("#box").innerHTML = `<p>You are not logged in. <a href="login.html">Login or register</a></p>`; return; }
    const mine = userRecipes().filter(r => r.author === u.name).length;
    $("#box").innerHTML = `<h2>${esc(u.name)}</h2><p class="muted">${esc(u.email)}</p>
    <p>Recipes added: <b>${mine}</b><br>Favorites: <b>${favIds().length}</b></p>
    <a class="btn alt" href="my-recipes.html">My recipes</a>`;
  },
  admin() {
    const draw = () => {
      const all = allRecipes(), mine = userRecipes();
      $("#stats").innerHTML = [["Total recipes", all.length],["User-added", mine.length],["Categories", CATEGORIES.length],["Favorites saved", favIds().length]]
        .map(s => `<div class="stat"><b>${s[1]}</b>${s[0]}</div>`).join("");
      $("#rows").innerHTML = all.map(r => `<tr><td>${esc(r.title)}</td><td>${esc(r.author)}</td><td>${esc(r.category)}</td>
        <td>${mine.some(m => m.id === r.id) ? `<button class="btn danger" data-del="${r.id}">Delete</button>` : `<span class="muted">Sample</span>`}</td></tr>`).join("");
    };
    document.addEventListener("click", (e) => {
      const id = e.target.dataset.del;
      if (id) { store.set("rs_recipes", userRecipes().filter(r => r.id !== Number(id))); draw(); }
    });
    draw();
  }
};
renderLayout();
if (pages[page]) pages[page]();
