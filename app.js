document.addEventListener('DOMContentLoaded', function(){
  console.log('hello')

  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=20',
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
  


function extract_data(data){
  console.log(data)
  let div_row = document.querySelector('#list')
  let div = document.createElement('div')
  // div.setAttribute('id',data.id)
  div.setAttribute('class','col-md-2half')
  let order_number = "" + data.id
  let format = "000"
  let number = format.substring(0, format.length - order_number.length) + order_number
  
  
  if(data.types.length === 1){
    div.innerHTML = `
      <span class="pokemon-id">${number}</span>
      <div class="image-wrapper">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" class="pokemon_image"><br>
      </div>
      <span class="pokemon-name">${data.name}</span>
      <div class="text-box">
        <span class=${data.types[0].type.name}>${data.types[0].type.name}</span>
      </div>
      `
  }

  else if (data.types.length === 2){
    div.innerHTML = `
        <span class="pokemon-id">${number}</span>
        <div class="image-wrapper">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" class="pokemon_image"><br>
        </div>
        <span class="pokemon-name">${data.name}</span>
        <div class="text-box">
          <span class=${data.types[0].type.name}>${data.types[0].type.name}</span>
        </div>
        <div class="text-box">
          <span class=${data.types[1].type.name}>${data.types[1].type.name}</span>
        </div>
        `
  }

  div_row.append(div)
  sortList()
}

function sortList() {
  let list = document.getElementById("list");
  let switching = true;

  while (switching) {
    switching = false
    let b = list.getElementsByClassName("col-md-2half");
    for (let i=0; i < (b.length - 1); i++) {

      if (Number(b[i].childNodes[1].textContent) > Number(b[i + 1].childNodes[1].textContent)) {
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
      }

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

var str = "" + 1
var pad = "0000"
var ans = pad.substring(0, pad.length - str.length) + str