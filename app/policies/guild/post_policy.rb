# frozen_string_literal: true

module Guild
  class PostPolicy < Guild::BasePolicy
    def show
      record.specialist == current_user || published_and_accepted? || published_and_shareable?
    end

    def create_comment
      published_and_accepted?
    end

    private

    def published_and_accepted?
      record&.published? && accepted?
    end

    def published_and_shareable?
      record&.published? && record&.shareable
    end
  end
end
