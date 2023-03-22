let val;
let ar=["none"];

function addBox(){
    val=parseInt(document.getElementById("init").value);

    if(val==0){
        alert("Please select Number of semesters 🙄");
        return;
    }
    else{
        document.getElementById("note").removeAttribute("hidden");
        document.getElementById("result1").removeAttribute("hidden");    
    }

    const result1 = document.querySelector("#result1");
    while(result1.firstChild){
        result1.removeChild(result1.firstChild);
    }

    const h2 =  document.createElement("H2");
    h2.innerHTML += "Number of Subjects Semester-wise";
    result1.appendChild(h2);

    for(i=1; i<=val; i++){
        const mainDiv = document.createElement("DIV");
        const input = document.createElement("INPUT");

        input.name = input.id = ("semester"+i);
        input.placeholder = "Semester "+i;
        input.type = "number";
        input.min="2"; input.max="20";
        

        mainDiv.appendChild(input)
        result1.appendChild(mainDiv); 
    }

    const btn = document.createElement("BUTTON");
    btn.id="proceed-btn";
    btn.innerHTML="PROCEED";
    btn.onclick = generateGpa;
    result1.appendChild(btn); 
} 


function generateGpa(){

    for(i=1; i<=val; i++){
        ar[i]=document.getElementById("semester"+i).value;
        if(!(ar[i]>=2 && ar[i]<=20)){
            alert("Enter atleast 2 & atmost 20 subjects for semester " +i+" 😁");
            return;
        }
    }
    
    if(document.querySelector("#gpaSection")){
        document.getElementById("gpaSection").remove();
    }

    const newSec = document.createElement("SECTION");
    newSec.id = "gpaSection";
    document.querySelector("#body").appendChild(newSec);

    for(i=1; i<=val; i++){
        var subjCt=ar[i];
        const newDiv = document.createElement("DIV");
        newDiv.id = "gpaVals"+ i;
        newSec.appendChild(newDiv);


        const semLbl = document.createElement("LABEL");
        semLbl.innerHTML="Semester "+i+":";
        semLbl.style.float="left";
        semLbl.style.color="#fff";
        semLbl.style.border="3px solid #000";
        semLbl.style.backgroundColor="#8c00ff";
        semLbl.style.borderRadius="15px";
        semLbl.style.margin="20px";
        semLbl.style.padding="10px";
        newDiv.appendChild(semLbl);

        for(j=1; j<=subjCt; j++){

            const lineDiv = document.createElement("DIV");
            document.getElementById("gpaVals"+i).appendChild(lineDiv);
            
            const subjNo = document.createElement("LABEL");
            subjNo.innerHTML="Subject "+j+":";
            lineDiv.appendChild(subjNo);


            const credit = document.createElement("SELECT");
            credit.id = "credit"+i+""+j;
            const options = ["O", "A+", "A", "B+", "B", "RA"];
            var opVal = 10;
            for(pos=0; pos<=5; pos++){
                const optElt = document.createElement("OPTION");
                optElt.text = options[pos];
                optElt.value = opVal--;
                credit.appendChild(optElt);
            }
            lineDiv.appendChild(credit);


            const score = document.createElement("INPUT");
            score.placeholder = "Credit Value";
            score.id="score"+i+""+j;
            lineDiv.appendChild(score);
        
        }
    }
    const btn = document.createElement("BUTTON");
    btn.innerHTML="CALCULATE";
    btn.id="calc-btn";
    btn.onclick = calcRes;
    newSec.appendChild(btn);
}



resArr=["none"];

function calcRes(){

    for(i=1; i<=val; i++){
        var subjCt = ar[i];
        res=0;
        totalCredit=0;
        for(j=1; j<=subjCt; j++){

            var grade = parseInt(document.getElementById("credit"+i+""+j).value);
            var point = parseFloat(document.getElementById("score"+i+""+j).value);
            console.log(grade+" "+point);

            if(isNaN(point)){
                alert("Enter all data properly !!! 😖");
                return;
            }

            if(grade!=5){
                res+=grade*(1.0)*point;
                totalCredit+=point;
            }else{
                alert("It seems You've an arrear in Semester "+i+" So, you are ineligible for CGPA Calculation 😬");

                prompt("Do you like this CGPA Cal-C 🤩",);
                return;
            }
        }
        console.log(res+" "+totalCredit);
        resArr[i]=res/totalCredit;
    }
    console.log(resArr)

    for(i=1; i<=val; i++){

        const eleExist = document.getElementById("dispLabl"+i);
        if(!(eleExist)){
            const gpaDiv = document.getElementById("gpaVals"+i);
            
            const lbl = document.createElement("LABEL");
            lbl.id = "dispLabl"+i;
            lbl.className = "dispLbl";
            lbl.innerHTML = parseFloat(resArr[i]).toFixed(3);
            gpaDiv.appendChild(lbl);
        }        
        else{
            eleExist.innerHTML = parseFloat(resArr[i]).toFixed(3);
        } 
    }

    finRes=0;
    for(i=1; i<=val; i++){
        finRes+=(resArr[i]);
    }
    finRes=finRes/val;
    console.log(finRes.toFixed(3));

    const finDiv = document.querySelector("#finDiv");
    if(finDiv){
        finDiv.innerHTML = "Your CGPA: " + finRes.toFixed(3);
    }
    else{
        document.getElementById("gpaSection").appendChild(document.createElement("HR"));
        const finDiv = document.createElement("LABEL");
        document.getElementById("gpaSection").appendChild(finDiv);
        finDiv.id =  "finDiv";
        finDiv.innerHTML ="Your CGPA: " + finRes.toFixed(3);
        document.getElementById("gpaSection").appendChild(document.createElement("HR"));
    }
    return;
}