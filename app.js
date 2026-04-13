// ── STATE ─────────────────────────────────────────────────────────
const S = {
  marcaCod:  null,
  modeloCod: null,
  anoCod:    null,
  fipeVal:   0,
  condicao:  "bom",
};

// ── AUTOCOMPLETE HELPER ───────────────────────────────────────────
function AC(inputId, dropId, { load, onPick }) {
  const inp  = document.getElementById(inputId);
  const drop = document.getElementById(dropId);
  let items = [], hi = -1;

  function render(arr) {
    items = arr; hi = -1;
    drop.innerHTML = "";
    if (!arr.length) {
      drop.innerHTML = `<li class="none">Nenhum resultado</li>`;
    } else {
      arr.forEach((it, i) => {
        const li = document.createElement("li");
        li.textContent = it.label;
        li.onmousedown = e => { e.preventDefault(); pick(i); };
        drop.appendChild(li);
      });
    }
    drop.classList.add("open");
  }

  function close() { drop.classList.remove("open"); hi = -1; }

  function hilite(i) {
    drop.querySelectorAll("li").forEach((el, j) => el.classList.toggle("hi", j === i));
  }

  function pick(i) {
    const it = items[i];
    if (!it) return;
    inp.value = it.label;
    close();
    onPick(it);
  }

  inp.addEventListener("input", async () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) { close(); return; }
    const all = await load();
    render(all.filter(x => x.label.toLowerCase().includes(q)).slice(0, 80));
  });

  inp.addEventListener("focus", async () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) return;
    const all = await load();
    const f = all.filter(x => x.label.toLowerCase().includes(q)).slice(0, 80);
    if (f.length) render(f);
  });

  inp.addEventListener("keydown", e => {
    const lis = [...drop.querySelectorAll("li:not(.none)")];
    if (!lis.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(hi+1, lis.length-1); hilite(hi); lis[hi]?.scrollIntoView({block:"nearest"}); }
    else if (e.key === "ArrowUp") { e.preventDefault(); hi = Math.max(hi-1, 0); hilite(hi); lis[hi]?.scrollIntoView({block:"nearest"}); }
    else if (e.key === "Enter") { e.preventDefault(); if(hi>=0) pick(hi); }
    else if (e.key === "Escape") close();
  });

  document.addEventListener("click", e => {
    if (!inp.contains(e.target) && !drop.contains(e.target)) close();
  });

  return {
    enable(placeholder) { inp.disabled = false; inp.placeholder = placeholder; },
    disable(placeholder) { inp.disabled = true; inp.placeholder = placeholder || "—"; },
    clear() { inp.value = ""; close(); },
  };
}

// ── MARCA ─────────────────────────────────────────────────────────
const acMarca = AC("iMarca", "drMarca", {
  load: async () => FIPE_MARCAS.map(m => ({ label: m.nome, cod: m.codigo })),
  onPick: async it => {
    S.marcaCod = it.cod;
    S.modeloCod = null; S.anoCod = null; S.fipeVal = 0;
    acModelo.clear(); acAno.clear();
    hidePill();

    acModelo.enable("carregando…");
    document.getElementById("iModelo").disabled = true;
    const mods = await fipeModelos(it.cod);
    window._mods = mods;
    acModelo.enable("digite o modelo");
    document.getElementById("iModelo").focus();
  },
});

// ── MODELO ────────────────────────────────────────────────────────
const acModelo = AC("iModelo", "drModelo", {
  load: async () => (window._mods || []).map(m => ({ label: m.nome, cod: m.codigo })),
  onPick: async it => {
    S.modeloCod = it.cod;
    S.anoCod = null; S.fipeVal = 0;
    acAno.clear(); hidePill();

    acAno.disable("carregando…");
    const anos = await fipeAnos(S.marcaCod, it.cod);
    window._anos = anos;
    acAno.enable("ex: 2022");
    document.getElementById("iAno").focus();
  },
});

// ── ANO ───────────────────────────────────────────────────────────
const acAno = AC("iAno", "drAno", {
  load: async () => (window._anos || []).map(a => {
    const yr = a.nome.split(" ")[0];
    return { label: yr, cod: a.codigo };
  }),
  onPick: it => {
    S.anoCod = it.cod;
    loadFipe();
  },
});

// ── FIPE PRICE ────────────────────────────────────────────────────
async function loadFipe() {
  if (!S.marcaCod || !S.modeloCod || !S.anoCod) return;
  // show loading state in calc box
  document.getElementById("calcLoading").style.display = "";
  document.getElementById("calcFipeVal").dataset.ready = "";
  updateCalc();
  try {
    const d = await fipePreco(S.marcaCod, S.modeloCod, S.anoCod);
    S.fipeVal = parseFipeValue(d.Valor);
    document.getElementById("calcLoading").style.display = "none";
    document.getElementById("calcFipeVal").dataset.ready = "1";
    updateCalc();
  } catch {
    S.fipeVal = 0;
    document.getElementById("calcLoading").textContent = "não encontrado";
    updateCalc();
  }
}

// ── LIVE CALC ─────────────────────────────────────────────────────
const COND_LABELS = { otimo:"Ótimo · 100%", bom:"Bom · 88%", regular:"Regular · 72%", ruim:"Com defeito · 50%" };

function updateCalc() {
  const tradeIn  = S.fipeVal > 0 ? Math.round(S.fipeVal * MULT_CONDICAO[S.condicao]) : 0;
  const extra    = getExtra();
  const total    = tradeIn + extra;
  const fipeEl   = document.getElementById("calcFipeVal");
  const lbl      = document.getElementById("calcFipeLbl");
  const totalEl  = document.getElementById("calcTotal");

  // FIPE column
  lbl.textContent = `Valor FIPE · ${COND_LABELS[S.condicao]}`;
  if (S.fipeVal > 0) {
    fipeEl.textContent = brl(tradeIn);
  }
  // total
  totalEl.textContent = total > 0 ? brl(total) : "—";
}

// ── CONDITION ─────────────────────────────────────────────────────
document.getElementById("condBtns").addEventListener("click", e => {
  const b = e.target.closest(".cb");
  if (!b) return;
  document.querySelectorAll(".cb").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  S.condicao = b.dataset.val;
  updateCalc();
});

// ── MONEY INPUT ───────────────────────────────────────────────────
const iExtra = document.getElementById("iExtra");
iExtra.addEventListener("input", () => {
  const raw = iExtra.value.replace(/\D/g, "");
  iExtra.value = raw ? Number(raw).toLocaleString("pt-BR") : "";
  updateCalc();
});
const getExtra = () => parseInt(iExtra.value.replace(/\D/g,""), 10) || 0;

// ── FORM SUBMIT ───────────────────────────────────────────────────
document.getElementById("mainForm").addEventListener("submit", e => {
  e.preventDefault();
  const errEl = document.getElementById("formErr");

  // Needs at least: brand selected via FIPE OR extra budget > 0
  const hasFipe  = S.marcaCod && S.modeloCod && S.anoCod;
  const hasExtra = getExtra() > 0;

  if (!hasFipe && !hasExtra) {
    errEl.textContent = "Preencha seu carro via FIPE ou informe um valor de investimento.";
    errEl.classList.remove("hidden");
    shake(document.querySelector(".card"));
    return;
  }
  errEl.classList.add("hidden");

  const tradeIn = hasFipe ? Math.round(S.fipeVal * MULT_CONDICAO[S.condicao]) : 0;
  const extra   = getExtra();
  const budget  = tradeIn + extra;

  if (budget <= 0) {
    errEl.textContent = "O orçamento total ficou zerado. Informe um valor de investimento.";
    errEl.classList.remove("hidden");
    shake(document.querySelector(".card"));
    return;
  }

  showResults({ budget, tradeIn, extra, hasFipe });
});

// ── RESULTS ───────────────────────────────────────────────────────
function showResults({ budget, tradeIn, extra, hasFipe }) {
  const shell   = document.getElementById("shell");
  const results = document.getElementById("results");
  const grid    = document.getElementById("resGrid");
  const meta    = document.getElementById("resMeta");
  const empty   = document.getElementById("resEmpty");
  const budgetEl= document.getElementById("resBudget");

  budgetEl.innerHTML = `Faixa de compra · <strong>${brl(budget)}</strong>`;

  const marca  = document.getElementById("iMarca").value;
  const modelo = document.getElementById("iModelo").value;
  const ano    = document.getElementById("iAno").value;

  if (hasFipe) {
    meta.innerHTML =
      `${marca} ${modelo} ${ano} &nbsp;·&nbsp; ` +
      `FIPE <strong>${brl(S.fipeVal)}</strong> &nbsp;·&nbsp; ` +
      `Troca est. <strong>${brl(tradeIn)}</strong>` +
      (extra > 0 ? ` &nbsp;+&nbsp; Investimento extra <strong>${brl(extra)}</strong>` : "");
  } else {
    meta.innerHTML = `Orçamento disponível: <strong>${brl(budget)}</strong>`;
  }

  // Filter — show cars up to budget (+8% tolerance)
  const matches = CARROS_0KM
    .filter(c => c.preco <= budget * 1.08)
    .sort((a, b) => b.preco - a.preco);

  grid.innerHTML = "";

  if (!matches.length) {
    empty.classList.remove("hidden");
    grid.hidden = true;
  } else {
    empty.classList.add("hidden");
    grid.hidden = false;
    matches.forEach(car => {
      const pct  = Math.min(100, Math.round((car.preco / budget) * 100));
      const over = car.preco > budget;
      const el   = document.createElement("div");
      el.className = "cc";
      el.innerHTML = `
        <span class="cc-badge t-${car.tipo}">${car.tipo}</span>
        <div class="cc-make">${car.marca}</div>
        <div class="cc-model">${car.modelo}</div>
        <div class="cc-price"${over ? ' style="color:var(--muted)"' : ""}>${brl(car.preco)}</div>
        <div class="cc-note">${over ? "um pouco acima da faixa" : `${100-pct}% abaixo do orçamento`}</div>
        <div class="cc-bar"><div class="cc-fill" style="width:0" data-p="${pct}"></div></div>
        <a class="cc-link" href="${car.site}" target="_blank" rel="noopener">
          <span>Ver no site oficial</span><span>↗</span>
        </a>
      `;
      grid.appendChild(el);
    });

    // animate bars
    requestAnimationFrame(() => requestAnimationFrame(() => {
      grid.querySelectorAll(".cc-fill").forEach(el => {
        el.style.width = el.dataset.p + "%";
      });
    }));
  }

  shell.style.display = "none";
  results.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
}

// ── BACK BUTTON ───────────────────────────────────────────────────
document.getElementById("btnBack").addEventListener("click", () => {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("shell").style.display = "";
  window.scrollTo({ top: 0, behavior: "instant" });
});

// ── HELPERS ──────────────────────────────────────────────────────
function brl(n) {
  return "R$\u00a0" + Math.round(n).toLocaleString("pt-BR");
}

function shake(el) {
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  el.addEventListener("animationend", () => el.classList.remove("shake"), {once:true});
}
