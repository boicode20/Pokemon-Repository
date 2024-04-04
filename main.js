
const pokemonParent=document.querySelector('.pokemon-parent')
const search=document.querySelector('#search')


const container = document.getElementById('name-container');
const overflowContent = document.querySelector('.name-overflow');


if (overflowContent.scrollHeight > overflowContent.clientHeight) {
    container.classList.remove('no-scroll');
} else {
    container.classList.add('no-scroll');
}



const fetchData= async()=>{
    const url='https://pokeapi.co/api/v2/pokemon?limit=10'
   
    let allPokemon=[]

    try{
        const res=await fetch(url)
        const data= await res.json();

        if(data.ok) throw new Error("Something went wrong!")
        console.log(data)
        allPokemon=data
    }catch(err){
        console.error(err)
    }
//     try{
//         const res=await fetch(pokemonUrl)
//         const data= await res.json();
//         if(data.ok) throw new Error("Something went wrong!")
//         allPokemon=data
//         console.log(allPokemon)
//     }catch(err){
//         console.error(err)
//     }
}
fetchData()