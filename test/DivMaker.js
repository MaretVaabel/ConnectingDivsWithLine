class DivMaker{
  constructor(selector){
    this.ROWS=9;
    this.selector = selector;
    this.createGrid();
  }
 
  createGrid(){
   // console.log(this.selector);
    const $board = $(this.selector);
    var ask = ["A", "E", "I", "O", "U", "Õ", "Ä", "Ö", "Ü"];
    var know = ["a", "e", "i", "o", "u", "õ", "ä", "ö", "ü"];

     function Shuffle(o) {
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	      return o;
      };
    
    if(this.selector == "#questions"){

    for(let row = 0; row < this.ROWS; row++){
      const $row = $('<div>')
      .addClass('row parent') 
      .attr('id', ask[row])
      .attr('data', 1)
      .attr('nr', row)
      .text(ask[row]);
      
      $board.append($row);
    }}
    if(this.selector == "#answers"){
     Shuffle(know);
       for(let row = 0; row < this.ROWS; row++){
      const $row = $('<div>')
      .addClass('row child') 
      .attr('id', know[row])
      .attr('data', 2)
      .attr('nr', row)
      .text(know[row]);
      
      $board.append($row);
    }
    }
   // console.log($board.html());
  }
 
 
}