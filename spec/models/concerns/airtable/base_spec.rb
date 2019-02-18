require 'rails_helper'

describe Airtable::Base do
  describe 'self.sync' do
    it 'interates through all of the records calling #sync on them' do
      a = OpenStruct.new(sync: true)
      b = OpenStruct.new(sync: true)
      allow(Airtable::Base).to receive(:all).and_return([a, b])
      expect(a).to receive(:sync)
      expect(b).to receive(:sync)
      Airtable::Base.sync
    end
  end
end