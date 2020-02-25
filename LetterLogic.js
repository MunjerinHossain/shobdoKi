
var SampleArray = ["bhalo",
"apu" ,
"ma" ,
"khela", 
"bhai" ,
"biral" ,
"pani"  ,
"morich",
"alo" ,
"murgi", 
"goru" ,
"chagol",
"jambura",
"zumka",
"vagavagi"
];



 const letterFrequency=()=> {
        var SampleArray_2 = SampleArray.toString();
        var Alphabets = "abcdefghijklmnopqrstuvwxyz"
        var CharFreq = {};

        for(var i = 0; i < Alphabets.length; i++){
            var count = 0;
            for(var j = 0; j < SampleArray_2.length; j++) {
                if(SampleArray_2[j] == Alphabets[i]){
                    count++;
                    
                }
            }
            CharFreq[Alphabets[i]] = count        
        }
        //console.log(CharFreq)
        //console.table(CharFreq)
        return CharFreq;
    }

    const sortLetters=()=> {
        let letterscount = letterFrequency();
        //var letters = [];
        var Letters = {};
        
        for(let [key, value] of Object.entries(letterscount)) {
            if(value != 0){
                //Letters.push([key, value])
                Letters[key] = value;
            }
        }
        //console.log(Letters);
        return Letters;
    }

    const generateKeyboard=()=> {
        let keycount = sortLetters();
        var letters1 = {};

        var lol = Object.values(keycount)
        var lol1= lol.reduce((a, b) => a + b,0)
        //console.log(lol1);
        var keylength = 28;
        for(let [key, value] of Object.entries(keycount)){
            var abc = value/lol1;
            var def = abc * keylength
            if(def < 1){
                letters1[key] = Math.ceil(def);
            }
            else{
                letters1[key] = Math.floor(def);
                if(letters1[key] > 3){
                    letters1[key] = 3;
                    
                }
            }

        }
        //console.log(letters1)
        return letters1
    }

    const keyboard1=()=>{
        let keycount2 = generateKeyboard();
        var letters2 = [];
        
        for(let [key, value] of Object.entries(keycount2)){
            if( value >= 2){
                for(var i = 0; i < value; i++){
                    letters2.push({letter: key, Player1: 0, Player2: 0})
                }
            }
            else{
                letters2.push({letter: key, Player1: 0, Player2: 0})
            }
        }
        console.log("Before ",letters2.length)
        console.table(letters2)
        if(letters2.length < 28){
            let temp= letters2.length
            for(var i = 0; i < 28 - temp; i++){
                let randomIndex = ((Math.random()) * temp);
                randomIndex = Math.floor(randomIndex)
                console.log(randomIndex, letters2[randomIndex])
                letters2.push(letters2[randomIndex])
            }
        }
        
        console.table(letters2)
        console.log("After ",letters2.length)
        return letters2;
        
    }
    //console.log(keyboard1())
    export default keyboard1;
