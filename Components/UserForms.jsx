import React from "react";
import Input from "../Comman/Input";
import CommanButton from "../Comman/CommanButton";
import userProfile from "../Components/Image/60111.jpg"

export default function UserForm({
    handleChange,
    handleSubmit,
    handleUpdate,
    handleImgChange,
    togglePassword,
    passwordType,
    input,
    isEdit,
    error,
    img,
    userName,
    userPhoneNumber,
    userEmail,
}) {
    return (
        <div>
            <h2 className="text-center m-4">User Form</h2>
            <div className="d-flex flex-column col-3  m-auto">
                <div className=" d-flex align-items-center justify-content-center m-0">
                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                        {!img ? (
                            <img
                                src={userProfile}
                                style={{ height: 150, width: 150 }}
                                className="rounded"
                            />
                        ) : (
                            <img
                                for="photo-upload"
                                src={img}
                                className="img-fluid rounded-circle"
                                style={{ height: 150, width: 150 }}
                            />
                        )}
                    </label>
                </div>
                <input
                    id="photo-upload"
                    type="file"
                    onChange={handleImgChange}
                    name={"image"}
                    hidden
                />
                <span className="text-danger">{error?.profileImage}</span>

                <Input
                    userRef={userName}
                    label={"Name:"}
                    type={"text"}
                    name={"name"}
                    handleChange={handleChange}
                    placeholder={"Enter Your Name"}
                    value={input?.name}
                    autocomplete={"off"}
                />
                <span className="text-danger">{error?.name}</span>

                <Input
                    userRef={userPhoneNumber}
                    label={"PhoneNumber:"}
                    type={"tel"}
                    max="10"
                    name={"phoneNumber"}
                    handleChange={handleChange}
                    placeholder={"Enter Your PhoneNumber"}
                    value={input?.phoneNumber}
                    autocomplete={"off"}
                />
                <span className="text-danger">{error?.phoneNumber}</span>

                <Input
                    userRef={userEmail}
                    label={"Email:"}
                    type={"email"}
                    name={"email"}
                    value={input?.email}
                    handleChange={handleChange}
                    placeholder={"Enter Your Email"}
                    autocomplete={"off"}
                />
                <span className="text-danger">{error?.email}</span>

                <div>
                    <Input
                        label={"Password:"}
                        type={passwordType}
                        name={"password"}
                        value={input?.password}
                        handleChange={handleChange}
                        placeholder={"Enter Your Password"}
                        autocomplete={"off"}
                    />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-outline-primary"
                            onClick={togglePassword}
                        >
                            {passwordType === "password" ? (
                                <i className="bi bi-eye-slash"></i>
                            ) : (
                                <i className="bi bi-eye"></i>
                            )}
                        </button>
                    </div>
                    <span className="text-danger">{error?.password}</span>
                </div>

                <Input
                    label={"Confirm-Password:"}
                    type={"password"}
                    name={"confirmPassword"}
                    value={input?.confirmPassword}
                    handleChange={handleChange}
                    placeholder={"Confirm Your Password"}
                    autocomplete={"off"}
                />
                <span className="text-danger">{error?.confirmPassword}</span>

                <div className="text-center">
                    {isEdit ? (
                        <CommanButton
                            handleClick={handleSubmit}
                            type={"submit"}
                            name={"Submit"}
                            btnText={"Submit"}
                            classname={"m-2"}
                        />
                    ) : (
                        <CommanButton
                            handleClick={handleUpdate}
                            type={"submit"}
                            name={"Update"}
                            btnText={"Update"}
                            classname={"m-2"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
