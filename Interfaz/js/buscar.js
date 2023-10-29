window.onload = init;

function init(){

    document.querySelector('.buscar').addEventListener('click', buscar);
    if(localStorage.getItem("token")){

    
        document.querySelector('.agregar').addEventListener('click', function() {
            window.location.href = "agregarempleado.html"
        });

        document.querySelector('.actualizar').addEventListener('click', function() {
            window.location.href = "modificarempleado.html"
        });

        document.querySelector('.eliminar').addEventListener('click', function() {
            window.location.href = "eliminarempleado.html"
        });   
    }
    else{
        window.location.href = "index.html";
    }
}

async function buscar() {
    const buscarnombre = document.getElementById('buscarnombre');
    const { data } = await axios.post(
        "http://localhost:3000/employee/buscar", 
        {
            data: {
                name: buscarnombre.value,
            }
        },
        {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
        }
    );
    console.log(data);
    displayempleados(data.empleado);
}

function displayempleados(empleados){
    const resultados = document.querySelector(".resultados");
    empleados.forEach(empleado => {
        resultados.innerHTML =`
        <p> ID: ${empleado.employee_id} </p> 
        <p> Nombre: ${empleado.name} </p> 
        <p> Apellidos: ${empleado.last_name} </p> 
        <p> Telefono: ${empleado.phone} </p> 
        <p> Correo: ${empleado.email}</p> 
        <p> Correo: ${empleado.address}</p> `;
    });
}
