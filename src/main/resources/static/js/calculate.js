max = -1;
min = -1;

var grades = [];

var boundsId = ['f', 'd', 'cm', "c", "cpl", "bm", "b", "bpl", "am", "a", "apl", "max"];

var boundsOut = ['fo', 'do', 'cmo', "co", "cplo", "bmo", "bo", "bplo", "amo", "ao", "aplo"];

var bounds = [0, 50.00, 55.00, 60.00, 65.00, 70.00, 75.00, 80.00, 85.00, 90.00, 95.00, 100.00];

function hist(){
    for (var k = 0; k < 11; k++){
        const output = document.getElementById(boundsOut[k]);
        output.innerHTML = "";
    }
    for (var i = 0; i < grades.length; i++){
        for (var j = 0; j < 11; j++){
            if (j != 10){
                if (grades[i] < bounds[j+1] && grades[i] >= bounds[j]){
                    const output = document.getElementById(boundsOut[j]);
                    output.innerHTML += "▇ ";
                    break;
                }
            } else {
                if (grades[i] <= bounds[j+1] && grades[i] >= bounds[j]){
                    const output = document.getElementById(boundsOut[j]);
                    output.innerHTML += "▇";
                    break;
                }
            }
        }
    } 
}

function boundsChange(num) {
    var check = document.getElementById(boundsId[num]).value;
    const output = document.getElementById('err');
    if (check.match(/[^0-9.]/)){
        if (check.match(/[A-Za-z]/) && check.match(/[^A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers";
        } else if (check.match(/[A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers, not letters";
        } else if (check.match(/[^A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers, not symbols";
        } 
  
    } else {
        if (num != 0 && num != 11){
            if (grades.length == 0){
                output.innerHTML = "Please enter grades";
            } else if (check.replace(/[^.]/g, "").length>1){
                output.innerHTML = "ERROR: Please enter a number";
            } else if (check <= bounds[num-1] || check >= bounds[num+1]){
                output.innerHTML = "ERROR: bounds must not be equal to or overlap with eachother";
            } else {
                bounds[num] = check*1;
                output.innerHTML = " ";
                hist();
            }
        } else if (num == 0) {
            if (grades.length == 0){
                output.innerHTML = "Please enter grades";
            } else if (check.replace(/[^.]/g, "").length>1){
                output.innerHTML = "ERROR: Please enter a number";
            } else if (check >= bounds[num+1]){
                output.innerHTML = "ERROR: bounds must not be equal to or overlap with eachother";
            } else if (check < 0) {
                output.innerHTML = "ERROR: F bounds must not be below 0";
            } else if (check > min){
                output.innerHTML = "ERROR: F bounds must not be be higher than grade: " + min;
            } else {
                bounds[num] = check*1;
                output.innerHTML = " ";
                hist();
            }
        } else {
            if (grades.length == 0){
                output.innerHTML = "Please enter grades";
            } else if (check.replace(/[^.]/g, "").length>1){
                output.innerHTML = "ERROR: Please enter a number";
            } else if (check <= bounds[num-1]){
                output.innerHTML = "ERROR: bounds must not be equal to or overlap with eachother";
            } else if (check < max){
                output.innerHTML = "ERROR: max bounds must not be be lower than grade: " + max;
            } else {
                bounds[num] = check*1;
                output.innerHTML = " ";
                hist();
            }
        } 
    } 
}

function newGrade(){
    var newG = document.getElementById('nGrade').value;
    const output = document.getElementById('errG');
    if (newG.match(/[^0-9.]/)){
        if (newG.match(/[A-Za-z]/) && newG.match(/[^A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers";
        } else if (newG.match(/[A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers, not letters";
        } else if (newG.match(/[^A-Za-z]/)){
            output.innerHTML = "ERROR: Please enter only numbers, not symbols";
        }
  
    } else {
        if (newG.replace(/[^.]/g, "").length>1){
            output.innerHTML = "ERROR: Please enter a number";
        } else if (newG < bounds[0]){
            output.innerHTML = "ERROR: new grade must not be lower than F bounds";
        } else if (newG > bounds[11]){
            output.innerHTML = "ERROR: new grade must not be higher than max bounds";

        } else {
            if (grades.length == 0){
                max = newG*1;
                min = newG*1;
                grades.push(newG*1);
                output.innerHTML = " ";
                hist();
            } else {
                if (newG > max){
                    max = newG*1;
                    grades.push(newG*1);
                    output.innerHTML = " ";
                    hist();
                } else if (newG < min){
                    min = newG*1;
                    grades.push(newG*1);
                    output.innerHTML = " ";
                    hist();
                } else {
                    grades.push(newG*1);
                    output.innerHTML = " ";
                    hist();
                }
            }
        }

    } 
}