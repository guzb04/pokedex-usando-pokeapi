
document.addEventListener("DOMContentLoaded", function(){
    let listavacia = []
    
    if(JSON.parse(localStorage.getItem("pokeids")) === null){
        let listastringify = JSON.stringify(listavacia)
        localStorage.setItem("pokeids", listastringify)
    }

    let searchinput = document.getElementById("searchinput")
    let searchbutton = document.getElementById("searchbutton")

    searchbutton.addEventListener("click", ()=>{
        if (searchinput.value !== ""){
            sessionStorage.setItem("searchedpokemon", searchinput.value.toLowerCase())
            window.location.href = "pokemon.html"
        }else{
            alert("por favor escriba el nombre o ID de un pokémon")
        }


    })


    
})

async function fetchapi(url, localcontainer){
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);

        let pokeimage = data.sprites.front_default;
        let pokeimage_back = data.sprites.back_default;
        let pokename = data.name;
        let poketypes = data.types;
        let pokeabilities = data.abilities;
        let pokeid = data.id
        

        //bloque de img
        let pokeimageele = new Image();
        pokeimageele.classList.add("card-img-top")
        pokeimageele.classList.add("pokeimage")
        pokeimageele.src = pokeimage + '?' + new Date().getTime();
        pokeimageele.setAttribute('crossOrigin', '');

        pokeimageele.addEventListener("mouseover", ()=>{
            pokeimageele.src = pokeimage_back;
        })
        pokeimageele.addEventListener("mouseout", ()=>{
            pokeimageele.src = pokeimage
        })
        



        //bloque de titulo
        let pokenameele = document.createElement("h5");
        pokenameele.classList.add("card-title");
        pokenameele.innerText = pokename.charAt(0).toUpperCase() + pokename.slice(1);


        //bloque de tipos de pokémon
        let poketypesele = document.createElement("div");
        let tipos = document.createElement("p");
        tipos.classList.add("subtitulo");

        if (poketypes.length > 1){
            tipos.innerText = "Tipos:"
        }else{
            tipos.innerText = "Tipo:"
        }
        poketypesele.appendChild(tipos);

        poketypes.forEach(element => {
            let newtype = document.createElement("p");
            newtype.innerText = element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1);
            newtype.classList.add("pokeinfo")
            poketypesele.appendChild(newtype)
        });




        //bloque de habilidades de pokémon
        let pokeabilitiesele = document.createElement("div");
        let habilidades = document.createElement("p");
        habilidades.classList.add("subtitulo")

        if (pokeabilities.length > 1){
            habilidades.innerText = "Habilidades:"
        }else{
            habilidades.innerText = "Habilidad:"
        }
        pokeabilitiesele.appendChild(habilidades)

        pokeabilities.forEach(element => {
            let newability = document.createElement("p");
            newability.innerText = element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1);
            newability.classList.add("pokeinfo")
            pokeabilitiesele.appendChild(newability)
        });
        
        


        


        let scrollable = document.createElement("div");
        scrollable.classList.add("scrollable");

        scrollable.appendChild(pokenameele);
        scrollable.appendChild(poketypesele);
        scrollable.appendChild(pokeabilitiesele);
    



        


        
        //bloque de la tarjeta
        let card = document.createElement("div");
        card.classList.add("card");

        card.appendChild(pokeimageele);
        card.appendChild(scrollable);
        
        

        localcontainer.appendChild(card);

        console.log(pokeimageele.src)
        

        pokeimageele.addEventListener("load", () => {
            colors = colorPallete(pokeimageele)
            
            let colors1 = colors[0];
            let colors2 = colors[1];

            const gradient = `linear-gradient(to bottom, rgba(${colors1[0]}, ${colors1[1]}, ${colors1[2]}, 0.7), rgba(${colors2[0]}, ${colors2[1]}, ${colors2[2]}, 0.3))`
            card.style.background = gradient;

            
            
        })
            
        
        


        
        
        if (window.location.href.endsWith("pokemon.html")){
            agregarAPokedexbutton(card, pokeid)
        }else if(window.location.href.endsWith('index.html' || "/")){
            botonBorrar(card, pokeid)
        }
    })
    
 }

 function conseguirIdsLocalStorage() {
    let pokeids = localStorage.getItem('pokeids');
    return pokeids ? JSON.parse(pokeids) : [];
}

function guardarIdsLocalStorage(ids) {
    localStorage.setItem('pokeids', JSON.stringify(ids));
}

function agregarIdsAlocalStorage(id) {

    let ids = conseguirIdsLocalStorage();
    ids.push(id);
    guardarIdsLocalStorage(ids);
}


function colorPallete(img){
    const colorThief = new ColorThief();

  
  const dominantColor = colorThief.getPalette(img, 2);
  return dominantColor
  

    }
