var navbar = document.getElementById("navbar")
var search_icon = document.getElementById("search-icon")
var search_bar = document.getElementById('search')
var search_input = document.getElementById("search-input")

// only this work
window.addEventListener('scroll', () => {
    if (window.scrollY != 0) {

        navbar.classList.add("bg-black")
    }
    else{

        navbar.classList.remove("bg-black")



    }

})

search_icon.addEventListener("click",()=>{


    if(search_icon.classList.contains("bi-search"))
        {
            search_icon.classList.replace("bi-search","bi-x-lg")
            search_bar.classList.replace("invisible","visible")

        }
    else{
        search_icon.classList.replace("bi-x-lg","bi-search")
        search_bar.classList.replace("visible","invisible")
    }
    
})

search_input.addEventListener("keypress",function(event){


    if(event.key === "Enter"){

        console.log("done")
        localStorage.setItem("search-bar",search_input.value)
        window.location.href = "search.html";
    }


})
