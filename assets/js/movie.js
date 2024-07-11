var trending_slide = document.getElementById("trending")
var upcoming_slide = document.getElementById("upcoming")
var top_img = document.getElementById("topImg")
var sliders = document.getElementsByClassName("swiper")
var trending_circle = document.getElementById("trending-circle")
var trending_movie = document.getElementById("trending-movie")
var trending_tv = document.getElementById("trending-tv")
var upcoming_circle = document.getElementById("upcoming-circle")
var upcoming_movie = document.getElementById("upcoming-movie")
var upcoming_tv = document.getElementById("upcoming-tv")
var top_title = document.getElementById("title")

var trending = {
    movie: [],
    tv: []
};

var upcoming = {
    movie: [],
    tv: []
};

async function initTrending() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }

    };

    fetch('https://api.themoviedb.org/3/trending/movie/week?language=fr-FR', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/w500";
            trending_slide.innerHTML = ""
            for (let index = 0; index < 8; index++) {
                trending.movie.push(data["results"][index])
                trending_slide.innerHTML += `
                
                <div class="swiper-slide group" onclick="getIdForDetail(${data["results"][index]["id"]},${true})"><img src="${image_link + trending.movie[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${trending.movie[index]["title"]}</p> </div></div>
                `
            }
        }
        )
        .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/trending/tv/week?language=fr-FR', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/w500";
            for (let index = 0; index < 8; index++) {
                trending.tv.push(data["results"][index])


            }

        }


        )
        .catch(err => console.error(err));
}


async function initUpcoming() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }

    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/w500";
            upcoming_slide.innerHTML = ""
            for (let index = 0; index < 8; index++) {
                upcoming.movie.push( data["results"][index])
                upcoming_slide.innerHTML += `
                
                <div class="swiper-slide group" onclick="getIdForDetail(${data["results"][index]["id"]},${true})"><img src="${image_link + upcoming.movie[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${upcoming.movie[index]["title"]}</p> </div></div>
                `
            }
        }
        )
        .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < 8; index++) {
                upcoming.tv.push(data["results"][index])


            }

        }


        )
        .catch(err => console.error(err));
}

function loadTrending(movie) {

    console.log(trending.tv)
    trending_slide.innerHTML = ""
    let image_link = "https://image.tmdb.org/t/p/w500";
    if (movie) {
        
        for (let index = 0; index < 8; index++) {
            trending_slide.innerHTML += `
            
            <div class="swiper-slide group" onclick="getIdForDetail(${trending.tv[index]["id"]},${true})"><img src="${image_link + trending.movie[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${trending.movie[index]["title"]}</p> </div></div>
            `

        }
    }
    else {
        for (let index = 0; index < 8; index++) {
            trending_slide.innerHTML += `
                
                <div class="swiper-slide group" onclick="getIdForDetail(${trending.tv[index]["id"]},${false})"><img src="${image_link + trending.tv[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${trending.tv[index]["name"]}</p> </div></div>
                `

        }
    }


}


function loadUpcoming(movie) {
    upcoming_slide.innerHTML = ""
    let image_link = "https://image.tmdb.org/t/p/w500";
    if (movie) {

        for (let index = 0; index < 8; index++) {
            upcoming_slide.innerHTML += `
            
            <div class="swiper-slide group"><img src="${image_link + upcoming.movie[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${upcoming.movie[index]["title"]}</p> </div></div>
            `

        }
    }
    else {
        for (let index = 0; index < 8; index++) {
            upcoming_slide.innerHTML += `
                
                <div class="swiper-slide group"><img src="${image_link + upcoming.tv[index]["poster_path"]}" loading="lazy" alt="" class=" object-fill w-full h-52 lg:h-[28rem]  rounded-lg"><div class="absolute hidden justify-center items-center  group-hover:backdrop-brightness-50 group-hover:flex bottom-0 w-full h-full"><p class='text-white text-center font-bold'>${upcoming.tv[index]["name"]}</p> </div></div>
                `

        }
    }


}


function getIdForDetail(data,movieOrNot)
{
localStorage.setItem("detail",[data,movieOrNot])
window.location.href = "detail.html";

}

window.onload = () => {
    initTrending()
    initUpcoming()
    topMovie()

    console.log(trending.movie)
}

function topMovie() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };
   let choice = Math.floor(Math.random() * 10);

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/original";
            top_img.src = image_link + data["results"][choice]["backdrop_path"]
            top_title.innerText = data["results"][choice]["title"]

        })
        .catch(err => console.error(err));


}


trending_movie.addEventListener("click", () => {

    if (trending_circle.classList.contains("right-0")) {
        trending_circle.classList.replace('right-0', "left-0")
        trending_tv.classList.replace("text-slate-900", "text-white")
        trending_movie.classList.replace("text-white", "text-slate-900")
        loadTrending(true)
    }

})

trending_tv.addEventListener("click", () => {

    if (trending_circle.classList.contains("left-0")) {
        trending_circle.classList.replace('left-0', "right-0")
        trending_tv.classList.replace("text-white", "text-slate-900")
        trending_movie.classList.replace("text-slate-900", "text-white")
        loadTrending(false)
    }


})


upcoming_movie.addEventListener("click", () => {

    if (upcoming_circle.classList.contains("right-0")) {
        upcoming_circle.classList.replace('right-0', "left-0")
        upcoming_tv.classList.replace("text-slate-900", "text-white")
        upcoming_movie.classList.replace("text-white", "text-slate-900")
        loadUpcoming(true)
    }
})

upcoming_tv.addEventListener("click", () => {

    if (upcoming_circle.classList.contains("left-0")) {
        upcoming_circle.classList.replace('left-0', "right-0")
        upcoming_tv.classList.replace("text-white", "text-slate-900")
        upcoming_movie.classList.replace("text-slate-900", "text-white")
        loadUpcoming(false)
    }


})