//identificando o tamanho da tela do usuario
var altura = 0
var largura = 0
var vidas = 1
var tempo = 25
var criaMoscaTempo = 2000

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
	tempo = 25
	criaMoscaTempo = 2000
	}
if(nivel === 'dificil'){
	tempo = 30
	criaMoscaTempo = 1500
	}
if (nivel === 'muito-dificil') {
	tempo = 40
	criaMoscaTempo = 1000
}



function ajustaTamanhoTela(){
	altura = window.innerHeight
	largura = window.innerWidth
}

ajustaTamanhoTela() //chamando a função para obter tamanho de tela

//gerando valores randomicos de 0-1 
//multiplicando pelos valores de tela atuais do usuario

//Precisamos encapsular e chamar a função pois ela carrega antes do 
//body existir, causando erro

var cronometro = setInterval(function() {
	tempo -= 1

	if (tempo < 0){
		clearInterval(cronometro)
		clearInterval(criaMosca)
		window.location.href = 'game-win.html'
	}else{
		document.getElementById('tempo-restante').innerHTML = tempo
	}
	
}, 1000)

function posicaoRandomica() { 

	//remover o mosquito anterior (caso exista)
	if( document.getElementById('mosquito') ){
		document.getElementById('mosquito').remove()

		if(vidas > 4){
			document.getElementById('v5').src = "img/coracao_vazio.png"
			window.location.href = 'game-over.html'
		}else{
		document.getElementById('v' + vidas).src = "img/coracao_vazio.png"

		vidas++
	}
}


	var posicaoX = Math.floor(Math.random() * largura) - 110 //tiramos 110 para que a imagem nao fique posicionada nos limites da tela
	var posicaoY = Math.floor(Math.random() * altura) - 110

	//por conta desse -110 precisamos fazer um operador ternario para nao correr o risco de o mosquito ficar fora da tela caso o numero randomico seja 0
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	//criar o elemento html 
	//criando um elemento e associando ao DOM como um filho
	var mosquito = document.createElement('img')
	mosquito.src = 'img/mosca.png'
	mosquito.className = tamanhoRandomicoMosca() + ladoRandomico()
	mosquito.style.left = posicaoX +'px'
	mosquito.style.top = posicaoY +'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function(){
		this.remove()
	}

	document.body.appendChild(mosquito)
}

function tamanhoRandomicoMosca() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosca0'
		case 1:
			return 'mosca1'
		case 2:
			return 'mosca2'
	}
}

function ladoRandomico() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return ' ladoA'
		case 1:
			return ' ladoB'
	}
}

function reiniciar(){
	window.location.href = 'index.html'
}

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value

    if(nivel === ''){
        alert('Selecione um nível para iniciar o Jogo')
        return false
    }
    
    window.location.href = 'jogo.html?' + nivel

}