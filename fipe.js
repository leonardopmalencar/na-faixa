// ── FIPE API ──────────────────────────────────────────────────────
const FIPE_BASE = "https://parallelum.com.br/fipe/api/v1/carros";

// Full list of FIPE brands (pre-loaded to avoid extra request)
const FIPE_MARCAS = [
  {codigo:"3",nome:"Alfa Romeo"},{codigo:"189",nome:"Aston Martin"},
  {codigo:"6",nome:"Audi"},{codigo:"7",nome:"BMW"},
  {codigo:"238",nome:"BYD"},{codigo:"245",nome:"Caoa Chery"},
  {codigo:"10",nome:"Cadillac"},{codigo:"12",nome:"Chrysler"},
  {codigo:"13",nome:"Citroën"},{codigo:"15",nome:"Daewoo"},
  {codigo:"17",nome:"Dodge"},{codigo:"20",nome:"Ferrari"},
  {codigo:"21",nome:"Fiat"},{codigo:"22",nome:"Ford"},
  {codigo:"23",nome:"GM - Chevrolet"},{codigo:"240",nome:"GWM"},
  {codigo:"25",nome:"Honda"},{codigo:"26",nome:"Hyundai"},
  {codigo:"177",nome:"JAC"},{codigo:"28",nome:"Jaguar"},
  {codigo:"29",nome:"Jeep"},{codigo:"31",nome:"Kia Motors"},
  {codigo:"33",nome:"Land Rover"},{codigo:"34",nome:"Lexus"},
  {codigo:"168",nome:"Lifan"},{codigo:"36",nome:"Maserati"},
  {codigo:"38",nome:"Mazda"},{codigo:"211",nome:"McLaren"},
  {codigo:"39",nome:"Mercedes-Benz"},{codigo:"167",nome:"MG"},
  {codigo:"156",nome:"MINI"},{codigo:"41",nome:"Mitsubishi"},
  {codigo:"43",nome:"Nissan"},{codigo:"44",nome:"Peugeot"},
  {codigo:"47",nome:"Porsche"},{codigo:"185",nome:"RAM"},
  {codigo:"48",nome:"Renault"},{codigo:"195",nome:"Rolls-Royce"},
  {codigo:"54",nome:"Subaru"},{codigo:"55",nome:"Suzuki"},
  {codigo:"56",nome:"Toyota"},{codigo:"58",nome:"Volvo"},
  {codigo:"59",nome:"VW - VolksWagen"},{codigo:"52",nome:"Seat"},
];

// ── fetch helpers ─────────────────────────────────────────────────
async function fipeModelos(codigoMarca) {
  const r = await fetch(`${FIPE_BASE}/marcas/${codigoMarca}/modelos`);
  const d = await r.json();
  return d.modelos || [];
}

async function fipeAnos(codigoMarca, codigoModelo) {
  const r = await fetch(`${FIPE_BASE}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
  return await r.json();
}

async function fipePreco(codigoMarca, codigoModelo, codigoAno) {
  const r = await fetch(`${FIPE_BASE}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`);
  return await r.json();
}

// ── parse "R$ 45.500,00" → 45500 ─────────────────────────────────
function parseFipeValue(str) {
  if (!str) return 0;
  return parseFloat(str.replace("R$","").replace(/\./g,"").replace(",",".").trim()) || 0;
}
