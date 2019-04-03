const baseUrl = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students';

const username = 'guest';
const password = 'guest';
const base64Auth = btoa(username + ':' + password);
const authHeaders =  {'Authorization': 'Basic ' + base64Auth};

function addStudent() {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let facultyNumber = $('#faculty-number').val();
    let grade = Number($('#grade').val());

    let student = {
        ID: Math.round(Math.random() * 50000),
        FirstName: firstName,
        LastName: lastName,
        FacultyNumber: facultyNumber,
        Grade: grade
    };

    console.log(student);

    $.ajax({
        url: baseUrl,
        method: 'POST',
        headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
        data: JSON.stringify(student)
    }).catch(e => console.log(e.responseText));
}

function loadStudents() {
    $.ajax({
        url: baseUrl,
        method: 'GET',
        headers: authHeaders,
        success: listStudents
    }).catch(e => console.log(e.responseText));
}

function listStudents(students) {
    students = students.sort((a, b) => a.ID - b.ID);
    let table = $('#results');
    students.forEach(s => {


        let row = $(`<tr>
                        <td>${s.ID}</td>
                        <td>${s.FirstName}</td>
                        <td>${s.LastName}</td>
                        <td>${s.FacultyNumber}</td>
                        <td>${s.Grade}</td>
                    </tr>`);

        table.append(row);
    });
}