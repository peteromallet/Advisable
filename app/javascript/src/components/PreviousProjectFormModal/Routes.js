import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Validation from "./Validation";
import EditDescription from "./EditDescription";
import ExtraInformation from "./ExtraInformation";
import UpdateClientDetails from "./UpdateClientDetails";
import CreatePreviousProject from "./CreatePreviousProject";
import EditImages from "./EditImages";

function RedirectToStep({ step }) {
  const location = useLocation();
  return <Redirect to={`${location.pathname}/${step}`} />;
}

function Routes({
  specialistId,
  onCreate,
  selectDataQuery,
  data,
  modal,
  onPublish,
}) {
  const isPublished = data?.previousProject?.draft === false || false;

  return (
    <Switch>
      <Route path="*previous_projects/new" exact>
        <RedirectToStep step="client" />
      </Route>
      <Route path="*previous_projects/:id" exact>
        <RedirectToStep step={isPublished ? "description" : "client"} />
      </Route>
      <Route path="*previous_projects/new/client">
        <CreatePreviousProject
          specialistId={specialistId}
          onCreate={onCreate}
          industries={selectDataQuery.data.industries}
        />
      </Route>
      <Route path="*previous_projects/:id/description">
        <EditDescription data={data} />
      </Route>
      <Route path="*previous_projects/:id/images">
        <EditImages data={data} />
      </Route>
      <Route path="*previous_projects/:id/client">
        <UpdateClientDetails
          modal={modal}
          data={data}
          industries={selectDataQuery.data.industries}
        />
      </Route>
      <Route path="*previous_projects/:id/overview">
        <Overview
          modal={modal}
          data={data}
          skills={selectDataQuery.data.skills}
        />
      </Route>
      <Route path="*previous_projects/:id/portfolio">
        <Portfolio modal={modal} data={data} />
      </Route>
      <Route path="*previous_projects/:id/more">
        <ExtraInformation modal={modal} data={data} />
      </Route>
      <Route path="*previous_projects/:id/validation">
        <Validation modal={modal} data={data} onPublish={onPublish} />
      </Route>
      <Route>
        <RedirectToStep step={isPublished ? "description" : "client"} />
      </Route>
    </Switch>
  );
}

export default Routes;
