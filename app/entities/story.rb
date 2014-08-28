class VoiceOver::Story
  include Lotus::Entity
  self.attributes = :name, :age, :country, :description, :email, :photo_ids

  def serializable_hash
    (self.class.attributes - [:email]).map { |k| [k.to_s, public_send(k)] }.to_h
  end
end
