import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateFolderDTO, Folder } from "../types/folder";
import { Button, FormGroup, Label, ErrorText } from "../styles/components";

interface AddFolderFormProps {
  onSubmit: (values: CreateFolderDTO) => void;
  currentFolderId: number | null;
  folders?: Folder[]; // ✅ Fix: Add `folders` as an optional prop
}

const FolderSchema = Yup.object().shape({
  name: Yup.string().required("Folder name is required").max(255),
  parent_folder_id: Yup.number().nullable(),
});

const AddFolderForm: React.FC<AddFolderFormProps> = ({ onSubmit, currentFolderId, folders = [] }) => {
  return (
    <Formik
      initialValues={{ name: "", parent_folder_id: currentFolderId }}
      validationSchema={FolderSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label>Folder Name</Label>
            <Field name="name" type="text" placeholder="Enter folder name" />
            <ErrorMessage name="name" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label>Parent Folder</Label>
            <Field name="parent_folder_id" as="select">
              <option value="">-- Select Parent Folder --</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="parent_folder_id" component={ErrorText} />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            Add Folder
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFolderForm;
