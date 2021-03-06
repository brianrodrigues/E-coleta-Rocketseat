
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })

}

populateUFs()


function getCities(event){
    
    const stateInput = document.querySelector("[name=state]")
    const citySelect = document.querySelector("select[name=city]")

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })


}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




/// Itens de coleta
const ItemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of ItemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){

    const ItemLI = event.target

    ItemLI.classList.toggle("selected")

    const itemId = ItemLI.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItem = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItem
    }else{
        selectedItems.push(itemId)
    }
    console.log(selectedItems)

    collectedItems.value = selectedItems

}







