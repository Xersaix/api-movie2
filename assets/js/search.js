var result_show = document.getElementById("results")
var title_search = document.getElementById("title-search")


window.onload = function () {
    
    if (localStorage.getItem("search-bar")) {
        title_search.innerText += " " + localStorage.getItem("search-bar")
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
            }
        };
        var query = "&query=" + localStorage.getItem("search-bar")
        var fetch_link = "https://api.themoviedb.org/3/search/multi?include_adult=false&language=fr-FR"
        fetch_link += query
        fetch(fetch_link, options)
            .then(response => response.json())
            .then(data => {
                for (let index = 0; index < data["results"].length; index++) {
                    let image_link = "https://image.tmdb.org/t/p/original";


                    result_show.innerHTML += `            
                    <div class="h-[10rem] bg-gray-800 rounded-md shadow-md flex flex-row">
                        <div class='h-full w-2/6 rounded-md'>
                            <img src="${data["results"][index]["poster_path"] ? image_link + data["results"][index]["poster_path"] : "assets/img/No_Image_Available.jpg" }" alt="" class="object-fill h-full w-full rounded-l-md">
                        </div>
                        <div class="px-2 w-4/6 text-white flex flex-col justify-evenly ">
                            <p class="font-semibold">${data["results"][index]["title"] ? data["results"][index]["title"] : data["results"][index]["name"] } </p>
    
                            <p class="line-clamp-3 text-sm">${data["results"][index]["overview"]}  </p>
                        </div>
                    </div>`
                    
                }
                console.log(data)
                localStorage.removeItem("search-bar")
            })
            .catch(err => console.error(err));

    }

}
