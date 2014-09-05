class VoiceOver::PhotoRepository
  include Lotus::Repository

  def self.all_ordered
    query do
      order(:id)
    end.all
  end

  def self.all_as_hash
    all_ordered.map { |x| [x.id.to_s, x] }.to_h
  end
end
