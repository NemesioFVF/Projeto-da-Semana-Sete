var ContTM = 0;

function add(input){
    if(input < 10) input = "0" + input;
    return input;
}

function data (d){
    
    let dia  = d.substring(8, 10);
    let mes = d.substring(5, 7);
    let ano = d.substring(0, 4);
    
    let horas = d.substring(11, 13);
    let minutos = d.substring(14, 16);
    let segundos = d.substring(17, 19);

    let fdate = new Date(ano, (mes - 1), dia, horas, minutos, segundos);

    ContTM = setInterval(() => {
        fdate.setSeconds(fdate.getSeconds() + 1);

        document.getElementById("IDtd").innerHTML = add(fdate.getHours()) 
        + ":" + add(fdate.getMinutes()) 
        + ":" + add(fdate.getSeconds())
        + " - " 
        + add(fdate.getDate()) + "." 
        + (add(fdate.getMonth() + 1)) 
        + "." + add(fdate.getFullYear());    
    }, 1000);
}

function Ccontinente(c){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + c.value);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let l = JSON.parse(this.responseText);

            for(let i = 0; i < l.length; i++){
                if(i == 0) document.getElementById("regiao").innerHTML = "<option selected hidden>Selecione Região</option>";

                else document.getElementById("regiao").innerHTML 
                += "<option value='" + l[i].substring(c.value.length 
                    + 1, l[i].length) + "'>" 
                    + l[i].substring(c.value.length + 1, l[i].length) + "</option>";
            }
        }
    }

    xhr.send();
}



function uct (i){
    let xhr = new XMLHttpRequest();
    let cont = document.getElementById("continente").value;

    xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + cont + "/" + i.value);

xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    let time = JSON.parse(this.responseText);
                    let div = document.getElementById("locaz");

                    if ((time.datetime.substring(11, 13) >= 6) && (time.datetime.substring(11, 13) < 12)){ 
                        div.className = "dia";
                    }

                    else if ((time.datetime.substring(11, 13) >= 12) && (time.datetime.substring(11, 13) < 18)){ 
                        div.className = "tarde";
                    }
                    else { 
                        div.className = "noite";
                  
                    }
                    div.innerHTML = "<table><tr><td><b>"+ time.timezone.substring(cont.length + 1, cont.length + time.timezone.length) +"</b></td></tr><tr><td>UTC "+ time.utc_offset +"</td></tr><tr><td id='IDtd'></td></tr></table>";

                   

                    clearInterval(ContTM);
                    data(time.datetime);
                }
            }
            xhr.send();
            document.getElementById("locaz").innerHTML = "<br>"+"Carregando...";
        }
