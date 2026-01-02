import type { WardrobeConcept } from '../../types';
import { architecturalLingerieConcepts } from './architecturalLingerie';
import { conceptArtConcepts } from './conceptArt';
import { coutureIntimatesConcepts } from './coutureIntimates';
import { privateGalleryConcepts } from './privateGallery';
import { sensualArtConcepts } from './sensualArt';
import { realCreationsConcepts } from './realCreations';
import { seductressWardrobeConcepts } from './seductressWardrobe';

export const allWardrobeConcepts: WardrobeConcept[] = [
  ...architecturalLingerieConcepts,
  ...coutureIntimatesConcepts,
  ...sensualArtConcepts,
  ...privateGalleryConcepts,
  ...conceptArtConcepts,
  ...realCreationsConcepts,
  ...seductressWardrobeConcepts,
];
