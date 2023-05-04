import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CommanButton from "../../Comman/CommanButton";
import ModalDialog from "../../Comman/ModalDialog";

export default function UserTable({
  userList,
  handleEdit,
  handleDelete,
  input,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h2 className="text-center m-4">User Data</h2>
      <Table striped bordered className="">
        <thead>
          <tr className="text-center">
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {userList?.length > 0 &&
            userList?.map((user) => (
              <tr key={user?.id} className="text-center">
                <td>
                  <img
                    src={user?.profileImage}
                    className="img-fluid rounded-circle"
                    style={{ height: 60, width: 60 }}
                  />
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>

                <td>
                  <CommanButton
                    handleClick={() => handleEdit(user?.id)}
                    type={"button"}
                    name={"Edit"}
                    btnText={"Edit"}
                    classname={"mx-1 bg-success border border-success"}
                  />
                  <CommanButton
                    handleClick={() => handleDelete(user?.id)}
                    type={"button"}
                    name={"Delete"}
                    btnText={"Delete"}
                    classname={"bg-danger border border-danger"}
                  />
                  <ModalDialog
                    show={show}
                    input={input}
                    handleClose={handleClose}
                    handleShow={handleShow}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
