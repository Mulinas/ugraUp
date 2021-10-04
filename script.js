class Menu{
    static stop = true;
    constructor(){
        this.width = 300;
        this.height = 200;
        let menu = document.createElement('div');

        menu.style.width = this.width + 'px';
        menu.style.height = this.height + 'px';
        menu.style.backgroundColor = 'black';
        menu.style.display = 'flex';
        menu.style.justifyContent = 'center';
        menu.style.alignItems = 'center';
        menu.style.flexDirection = 'column';
        menu.id = 'menu';
        
        document.querySelector('div#pole').append(menu);
        new StartBut();
        // new ExitBut();

    }
}

class Buttons{
    constructor(text, Id){
        this.text = text;
        this.Id = Id;
        this.width = 100;
        this.height = 30;

        let but = document.createElement('button');
        but.style.backgroundColor = 'red';
        but.style.width = this.width + 'px';
        but.style.height = this.height + 'px';
        but.style.marginBottom = '10px';
        but.style.marginTop = '10px';
        but.id = this.Id;
        but.innerText = this.text;
        document.querySelector('div#menu').append(but);

    }
}

class StartBut extends Buttons{
    constructor(){
        super('Старт', 'start');
        let menu = document.getElementById('menu');
        let st = document.getElementById('start'); 
        st.onclick = function(){menu.style.display = 'none'; Menu.stop = false;} 

    }
}

// class ExitBut extends Buttons{
//     constructor(){
//         super('Выход', 'exit');
//         let str = document.getElementById('div#pole');
//         let ex = document.getElementById('exit');
//         ex.onclick = function(){str.style.display = 'none'; Menu.stop = true;} 

//     }
// }

class Game{
    static enemyes = [];
    static Grav = 3;

    constructor(cont){
        this.cont = cont;
        this.width = 700;
        this.height = 400;
        let p =  document.createElement('div');
        
        p.style.width = this.width + 'px';
        p.style.height = this.height + 'px';
        p.style.backgroundColor = 'gray';
        p.style.display = 'flex';
        p.style.justifyContent = 'center';
        p.style.alignItems = 'center';
        p.id = 'pole';
        document.querySelector(cont).append(p);
    }


    start(){
        new Menu();
        this.nId = 1;
        this.hero = new Hero('div#pole');
        this.newEnemy = 0;
        this.int = setInterval(() => {
            if (Menu.stop == false) {
                this.newEnemy++;
                    if (this.newEnemy>65){this.createEnemyes(); this.newEnemy = 0;}
                this.loop(); 
            }
        }, 30);

    }

    createEnemyes(){
           Game.enemyes.push(new Enemy('div#pole', this.nId));
            this.nId++; 
        
    }

    gameover(){
        let XColl = false;
        let YColl = false;
        Game.enemyes.forEach(e => {
            if ((this.hero.x + this.hero.w >= e.x) && (this.hero.x <= e.x + e.w)) XColl = true;
            if ((this.hero.y + this.hero.h >= e.y) && (this.hero.y <= e.y + e.h)) YColl = true;
            if (XColl&YColl) clearInterval(this.int);
        });
    }

    loop(){
        Game.enemyes.forEach(e => {
            e.update();
            e.draw();
        });
        this.hero.update();
        this.hero.draw();
        this.gameover();
    }
}

class Pers{
    constructor(w, h, x, y, cont, id, color, nId=''){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.id = id + nId;
        this.color = color;
        this.draw_p(cont);
    }

    draw_p(cont){
        let he = document.createElement('div');
        he.style.width = this.w + 'px';
        he.style.height = this.h + 'px';
        he.style.position = 'absolute';
        he.style.left = this.x + 'px';
        he.style.top = this.y + 'px';
        he.style.backgroundColor = this.color;
        he.id = this.id;
        document.querySelector(cont).append(he);
        // return he;
    }

}

class Hero extends Pers{
    constructor(cont){
        super(50, 100, 50, 300, cont, 'hero', 'black');
        this.speed = 0;
        this.key = 0;
        const t = this;
        addEventListener('keydown', function(event){if (event.code == 'Space') 
        {if (t.key == 0){t.speed = -40; t.key = 1;}}});
        // if (t.key >= 2) {t.speed = 0; t.key = 0;}
        //addEventListener('keyup', function(event){if (event.code == 'Space') t.key = 0;});
        // addEventListener('keydown', function(event){if (event.code == Space) {this.loop(); key = 1;}});
        // addEventListener('keyup', function(event){if (event.code == Space) key = 0;});
        this.hero = document.getElementById('hero');
        
    }

    draw(){
        this.hero.style.top = this.y + 'px';
        // if (this.hero.style.top<='100px') setInterval(() => {
        //     this.hero.style.top = this.hero.style.top + 200 + 'px';
        // }, 1000);
          
    }

    update(){
        // if ((this.y==300)&&(this.key == 1)) this.y = this.y - 200;
        // if (this.key >= 2) {this.speed = 0; this.key = 0;}
        this.y += this.speed;
        this.speed += Game.Grav; 
        if (this.y>=300){this.speed = 0; this.y = 300; this.key = 0;}
        if (this.y <= 0) this.y = 0; 
        // if (this.key == 0) while(this.y<=300){this.y = this.y + 10; this.draw();}
        // if (this.y<=100) this.y = this.y + 10;
        // setInterval(() => {this.y = this.y + 10;}, 1000);
         
    }

    // loop(){
    //     // while (this.y<=300){
    //     //     this.update();
    //     //     this.draw(); 
    //     // }
    //     this.update();
    //     this.draw(); 
    // }
}

class Enemy extends Pers{

    constructor(cont, nId){
        let rand = Math.floor(Math.random()*101)+100;
        super(25, rand, 650, 400-rand, cont, 'enem', 'red', nId);
        this.enem = document.getElementById('enem'+nId);
    }

    draw(){
        this.enem.style.left = this.x + 'px';

    }

    update(){
        this.x = this.x - 5;
        if (this.x <= 0) {
            Game.enemyes.shift();
            this.enem.remove();
        }
    }



    // loop(){
    //     this.update();
    //     this.draw()
    // }
}

// let pole = new Pole('body');
// let hero = new Hero('div#pole');

// let enem = new Enemy('div#pole');
let game = new Game('body');
game.start();


