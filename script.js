var debutDate = new Date();
var endDate = new Date(debutDate.getFullYear(), debutDate.getMonth(), debutDate.getDate()+ 2);
// var KilometreParcouru = 10;
var totalHourOfDay = 10

var data = {
    basic: 12,
    reduit: 9,
    multimodal: 43,
    etudiant: 36,
    abonner:{
        cat1: {
            heure: 2.70,
            journee: 27,
            KMSInf100: 0.41,
            dimancheHeure: 1,
            dimancheDay: 10
        },
        cat2: {
            heure: 3,
            journee: 30,
            KMSInf100: 0.46,
            dimancheHeure: 2,
            dimancheDay: 20
        },
        cat3: {
            heure: 4,
            journee: 40,
            KMSInf100: 0.51,
            dimancheHeure: 3,
            dimancheDay: 30
        }
    },
    nonAbonner: {
        cat1: {
            heure: 4,
            journee: 40,
            KMSInf100: 0.46,
            dimancheHeure: 3,
            dimancheDay: 30
        },
        cat2: {
            heure: 5,
            journee: 50,
            KMSInf100: 0.51,
            dimancheHeure: 4,
            dimancheDay: 40
        },
        cat3: {
            heure: 6,
            journee: 60,
            KMSInf100: 0.56,
            dimancheHeure: 5,
            dimancheDay: 50
        }
    }
}

function initData()
{
    //recupere date
    var inputDebutDate = document.getElementById('debutDate');
    var inputFinDate = document.getElementById('finDate');

    //recupere le nombre de kilometre
    var inputKilometreParcouru = document.getElementById('kilometre');

    //recupere les heures de debut
    var debutHeure = document.getElementById('debutHeure');
    var debutMinute = document.getElementById('debutMinute');

    //recupere les heures de fin
    var finHeure = document.getElementById('finHeure');
    var finMinute = document.getElementById('finMinute');

    inputDebutDate.value = debutDate.toISOString().substring(0, 10);
    inputFinDate.value = endDate.toISOString().substring(0, 10);

    //set debut heure with hour of day
    debutHeure.value = debutDate.getHours();
    debutMinute.value = debutDate.getMinutes();

    finHeure.value = debutDate.getHours();
    finMinute.value = debutDate.getMinutes(); 

    inputKilometreParcouru.value = 10;
}
initData()

function calculeTime()
{
    console.clear();
    var inputDebutDate = document.getElementById('debutDate');
    var debutHeure = document.getElementById('debutHeure');
    var debutMinute = document.getElementById('debutMinute');
    
    var inputFinDate = document.getElementById('finDate');
    var finHeure = document.getElementById('finHeure');
    var finMinute = document.getElementById('finMinute');

    var totalTime = document.getElementById('totalTime');
    var debutDate = new Date(inputDebutDate.value);
    var finDate = new Date(inputFinDate.value);

    //get value of input radio cat
    var categorie = document.querySelector('input[name="cat"]:checked').value;
    var formule = document.querySelector('input[name="formule"]:checked').value;


    //add to inputDebutDate the hour and minute
    debutDate.setHours(debutHeure.value, debutMinute.value);
    finDate.setHours(finHeure.value, finMinute.value);

    //Check si date de fin est inferieure a date de debut
    if(finDate.getTime() < debutDate.getTime())
    {
        const switched = debutDate;

        document.getElementById('debutDate').value = finDate.toISOString().substring(0, 10);
        document.getElementById('debutHeure').value = finHeure.value;
        document.getElementById('debutMinute').value = finMinute.value;
        debutDate = finDate

            
        document.getElementById('finDate').value = switched.toISOString().substring(0, 10);
        document.getElementById('finHeure').value = switched.getHours();
        document.getElementById('finMinute').value = switched.getMinutes();
        finDate = switched;
    }

    var nbDay = Math.ceil((finDate.getTime() - debutDate.getTime()) / (1000 * 3600 * 24));

    nbDay = 0
    let MinDate = new Date(debutDate);
    let initDate = new Date(debutDate);
    let MaxDate = new Date(finDate);

    MinDate.setHours(0,0,0,0)
    initDate.setHours(0,0,0,0)
    MaxDate.setHours(0,0,0,0)

    for (let index = 0; MinDate.getTime() < MaxDate.getTime(); index++) {
        MinDate = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate()+index);
        nbDay++
    }

    console.log("nombre de jour: ", nbDay)

    var day = debutDate

    //get time stamp next day
    var actuelDay = day
    var nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    var arrayPrix = []

    if(nbDay == 0)
    {   
        //check si il y a plus de 10 entre actuealDay et finDate
        let nbHour = Math.ceil((finDate.getTime() - actuelDay.getTime()) / (1000 * 3600));
        console.log("1 journée avec " +nbHour+" d'heure")

        //attribution des heures de reduction 
        let reduc8heure = new Date(actuelDay)
        let reduc22heure = new Date(actuelDay)

        reduc8heure.setHours(8,0,0,0)
        reduc22heure.setHours(22,0,0,0)
        let nbHourUnder8 = 0
        let nbHourOver22 = 0

        console.log(finDate.getTime() - actuelDay.getTime(), (totalHourOfDay * (3600000)))
        //test si plus de 10 heure entre actuelDay et finDate
        if(finDate.getTime() - actuelDay.getTime() < (totalHourOfDay * (3600000)))
        {
            //enlever les heures tarif reduit avant 8 heures
            if(reduc8heure.getTime() > actuelDay.getTime() && reduc8heure.getTime() > finDate.getTime())
            {
                nbHourUnder8 = Math.ceil((finDate.getTime() - actuelDay.getTime()) / (1000 * 3600));
                console.log("heure minuit 8h icicici: ",nbHourUnder8)

                nbHour = 0;
            }
            else if(reduc8heure.getTime() > actuelDay.getTime())
            {
                nbHourUnder8 = Math.ceil((reduc8heure.getTime() - actuelDay.getTime()) / (1000 * 3600));
                console.log("heure minuit 8h: ",nbHourUnder8)
            }

            //enlever les heures tarif reduit apres  22 heures
            if(reduc22heure.getTime() < finDate.getTime() && reduc22heure.getTime() < actuelDay.getTime())
            {
                nbHourOver22 = Math.floor((finDate.getTime() - actuelDay.getTime()) / (1000 * 3600));
                console.log("heure 22h minuit: ", nbHourOver22)

                nbHour = 0;
            }
            else if(reduc22heure.getTime() < finDate.getTime())
            {
                nbHourOver22 = Math.floor((finDate.getTime() - reduc22heure.getTime()) / (1000 * 3600));
                console.log("heure 22h minuit: ", nbHourOver22)
            }
        }

        //recuperer les heures restantes
        let heureRestante = nbHour - (nbHourUnder8 + nbHourOver22)

        if(heureRestante < 0) heureRestante = 0
        console.log("Nombre d'heure tarif / 2 : ", nbHourUnder8 + nbHourOver22)
        console.log("Heures tarif normal: ", heureRestante)

        let prix = 0;
        prix += ((nbHourUnder8 + nbHourOver22) * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2
        prix += (heureRestante * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
        arrayPrix.push(prix > totalHourOfDay * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)) ? totalHourOfDay * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)) : prix)

        //calcule nombre d'heure plusieur jour
        totalTime.innerHTML = nbHour + " heures";
    }
    else
    {
        for(let i = 0; i < nbDay; i++)
        {
            if(i != 0)
            {
                actuelDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+ i);
                console.log("ActuelDay: ", actuelDay)
            }

            if(i == nbDay - 1)
            {
                console.log("Cas du dernier jour")
                nextDay = finDate
                console.log("Jour nb -> " + i, nextDay)
            }
            else
            {
                nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+ (i+1));
                console.log("Jour nb -> " + i, nextDay)
            }

            if(nextDay.getTime() - actuelDay.getTime() == 172800000)
            {
                arrayPrix.push(totalHourOfDay * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
            }
            else
            {   
                let hour = Math.ceil((nextDay - actuelDay) / 3600000)
                console.log("Nombre d'heure du jour: ", hour)
                if(hour >= 10)
                {
                    ///////////////nouveau avec prise des heures reduites////////////////:
                    //if dernier jour de calcule
                    if(i == nbDay - 1)
                    {
                        //if le temps est inferieur a 8h ducoup on divise par 2 le total
                        if(hour - 8 <= 0)
                        {
                            arrayPrix.push((hour * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)) / 2))
                        }
                        else
                        {
                            let prix = 0;
                            //reduc meme jour complet
                            // prix += (8 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2
                            // prix += (2 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))

                            prix += (10 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))

                            arrayPrix.push(prix)
                        }
                    }
                    //////////reduc premier jour///////////
                    else if(i == 0)
                    {
                        if(false && hour - 2 <= 0)
                        {
                            arrayPrix.push((hour * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2)
                        }
                        else
                        {
                            let prix = 0;
                            //reduc meme sur jour complet
                            // prix += (2 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2
                            // prix += (8 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                            prix += (10 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                            arrayPrix.push(prix)
                        }
                    }
                    else
                    {
                        // arrayPrix.push(hour * data[formule][categorie].heure)
                        arrayPrix.push(totalHourOfDay * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                    }
                }
                else
                {
                    //if dernier jour de calcule
                    if(i == nbDay - 1)
                    {
                        //if le temps est inferieur a 8h ducoup on divise par 2 le total
                        if(hour - 8 <= 0)
                        {
                            arrayPrix.push((hour * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2)
                        }
                        else
                        {
                            let prix = 0;
                            prix += (8 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2
                            prix += ((hour - 8) * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                            arrayPrix.push(prix)
                        }
                    }
                    //////////reduc premier jour///////////
                    else if(i == 0)
                    {
                        if(hour - 2 <= 0)
                        {
                            arrayPrix.push((hour * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2)
                        }
                        else
                        {
                            let prix = 0;
                            prix += (2 * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure))) / 2
                            prix += ((hour - 2) * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                            arrayPrix.push(prix)
                        }
                    }
                    else
                    {
                        arrayPrix.push(hour * (actuelDay.getDay() == 0 ? (data[formule][categorie].dimancheHeure) : (data[formule][categorie].heure)))
                    }
                }
            }
        }


        //calcule nombre d'heure plusieur jour
        var time = finDate.getTime() - debutDate.getTime();
        if(time < 0)
        {
            time = time * (-1)
        }
    
        console.log("TimeStamp entre debut et fin:", time)
        var timeToHours = time / (1000 * 60 * 60);
        
        var timeToHoursArrondi = Math.ceil(timeToHours);
        totalTime.innerHTML = timeToHoursArrondi + " heures";
    }

    console.log("Prix par jour :\n",arrayPrix)

    var realHour = 0;
    var prixHour = 0;
    
    do {
        if(timeToHoursArrondi > totalHourOfDay)
        {
            if(timeToHoursArrondi >= 24)
            {
                realHour += 10;
                timeToHoursArrondi = timeToHoursArrondi - 24;
            }
            else
            {
                realHour += 10;
                timeToHoursArrondi = 0;
            }
        }
        else
        {
            realHour += timeToHoursArrondi;
            timeToHoursArrondi = 0;
        }
    } while (timeToHoursArrondi != 0);


    //Calcule total heure (avec tarif semaine)
    arrayPrix.forEach(element => {
        console.log("nombre de jour total: ", nbDay)
        if(nbDay >= 5)
        {
            prixHour += (element * 0.65);
        }
        else
        {
            prixHour += element;
        }
    });

    var hourAmount = document.getElementById('hourAmount');
    hourAmount.innerHTML = prixHour.toFixed(2) + " €";
    var prixKilometre = 0

    ///////////////////////////////////////////////////////////:

    //calcule prix des kilomètres
    var kilometreParcouru = document.getElementById('kilometre').value;
    if(kilometreParcouru <= 100)
    {
        prixKilometre = kilometreParcouru * data[formule][categorie].KMSInf100;
    }
    else
    {
        if(kilometreParcouru <= 300)
        {
            prixKilometre = 100 * data[formule][categorie].KMSInf100;
            prixKilometre += (kilometreParcouru - 100) * 0.30;
        }
        else
        {
            prixKilometre = 100 * data[formule][categorie].KMSInf100;
            prixKilometre += 200 * 0.30;
            prixKilometre += (kilometreParcouru - 300) * 0.25;
        }
    }

    var kmAmount = document.getElementById('kmAmount');
    kmAmount.innerHTML = prixKilometre.toFixed(2) + " €";

    var totalAmount = document.getElementById('totalAmount');
    totalAmount.innerHTML = (prixHour + prixKilometre).toFixed(2) + " €";
}

calculeTime()

const input = document.getElementsByTagName("input")
const select = document.getElementsByTagName("select")

//addEventListener click on all input
for(let i = 0; i < input.length; i++)
{
    input[i].addEventListener("change", function()
    {
        calculeTime()
    })
}

for(let i = 0; i < select.length; i++)
{
    select[i].addEventListener("change", function()
    {
        calculeTime()
    })
}