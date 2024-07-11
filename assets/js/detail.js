var storedDetail = []
var background = document.getElementById("background")
var poster = document.getElementById("poster")
var title = document.getElementById("title")
var synopis = document.getElementById("synopsis")
var date = document.getElementById("date")
var tagline = document.getElementById("tagline")
var company = document.getElementById("company")
var actors = document.getElementById("actors")
var more = document.getElementById("more")
var percentage = 0
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
    }
};


if (localStorage.getItem("detail")) {

    storedDetail = localStorage.getItem("detail").split(",")
    console.log(storedDetail)
    if (storedDetail[1] == 'true') {
        fetch('https://api.themoviedb.org/3/movie/' + storedDetail[0] + '?language=fr-FR&append_to_response=credits', options)
            .then(response => response.json())
            .then(data => {

                console.log(data)
                background.style.backgroundImage = "url(https://media.themoviedb.org/t/p/w1280/" + data["poster_path"] + ")"
                poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data["poster_path"]}" alt="" class=" h-full  rounded-md">`
                title.innerText = data["title"]
                synopis.innerText = data["overview"]
                tagline.innerText = data["tagline"]
                document.title = data["title"]
                // company.innerHTML = `<img>`
                genre_list = ""
                for (let index = 0; index < data["genres"].length; index++) {

                    if (index == data["genres"].length - 1) {
                        genre_list += data["genres"][index]["name"]
                    }
                    else {
                        genre_list += data["genres"][index]["name"] + ","
                    }


                }
                date.innerText = data["release_date"] + " " + genre_list
                percentage = data["vote_average"] * 10
                actors.innerHTML = ""
                more.innerHTML = `
                <p><span class="font-bold">Titre d'origine </span><br>${data["original_title"]}</p>
                    

                <p> <span class="font-bold">Langue d'origine </span><br>${data["original_language"]}</p>
                

                <p><span class="font-bold"> Budget </span><br>${data["budget"]}$</p>
                

                <p> <span class="font-bold">Recette </span><br>${data["revenue"]}$</p>
                
                `
                for (let index = 0; index < 10; index++) {
                    actors.innerHTML += `
                    <div class="flex flex-col w-32 h-92 rounded-md shadow-md shadow-slate-700 shrink-0 mx-2 my-2">

                        <div class="w-full">
                            <img src="https://image.tmdb.org/t/p/w185${data["credits"]["cast"][index]["profile_path"]}" class="rounded-t-md object-scale-down" alt="">
                        </div>
                        
                        <div class="bg-slate-800 h-20 w-full rounded-b-md text-center pt-1 text-white">

                            <p class="font-semibold">${data["credits"]["cast"][index]["name"]}</p>
                            <p class="font-light">${data["credits"]["cast"][index]["character"]}</p>
                        </div>
                    </div>
                    `
                    
                }

                // Config for the circle progressbar
                var config = {

                    "percent": percentage,
                    "colorSlice": "#21D07A",
                    "colorCircle": "#1E4128",
                    "size": 70,
                    "fill": "#081C22",
                    "stroke": 5

                }


                const circle = new CircularProgressBar("pie", config);
                circle.initial();


            })
            .catch(err => console.error(err));

    }
    else {

        fetch('https://api.themoviedb.org/3/tv/' + storedDetail[0] + '?language=fr-FR&append_to_response=credits', options)
            .then(response => response.json())
            .then(data => {
                
                console.log(data)
                background.style.backgroundImage = "url(https://media.themoviedb.org/t/p/w1280/" + data["poster_path"] + ")"
                poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data["poster_path"]}" alt="" class=" h-3/4 rounded-md">`
                title.innerText = data["name"]
                synopis.innerText = data["overview"]
                tagline.innerText = data["tagline"]
                document.title = data["name"]
                genre_list = ""
                for (let index = 0; index < data["genres"].length; index++) {

                    if (index == data["genres"].length - 1) {
                        genre_list += data["genres"][index]["name"]
                    }
                    else {
                        genre_list += data["genres"][index]["name"] + ","
                    }


                }

                actors.innerHTML = ""
                more.innerHTML = `
                <p><span class="font-bold">Titre d'origine </span><br>${data["original_name"]}</p>
                    

                <p> <span class="font-bold">Langue d'origine </span><br>${data["original_language"]}</p>
                

                <p><span class="font-bold"> Nombre de saison </span><br>${data["number_of_seasons"]}</p>
                

                <p> <span class="font-bold">Nombre d'épisode </span><br>${data["number_of_episodes"]}</p>
                
                `
                for (let index = 0; index < data["credits"]["cast"].length ; index++) {
                    actors.innerHTML += `
                    <div class="flex flex-col w-32 h-92 rounded-md shadow-md shadow-slate-700 shrink-0 mx-2 my-2">

                        <div class="w-full">
                            <img src="https://image.tmdb.org/t/p/w185${data["credits"]["cast"][index]["profile_path"]}" class="rounded-t-md object-scale-down" alt="">
                        </div>
                        
                        <div class="bg-slate-800 h-20 w-full rounded-b-md text-center pt-1 text-white">

                            <p class="font-semibold">${data["credits"]["cast"][index]["name"]}</p>
                            <p class="font-light">${data["credits"]["cast"][index]["character"]}</p>
                        </div>
                    </div>
                    `
                    if(index == 10 )
                        {
                            break
                        }
                }
                date.innerText = data["first_air_date"] + " " + genre_list
                percentage = data["vote_average"] * 10

                // Config for the circle progressbar
                var config = {

                    "percent": percentage,
                    "colorSlice": "#21D07A",
                    "colorCircle": "#1E4128",
                    "size": 80,
                    "fill": "#081C22",
                    "stroke": 5

                }


                const circle = new CircularProgressBar("pie", config);
                circle.initial();


            })
            .catch(err => console.error(err));
    }

}


