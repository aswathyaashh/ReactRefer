import React, { useState, useEffect } from "react";
import { Alert, Form, Modal, ModalFooter, Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import "assets/styles/Brand.css"
import axios from "axios";
import swal from 'sweetalert';
//import { Reqres_Url } from "shared/Url/Url";
import { Brand_Table_Get } from "shared/Url/Url";
import defaultImageSrc from "assets/img/defaultLogo.png";
import FormData from "form-data";

const initialFieldValues = {
  brandId: 0,
  brandName: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const BrandCopy = () => {
  const [brands, setBrands] = useState([]);
  const [brand, setEnteredBrandName] = useState("");
  const [values, setValues] = useState(initialFieldValues);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(true);
  const [checker, setChecker] = useState(false);

  const [recordForEdit, setRecordForEdit] = useState(initialFieldValues);
  const [recordForDelete, setRecordForDelete] = useState(initialFieldValues);


  const employeeAPI = (url = "https://localhost:7093/api/Brand") => {
    return {
      fetchByName: (name) => axios.get(url + "?brandName=" + name),
      add: (newRecord) => axios.post(url + "/post", newRecord),
      update: (id, updatedRecord) =>
        axios.put(url + "/Edit?id=" + id, updatedRecord),
      delete: (id) => axios.delete(url + "/delete/" + id),
    };
  };

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("brandId") == "0") {
      employeeAPI()
        .fetchByName(formData.get("brandName"))
        .then((response) => {
          if (response.data.success !== true) {
            console.log("post");
            employeeAPI()
              .add(formData)
              .then((res) => {
                swal({
                  title: "Success",
                  text: "You have added a brand!",
                  icon: "success",
                });
                onSuccess();
                refreshList();
                console.log("logging");
              });
          } else {
            setChecker(true);
            //Alert("category Exist")
          }
        })
        .catch((error) => {
          // Alert("brand exists")
          console.log(error);
        });
    } else {
      employeeAPI()
        .fetchByName(formData.get("brandName"))
        .then((response) => {
          if (response.data.success !== true) {
            employeeAPI()
              .update(formData.get("brandId"), formData)
              .then((response) => {
                swal({
                  title: "Success",
                  text: "Brand Updated Successfully",
                  icon: "success",
                });
                onSuccess();
                refreshList();
                setValues(initialFieldValues);
                console.log("edited_data", response.data);
              })
              .catch((error) => {
                Alert("brand exists");
                console.log(error);
              });
          } else {
            setChecker(true);
          }
        });
    }
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const showEditPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setRecordForEdit({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: recordForEdit.imageSrc,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setEnteredBrandName(e.target.value);
    // console.log(brand);
    console.log("add ID", values.brandId);
  };

  const handleShow = () => {
    setShow(true)
    setValues(initialFieldValues)
    ;};
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const handleClose = () => {
    setShow(false);
    setChecker(false)
    resetForm();
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    setChecker(false);
    //setValues(initialFieldValues);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };






  const refreshList = () => {
    let token = localStorage.getItem("token");
    axios({
      url: Brand_Table_Get,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      console.log(response.data);
      setBrands(response.data.data);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const validate = () => {
    let temp = {};
    temp.brandName = values.brandName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    console.log("checkValidate",temp.brandName);
    setErrors(temp);
    setCheck(temp.brandName);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setChecker(false);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    console.log("EditbrandName",values.brandName);
    console.log("submit");
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("brandId", values.brandId);
      formData.append("brandName", values.brandName);
      formData.append("logoPath", values.imageName);
      formData.append("logo", values.imageFile);
      addOrEdit(formData, resetForm);
      console.log("poster");
    }
  };
  //console.log("error-174", values.brandName);
  //  console.log("error-174", values.brandId);

  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : "";
  // console.log("Brand.146-error", brands);

  const showRecordDetails = (data) => {
    handleShowEdit();
    setRecordForEdit(data);
  };

  const showDeleteRecordDetails = (data) => {
    handleShowDelete();
    setRecordForDelete(data);
  };
  //console.log("brand-copy error  295", recordForEdit);

  useEffect(() => {
    if (recordForEdit !== []) setValues(recordForEdit);
  }, [recordForEdit]);

  const onDelete = (e, id) => {
    e.preventDefault();
   // if (window.confirm("Delete the item?"))
      employeeAPI()
        .delete(id)
        .then((res) => {
          refreshList()  
          console.log("deleted")
          swal({
            title: "Deleted",
            text: "Brand Deleted Successfully",
            icon: "success",
          });
          setShowDelete(false)
        })
        .catch((error) => console.log(error));
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="Titles">Brand</h1>
      <br />
      <br />
      <ButtonToolbar className="buttonadd">
      <div class="input-group searchbutton">
                <input type="text" className="form-control" placeholder="Search" />
                <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
                </div>
                </div>
        <Button
          onClick={handleShow}
          variant="primary"
          className="addbutton fas fa-plus "
        >
          Add Brand
        </Button>
      </ButtonToolbar>

      <Table className="table-space  tablemain"  size="sm">
      <div className="table-header1">  <thead className="headcolour tablehead">
          <th className="headingline headingline1"><div className="headvalue">BrandID</div></th>
          <th className="headingline headingline2"><div className="headvalue">BrandName</div></th>
          {/* <th className="headingline">BrandLogo</th> */}
          <th className="headingline headingline3"><div className="headvalue">Actions</div></th>
        </thead></div>
        <div className="table-body1">
        <tbody className="table-body2">
          {brands.map((brd) => (
            <tr key={brd.brandId} className="rowcolour brandrows">
              <div className="Row-control1">
              <td className="rowValues-1"><div className=" row-values">{brd.brandId}</div></td>
              <td className="rowValues-2"><div className=" row-values">{brd.brandName}</div></td>
              {/* <td>{brd.imageSrc}</td> */}
              {/* <td>edit/delete</td> */}
              <td className="actioncolumn"><div className=" row-values">
                <button
                  type="button"
                  className="btn btn-light mr-2"
                  onClick={() => {
                    showRecordDetails(brd);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => {
                    showDeleteRecordDetails(brd);
                  }}
                  //onClick={(e) => onDelete(e, parseInt(brd.brandId))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
                </div>
              </td>
              </div>
            </tr>
          ))}
        </tbody>
        </div>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <div>
              {values.brandId == 0}
              <img
                alt="brand logo"
                className="defaultlogo"
                src={values.imageSrc}
                width={70}
                height={70}
              />
              <br />
              <input
                type="file"
                accept="image/*"
                className={
                  "form-control-file upload" + applyErrorClass("imageSrc")
                }
                onChange={showPreview}
                id="image-uploader"
              />
              <br />
              <label htmlFor="brdName">Enter Brand name :</label>
              <input
                type="text"
                name="brandName"
                onChange={handleInputChange}
                value={values.brandName}
              />
              {!check && <p className="error-msg">No BrandName added</p>}
              {checker && <p className="error-msg"> Brand already exists</p>}
            </div>

            <ModalFooter>
              <Button type="submit">Add</Button>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        //  recordForEdit={recordForEdit}
        // onSubmit={handleFormSubmit}
      >
        <Modal.Header>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <div>
              <img
                alt="brand logo"
                className="defaultlogo"
                src={recordForEdit.imageSrc}
                width={70}
                height={70}
              />
              <br />
              <input
                type="file"
                accept="image/*"
                className={
                  "form-control-file upload"
                  // + applyErrorClass("imageSrc")
                }
                //  defaultValue={recordForEdit.imageFile}
                onChange={showEditPreview}
                id="image-uploader"
              />
              <br />
              <label htmlFor="brdName">Enter Brand name :</label>
              <input
                type="text"
                name="brandName"
                defaultValue={recordForEdit.brandName}
                onChange={handleInputChange}
              />
              {checker && <p className="error-msg"> Brand already exists</p>}
            </div>
            <ModalFooter>
              <Button type="submit">Edit</Button>
              <Button variant="danger" onClick={handleCloseEdit}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        //  recordForEdit={recordForEdit}
        // onSubmit={handleFormSubmit}
      >
        <Modal.Header>
          <Modal.Title>Delete Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onDelete(e, parseInt(recordForDelete.brandId))}>
            <div>
              <div>
                Are you sure to Delete the selected Brand?
              </div>
              <br/>
              <img
                alt="brand logo"
                className="defaultlogo"
                src={recordForDelete.imageSrc}
                width={70}
                height={70}
              />
              <br />
              <div className="delete_text">
              <label htmlFor="brdName" className="labeldelete">Brand :</label>
              <input
                type="text"
                className="deletetextvalue"
                disabled
                defaultValue={recordForDelete.brandName}
              />
              </div>
            </div>
            <br/>
            <ModalFooter>
              <Button type="submit" variant="danger">Delete</Button>
              <Button variant="primary" onClick={handleCloseDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BrandCopy;

