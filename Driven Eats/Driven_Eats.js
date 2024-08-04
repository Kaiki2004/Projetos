let cont = 0;
let lista_pedido = { comida: "", bebida: "", sobremesa: "" };
let lista_valor = { comida: 0, bebida: 0, sobremesa: 0 };

function selecionado(card, categoria) {
    const selecionado = document.querySelector(`#${categoria} .muda_borda`);
    const icon = card.querySelector(".icon");

    if (selecionado) {
        const Icon = selecionado.querySelector(".icon");
        selecionado.classList.remove("muda_borda");
        selecionado.classList.add("borda_branca");
        if (Icon) {
            Icon.classList.remove("estado_on");
            Icon.classList.add("estado_off");
        }
    } else {
        cont += 1;
    }

    card.classList.remove("borda_branca");
    card.classList.add("muda_borda");

    if (icon) {
        icon.classList.remove("estado_off");
        icon.classList.add("estado_on");
    }

    const valor = parseFloat(card.querySelector(".preco_prato").innerText.replace("R$", "").replace(",", "."));
    const nome = card.querySelector(".nome_prato").innerText;

    lista_pedido[categoria] = nome;
    lista_valor[categoria] = valor;

    document.querySelector(`.${categoria}`).innerText = `${nome}:`;
    document.querySelector(`.valor_${categoria}`).innerText = `R$ ${valor.toFixed(2).replace(".", ",")}`;

    calculaPedido();
    fechar_pedido();
}

function fechar_pedido() {
    const comprar = document.querySelector("#fechar");
    if (cont === 3) { 
        comprar.classList.remove("cinza");
        comprar.classList.add("muda_cor");
        comprar.innerText = "Fechar pedido";
    }
}

function calculaPedido() {
    let soma = 0;

    for (let i in lista_valor) {
        soma += lista_valor[i];
    }

    document.querySelector(".total").innerText = `TOTAL: R$ ${soma.toFixed(2).replace(".", ",")}`;
}

function fechar() {
    const fechar = document.querySelector("#branco");
    const comprar = document.querySelector("#fechar");
    if (comprar) {
        fechar.classList.remove("estado_off");
        fechar.classList.add("estado_on");
    }
}

function comprar() {
    const comida = lista_pedido.comida;
    const bebida = lista_pedido.bebida;
    const sobremesa = lista_pedido.sobremesa;
    const total = document.querySelector(".total").innerText.replace("TOTAL: R$ ", "");

    let url = `https://wa.me/16981750864/?text=Olá, gostaria de fazer o pedido:\nPrato: ${comida}\nBebida: ${bebida}\nSobremesa: ${sobremesa}\nTotal: R$ ${total}`;
    window.open(url, '_blank');
}

function cancelar() {
    const comprar = document.querySelector("#fechar");
    const fechar = document.querySelector("#branco");
    if (comprar) {
        fechar.classList.remove("estado_on");
        fechar.classList.add("estado_off");
    }
}
