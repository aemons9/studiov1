// types/corporate.ts
export const CORPORATE_ROLES: CorporateRoleProfile[] = [
  {
    role: 'chief_executive',
    powerLevel: 10,
    sensualityStyle: 'authoritative',
    wardrobeSignature: 'custom-tailored power suits, architectural silhouettes',
    environmentPreferences: ['corner_office', 'executive_boardroom', 'private_penthouse'],
    powerPoses: ['standing_at_window', 'leaning_on_desk', 'commanding_chair'],
    corporateProps: ['architectural_blueprints', 'financial_reports', 'corporate_seals']
  },
  {
    role: 'board_member',
    powerLevel: 9, 
    sensualityStyle: 'manipulative',
    wardrobeSignature: 'luxury fabrics, statement jewelry, strategic transparency',
    environmentPreferences: ['boardroom', 'private_dining', 'executive_lounge'],
    powerPoses: ['seated_at_table', 'standing_behind_chair', 'leaning_against_console'],
    corporateProps: ['board_minutes', 'stock_certificates', 'vintage_pen']
  },
  {
    role: 'personal_secretary',
    powerLevel: 7,
    sensualityStyle: 'subversive', 
    wardrobeSignature: 'form-fitting professional wear, elevated basics',
    environmentPreferences: ['executive_antechamber', 'copy_room', 'elevator'],
    powerPoses: ['leaning_against_desk', 'sorting_documents', 'holding_tablet'],
    corporateProps: ['schedules', 'confidential_files', 'access_cards']
  },
  {
    role: 'hr_executive',
    powerLevel: 8,
    sensualityStyle: 'intellectual',
    wardrobeSignature: 'structured separates, psychological power dressing',
    environmentPreferences: ['hr_director_office', 'mediation_room', 'records_archive'],
    powerPoses: ['standing_by_filing', 'seated_authoritative', 'reviewing_documents'],
    corporateProps: ['personnel_files', 'policy_manuals', 'approval_stamps']
  },
  {
    role: 'design_executive',
    powerLevel: 8,
    sensualityStyle: 'creative',
    wardrobeSignature: 'architectural fashion, artistic expression', 
    environmentPreferences: ['design_studio', 'creative_war_room', 'materials_library'],
    powerPoses: ['kneeling_with_samples', 'standing_at_drafting_table', 'evaluating_prototypes'],
    corporateProps: ['design_sketches', 'material_swatches', 'digital_tablet']
  },
  {
    role: 'government_official',
    powerLevel: 9,
    sensualityStyle: 'bureaucratic',
    wardrobeSignature: 'traditional_with_subversion, power_saris',
    environmentPreferences: ['minister_office', 'parliament_chamber', 'diplomatic_suite'],
    powerPoses: ['sitting_on_desk', 'standing_with_documents', 'addressing_room'],
    corporateProps: ['official_seals', 'policy_documents', 'diplomatic_gifts']
  },
  {
    role: 'lawyer',
    powerLevel: 9,
    sensualityStyle: 'legal',
    wardrobeSignature: 'sharp_tailoring, legal_authority_with_feminine_subversion',
    environmentPreferences: ['law_firm_partner_office', 'court_chambers', 'legal_library'],
    powerPoses: ['standing_on_ladder', 'leaning_against_shelves', 'reviewing_case_law'],
    corporateProps: ['legal_briefs', 'case_files', 'confidential_documents']
  }
];

export const OFFICE_ENVIRONMENTS: OfficeEnvironment[] = [
  {
    type: 'corporation_mnc',
    luxuryLevel: 9,
    privacyLevel: 8,
    aesthetic: 'ultra-modern corporate luxury, glass and steel',
    exclusiveSpaces: ['ceo_sky_office', 'executive_floor', 'private_elevator'],
    lightingProfiles: ['dramatic_city_views', 'architectural_lighting', 'executive_warmth'],
    materialPalette: ['polished_concrete', 'glass', 'brushed_steel', 'rich_woods']
  },
  {
    type: 'hotel_chain',
    luxuryLevel: 10,
    privacyLevel: 9,
    aesthetic: 'five-star hotel opulence, bespoke service',
    exclusiveSpaces: ['presidential_suite', 'penthouse_terrace', 'private_spa'],
    lightingProfiles: ['golden_hour_luxury', 'candlelight_ambiance', 'crystal_chandeliers'],
    materialPalette: ['marble', 'velvet', 'silk', 'polished_brass']
  },
  {
    type: 'real_estate',
    luxuryLevel: 10,
    privacyLevel: 10,
    aesthetic: 'billionaire developer luxury, architectural masterpiece',
    exclusiveSpaces: ['unlisted_penthouse', 'private_showroom', 'rooftop_observatory'],
    lightingProfiles: ['museum_quality', 'architectural_highlighting', 'city_vista_views'],
    materialPalette: ['raw_concrete', 'exotic_woods', 'titanium', 'glass_flooring']
  },
  {
    type: 'entertainment',
    luxuryLevel: 9,
    privacyLevel: 7,
    aesthetic: 'creative industry glamour, backstage luxury',
    exclusiveSpaces: ['executive_screening_room', 'recording_studio', 'green_room'],
    lightingProfiles: ['studio_quality', 'theatrical_spotlight', 'neon_accent'],
    materialPalette: ['acoustic_panels', 'polished_concrete', 'luxury_velvet', 'chrome']
  },
  {
    type: 'nightclub_chain',
    luxuryLevel: 8,
    privacyLevel: 9,
    aesthetic: 'nocturnal luxury, VIP exclusivity',
    exclusiveSpaces: ['owner_office', 'vip_bottle_service', 'hidden_lounge'],
    lightingProfiles: ['club_lighting', 'intimate_booth', 'dramatic_spotlight'],
    materialPalette: ['black_lacquer', 'velvet', 'mirrored_surfaces', 'polished_wood']
  },
  {
    type: 'government',
    luxuryLevel: 8,
    privacyLevel: 10,
    aesthetic: 'powerful bureaucracy, institutional authority',
    exclusiveSpaces: ['minister_chamber', 'classified_archive', 'diplomatic_reception'],
    lightingProfiles: ['dignified_office', 'secure_lighting', 'historical_ambiance'],
    materialPalette: ['mahogany', 'leather', 'brass_fittings', 'wool_carpet']
  },
  {
    type: 'head_of_state',
    luxuryLevel: 10,
    privacyLevel: 10,
    aesthetic: 'national authority, historical significance',
    exclusiveSpaces: ['oval_office_equivalent', 'private_residence', 'secure_bunker'],
    lightingProfiles: ['state_portrait', 'historical_authenticity', 'secure_illumination'],
    materialPalette: ['historical_woods', 'marble', 'silk_drapes', 'gold_leaf']
  }
];