class Virus{
    constructor(x,y,r){
        var options={
            isStatic:true,
             Friction:1
        }
        this.x = x
        this.y = y
        this.r = r
        this.image = loadImage("Images/1stvirus.png");
        this.body = Bodies.circle(x,y,r, options)
        World.add(world,this.body)
        
    }
   
    display(){
       var pos = this.body.position;
       //ellipseMode(RADIUS);
       //ellipse(pos.x,pos.y,50,40);
       image(this.image,pos.x,pos.y,50,40);
    }
}