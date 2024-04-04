const limit=document.querySelector('#limit');
const submit=document.querySelector('#submit');
const search=document.querySelector('#search');
const notif=document.querySelector('.pokemon-notif')
const loading=document.querySelector('.pokemon-loading-container')
const total=document.querySelector('#count')

submit.addEventListener('click',()=>{
    const parentDiv=document.querySelector('.pokemon-list')
    parentDiv.innerHTML=''
    let searchVal=search.value

    notif.style.display='none'
    loading.style.display = 'flex';
   
    setTimeout(async() => {
            await getLimit()
            loading.style.display = 'none';
        }, 3000);
    
})

const getLimit=async()=>{
    let newLimit=limit.value
    const pokemonArray=[]
    if(newLimit>=1000){
        alert("Limit reach!")
        return ;
    }
    else{
        for(i=1;i<=newLimit; i++){
            pokemonArray.push(getPokemon(i))
            count.innerHTML=i
       }
       const pokemonData = await Promise.all(pokemonArray);
       displayPokemon(pokemonData);
    }
  
}

const getPokemon=async(poke)=>{
    try{
        const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        const data=await res.json()
        if(data.ok) throw new Error('Something went wrong!')
        return data
    
    }catch(err){
        console.error(err)
    }
 
}

const displayPokemon=async(pokemon)=>{
    const searchVal = search.value.trim().toLowerCase(); 
    const parentDiv=document.querySelector('.pokemon-list')
    parentDiv.innerHTML=''
    const pokemonData=pokemon.filter(poke =>poke.name.toLowerCase().includes(searchVal)||poke.id.toString().includes(searchVal));
    pokemonData.forEach((poke)=>{
        const card= document.createElement('div')

        card.classList.add('pokemon-card')
        card.setAttribute('onclick', `handlePokemonClick(${JSON.stringify(poke)})`);
  

        card.innerHTML=`<div class="pokemon-id">
             <h6>#${poke.id}</h6>
            </div>
            <div class="pokemon-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="" id="pokemon-img">
            </div>
            <div class="pokemon-name">
                <h3>${poke.name}</h3>
            </div>`
            parentDiv.appendChild(card)
    })

}

search.addEventListener('keyup',()=>{
    getLimit()
})

const handlePokemonClick=(pokemon)=>{
    toggleStat()
    displayStat(pokemon)
     const pokemonStats = document.querySelector('.pokemon-stats');
     const yOffset = pokemonStats.getBoundingClientRect().top + window.pageYOffset;
     window.scrollTo({
         top: yOffset - window.innerHeight / 2,
         behavior: 'smooth'
     });

}
const toggleStat=()=>{
    const pokemonStats=document.querySelector('.pokemon-stats')
    pokemonStats.style.display='flex'
    const closeBtn=document.querySelector('#close-btn')
    closeBtn.addEventListener('click',()=>{
    const pokemonStats=document.querySelector('.pokemon-stats')
     pokemonStats.style.display='none'
        console.log('click')
})

}

const displayStat=(pokemon)=>{
        const statID=document.querySelector('#poke-id')
        statID.textContent=`#${pokemon.id}`
        const statImg=document.querySelector('#stat-img-id')
        statImg.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        const statName=document.querySelector('#stat-name-get')
        statName.innerHTML=pokemon.name
        const firstMove=document.querySelector('#first')
        const secondMove=document.querySelector('#second')
        const thirdMove=document.querySelector('#third')
        firstMove.textContent=pokemon.moves[0].move.name
        secondMove.textContent=pokemon.moves[1].move.name
        thirdMove.textContent=pokemon.moves[2].move.name
        const hp=document.querySelector('#hp')
        const hpBar=document.querySelector('.h-bar')
        const attack=document.querySelector('#attack')
        const attackBar=document.querySelector('.a-bar')
        const defense=document.querySelector('#defense')
        const defenseBar=document.querySelector('.d-bar')
        const special=document.querySelector('#special')
        const specialBar=document.querySelector('.sa-bar')
        const specialDefense=document.querySelector('#special-defense')
        const specialDefenseBar=document.querySelector('.sd-bar')
        const speed=document.querySelector('#speed')
        const speedBar=document.querySelector('.sp-bar')

        hp.innerHTML=pokemon.stats[0].base_stat
        attack.innerHTML=pokemon.stats[1].base_stat
        defense.innerHTML=pokemon.stats[2].base_stat
        special.innerHTML=pokemon.stats[3].base_stat
        specialDefense.innerHTML=pokemon.stats[4].base_stat
        speed.innerHTML=pokemon.stats[5].base_stat

        hpBar.style.width=`${pokemon.stats[0].base_stat/2}%`
        attackBar.style.width=`${pokemon.stats[1].base_stat/2}%`
        defenseBar.style.width=`${pokemon.stats[2].base_stat/2}%`
        specialBar.style.width=`${pokemon.stats[3].base_stat/2}%`
        specialDefenseBar.style.width=`${pokemon.stats[4].base_stat/2}%`
        speedBar.style.width=`${pokemon.stats[5].base_stat/2}%`


}