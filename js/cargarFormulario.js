document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const estado = document.getElementById("estado").value;
        const posts = parseInt(document.getElementById("posts").value, 10);

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const nuevoUsuario = {
            id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
            nombre,
            apellidos,
            email,
            estado,
            posts
        };


        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        window.location.href = "usuarios.html";
    });
});
