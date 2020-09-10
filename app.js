document.addEventListener('DOMContentLoaded', function(){
  console.log('linked')

/*********************************Call the API using AJAX************************************************************/
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=200',
    error: function(){
      alert('API call to pokemon endpoint failed')
    },
    success: function(data){
      data.results.forEach(function(item){

        //Second call to API using AJAX
        $.ajax({
          url: item.url,
          error: function(){
            alert('API call to second pokemon endpoint failed')
          },
          success: function(data){

            //Extract the data using the function
            extract_data(data)
          }
        })
      })
    }
  })
  



  /***************************Function to extract the API files**************************************************************/

  function extract_data(data){

    input_data(data)
    sortList("Sort By")

    let dropdownlist = document.getElementById('dropdown_list')
    dropdownlist.addEventListener('change',function(e){
      e.preventDefault()
      sortList(e.target.value)
    })



  }




  /***************************Function to input the data into HTML FILE**************************************************************/
  function input_data(data){

    let div_row = document.querySelector('#list')
    let div = document.createElement('div')
    div.setAttribute('class','col-md-2half')
    let order_number = "" + data.id
    let format = "000"
    let number = format.substring(0, format.length - order_number.length) + order_number
    let pokemon_name = first_letter_capitalize(data.name)
    
    if(data.types.length === 1){
      div.innerHTML = `
        <span class="pokemon-id">${number}</span>
        <div class="image-wrapper">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" class="pokemon_image"><br>
        </div>
        <span class="pokemon-name">${pokemon_name}</span>
        <div class="text-box one" style="margin:0 auto;display:block">
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
          <span class="pokemon-name">${pokemon_name}</span>
          <div class="text-box">
            <span class=${data.types[0].type.name}>${data.types[0].type.name}</span>
          </div>
          <div class="text-box">
            <span class=${data.types[1].type.name}>${data.types[1].type.name}</span>
          </div>
          `
    }

    div_row.append(div)

  }




  /***************************Function to Sort the List**************************************************************/

  function sortList(dropdown_value) {

    let list = document.getElementById("list");
    let switching = true;

      while (switching) {
        switching = false
        let b = list.getElementsByClassName("col-md-2half");
        for (let i=0; i < (b.length - 1); i++) {

          //To sort by number in ascending order
          if (dropdown_value === "Sort By" || dropdown_value === "opt 1"){
            if (Number(b[i].childNodes[1].textContent) > Number(b[i + 1].childNodes[1].textContent)) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
          }


          //To sort by number in descending order
          else if (dropdown_value === "opt 2"){
            if (Number(b[i].childNodes[1].textContent) < Number(b[i + 1].childNodes[1].textContent)) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
          }


          //To sort by name in ascending order
          else if (dropdown_value === "opt 3"){
            if (b[i].childNodes[5].textContent.toLowerCase() > b[i + 1].childNodes[5].textContent.toLowerCase()) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
          }


          //To sort by name in descending order
          else if (dropdown_value === "opt 4"){
            if (b[i].childNodes[5].textContent.toLowerCase() < b[i + 1].childNodes[5].textContent.toLowerCase()) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
          }


        }
      }
  }

  /*****************Function to capitalize the first letter************************************************************************/

  function first_letter_capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  

})