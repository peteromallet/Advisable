import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import CreateGuildPost from "./CreateGuildPost";
import CreatePostFromPrompt from "./CreatePostFromPrompt";
import EditGuildPost from "./EditGuildPost";
import EditImages from "./EditImages";
import EditAudience from "./EditAudience";
import EditTargeting from "./EditTargeting";
import Review from "./Review";

function RedirectToStep({ step }) {
  const location = useLocation();
  return <Redirect to={`${location.pathname}/${step}`} />;
}

function Routes({ onPublish, selectDataQuery, guildPost, promptLabel }) {
  return (
    <Switch>
      <Route path="*composer" exact>
        <RedirectToStep step="new" />
      </Route>

      <Route path="*composer/new" exact>
        <CreateGuildPost />
      </Route>

      <Route path="*composer/prompt/:labelSlug" exact>
        <CreatePostFromPrompt promptLabel={promptLabel} />
      </Route>

      <Route path="*composer/:id" exact>
        <RedirectToStep step="post" />
      </Route>

      <Route path="*composer/:id/type" exact>
        <CreateGuildPost guildPost={guildPost} />
      </Route>

      <Route path="*composer/:id/post">
        <EditGuildPost guildPost={guildPost} />
      </Route>

      <Route path="*composer/:id/images">
        <EditImages guildPost={guildPost} />
      </Route>

      <Route path="*composer/:id/audience">
        <EditAudience guildPost={guildPost} />
      </Route>

      <Route path="*composer/:id/targeting">
        {guildPost?.audienceType === "none" ? (
          <Redirect to={`/composer/${guildPost.id}/review`} />
        ) : (
          <EditTargeting
            guildPost={guildPost}
            selectDataQuery={selectDataQuery}
          />
        )}
      </Route>

      <Route path="*composer/:id/review">
        <Review guildPost={guildPost} onPublish={onPublish} />
      </Route>
    </Switch>
  );
}

export default Routes;
