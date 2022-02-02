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
            KMSInf100: 0.4,
            dimancheHeure: 1,
            dimancheDay: 10
        },
        cat2: {
            heure: 3,
            journee: 30,
            KMSInf100: 0.45,
            dimancheHeure: 2,
            dimancheDay: 20
        },
        cat3: {
            heure: 4,
            journee: 40,
            KMSInf100: 0.50,
            dimancheHeure: 3,
            dimancheDay: 30
        }
    },
    nonAbonner: {
        cat1: {
            heure: 4,
            journee: 40,
            KMSInf100: 0.42,
            dimancheHeure: 3,
            dimancheDay: 30
        },
        cat2: {
            heure: 5,
            journee: 50,
            KMSInf100: 0.47,
            dimancheHeure: 4,
            dimancheDay: 40
        },
        cat3: {
            heure: 6,
            journee: 60,
            KMSInf100: 0.47,
            dimancheHeure: 5,
            dimancheDay: 50
        }
    }
}

function initData()
{
    var inputDebutDate = document.getElementById('debutDate');
    var inputFinDate = document.getElementById('finDate');
    var inputKilometreParcouru = document.getElementById('kilometre');

    var debutHeure = document.getElementById('debutHeure');
    var debutMinute = document.getElementById('debutMinute');

    var finHeure = document.getElementById('finHeure');
    var finMinute = document.getElementById('finMinute');

    // console.log(debutDate.toISOString())
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
    debutDate.setHours(debutHeure.value);
    debutDate.setMinutes(debutMinute.value);
    
    finDate.setHours(finHeure.value);
    finDate.setMinutes(finMinute.value);

    //Check si date de fin est inferieure a date de debut
    if(finDate < debutDate)
    {
        const switched = debutDate;

        document.getElementById('debutDate').value = finDate.toISOString().substring(0, 10);
        document.getElementById('debutHeure').value = finHeure.value;
        document.getElementById('debutMinute').value = finMinute.value;
        // finDate = debutDate;
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

    console.log("nombre de jour", nbDay)

    var day = debutDate

    //get time stamp next day
    var actuelDay = day
    var nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    var arrayPrix = []

    // console.log((finDate.getTime() - debutDate.getTime()) / (1000 * 3600 * 24))
    // console.log(nbDay)

    if(nbDay == 0)
    {   
        //check si il y a plus de 10 entre actuealDay et finDate
        let nbHour = Math.ceil((finDate.getTime() - actuelDay.getTime()) / (1000 * 3600));
        let reduc8heure = actuelDay
        reduc8heure.setHours(8,0,0,0)

        let reduc22heure = actuelDay
        reduc22heure.setHours(22,0,0,0)

        console.log(reduc8heure, reduc22heure)

        if(nbHour >= 10)
        {
            //check if dimanche
            if(actuelDay.getDay() == 0)
            {
                arrayPrix.push(totalHourOfDay * data[formule][categorie].dimancheHeure)
            }
            else
            {
                arrayPrix.push(totalHourOfDay * data[formule][categorie].heure)
            }
        }
        else
        {
            if(actuelDay.getDay() == 0)
            {
                arrayPrix.push(nbHour * data[formule][categorie].dimancheHeure)
            }
            else
            {
                if(reduc8heure.getTime() > actuelDay.getTime())
                {
                    let nbHourUnder8 = Math.ceil((reduc8heure.getTime() - actuelDay.getTime()) / (1000 * 3600));
                    console.log("heure minuit 8h",nbHourUnder8)
                }
                else if(reduc22heure.getTime() > finDate.getTime())
                {
                    // let nbHourOver22 = Math.ceil((finDate.getTime() - reduc22heure.getTime()) / (1000 * 3600));
                    // console.log("heure 22h minuit", nbHourOver22)

                    let nbHourUnder8 = Math.ceil((reduc8heure.getTime() - actuelDay.getTime()) / (1000 * 3600));
                    console.log(nbHourUnder8)
                }

                // console.log("nbhour", nbHour, "formule", formule, "categorie", categorie, "all", data[formule][categorie].heure)

                arrayPrix.push(nbHour * data[formule][categorie].heure)
            }
        }
    }
    else
    {
        for(let i = 0; i < nbDay; i++)
        {
            if(i == nbDay - 1)
            {
                console.log("last day")
                nextDay = finDate
                console.log(i, nextDay)
            }
            else
            {
                nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+ (i+1));
                console.log(i, nextDay)
            }
    
            var dayOfWeek = actuelDay.getDay();
            
            console.log("dayOfWeek", dayOfWeek)
    
            if(actuelDay.getDay() == 6)
            {
                if(nextDay.getTime() - actuelDay.getTime() == 172800000)
                {
                    arrayPrix.push(totalHourOfDay * data[formule][categorie].dimancheHeure)
                }
                else
                {
                    let hour = new Date(nextDay - actuelDay).getHours()
                    console.log("nb Heure Day: ", hour)
                    if(hour >= 10)
                    {
                        arrayPrix.push(totalHourOfDay * data[formule][categorie].dimancheHeure)
                    }
                    else
                    {
                        // if(i == nbDay - 1)
                        // {
                        //     if(hour - 8 <= 0)
                        //     {
                        //         console.log("moin de 8 HERUEEEE")
                        //         arrayPrix.push((hour * data[formule][categorie].dimancheHeure) / 2)
                        //     }
                        //     else
                        //     {
                        //         console.log("PLUS DE 8 HEURES")
                        //         let prix = 0;
                        //         console.log("testt: ", (8 * data[formule][categorie].dimancheHeure) / 2)
                        //         prix += (8 * data[formule][categorie].dimancheHeure) / 2
                        //         console.log("autreeeeeee: ", ((hour - 8) * data[formule][categorie].dimancheHeure))
                        //         prix += ((hour - 8) * data[formule][categorie].dimancheHeure)
                        //         arrayPrix.push(prix)
                        //     }
                        // }
                        // else
                        // {
                        //      arrayPrix.push(hour * data[formule][categorie].dimancheHeure)
                        // }
                        arrayPrix.push(hour * data[formule][categorie].dimancheHeure)
                    }
                }
            }
            else
            {
                console.log(nextDay.getTime() - actuelDay.getTime())
                if(nextDay.getTime() - actuelDay.getTime() == 172800000)
                {
                    arrayPrix.push(totalHourOfDay * data[formule][categorie].heure)
                }
                else
                {   
                    let hour = new Date(nextDay - actuelDay).getHours()
                    console.log(hour)
                    if(hour >= 10)
                    {
                        arrayPrix.push(totalHourOfDay * data[formule][categorie].heure)
                    }
                    else
                    {
                        if(i == nbDay - 1)
                        {
                            if(hour - 8 <= 0)
                            {
                                arrayPrix.push((hour * data[formule][categorie].heure) / 2)
                            }
                            else
                            {
                                let prix = 0;
                                prix += (8 * data[formule][categorie].heure) / 2
                                prix += ((hour - 8) * data[formule][categorie].heure)
                                arrayPrix.push(prix)
                            }
                        }
                        else
                        {
                            arrayPrix.push(hour * data[formule][categorie].heure)
                        }
                    }
                }
            }

            actuelDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+ i);
        }
    }
    

    console.log(arrayPrix)

    var time = finDate.getTime() - debutDate.getTime();

    var timeToHours = time / (1000 * 60 * 60);
    var timeToHoursArrondi = Math.ceil(timeToHours);
    totalTime.innerHTML = timeToHoursArrondi + " heures";

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
        console.log("nbday", nbDay)
        if(nbDay >= 7)
        {
            prixHour += (element / 2);
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
            prixKilometre += (kilometreParcouru - 100) * 0.29;
        }
        else
        {
            prixKilometre = 100 * data[formule][categorie].KMSInf100;
            prixKilometre += 200 * 0.29;
            prixKilometre += (kilometreParcouru - 300) * 0.24;
        }
    }

    // console.log(prixKilometre)
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