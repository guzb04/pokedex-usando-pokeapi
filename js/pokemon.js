document.addEventListener("DOMContentLoaded", async()=>{
    let searchedpokemon = sessionStorage.getItem("searchedpokemon");
    let url = `https://pokeapi.co/api/v2/pokemon/${searchedpokemon}/`;
    let container = document.getElementById("pokehtml_container")
    
    console.log(container)
    
    console.log(url)


     fetchapi(url, container)

     

     

})

function getStoredArray() {
    
    const storedArray = JSON.parse(localStorage.getItem('myArray')) || [];
    return storedArray;
  }

function agregarAPokedexbutton(card, id) {


    let button = document.createElement("button");
    button.className = "btn btn-primary col-md-8";
    button.classList.add("botones-pokedex")
    
    function innerTextButton(){button.innerText = "Agregar a la pokédex";}
    innerTextButton()

    button.addEventListener("click", ()=>{
      let localstorageids = JSON.parse(localStorage.getItem("pokeids"))
      console.log(localstorageids)

      if (localstorageids.indexOf(id) !== -1){
        button.innerText = "Ya estaba agregado!"
        let timeout = setTimeout(innerTextButton, 1000)
      }else{
        button.innerText = "Agregado!"
        let timeout = setTimeout(innerTextButton, 1000)
        agregarIdsAlocalStorage(id)
        console.log(id)
      }

    })


    card.appendChild(button)



 }