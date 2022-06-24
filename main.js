var imagenes = new Array(3)
imagenes[0] = "Imagen/TBR.jpg"
imagenes[1] = "Imagen/TBR2.jpg"
imagenes[2] = "Imagen/TBR3.jpg"
var nom = new Array(3)
nom[0] = "Dead Saturday"
nom[1] = "Haunted House"
nom[2] = "Too Much La Collina"
var art = new Array(3)
art[0] = "Teenage Bottlerocket"
art[1] = "Teenage Bottlerocket"
art[2] = "Teenage Bottlerocket"
var an = new Array(3)
an[0] = "2015"
an[1] = "2015"
an[2] = "2015"

cont=0

const canciones = [
  "Dead Saturday.mp3",
  "Haunted House.mp3",
  "Too Much La Collina.mp3"
]
function inicio(){
  document.getElementById("fotos").src=imagenes[cont];
  document.getElementById("txtRepro").innerText="Reproductor";
  document.getElementById("nomCan").innerText=nom[cont];
  document.getElementById("nomArt").innerText=art[cont];
  document.getElementById("anio").innerText=an[cont];
}
var indiceActual = new Array(1)
//Funcion para crear mediante javascript el listado de canciones
function crearPlayList(){
	const listado = document.createElement('ol')
	listado.setAttribute("id", 'listadoMusica')
	for (let i = 0; i<canciones.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(canciones[i]))
		item.setAttribute("id", canciones.indexOf(canciones[i]))
		listado.appendChild(item)
	}
	return listado
}
 document.getElementById('playList').appendChild(crearPlayList())

var listadoMusica= document.getElementById('listadoMusica')
listadoMusica.onclick = (e) =>{
	const itemClick = e.target
	removeActive()
	itemClick.classList.add("active");
	reproduccionActual("Reproduciendo: "+ itemClick.innerText)
	loadMusic(itemClick.innerText)
	player.play()
	indiceActual[0]= e.target.id
	classIconPlay();

}
//Funcion para cambiar el icono del reprodutor
function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.classList.remove("bi-pause");
    element.classList.add("bi-play");
}
//Funcion para control del volumen
const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume =vol
}
//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () =>{
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100

		var duracionSegundos= player.duration.toFixed(0);
		dura=secondsToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=secondsToString(actualSegundos);

		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion
	}
	if (player.ended){
		nextMusic();//Reproducir la siguiente pista
	}
}
//Funcion para reproducir la proxima cancion
function nextMusic(){
  cont=(cont < imagenes.length-1)?cont+1 : 0;
  document.getElementById("fotos").src=imagenes[cont];
  document.getElementById("nomCan").innerText=nom[cont];
  document.getElementById("nomArt").innerText=art[cont];
  document.getElementById("anio").innerText=an[cont];
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (canciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(canciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	reproduccionActual("Reproduciendo: "+ canciones[siguiente])//canciones
	classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic(){
  cont=(cont > 0)?cont-1 : 2;
  document.getElementById("fotos").src=imagenes[cont];
  document.getElementById("nomCan").innerText=nom[cont];
  document.getElementById("nomArt").innerText=art[cont];
  document.getElementById("anio").innerText=an[cont];
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= canciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(canciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	reproduccionActual("Reproduciendo: "+ canciones[anterior])//canciones
	classIconPlay()
}
//Funcion para remover todas las clases css activas
function removeActive(){
	var elems = document.querySelectorAll(".active");
 	 [].forEach.call(elems, function(el) {
    	el.classList.remove("active");
 	 });
 	 return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}
//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta){
	var source = document.getElementById('source')
	var folder ="MusicaRep";//Carpeta donde tenemos almancenada la musica
	source.src= folder+"/"+ruta
  console.log(folder+"/"+ruta);
	var index= indiceActual[0]= canciones.indexOf(ruta)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual("Reproduciendo: "+ ruta)
	player.load()
}
//Funcion para pausar o darle play
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
   var element = document.getElementById("iconPlay");
   element.classList.toggle("bi-pause");
   element.classList.toggle("bi-play");
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	console.log(e);
}
//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
   var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour  + minute + ':' + second;
}

loadMusic(canciones[0])
