function registerUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let user = {
        username: username,
        password: password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    alert("Registration Successful!");

    window.location.href = "index.html";
}

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (
        user &&
        user.username === username &&
        user.password === password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "index.html";

    } else {

        alert(
            "Invalid Username or Password"
        );
    }
}