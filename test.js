var x;
for(x=0;x<3;x++){
	setTimeout(function(){console.log(x);}, 1000);
}

var x = 1;

(function(fn){
    var x = 2;
    fn();
    (function(){
    	fn();
    }())
}(function(){
    console.log(x);
}));

(function(fn){
    var x = 2;
    fn();
    (function(fn){
    	fn();
    }(fn))
}(function(){
    console.log(x);
}));

(function(fn){
    var x = 2;
    fn();
    fn = function(){
    	console.log(x);
    }
    (function(fn){
    	fn();
    }(fn))
}(function(){
    console.log(x);
}));

(function(fn){
    var x = 2;
    fn();
    (function(fn){
    	fn();
    }(function(){
    	console.log(x);
    }))
}(function(){
    console.log(x);
}));