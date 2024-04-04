var canvas;
var ctx;
var fps = 1;

var canvasX =1000;
var canvasY = 400;

var tileX;
var tileY;

//Variables relaconadas con el tablero

var tablero;
var filas = 100;
var columnas = 100;
var blanco = '#FFFFFF';
var negro = '#000000';

function creaArray2D(f,c){
    var obj = new Array(c)
    for(y=0; y<c; y++){
        obj[y] = new Array(f)
    }

    return obj;
}

function inicializaTablero(obj){
    var estado;

    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            estado = Math.floor(Math.random()*2);
            obj[y][x] = new Agente(y,x,estado); 
            console.log(estado);
        }
    }
    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            obj[y][x].addVecinos(); 
        }
    }
}

//OBJETO AGENTE O TURMITA
var Agente = function(x,y,estado){
    this.x = x;
    this.y = y;
    this.estado = estado;            //Vivo = 1, Muerto = 2
    this.estadoProx = this.estado;   //estado que tendrá en el siguiente ciclo

    this.vecinos = [];               //guardamos el listado de sus vecinos

    //Método que añade los vecinos del objeto actual
    this.addVecinos = function(){
        var xVecino;
        var yVecino;

        for(i=-1; i<2;i++){
            for(j=-1;j<2;j++){
                xVecino = (this.x + j + columnas) % columnas; 
                yVecino = (this.y + i + filas) % filas; 
            }

            //descartamos el agente actual
            if(i!=0 && j!=0){
                this.vecinos.push(tablero[yVecino][xVecino]);
            }
        }
    }

    this.dibuja = function(){
        var color;
        if(this.estado == 1){
            color = blanco;
        }else{
            color = negro;
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
    }
}

function inicializar(){
    //Asociamos el canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //Ajustamos el tamaño de canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    //Calculamos el tamaño de los tiles
    tileX = Math.floor(canvasX/filas);
    tileY = Math.floor(canvasY/columnas);

    //creamos el tablero
    tablero = creaArray2D(filas, columnas);

    //inicializa tablero
    inicializaTablero(tablero);

    //Ejecutamos el bucle principal
    setInterval(function(){principal();}, 1000/fps);

    function dibujaTablero(obj){
        for(y=0; y<columnas; y++){
            for(x=0; x<filas; x++){
                obj[y][x].dibuja;
            }
        }
    }

    function borraCanvas(){
        canvas.width = canvas.width;
        canvas.height = canvas.height;
    }

    function principal(){
        console.log('interval');
        borraCanvas();
        dibujaTablero(tablero);
    }
};

    
