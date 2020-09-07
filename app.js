document.addEventListener('DOMContentLoaded', function(){
  console.log('hello')

  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=100',
    error: function(){
      alert('API call to pokemon endpoint failed')
    },
    success: function(data){
      data.results.forEach(function(item){
        $.ajax({
          url: item.url,
          error: function(){
            alert('API call to second pokemon endpoint failed')
          },
          success: function(data){
            extract_data(data)
          }
        })
      })
    }
  })
  



// function extract_data(data){
//     let row = document.querySelector('.row')
//     let div = document.createElement('div')
//     div.setAttribute('class','col')
//     div.innerHTML = `
//       <div class="list_of_pokemon">
//         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" class="pokemon_image"><br>
//         <div class="pokemon_id">${data.id}</div>
//         <span>${data.name}</span>
//         <span>${data.types[0].type.name}</span>
//       </div>`
//     row.append(div)
//     testing()
// }

function extract_data(data){
  let div_row = document.querySelector('#id01')
  let div = document.createElement('div')
  // div.setAttribute('id',data.id)
  div.setAttribute('class','col')
  div.innerHTML = `
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" class="pokemon_image"><br>
  <span>${data.id}</span><br>
  <span>${data.name}</span><br>`
  
  div_row.append(div)
  sortList()
}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("id01");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("DIV");
    
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // start by saying there should be no switching:
      shouldSwitch = false;
      /* check if the next item should
      switch place with the current item: */
      console.log(b)
      if (Number(b[i].childNodes[4].textContent) > Number(b[i + 1].childNodes[4].textContent)) {
        /* if next item is numerically
        lower than current item, mark as a switch
        and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}





})


// function sortList() {
//   var list, i, switching, b, shouldSwitch;
//   list = document.getElementById("id01");
//   switching = true;
//   /* Make a loop that will continue until
//   no switching has been done: */
//   while (switching) {
//     // start by saying: no switching is done:
//     switching = false;
//     b = list.getElementsByTagName("LI");
//     // Loop through all list-items:
//     for (i = 0; i < (b.length - 1); i++) {
//       // start by saying there should be no switching:
//       shouldSwitch = false;
//       /* check if the next item should
//       switch place with the current item: */
      
//       if (Number(b[i].innerHTML) > Number(b[i + 1].innerHTML)) {
//         /* if next item is numerically
//         lower than current item, mark as a switch
//         and break the loop: */
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       /* If a switch has been marked, make the switch
//       and mark the switch as done: */
//       b[i].parentNode.insertBefore(b[i + 1], b[i]);
//       switching = true;
//     }
//   }
// }