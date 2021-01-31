const xhr = new XMLHttpRequest();
xhr.open("GET", "https://worldtimeapi.org/api/ip");

            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    let time = JSON.parse(this.responseText);
                    let div = document.getElementById("i");

                    if ((time.datetime.substring(11, 13) >= 6) && (time.datetime.substring(11, 13) < 12)){ 
                        div.className = "dia";
                    }

                    else if ((time.datetime.substring(11, 13) >= 12) && (time.datetime.substring(11, 13) < 18)){ 
                        div.className = "tarde";
                    }
                    else { 
                        div.className = "noite";
                  
                    }
                    div.innerHTML = "<table><tr><td class='tds'><b>"+ time.timezone +"</b></td></tr><tr><td class='tds'>UTC "+ time.utc_offset +"</td></tr>"+"<tr><td class='tds'>IP: "+ time.client_ip +"</td></tr><tr><tdclass='tds'></td></tr><tr><td id='ip'></td></tr></table>";

                    data(time.datetime, "ip")
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
