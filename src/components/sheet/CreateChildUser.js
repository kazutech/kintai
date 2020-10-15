import "firebase/auth";
import config from "../../util/config";
import axios from "axios";

firebase.initializeApp(config);

const CreateChildUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [groupName, setGroupName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      groupName: groupName,
      address: address,
      tel: tel,
      createdAt: new Date().toISOString(),
    };
    axios
      .post("/child", newUser)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export default CreateChildUser;
