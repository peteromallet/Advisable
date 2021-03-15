# frozen_string_literal: true

module Admin
  class EventsController < Admin::ApplicationController
    # Event dates in the admin need to be UTC-7
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
