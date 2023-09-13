document.addEventListener("DOMContentLoaded", ()=>{
    let container = document.getElementById("indexhtml_container")
    let localstorageids = JSON.parse(localStorage.getItem("pokeids"))

        localstorageids.forEach(element => {
            let indexurl = `https://pokeapi.co/api/v2/pokemon/${element}/`
            fetchapi(indexurl, container)
        })

})

function innerTextButton(button){button.innerText = "Sacar de pokédex";}
    

function botonBorrar(card, id){
    let button = document.createElement("button");
    innerTextButton(button)
    button.className = "btn btn-primary"
    button.classList.add("deletebutton")

    button.addEventListener("click", ()=>{
        let localstorageids = JSON.parse(localStorage.getItem("pokeids"))
        console.log(localstorageids)
  
        let nuevolocalstorageids = localstorageids.filter(item => item !== id)
        localStorage.setItem("pokeids", JSON.stringify(nuevolocalstorageids))
        card.remove()
      })

    card.appendChild(button)
}



   