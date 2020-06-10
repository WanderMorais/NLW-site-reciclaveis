function buscarEstado(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }
    })
}
buscarEstado()
function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false        
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

/*then((res => {return res.json()})).then()

podemos usar de forma mais simples:

then(res => res.json())
*/ 

//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const colletedItems = document.querySelector("input[name=items]")
let selectedItems = []
function handleSelectedItem(event){
    const itemLi = event.target
    // adicionar ou remover elementos com javascript
    itemLi.classList.toggle("selected") // 'add' e 'remove' ou posso colocar toggle para as duas funções
    const itemId = itemLi.dataset.id


    /*ferificar se existem itens selecionados, se sim, pegar os itens selecionados*/
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    /* podemos simplificar a função:
    const alreadySelected = selectedItems.findIndex(function(item){ 
        const itemFound = item == itemId
        return itemFound
    })
    quando temos apenas uma variável e item verdadeiro
    */
    /*se já estiver selecionado, tirar da seleção */
    if(alreadySelected>=0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{ // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }
    /*atualizar o campo escondido com os itens selecionados */
    colletedItems.value = selectedItems
}