// Displays the controls for sharing a project
import React from "react";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import URL from "./URL";
import CopyButton from './CopyButton';
import { ShareWrapper, ShareIcon, Divider, ShareButton } from "./styles";

class Share extends React.Component {
  // We use react-helment to insert the addthis widget script because we do
  // not want it on any pages that do not use the share buttons. Because of
  // this we need to run an interval to check if the scipt has loaded, and when
  // it does, then call the share method to enable the sharing functionality.
  // https://www.addthis.com/academy/addthis-core-share-follow-api
  componentDidMount() {
    window.addthis_config = window.addthis_config || {};
    window.addthis_config.data_track_clickback = false;
    window.addthis_config.data_track_addressbar = false;
    window.addthis_config.ui_email_note = "Check this out!";

    this.loader = setInterval(() => {
      if (window.addthis) {
        window.addthis.shareButton();
        clearInterval(this.loader);
      }
    }, 500);
  }

  url(source = null) {
    if (source) {
      const parsed = queryString.parseUrl(this.props.url)
      const params = {
        ...parsed.query || {},
        utm_source: source
      }
      return `${parsed.url}?${queryString.stringify(params)}`;
    }
    return this.props.url;
  }

  get skill() {
    const params = queryString.parseUrl(this.props.url);
    return params.query.skill;
  }

  get subject() {
    return `${this.skill} freelancer`;
  }

  get emailBody() {
    return encodeURIComponent(`${this.shareMessage}\n\n${this.url("email")}`);
  }

  get shareMessage() {
    return `I’m currently looking for a ${
      this.skill
    } freelancer for a project. Feel free to tag anyone you know who might be relevant.`;
  }

  get colleagueShareMessage() {
    return `Hi guys, I’m looking for a ${this.skill} freelancer for a project. If you know someone suitable, please share this link with them`;
  }

  get colleagueEmailBody() {
    return encodeURIComponent(`${this.colleagueShareMessage}\n\n${this.url("email")}`);
  }

  render() {
    return (
      <ShareWrapper>
        <Helmet>
          <script
            type="text/javascript"
            src="//s7.addthis.com/js/300/addthis_widget.js"
          />
        </Helmet>
        <h4>Invite people from your network</h4>
        <div className="addthis_share">
          <ShareIcon
            className="addthis_share_button"
            data-service="linkedin"
            data-url={this.url("linkedin")}
            data-title={this.shareMessage}
            data-description={this.shareMessage}
          />
          <ShareIcon
            className="addthis_share_button"
            data-service="facebook"
            data-url={this.url("facebook")}
          />
          <ShareIcon
            className="addthis_share_button"
            data-service="twitter"
            data-url={this.url("twitter")}
            data-title={this.shareMessage}
          />
          <ShareIcon
            href={`mailto:?subject=${this.subject}&body=${this.emailBody}`}
            data-service="email"
          />
        </div>
        <URL>{this.url()}</URL>
        <Divider>or</Divider>
        <h4>Ask colleagues to share</h4>
        <CopyButton url={this.url()} />
        <ShareButton
          href={`mailto:?subject=${this.subject}&body=${this.colleagueEmailBody}`}>
          Share via email
        </ShareButton>
      </ShareWrapper>
    );
  }
}
export default Share;
