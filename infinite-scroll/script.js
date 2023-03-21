const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const h1Error = document.getElementById("error");

const count = 30;
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=<API_KEY>&count=${count}`;

function showError() {
    loader.hidden = true;
    imageContainer.hidden = true;
    h1Error.textContent =
        "Oops, Something went wrong (probably need to set api key)";
}

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

let photos = [];

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const a = document.createElement("a");
        a.setAttribute("href", photo.links.html);
        a.setAttribute("target", "_blank");

        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);

        img.addEventListener("load", imageLoaded);

        a.appendChild(img);
        imageContainer.appendChild(a);
    });
}

async function getPhotos() {
    try {
        const res = await fetch(unsplashApiUrl);
        photos = await res.json();
        displayPhotos();
    } catch (error) {
        console.error(error);
        showError();
    }
}

window.addEventListener("scroll", () => {
    // Distance before we reach last photo.
    const distancePixels = 1000;
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - distancePixels &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

function start() {
    getPhotos();
}

start();
