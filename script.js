
if(
localStorage.getItem(
"loggedIn"
)!=="true"
){

window.location.href =
"login.html";
}

let clothes =
JSON.parse(
    localStorage.getItem("clothes")
) || [];

displayItems();

/* SAVE TO LOCAL STORAGE */

function saveData(){

    localStorage.setItem(
        "clothes",
        JSON.stringify(clothes)
    );
}

/* ADD ITEM */

function addItem(){

    let name =
    document.getElementById("name")
    .value.trim();

    let brand =
    document.getElementById("brand")
    .value.trim();

    let price =
    document.getElementById("price")
    .value;

    let category =
    document.getElementById("category")
    .value;

    let season =
    document.getElementById("season")
    .value;

    let occasion =
    document.getElementById("occasion")
    .value;

    let color =
    document.getElementById("color")
    .value.trim();

    let imageFile =
    document.getElementById("image")
    .files[0];

    if(
        !name ||
        !brand ||
        !price ||
        !color
    ){
        alert(
            "Please fill all fields."
        );
        return;
    }

    if(!imageFile){

        alert(
            "Please upload an image."
        );

        return;
    }

    let reader =
    new FileReader();

    reader.onload =
    function(e){

        let item = {

            id: Date.now(),

            name:name,

            brand:brand,

            price:price,

            category:category,

            season:season,

            occasion:occasion,

            color:color,

            image:e.target.result,

            favorite:false
        };

        clothes.push(item);

        saveData();

        displayItems();

        clearForm();
    };

    reader.readAsDataURL(
        imageFile
    );
}

/* DISPLAY ITEMS */

function displayItems(
    data = clothes
){

    let wardrobe =
    document.getElementById(
        "wardrobe"
    );

    wardrobe.innerHTML = "";

    if(data.length === 0){

        wardrobe.innerHTML = `

        <div class="empty-state">

            <h3>
            👗 No Clothes Found
            </h3>

            <p>
            Start building your wardrobe!
            </p>

        </div>

        `;

        return;
    }

    data.forEach(item => {

        wardrobe.innerHTML += `

        <div class="card">

            <div class="card-image">

                <img
                src="${item.image}"
                alt="${item.name}">

            </div>

            <div class="card-content">

                <h3>
                    ${item.name}
                </h3>

                <p>
                🏷 Brand:
                ${item.brand}
                </p>

                <p>
                🎨 Color:
                ${item.color}
                </p>

                <p>
                📂 Category:
                ${item.category}
                </p>

                <p>
                ☀ Season:
                ${item.season}
                </p>

                <p>
                🎉 Occasion:
                ${item.occasion}
                </p>

                <p>
                💰 ₹${item.price}
                </p>

                <button
                class="favorite-btn"
                onclick="toggleFavorite(${item.id})">

                ${
                    item.favorite
                    ? "❤️ Favorited"
                    : "🤍 Favorite"
                }

                </button>

                <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">

                Delete

                </button>

            </div>

        </div>

        `;
    });
}

/* DELETE ITEM */

function deleteItem(id){

    let confirmDelete =
    confirm(
        "Delete this clothing item?"
    );

    if(!confirmDelete){
        return;
    }

    clothes =
    clothes.filter(
        item =>
        item.id !== id
    );

    saveData();

    displayItems();
}

/* FAVORITE */

function toggleFavorite(id){

    clothes =
    clothes.map(item => {

        if(item.id === id){

            item.favorite =
            !item.favorite;
        }

        return item;
    });

    saveData();

    displayItems();
}

/* FILTER */

function filterItems(category){

    if(category === "All"){

        displayItems();

        return;
    }

    let filtered =
    clothes.filter(
        item =>
        item.category === category
    );

    displayItems(
        filtered
    );
}

/* SEARCH */

function searchItems(){

    let keyword =
    document
    .getElementById(
        "searchBar"
    )
    .value
    .toLowerCase();

    let filtered =
    clothes.filter(item =>

        item.name
        .toLowerCase()
        .includes(keyword)

        ||

        item.brand
        .toLowerCase()
        .includes(keyword)

        ||

        item.color
        .toLowerCase()
        .includes(keyword)

        ||

        item.category
        .toLowerCase()
        .includes(keyword)

        ||

        item.occasion
        .toLowerCase()
        .includes(keyword)

    );

    displayItems(
        filtered
    );
}

/* CLEAR FORM */

function clearForm(){

    document
    .getElementById("name")
    .value = "";

    document
    .getElementById("brand")
    .value = "";

    document
    .getElementById("price")
    .value = "";

    document
    .getElementById("color")
    .value = "";

    document
    .getElementById("image")
    .value = "";
}

function logout(){

    localStorage.removeItem(
    "loggedIn"
    );

    window.location.href =
    "login.html";
}
let user =
JSON.parse(
    localStorage.getItem("user")
);

if(
    user &&
    document.getElementById("welcomeUser")
){

    document.getElementById(
        "welcomeUser"
    ).innerHTML =
    ` Welcome, ${user.username} :)`;
}