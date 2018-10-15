// Displays the controls for sharing a project
import React from "react";
import queryString from "query-string";
import URL from "./URL";
import CopyButton from "./CopyButton";
import { ShareWrapper, ShareIcon, Divider, ShareButton } from "./styles";

class Share extends React.Component {
  componentDidMount() {
    window.addthis_config = window.addthis_config || {};
    window.addthis_config.data_track_clickback = false;
    window.addthis_config.data_track_addressbar = false;
    window.addthis.shareButton();
  }

  url(source = null) {
    if (source) {
      const parsed = queryString.parseUrl(this.props.url);
      const params = {
        ...(parsed.query || {}),
        utm_source: source
      };
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
    return `Hi guys, I’m looking for a ${
      this.skill
    } freelancer for a project. If you know someone suitable, please share this link with them`;
  }

  get colleagueEmailBody() {
    return encodeURIComponent(
      `${this.colleagueShareMessage}\n\n${this.url("email")}`
    );
  }

  render() {
    return (
      <ShareWrapper>
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
          href={`mailto:?subject=${this.subject}&body=${
            this.colleagueEmailBody
          }`}
        >
          Share via email
        </ShareButton>
      </ShareWrapper>
    );
  }
}
export default Share;
