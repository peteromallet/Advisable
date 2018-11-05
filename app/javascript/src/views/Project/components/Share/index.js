// Displays the controls for sharing a project
import React from "react";
import queryString from "query-string";
import URL from "./URL";
import CopyButton from "./CopyButton";
import { ShareWrapper, ShareIcon, Divider, ShareButton } from "./styles";

class Share extends React.Component {
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
    return encodeURIComponent(
      `${this.emailShareMessage}\n\n${this.url("email")}`
    );
  }

  get shareMessage() {
    return `I’m currently looking for a ${
      this.skill
    } freelancer for a project. Feel free to tag anyone you know who might be relevant.`;
  }

  get emailShareMessage() {
    return `I’m currently looking for a ${
      this.skill
    } freelancer for a project. Feel free to share this with anyone you know who might be relevant.`;
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
            target="_blank"
            href={`https://www.linkedin.com/shareArticle/?url=${encodeURIComponent(
              this.url("linkedin")
            )}&mini=true&summary=${this.shareMessage}`}
            data-service="linkedin"
          />
          <ShareIcon
            target="_blank"
            data-service="facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              this.url("facebook")
            )}`}
          />
          <ShareIcon
            target="_blank"
            data-service="twitter"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              this.shareMessage
            )}&url=${encodeURIComponent(this.url("twitter"))}`}
          />
          <ShareIcon
            target="_blank"
            href={`mailto:?subject=${this.subject}&body=${this.emailBody}`}
            data-service="email"
          />
        </div>
        <URL>{this.url()}</URL>
        <Divider>or</Divider>
        <h4>Ask colleagues to share</h4>
        <CopyButton url={this.url()} />
        <ShareButton
          target="_blank"
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
