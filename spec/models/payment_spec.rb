require 'rails_helper'

describe Payment do
  include_examples "uid"

  it 'has a valid factory' do
    payment = build(:payment)
    expect(payment).to be_valid
  end

  describe '#pending?' do
    context 'when the status is pending' do
      it 'returns true' do
        payment = build(:payment, status: 'pending')
        expect(payment.pending?).to be_truthy
      end
    end
  end
end
