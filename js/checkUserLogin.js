let tempInfo = localStorage.getItem('tempUserInfo');


function checkLogin() {
    if (tempInfo && tempInfo !== "null") {
        console.log(JSON.parse(tempInfo).email)
    } else {

        Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Bạn phải đăng nhập để làm trắc nghiệm',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Đăng nhập',
            denyButtonText: `Quay về trang chủ`,
            allowOutsideClick: false,
            allowEscapeKey:false,
            allowEnterKeyL: false

          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                location.href = "/login.html"
            } else if (result.isDenied) {
              location.href = "/main.html"
            }
          })

        const radioBtns = document.querySelectorAll('.form-check-input');
        radioBtns.forEach(element => {
            element.disabled = true;
        })
        const timer = document.querySelector('.timer');
        timer.hidden = true;
    }
}

export { checkLogin };