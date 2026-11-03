const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-destino");
const modelo = document.querySelector("#modelo-destino");


const apiKey = "cv_vw4NFJxF2g-lPEEmoARYVb6cjX0x_fAjjaGKG2N8RHB9w06zOiUuGgo6aYsU7FN3";

const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";

async function buscarDestinos() {

  //Mostra uma msg.
  resposta.textContent="Carregando destinos..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os destinos.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os destinos que esta dentro de resultado.
    for (const destino of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = destino.title;
      card.querySelector(".pais").textContent = destino.pais;
      card.querySelector(".tipo_destino").textContent = destino.tipo_destino;
      card.querySelector(".melhor_epoca").textContent = destino.melhor_epoca;
      card.querySelector(".custo_medio").textContent = destino.custo_medio;

      const imagem = card.querySelector(".imagem-destino");

      if (destino.imageUrl){
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
    resposta.textContent= "Não foi possível carregar os heróis. Tente novamente!" 
  }
}

// Executar no arquivo

buscarDestinos();
