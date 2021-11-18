# frozen_string_literal: true

class SpecialistsController < ApplicationController
  before_action :prefetch_profile, only: %i[profile case_study]

  def profile
    @specialist = Specialist.find_by_username_or_id(params[:username])
  end

  def case_study
    prefetch_query("app/javascript/src/views/FreelancerProfile/queries/getCaseStudy.gql", variables: {
      id: params[:slug]
    })
    @case_study = ::CaseStudy::Article.find_by_slug_or_id(params[:slug])
  end

  private

  def prefetch_profile
    prefetch_query("app/javascript/src/views/FreelancerProfile/queries/getProfileData.gql", variables: {
      id: params[:username]
    })
  end
end
