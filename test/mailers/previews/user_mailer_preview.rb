# frozen_string_literal: true

class UserMailerPreview < ActionMailer::Preview
  def invited_by_manager
    UserMailer.invited_by_manager(User.first, User.last)
  end

  def invited_to_interview
    UserMailer.invited_to_interview(User.first, User.last, random_interview)
  end

  def case_study_shared
    ApplicationRecord.uncached do
      shared_article = CaseStudy::SharedArticle.last
      UserMailer.case_study_shared(shared_article)
    end
  end

  def invoice_generated
    UserMailer.invoice_generated(Invoice.order("RANDOM()").first)
  end

  def payment_receipt
    UserMailer.payment_receipt(Payment.order("RANDOM()").first)
  end

  def new_agreement
    agreement = Agreement.order("RANDOM()").first
    UserMailer.new_agreement(agreement)
  end

  %i[new_agreement agreement_reminder].each do |method|
    define_method(method) do
      UserMailer.public_send(method, random_agreement)
    end
  end

  %i[payment_request payment_request_reminder payment_request_due].each do |method|
    define_method(method) do
      UserMailer.public_send(method, random_payment_request)
    end
  end

  %i[interview_reschedule_request interview_reminder post_interview].each do |method|
    define_method(method) do
      UserMailer.public_send(method, random_interview)
    end
  end

  def case_study_article_roundup
    UserMailer.case_study_article_roundup(random_user, [random_article.id, random_article.id, random_article.id])
  end

  private

  def random_agreement
    Agreement.order("RANDOM()").first
  end

  def random_user
    User.order("RANDOM()").first
  end

  def random_article
    CaseStudy::Article.all.sample
  end

  def random_interview
    Interview.order("RANDOM()").first
  end

  def random_project
    Project.order("RANDOM()").first
  end

  def random_application
    Application.order("RANDOM()").first
  end

  def random_payment_request
    PaymentRequest.order("RANDOM()").first
  end
end
