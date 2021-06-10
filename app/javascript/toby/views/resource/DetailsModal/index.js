import { DateTime } from "luxon";
import React, { useMemo, useCallback, useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { Formik, Form } from "formik";
import { Modal, Box, Text, Tag, Stack } from "@advisable/donut";
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

function History({ history }) {
  return (
    <Box
      width={300}
      maxHeight="100%"
      bg="neutral100"
      borderRadius="12px"
      padding={4}
    >
      <Stack spacing="md">
        {history.map((h) => (
          <Box bg="neutral200" key={h.number} borderRadius="8px">
            <Box padding={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={1}
                alignItems="flex-end"
              >
                <Text fontSize="xs" fontWeight={500}>
                  Version {h.number}
                </Text>
                <Text fontSize="2xs" pl={1} color="neutral600">
                  {DateTime.fromISO(h.createdAt).toFormat("HH:mm dd LLL yyyy")}
                </Text>
              </Box>
              <Text fontSize="2xs" color="neutral700">
                {h.responsible || "Anonymous"}
              </Text>
            </Box>
            <Box mx={3} height="1px" bg="neutral300" />
            <Box padding={3}>
              {h.changes.map((change) => (
                <Box marginBottom={3} key={change.attribute}>
                  <Text fontSize="xs" fontWeight={500} mb={1}>
                    {change.attribute}
                  </Text>
                  <Text fontSize="xs" color="neutral800">
                    {change.value}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
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
      <Box paddingRight={8}>
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
      <History history={data.record._history} />
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
