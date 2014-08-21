module VoiceOver::Controllers::Stories
  include VoiceOver::Controller

  class Create
    include Lotus::Action

    def call(params)
      story = VoiceOver::Story.new(params[:story])
      VoiceOver::StoryRepository.create(story)

      self.format = :json
      self.body = Oj.dump(story)
    end
  end
end
