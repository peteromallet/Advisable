require 'rails_helper'

class TestService < Service
  def call
    "TestService was called"
  end
end

RSpec.describe Service do
  describe "self.call" do
    context "when the service succeeds" do
      it "#ok? returns true" do
        expect(TestService.call.ok?).to be_truthy
      end

      it "#data contains the return value of the services #call method" do
        expect(TestService.call.data).to eq("TestService was called")
      end
    end

    context "when the service fails" do
      before do
        allow_any_instance_of(TestService).to receive(:call)
          .and_raise("Failure message")
      end

      it "#ok? returns false" do
        expect(TestService.call.ok?).to_not be_truthy
      end

      it "#error contains the error that was raised" do
        expect(TestService.call.error.message).to eq("Failure message")
      end
    end
  end

  describe "#call" do
    it "raises NotImplementedError if the class does not have a #call method" do
      class ServiceWithNoCall < Service; end
      expect { ServiceWithNoCall.new.call }.to raise_error(NotImplementedError)
    end
  end
end
