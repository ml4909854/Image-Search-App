const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");
const showmorebtn = document.getElementById("show-more-button");
const searchresult = document.getElementById("search-result");

let key = "";
let page = 1;
const client_id = 'rrOXRZ_06MoA_XTcEDDZLPbBk9Q0s_VnFoTGlJHCs3E'; // API Key

async function searchImages() {
    key = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&client_id=${client_id}&per_page=12`;

      
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Data:", data); // Log the API data for debugging
       
        const results = data.results;
        console.log("Results Array:", results); // Log the results array

       if(page===1){
        searchresult.innerHTML = ""
       } // Clear previous results

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.appendChild(image);
            searchresult.appendChild(imagelink);
        });
        showmorebtn.style.display ="block"

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmorebtn.addEventListener("click" , ()=>{
    page++
    searchImages()
})