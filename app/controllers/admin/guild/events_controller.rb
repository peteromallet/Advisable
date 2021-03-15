# frozen_string_literal: true

module Admin
  module Guild
    class EventsController < Admin::ApplicationController
      # Event dates in the admin need to be GMT-7
      around_action :override_tz

      def destroy_cover_photo
        requested_resource.cover_photo&.purge
        redirect_back(fallback_location: requested_resource)
      end

      private

      def override_tz(&block)
        Time.use_zone("Pacific Time (US & Canada)", &block)
      end
    end
  end
end
