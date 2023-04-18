let students = [];

let saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', function () {
    // Lấy thông tin từ các trường input
    let names = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let address = document.querySelector('#address').value;
    let genderInputs = document.querySelectorAll('input[type="radio"][name="gender"]');
    let gender;
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            gender = genderInputs[i].value;
            break;
        }
    }
    if (gender == 'nam') {
        genderInputs[1].checked = false;
    } else{
        genderInputs[0].checked = false;
    }

    // Validate dữ liệu đầu vào
    if (names == "" && email == "" && phone == "" && address == "") {
        alert("không được để trống thông tin");
        return;
    }

    if (names.trim() === '') {
        alert('Họ và tên không được để trống');
        return;
    }

    let phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert('Số điện thoại không đúng định dạng!');
        return;
    }

    if (address.trim() === '') {
        alert('Địa chỉ không được để trống');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Email không hợp lệ');
        return;
    }

    if (!genderInputs[0].checked && !genderInputs[1].checked) {
        alert("Vui lòng chọn giới tính");
        return;
    }


    // Thêm học viên mới vào mảng students
    students.push({
        names: names,
        email: email,
        phone: phone,
        address: address,
        gender: gender
    });

    function isValidEmail(email) {
        // Kiểm tra định dạng email bằng regular expression
        let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    }

    // Cập nhật lại bảng danh sách học viên

    renderTable();

});

function renderTable() {
    let tbody = document.querySelector('#student-table tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        tbody.innerHTML += `
        <tr>
        <th >${i + 1}</th>
        <td>${student.names}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.address}</td>
        <td>${student.gender}</td>
        <td>
            <button class="btn-edit btn"><u>edit</u></button>
            |
            <button class="btn-delete btn"><u>delete</u></button>
        </td>
    </tr>
        `
    }


    // Thêm sự kiện click vào nút edit của mỗi hàng trong bảng danh sách học viên
    let editButtons = document.querySelectorAll('.btn-edit');

    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function () {
            document.getElementById('save-button').style.display = "none"
            document.getElementById('save-button-2').style.display = "block"
            let student = students[i];

            // Đưa thông tin học viên vào form "Thông tin học viên"
            document.querySelector('#name').value = student.names;
            document.querySelector('#email').value = student.email;
            document.querySelector('#phone').value = student.phone;
            document.querySelector('#address').value = student.address;
            if (student.gender === 'nam') {
                document.getElementsByClassName('.nam').checked = true;
            } else {
                document.getElementsByClassName('.nu').checked = true;
            }

            // Thêm sự kiện click vào nút save của form "Thông tin học viên"
            let saveButton = document.querySelector('#save-button-2');
            // saveButton.removeEventListener('click', addNewStudent);
            saveButton.addEventListener('click', function () {
                document.getElementById('save-button').style.display = "block"
                document.getElementById('save-button-2').style.display = "none"
                // Lấy thông tin học viên từ các trường input
                let names = document.querySelector('#name').value;
                let email = document.querySelector('#email').value;
                let phone = document.querySelector('#phone').value;
                let address = document.querySelector('#address').value;
                let genderInputs = document.querySelectorAll('#gender');
                let gender;
                for (let i = 0; i < genderInputs.length; i++) {
                    if (genderInputs[i].checked) {
                        gender = genderInputs[i].value;
                        break;
                    }
                }

                // Cập nhật thông tin học viên trong mảng students
                student.names = names;
                student.email = email;
                student.phone = phone;
                student.address = address;
                student.gender = gender;

                // Hiển thị lại bảng danh sách học viên
                renderTable();
            });
        });
    }
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#nam').checked = false;
    document.querySelector('#nu').checked = false;
    // Thêm sự kiện click vào các nút xóa
    let deleteButtons = document.querySelectorAll('.btn-delete');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            // Xoá học viên khỏi mảng students
            students.splice(i, 1);
            // Cập nhật lại bảng danh sách học viên
            renderTable();
        });
    }
}

let sortButton = document.querySelector('#sort-button');
sortButton.addEventListener('click', function () {
    students.sort(function (a, b) {
        var nameA = a.names.toUpperCase(); // chuyển tên thành chữ hoa để so sánh
        var nameB = b.names.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            F
            return 1;
        }
        return 0;
    });
    renderTable();
});
