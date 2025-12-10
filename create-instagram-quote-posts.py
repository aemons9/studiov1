#!/usr/bin/env python3
"""
Create Instagram Quote Posts for VeraLabs × StudioV
Text-based quote cards for social media engagement
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

SIZE = (1080, 1080)
OUTPUT_DIR = Path('/home/user/studiov1/instagram-posts')

COLORS = {
    'cream_white': (250, 248, 245),
    'deep_espresso': (28, 25, 23),
    'rose_gold': (232, 180, 184),
    'pale_gold': (212, 175, 55),
    'warm_taupe': (184, 162, 142),
}

def get_font(size, bold=False):
    fonts_bold = ['/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf']
    fonts_regular = ['/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf']
    font_list = fonts_bold if bold else fonts_regular

    for f in font_list:
        try:
            return ImageFont.truetype(f, size)
        except:
            continue
    return ImageFont.load_default()

def create_quote_post(quote, author, filename, bg_color, text_color, accent_color):
    """Create a quote post"""
    img = Image.new('RGB', SIZE, bg_color)
    draw = ImageDraw.Draw(img)

    # Decorative corners
    corner_size = 100
    for x, y in [(60, 60), (SIZE[0]-60, 60), (60, SIZE[1]-60), (SIZE[0]-60, SIZE[1]-60)]:
        if x == 60:  # Left side
            if y == 60:  # Top
                draw.line([(x, y), (x+corner_size, y)], fill=accent_color, width=2)
                draw.line([(x, y), (x, y+corner_size)], fill=accent_color, width=2)
            else:  # Bottom
                draw.line([(x, y), (x+corner_size, y)], fill=accent_color, width=2)
                draw.line([(x, y), (x, y-corner_size)], fill=accent_color, width=2)
        else:  # Right side
            if y == 60:  # Top
                draw.line([(x, y), (x-corner_size, y)], fill=accent_color, width=2)
                draw.line([(x, y), (x, y+corner_size)], fill=accent_color, width=2)
            else:  # Bottom
                draw.line([(x, y), (x-corner_size, y)], fill=accent_color, width=2)
                draw.line([(x, y), (x, y-corner_size)], fill=accent_color, width=2)

    # Quote marks
    font_quote_mark = get_font(120, bold=True)
    draw.text((150, 200), '"', font=font_quote_mark, fill=accent_color)

    # Quote text (wrapped)
    font_quote = get_font(42, bold=True)
    words = quote.split()
    lines = []
    current_line = []

    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font_quote)
        if bbox[2] - bbox[0] < 800:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
            current_line = [word]
    if current_line:
        lines.append(' '.join(current_line))

    y = 350
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_quote)
        line_width = bbox[2] - bbox[0]
        x = (SIZE[0] - line_width) // 2
        draw.text((x, y), line, font=font_quote, fill=text_color)
        y += 70

    # Author
    font_author = get_font(24)
    author_text = f"— {author}"
    bbox = draw.textbbox((0, 0), author_text, font=font_author)
    author_width = bbox[2] - bbox[0]
    draw.text(((SIZE[0] - author_width) // 2, y + 40), author_text,
              font=font_author, fill=accent_color)

    # Branding
    font_brand = get_font(14)
    brand = "VERALABS × STUDIOV"
    bbox = draw.textbbox((0, 0), brand, font=font_brand)
    brand_width = bbox[2] - bbox[0]
    draw.text(((SIZE[0] - brand_width) // 2, SIZE[1] - 80), brand,
              font=font_brand, fill=accent_color)

    # Save
    output_path = OUTPUT_DIR / filename
    img.save(output_path, 'PNG', quality=95)
    return output_path

def main():
    print("🎨 Creating Instagram Quote Posts")
    print("=" * 60)

    quotes = [
        {
            'quote': 'Art is the intersection of imagination and technology',
            'author': 'VeraLabs',
            'filename': 'quote-post-01-art-tech.png',
            'bg': COLORS['deep_espresso'],
            'text': COLORS['cream_white'],
            'accent': COLORS['pale_gold']
        },
        {
            'quote': 'Every pixel tells a story waiting to be discovered',
            'author': 'StudioV',
            'filename': 'quote-post-02-pixels.png',
            'bg': COLORS['cream_white'],
            'text': COLORS['deep_espresso'],
            'accent': COLORS['rose_gold']
        },
        {
            'quote': 'Fashion is not what you wear, it is how you imagine',
            'author': 'VeraLabs',
            'filename': 'quote-post-03-fashion.png',
            'bg': COLORS['deep_espresso'],
            'text': COLORS['cream_white'],
            'accent': COLORS['pale_gold']
        },
        {
            'quote': 'In the marriage of AI and artistry lies infinite beauty',
            'author': 'StudioV',
            'filename': 'quote-post-04-ai-art.png',
            'bg': COLORS['cream_white'],
            'text': COLORS['deep_espresso'],
            'accent': COLORS['warm_taupe']
        },
        {
            'quote': 'Create without limits, design without boundaries',
            'author': 'VeraLabs',
            'filename': 'quote-post-05-create.png',
            'bg': COLORS['deep_espresso'],
            'text': COLORS['cream_white'],
            'accent': COLORS['rose_gold']
        }
    ]

    created = []
    for q in quotes:
        try:
            path = create_quote_post(
                q['quote'], q['author'], q['filename'],
                q['bg'], q['text'], q['accent']
            )
            size_kb = path.stat().st_size / 1024
            print(f"✅ Created: {q['filename']} ({size_kb:.1f} KB)")
            created.append(q['filename'])
        except Exception as e:
            print(f"❌ Error: {q['filename']} - {e}")

    print()
    print("=" * 60)
    print(f"✨ Complete! {len(created)}/5 quote posts created")
    print()
    for img in created:
        print(f"   • {img}")
    print()
    print("🚀 Ready for Instagram!")

if __name__ == "__main__":
    main()
