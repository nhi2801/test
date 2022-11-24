import { setScreen } from "../../app.js";
import { InputGroup } from "../Auth/InputGroup.js";
import { LoginGoogle } from "./LoginGoogle.js";
import { Register } from "./Register.js";

class Login {
  $main;
  $container;
  $title;
  $desctitle;
  $btnGroupGoogle;
  $divideror;

  $inputGroupEmail;
  $inputGroupPassword;
  $form;
  $btnSubmit;

  $errorMessage;

  $singuplink;
  $contentspan;
  $linkhrepSingup;

  constructor() {
    this.$main = document.createElement("div");
    this.$main.classList.add("main");

    this.$container = document.createElement("div");
    this.$container.classList.add("container");

    this.$title = document.createElement("h1");
    this.$title.innerHTML = "Đăng nhập vào Quizz";
    this.$title.classList.add("title");

    this.$desctitle = document.createElement("p");
    this.$desctitle.innerHTML = "Vui lòng sử dụng email trường học hoặc email công việc của bạn";
    this.$desctitle.classList.add("desctitle");

    this.$btnGroupGoogle = new LoginGoogle(
      "https://cf.quizizz.com/img/logos/google-logo-1.png",
      "Tiếp tục với tài khoản Google"
    );

    this.$divideror = document.createElement("span");
    this.$divideror.classList.add("divideror");
    this.$divideror.innerHTML = "-- or --";

    this.$inputGroupEmail = new InputGroup(
      "Email/Tên đăng nhập",
      "email",
      "email"
    );

    this.$inputGroupPassword = new InputGroup(
      "Mật khẩu",
      "password",
      "password"
    );

    this.$form = document.createElement("form");
    this.$form.addEventListener("submit", this.handelSubmit);

    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Đăng nhập";
    this.$btnSubmit.classList.add("btn-submit");

    this.$errorMessage = document.createElement("div");
    this.$errorMessage.classList.add("feedbackmessage");

    this.$singuplink = document.createElement("div");
    this.$singuplink.classList.add("signup-link");
    this.$contentspan = document.createElement("span");
    this.$contentspan.innerHTML = "Chưa có tài khoản?";

    this.$linkhrepSingup = document.createElement("span");
    this.$linkhrepSingup.innerHTML = "Đăng ký";
    this.$linkhrepSingup.classList.add("linkSignup");
    this.$linkhrepSingup.addEventListener("click", this.moveToRegister);
  }
  moveToRegister = () => {
    const register = new Register();
    setScreen(register);
  };
  handelSubmit = (e) => {
    e.preventDefault();
    const email = this.$inputGroupEmail.getInputValue();
    const password = this.$inputGroupPassword.getInputValue();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        var user = userCredential.user;
        if (user.photoURL === null) {
          user.updateProfile({
            photoURL:
              "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
          });
        }

        // Hien thong bao
        Swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Đăng nhập thành công",
        }).then(() => {
          window.location.href = "./main.html";
        });

        // ...
      })
      .catch((error) => {
        console.log(typeof error.message);
        this.$errorMessage.innerHTML = error.message;
      });
  };

  render() {
    this.$main.appendChild(this.$container);
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$desctitle);
    this.$container.appendChild(this.$btnGroupGoogle.render());

    this.$container.appendChild(this.$divideror);
    this.$form.appendChild(this.$inputGroupEmail.render());
    this.$form.appendChild(this.$inputGroupPassword.render());
    this.$form.appendChild(this.$btnSubmit);
    this.$container.appendChild(this.$form);

    this.$container.appendChild(this.$errorMessage);

    this.$singuplink.appendChild(this.$contentspan);
    this.$singuplink.appendChild(this.$linkhrepSingup);

    this.$container.appendChild(this.$singuplink);

    return this.$main;
  }
}
export { Login };
