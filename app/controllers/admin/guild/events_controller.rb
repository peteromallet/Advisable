# frozen_string_literal: true

module Admin
  module Guild
    class EventsController < Admin::ApplicationController
      # Event date display and modification via admin needs to be in GMT-7
      around_action :override_tz

      def destroy_cover_photo
        requested_resource.cover_photo&.purge
        redirect_back(fallback_location: requested_resource)
      end

      private

      def override_tz(&block)
        Time.use_zone("America/Los_Angeles", &block)
      end
    end
  end
end
