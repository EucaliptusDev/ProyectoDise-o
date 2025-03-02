const usuariosPorPagina = 3;
let paginaActual = 1;

// Cargar usuarios desde localStorage o usar valores por defecto
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    { id: 1, nombre: "Juan", apellidos: "Pérez", email: "juan.perez@example.com", estado: "Activo", posts: 10 },
    { id: 2, nombre: "Ana", apellidos: "Gómez", email: "ana.gomez@example.com", estado: "Bloqueado", posts: 5 },
    { id: 3, nombre: "Carlos", apellidos: "Martínez", email: "carlos.martinez@example.com", estado: "Activo", posts: 15 },
    { id: 4, nombre: "Laura", apellidos: "Sánchez", email: "laura.sanchez@example.com", estado: "Bloqueado", posts: 3 },
    { id: 5, nombre: "Pedro", apellidos: "López", email: "pedro.lopez@example.com", estado: "Activo", posts: 8 },
    { id: 6, nombre: "Marta", apellidos: "García", email: "marta.garcia@example.com", estado: "Bloqueado", posts: 12 },
    { id: 7, nombre: "Luis", apellidos: "Fernández", email: "luis.fernandez@example.com", estado: "Activo", posts: 9 },
    { id: 8, nombre: "Sofia", apellidos: "Romero", email: "sofia.romero@example.com", estado: "Activo", posts: 14 },
    { id: 9, nombre: "Raúl", apellidos: "Díaz", email: "raul.diaz@example.com", estado: "Bloqueado", posts: 2 },
    { id: 10, nombre: "Elena", apellidos: "Torres", email: "elena.torres@example.com", estado: "Activo", posts: 6 },
    { id: 11, nombre: "Miguel", apellidos: "Vázquez", email: "miguel.vazquez@example.com", estado: "Bloqueado", posts: 5 },
    { id: 12, nombre: "Cristina", apellidos: "Alonso", email: "cristina.alonso@example.com", estado: "Activo", posts: 7 }
];

// Guardar usuarios en localStorage
function guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Renderizar usuarios en la lista
function renderUsuarios() {
    const usuariosContainer = document.getElementById('usuariosContainer');
    usuariosContainer.innerHTML = '';

    // Calcular los usuarios a mostrar en esta página
    const start = (paginaActual - 1) * usuariosPorPagina;
    const end = paginaActual * usuariosPorPagina;
    const usuariosPagina = usuarios.slice(start, end);

    usuariosPagina.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'col-lg-4');

        div.innerHTML = `
            <div class="card mb-3 shadow-sm" style="opacity: ${usuario.estado === 'Bloqueado' ? '0.5' : '1'}; transition: opacity 0.3s ease;">
                <div class="card-body text-center"> 
                    <h5 class="card-title">${usuario.nombre} ${usuario.apellidos}</h5>
                    <p class="card-text">Email: ${usuario.email}</p>
                    <p class="card-text">Estado: ${usuario.estado}</p>
                    <p class="card-text">Posts: ${usuario.posts}</p>
                    
                    <div class="d-grid gap-2">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-warning w-100" onclick="editarUsuario(${usuario.id})">Editar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger w-100" onclick="confirmarAccion('borrar', ${usuario.id})">Borrar</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button class="btn ${usuario.estado === 'Bloqueado' ? 'btn-success' : 'btn-secondary'} w-100" onclick="confirmarAccion('${usuario.estado === 'Bloqueado' ? 'desbloquear' : 'bloquear'}', ${usuario.id})">${usuario.estado === 'Bloqueado' ? 'Desbloquear' : 'Bloquear'}</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-info w-100" onclick="verPublicaciones()">Publicaciones</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
    
        usuariosContainer.appendChild(div);
    });

    guardarUsuarios(); 
    renderPaginacion();
}

function editarUsuario(id) {
    window.location.href = `editarUsuario.html?id=${id}`;
}

function verPublicaciones() {
    window.location.href = `verPublicaciones.html`;
}

function renderPaginacion() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const paginaBtn = document.createElement('button');
        paginaBtn.classList.add('btn', 'btn-secondary', 'mx-1');
        paginaBtn.textContent = i;
        paginaBtn.onclick = () => {
            paginaActual = i;
            renderUsuarios();
        };
        paginationContainer.appendChild(paginaBtn);
    }
}

function confirmarAccion(accion, id) {
    const modalMensaje = document.getElementById('modalMensaje');
    const btnConfirmarAccion = document.getElementById('btnConfirmarAccion');
    
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;

    switch (accion) {
        case 'borrar':
            modalMensaje.textContent = `¿Seguro que quieres borrar a ${usuario.nombre} ${usuario.apellidos}?`;
            btnConfirmarAccion.className = "btn btn-danger";
            break;
        case 'bloquear':
            modalMensaje.textContent = `¿Seguro que quieres bloquear a ${usuario.nombre} ${usuario.apellidos}?`;
            btnConfirmarAccion.className = "btn btn-warning";
            break;
        case 'desbloquear':
            modalMensaje.textContent = `¿Seguro que quieres desbloquear a ${usuario.nombre} ${usuario.apellidos}?`;
            btnConfirmarAccion.className = "btn btn-success";
            break;
    }

    btnConfirmarAccion.onclick = function () {
        if (accion === 'borrar') {
            usuarios = usuarios.filter(u => u.id !== id);
        } else {
            usuario.estado = accion === 'bloquear' ? 'Bloqueado' : 'Activo';
        }

        guardarUsuarios();
        renderUsuarios();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmacion'));
        modal.hide();
    };

    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    modal.show();
}

document.addEventListener('DOMContentLoaded', renderUsuarios);
