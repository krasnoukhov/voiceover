module VoiceOver::Controllers::Photos
  include VoiceOver::Controller

  class Index
    include Lotus::Action

    def call(params)
      self.format = :json
      self.body = Oj.dump(VoiceOver::PhotoRepository.all)
    end
  end
end
