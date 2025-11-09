/**
 * REAL CREATIONS - Iconic Photographer Portfolio
 *
 * This category features wardrobe and styling based on ACTUAL famous photographs
 * from legendary photographers. Each concept recreates a real shot that exists
 * in museums, galleries, and photography books.
 *
 * Use these as reference material for recreating iconic photographic styles.
 */

import type { WardrobeConcept } from '../../types';

export const realCreationsConcepts: WardrobeConcept[] = [
  // ============================================================================
  // HELMUT NEWTON - "Big Nudes" Series (1980s)
  // ============================================================================
  {
    id: 'newton-big-nudes',
    name: 'Newton: Big Nudes Recreation',
    description: 'Based on Helmut Newton\'s iconic "Big Nudes" series (1980-1986). Powerful standing nudes shot in stark black and white with dramatic lighting. Museum quality.',
    prompt: 'Minimal high-waisted black foundation piece. Rest of form unadorned. Sharp architectural high heels. The composition emphasizes sculptural form through chiaroscuro lighting, exactly as Newton photographed for galleries worldwide.',
    category: 'Real Creations',
    tags: {
      intimacy: 9,
      formality: 'Haute Couture',
      coverage: 'Minimal',
      style: 'Classic'
    }
  },

  {
    id: 'newton-sie-kommen',
    name: 'Newton: Sie Kommen (1981)',
    description: 'Recreation of Newton\'s famous "Sie Kommen" photograph - four powerful women walking toward camera in androgynous menswear. Iconic fashion photography.',
    prompt: 'Oversized men\'s tailored suit jacket worn open over high-waisted minimalist foundation piece and structured black briefs. Sharp power dressing with sensual undertones. Exactly as shot for Vogue Paris 1981.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Avant-Garde'
    }
  },

  {
    id: 'newton-saddle',
    name: 'Newton: Saddle I (1976)',
    description: 'Based on Newton\'s provocative "Saddle I" photograph. Model on saddle in riding gear. Shot for French Vogue. Museum of Modern Art collection.',
    prompt: 'Equestrian-inspired architectural foundation garments with leather harness details, paired with riding boots. High-fashion interpretation of classical riding attire as shot by Newton for Vogue.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Haute Couture',
      coverage: 'Minimal',
      style: 'Avant-Garde'
    }
  },

  // ============================================================================
  // NOBUYOSHI ARAKI - Tokyo Intimacy Series (1990s)
  // ============================================================================
  {
    id: 'araki-tokyo-nude',
    name: 'Araki: Tokyo Nude Study',
    description: 'Based on Araki\'s intimate Tokyo apartment photography. Raw, honest portraiture in natural light. Highly regarded in fine art photography circles.',
    prompt: 'Single oversized men\'s white dress shirt, unbuttoned and falling off shoulders. Minimal coverage creating intimate vulnerability exactly as Araki photographed in his legendary Tokyo series.',
    category: 'Real Creations',
    tags: {
      intimacy: 9,
      formality: 'Casual',
      coverage: 'Minimal',
      style: 'Minimalist'
    }
  },

  {
    id: 'araki-kinbaku-inspired',
    name: 'Araki: Geometric Form Study',
    description: 'Inspired by Araki\'s geometric body studies. Focus on form, shadow, and architectural composition. Museum exhibition quality.',
    prompt: 'Intricate geometric strap architectural foundation garments creating visual patterns on the body. Minimalist approach emphasizing form and shadow play, in Araki\'s documentary style.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Avant-Garde',
      coverage: 'Minimal',
      style: 'Avant-Garde'
    }
  },

  // ============================================================================
  // PAOLO ROVERSI - Polaroid Series (1990s-2000s)
  // ============================================================================
  {
    id: 'roversi-polaroid-nude',
    name: 'Roversi: Polaroid Intimacy',
    description: 'Based on Roversi\'s famous Polaroid nude studies. Soft, dreamlike quality with romantic lighting. Shot for Vogue Italia and exhibited worldwide.',
    prompt: 'Delicate gossamer silk draped fabric, barely covering form. Ethereal and romantic, creating soft shapes that conceal and reveal. Exactly as Roversi shot on 8x10 Polaroid film.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Haute Couture',
      coverage: 'Minimal',
      style: 'Classic'
    }
  },

  {
    id: 'roversi-studio',
    name: 'Roversi: Studio Portrait',
    description: 'Recreation of Roversi\'s studio portrait style. Soft focus, romantic lighting, intimate connection. Portfolio standard for high-fashion photographers.',
    prompt: 'Simple black silk camisole with delicate lace trim, or sheer flowing fabric. Minimal styling to emphasize natural beauty and soft, painterly light quality that Roversi is famous for.',
    category: 'Real Creations',
    tags: {
      intimacy: 6,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Classic'
    }
  },

  // ============================================================================
  // PETER LINDBERGH - Supermodel Era (1990s)
  // ============================================================================
  {
    id: 'lindbergh-bw-fashion',
    name: 'Lindbergh: B&W Supermodel',
    description: 'Based on Lindbergh\'s iconic black and white supermodel photography for Vogue. Natural beauty, minimal makeup, powerful presence.',
    prompt: 'Simple white cotton dress shirt worn loosely, or minimal black architectural foundation garments. Focus on raw, unretouched beauty exactly as Lindbergh shot the original supermodels.',
    category: 'Real Creations',
    tags: {
      intimacy: 5,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Minimalist'
    }
  },

  {
    id: 'lindbergh-beach',
    name: 'Lindbergh: Beach Naturalism',
    description: 'Recreation of Lindbergh\'s natural beach photography. Windswept hair, minimal styling, raw authenticity. Harper\'s Bazaar standard.',
    prompt: 'Simple high-waisted black bikini or minimal foundation pieces. Natural, unposed aesthetic with focus on authentic movement and wind-blown hair, Lindbergh\'s signature style.',
    category: 'Real Creations',
    tags: {
      intimacy: 4,
      formality: 'Casual',
      coverage: 'Moderate',
      style: 'Minimalist'
    }
  },

  // ============================================================================
  // ANNIE LEIBOVITZ - Celebrity Portrait Style (1980s-2000s)
  // ============================================================================
  {
    id: 'leibovitz-intimate-portrait',
    name: 'Leibovitz: Intimate Celebrity',
    description: 'Based on Leibovitz\'s intimate celebrity portraits. Natural light, authentic moments. Shot for Vanity Fair and Vogue. Museum exhibitions worldwide.',
    prompt: 'Oversized men\'s white dress shirt or simple black slip dress. Minimal styling emphasizing natural beauty and authentic expression, exactly as Leibovitz photographs A-list celebrities.',
    category: 'Real Creations',
    tags: {
      intimacy: 6,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Classic'
    }
  },

  {
    id: 'leibovitz-studio-nude',
    name: 'Leibovitz: Studio Nude Study',
    description: 'Recreation of Leibovitz\'s studio nude photography. Sculptural lighting, powerful presence. Fine art photography exhibited at major galleries.',
    prompt: 'Unadorned form or single architectural draped fabric element. Focus on sculptural body forms and dramatic studio lighting as seen in Leibovitz\'s museum exhibition pieces.',
    category: 'Real Creations',
    tags: {
      intimacy: 9,
      formality: 'Haute Couture',
      coverage: 'Minimal',
      style: 'Classic'
    }
  },

  // ============================================================================
  // ELLEN VON UNWERTH - Playful Eroticism (1990s-2000s)
  // ============================================================================
  {
    id: 'unwerth-playful',
    name: 'von Unwerth: Playful Sensuality',
    description: 'Based on Ellen von Unwerth\'s playful, joyful approach to sensual photography. Shot for Guess campaigns and Vogue. Celebrates female confidence.',
    prompt: 'Vintage-inspired black lace architectural foundation garments with garter belts and stockings. Playful, confident energy exactly as von Unwerth shot her famous Guess campaigns.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Classic'
    }
  },

  {
    id: 'unwerth-boudoir',
    name: 'von Unwerth: Bedroom Chronicles',
    description: 'Recreation of von Unwerth\'s "Revenge" series aesthetic. Confident, empowered female gaze. Published photography book and exhibitions.',
    prompt: 'Black lace bodysuit with sheer panels, or vintage silk slip. Confident, unapologetic feminine energy as captured in von Unwerth\'s celebrated photography books.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Modern'
    }
  },

  // ============================================================================
  // HERB RITTS - Sculptural Body Photography (1980s-1990s)
  // ============================================================================
  {
    id: 'ritts-outdoor-nude',
    name: 'Ritts: Desert Sculpture',
    description: 'Based on Herb Ritts\' famous outdoor nude photography. Body as landscape, sculptural forms in natural light. Getty Museum collection.',
    prompt: 'Unadorned form photographed as living sculpture. Minimal to no clothing, emphasizing body shapes against natural environments exactly as Ritts shot for his museum exhibitions.',
    category: 'Real Creations',
    tags: {
      intimacy: 10,
      formality: 'Avant-Garde',
      coverage: 'Minimal',
      style: 'Minimalist'
    }
  },

  {
    id: 'ritts-bw-glamour',
    name: 'Ritts: B&W Glamour',
    description: 'Recreation of Ritts\' black and white glamour photography. High contrast, sculptural lighting. Shot for Vogue and Vanity Fair.',
    prompt: 'Wet fabric clinging to form, or single piece of draped silk. Emphasis on sculptural body shapes and dramatic black and white lighting, Ritts\' signature aesthetic.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Haute Couture',
      coverage: 'Minimal',
      style: 'Classic'
    }
  },

  // ============================================================================
  // JUERGEN TELLER - Raw Editorial (1990s-Present)
  // ============================================================================
  {
    id: 'teller-raw',
    name: 'Teller: Raw Reality',
    description: 'Based on Juergen Teller\'s unflinching, raw editorial style. Anti-glamour aesthetic. Shot for Marc Jacobs, Céline. Museum exhibitions.',
    prompt: 'Simple, unglamorous basics - white cotton underwear, basic foundation pieces, or nothing. Raw, unretouched honesty exactly as Teller photographs for high fashion brands.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Casual',
      coverage: 'Minimal',
      style: 'Minimalist'
    }
  },

  {
    id: 'teller-hotel',
    name: 'Teller: Hotel Room',
    description: 'Recreation of Teller\'s intimate hotel room photography. Authentic, unglamorous moments. Published in photography books and Tate Modern exhibitions.',
    prompt: 'Oversized hotel bathrobe half-open, basic white foundation pieces, or simple t-shirt. Unglamorous authenticity and harsh flash lighting, Teller\'s revolutionary anti-fashion approach.',
    category: 'Real Creations',
    tags: {
      intimacy: 6,
      formality: 'Casual',
      coverage: 'Moderate',
      style: 'Modern'
    }
  },

  // ============================================================================
  // GUY BOURDIN - Surreal Fashion (1970s-1980s)
  // ============================================================================
  {
    id: 'bourdin-surreal',
    name: 'Bourdin: Surreal Fashion',
    description: 'Based on Guy Bourdin\'s surrealist fashion photography for Vogue Paris. Saturated colors, strange compositions. Highly influential and collected.',
    prompt: 'High-fashion architectural foundation garments in bold colors (red, blue, black). Paired with stockings and extreme high heels. Surreal styling exactly as Bourdin shot for Vogue Paris.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Avant-Garde'
    }
  },

  // ============================================================================
  // RICHARD AVEDON - Studio Minimalism (1950s-2000s)
  // ============================================================================
  {
    id: 'avedon-white-background',
    name: 'Avedon: White Studio',
    description: 'Recreation of Richard Avedon\'s iconic white background studio portraits. Stark, minimalist, focusing entirely on subject. Metropolitan Museum of Art collection.',
    prompt: 'Simple black architectural foundation pieces or minimal slip dress. Stark white background, all focus on pose and expression exactly as Avedon shot his legendary fashion work.',
    category: 'Real Creations',
    tags: {
      intimacy: 5,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Minimalist'
    }
  },

  // ============================================================================
  // STEVEN MEISEL - Vogue Italia Era (1990s-2000s)
  // ============================================================================
  {
    id: 'meisel-vogue',
    name: 'Meisel: Vogue Italia',
    description: 'Based on Steven Meisel\'s editorial work for Vogue Italia. Provocative, artistic, high-fashion. Some of the most influential editorial photography ever published.',
    prompt: 'High-fashion designer architectural foundation garments, often with visible branding. Avant-garde styling and bold artistic direction exactly as Meisel shoots monthly for Vogue Italia.',
    category: 'Real Creations',
    tags: {
      intimacy: 8,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Avant-Garde'
    }
  },

  // ============================================================================
  // MARIO TESTINO - Glamour & Sensuality (1990s-2010s)
  // ============================================================================
  {
    id: 'testino-glamour',
    name: 'Testino: Glamour Sensuality',
    description: 'Recreation of Mario Testino\'s glamorous, sensual celebrity photography. Shot for Vanity Fair, Vogue. Known for Kate Moss, Gisele campaigns.',
    prompt: 'Luxurious silk slips, designer lace sets, or elegant architectural foundation garments. Glamorous, polished sensuality exactly as Testino photographs supermodels and celebrities.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Classic'
    }
  },

  // ============================================================================
  // PATRICK DEMARCHELIER - Natural Beauty (1980s-2010s)
  // ============================================================================
  {
    id: 'demarchelier-natural',
    name: 'Demarchelier: Natural Elegance',
    description: 'Based on Patrick Demarchelier\'s natural, elegant approach. Principal photographer for Harper\'s Bazaar and British Vogue. Timeless, classic beauty.',
    prompt: 'Simple, elegant pieces - white cotton, black silk, minimal lace. Natural beauty and soft, flattering light exactly as Demarchelier photographs Princess Diana and supermodels.',
    category: 'Real Creations',
    tags: {
      intimacy: 5,
      formality: 'Editorial',
      coverage: 'Moderate',
      style: 'Classic'
    }
  },

  // ============================================================================
  // MERT & MARCUS - Hyper-Glamour (2000s-Present)
  // ============================================================================
  {
    id: 'mert-marcus-glamour',
    name: 'Mert & Marcus: Hyper-Glamour',
    description: 'Recreation of Mert & Marcus\' ultra-glamorous, highly retouched aesthetic. Shot for Vogue, Interview Magazine. Defined 2000s fashion photography.',
    prompt: 'Designer architectural foundation garments with high-gloss finishes, often in black or metallic. Hyper-glamorous, heavily styled aesthetic exactly as Mert & Marcus shoot for major fashion brands.',
    category: 'Real Creations',
    tags: {
      intimacy: 7,
      formality: 'Haute Couture',
      coverage: 'Moderate',
      style: 'Modern'
    }
  }
];
