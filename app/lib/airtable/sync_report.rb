class Airtable::SyncReport
  attr_reader :failures

  def initialize
    @failures = []
  end

  def failed(id, type, errors)
    @failures << {
      id: id,
      type: type,
      errors: errors
    }
  end
end
