// Featured games
const games = [
    {
        id: 1,
        title: "Grand Theft Auto VI",
        price: 69.99,
        discount: 25,
        image: "images/gta6.webp"
    },
    {
        id: 2,
        title: "Last Of Us II, Remastered",
        price: 59.99,
        discount: 20,
        image: "images/last.avif"
    },
    {
        id: 3,
        title: "Asseto Corsa",
        price: 49.99,
        discount: 30,
        image: "images/asseto.avif"
    }
];

// Summer special discounted games
const summerGames = [
    {
        id: 4,
        title: "Red Dead Redemption 2",
        price: 49.99,
        discount: 88,
        image: "images/rdr2.jpg"
    },
    {
        id: 5,
        title: "Hogwarts Legacy",
        price: 59.99,
        discount: 80,
        image: "images/hog.webp"
    },
    {
        id: 6,
        title: "Cyberpunk 2077",
        price: 69.99,
        discount: 94,
        image: "images/cb.webp"
    },
    {
        id: 7,
        title: "FIFA 25",
        price: 59.99,
        discount: 92,
        image: "images/ff.webp"
    }
];

const allGames = [...games, ...summerGames];
let library = [];

// Add to Library
function addToLibrary(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (game && !library.some(item => item.id === gameId)) {
        library.push(game);
        updateLibraryDisplay();
    }
}

// Remove from Library
function removeFromLibrary(gameId) {
    library = library.filter(game => game.id !== gameId);
    updateLibraryDisplay();
}

// Update Library UI
function updateLibraryDisplay() {
    const libraryBody = document.querySelector("#librarySidebar .offcanvas-body");

    if (library.length === 0) {
        libraryBody.innerHTML = "<p>You haven't added any games to your library yet.</p>";
        return;
    }

    libraryBody.innerHTML = "<ul class='list-group'>";
    library.forEach(game => {
        const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
        libraryBody.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    ${game.title} <span class="badge bg-secondary">$${discountedPrice}</span>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromLibrary(${game.id})">Remove</button>
            </li>`;
    });
    libraryBody.innerHTML += "</ul>";
}

// Display Featured Games
function displayGames() {
    const gamesSection = document.querySelector("#games");
    games.forEach(game => {
        const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
        const card = `
            <div class="col-12 col-sm-6 col-md-4 mb-4">
                <div class="card">
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">Original Price: $${game.price.toFixed(2)}</p>
                        <p class="card-text text-success">Discount: ${game.discount}%</p>
                        <p class="card-text">Final Price: $${discountedPrice}</p>
                        <button class="btn btn-primary" onclick="addToLibrary(${game.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        gamesSection.innerHTML += card;
    });
}

// Display Summer Discounted Games
function displaySummerGames() {
    const summerSection = document.querySelector("#summer-discounts");
    summerGames.forEach(game => {
        const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
        const card = `
            <div class="col-12 col-sm-6 col-md-3 mb-4">
                <div class="card">
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">Original: $${game.price.toFixed(2)}</p>
                        <p class="card-text text-danger fw-bold">Discount: ${game.discount}%</p>
                        <p class="card-text">Now: $${discountedPrice}</p>
                        <button class="btn btn-primary" onclick="addToLibrary(${game.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        summerSection.innerHTML += card;
    });
}

// On DOM ready
document.addEventListener("DOMContentLoaded", () => {
    displayGames();
    displaySummerGames();
    updateLibraryDisplay();

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // Show scroll button when needed
    window.addEventListener("scroll", () => {
        scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("signInLink").addEventListener("click", () => {
    const authModal = new bootstrap.Modal(document.getElementById('authModal'));
    authModal.show();
});

});
