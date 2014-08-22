class VoiceOver::PhotoRepository
  include Lotus::Repository

  def self.all_as_hash
    all.map { |x| [x.id.to_s, x] }.to_h
  end
end
