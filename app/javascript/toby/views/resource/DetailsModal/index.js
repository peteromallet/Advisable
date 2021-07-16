import React, { useMemo, useCallback, useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { Formik, Form } from "formik";
import { Modal, Box, Text, Tag } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import SubmitButton from "src/components/SubmitButton";
import { matchPath, useHistory, useLocation } from "react-router";
import { useSchema } from "../../../components/schema";
import {
  attributeFormValueInitializer,
  AttributeInput,
} from "../../../attributes";
import { generateShowQuery, generateUpdateMutation } from "../../../utilities";
import { useMutation, useQuery } from "@apollo/client";
import { pluralizeType } from "../../../utilities";
import VersionHistory from "./VersionHistory";
import ActionsMenu from "./ActionsMenu";

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
    history.replace({
      ...location,
      pathname: returnPath,
    });
  }, [location, history, returnPath]);

  return {
    ...modal,
    params: match?.params || {},
    show: handleShow,
    hide: handleHide,
  };
}

function History({ resource }) {
  return (
    <Box
      width={300}
      flexShrink={0}
      maxHeight="100%"
      bg="neutral100"
      borderRadius="12px"
      padding={4}
    >
      <VersionHistory resource={resource} />
    </Box>
  );
}

function Details({ id, resource }) {
  const schema = useSchema();
  const { error, notify } = useNotifications();
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

  const handleSubmit = async (attributes, formik) => {
    const { errors } = await update({
      variables: {
        id,
        attributes,
      },
    });

    if (errors) {
      const activeRecordErrors = errors[0]?.extensions?.errors || [];

      const fieldErrors = Object.keys(activeRecordErrors).reduce(
        (collection, key) => {
          return {
            ...collection,
            [key]: activeRecordErrors[key][0],
          };
        },
        {},
      );
      formik.setErrors(fieldErrors);
      error("Failed to save record");
    } else {
      notify("Your changes have been saved");
    }
  };

  return (
    <Box display="flex">
      <Box paddingRight={8} width="100%">
        <Box display="flex" alignItems="center">
          <ActionsMenu resource={resource} record={data.record} />
        </Box>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form>
            {resource.attributes.map((attr) => {
              return (
                <Box key={attr.name} mb={5}>
                  <Box
                    mb={2}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text fontWeight={500} as="span">
                      {attr.columnLabel}
                    </Text>
                    {attr.readonly && (
                      <Tag ml={2} size="xs">
                        Readonly
                      </Tag>
                    )}
                  </Box>
                  {attr.description && (
                    <Text
                      fontSize="sm"
                      lineHeight="20px"
                      color="neutral800"
                      marginBottom={3}
                    >
                      {attr.description}
                    </Text>
                  )}
                  <AttributeInput
                    resource={resource}
                    record={data.record}
                    attribute={attr}
                  />
                  <Box mt={5} height={1} bg="neutral100" />
                </Box>
              );
            })}
            <SubmitButton mt={4}>Save Changes</SubmitButton>
          </Form>
        </Formik>
      </Box>
      <History resource={data.record} />
    </Box>
  );
}

export default function DetailsModal({ resource }) {
  const modal = useRoutedModal(
    "/:resource/:id",
    `/${pluralizeType(resource.type)}`,
  );

  return (
    <Modal width={1000} modal={modal} label="Details">
      {modal.visible && <Details id={modal.params.id} resource={resource} />}
    </Modal>
  );
}
