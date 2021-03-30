import React, { useMemo, useCallback, useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { Formik, Form } from "formik";
import { Modal, Box, Text, Button } from "@advisable/donut";
import { matchPath, useHistory, useLocation } from "react-router";
import { useSchema } from "../../../components/schema";
import {
  attributeFormValueInitializer,
  AttributeInput,
} from "../../../attributes";
import { generateShowQuery, generateUpdateMutation } from "../../../utilities";
import { useMutation, useQuery } from "@apollo/client";

function useRoutedModal(path, returnPath) {
  const modal = useDialogState();
  const history = useHistory();
  const location = useLocation();

  const match = useMemo(() => {
    return matchPath(location.pathname, { path });
  }, [location.pathname, path]);

  useEffect(() => {
    if (modal.visible && !match) {
      modal.hide();
    }

    if (!modal.visible && match) {
      modal.show();
    }
  }, [modal, match]);

  const handleShow = useCallback(() => {
    history.push(path);
  }, [history, path]);

  const handleHide = useCallback(() => {
    history.replace(returnPath);
  }, [history, returnPath]);

  return {
    ...modal,
    params: match?.params || {},
    show: handleShow,
    hide: handleHide,
  };
}

function Details({ id, resource }) {
  const schema = useSchema();
  const updateMutation = generateUpdateMutation(schema, resource);
  const query = generateShowQuery(schema, resource);
  const [update] = useMutation(updateMutation);
  const { data, loading } = useQuery(query, {
    variables: {
      id,
    },
  });

  if (loading) return <>loading...</>;

  const initialValues = {};
  const writeableAttributes = resource.attributes.filter((a) => !a.readonly);
  writeableAttributes.forEach((attr) => {
    const initializer = attributeFormValueInitializer(attr);
    if (initializer) {
      initialValues[attr.name] = initializer(data.record, attr);
    }
  });

  const handleSubmit = async (attributes) => {
    console.log(attributes);
    await update({
      variables: {
        id,
        attributes,
      },
    });
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        {resource.attributes.map((attr) => {
          return (
            <Box key={attr.name} mb={5}>
              <Text fontWeight={500} mb={2}>
                {attr.columnLabel}
              </Text>
              <AttributeInput record={data.record} attribute={attr} />
            </Box>
          );
        })}
        <Button mt={4} type="submit">
          Save Changes
        </Button>
      </Form>
    </Formik>
  );
}

export default function DetailsModal({ resource }) {
  const modal = useRoutedModal(
    "/:resource/:id",
    `/${resource.queryNameCollection}`,
  );

  return (
    <Modal width={800} modal={modal}>
      {modal.visible && <Details id={modal.params.id} resource={resource} />}
    </Modal>
  );
}
