# Pokedex

To acquire 500 pokemons from pokemon APIs
The attributes such as pokemon ID, name, types and image are extracted from API using AJAX call.
The AJAX call is performed twice to successfully call the APIs.

By default, the pokemons are sorted based on their pokemon IDs. There are four choices inside the sort function, namely pokemon number (ascending & descending) and pokemon name (ascending & descending)

Besides, search function helps used to find the desired pokemons by name. However, the input only accept strings (case-insensitive) but not numbers.

To improve user experience, load-for-more button is created to show the first 20 pokemons. When the button is clicked, another 20 pokemons will be shown. The loop continues until all the pokemons have been loaded. Back-to-top button is also added if user intent to go back to the top of the page. Carousel is added with some images attached at the top of the page.

Improvements
1. To include the input of search function that accept numbers
2. Right now after the search function is performed, the results returned do not come with load-for-more function. User might have a hard time if the search resutls return more than 20 pokemons
3. The sort function is using bubble sort. When the data is large, it decreases the efficiency of the sort function. User will exprience some delays when the option is changed from one to another.
4. The pokemon images do not linked to other html. This feature could be added to improve user experiences



