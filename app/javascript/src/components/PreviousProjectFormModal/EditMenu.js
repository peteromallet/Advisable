import React from "react";
import {
  Collection,
  MenuAlt2,
  CheckCircle,
} from "@styled-icons/heroicons-solid";
import NavigationMenu from "../../components/NavigationMenu";

const EditMenu = React.memo(function EditMenu({ urlPrefix, previousProject }) {
  const isValidated = previousProject.validationStatus === "Validated";
  return (
    <NavigationMenu>
      <NavigationMenu.Item to={`${urlPrefix}/description`} icon={<MenuAlt2 />}>
        Description
      </NavigationMenu.Item>
      <NavigationMenu.Item to={`${urlPrefix}/images`} icon={<Collection />}>
        Images
      </NavigationMenu.Item>
      {!isValidated ? (
        <NavigationMenu.Item
          to={`${urlPrefix}/edit-validation`}
          icon={<CheckCircle />}
        >
          Validation
        </NavigationMenu.Item>
      ) : null}
    </NavigationMenu>
  );
});

export default EditMenu;
