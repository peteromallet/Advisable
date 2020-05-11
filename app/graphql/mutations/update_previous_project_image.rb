class Mutations::UpdatePreviousProjectImage < Mutations::BaseMutation
  argument :previous_project_image, ID, required: true
  argument :position, Integer, required: false
  argument :cover, Boolean, required: false

  field :image, Types::PreviousProjectImage, null: true

  def resolve(**args)
    image = PreviousProjectImage.find_by_uid!(args[:previous_project_image])
    image.position = args[:position] if args[:position]
    image.cover = args[:cover] if args[:cover]
    image.save

    if image.cover
      image.previous_project.images.where(cover: true).where.not(id: image.id)
        .update(cover: false)
    end

    { image: image }
  end
end
