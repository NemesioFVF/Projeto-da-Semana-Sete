const xhr = new XMLHttpRequest();
xhr.open("GET", "https://worldtimeapi.org/api/timezone");

xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let timezone = JSON.parse(this.responseText);

        for(let i = 1; i <= 12; i++){
            let req = new XMLHttpRequest();
            req.open("GET", "https://worldtimeapi.org/api/timezone/"+ timezone[getRandom(0, 386)]);

            req.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    let time = JSON.parse(this.responseText);
                    let div = document.getElementById(i);

                    if ((time.datetime.substring(11, 13) >= 6) && (time.datetime.substring(11, 13) < 12)){ 
                        div.className = "dia";
                    }

                    else if ((time.datetime.substring(11, 13) >= 12) && (time.datetime.substring(11, 13) < 18)){ 
                        div.className = "tarde";
                    }
                    else { 
                        div.className = "noite";
                  
                    }
                    div.innerHTML = "<table><tr><td><b>"+ time.timezone +"</b></td></tr><tr><td>UTC "+ time.utc_offset +"</td></tr><tr><td id='td"+ i +"'></td></tr></table>";

                    data(time.datetime, "td"+i)
                }
            }

            req.send();
        }
    }
}

xhr.send();

function add(input){
    if(input < 10) input = "0" + input;
    return input;
}

function data (d, id){
    
    let dia  = d.substring(8, 10);
    let mes = d.substring(5, 7);
    let ano = d.substring(0, 4);
    
    let horas = d.substring(11, 13);
    let minutos = d.substring(14, 16);
    let segundos = d.substring(17, 19);

    let fdate = new Date(ano, (mes - 1), dia, horas, minutos, segundos);

    setInterval(function(){
        let n = fdate.getSeconds();
        fdate.setSeconds(n + 1);

        document.getElementById(id).innerHTML = add(fdate.getHours()) 
        + ":" + add(fdate.getMinutes()) 
        + ":" + add(fdate.getSeconds())
        + " - " 
        + add(fdate.getDate()) + "." 
        + (add(fdate.getMonth() + 1)) 
        + "." + add(fdate.getFullYear()); 
        
    }, 1000);
}

function getRandom(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
