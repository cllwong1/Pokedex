document.addEventListener('DOMContentLoaded', function(){
  console.log('linked')

/*********************************Call the API using AJAX************************************************************/
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=100',
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
    
    $('#no-pokemon-found').hide()
    input_data(data)
    sortList("Sort By")
    filter_search_list()
    load_more()

    $(window).scroll(function(){
      if($(this).scrollTop()>3000){
        $('#back-to-top-btn').fadeIn()
      }
      else{
        $('#back-to-top-btn').fadeOut()
      }
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
        <div class="text-box one ${data.types[0].type.name}" style="margin:0 auto;display:block">
          <span>${data.types[0].type.name}</span>
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
          <div class="text-box ${data.types[0].type.name}">
            <span>${data.types[0].type.name}</span>
          </div>
          <div class="text-box ${data.types[1].type.name}">
            <span>${data.types[1].type.name}</span>
          </div>
          `
    }

    div_row.append(div)
  }




  /***************************Function to Sort the List**************************************************************/

  let dropdownlist = document.getElementById('dropdown_list')
    dropdownlist.addEventListener('change',function(e){
      e.preventDefault()
      sortList(e.target.value)
      $('#load-more-btn').text("More Pokémons").removeClass('noContent')
    })

  function sortList(dropdown_value) {

    let switching = true

      while (switching) {
        switching = false
        let b = document.getElementsByClassName("col-md-2half")
        for (let i=0; i < (b.length - 1); i++) {

          //To sort by number in ascending order
          if (dropdown_value === "Sort By" || dropdown_value === "opt 1"){
            if (Number(b[i].childNodes[1].textContent) > Number(b[i + 1].childNodes[1].textContent)) {
                b[i].parentNode.insertBefore(b[i + 1], b[i])
                switching = true
                // load_more()
            }
          }


          //To sort by number in descending order
          else if (dropdown_value === "opt 2"){
            if (Number(b[i].childNodes[1].textContent) < Number(b[i + 1].childNodes[1].textContent)) {
                b[i].parentNode.insertBefore(b[i + 1], b[i])
                switching = true
                // load_more()
            }
          }


          //To sort by name in ascending order
          else if (dropdown_value === "opt 3"){
            if (b[i].childNodes[5].textContent.toLowerCase() > b[i + 1].childNodes[5].textContent.toLowerCase()) {
                b[i].parentNode.insertBefore(b[i + 1], b[i])
                switching = true
                // load_more()
            }
          }


          //To sort by name in descending order
          else if (dropdown_value === "opt 4"){
            if (b[i].childNodes[5].textContent.toLowerCase() < b[i + 1].childNodes[5].textContent.toLowerCase()) {
                b[i].parentNode.insertBefore(b[i + 1], b[i])
                switching = true
                // load_more()
            }
          }

          
        }

        
      }
      load_more()
  }

  /*****************Function to capitalize the first letter************************************************************************/

  function first_letter_capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  

  /*************Function to filter the search list***********************************************************************/

  function filter_search_list(){
    
    let search_button = document.getElementById('search-pokemon-btn')
    let b = document.getElementsByClassName("col-md-2half")

    search_button.addEventListener('click',function(e){
      e.preventDefault()
      $('#load-more-btn').hide()
      

      let input_text = document.getElementById('input-text').value.toLowerCase()
        if (input_text===""){
          window.location.reload()
        }

        for (let i=0; i < b.length; i++){

          if(b[i].childNodes[5].textContent.toLowerCase().indexOf(input_text)>-1){
            b[i].style.display = "block"
          }

          else{
            b[i].style.display = "none"
          }

        }

        if ($('.col-md-2half:visible').length === 0){
          $('#no-pokemon-found').show()
        }

        else{
          $('#no-pokemon-found').hide()
        }
      
    })
    
  }

  /***********************Load for more function**************************************************************/

  function load_more (){
    $('#no-pokemon-found').hide()
    let max_pokemon = 100
    let col = $('#list .col-md-2half')
        
    col.slice(0,20).show()
    col.slice(20,max_pokemon).hide()
    
    let load_more_btn = $('#load-more-btn')
    load_more_btn.show()
      let n=20
      load_more_btn.on('click',function(e){

        e.preventDefault()
        
        if (n%20===0){
          col.slice(0,n+20).show().slideDown()
          col.slice(n+20,max_pokemon).hide()

          if(n===max_pokemon-20){
            col.slice(0,n+20).show().slideDown()
            load_more_btn.text("No more pokémon").addClass("noContent")
          }
        }

        n+=20
        
      })
      
  }

  /*****************************Back to top function*************************************************************************/
  
  
  
  




})
