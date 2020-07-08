$(document).ready(function() {
  const questions = new DivMaker('#questions')
  const answers= new DivMaker('#answers')

  let map = new Map();
  let conID = new Map();
  let mySet1 = new Set();
  let mySet2 = new Set();
  var suur = null;
  var vaike = null;
  var color = 'green';
  let i = 0;
  

//SEE FUNTSIOON TEEB NII, ET ÜHEL POOLT EI SAAKS VAJUTADA ROHKEM, KUI ÜHE KORRA, KUI VAHEPEAL POLE TEISELE POOLE VAJUTATUD. PÄRAST PAARI SAAMIST, SAAB UUESTI SAMALT POOLT VAJUTADA. 
  function sobib(number){
   
     function Shuffle(o) {
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	      return o;
      };
  
    if(mySet1.size == mySet2.size){
      if(suur != null && vaike != null && !map.has(suur)){
        map.set(suur, vaike); 
        suur = null;
        vaike = null;   
      if(suur == null && vaike == null){
      //console.log("valin värvi");
      let colors = ['red','#F0E68C','#98FB98','#87CEFA','#FFA07A', '#FFD700', '#FF69B4', '#FF8C00', '#DDA0DD', '#D2691E', '#ADFF2F', '#9370DB', '#87CEEB', '#7FFFD4', '#20B2AA', '#BDB76B', '#000080', '#FFA500', '#DC143C'];
      Shuffle(colors);
      color = colors[i];
      i+=1;
    }
      }
      return 1;
    }
    else if(number == 1 && mySet1.size+1 == mySet2.size){
      return 2;
    }else if(number == 2 && mySet1.size == mySet2.size+1){
      return 2;
    }else{
      return null;
    }
  }


  //SEE FUNKTIOON ON ABIKS, ET MAP'IST SAAKS KÄTTE VÕTME, KUI VÄÄRTUS ON TEADA.
  function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }
//SEE KUSTUTAB ÄRA ÜHENDUSED
  function kustuta(id){
    var key;
    var value;
    if(mySet2.has(id)){
      key = getByValue(map, id);
      value = id;
    }
    if(mySet1.has(id)){
      value = map.get(id);
      key = id;
    }
    console.log("võti on " + key + " väärtus on " + value);
    $("#"+value).css('border', 'none');
    $("#"+key).css('border', 'none');
    
    mySet1.delete(key); 
    mySet2.delete(value);
    map.delete(key);
    jsPlumb.deleteConnection(conID.get(key));
    conID.delete(key);
  }
  
  function onMapis(id){
    if(getByValue(map, id) != null){
      return true;
    }
    if(map.get(id) != null){
      return true;
    }
    else{
      return false;
    }
  }

  
  $('.row').click(function(){
      const nr = $(this).attr('data');
     // console.log(nr);
      const id = $(this).attr('id');      
      
      if(mySet1.has(id) || mySet2.has(id)){
        if(sobib(nr) == 1){
             kustuta(id);
        }else if(!onMapis(id)){ 
          mySet1.delete(id) || mySet2.delete(id);
          $(this).css('border', 'none');
        } 
      } 
      else{
        if(nr == 1 && sobib(nr) != null){
          const ask = $(this).attr('id');
          mySet1.add(ask);
          suur = ask;
          $(this).css('border', ('4px solid '+color));
        }
        if(nr == 2 && sobib(nr) != null){
          const know = $(this).attr('id');
          mySet2.add(know);
          vaike = know;
          $(this).css('border', ('4px solid '+color));
        }
      //ÜHENDUSE LOOMINE
      if(screen.width > 480 && vaike != null && suur != null && (mySet1.has(suur) && mySet2.has(vaike))){
       jsPlumb.Defaults.Endpoint = "Blank";  
        var endpointOptions = { isSource: true, isTarget: true};
        var d1 = jsPlumb.addEndpoint( $("#"+suur), { anchor: "RightMiddle" }, endpointOptions );
        var d2 = jsPlumb.addEndpoint( $("#"+vaike), { anchor: "LeftMiddle" }, endpointOptions );
  
      var connect = jsPlumb.connect({
        source: d1,
        target: d2,
        connector: [ "Straight", { curviness: 1, stub: 30},  ],
        paintStyle:{ strokeWidth: 4, stroke:color }
        });
    
        if(suur !== null && connect !== null){
          conID.set(suur, connect);
        }
      }
      }
  });

    
// VASTUSTE KONTROLLIMINE PÄRAST KONTROLL NUPU VAJUTAMIST
  function kontrolliVastused(map){
    
    for (const [key, value] of map.entries()) {
      var voti = key;
      var vaartus= value.toUpperCase();
      console.log(voti, vaartus);
      if(voti !== vaartus){
        kustuta(key);
      }
      suur = null;
      vaike = null;
    }
  }

$('#kontroll').click(function(){
  if(suur != null && vaike != null){ 
    map.set(suur, vaike); //SELLE LISASIN SIIA, SEST VIIMANE ÜHENDUS EI LÄINUD MAP'I map.
  }
    console.log("Kontrolli vastused");
    var vastused =  kontrolliVastused(map);
    document.getElementById('tulemus').innerHTML = (map.size+ " ÕIGET JA " + (9 - map.size) + " VALET VASTUST");
   
  });

});

