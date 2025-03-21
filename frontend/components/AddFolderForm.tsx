import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateFolderDTO, Folder } from "../types/folder";
import { Button, FormGroup, Label, ErrorText } from "../styles/components";

interface AddFolderFormProps {
  onSubmit: (values: CreateFolderDTO) => void;
  currentFolderId: number | null;
  folders?: Folder[];
}

const FolderSchema = Yup.object().shape({
  name: Yup.string()
    .required("Folder name is required")
    .max(255, "Folder name must be at most 255 characters"),
  parent_folder_id: Yup.number().nullable(),
});

const AddFolderForm: React.FC<AddFolderFormProps> = ({
  onSubmit,
  currentFolderId,
  folders = [],
}) => {
  const initialValues: CreateFolderDTO = {
    name: "",
    parent_folder_id: currentFolderId,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FolderSchema}
      onSubmit={(values, { resetForm }) => {
        // ⚠️ Convert parent_folder_id to number if it's a string
        const parsedValues = {
          ...values,
          parent_folder_id: values.parent_folder_id
            ? Number(values.parent_folder_id)
            : null,
        };
        onSubmit(parsedValues);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="name">Folder Name</Label>
            <Field name="name" type="text" placeholder="Enter folder name" />
            <ErrorMessage name="name" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="parent_folder_id">Parent Folder</Label>
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
