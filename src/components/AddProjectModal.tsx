import { IoMdClose } from "react-icons/io";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { API_URL } from "../Constants";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useClient } from "../contexts/ClientContext";
import { useEffect } from "react";

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

const validateForm = ({
  ProjectName,
  Description,
  NewImage,
  StartDate,
  EndDate,
  Budget,
  ClientId,
  UserId,
}: FormValues) => {
  const errors: FormikErrors<FormikValues> = {};

  if (!ProjectName || !Description || !Budget || !ClientId || !UserId)
    errors.add = "Required fields empty";
  else if (new Date(StartDate) > new Date(EndDate))
    errors.add = "Project can't end before it starts";
};

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

  useEffect(() => {
    formik.resetForm();
  }, [show]);

  const { token, apiKey } = useAuth();
  const { users } = useUser();
  const { clients } = useClient();

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
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };
      if (apiKey) {
        headers["X-ADM-API-KEY"] = apiKey;
      }

      const response = await fetch(API_URL + "/api/projects", {
        method: "POST",
        headers,
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
              <label className="form-label" htmlFor="">
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="NewImage"
                id="NewImage"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
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

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Client Name
              </label>
              <select
                className="form-input"
                id="ClientId"
                name="ClientId"
                value={formik.values.ClientId}
                onChange={formik.handleChange}
              >
                <option value="" disabled selected hidden>
                  Select client
                </option>
                {clients.map((c) => (
                  <option value={c.id}>{c.clientName}</option>
                ))}
              </select>
            </div>

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
                  End Date
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

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Project Owner
              </label>
              <select
                className="form-input"
                id="UserId"
                name="UserId"
                value={formik.values.UserId}
                onChange={formik.handleChange}
              >
                <option value="" disabled selected hidden>
                  Select project owner
                </option>
                {users.map((u) => (
                  <option value={u.id}>{`${u.firstName} ${u.lastName}`}</option>
                ))}
              </select>
            </div>

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
