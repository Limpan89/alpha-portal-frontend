import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FormSelect } from "./FormSelect";
import { useFormik } from "formik";
import { API_URL } from "../Constants";
import { useAuth } from "../contexts/AuthContext";

interface FormValues {
  ProjectName: string;
  Description: string;
  NewImage: File | null;
  StartDate: string;
  EndDate: string;
  Budget: number;
  ClientId: string;
  UserId: string;
}

const validateForm = (values: FormValues) => {};

export const AddProjectModal = ({
  show,
  close,
}: {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const HandleCloseClick = () => {
    close(false);
  };

  const { token, apiKey } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append("ProjectName", values.ProjectName);
    formData.append("Description", values.Description ?? ""); // nullable
    if (values.NewImage) {
      formData.append("NewImage", values.NewImage);
    }
    formData.append("StartDate", values.StartDate); // ISO string or yyyy-MM-ddTHH:mm:ss
    formData.append("EndDate", values.EndDate);
    formData.append("Budget", values.Budget.toString());
    formData.append("ClientId", values.ClientId);
    formData.append("UserId", values.UserId);

    try {
      const response = await fetch(API_URL + "/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": apiKey ?? "",
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Success");
      } else {
        console.error("Failiure");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      ProjectName: "",
      Description: "",
      NewImage: null as File | null,
      StartDate: new Date().toISOString().split("T")[0],
      EndDate: new Date().toISOString().split("T")[0],
      Budget: 0.0,
      ClientId: "",
      UserId: "",
    },
    validate: validateForm,
    onSubmit: (values) => {
      const response = handleSubmit(values);
      console.log(response);
    },
  });

  return (
    <section
      id="add-project-modal"
      className={`modal ${show ? "modal-show" : ""}`}
    >
      <div className="card">
        <header className="card-header">
          <h3>Add Project</h3>
          <button className="btn-close" onClick={HandleCloseClick}>
            <IoMdClose />
          </button>
        </header>
        <div className="card-body">
          <form
            action=""
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
          >
            <div className="image-preview-container">
              <div
                id="image-container"
                className="rectangle rectangle-grey"
              ></div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor=""></label>
              <input
                type="file"
                accept="image/*"
                name="NewImage"
                id="NewImage"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0] || null;
                  formik.setFieldValue("NewImage", file);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Project Name
              </label>
              <input
                className="form-input"
                type="text"
                id="ProjectName"
                name="ProjectName"
                value={formik.values.ProjectName}
                onChange={formik.handleChange}
              />
            </div>

            <FormSelect
              options={[
                { name: "Option 1", id: "1" },
                { name: "Option 2", id: "2" },
              ]}
              placeholder="Select client"
              label="Client Name"
            />

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Description
              </label>
              <textarea
                className="form-input"
                id="Description"
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="form-horizontal-group">
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  Start Date
                </label>
                <input
                  className="form-input"
                  type="date"
                  id="StartDate"
                  name="StartDate"
                  value={formik.values.StartDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  Project Name
                </label>
                <input
                  className="form-input"
                  type="date"
                  id="EndDate"
                  name="EndDate"
                  value={formik.values.EndDate}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <FormSelect
              options={[
                { name: "Option 1", id: "1" },
                { name: "Option 2", id: "2" },
              ]}
              placeholder="Select project owner"
              label="Project Owner"
            />
            <div className="form-group">
              <label className="form-label" htmlFor="">
                Budget
              </label>
              <input
                className="form-input"
                type="number"
                id="Budget"
                name="Budget"
                value={formik.values.Budget}
                onChange={formik.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Create
            </button>
          </form>
        </div>
        <footer className="card-footer"></footer>
      </div>
    </section>
  );
};
