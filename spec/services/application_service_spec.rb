require 'rails_helper'

describe ApplicationService do
  describe 'self.call' do
    it 'create a new instance of the service and calls the #call method' do
      inst = double(ApplicationService)
      expect(ApplicationService).to receive(:new).and_return(inst)
      expect(inst).to receive(:call)
      ApplicationService.call
    end
  end

  describe "#call" do
    it 'raises NotImplementedError' do
      expect {
        ApplicationService.new.call
      }.to raise_error(NotImplementedError)
    end
  end
end