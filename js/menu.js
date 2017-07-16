//smooth control y señalar en el navbar la sección donde nos encontramos

var navbarItems = document.getElementsByClassName('navbar-item');

for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].addEventListener('click', function (event) {
        var sectionToGo = this.getElementsByTagName('a')[0].href.split("#");

        deleteActiveClass(); //para quitar el sañalado del elemento que dejamos atrás
        this.classList.add('active'); //classList = lista de clases que tiene nuestro elemento. add añade una clase a las demás que hay. 'this' hace referencia la propio elemento que hemos hecho click, por el EventListener
        
        if (sectionToGo.length === 2) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll (id) {
    var elem;
    if (id === '') {
        elem = document.getElementsByClassName('header')[0];
    } else {
        elem = document.getElementById(id);
    }

    scrollToElement(elem);
}

function scrollToElement (element) {
    var jump = parseInt(element.getBoundingClientRect().top * 0.2); //getBoundingClientRect().top me dice las medidas relativas a las secciones en altura (top)

	scrollingElement = document.scrollingElement || document.documentElement;
    scrollingElement.scrollTop += jump;
    //document.body.scrollTop += jump;

    if (!element.lastJump || element.lastJump > Math.abs(jump)) {
        element.lastJump = Math.abs(jump);

        setTimeout(function() { //setTimeout() llama a una función recursivamente pasado un tiempo
            scrollToElement(element);
        }, 40);
    } else{
		element.lastJump = null;
	}
}

//hasta aquí smooth control

function deleteActiveClass() { //para borrar clase
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove('active'); //navbarItems no es realmente una lista
    }
}

/*$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});*/

//hasta aquí para el señalado de la barra menú

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0; //offsetTop te da la distancia hasta el padre, no realmente hasta el límite de la sección
        element = element.offsetParent;
    } while (element);

    return top;
}

//offset es ela distancia en pixeles desde donde estamos hasta donde queremos ir.
var offsetQuienSoy = acumulativeOffset(document.getElementById('quiensoy')) - 50;
var offsetStudies = acumulativeOffset(document.getElementById('estudios')) - 50;
var offsetWork = acumulativeOffset(document.getElementById('experiencia')) - 50;
var offsetMe = acumulativeOffset(document.getElementById('sobremi')) - 50;
var navbar = document.getElementsByClassName('navbar')[0]; //para saber dónde está el navbar. Es una lista y hay que coger el elemento cero.

window.addEventListener('scroll', changeMenuStyle); //a la ventana global

var previous;
function changeMenuStyle(event) { //función que va a decirnos donde estamos y qué hacer en cada caso
    var pageOffset = window.pageYOffset; //pageYOffset es donde me encuentro en la web en distancia (pixeles)

    if (pageOffset >= 0 && pageOffset < offsetQuienSoy) {
        if (!previous || previous !== 1) { //para que no me elimine la clase innecesariamente si no he cambiando de sección. Creo la variable previous
            previous = 1;
        } else if (previous === 1){
            return false;
        }
        
        deleteActiveClass();
        document.querySelector("a[href='#']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetQuienSoy && pageOffset < offsetStudies) {
        if (!previous || previous !== 2) {
            previous = 2;
        } else if (previous === 2){
            return false;
        }
        
        deleteActiveClass();
        document.querySelector("a[href$='quiensoy']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetStudies &&  pageOffset < offsetWork) {
        if (!previous || previous !== 3) {
            previous = 3;
        } else if (previous === 3){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='estudios']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetWork &&  pageOffset < offsetMe) {
        if (!previous || previous !== 4) {
            previous = 4;
        } else if (previous === 4){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='experiencia']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetMe) {
        if (!previous || previous !== 5) {
            previous = 5;
        } else if (previous === 5){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='sobremi']").parentNode.classList.add("active");
    }      
}