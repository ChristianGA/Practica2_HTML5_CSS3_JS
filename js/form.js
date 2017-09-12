//hacer aparecer textarea en Otros

function show() { document.getElementById('area').style.display = 'block'; }
function hide() { document.getElementById('area').style.display = 'none'; }

//limitar número de palabras

$(document).ready(function() {
    $("#info").on('keyup', function() {
        var words = this.value.match(/\S+/g).length;
        if (words > 150) {
            // Split the string on first 200 words and rejoin on spaces
            var trimmed = $(this).val().split(/\s+/, 150).join(" ");
            // Add a space at the end to keep new typing making new words
            $(this).val(trimmed + " ");
        }
        else {
            $('#display_count').text(words);
            $('#word_left').text(150-words);
        }
    });
 });

//validación
var form =  document.getElementsByTagName('form')[0]; //nos devuelve una lista y hay que coger el primero [0]

var inputNombre = document.getElementById("nombre");
var inputApellidos = document.getElementById("apellidos");
var emailInput = document.getElementById("email");
var contactoInput = document.getElementById("contact_number");
var textoInput = document.getElementById("texto");
var submitButton = document.getElementById("enviar");

var knowmeInput = {
    knowme1: document.getElementById("knowme_1"),
    knowme2: document.getElementById("knowme_2"),
    knowme3: document.getElementById("knowme_3"),
	knowme3: document.getElementById("knowme_4")
};

var loadingIcon = document.createElement('i');
loadingIcon.classList.add("fa", "fa-spinner", "fa-spin");

form.addEventListener("submit", function (event) {
    if (inputNombre.checkValidity() === false) {
        alert("Escribe tu nombre");
        inputNombre.focus(); //.focus me señala el elemento que está fallando
        event.preventDefault();
        return false;
    }

    if (inputApellidos.checkValidity() === false) {
        alert("Escribe tus apellidos");
        inputApellidos.focus();
        event.preventDefault();
        return false;
    }

    if (emailInput.checkValidity() === false) {
        alert("Introduce un email correcto");
        emailInput.focus();
        event.preventDefault();
        return false;
    }

    if (knowmeInput.knowme1.checkValidity() === false) {
        alert("Dime cómo me conociste");
        event.preventDefault();
        return false;
    }

    if (contactoInput.checkValidity() === false) {
        alert("Introduce el número de contacto válido (xxx-xxx-xxx)");
        contactoInput.focus();
        event.preventDefault();
        return false;
    }

    submitButton.setAttribute("disabled", "");
    submitButton.appendChild(loadingIcon);
    event.preventDefault(); //para ver el efecto: se recargaría la página y no lo veríamos

    setTimeout(function () {
        form.reset(); //para vaciar el formulario al enviar
        submitButton.removeAttribute("disabled");
        submitButton.removeChild(loadingIcon);
        sendNotification("Formulario recibido", "Body de ejemplo");
        console.log("llegó");
    }, 1000);
});
