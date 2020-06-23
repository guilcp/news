const API_KEY = "644a24912e3948139317d5319bb1753e";

onload = () => {
    // let query = document.getElementById('txtPesquisa').value;
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY + '&language=pt');
    xhr.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.onload = exibeFiltro;
    xhr2.open('GET', 'https://newsapi.org/v2/sources?apiKey=' + API_KEY + '&language=pt');
    xhr2.send();

}

$('#pesquisar').click(function(event) {
    if ($('#textoPesquisa').val() != "") {
        let xhr = new XMLHttpRequest();
        xhr.onload = exibeNoticias;
        $url = 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY + '&language=pt&q=' + $('#textoPesquisa').val();
        xhr.open('GET', $url);
        xhr.send();
        document.getElementById('pageTitle').innerText = "Filtrando pela pesquisa: " + $('#textoPesquisa').val();
        window.scrollTo(0, 0);
    }
    console.log($('#textoPesquisa').val());
    // alert('clcikou');
    event.preventDefault();
});

function filter(id, name) {
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY + '&language=pt&sources=' + id);
    xhr.send();
    document.getElementById('pageTitle').innerText = "Filtrando pela fonte: " + name;
    window.scrollTo(0, 0);

}

function exibeFiltro() {
    let fontes = document.getElementById('fontes');

    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < dados.sources.length; i++) {
        let fonte = dados.sources[i];
        texto = texto + `<li id="${fonte.id}"><a href="javascript:filter('${fonte.id}', '${fonte.name}');">${fonte.name}</a></li>`;
    }
    fontes.innerHTML = texto;
}

function exibeNoticias() {
    let noticias = document.getElementById('noticias');

    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < dados.articles.length; i++) {
        let noticia = dados.articles[i];
        // let data = new Date(noticia.publishedAt);

        texto = texto + `
            <div class="card mb-3" >
                <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                        <img src="${noticia.urlToImage}" class="card-img" alt="...">
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                        <div class="card-body">
                            <h5 class="card-title">${noticia.title}</h5>
                                <p class="card-text">
                                ${noticia.description}
                                </p>
                        </div>
                    </div>
                    <a target="_blank" href="${noticia.url}" class="stretched-link"></a>
                </div>
            </div>          
        `;
    };

    // Preencher a DIV com o texto HTML
    noticias.innerHTML = texto;
}