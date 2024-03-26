const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfos) return;
  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("A localização precisa ter, pelo menos, 3 letras");
  }
  const resposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=7577947befbdfbcc24425d6be66640aa&lang=pt_br&units=metric`
  );

  const dados = await resposta.json();
  console.log(dados);
  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
  };

  sectionTempoInfos.innerHTML = ` 
    <div class="tempo-dados">
        <h2>${infos.local}</h2>

        <span>${infos.temperatura}</span>
    </div>

    <img src="${infos.icone}" />`;
});
