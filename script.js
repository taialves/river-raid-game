var frames;
var cenario = document.getElementById("cenario");
var velocidade = 2;
var tamCenario = 700;
var tmpCriarObstaculo;
var gasolina;
var pontuacao;
var elPonto;
var velJogador = 2;
var obstaculos;
var nave;
var extra;
var barra;
var dirX, Xatual;
var cronometro;
var menu;
var telaFinal;
var telaPontuacao;
var telaQtdTanque;
var qtdTanque=0;
var contadorPonto;

// cria obstaculos
function criarObstaculo(){
    var y=0;
    var x = Math.floor(Math.random() * 450 + 150)
    var imgNum = Math.floor(Math.random() * 7 + 1)

    var obstaculo = document.createElement("img");
    var classe = document.createAttribute("class");
    var name = document.createAttribute("name");
    var style = document.createAttribute("style");
    var src = document.createAttribute("src");

    name.value = ""+imgNum;
    src.value = "img/"+imgNum+".png";
    classe.value = "obstaculo";
    style.value = "top:0px; left:"+x+"px";
    obstaculo.setAttributeNode(classe);
    obstaculo.setAttributeNode(style);
    obstaculo.setAttributeNode(src);
    obstaculo.setAttributeNode(name);
    cenario.appendChild(obstaculo);
}

//controla obstaculo

function controlaObstaculo(){
    obstaculos = document.getElementsByClassName("obstaculo");
    var qtd = obstaculos.length;

    for(var i=0; i<qtd; i++){
        if(obstaculos[i]){
            var acelerar = obstaculos[i].offsetTop;
            acelerar+= velocidade;
            obstaculos[i].style.top = acelerar+"px";

            if(acelerar >= tamCenario){
                
                if(obstaculos[i].name != "5" && obstaculos[i].name != "7"){
                    pontuacao++;
                }
                
                obstaculos[i].remove();
            }
        }
    }
}

function controlaJogador(){
    Xatual += dirX * velJogador;

    if(Xatual >= 150 && Xatual <= 600){
        
        nave.style.left = Xatual+"px";
    }

}
var tanque;
function colisao(){
    extra = 0;
    tanque = 0;
    var qtd = obstaculos.length;
    for(var i=0; i<qtd; i++){
        if(obstaculos[i]){
            
            if(obstaculos[i].offsetTop == 580 &&
                (
                    (obstaculos[i].offsetLeft + 50 > nave.offsetLeft &&  obstaculos[i].offsetLeft < nave.offsetLeft + 50)
                    
                
                )){

                if(obstaculos[i].name == "5"){
                    extra=10;
                    
                }else if(obstaculos[i].name == "7"){
                    tanque =1;
                    if(gasolina + 0.3 <= 100)
                        gasolina+= 0.3;
                }
                else{
                    exibirTelaFinal()
                }
            }

            if(obstaculos[i].offsetTop > 580 && 
                (
                    (nave.offsetLeft  < obstaculos[i].offsetLeft + 50 && nave.offsetLeft + 50  > obstaculos[i].offsetLeft)
                ) &&  obstaculos[i].offsetTop < 680 
            ){
                if(obstaculos[i].name == "5"){
                    extra=10;
                }else if(obstaculos[i].name == "7"){
                    tanque =1;
                    if(gasolina + 0.3 <= 100){
                        gasolina+= 0.3;
                    }
                        
                }else{
                    exibirTelaFinal()
                }
            }
        }
    }
}

function controleVitoria(){
    if(gasolina == -1){
        exibirTelaFinal()
    }
}

function controlaGasolina(){
    barra.style.width = gasolina+"%";
}

function controlePontuacao(){
    console.log(extra);
    elPonto.innerHTML = +pontuacao+"";
}

function exibirTelaFinal(){
    telaFinal.style.left = "0px";
    clearInterval(tmpCriarObstaculo);
    telaPontuacao.innerHTML = pontuacao+"";
    telaQtdTanque.innerHTML = qtdTanque+""; 
    window.cancelAnimationFrame();
   
}

function gameLoop(){
    controlaGasolina();
    controlaJogador();
    controlaObstaculo();
    controleVitoria();
    controlePontuacao();
    colisao();
    frames = requestAnimationFrame(gameLoop);
}

function inicia(){
    dirX = 0;
    extra = 0;
    Xatual = 350; 
    gasolina = 100;
    pontuacao = 0;
    tanque = 0;

    telaPontuacao = document.querySelector(".insert-ponto");
    telaQtdTanque = document.querySelector(".insert-tanque");
    telaFinal = document.getElementById("fim-game");
    elPonto = document.getElementById("pontos");
    nave = document.getElementById("nave");
    barra = document.getElementById("barra");
    nave.style.left = Xatual+"px";

    clearInterval(tmpCriarObstaculo);
    clearInterval(cronometro);
    clearInterval(contadorPonto);
    tmpCriarObstaculo = setInterval(criarObstaculo, 1000);
    
    cronometro = setInterval(()=>{
        gasolina-= 1; 
        
    },1000);

    var temporizador = setInterval(()=>{
        velocidade+=1;
        velJogador+=0.5
    },15000);

    contadorPonto = setInterval(()=>{
        if(extra == 10){
            pontuacao+=10;   
        }
        if(tanque == 1){
            qtdTanque+=tanque;
        }
    },1000)

    gameLoop();
}




document.querySelector(".btn-iniciar").addEventListener("click", ()=>{
    menu = document.getElementById("menu");
    menu.style.left = "-100%";
    inicia();

});

document.querySelector(".btn-reiniciar").addEventListener("click", ()=>{
    window.location.reload(true);

});


document.addEventListener("keydown",(ev)=>{

    switch (ev.key) {
        case "ArrowLeft":
            dirX = -1;
            break;
        case "ArrowRight":
            dirX = 1;
            break;
    }
})

document.addEventListener("keyup",(ev)=>{

    if(ev.key == "ArrowLeft" || ev.key == "ArrowRight"){
        dirX = 0;
    }
})