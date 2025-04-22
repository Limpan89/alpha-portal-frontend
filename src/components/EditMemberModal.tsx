import { IoMdClose } from "react-icons/io";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { API_URL } from "../Constants";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { User } from "../contexts/UserContext";

interface FormValues {
  NewImage: File | null;
  FirstName: string;
  LastName: string;
  Phone: string;
  JobTitle: string;
  Role: string;
  Address: string;
  PostalCode: number;
  CityName: string;
}

const validateForm = ({
  FirstName,
  LastName,
  Phone,
  JobTitle,
  Role,
  Address,
  PostalCode,
  CityName,
}: FormValues) => {
  const errors: FormikErrors<FormikValues> = {};

  if (
    !FirstName ||
    !LastName ||
    !Phone ||
    !JobTitle ||
    !Role ||
    !Address ||
    !PostalCode ||
    !CityName
  )
    errors.user = "Required fields missing";
  else if (!/^(?:\+46|0046|0)([ ]?\d{1,3}){2,4}$/i.test(Phone))
    errors.user = "Invalid phonenumber";
};

export const EditMemberModal = ({
  show,
  close,
  user,
}: {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}) => {
  const HandleCloseClick = () => {
    close(false);
  };

  useEffect(() => {
    formik.resetForm();
  }, [show]);

  const { token, apiKey } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append("Id", user.id);
    formData.append("FirstName", values.FirstName);
    formData.append("LastName", values.LastName);
    formData.append("Email", user.email);
    formData.append("Phone", values.Phone);
    formData.append("JobTitle", values.JobTitle);
    formData.append("Role", values.Role);
    formData.append("StreetAddress", values.Address);
    formData.append("PostalCode", values.PostalCode.toString());
    formData.append("CityName", values.CityName);
    formData.append("Image", user.image ?? "");

    if (values.NewImage) {
      formData.append("NewImage", values.NewImage);
    }

    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };
      if (apiKey) {
        headers["X-ADM-API-KEY"] = apiKey;
      }

      const response = await fetch(API_URL + "/api/users", {
        method: "PUT",
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
      NewImage: null as File | null,
      FirstName: "",
      LastName: "",
      Phone: "",
      JobTitle: "",
      Role: "",
      Address: "",
      PostalCode: 0,
      CityName: "",
    },
    validate: validateForm,
    onSubmit: (values) => {
      const response = handleSubmit(values);
      console.log(response);
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        NewImage: null as File | null,
        FirstName: user.firstName,
        LastName: user.lastName,
        Phone: user.phone ?? "",
        JobTitle: user.jobTitle ?? "",
        Role: user.role,
        Address: user.streetAddress ?? "",
        PostalCode: user.postalAddress?.postalCode ?? 0,
        CityName: user.postalAddress?.cityName ?? "",
      },
    });
  }, [user]);

  return (
    <section
      id="add-member-modal"
      className={`modal ${show ? "modal-show" : ""}`}
    >
      <div className="card">
        <header className="card-header">
          <h3>Edit Member</h3>
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
            <div className="form-horizontal-group">
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  First Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formik.values.FirstName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  Last Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formik.values.LastName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Email
              </label>
              <input
                disabled
                className="form-input"
                type="email"
                id="Email"
                name="Email"
                value={user.email}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Phone
              </label>
              <input
                className="form-input"
                type="tel"
                id="Phone"
                name="Phone"
                value={formik.values.Phone}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Job Title
              </label>
              <input
                className="form-input"
                type="text"
                id="JobTitle"
                name="JobTitle"
                value={formik.values.JobTitle}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Member Role
              </label>
              <select
                className="form-input"
                id="Role"
                name="Role"
                value={formik.values.Role}
                onChange={formik.handleChange}
              >
                <option value="" disabled selected hidden>
                  Select member role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="">
                Address
              </label>
              <input
                className="form-input"
                type="text"
                id="Address"
                name="Address"
                value={formik.values.Address}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-horizontal-group">
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  Postal Code
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="PostalCode"
                  name="PostalCode"
                  value={formik.values.PostalCode}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="">
                  City
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="CityName"
                  name="CityName"
                  value={formik.values.CityName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-submit">
              Update Contact
            </button>
          </form>
        </div>
        <footer className="card-footer"></footer>
      </div>
    </section>
  );
};
