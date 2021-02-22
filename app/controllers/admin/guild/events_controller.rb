# frozen_string_literal: true

module Admin
  module Guild
    class EventsController < Admin::ApplicationController
      def destroy_cover_photo
        requested_resource.cover_photo&.purge
        redirect_back(fallback_location: requested_resource)
      end
    end
  end
end
