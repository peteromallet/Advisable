module Guild
  class Post::AdviceRequired < Post

    jsonb_accessor :data,
      need_help: [:boolean, default: true]
  end
end
