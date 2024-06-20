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
                trending.movie.push(image_link + data["results"][index]["poster_path"])
                trending_slide.innerHTML += `
                
                <div class="swiper-slide "><img src="${trending.movie[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"></div>
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
                trending.tv.push(image_link + data["results"][index]["poster_path"])


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
                upcoming.movie.push(image_link + data["results"][index]["poster_path"])
                upcoming_slide.innerHTML += `
                
                <div class="swiper-slide "><img src="${upcoming.movie[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"></div>
                `
            }
        }
        )
        .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/w500";
            for (let index = 0; index < 8; index++) {
                upcoming.tv.push(image_link + data["results"][index]["poster_path"])


            }

        }


        )
        .catch(err => console.error(err));
}

function loadTrending(movie) {

    trending_slide.innerHTML = ""

    if (movie) {

        for (let index = 0; index < 8; index++) {
            trending_slide.innerHTML += `
            
            <div class="swiper-slide "><img src="${trending.movie[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"></div>
            `

        }
    }
    else {
        for (let index = 0; index < 8; index++) {
            trending_slide.innerHTML += `
                
                <div class="swiper-slide "><img src="${trending.tv[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"></div>
                `

        }
    }


}


function loadUpcoming(movie) {
    upcoming_slide.innerHTML = ""
    if (movie) {

        for (let index = 0; index < 8; index++) {
            upcoming_slide.innerHTML += `
            
            <div class="swiper-slide "><img src="${upcoming.movie[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 md:h-[28rem]  rounded-lg"></div>
            `

        }
    }
    else {
        for (let index = 0; index < 8; index++) {
            upcoming_slide.innerHTML += `
                
                <div class="swiper-slide "><img src="${upcoming.tv[index]}" loading="lazy" alt="" class=" object-fill w-full h-52 lg:h-[28rem]  rounded-lg"></div>
                `

        }
    }


}


window.onload = () => {
    initTrending()
    initUpcoming()
    topMovie()
}

function topMovie() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
        .then(data => {
            let image_link = "https://image.tmdb.org/t/p/original";
            top_img.src = image_link + data["results"][0]["backdrop_path"]
            top_title.innerText = data["results"][0]["title"]

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