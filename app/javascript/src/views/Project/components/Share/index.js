// Displays the controls for sharing a project
import React from "react";
import { Helmet } from "react-helmet";
import URL from "./URL";
import slack from "./slack.svg";
import { ShareWrapper, ShareIcon, Divider, ShareButton } from "./styles";

class Share extends React.Component {
  // We use react-helment to insert the addthis widget script because we do
  // not want it on any pages that do not use the share buttons. Because of
  // this we need to run an interval to check if the scipt has loaded, and when
  // it does, then call the share method to enable the sharing functionality.
  // https://www.addthis.com/academy/addthis-core-share-follow-api
  componentDidMount() {
    this.loader = setInterval(() => {
      if (window.addthis) {
        window.addthis.shareButton();
        clearInterval(this.loader);
      }
    }, 500);
  }

  url(source = null) {
    if (source) {
      return `${this.props.url}&utm_source=${source}`
    }
    return this.props.url;
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
            data-url={this.url('linkedin')}
            data-title="AddThis - Get more likes, shares and follows with smart website tools"
          />
          <ShareIcon
            className="addthis_share_button"
            data-service="facebook"
            data-url={this.url('facebook')}
            data-title="AddThis - Get more likes, shares and follows with smart website tools"
          />
          <ShareIcon
            className="addthis_share_button"
            data-service="twitter"
            data-url={this.url('twitter')}
            data-title="AddThis - Get more likes, shares and follows with smart website tools"
          />
          <ShareIcon
            className="addthis_share_button"
            data-service="email"
            data-url={this.url('email')}
            data-title="AddThis - Get more likes, shares and follows with smart website tools"
          />
        </div>
        <URL>{this.url('twitter')}</URL>
        <Divider>or</Divider>
        <h4>Ask colleagues to share</h4>
        <ShareButton
          className="addthis_share_button"
          data-service="slack"
          ata-url={this.url('slack')}
          data-title="AddThis - Get more likes, shares and follows with smart website tools"
        >
          <img src={slack} alt="" />
          Share on Slack
        </ShareButton>
        <ShareButton
          className="addthis_share_button"
          data-service="email"
          ata-url={this.url('email')}
          data-title="AddThis - Get more likes, shares and follows with smart website tools"
        >
          Share via email
        </ShareButton>
      </ShareWrapper>
    );
  }
}
export default Share;
