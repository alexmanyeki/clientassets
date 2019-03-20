require 'xxhash'
module Jekyll
  class LiquidXXhash < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      ((XXhash.xxh32(context[@markup.strip]) % 10) / 2).floor + 1
    end
  end
end

Liquid::Template.register_tag('assign_artwork', Jekyll::LiquidXXhash)
