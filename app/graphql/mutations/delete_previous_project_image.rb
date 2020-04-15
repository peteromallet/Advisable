class Mutations::DeletePreviousProjectImage < Mutations::BaseMutation
  argument :previous_project_image, ID, required: true

  field :image, Types::PreviousProjectImage, null: true

  def resolve(**args)
    image = PreviousProjectImage.find_by_uid!(args[:previous_project_image])
    image.destroy
    { image: image }
  end
end
