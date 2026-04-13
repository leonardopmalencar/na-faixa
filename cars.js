// Apenas carros 0km · preços referência Tabela Fipe 2025 em R$
// site = URL oficial da montadora no Brasil para aquele modelo
const CARROS_0KM = [

  // ── Hatch / compactos ─────────────────────────────────────────
  {marca:"Fiat",     modelo:"Mobi",              preco:72000,  tipo:"hatch",   site:"https://www.fiat.com.br/carros/fiat-mobi.html"},
  {marca:"Fiat",     modelo:"Argo",              preco:92000,  tipo:"hatch",   site:"https://www.fiat.com.br/carros/fiat-argo.html"},
  {marca:"Renault",  modelo:"Kwid",              preco:80000,  tipo:"hatch",   site:"https://www.renault.com.br/carros/kwid.html"},
  {marca:"Renault",  modelo:"Sandero",           preco:100000, tipo:"hatch",   site:"https://www.renault.com.br/carros/sandero.html"},
  {marca:"Citroën",  modelo:"C3",                preco:100000, tipo:"hatch",   site:"https://www.citroen.com.br/carros/c3.html"},
  {marca:"Chevrolet",modelo:"Onix",              preco:94000,  tipo:"hatch",   site:"https://www.chevrolet.com.br/carros/onix"},
  {marca:"Hyundai",  modelo:"HB20",              preco:98000,  tipo:"hatch",   site:"https://www.hyundai.com.br/automoveis/hb20"},
  {marca:"VW",       modelo:"Polo",              preco:115000, tipo:"hatch",   site:"https://www.vw.com.br/pt/modelos/polo.html"},
  {marca:"Peugeot",  modelo:"208",               preco:115000, tipo:"hatch",   site:"https://www.peugeot.com.br/carros/208"},
  {marca:"Toyota",   modelo:"Yaris Hatch",       preco:112000, tipo:"hatch",   site:"https://www.toyota.com.br/carros/yaris"},

  // ── Sedan ──────────────────────────────────────────────────────
  {marca:"Fiat",     modelo:"Cronos",            preco:102000, tipo:"sedan",   site:"https://www.fiat.com.br/carros/fiat-cronos.html"},
  {marca:"VW",       modelo:"Virtus",            preco:120000, tipo:"sedan",   site:"https://www.vw.com.br/pt/modelos/virtus.html"},
  {marca:"Chevrolet",modelo:"Onix Plus",         preco:108000, tipo:"sedan",   site:"https://www.chevrolet.com.br/carros/onix-plus"},
  {marca:"Honda",    modelo:"City Sedan",        preco:132000, tipo:"sedan",   site:"https://www.honda.com.br/automoveis/city"},
  {marca:"Toyota",   modelo:"Yaris Sedan",       preco:120000, tipo:"sedan",   site:"https://www.toyota.com.br/carros/yaris"},
  {marca:"Toyota",   modelo:"Corolla",           preco:188000, tipo:"sedan",   site:"https://www.toyota.com.br/carros/corolla"},
  {marca:"Honda",    modelo:"Civic",             preco:182000, tipo:"sedan",   site:"https://www.honda.com.br/automoveis/civic"},
  {marca:"BMW",      modelo:"320i",              preco:390000, tipo:"sedan",   site:"https://www.bmw.com.br/pt/all-models/3-series/sedan/2022/bmw-3-series-sedan.html"},
  {marca:"Audi",     modelo:"A3 Sedan",          preco:330000, tipo:"sedan",   site:"https://www.audi.com.br/br/web/pt/models/a3/a3-sedan.html"},
  {marca:"Mercedes-Benz",modelo:"C 200",         preco:445000, tipo:"sedan",   site:"https://www.mercedes-benz.com.br/passageiros/models/c-class/saloon/overview.html"},

  // ── SUV compacto ───────────────────────────────────────────────
  {marca:"Chevrolet",modelo:"Tracker",           preco:148000, tipo:"suv",     site:"https://www.chevrolet.com.br/suvs/tracker"},
  {marca:"VW",       modelo:"T-Cross",           preco:158000, tipo:"suv",     site:"https://www.vw.com.br/pt/modelos/t-cross.html"},
  {marca:"Hyundai",  modelo:"Creta",             preco:152000, tipo:"suv",     site:"https://www.hyundai.com.br/automoveis/creta"},
  {marca:"Nissan",   modelo:"Kicks",             preco:155000, tipo:"suv",     site:"https://www.nissan.com.br/veiculos/kicks"},
  {marca:"Renault",  modelo:"Duster",            preco:148000, tipo:"suv",     site:"https://www.renault.com.br/carros/duster.html"},
  {marca:"Jeep",     modelo:"Renegade",          preco:172000, tipo:"suv",     site:"https://www.jeep.com.br/veiculos/renegade"},
  {marca:"Honda",    modelo:"HR-V",              preco:195000, tipo:"suv",     site:"https://www.honda.com.br/automoveis/hr-v"},
  {marca:"Toyota",   modelo:"Corolla Cross",     preco:220000, tipo:"suv",     site:"https://www.toyota.com.br/carros/corolla-cross"},
  {marca:"Caoa Chery",modelo:"Tiggo 5X",         preco:138000, tipo:"suv",     site:"https://www.caoa-chery.com.br/modelos/tiggo-5x"},
  {marca:"GWM",      modelo:"Haval H6",          preco:202000, tipo:"suv",     site:"https://www.gwm.com.br/modelos/haval-h6"},
  {marca:"Kia",      modelo:"Sportage",          preco:228000, tipo:"suv",     site:"https://www.kia.com/br/showroom/sportage.html"},
  {marca:"Fiat",     modelo:"Pulse",             preco:118000, tipo:"suv",     site:"https://www.fiat.com.br/carros/fiat-pulse.html"},
  {marca:"Fiat",     modelo:"Fastback",          preco:145000, tipo:"suv",     site:"https://www.fiat.com.br/carros/fiat-fastback.html"},

  // ── SUV médio / grande ─────────────────────────────────────────
  {marca:"Jeep",     modelo:"Compass",           preco:235000, tipo:"suv",     site:"https://www.jeep.com.br/veiculos/compass"},
  {marca:"VW",       modelo:"Tiguan",            preco:282000, tipo:"suv",     site:"https://www.vw.com.br/pt/modelos/tiguan.html"},
  {marca:"Toyota",   modelo:"RAV4",              preco:340000, tipo:"suv",     site:"https://www.toyota.com.br/carros/rav4"},
  {marca:"Toyota",   modelo:"SW4",               preco:415000, tipo:"suv",     site:"https://www.toyota.com.br/carros/sw4"},
  {marca:"BMW",      modelo:"X1",                preco:370000, tipo:"suv",     site:"https://www.bmw.com.br/pt/all-models/x-series/x1/2022/bmw-x1.html"},
  {marca:"BMW",      modelo:"X3",                preco:495000, tipo:"suv",     site:"https://www.bmw.com.br/pt/all-models/x-series/x3/2021/bmw-x3.html"},
  {marca:"Audi",     modelo:"Q5",                preco:478000, tipo:"suv",     site:"https://www.audi.com.br/br/web/pt/models/q5/q5.html"},
  {marca:"Mercedes-Benz",modelo:"GLE 450",       preco:688000, tipo:"suv",     site:"https://www.mercedes-benz.com.br/passageiros/models/gle/suv/overview.html"},
  {marca:"Porsche",  modelo:"Macan",             preco:520000, tipo:"suv",     site:"https://www.porsche.com/brazil/models/macan/macan-models/macan/"},
  {marca:"Porsche",  modelo:"Cayenne",           preco:770000, tipo:"suv",     site:"https://www.porsche.com/brazil/models/cayenne/cayenne-models/cayenne/"},
  {marca:"Land Rover",modelo:"Defender 110",     preco:730000, tipo:"suv",     site:"https://www.landrover.com.br/veiculos/defender"},

  // ── Picapes ────────────────────────────────────────────────────
  {marca:"Fiat",     modelo:"Strada",            preco:134000, tipo:"picape",  site:"https://www.fiat.com.br/carros/fiat-strada.html"},
  {marca:"Fiat",     modelo:"Toro",              preco:198000, tipo:"picape",  site:"https://www.fiat.com.br/carros/fiat-toro.html"},
  {marca:"VW",       modelo:"Amarok",            preco:325000, tipo:"picape",  site:"https://www.vw.com.br/pt/modelos/amarok.html"},
  {marca:"Toyota",   modelo:"Hilux",             preco:295000, tipo:"picape",  site:"https://www.toyota.com.br/carros/hilux"},
  {marca:"Chevrolet",modelo:"S10",               preco:265000, tipo:"picape",  site:"https://www.chevrolet.com.br/caminhonetes/s10"},
  {marca:"Ford",     modelo:"Ranger",            preco:280000, tipo:"picape",  site:"https://www.ford.com.br/caminhonetes/ranger"},
  {marca:"Mitsubishi",modelo:"L200 Triton",      preco:250000, tipo:"picape",  site:"https://www.mitsubishimotors.com.br/models/l200-triton"},
  {marca:"RAM",      modelo:"1500",              preco:490000, tipo:"picape",  site:"https://www.ramtrucks.com.br/ram-1500"},

  // ── Elétricos ──────────────────────────────────────────────────
  {marca:"BYD",      modelo:"Dolphin",           preco:178000, tipo:"electric",site:"https://www.byd.com/br/car/dolphin.html"},
  {marca:"BYD",      modelo:"Atto 3",            preco:278000, tipo:"electric",site:"https://www.byd.com/br/car/atto3.html"},
  {marca:"BYD",      modelo:"Seal",              preco:325000, tipo:"electric",site:"https://www.byd.com/br/car/seal.html"},
  {marca:"BYD",      modelo:"Han",               preco:400000, tipo:"electric",site:"https://www.byd.com/br/car/han.html"},
  {marca:"GWM",      modelo:"Ora 03",            preco:188000, tipo:"electric",site:"https://www.gwm.com.br/modelos/ora-03"},
  {marca:"Jeep",     modelo:"Compass PHEV",      preco:365000, tipo:"electric",site:"https://www.jeep.com.br/veiculos/compass-4xe"},
  {marca:"Toyota",   modelo:"Corolla Cross GR-S Hybrid",preco:272000,tipo:"electric",site:"https://www.toyota.com.br/carros/corolla-cross"},

  // ── Esportivos ─────────────────────────────────────────────────
  {marca:"Toyota",   modelo:"GR86",              preco:308000, tipo:"sports",  site:"https://www.toyota.com.br/carros/gr86"},
  {marca:"BMW",      modelo:"M2",                preco:598000, tipo:"sports",  site:"https://www.bmw.com.br/pt/all-models/m-series/m2/2022/bmw-m2-coupe.html"},
  {marca:"Porsche",  modelo:"718 Cayman",        preco:668000, tipo:"sports",  site:"https://www.porsche.com/brazil/models/718/718-models/718-cayman/"},
  {marca:"Porsche",  modelo:"911 Carrera",       preco:970000, tipo:"sports",  site:"https://www.porsche.com/brazil/models/911/911-carrera-models/911-carrera/"},
];

// Quanto % do valor FIPE o carro vale na troca, por condição
const MULT_CONDICAO = {
  otimo:   1.00,  // 100% — baixa km, sem reparos, revisões em dia
  bom:     0.88,  //  88% — desgaste normal de uso
  regular: 0.72,  //  72% — desgaste visível, pequenos reparos pendentes
  ruim:    0.50,  //  50% — problema mecânico/estético relevante
};
