/**
 * INSTAGRAM INFLUENCER MODELS
 * Based on viral Instagram moodboards with bedroom mirror selfie aesthetics
 * Indian influencer models with measurements, poses, and environments optimized for social media
 */

export interface InstagramInfluencerModel {
  name: string;
  category: string;
  physicalTraits: {
    height: string;
    measurements: string;
    bustSize: string;
    waistSize: string;
    hipSize: string;
    skinTone: string;
    hairColor: string;
    hairStyle: string;
    eyeColor: string;
    distinguishingFeatures: string;
    age: string;
    bodyType: string;
  };
  personalPhotographer: {
    name: string;
    signature: string;
    lighting: string;
    camera: string;
    colorGrade: string;
    mood: string;
  };
  wardrobeCollection: Array<{
    name: string;
    description: string;
  }>;
  poseGallery: Array<{
    name: string;
    description: string;
  }>;
  environments: Array<{
    name: string;
    description: string;
  }>;
}

export const INSTAGRAM_INFLUENCER_MODELS: InstagramInfluencerModel[] = [
  {
    name: "Bedroom Mirror Selfie Queen",
    category: "Instagram Viral Influencer - Mirror Selfie Specialist",
    physicalTraits: {
      height: "5'7\"",
      measurements: "36-26-38",
      bustSize: "36D",
      waistSize: "26\"",
      hipSize: "38\"",
      skinTone: "Radiant golden-bronze complexion with sun-kissed glow",
      hairColor: "Dark brown with honey highlights",
      hairStyle: "Loose glamorous beach waves cascading over shoulders, Instagram-perfect styling",
      eyeColor: "Deep brown",
      distinguishingFeatures: "Sultry bedroom eyes with dramatic lashes and winged liner, glossy plump lips, contoured cheekbones, perfect Instagram face. Small delicate infinity symbol tattoo on wrist, dainty script on ribcage. Multiple ear piercings with gold hoops, delicate nose ring",
      age: "22-26",
      bodyType: "Curvaceous hourglass figure with full bust, tiny waist, wide curved hips"
    },
    personalPhotographer: {
      name: "Instagram Viral Aesthetic",
      signature: "Viral bedroom mirror selfie with ring light and golden hour glow",
      lighting: "Warm golden hour sunlight through window mixing with ring light glow, creating perfect Instagram lighting with warm tones and soft shadows",
      camera: "28mm lens (selfie perspective), f/2.2, arm's length mirror reflection, slightly high selfie angle",
      colorGrade: "Vibrant warm Instagram tones with enhanced golden glow, saturated warm hues, lifted shadows, Instagram filter aesthetic",
      mood: "Bold aspirational Instagram influencer content celebrating Indian curves and confidence"
    },
    wardrobeCollection: [
      {
        name: "Instagram Casual-Glam Crop Top",
        description: "Fitted black crop halter top with tie detail showing toned midriff and cleavage, paired with high-waisted distressed denim shorts showing curves and long legs. Barefoot. Layered gold necklaces including name necklace, stacked bracelets, belly chain"
      },
      {
        name: "Artistic Lace Lingerie Set",
        description: "Delicate black lace bralette with intricate floral patterns and matching high-waisted lace briefs. Sheer lace details, underwire support, adjustable straps. Layered gold jewelry"
      },
      {
        name: "Minimalist Art Bodice",
        description: "Structured minimalist black bodice with clean lines and architectural boning. Modern artistic design with strategic cutouts. Paired with high-waisted black briefs. Gold accessories"
      },
      {
        name: "Sensual Black Bodysuit",
        description: "Form-fitting black bodysuit with plunging neckline and high-cut legs. Smooth stretch fabric hugging curves. Snap closure at bottom. Gold chain belt and jewelry"
      },
      {
        name: "College Girl Confidence",
        description: "Casual fitted tank top or crop tee with high-waisted jeans or shorts. Relaxed influencer casual style with gold jewelry and natural confidence"
      }
    ],
    poseGallery: [
      {
        name: "Mirror Selfie Classic",
        description: "Standing in front of full-length bedroom mirror taking mirror selfie, one hand holding phone high creating reflection, body angled showing curves in mirror, hip popped to side emphasizing waist and hips, sultry confident expression looking at phone camera, free hand on hip"
      },
      {
        name: "Confident Hip Pop",
        description: "Standing facing mirror with hip dramatically popped to one side, phone held high, other hand running through hair or on waist, showing full figure and curves"
      },
      {
        name: "Seated Mirror Elegance",
        description: "Sitting on edge of bed facing mirror, legs crossed or extended, phone held up for selfie, showing curves and confident posture"
      },
      {
        name: "Reclined Mirror Artistry",
        description: "Reclining on bed propped up on elbows, facing mirror at angle, phone held for selfie reflection, showing curves and artistic pose"
      },
      {
        name: "Back Arch Confidence",
        description: "Kneeling or sitting on bed facing mirror, arching back to emphasize curves, phone held high for mirror selfie, dramatic confident pose"
      }
    ],
    environments: [
      {
        name: "Trendy Influencer Bedroom",
        description: "Trendy bedroom with full-length mirror, fairy lights strung on walls, aesthetic tapestry, plants, polaroid photos, ring light visible, influencer bedroom vibe. Warm golden hour sunlight through window"
      },
      {
        name: "Minimalist Modern Bedroom",
        description: "Clean minimalist bedroom with large mirror, white walls, simple decor, ring light, modern aesthetic. Natural window light mixed with ring light glow"
      },
      {
        name: "Boho Aesthetic Bedroom",
        description: "Bohemian bedroom with macramé wall hangings, plants, string lights, vintage mirror, cozy textiles, aesthetic Instagram vibe"
      },
      {
        name: "Luxury Apartment Bedroom",
        description: "Upscale apartment bedroom with designer furniture, large ornate mirror, city view windows, luxury bedding, high-end influencer aesthetic"
      }
    ]
  },
  {
    name: "College Lifestyle Influencer",
    category: "Instagram College Girl - Relatable Confidence Specialist",
    physicalTraits: {
      height: "5'6\"",
      measurements: "34-25-36",
      bustSize: "34C",
      waistSize: "25\"",
      hipSize: "36\"",
      skinTone: "Warm golden-brown complexion with healthy radiant glow",
      hairColor: "Dark brown with subtle caramel highlights",
      hairStyle: "Long straight hair with natural volume, side-parted, effortlessly styled",
      eyeColor: "Dark brown",
      distinguishingFeatures: "Fresh girl-next-door beauty with bold makeup - defined brows, cat-eye liner, glossy lips. Natural confidence. Small delicate wrist tattoo",
      age: "20-24",
      bodyType: "Athletic feminine figure with toned curves, naturally slim waist, full hips"
    },
    personalPhotographer: {
      name: "College Relatable Aesthetic",
      signature: "Fresh college girl confidence with accessible glamour and relatable energy",
      lighting: "Natural window light with soft ring light fill, bright and fresh aesthetic, inviting and warm",
      camera: "28mm selfie lens, f/2.2, slightly elevated angle, front-facing camera perspective",
      colorGrade: "Bright lifted tones with warm undertones, fresh and vibrant, Instagram-ready with slight saturation boost",
      mood: "Relatable confidence meets bold glamour - girl-next-door with edge and aspirational appeal"
    },
    wardrobeCollection: [
      {
        name: "Campus Casual Chic",
        description: "Fitted crop top or tank with high-waisted denim jeans or shorts. Casual college style with confident fit. Simple gold jewelry, sneakers or barefoot"
      },
      {
        name: "Bold Confidence Set",
        description: "Matching athleisure set - sports bra and high-waisted leggings or bike shorts. Form-fitting activewear showing toned figure. Minimalist jewelry"
      },
      {
        name: "Date Night Ready",
        description: "Fitted bodycon dress or crop top with skirt. Going-out college style with confidence and curves. Strappy heels and statement jewelry"
      },
      {
        name: "Cozy Study Vibes",
        description: "Oversized hoodie or sweatshirt with shorts or athletic shorts. Comfortable college aesthetic with casual confidence"
      }
    ],
    poseGallery: [
      {
        name: "Confident Mirror Check",
        description: "Standing before mirror checking outfit, phone up for selfie, natural confident pose with slight hip tilt, relatable energy"
      },
      {
        name: "Getting Ready Glam",
        description: "Mid-getting-ready pose, applying makeup or fixing hair in mirror, phone capturing the moment, authentic lifestyle content"
      },
      {
        name: "Outfit Check Pose",
        description: "Full-body mirror selfie showing outfit, turning slightly to show angles, confident stance, relatable fashion content"
      },
      {
        name: "Study Break Confidence",
        description: "Casual relaxed pose on bed or desk area, natural authentic moment, phone selfie showing personality and confidence"
      }
    ],
    environments: [
      {
        name: "College Dorm Room",
        description: "Typical college dorm with string lights, posters, mirror, cozy bed, desk area, relatable college aesthetic"
      },
      {
        name: "Shared Apartment Bedroom",
        description: "Young adult apartment bedroom with personal touches, mirror, natural light, accessible influencer vibe"
      },
      {
        name: "Campus Housing Modern",
        description: "Updated campus housing with clean lines, good lighting, mirror, contemporary college living space"
      }
    ]
  },
  {
    name: "Bollywood Glam Influencer",
    category: "Instagram Bollywood Roleplay - Actress Aesthetic Specialist",
    physicalTraits: {
      height: "5'8\"",
      measurements: "36-24-36",
      bustSize: "36C",
      waistSize: "24\"",
      hipSize: "36\"",
      skinTone: "Luminous golden-bronze skin with professional makeup finish and flawless glow",
      hairColor: "Jet black with glossy shine",
      hairStyle: "Long voluminous waves with dramatic styling, classic Bollywood glamour hair",
      eyeColor: "Dark brown",
      distinguishingFeatures: "Dramatic Bollywood actress features - bold smokey eyes, defined cheekbones, full glossy lips, professional glam makeup. Classic Indian beauty with modern edge",
      age: "24-28",
      bodyType: "Perfectly proportioned hourglass figure with classic Bollywood actress physique"
    },
    personalPhotographer: {
      name: "Bollywood Cinematic Glam",
      signature: "Movie star glamour with dramatic lighting and cinematic composition",
      lighting: "Dramatic cinematic lighting with key light and rim lights, creating movie poster aesthetic with golden highlights",
      camera: "35mm cinematic lens, f/1.8, medium close-up to full body, movie still perspective",
      colorGrade: "Rich saturated tones with deep shadows and golden highlights, Bollywood film aesthetic",
      mood: "Aspirational movie star glamour with dramatic confidence and cinematic artistry"
    },
    wardrobeCollection: [
      {
        name: "Bollywood Glam Saree",
        description: "Luxurious silk or chiffon saree with intricate embroidery, draped to show curves, fitted blouse with strategic styling. Traditional elegance with bold modern confidence"
      },
      {
        name: "Movie Star Lehenga",
        description: "Designer lehenga with crop top choli and flowing skirt. Heavy embellishments, fitted top showing midriff, dramatic Bollywood styling"
      },
      {
        name: "Actress Off-Duty Chic",
        description: "High-fashion Indian fusion wear - fitted crop top with palazzo pants or designer jeans. Bollywood casual glamour with statement jewelry"
      },
      {
        name: "Red Carpet Ready",
        description: "Stunning designer gown or dramatic lehenga with movie premiere styling. Show-stopping glamour with full accessories"
      }
    ],
    poseGallery: [
      {
        name: "Bollywood Diva Pose",
        description: "Classic Bollywood actress pose with dramatic hand placement, hip emphasis, over-the-shoulder gaze at mirror/camera, movie poster confidence"
      },
      {
        name: "Saree Draping Elegance",
        description: "Adjusting saree pallu or draping, showing curves and traditional elegance, graceful movement captured in mirror reflection"
      },
      {
        name: "Movie Star Confidence",
        description: "Full body power pose showing outfit and figure, cinematic confidence, dramatic presence like movie still"
      },
      {
        name: "Getting Ready Glam",
        description: "Mid-styling pose fixing jewelry or outfit, captured in vanity mirror, behind-the-scenes movie star preparation"
      }
    ],
    environments: [
      {
        name: "Luxury Vanity Room",
        description: "Opulent dressing room with large illuminated mirrors, luxury vanity, Bollywood actress preparation space with glamorous lighting"
      },
      {
        name: "Designer Apartment Bedroom",
        description: "High-end Mumbai apartment with floor-to-ceiling windows, city lights, designer furniture, luxury mirror, movie star living"
      },
      {
        name: "Hotel Suite Glamour",
        description: "Five-star hotel suite with elegant decor, full-length mirrors, luxury bedding, professional lighting, celebrity aesthetic"
      }
    ]
  },
  {
    name: "Morning Routine Influencer",
    category: "Instagram Morning Routine - Intimate Lifestyle Specialist",
    physicalTraits: {
      height: "5'7\"",
      measurements: "35-26-37",
      bustSize: "35C",
      waistSize: "26\"",
      hipSize: "37\"",
      skinTone: "Natural golden-brown skin with fresh morning glow, minimal makeup",
      hairColor: "Dark brown",
      hairStyle: "Naturally tousled morning hair or messy bun, authentic lifestyle aesthetic",
      eyeColor: "Dark brown",
      distinguishingFeatures: "Natural beauty with fresh-faced appeal, subtle makeup or bare skin, authentic morning energy. Delicate jewelry",
      age: "23-27",
      bodyType: "Naturally curvy figure with soft feminine form, authentic body confidence"
    },
    personalPhotographer: {
      name: "Morning Lifestyle Aesthetic",
      signature: "Intimate morning routine moments with natural light and authentic lifestyle content",
      lighting: "Soft natural morning light through windows, gentle golden glow, fresh and intimate",
      camera: "28mm natural perspective, f/2.0, lifestyle moment capture, authentic selfie aesthetic",
      colorGrade: "Soft warm tones with gentle highlights, natural skin tones, morning freshness, intimate atmosphere",
      mood: "Intimate lifestyle content celebrating natural beauty and authentic morning confidence"
    },
    wardrobeCollection: [
      {
        name: "Morning Lounge Set",
        description: "Matching loungewear set - soft cami and shorts or coordinated separates. Comfortable morning aesthetic showing natural curves"
      },
      {
        name: "Oversized Shirt Comfort",
        description: "Oversized button-down shirt worn as dress or with shorts, relaxed morning vibe, casual intimate aesthetic"
      },
      {
        name: "Intimate Morning Wear",
        description: "Delicate silk or lace camisole with matching shorts, intimate morning routine aesthetic, natural confidence"
      },
      {
        name: "Athleisure Morning Energy",
        description: "Sports bra or crop tank with high-waisted leggings or shorts, morning workout ready aesthetic"
      }
    ],
    poseGallery: [
      {
        name: "Morning Mirror Moment",
        description: "Natural pose in mirror capturing morning routine, fresh-faced confidence, authentic lifestyle moment"
      },
      {
        name: "Getting Ready Natural",
        description: "Mid-routine captured moment - fixing hair, morning skincare, authentic lifestyle content"
      },
      {
        name: "Bedroom Confidence",
        description: "Relaxed pose on bed or by window, morning light, natural beauty, intimate authentic moment"
      },
      {
        name: "Fresh Morning Glow",
        description: "Close-up or medium shot highlighting natural skin, morning freshness, minimal editing aesthetic"
      }
    ],
    environments: [
      {
        name: "Bright Morning Bedroom",
        description: "Sunlit bedroom with natural morning light streaming through windows, unmade bed, authentic morning aesthetic"
      },
      {
        name: "Minimalist Morning Space",
        description: "Clean bright bedroom with simple decor, large windows, natural light, peaceful morning vibe"
      },
      {
        name: "Cozy Apartment Morning",
        description: "Relatable apartment bedroom with morning light, mirror, cozy textiles, authentic lifestyle space"
      }
    ]
  }
];
