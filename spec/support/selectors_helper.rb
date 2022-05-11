# frozen_string_literal: true

module SelectorsHelper
  def find_by_test_id(id)
    first("*[data-testid='#{id}']")
  end
end
