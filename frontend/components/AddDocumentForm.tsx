import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreateDocumentDTO } from '../types/document';
import { Folder } from '../types/folder';
import { Button, FormGroup, Label, ErrorText } from '../styles/components';

interface AddDocumentFormProps {
  onSubmit: (values: CreateDocumentDTO) => void;
  currentFolderId: number | null;
  folders: Folder[];
}

const DocumentSchema = Yup.object().shape({
  name: Yup.string()
    .required('Document name is required')
    .max(255, 'Document name must be at most 255 characters'),
  type: Yup.string()
    .required('Document type is required')
    .max(50, 'Document type must be at most 50 characters'),
  folder_id: Yup.number().nullable(),
});

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  onSubmit,
  currentFolderId,
  folders,
}) => {
  const initialValues: CreateDocumentDTO = {
    name: '',
    type: '',
    folder_id: currentFolderId,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DocumentSchema}
      onSubmit={(values, { resetForm }) => {
        const parsedValues = {
          ...values,
          folder_id: values.folder_id ? Number(values.folder_id) : null,
        };
        onSubmit(parsedValues);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="name">Document Name</Label>
            <Field name="name" type="text" placeholder="Enter document name" />
            <ErrorMessage name="name" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Document Type</Label>
            <Field name="type" type="text" placeholder="e.g., PDF, DOCX" />
            <ErrorMessage name="type" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="folder_id">Folder</Label>
            <Field name="folder_id" as="select">
              <option value="">-- Select Folder --</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="folder_id" component={ErrorText} />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            Add Document
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddDocumentForm;
