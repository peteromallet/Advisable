# frozen_string_literal: true

module SelectorsHelper
  def find_by_test_id(id)
    first("*[data-testid='#{id}']")
  end

  def find_by_label(label)
    first("*[aria-label='#{label}']")
  end
end
