import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserTable from "./Table/UserTable";
import UserForm from "./UserForms";

export default function CreateUser() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        profileImage: "",
    });
    const [error, setError] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        profileImage: "",
    });
    const [userList, setUserList] = useState([]);
    const [isEdit, setIsEdit] = useState(true);
    const [edit, setEdit] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [img, setImg] = useState("");
    const [filesize, setFileSize] = useState();
    const [validate, setIsValidate] = useState(false);

    let errors = {};
    let valid = true;

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            setUserList(userData);
        }
    }, []);

    const clearAll = () => {
        setInput({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        });
        setImg("");
    };

    const handleChange = (e) => {
        const regxPhone = /^[a-zA-Z@!#$%&*+/=?^_`{|}~-]+$/gm;
        let filterValue = e.target.value;
        if (e.target.name === "phoneNumber") {
            filterValue = e.target.value.replace(regxPhone, "");
        }
        setInput({
            ...input,
            [e.target.name]: filterValue,
        });
        setError({
            ...error,
            [e.target.name]: "",
        });
        if (validate) {
            userValidationForm(e.target.name, { [e.target.name]: filterValue });
        }
    };

    const handleImgChange = (e) => {
        setFileSize(e?.target?.files[0]?.size);
        let reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result;
            setImg(image);
        };
        reader.readAsDataURL(e.target.files[0]);
        setError({
            ...error,
            profileImage: "",
        });
        handleImageValidate(e?.target?.files[0]?.size)
    };

    const handleImageValidate = (imageSize) => {
        debugger
        //image validation
        if (imageSize===undefined|| imageSize==="") {
            errors.profileImage = "Please select image.";
            valid = false;
        } else if (imageSize >= 500000) {
            errors.profileImage = "Please select file less 500kb";
            valid = false;
        } else {
            errors.profileImage = "";
        }
    }

    const userValidationForm = (name, value) => {

        const checkName = isEdit ? name === "Submit" : name === "Update";

        // Name vallidation
        const regxName = /^[a-zA-Z]+$/;
        if (name === "name" || checkName) {
            if (value?.name === undefined || value?.name === "") {
                errors.name = "Name is required";
                valid = false;
            } else if (!value?.name?.match(regxName)) {
                valid = false;
                errors.name = "Only chracter allow";
            } else {
                errors.name = "";
            }
        }

        // Phone Number Validation
        const regxPhone = /^[0-9]+$/;
        if (name === "phoneNumber" || checkName) {
            if (value?.phoneNumber === undefined || value?.phoneNumber === "") {
                valid = false;
                errors.phoneNumber = "Phone Number is required";
            } else if (!value?.phoneNumber?.match(regxPhone)) {
                errors.phoneNumber = "Only Number allow";
                valid = false;
            } else if (value?.phoneNumber?.length < 10) {
                errors.phoneNumber = "Please enter 10 degit";
                valid = false;
            } else {
                errors.phoneNumber = "";
            }
        }

        // Email Validation
        const regxEmail =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
        if (name === "email" || checkName) {
            if (value?.email === undefined || value?.email === "") {
                valid = false;
                errors.email = "Email is required";
            } else if (!value?.email?.match(regxEmail)) {
                errors.email = "Please enter valid email address";
                valid = false;
            } else {
                errors.email = "";
            }
        }

        // Password Validation
        const regxPassword =
            /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^!&*+=]).*$/gm;
        if (name === "password" || name === "Submit") {
            if (value?.password === undefined || value?.password === "") {
                errors.password = "password is required";
                valid = false;
            } else if (!value?.password?.match(regxPassword)) {
                errors.password =
                    "Password must be 1 special character,1 upercase , 1 lowercase and 1 number";
                valid = false;
            } else {
                errors.password = "";
            }
        }

        //Confirm Password Validation
        if (name === "confirmPassword" || name === "Submit") {
            if (
                value?.confirmPassword === undefined ||
                value?.confirmPassword === ""
            ) {
                errors.confirmPassword = "Please enter confirm password";
                valid = false;
            } else if (value?.password !== value?.confirmPassword) {
                errors.confirmPassword = "Password and Confirm Password does not match";
                valid = false;
            }
        } else {
            errors.confirmPassword = "";
        }

        setError({ ...error, ...errors });
        return valid;
    };

    const handleSubmit = (e) => {
        const userfrom = userValidationForm(e, input)
        const imageform = handleImageValidate(filesize)
        if (userfrom || imageform) {
            const setUser = {
                id: uuidv4(),
                name: input?.name,
                email: input?.email,
                phoneNumber: input?.phoneNumber,
                password: input?.password,
                confirmPassword: input?.confirmPassword,
                profileImage: img,
            };
            localStorage.setItem("userData", JSON.stringify([...userList, setUser]));
            if (userList?.length === 0) {
                setUserList([setUser]);
            } else {
                setUserList([...userList, setUser]);
            }
            clearAll();
        }
        setIsValidate(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this record ?")) {
            let deleteItem = userList.filter((user) => {
                return user.id !== id;
            });
            localStorage.setItem("userData", JSON.stringify(deleteItem));
            setUserList(deleteItem);
        }
    };

    const handleEdit = (id) => {
        let editItem = userList.filter((user, e) => {
            if (user?.id === id) {
                return user;
            }
        });
        setIsEdit(false);
        setEdit(id);
        setInput(editItem[0]);
        setImg(editItem[0]?.profileImage);
    };

    const handleUpdate = (e) => {
        if (userValidationForm(e)) {
            let updatedItem = userList?.map((user) => {
                let updatedData = {
                    id: edit,
                    name: input?.name,
                    email: input?.email,
                    phoneNumber: input?.phoneNumber,
                    password: input?.password,
                    confirmPassword: input?.confirmPassword,
                    profileImage: img,
                };
                if (user.id === edit) {
                    return updatedData;
                }
                return user;
            });
            setUserList(updatedItem);
            localStorage.setItem("userData", JSON.stringify(updatedItem));
            setIsEdit(true);
            clearAll();
        }
    };

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    return (
        <>
            <UserForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                handleImgChange={handleImgChange}
                togglePassword={togglePassword}
                passwordType={passwordType}
                img={img}
                input={input}
                isEdit={isEdit}
                error={error}
            />
            <UserTable
                userList={userList}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isEdit={isEdit}
                input={input}
            />
        </>
    );
}
