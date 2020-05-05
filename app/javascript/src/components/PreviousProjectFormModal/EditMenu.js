import React from "react";
import { Collection, MenuAlt2 } from "@styled-icons/heroicons-solid";
import NavigationMenu from "../../components/NavigationMenu";

const EditMenu = React.memo(function EditMenu({ urlPrefix }) {
  return (
    <NavigationMenu>
      <NavigationMenu.Item to={`${urlPrefix}/description`} icon={<MenuAlt2 />}>
        Description
      </NavigationMenu.Item>
      <NavigationMenu.Item to={`${urlPrefix}/images`} icon={<Collection />}>
        Images
      </NavigationMenu.Item>
    </NavigationMenu>
  );
});

export default EditMenu;
