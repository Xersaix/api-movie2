var sortBy = document.getElementById("sortBy")
var sort = document.getElementsByClassName("sort")
var result_show = document.getElementById("results")
var show_more = document.getElementById("more")

var title = ""

var sort_type = {

    "Popularité +/-": "popularity.desc",
    "Popularité -/+": "popularity.asc",
    "Titre A-Z": "title.asc",
    "Titre Z-A": "title.desc",
}

if (document.title == "Liste de Films") {

    title = "movie"
} else {
    title = "tv"
}

var last_filter_order = []
var page_number = 1
function Filter(page, sorting, genre, year) {
    let fetch_link = "https://api.themoviedb.org/3/discover/" + title + "?include_adult=false&include_video=false&language=fr-FR"
    if (page != null) {
        fetch_link += "&page=" + page
    }

    if (sorting != null) {
        fetch_link += "&sort_by=" + sorting
    }
    if (genre != "") {
        fetch_link += "&with_genres=" + genre.toString().replaceAll(",", "%2C")
    }
    if (year != "") {
        fetch_link += "&year=" + year
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };
    fetch(fetch_link, options)
        .then(response => response.json())
        .then(data => {

            if (page == 1) {
                result_show.innerHTML = ""
            }

            for (let index = 0; index < data["results"].length; index++) {
                let image_link = "https://image.tmdb.org/t/p/original";
                result_show.innerHTML += `            
                <div class="h-[10rem] bg-gray-800 rounded-md shadow-md flex flex-row">
                    <div class='h-full w-2/6 rounded-md'>
                        <img src="${data["results"][index]["poster_path"] ? image_link + data["results"][index]["poster_path"] : "assets/img/No_Image_Available.jpg"}" alt="" class="object-fill h-full w-full rounded-l-md">
                    </div>
                    <div class="px-2 w-4/6 text-white flex flex-col justify-evenly ">
                        <p class="font-semibold">${data["results"][index]["title"] ? data["results"][index]["title"] : data["results"][index]["name"]} </p>

                        <p class="line-clamp-3 text-sm">${data["results"][index]["overview"]}  </p>
                    </div>
                </div>`

            }
            last_filter_order = [sorting, genre, year,data["total_pages"]]
            page_number++


        })
        .catch(err => console.error(err));
}

document.getElementById('get-checked').addEventListener('click', function () {
    // Get all the checkboxes within the ul with id 'genre-list'
    const genre_checkboxes = document.querySelectorAll('#genre-list input[type="checkbox"]');
    const year_checkboxes = document.querySelector('#year');
    // Create an array to store the names of checked checkboxes
    const checkedGenres = [];

    // Iterate over the checkboxes and check which ones are selected
    genre_checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedGenres.push(checkbox.name);
        }
    });

    Filter(1, sort_type[sortBy.innerText], checkedGenres, year_checkboxes.value)

});

for (let index = 0; index < sort.length; index++) {
    sort[index].addEventListener("click", function () {
        sortBy.innerText = sort[index].innerText
    })

}


window.onload = () => {
    // Get all the checkboxes within the ul with id 'genre-list'
    const genre_checkboxes = document.querySelectorAll('#genre-list input[type="checkbox"]');
    const year_checkboxes = document.querySelector('#year');
    // Create an array to store the names of checked checkboxes
    const checkedGenres = [];

    // Iterate over the checkboxes and check which ones are selected
    genre_checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedGenres.push(checkbox.name);
        }
    });

    Filter(1, sort_type[sortBy.innerText], checkedGenres, year_checkboxes.value)

}

show_more.addEventListener("click", () => {

    if(page_number != last_filter_order[3])
    Filter(page_number, last_filter_order[0], last_filter_order[1], last_filter_order[2])

})