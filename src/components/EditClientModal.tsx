import { IoMdClose } from "react-icons/io";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { API_URL } from "../Constants";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { Client } from "../contexts/ClientContext";

interface FormValues {
  NewImage: File | null;
  ClientName: string;
  Email: string;
  Phone: string;
  BillingAddress: string;
  BillingReference: string;
  PostalCode: number;
  CityName: string;
}

const validateForm = ({
  ClientName,
  Email,
  Phone,
  BillingAddress,
  BillingReference,
  PostalCode,
  CityName,
}: FormValues) => {
  const errors: FormikErrors<FormikValues> = {};

  if (
    !ClientName ||
    !Email ||
    !Phone ||
    !BillingAddress ||
    !BillingReference ||
    !PostalCode ||
    !CityName
  )
    errors.client = "Required fields missing";
  else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(Email) ||
    !/^(?:\+46|0046|0)([ ]?\d{1,3}){2,4}$/i.test(Phone)
  )
    errors.client = "Invalid email or phonenumber";
};

export const EditClientModal = ({
  show,
  close,
  client,
}: {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  client: Client;
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

    formData.append("Id", client.id);
    formData.append("ClientName", values.ClientName);
    formData.append("Email", values.Email ?? "");
    formData.append("Phone", values.Phone ?? "");
    formData.append("BillingAddress", values.BillingAddress);
    formData.append("BillingReference", values.BillingReference);
    formData.append("PostalCode", values.PostalCode.toString());
    formData.append("CityName", values.CityName);
    formData.append("Image", client.image ?? "");

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

      const response = await fetch(API_URL + "/api/clients", {
        method: "PUT",
        headers,
        body: formData,
      });

      // --- AI - ChatGPT ---
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
      ClientName: "",
      Email: "",
      Phone: "",
      BillingAddress: "",
      BillingReference: "",
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
        ClientName: client.clientName,
        Email: client.email,
        Phone: client.phone,
        BillingAddress: client.billingAddress,
        BillingReference: client.billingReference,
        PostalCode: client.postalAddress.postalCode,
        CityName: client.postalAddress.cityName,
      },
    });
  }, [client]);

  return (
    <section
      id="add-member-modal"
      className={`modal ${show ? "modal-show" : ""}`}
    >
      <div className="card">
        <header className="card-header">
          <h3>New Client</h3>
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
                Client Name
              </label>
              <input
                className="form-input"
                type="text"
                id="ClientName"
                name="ClientName"
                value={formik.values.ClientName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="Email"
                name="Email"
                value={formik.values.Email}
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
                id="BillingAddress"
                name="BillingAddress"
                value={formik.values.BillingAddress}
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
            <div className="form-group">
              <label className="form-label" htmlFor="">
                Billing Reference
              </label>
              <input
                className="form-input"
                type="text"
                id="BillingReference"
                name="BillingReference"
                value={formik.values.BillingReference}
                onChange={formik.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Save
            </button>
          </form>
        </div>
        <footer className="card-footer"></footer>
      </div>
    </section>
  );
};
