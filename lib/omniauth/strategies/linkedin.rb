# frozen_string_literal: true

module OmniAuth
  module Strategies
    class LinkedIn < OmniAuth::Strategies::OAuth2
      FIELDS_MAPPING = {"first-name" => "firstName", "last-name" => "lastName", "picture-url" => "profilePicture(displayImage~:playableStreams)"}.freeze

      option :name, "linkedin"

      option :client_options, {
        site: "https://api.linkedin.com",
        authorize_url: "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
        token_url: "https://www.linkedin.com/oauth/v2/accessToken"
      }

      option :scope, "r_liteprofile"
      option :fields, %w[id first-name last-name picture-url]

      uid do
        raw_info["id"]
      end

      info do
        {
          first_name: localized_field("firstName"),
          last_name: localized_field("lastName"),
          picture_url:
        }
      end

      extra do
        {"raw_info" => raw_info}
      end

      def callback_url
        full_host + script_name + callback_path
      end

      alias_method :oauth2_access_token, :access_token

      def access_token
        ::OAuth2::AccessToken.new(client, oauth2_access_token.token, {
          expires_in: oauth2_access_token.expires_in,
          expires_at: oauth2_access_token.expires_at,
          refresh_token: oauth2_access_token.refresh_token
        })
      end

      def raw_info
        @raw_info ||= access_token.get(profile_endpoint).parsed
      end

      private

      def fields
        @fields ||= options.fields.map { |f| FIELDS_MAPPING[f] || f }
      end

      def localized_field(field_name)
        raw_info.dig(field_name, "localized", field_locale(field_name))
      end

      def field_locale(field_name)
        pref = raw_info.dig(field_name, "preferredLocale")
        [pref["language"], pref["country"]].join("_")
      end

      def picture_url
        elements = raw_info.dig("profilePicture", "displayImage~", "elements")
        elements.last["identifiers"].first["identifier"] if elements
      end

      def profile_endpoint
        "/v2/me?projection=(#{fields.join(",")})"
      end
    end
  end
end

OmniAuth.config.add_camelization("linkedin", "LinkedIn")
