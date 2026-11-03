const reposta = document.querySelector("#reposta");
const lista = document.querySelector("#lista-destino");
const modelo = document.querySelector("modelo-destino");

const apiKey = "cv_B7G4lkJtwNASau0AyETLet1R9aRLbVt1eR8eMcbgU_Y3IcB2iN_452sL8uKw5llX";

const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";

async function buscaDestinos() {
//mostra uma msg.
    resposta.textContent="Carregando destinos..."

    try {
        //faxer o get 
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers:{"x-api-key" : apiKey},
        });

        //verificar se não deu certo 
        if(!retorno.ok) {
            throw new Error("Não foi possível carregar os destinos.");
        }

        //converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        //percorrer todos os destinos que esta dentro de resultado.
        for (const destino of resultado.data) {
            //fazer uma copia do modelo que criamos no html 
            const card = modelo.textContent.cloneNode(true);

            //preecher cada itens desse card
            card.querySelector(".nome").textContent = destino.tiltle;
            card.querySelector(".pais").textContent = destino.pais;
            card.querySelector(".destino").textContent = destino.tipo_destino;
            card.querySelector(".epoca").textContent = destino.melgor_epoca;
            card.querySelector(".medio").textContent = destino.custo_medio;
            
             const imagem = card.querySelector(".imagem-destino");


            if (destino.imageUrl) {
                imagem.src = destino.imageUrl;
                imagem.alt = destino.title;


                imagem.onerror = () => imagem.remove();
            } else {
                imagem.remove();
            }


            // adiciona o card preenchido na tela


            lista.appendChild(card);
            resposta.textContent = "";


        }

    } catch (error) {
        console.error(error);
        resposta.textContent = "Não foi possível carregar os heróis. Tente novamente!"
    }
}

// Executar o arquivo
buscarDestino();
