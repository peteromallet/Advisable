# frozen_string_literal: true

module Admin
  module Guild
    class TopicsController < Admin::ApplicationController
      def default_sorting_attribute
        :published
      end
    end
  end
end
