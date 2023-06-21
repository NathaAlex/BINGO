var jogadores = [];

var jogoAndamento = false;

function gerarNumeroAleatorio(inicioIntervalo, fimIntervalo) {
    return Math.floor((fimIntervalo - inicioIntervalo) * Math.random()) + inicioIntervalo;

}
function gerarFileira(quantidadeNumeros, inicio, fim) {
    var cartela = [];
    for (i = 0;
        i < quantidadeNumeros;
        i++) {
        var numeroCartelaExiste = true;

        while (numeroCartelaExiste == true) {
            var numeroAleatorio = gerarNumeroAleatorio(inicio, fim);
            if (cartela.includes(numeroAleatorio) == true) {
                numeroCartelaExiste = true;

            } else {
                numeroCartelaExiste = false;

                cartela.push(numeroAleatorio);

            }
        }
    } return cartela;

}
function gerarCartela() {
    return [gerarFileira(5, 1, 15), gerarFileira(5, 16, 30), gerarFileira(5, 31, 45), gerarFileira(5, 46, 60), gerarFileira(5, 61, 75)];
}
function renderCartelas() {
    if (jogoAndamento == true) {
        alert("O jogo está acontecendo! Não é possivel gerar uma nova cartela!");
        return;
    } var nomeJogador = prompt("Digite o nome do jogador:");
    if (nomeJogador == "" || nomeJogador == null) {
        alert("Você precisa digitar o nome do jogador!!!");
        return;
    } else if (nomeJogador.length <= 5) {
        alert("O nome é muito pequeno!!!");
        return;
    } var titulo = ['B', 'I', 'N', 'G', 'O'];
    var cartela = gerarCartela();
    var jogador = { nome: nomeJogador, cartela: cartela };
    jogadores.push(jogador);
    var divBingo = document.getElementById("bingo");
    var jNome = document.createElement("h3");
    jNome.style = "text-align: center";
    jNome.innerText = nomeJogador;
    var divCartela = document.createElement("div");
    divCartela.appendChild(jNome);
    var divTabela = document.createElement("div");
    divTabela.style = "display: flex;justify-content: center;";
    var table = document.createElement("table");
    table.className = "tabela";
    var tr = document.createElement("tr");
    titulo.forEach(function (elemento) {
        var td = document.createElement("td");
        td.innerText = elemento;
        tr.appendChild(td);
    });
    table.appendChild(tr);
    for (var linha = 0;
        linha < 5;
        linha++) {
            var tr = document.createElement("tr");
        for (var coluna = 0;
            coluna < 5;
            coluna++) {
                var td = document.createElement("td");
            td.className = "tabela";
            if (linha == 2 && coluna == 2) {
                td.innerText = "X";
            } else {
                td.innerText = cartela[coluna][linha];
            } tr.appendChild(td);
        } table.appendChild(tr);
    } divTabela.appendChild(table);
    divCartela.appendChild(divTabela);
    divCartela.style = "display: inline;";
    divBingo.appendChild(divCartela);
}
function validarCartela(cartela, numerosSorteados, quantidadeNumeros) {
    if (numerosSorteados.length < quantidadeNumeros) {
        return false;
    } var existe = true;
    for (var i = 0;
        i < 5;
        i++) {
            for (var j = 0;
                j < 5;
                j++) {
                    if (numerosSorteados.includes(cartela[i][j]) == true) {
                        existe = true;
                    } else {
                        existe = false;
                        return false;
                    }
            }
    } if (existe == true) {
        return true;
    }
}
function jogarBingo() {
    if (jogadores.length < 2) {
        alert("Você precisa ter pelo menos dois jogadores para jogar!");
        return;
    } if (jogoAndamento == true) {
        alert("O jogo ja está em andamento!");
        return;
    } jogoAndamento = true;
    var btnCriarCartela = document.getElementById("btnCriarCartela");
    btnCriarCartela.classList.add = "disabled";
    var td = document.getElementsByTagName("td");
    for (var i = 0;
        i < td.length;
        i++) td[i].style = "background-color: transparent;";
    var areaSorteio = document.querySelector("#sorteados");
    var sorteados = document.querySelectorAll("#sorteados > div");
    sorteados.forEach(function (numero) {
        areaSorteio.removeChild(numero);
    });
    var numerosSorteados = [];
    var h2Vencedor = document.getElementById("vencedor");
    h2Vencedor.innerText = "";
    var divSorteados = document.getElementById("sorteados");
    var intervalo = setInterval(function () {
        var numeroExiste = true;
        while (numeroExiste == true) {
            var numeroAleatorio = gerarNumeroAleatorio(1, 75);
            if (numerosSorteados.includes(numeroAleatorio) == true) {
                numeroExiste = true;
            } else {
                numeroExiste = false;
                numerosSorteados.push(numeroAleatorio);
                for (var i = 0;
                    i < td.length;
                    i++) { if (td[i].innerText == numeroAleatorio) { td[i].style = "background-color: chartreuse;" } } var divNumero = document.createElement("div");
                divNumero.classList.add("sorteado");
                divNumero.innerText = numeroAleatorio;
                divSorteados.appendChild(divNumero);
                console.log("Números sorteados:", numerosSorteados);
                jogadores.forEach(function (jogador) {
                    if (validarCartela(jogador.cartela, numerosSorteados, 25) == true) {
                        console.log(`${jogador.nome} ganhou o BINGO!`);
                        var h2Vencedor = document.getElementById("vencedor");
                        h2Vencedor.innerText += `${jogador.nome} ganhou o BINGO!\n`;
                        clearInterval(intervalo);
                        jogoAndamento = false;
                    }
                });
            }
        } if (numerosSorteados.length >= 75) {
            console.log("Sorteio Finalizado!");
            clearInterval(intervalo);
        }
    }, 1000);
}
function reiniciarJogo() {
    var bingo = document.querySelector("#bingo");
    var areaSorteio = document.querySelector("#sorteados");
    var cartelas = document.querySelectorAll("#bingo > div");
    var numerosSorteados = document.querySelectorAll("#sorteados > div");
    if (cartelas.length > 0 && jogoAndamento == false) {
        cartelas.forEach(function (cartela) {
            bingo.removeChild(cartela);
        });
        numerosSorteados.forEach(function (numero) {
            areaSorteio.removeChild(numero);
        });
        var h2Vencedor = document.getElementById("vencedor");
        h2Vencedor.innerText = "";
        jogadores = [];
    } else { alert("Você não pode reiniciar o jogo agora. Crie uma cartela ou aguarde o jogo finalizar.") }
}