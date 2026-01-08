/**
 * PHOTOGRAPHER STYLES FOR VERA MODE
 * Legendary photographer styles with detailed technical specifications
 */

export interface PhotographerStyle {
  id: string;
  name: string;
  description: string;
  lighting: string;
  colorGrade: string;
  style: string;
  quality: string;
  shot: string;
  lens?: string;
  camera?: string;
  filmStock?: string;
  aperture?: string;
  focalLength?: string;
  mood?: string;
}

export const PHOTOGRAPHER_STYLES: PhotographerStyle[] = [
  {
    id: 'helmut-newton',
    name: 'Helmut Newton (Neo-Noir Power)',
    description: 'Bold, cinematic glamour with high-contrast neo-noir aesthetic',
    style: 'Bold, cinematic, and glamorous style, featuring powerful subjects in luxurious, stark settings. High-contrast, neo-noir, and powerfully sensual.',
    lighting: 'Hard, directional studio lighting from high side angle, creating dramatic sharp shadows and brilliant highlights that sculpt form.',
    colorGrade: 'Severe Monochromatic B&W: Deep crushed blacks, brilliant clean whites, neutral skin tones. Clean, severe, high-fashion aesthetic.',
    quality: 'RAW Cinematic: Glamorous, bold, realistic. 8k, natural textures, no artificial plastic look, high-end cinematic quality.',
    shot: 'Full body or three-quarters shot, emphasizing long lines and commanding pose',
    camera: 'Hasselblad medium format',
    aperture: 'f/5.6-f/8',
    focalLength: '80-150mm',
    mood: 'Powerful, commanding, dramatic'
  },
  {
    id: 'paolo-roversi',
    name: 'Paolo Roversi (Ethereal Dreams)',
    description: 'Painterly soft focus with emotional depth and timeless beauty',
    style: 'Ethereal, painterly, dreamlike. Profound focus on emotional depth and soft, spiritual quality. Slightly soft focus, bleeding light.',
    lighting: 'Soft single-source directional window light wrapping around features, creating very soft shadows. Long exposures for movement blur.',
    colorGrade: 'Painterly Desaturated: Warm rich painterly tones. Deep browns, warm skin highlights, velvety blacks. Timeless faded feel.',
    quality: 'Large-format film (8x10 Deardorff) with vintage lens. Beautiful soft focus and prominent artistic film grain.',
    shot: 'Close-up or medium portrait, capturing emotion with profound depth',
    camera: 'Deardorff 8x10 large format',
    filmStock: 'Polaroid Type 55',
    aperture: 'f/4-f/5.6',
    focalLength: '300-360mm',
    mood: 'Dreamy, ethereal, emotional'
  },
  {
    id: 'annie-leibovitz',
    name: 'Annie Leibovitz (Cinematic Narrative)',
    description: 'Elaborate storytelling with cinematic polish and drama',
    style: 'Cinematic, dramatic, narrative-driven. Each portrait feels like movie still, elaborate sets, strong sense of story.',
    lighting: 'Complex multi-light setups with softboxes, grids, reflectors. Polished, sculpted, highly controlled cinematic look.',
    colorGrade: 'Cool Cinematic: Cool slightly desaturated tones with deep blues/cyans in shadows. Modern, cinematic, moody feel.',
    quality: 'Hasselblad X2D. Unmatched 8K detail. Extremely sharp focus. Every micro-detail rendered with absolute clarity.',
    shot: 'Environmental portrait showing subject within story-telling context',
    camera: 'Hasselblad X2D 100MP',
    aperture: 'f/8-f/11',
    focalLength: '50-120mm',
    mood: 'Narrative, dramatic, cinematic'
  },
  {
    id: 'peter-lindbergh',
    name: 'Peter Lindbergh (Authentic Soul)',
    description: 'Raw authenticity emphasizing natural beauty and character',
    style: 'Raw, authentic, emotionally direct. Focus on natural beauty and character over artifice. Candid unposed moments.',
    lighting: 'Natural available light, overcast day or open shade, creating soft flattering illumination revealing true character.',
    colorGrade: 'High-Contrast B&W: Gritty yet soulful, deep blacks, textured grays, luminous whites, emphasizing emotion and form.',
    quality: 'Kodak Tri-X 400 film. 8k capturing soul of subject. Beautiful prominent film grain adding texture and realism.',
    shot: 'Candid medium shot or close-up, focusing on genuine expression and connection',
    camera: 'Pentax 67',
    filmStock: 'Kodak Tri-X 400',
    aperture: 'f/2.8-f/5.6',
    focalLength: '105-165mm',
    mood: 'Authentic, soulful, direct'
  },
  {
    id: 'jean-loup-sieff',
    name: 'Jean-Loup Sieff (Sculptural B&W Form)',
    description: 'Dramatic perspectives highlighting sculptural human form',
    style: 'Focus on sculptural, sensual, graphic qualities of human form. Dramatic perspectives and wide-angle lenses elongating lines.',
    lighting: 'High-contrast dramatic natural/studio light carving body from deep shadows, emphasizing texture and form over personality.',
    colorGrade: 'High-Contrast B&W with rich velvety blacks and full range of mid-tones, deep tactile quality.',
    quality: 'Medium format film with wide-angle lens (28mm). Dynamic compositions. Prominent but fine grain.',
    shot: 'Unconventional full-body or environmental portraits playing with perspective and composition',
    camera: 'Hasselblad 500C/M',
    filmStock: 'Ilford HP5 Plus',
    aperture: 'f/8-f/16',
    focalLength: '28-50mm (wide)',
    mood: 'Sculptural, graphic, sensual'
  },
  {
    id: 'guy-bourdin',
    name: 'Guy Bourdin (Surrealist Color Narrative)',
    description: 'Hyper-saturated surrealism with mysterious narratives',
    style: 'Surreal, mysterious, provocative high-fashion storytelling. Implies narrative beyond frame with rich saturated colors and glossy textures.',
    lighting: 'Hard, polished, hyper-real studio lighting. Colored gels and high-gloss surfaces creating vibrant almost artificial world.',
    colorGrade: 'Vibrant & Saturated: Hyper-saturated colors, especially reds, pinks, greens. High-gloss commercial finish, luxurious yet unsettling.',
    quality: 'Medium-format color film (Kodachrome). Rich color saturation and fine detail. Impeccably sharp and glossy.',
    shot: 'Fragmented or abstract compositions, often legs, feet, or cropped figures within larger mysterious scene',
    camera: 'Hasselblad 500C/M',
    filmStock: 'Kodachrome 64',
    aperture: 'f/11-f/16',
    focalLength: '80-150mm',
    mood: 'Mysterious, surreal, provocative'
  },
  {
    id: 'araki',
    name: 'Araki (Intimate Diary)',
    description: 'Raw intimate snapshots with confrontational edge',
    style: 'Raw, intimate, confrontational snapshot aesthetic. Diary-like documentation of personal moments, blending tenderness with rough high-contrast.',
    lighting: 'Hard direct on-camera flash (snapshot style), creating harsh shadows, blown-out highlights, unfiltered reality.',
    colorGrade: 'High-Contrast B&W, pushed in processing to increase grain and contrast. Gritty, raw, immediate feel.',
    quality: '35mm point-and-shoot with fast black-and-white film. Intentionally raw, with heavy grain and imperfections.',
    shot: 'Candid unposed close-ups and medium shots feeling like stolen private moments. Focus on texture, flowers, kinbaku',
    camera: '35mm point-and-shoot (Contax T2)',
    filmStock: 'Kodak T-Max 3200',
    aperture: 'f/2.8-f/5.6',
    focalLength: '35mm',
    mood: 'Intimate, raw, confrontational'
  },
  {
    id: 'man-ray',
    name: 'Man Ray (Surrealist Form)',
    description: 'Experimental abstraction of human form with solarization effects',
    style: 'Surrealist and experimental, treating human form as abstract shapes and lines. Solarization (Sabattier effect) creating dreamlike uncanny images.',
    lighting: 'Experimental harsh lighting creating stark contrasts and silhouettes. Light distorts and abstracts figure, bright blown-out edges.',
    colorGrade: 'Vintage high-contrast B&W with soft silver-gelatin print feel. Muted tones emphasizing texture and grain.',
    quality: 'Large-format film with experimental processing. Timeless artifact-like quality with imperfections like dust or scratches.',
    shot: 'Abstracted close-ups or fragmented body shots focusing on individual parts to deconstruct human form',
    camera: 'Large format view camera',
    filmStock: 'Various experimental processes',
    aperture: 'f/16-f/22',
    focalLength: '150-300mm',
    mood: 'Surreal, experimental, dreamlike'
  },
  {
    id: 'robert-mapplethorpe',
    name: 'Robert Mapplethorpe (Sculptural Purity)',
    description: 'Classical perfection with formalist precision',
    style: 'Formalist, classical, sculptural. Profound focus on perfection of form, symmetry, line. Treating body like classical statue, highly controlled.',
    lighting: 'Immaculate controlled studio lighting. Single hard light source carving muscle definition, deep precise shadows. Neutral grey/black background.',
    colorGrade: 'Pristine high-contrast B&W with huge tonal range. Deep rich blacks, brilliant whites, full spectrum of silvery greys.',
    quality: 'Hasselblad medium format. Technically perfect with extreme sharpness and detail. No grain, perfect focus.',
    shot: 'Full-body or torso shots posed classically (contrapposto). Balanced, geometric, perfectly centered composition',
    camera: 'Hasselblad 500C/M',
    filmStock: 'Kodak Plus-X Pan',
    aperture: 'f/11-f/16',
    focalLength: '80-150mm',
    mood: 'Classical, sculptural, pure'
  },
  {
    id: 'ellen-von-unwerth',
    name: 'Ellen von Unwerth (Playful Narrative)',
    description: 'Energetic playfulness with candid sensuality',
    style: 'Playful, energetic, candidly sensual. Stories of playful liberation and female confidence. Captured wild party or behind-the-scenes glance.',
    lighting: 'Dynamic imperfect lighting mimicking real-world. Mix of on-camera flash, ambient room light, daylight. Spontaneous high-energy feel.',
    colorGrade: 'Gritty high-contrast B&W or slightly over-saturated color with warm filmic cast. Grainy, raw, unpolished feel.',
    quality: '35mm film with fast film. Prioritizes emotion and energy over technical perfection. Embracing grain, soft focus, movement.',
    shot: 'Dynamic unposed medium shots or environmental portraits with interaction. Genuine laughter, movement, knowing glances',
    camera: 'Canon EOS-1V (35mm)',
    filmStock: 'Kodak Portra 400',
    aperture: 'f/2-f/4',
    focalLength: '35-85mm',
    mood: 'Playful, energetic, liberating'
  }
];

export function getPhotographerById(id: string): PhotographerStyle | undefined {
  return PHOTOGRAPHER_STYLES.find(p => p.id === id);
}

export function getPhotographerByName(name: string): PhotographerStyle | undefined {
  return PHOTOGRAPHER_STYLES.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
}

export function getRandomPhotographer(): PhotographerStyle {
  return PHOTOGRAPHER_STYLES[Math.floor(Math.random() * PHOTOGRAPHER_STYLES.length)];
}
