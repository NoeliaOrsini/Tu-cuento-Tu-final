function generarCuento() {

  const titulo = document.getElementById("titulo").value.toUpperCase();
  const inicio = document.getElementById("inicio").value;
  const personaje = document.getElementById("personaje").value;
  const conflicto = document.getElementById("conflicto").value;
  const desarrollo = document.getElementById("desarrollo").value;
  const final = document.getElementById("final").value;

  const cuento = `${inicio} ${personaje} ${conflicto} ${desarrollo} ${final}`;

  // Mostrar título con formato
  const resultadoTitulo = document.getElementById("resultadoTitulo");
  resultadoTitulo.innerText = titulo; // Solo texto
  resultadoTitulo.className = "titulo"; // Aplicar clase CSS 'titulo'

  // Mostrar cuento
  document.getElementById("resultadoTexto").innerText = cuento;

  mostrarImagen();
}


function mostrarImagen() {
  const personaje = document.getElementById("personaje").value;
  const imagen = document.getElementById("imagenPersonaje");

  let ruta = "";

  if (personaje.includes("niña")) ruta = "img/nina.jpeg";
  else if (personaje.includes("niño")) ruta = "img/nino.jpeg";
  else if (personaje.includes("robot")) ruta = "img/robot.jpeg";
  else if (personaje.includes("dragón")) ruta = "img/dragon.jpeg";

  if (ruta) {
    imagen.src = ruta;
    imagen.style.display = "block";
  } else {
    imagen.style.display = "none";
  }
}

function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const titulo = document.getElementById("resultadoTitulo").innerText;
  const texto = document.getElementById("resultadoTexto").innerText;
  const imgElement = document.getElementById("imagenPersonaje");

  if (!imgElement.src || imgElement.style.display === "none") {
    alert("No se pudo cargar la imagen para el PDF.");
    return;
  }

  // Fondo color pastel
  doc.setFillColor(255, 224, 178);
  doc.rect(0, 0, 210, 297, 'F');

  let y = 20;

  // Agregar título
  if (titulo) {
    doc.setFontSize(18);
    doc.setTextColor(138, 43, 226); 
    doc.setFont("Helvetica", "bold");
    doc.text(titulo, 105, y, { align: "center" });
    y += 15;
  }

  // Agregar texto del cuento
  doc.setFontSize(14);
  doc.setTextColor(51, 51, 51);
  doc.setFont("Helvetica", "normal");
  const textoDividido = doc.splitTextToSize(texto, 170);
  doc.text(textoDividido, 105, y + 10, { align: "center" });

  
  // Cargar imagen
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgElement.src;

  img.onload = function () {
    doc.addImage(img, "JPEG", 50, 180, 100, 80); 
    doc.save("mi_cuento.pdf");
  };

  img.onerror = function () {
    alert("No se pudo cargar la imagen para el PDF.");
  };
}

function limpiarCuento() {
  document.getElementById("titulo").value = "";
  document.getElementById("desarrollo").value = "";
  document.getElementById("resultadoTitulo").innerText = "";
  document.getElementById("resultadoTexto").innerText = "";
  document.getElementById("imagenPersonaje").style.display = "none";
}

function leerCuento() {
  const titulo = document.getElementById("resultadoTitulo").innerText;
  const texto = document.getElementById("resultadoTexto").innerText;

  const cuentoCompleto = `${titulo}. ${texto}`;

  window.speechSynthesis.cancel();

  if (cuentoCompleto.trim() !== "") {
    const speech = new SpeechSynthesisUtterance(cuentoCompleto);
    speech.lang = "es-AR";
    window.speechSynthesis.speak(speech);
  }
}
