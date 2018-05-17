import React from "react";
import remove from "lodash/remove";
import { Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import Modal from "src/components/Modal";
import Select from "src/components/Select";

import UPDATE_STATUS from "../../graphql/updateApplicationStatus.graphql";
import FETCH_PROJECT from "../../graphql/fetchProject.graphql";

class RejectModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={UPDATE_STATUS}>
          {mutate => (
            <Formik
              initialValues={{
                reason: ""
              }}
              validate={values => {
                let errors = {}
                if (values.reason === "") {
                  errors.reason = "Please select a reason for rejection"
                }
                return errors
              }}
              onSubmit={values =>
                mutate({
                  variables: {
                    id: application.id,
                    status: "Application Rejected",
                    rejectionReason: values.reason
                  },
                  update: (store, { data: { updateApplicationStatus } }) => {
                    const variables = {
                      id: "reciRKA92VmIGuruG",
                      status: "Applied"
                    };

                    const data = store.readQuery({
                      query: FETCH_PROJECT,
                      variables
                    });

                    remove(data.project.applications, {
                      id: application.id
                    });

                    store.writeQuery({
                      query: FETCH_PROJECT,
                      variables,
                      data
                    });
                  }
                })
              }
            >
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  Are you sure you want to reject {specialist.name}
                  <Select
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    placeholder="Select reason for rejection"
                    options={["Not Qualified", "Another Option"]}
                  />
                  {formik.errors.reason && <div>{formik.errors.reason}</div>}
                  <button type="submit" disabled={formik.isSubmitting}>
                    Yup
                  </button>
                  <button onClick={this.props.onClose}>Nope</button>
                </form>
              )}
            </Formik>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RejectModal;
