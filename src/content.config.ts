import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const variantSchema = z.object({
  sku: z.string(),
  name: z.string(),
  materialEn: z.string(),
  size: z.string(),
  weight: z.string(),
  tier100: z.string(),
  tier500: z.string(),
  tier2000: z.string(),
  finishesEn: z.string(),
  notes: z.string().optional()
});

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/products' }),
  schema: z.object({
    id: z.string(),
    rowId: z.number(),
    sku: z.string(),
    skuDisplay: z.string(),
    mergedSkus: z.array(z.string()),
    slug: z.string(),
    title: z.string(),
    category: z.string(),
    primaryCollection: z.string(),
    primaryCollectionName: z.string(),
    crossCollections: z.array(z.string()),
    readyMold: z.boolean(),
    enamelCraft: z.boolean(),
    dieCast3d: z.boolean(),
    badge: z.string().optional(),
    material: z.string(),
    process: z.string(),
    size: z.string(),
    weight: z.string(),
    attachmentEn: z.string(),
    platingEn: z.string(),
    tier100: z.string(),
    tier500: z.string(),
    tier2000: z.string(),
    priceRange: z.string(),
    moqNum: z.number(),
    moq: z.string(),
    leadTime: z.string(),
    sampleTime: z.string(),
    toolingFee: z.string(),
    featuredImage: z.string(),
    galleryImages: z.array(z.string()).optional(),
    variants: z.array(variantSchema),
    metaTitle: z.string(),
    metaDescription: z.string(),
    overview: z.string(),
    specs: z.record(z.string()),
    features: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    )
  })
});

const insightsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/insights' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('MedalPinSupply Engineering Team'),
    category: z.string(),
    summary: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    featuredImage: z.string(),
    readTime: z.string().default('9 min read'),
    tags: z.array(z.string()).optional(),
    relatedSkus: z.array(z.string()).optional()
  })
});

export const collections = {
  products: productsCollection,
  insights: insightsCollection
};
