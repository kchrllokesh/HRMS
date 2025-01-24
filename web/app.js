document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employeeData = {
        EmployeeID: formData.get('employeeId'),
        FirstName: formData.get('firstName'),
        LastName: formData.get('lastName'),
        Email: formData.get('email'),
        PhoneNumber: formData.get('phoneNumber'),
        Department: formData.get('department'),
        Position: formData.get('position'),
        HireDate: formData.get('hireDate')
    };

    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Employee data saved successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('leaveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const leaveData = {
        LeaveID: formData.get('leaveId'),
        EmployeeID: formData.get('employeeIdLeave'),
        LeaveType: formData.get('leaveType'),
        StartDate: formData.get('startDate'),
        EndDate: formData.get('endDate'),
        Status: formData.get('status')
    };

    fetch('http://localhost:3000/leaves', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(leaveData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Leave request submitted successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('documentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get('fileContent');
    const reader = new FileReader();

    reader.onload = function(e) {
        const fileContent = btoa(e.target.result);
        const fileName = formData.get('fileName');

        fetch(`http://localhost:3000/documents?fileName=${fileName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: fileContent })
        })
        .then(response => response.json())
        .then(data => {
            alert('Document uploaded successfully');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    reader.readAsBinaryString(file);
});
