#!/usr/bin/env node
/**
 * scripts/build_catalog_150.cjs
 * Generates all 150 standardized product JSON files in src/content/products/*.json
 * for MedalPinSupply.com (MPS-001 through MPS-150).
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/content/products');
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const old of fs.readdirSync(OUT_DIR)) {
  if (old.endsWith('.json')) fs.unlinkSync(path.join(OUT_DIR, old));
}

const COL_NAMES = {
  'custom-enamel-pins': 'Custom Enamel & Lapel Pins',
  'custom-medals': 'Custom Race Medals & Medallions',
  'custom-challenge-coins': 'Custom Challenge Coins',
  'custom-metal-keychains': 'Custom Metal Keychains',
  'trolley-coin-keyrings': 'European Trolley Coins',
  'police-badges-insignia': 'Police, Security & Military Insignia',
  'executive-cufflinks-tie-bars': 'Executive Cufflinks & Belt Buckles',
  'custom-golf-accessories': 'Custom Golf Divot Tools & Markers',
  'metal-bookmarks-openers-souvenirs': 'Metal Bookmarks, Openers & Souvenirs',
  'patches-pvc-packaging': 'Custom Patches, PVC & Packaging',
  'custom-metal-fridge-magnets': 'Custom Metal Fridge Magnets'
};

// [rowId, sku, slug, title, col, cross[], material, process, size, weight, attach, plating, moqNum, t100, t500, t2000, leadTime, tooling, readyMold, enamelCraft, dieCast3d]
const CATALOG = [
  // C1: Custom Enamel & Lapel Pins (24 SKUs: MPS-001 to MPS-024)
  [1,'MPS-001','custom-hard-enamel-lapel-pins','Custom Hard Enamel Lapel Pins (Cloisonne Finish)','custom-enamel-pins',['executive-cufflinks-tie-bars'],'Stamped Brass / Iron','Kiln-Cured & Flush Stone-Polished Cloisonne Hard Enamel','25.4×25.4×1.5mm','10g','2× Butterfly Clutch / Deluxe Locking Pin','Shiny Gold / Silver / Black Nickel','300','1.45','0.85','0.58','8–12 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [2,'MPS-002','custom-soft-enamel-lapel-pins','Custom Die-Struck Soft Enamel Lapel Pins','custom-enamel-pins',[],'Die-Struck Iron / Brass','Recessed 180°C Baked Pantone Soft Enamel','25×25×1.2mm','8g','Butterfly Clutch / Black Rubber Back','Shiny Nickel / Gold / Black Dyed','300','1.15','0.65','0.42','7–11 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],
  [3,'MPS-003','soft-enamel-pins-epoxy-dome','Custom Soft Enamel Pins with Clear Epoxy Dome','custom-enamel-pins',[],'Die-Struck Iron / Brass','Soft Enamel Fill + Clear Optical Epoxy Lens Dome','28×28×1.8mm','10g','Butterfly Clutch / Safety Pin','Shiny Silver / Gold / Brass','300','1.25','0.72','0.48','8–12 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],
  [4,'MPS-004','photo-etched-brass-enamel-pins','Custom Photo-Etched Brass Enamel Pins','custom-enamel-pins',['metal-bookmarks-openers-souvenirs'],'0.8mm Solid C26000 Brass','Acid Photo-Etching + Soft Enamel + Epoxy Option','30×22×0.8mm','6g','Butterfly Clutch / Rubber Cap','Shiny Gold / Antique Brass / Nickel','300','1.05','0.58','0.38','7–10 Days','$55 Film/Etch (Waived @ 500+)',false,true,false],
  [5,'MPS-005','die-struck-antique-brass-pins','Custom Die-Struck Antique Brass Lapel Pins (No Color)','custom-enamel-pins',['police-badges-insignia'],'Solid Brass / Iron','Sandblasted Recessed + Raised Hand-Buffed Relief','25×25×1.6mm','11g','Tie Tack Clutch / Butterfly Clutch','Antique Brass / Antique Bronze / Silver','300','1.20','0.68','0.45','7–10 Days','$65 Die (Waived @ 500+ pcs)',false,false,false],
  [6,'MPS-006','offset-printed-photo-lapel-pins','Custom Offset Printed Lapel Pins (Full-Color Photo)','custom-enamel-pins',[],'0.8mm Stainless Steel / Brass','4-Color CMYK Litho Offset Printing + Epoxy Dome','30×25×1.5mm','7g','Butterfly Clutch / Safety Bar Pin','Bright Stainless / Gold Trim Edge','300','0.95','0.52','0.34','7–10 Days','$45 Custom Die (Waived @ 500+ pcs)',true,false,false],
  [7,'MPS-007','silk-screen-printed-metal-pins','Custom Silk-Screen Printed Metal Lapel Pins','custom-enamel-pins',[],'Stamped Brass / Stainless Steel','Spot Pantone Silk-Screen Printing + Clear Lacquer','28×20×1.2mm','7g','Butterfly Clutch / Deluxe Locking Cap','Polished Silver / Gold / Black','300','1.10','0.62','0.40','7–10 Days','$55 Setup (Waived @ 500+ pcs)',false,false,false],
  [8,'MPS-008','3d-zinc-alloy-die-cast-pins','Custom 3D Zinc Alloy Die-Cast Lapel Pins','custom-enamel-pins',['police-badges-insignia'],'Zamak #3 Zinc Alloy','3D Multi-Level CNC Mold Die-Casting + Cut-Outs','35×30×2.8mm','16g','2× Dual Clutch Posts (Anti-Spin)','Antique Silver / Antique Gold / Pewter','300','1.55','0.92','0.62','10–14 Days','$95 3D Mold (Waived @ 1,000+)',false,false,true],
  [9,'MPS-009','3d-pewter-lapel-pins','Custom 3D Spin-Cast Pewter Lapel Pins','custom-enamel-pins',[],'Lead-Free Fine Pewter Alloy','Centrifugal Silicone Spin-Casting + Deep Relief','32×28×3.0mm','19g','Dual Clutch Pins / Safety Catch','Hand-Antiqued Pewter / Oxidized Silver','300','1.75','1.05','0.72','10–14 Days','$95 Master Mold (Waived @ 1k)',false,false,true],
  [10,'MPS-010','custom-glitter-enamel-pins','Custom Glitter Enamel Lapel Pins','custom-enamel-pins',[],'Die-Struck Iron / Zinc Alloy','Recessed Soft Enamel Infused with Metallic Glitter','35×35×1.6mm','13g','Dual Rubber Clutches','Shiny Gold / Rose Gold / Black Nickel','300','1.35','0.78','0.52','8–12 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [11,'MPS-011','glow-in-the-dark-enamel-pins','Custom Glow-in-the-Dark Enamel Pins','custom-enamel-pins',[],'Die-Struck Iron / Zinc Alloy','Phosphorescent Luminous Enamel Pigment Fill','35×32×1.6mm','12g','2× Black Rubber Clutches','Black Nickel / Gunmetal / Chrome','300','1.40','0.82','0.55','9–12 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [12,'MPS-012','custom-spinner-enamel-pins','Custom Spinner Interactive Enamel Pins','custom-enamel-pins',[],'2-Layer Zinc Alloy + Brass Rivet','360° Riveted Spinning Center Wheel + Enamel','45×45×3.5mm','28g','2× Locking Clutch Backs','Shiny Gold / Black Nickel / Antique Bronze','300','2.20','1.35','0.95','12–15 Days','$125 Dual-Mold (Waived @ 1,000+)',false,true,true],
  [13,'MPS-013','custom-slider-enamel-pins','Custom Sliding Mechanism Enamel Pins','custom-enamel-pins',[],'2-Piece Track Zinc Alloy','Linear Sliding Slot Track + Hard/Soft Enamel','45×30×3.6mm','26g','2× Heavy Military Clutches','Gold / Black Nickel / Satin Silver','300','2.35','1.45','1.02','12–15 Days','$135 Track Mold (Waived @ 1,000+)',false,true,true],
  [14,'MPS-014','hinged-dangle-enamel-pins','Custom Hinged & Dangle Chain Enamel Pins','custom-enamel-pins',[],'Zinc Alloy / Brass + Jump Rings','2-Part Hinged Window or Suspended Dangle Charm','42×35×2.5mm','21g','2× Butterfly / Locking Clutches','Shiny Gold / Rose Gold / Nickel','300','2.10','1.28','0.88','10–14 Days','$110 Dual-Die (Waived @ 1,000+)',false,true,true],
  [15,'MPS-015','stained-glass-translucent-enamel-pins','Custom Translucent Stained-Glass Enamel Pins','custom-enamel-pins',[],'Cut-Out Brass / Zinc Alloy','Open-Back Window Cut-Out + Translucent Resin','38×32×2.0mm','14g','2× Rubber or Locking Clutches','Bright Gold / Black Nickel / Copper','300','1.65','0.98','0.68','10–14 Days','$85 Cut-Out Die (Waived @ 500+)',false,true,false],
  [16,'MPS-016','black-nickel-enamel-lapel-pins','Custom Black-Nickel Dyed Metal Enamel Pins','custom-enamel-pins',[],'Die-Struck Iron / Brass','Black Nickel Electroplating or Black-Dyed Finish','30×30×1.5mm','11g','2× Black PVC Clutches','Mirror Black Nickel / Matte Black','300','1.30','0.75','0.49','8–12 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],
  [17,'MPS-017','rainbow-plated-enamel-pins','Custom Rainbow Anodized Plating Enamel Pins','custom-enamel-pins',[],'Stamped Brass / Zinc Alloy','Vacuum PVD Iridescent Rainbow Plating + Hard Enamel','32×30×1.6mm','12g','2× Rubber Clutches','PVD Iridescent Rainbow Finish','300','1.65','0.98','0.66','10–14 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [18,'MPS-018','magnetic-back-lapel-pins','Custom Magnetic-Back Lapel Pins (No-Hole Clothing Safe)','custom-enamel-pins',['police-badges-insignia'],'Stamped Iron / Brass + NdFeB Magnet','Hard/Soft Enamel + Dual-Magnet Clothing-Safe Clasp','25×20×1.5mm','14g','2-Magnet Neodymium Bar Clasp (No Pins)','Shiny Gold / Chrome / Black Nickel','300','1.60','0.95','0.65','8–12 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],
  [19,'MPS-019','years-of-service-award-pins','Custom Corporate Years-of-Service Award Pins','custom-enamel-pins',['executive-cufflinks-tie-bars'],'Solid Die-Struck Brass + Zirconia','Flush Hard Enamel + Hand-Set Genuine/CZ Stone','22×18×1.6mm','8g','Jewelry Tie Tack Clutch + Velvet Box Opt.','18K Gold / Rhodium Silver / Dual-Plate','300','1.50','0.88','0.58','8–12 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [20,'MPS-020','custom-baseball-trading-pins','Custom Baseball & Youth Sports Trading Pins','custom-enamel-pins',['custom-medals'],'Die-Struck Iron / Zinc Alloy','Oversized Soft Enamel + Glitter / Spinner / Dangle','45×40×1.8mm','22g','2× Rubber Clutches + Polybag','Shiny Gold / Silver / Black Dyed','300','1.65','0.95','0.65','8–12 Days','$75 Die (Waived @ 500+ pcs)',false,true,false],
  [21,'MPS-021','crossed-friendship-flag-pins','Custom Crossed Friendship Flag Lapel Pins','custom-enamel-pins',[],'Die-Struck Brass / Iron','Dual Crossed National/State Flags + Epoxy Dome','25×19×1.2mm','7g','Butterfly Clutch Back','Shiny Gold Edge Trim','300','0.95','0.52','0.35','7–10 Days','$55 Custom Die (Waived @ 500+ pcs)',true,true,false],
  [22,'MPS-022','waving-national-flag-pins','Custom Waving National & State Flag Pins','custom-enamel-pins',[],'Die-Struck Brass / Iron','3D Waving Flag Silhouette + Enamel + Clear Epoxy','22×16×1.2mm','6g','Butterfly Clutch / Safety Pin','Shiny Gold / Nickel Frame','300','0.85','0.45','0.30','7–10 Days','$55 Custom Die (Waived @ 500+ pcs)',true,true,false],
  [23,'MPS-023','custom-tinplate-button-badges','Custom Tinplate Button Badges (Pinback)','custom-enamel-pins',[],'0.25mm Coated Tinplate Steel','CMYK Digital/Offset Print + Glossy or Matte Mylar','Ø32mm / Ø44mm / Ø58mm','9g','Safety Metal Pinback / Fridge Magnet','Bright Tinplate Rim + Custom Film','300','0.45','0.22','0.14','5–8 Days','$35 Print Plate Setup (Waived @ 500+)',true,false,false],
  [24,'MPS-024','enamel-collar-hat-pins','Custom Enamel Collar Pins & Hat Lapel Tacks','custom-enamel-pins',['police-badges-insignia'],'Stamped Brass / Iron','Hard Enamel + Heavy-Duty Locking Pin Post','20×20×1.5mm','9g','Deluxe Locking Clutch / Tie Tack Chain','Shiny Gold / Silver / Antique Brass','300','1.40','0.82','0.54','8–12 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],

  // C2: Custom Race Medals & Medallions (20 SKUs: MPS-025 to MPS-044)
  [25,'MPS-025','custom-3d-marathon-finisher-medals','Custom 3D Die-Cast Marathon Finisher Medals','custom-medals',[],'Heavy Zamak #3 Zinc Alloy','Deep 3D Sculpted CNC Relief + Soft Enamel','Ø85×4.0mm (3.35")','125g','25×850mm Full-Color Sublimated Ribbon','Antique Gold / Silver / Bronze / Satin','300','2.85','1.85','1.35','10–14 Days','$120 3D Mold (Waived @ 1,000+)',false,true,true],
  [26,'MPS-026','custom-5k-10k-running-medals','Custom Soft Enamel 5K & 10K Running Medals','custom-medals',[],'Zamak #3 Zinc Alloy','2D Multi-Level Die-Casting + Pantone Soft Enamel','Ø70×3.2mm (2.75")','82g','25×850mm Custom Sublimated Neck Ribbon','Shiny Gold / Nickel / Antique Bronze','300','2.25','1.45','1.05','10–13 Days','$95 Mold (Waived @ 1,000+ pcs)',false,true,false],
  [27,'MPS-027','custom-spinner-race-medals','Custom Rotating Spinner Race Medals','custom-medals',[],'2-Piece Zamak #3 Zinc Alloy','360° Bearing/Pin Spinning Center Medallion','Ø80×4.5mm (3.15")','132g','38×850mm Wide Sublimated Ribbon','Two-Tone Gold & Antique Silver','300','3.40','2.25','1.65','12–15 Days','$140 Spinner Mold (Waived @ 1k)',false,true,true],
  [28,'MPS-028','cut-out-hollow-sports-medals','Custom Cut-Out Hollow Zinc Alloy Sports Medals','custom-medals',[],'Die-Cast Zamak #3 Zinc Alloy','Multi-Window Hollow Cut-Outs + 3D Relief','Ø76×3.8mm (3.0")','96g','25×850mm V-Stitched Satin Ribbon','Antique Bronze / Matte Black / Gold','300','2.65','1.72','1.25','10–14 Days','$120 Cut-Out Mold (Waived @ 1k)',false,true,true],
  [29,'MPS-029','bottle-opener-finisher-medals','Custom Bottle Opener Finisher Medals','custom-medals',['metal-bookmarks-openers-souvenirs'],'Reinforced 4mm Zinc Alloy','High-Strength Cast Pry Tab + Soft Enamel Logo','Ø80×4.0mm (3.15")','115g','25×850mm Sublimated Brewery/Race Ribbon','Antique Copper / Gunmetal / Gold','300','2.95','1.92','1.38','10–14 Days','$110 Mold (Waived @ 1,000+ pcs)',false,true,true],
  [30,'MPS-030','magnetic-interlocking-race-medals','Custom Magnetic Interlocking Race Series Medals','custom-medals',[],'Zinc Alloy + N45 NdFeB Magnets','2-to-4 Piece Puzzle Series with Alignment Magnets','Ø75×4.0mm per piece','105g','25×850mm Matching Series Ribbon','Gold / Silver / Copper / Black Nickel','300','3.20','2.15','1.58','12–16 Days','$135 Series Mold (Waived @ 1k)',false,true,true],
  [31,'MPS-031','stained-glass-enamel-medals','Custom Translucent Stained-Glass Enamel Medals','custom-medals',[],'Cut-Out Zinc Alloy + Resin','Open-Back Translucent Stained-Glass Enamel Fill','Ø76×3.8mm (3.0")','98g','38×850mm Sublimated Neck Ribbon','Shiny Gold / Antique Gold / Black','300','3.10','2.05','1.48','12–15 Days','$120 Cut-Out Mold (Waived @ 1k)',false,true,true],
  [32,'MPS-032','glow-in-the-dark-night-run-medals','Custom Glow-in-the-Dark Night Run Medals','custom-medals',[],'Die-Cast Zinc Alloy','Long-Afterglow Luminous Phosphorescent Enamel','Ø75×3.5mm (3.0")','95g','25×850mm Neon/Reflective Ribbon','Matte Black / Black Nickel / Chrome','300','2.60','1.68','1.22','10–14 Days','$105 Mold (Waived @ 1,000+ pcs)',false,true,true],
  [33,'MPS-033','custom-triathlon-cycling-medals','Custom Triathlon & Cycling Heavyweight Medals','custom-medals',[],'Extra-Heavy Zinc Alloy','Oversized 3.5"–4.5" 5mm Deep 3D Relief + Cut-Out','Ø100×5.0mm (4.0")','178g','38×900mm Heavy Sublimated Ribbon','Antique Pewter / Gold / Dual-Plate','300','3.50','2.35','1.75','12–15 Days','$145 Heavy Mold (Waived @ 1,000+)',false,true,true],
  [34,'MPS-034','gold-silver-bronze-award-medals','Custom Gold Silver Bronze Antique Award Medals','custom-medals',[],'Die-Cast Zinc Alloy','Shared Mold 1st/2nd/3rd Place Plating Split','Ø65×3.0mm (2.5")','68g','25×850mm Color-Coded Satin Ribbon','1st Gold / 2nd Silver / 3rd Bronze','300','2.15','1.38','0.98','9–12 Days','$95 Shared Mold (3 Finishes Included)',false,true,false],
  [35,'MPS-035','die-struck-brass-academic-medals','Custom Die-Struck Brass Academic & Graduation Medals','custom-medals',[],'Solid C26000 Brass','Hydraulic High-Tonnage 2D/3D Coin Stamping','Ø57×3.2mm (2.25")','78g','38mm Heavy Woven Academic Ribbon + Jump Ring','Antique Brass / 24K Gold / Satin Silver','300','2.90','1.95','1.42','10–14 Days','$110 Brass Die (Waived @ 1,000+)',false,false,false],
  [36,'MPS-036','custom-martial-arts-bjj-medals','Custom Martial Arts, Karate & Jiu-Jitsu Medals','custom-medals',[],'4mm Heavy Zinc Alloy','Deep Sculpted 3D Crest + Heavy Textured Border','Ø76×4.0mm (3.0")','118g','38×880mm Martial Arts Woven Ribbon','Antique Gold / Silver / Bronze','300','2.55','1.65','1.18','10–14 Days','$110 3D Mold (Waived @ 1,000+)',false,true,true],
  [37,'MPS-037','youth-sports-tournament-medals','Custom Youth Soccer, Baseball & Basketball Medals','custom-medals',[],'Die-Cast Zinc Alloy','High-Volume 2"–2.5" Tournament Soft Enamel','Ø55×2.8mm (2.2")','54g','22×800mm Stock or Custom Printed Ribbon','Shiny Gold / Silver / Bronze','300','1.85','1.15','0.82','8–11 Days','$85 Mold (Waived @ 500+ pcs)',false,true,false],
  [38,'MPS-038','military-drape-ribbon-medals','Custom Military & Veteran Drape Ribbon Medals','custom-medals',['police-badges-insignia'],'Die-Struck Solid Brass','Two-Sided Coin Strike + Top Pin-Bar Drape Ribbon','Ø45×3.2mm (1.75")','52g','35mm Striped Grosgrain Drape + Clutch Bar','Sandblasted Antique Gold / Bronze','300','3.25','2.15','1.55','12–15 Days','$115 Brass Die (Waived @ 1,000+)',false,false,false],
  [39,'MPS-039','glitter-uv-printed-medals','Custom Glitter & UV-Printed Full-Color Medals','custom-medals',[],'Die-Cast Zinc Alloy','Recessed Glitter Enamel + Flatbed Full-Color UV','Ø75×3.2mm (3.0")','92g','25×850mm Full-Color Sublimated Ribbon','Shiny Silver / Gold / Black Nickel','300','2.45','1.58','1.12','10–14 Days','$95 Mold (Waived @ 1,000+ pcs)',false,true,false],
  [40,'MPS-040','sliding-charm-race-medals','Custom Sliding-Charm Interactive Race Medals','custom-medals',[],'2-Piece Zinc Alloy','Milled Curved Rail Track + Sliding Runner/Bike','Ø85×4.5mm (3.35")','138g','38×850mm Sublimated Neck Ribbon','Antique Gold / Two-Tone Silver','300','3.65','2.45','1.82','12–16 Days','$145 Track Mold (Waived @ 1,000+)',false,true,true],
  [41,'MPS-041','dual-plated-luxury-medallions','Custom Dual-Plated Two-Tone Luxury Medallions','custom-medals',[],'Heavy Zinc Alloy / Brass','Hand-Masked Dual Electroplating (Gold + Black/Silver)','Ø80×4.0mm (3.15")','128g','38mm Heavy Satin Ribbon + Velvet Box Opt.','24K Gold + Antique Silver / Black Nickel','300','3.35','2.20','1.62','12–15 Days','$125 Dual-Tone Mold (Waived @ 1k)',false,true,true],
  [42,'MPS-042','virtual-race-mail-ready-medals','Custom Virtual Race Mail-Ready Medals','custom-medals',[],'Lightweight 2.8mm Zinc Alloy','Weight-Optimized 3.0" Profile for Flat Mailers','Ø75×2.8mm (3.0")','72g','25×800mm Flat-Fold Ribbon + Polybag','Shiny Silver / Antique Gold / Rose Gold','300','2.10','1.35','0.95','9–12 Days','$95 Mold (Waived @ 1,000+ pcs)',false,true,false],
  [43,'MPS-043','led-light-up-event-medals','Custom Acrylic-Insert & LED Light-Up Medals','custom-medals',[],'Zinc Alloy + Acrylic + LED','Hollow Zinc Bezel + Etched Acrylic + Multi-Mode LED','Ø82×6.5mm','110g','25×850mm Glowing / Sublimated Ribbon','Matte Black / Chrome / Satin Gold','300','3.85','2.65','1.98','14–18 Days','$145 Bezel Mold (Waived @ 1,000+)',false,false,true],
  [44,'MPS-044','custom-sublimated-medal-ribbons','Custom Full-Color Dye-Sublimated Medal Ribbons','custom-medals',['patches-pvc-packaging'],'100% High-Density Polyester Satin','Double-Sided Edge-to-Edge CMYK Sublimation','25mm / 38mm × 850mm','18g','V-Stitched Bottom + Heavy Jump Ring / Snap Hook','Full Pantone / CMYK Dye-Sublimated','300','0.65','0.38','0.24','5–8 Days','$35 Sublimation Setup (Waived @ 500+)',true,false,false],

  // C3: Custom Challenge Coins (16 SKUs: MPS-045 to MPS-060)
  [45,'MPS-045','military-3d-brass-challenge-coins','Custom Military 3D Die-Struck Brass Challenge Coins','custom-challenge-coins',['police-badges-insignia'],'Solid C26000 Brass','High-Pressure Double-Sided 3D Brass Stamping','Ø44.5×3.2mm (1.75")','42g','Individual Thick PVC Protective Pouch','Antique Brass / Gold / Dual-Plated','50','3.10','1.95','1.45','10–14 Days','$120 Double-Sided Die (Waived @ 1k)',false,true,true],
  [46,'MPS-046','police-hard-enamel-challenge-coins','Custom Hard Enamel Law Enforcement Challenge Coins','custom-challenge-coins',['police-badges-insignia'],'Solid Brass / Zinc Alloy','Flush Stone-Polished Hard Enamel Crest + Reeded Edge','Ø44.5×3.5mm (1.75")','45g','PVC Sleeve / Acrylic Coin Capsule Opt.','24K Gold / Polished Silver / Black Nickel','50','3.25','2.10','1.55','10–14 Days','$115 Die (Waived @ 1,000+ pcs)',false,true,false],
  [47,'MPS-047','firefighter-ems-challenge-coins','Custom Soft Enamel Firefighter & EMS Challenge Coins','custom-challenge-coins',['police-badges-insignia'],'Die-Cast Zinc Alloy / Brass','Maltese Cross or Round Shape + Recessed Soft Enamel','Ø50.8×3.5mm (2.0")','54g','Heavy PVC Pouch / Velvet Box Opt.','Antique Silver / Antique Gold / Brass','50','2.65','1.68','1.22','10–13 Days','$95 Mold (Waived @ 1,000+ pcs)',false,true,true],
  [48,'MPS-048','dual-plated-challenge-coins','Custom Dual-Plated Gold & Silver Challenge Coins','custom-challenge-coins',[],'Solid Brass / Zinc Alloy','Hand-Masked Two-Tone Dual Electroplating','Ø44.5×3.5mm (1.75")','46g','PVC Pouch / Clear Acrylic Capsule','Antique Silver + Shiny Gold Masking','50','3.65','2.35','1.75','12–15 Days','$120 Dual-Tone Die (Waived @ 1k)',false,true,true],
  [49,'MPS-049','antique-bronze-commemorative-coins','Custom Antique Bronze & Copper Commemorative Coins','custom-challenge-coins',[],'Brass / High-Density Zinc','Deep 3D Relief Sculpting + Hand-Brushed Patina','Ø44.5×3.5mm (1.75")','48g','PVC Pouch / Velvet Case Opt.','Antique Bronze / Antique Copper / Silver','50','2.55','1.62','1.18','9–12 Days','$95 Mold (Waived @ 1,000+ pcs)',false,false,true],
  [50,'MPS-050','bottle-opener-challenge-coins','Custom Bottle Opener Challenge Coins','custom-challenge-coins',['metal-bookmarks-openers-souvenirs'],'Reinforced 4mm Zinc Alloy','Double-Sided Coin Relief + Integrated Opener Slot','Ø54×4.0mm (2.15")','64g','PVC Pouch / Custom Backing Card','Antique Silver / Copper / Black Nickel','100','2.95','1.88','1.35','10–14 Days','$110 Mold (Waived @ 1,000+ pcs)',false,true,true],
  [51,'MPS-051','custom-shape-shield-challenge-coins','Custom Cut-Out Shape & Shield Challenge Coins','custom-challenge-coins',['police-badges-insignia'],'Zamak #3 Zinc Alloy','Custom Die-Cut Perimeter (Shield, Skull, Aircraft, Star)','50×45×3.5mm','52g','PVC Sleeve / Velvet Display Box','Antique Gold / Gunmetal / Satin Silver','50','2.90','1.85','1.32','10–14 Days','$115 Custom Shape Mold (Waived @ 1k)',false,true,true],
  [52,'MPS-052','diamond-cut-rope-edge-coins','Custom Diamond-Cut & Rope-Edge Challenge Coins','custom-challenge-coins',[],'Solid C26000 Brass','CNC Diamond-Cut Oblique, Wave, Spur or Rope Edge','Ø50.8×3.5mm (2.0")','56g','Acrylic Capsule / PVC Sleeve','Shiny Gold / Silver / Dual-Plated','50','3.35','2.15','1.58','11–14 Days','$125 Die + Edge Setup (Waived @ 1k)',false,true,true],
  [53,'MPS-053','spinner-center-challenge-coins','Custom Spinner Center Challenge Coins','custom-challenge-coins',[],'2-Piece Brass / Zinc Alloy','Concentric 360° Rotating Inner Medallion Inside Ring','Ø50.8×4.5mm (2.0")','62g','Acrylic Display Capsule / Velvet Box','Antique Gold / Black Nickel / Chrome','100','3.85','2.55','1.88','12–16 Days','$140 Dual-Mold (Waived @ 1,000+)',false,true,true],
  [54,'MPS-054','sequential-numbered-challenge-coins','Custom Sequential Laser-Numbered Edition Coins','custom-challenge-coins',[],'Solid Brass / Zinc Alloy','Galvo Fiber Laser Edge or Face Serialization (001/500)','Ø44.5×3.5mm (1.75")','45g','Clear Acrylic Capsule + Velvet Box Opt.','Antique Gold / Silver / Bronze','50','3.15','2.05','1.48','10–14 Days','$110 Die (Waived @ 1,000+ pcs)',false,true,true],
  [55,'MPS-055','corporate-anniversary-coins','Custom Corporate Milestone & Anniversary Coins','custom-challenge-coins',['executive-cufflinks-tie-bars'],'Solid Brass / Zinc Alloy','Mirror-Proof Dual Finish + Hard Enamel + Velvet Box','Ø44.5×3.5mm (1.75")','46g','Included Flocked Velvet Gift Box','Mirror Gold / Rhodium Silver / Dual-Tone','50','3.45','2.25','1.65','10–14 Days','$115 Die (Waived @ 1,000+ pcs)',false,true,false],
  [56,'MPS-056','uv-printed-photo-challenge-coins','Custom UV-Printed Full-Color Photo Challenge Coins','custom-challenge-coins',[],'Stamped Brass / Zinc Alloy','Flatbed High-Res UV Photo Print + Clear Epoxy Dome','Ø44.5×3.0mm (1.75")','40g','PVC Pouch / Acrylic Capsule','Shiny Gold / Silver / Reeded Rim','50','2.75','1.75','1.25','8–12 Days','$85 Custom Coin Die (Waived @ 1,000+)',true,false,false],
  [57,'MPS-057','translucent-glow-challenge-coins','Custom Glow-in-the-Dark & Translucent Enamel Coins','custom-challenge-coins',[],'Die-Cast Zinc / Brass','Textured Diamond Background + Translucent / Luminous Ink','Ø50.8×3.5mm (2.0")','50g','PVC Sleeve / Velvet Box Opt.','Black Nickel / Antique Silver / Gold','100','3.10','1.98','1.45','11–14 Days','$110 Die (Waived @ 1,000+ pcs)',false,true,true],
  [58,'MPS-058','24k-gold-plated-proof-coins','Custom 24K Gold-Plated Proof Collector Coins','custom-challenge-coins',['executive-cufflinks-tie-bars'],'Solid Mint Brass','Real 24K Gold Flash Plating + Frosted Relief + Capsule','Ø40×3.0mm (1.57")','36g','40mm Snap Acrylic Capsule Included','Real 24K Mirror Proof Gold','50','4.50','3.10','2.35','12–15 Days','$125 Mint Die (Waived @ 1,000+)',false,false,true],
  [59,'MPS-059','custom-sobriety-recovery-coins','Custom Sobriety & Recovery AA Medallion Coins','custom-challenge-coins',[],'Antique Bronze / Brass','Tri-Plate or Antique Bronze Milestone Tokens (1–50 Yrs)','Ø34×2.5mm (1.34")','22g','Individual Polybag / PVC Sleeve','Antique Bronze / Tri-Plate Gold & Black','100','2.20','1.35','0.95','8–12 Days','$75 Center Coin Die (Waived @ 500+)',true,true,false],
  [60,'MPS-060','masonic-fraternal-lodge-coins','Custom Masonic, Fraternal & Lodge Challenge Coins','custom-challenge-coins',[],'Heavy Solid Brass / Zinc','2-Sided Masonic Crest Die Strike + Hard Enamel','Ø44.5×3.5mm (1.75")','46g','PVC Pouch / Velvet Display Box','24K Gold + Royal Blue Cloisonne','50','2.95','1.88','1.35','10–14 Days','$110 Die (Waived @ 1,000+ pcs)',false,true,true],

  // C4: Custom Metal Keychains & Keyrings (20 SKUs: MPS-061 to MPS-080)
  [61,'MPS-061','3d-zinc-alloy-keychains','Custom 3D Zinc Alloy Die-Cast Keychains','custom-metal-keychains',[],'Zamak #3 Zinc Alloy','3D Sculpted Multi-Level Die-Casting + Cut-Out','48×35×4.0mm','38g','30mm Heavy Split Ring + Swivel Chain','Antique Silver / Gold / Gunmetal / Chrome','100','1.65','0.98','0.68','9–12 Days','$95 3D Mold (Waived @ 1,000+)',false,false,true],
  [62,'MPS-062','custom-soft-enamel-keychains','Custom Soft Enamel Metal Keychains','custom-metal-keychains',[],'Die-Struck Iron / Zinc Alloy','Recessed Pantone Soft Enamel + Raised Borders','45×30×2.2mm','26g','28mm Split Ring + 3-Link Chain','Shiny Nickel / Gold / Black Dyed','100','1.45','0.85','0.58','8–11 Days','$65 Mold (Waived @ 500+ pcs)',false,true,false],
  [63,'MPS-063','hard-enamel-luxury-keychains','Custom Hard Enamel (Pro-Enameled) Luxury Keychains','custom-metal-keychains',[],'Stamped Brass / Zinc Alloy','Flush Stone-Polished Hard Enamel + Mirror Plating','42×28×2.5mm','28g','30mm Flat Polished Split Ring','Mirror Chrome / 18K Gold / Rose Gold','100','1.75','1.05','0.74','9–12 Days','$75 Die (Waived @ 500+ pcs)',false,true,false],
  [64,'MPS-064','photo-etched-enamel-keychains','Custom Photo-Etched Brass Enamel Keychains','custom-metal-keychains',[],'1.5mm Brass / Iron','Fine-Line Acid Photo-Etching + Enamel + Clear Epoxy','45×25×1.8mm','20g','28mm Split Ring + Jump Ring','Shiny Gold / Silver / Antique Brass','100','1.35','0.78','0.52','8–11 Days','$60 Film/Etch (Waived @ 500+)',false,true,false],
  [65,'MPS-065','rotating-spinner-metal-keychains','Custom Rotating Spinner Metal Keychains','custom-metal-keychains',[],'2-Part Zinc Alloy','360° Double-Sided Spinning Inner Core Inside Frame','Ø42×4.2mm','42g','30mm Heavy Split Ring','Shiny Chrome / Gunmetal / Gold','100','2.10','1.28','0.88','10–14 Days','$120 Dual-Mold (Waived @ 1,000+)',false,true,true],
  [66,'MPS-066','leather-metal-emblem-keychains','Custom Genuine Leather & Metal Emblem Keychains','custom-metal-keychains',['executive-cufflinks-tie-bars'],'Top-Grain Cowhide / PU + Zinc','Stitched Leather Fob + Recessed Metal Crest Emblem','78×30×5.0mm','32g','30mm Chrome Split Ring / Swivel Hook','Chrome / Gunmetal + Black/Brown Leather','100','1.85','1.15','0.78','9–12 Days','$65 Emblem Die (Waived @ 500+ pcs)',true,true,false],
  [67,'MPS-067','nail-clipper-metal-keychains','Custom Metal Keychains with Nail Clipper','custom-metal-keychains',[],'Hardened 420 Stainless + Zinc','Folding Nail Clipper + Custom Enamel Emblem Badge','58×14×9.0mm','35g','Integrated Ball Chain / Split Keyring','Brushed Chrome / Matte Black / Gold','200','1.75','1.08','0.75','9–12 Days','$55 Emblem Die (Waived @ 500+ pcs)',true,true,false],
  [68,'MPS-068','die-struck-brass-keychains','Custom Die-Struck Solid Brass Keychains','custom-metal-keychains',[],'2.5mm Solid C26000 Brass','Heavy Stamped Solid Brass + Deep Engraved Texture','50×28×2.5mm','34g','30mm Brass Split Ring / Screw Lock','Antique Brass / Satin Brushed Brass','100','1.80','1.12','0.76','8–12 Days','$75 Brass Die (Waived @ 500+ pcs)',false,false,false],
  [69,'MPS-069','offset-printed-epoxy-keychains','Custom Offset Printed Epoxy-Dome Keychains','custom-metal-keychains',[],'Stamped Zinc / Brass Base','CMYK Full-Color Offset Print + Clear Epoxy Dome','45×28×2.2mm','24g','28mm Chrome Split Ring + Chain','Polished Chrome / Gold Base','100','1.25','0.72','0.48','7–10 Days','$60 Blanking Die (Waived @ 500+ pcs)',true,false,false],
  [70,'MPS-070','antique-vintage-metal-keychains','Custom Antique Vintage Brass & Pewter Keychains','custom-metal-keychains',[],'Zinc Alloy / Brass','Aged Hand-Brushed Patina Relief + Recessed Detail','48×30×3.2mm','36g','30mm Antique Bronze Split Ring','Antique Bronze / Pewter / Copper','100','1.60','0.95','0.65','9–12 Days','$85 Mold (Waived @ 1,000+ pcs)',false,false,true],
  [71,'MPS-071','custom-acrylic-keychains','Custom Clear Acrylic Keychains with Metal Ring','custom-metal-keychains',[],'3.5mm Optical Cast Acrylic','Double-Sided UV Printed Graphic + Laser Cut Shape','50×45×3.5mm','18g','28mm Nickel Split Ring / Star Clasp','Clear Transparent + Full-Color Print','100','0.95','0.52','0.34','5–8 Days','$45 Cutting Fixture (Waived @ 500+)',true,false,false],
  [72,'MPS-072','bottle-opener-metal-keychains','Custom Bottle Opener Metal Keychains','custom-metal-keychains',['metal-bookmarks-openers-souvenirs'],'Zinc Alloy / Anodized Aluminum','Functional Cap-Lifter Keyring + Laser or Enamel Logo','65×28×3.5mm','32g','28mm Tempered Split Ring','Anodized Black/Blue/Red or Chrome','100','1.35','0.78','0.52','7–10 Days','$65 Opener Die (Waived @ 500+ pcs)',true,true,false],
  [73,'MPS-073','car-dealership-metal-keychains','Custom Auto Dealership & Car Brand Metal Keychains','custom-metal-keychains',['executive-cufflinks-tie-bars'],'Chrome Zamak #3 Zinc Alloy','Auto Rim / Key Profile + Laser or Enamel Logo','62×30×4.0mm','40g','32mm Heavy Split Ring / Velvet Pouch','Mirror Chrome / Satin Nickel / Black','100','1.55','0.92','0.62','7–11 Days','$75 Emblem Mold (Waived @ 1,000+)',true,true,true],
  [74,'MPS-074','laser-engraved-stainless-keychains','Custom Laser-Engraved Stainless Steel Keychains','custom-metal-keychains',[],'2.0mm 304 Stainless Steel','Permanent 50W Fiber Laser Logo + Brushed Finish','50×28×2.0mm','28g','28mm Stainless Split Keyring','Brushed Silver / Matte Black PVD','100','1.20','0.68','0.44','6–9 Days','$45 Laser Fixture (Waived @ 500+ pcs)',true,false,false],
  [75,'MPS-075','aluminum-carabiner-keychains','Custom Anodized Aluminum Carabiner Climb-Loops','custom-metal-keychains',[],'6063 Anodized Aluminum Alloy','D-Shape Spring-Gate Carabiner + Crisp White Laser','58×30×5.0mm','16g','24mm Chrome Split Ring Attached','Anodized Blue / Red / Black / Silver / Green','200','0.85','0.45','0.29','5–8 Days','$45 Laser Setup (Waived @ 500+ pcs)',true,false,false],
  [76,'MPS-076','carabiner-strap-metal-keychains','Custom Carabiner Strap Keychains with Metal Emblem','custom-metal-keychains',[],'Aluminum Clip + Nylon/Leather + Zinc','Carabiner Clip + Woven Webbing Strap + Stamped Plate','110×25×6.0mm','30g','30mm Split Ring + Heavy Lobster Clip','Matte Black / Satin Silver + Pantone Strap','200','1.35','0.78','0.52','8–11 Days','$55 Plate Die (Waived @ 500+ pcs)',true,true,false],
  [77,'MPS-077','custom-flat-split-keyrings','Custom Flat Split Keyrings & Custom-Stamped Rings','custom-metal-keychains',[],'1.8mm Spring Steel / Brass','Flat Profile Rim Stamped or Laser-Etched with URL','Ø28mm / Ø32mm × 2.5mm','12g','Standalone Heavy Flat Split Ring','Shiny Nickel / Brass / Matte Black','500','0.45','0.24','0.16','8–12 Days','$55 Custom Rim Stamp (Waived @ 1,000+)',true,false,false],
  [78,'MPS-078','hotel-brass-room-key-tags','Custom Boutique Hotel & Resort Brass Room Key Tags','custom-metal-keychains',[],'2.0mm Solid C26000 Brass','Diamond/Oval Vintage Stamped Brass + Room Numbers','90×45×2.0mm','38g','Heavy Brass Split Ring / Ball Chain','Antique Brass / Satin Brushed Brass','100','2.25','1.42','0.98','8–12 Days','$65 Custom Brass Die (Waived @ 500+)',true,false,false],
  [79,'MPS-079','3d-souvenir-city-keychains','Custom Double-Sided 3D Souvenir City Keychains','custom-metal-keychains',['metal-bookmarks-openers-souvenirs'],'Zamak #3 Zinc Alloy','Two-Sided 3D Tourist Landmark Relief + Enamel','55×32×4.2mm','44g','28mm Split Ring + Custom Tourist Card','Antique Bronze / Pewter / Shiny Gold','200','1.55','0.92','0.64','10–14 Days','$110 Two-Sided 3D Mold',false,true,true],
  [80,'MPS-080','matte-black-minimalist-keychains','Custom Matte Black-Plated Minimalist Keychains','custom-metal-keychains',[],'Zinc Alloy / Stainless Steel','Matte Black Electrophoretic Coat + Precision Laser','52×22×3.2mm','34g','Gunmetal Wire-Lock or Flat Split Ring','Matte Tactical Black / Gunmetal','100','1.65','0.98','0.66','7–10 Days','$75 Custom Matte Die (Waived @ 500+)',true,false,false],

  // C5: European Trolley Coins & Supermarket Tokens (10 SKUs: MPS-081 to MPS-090)
  [81,'MPS-081','1-euro-trolley-coin-keyrings','Custom 1 Euro Size Trolley Coin Keyrings (23.25mm)','trolley-coin-keyrings',['custom-metal-keychains'],'Die-Struck Iron / Brass','Exact €1 Mint Diameter (23.25×2.33mm) + Lobster Clip','Ø23.25×2.33mm','14g','Zinc Lobster Clasp + 24mm Split Ring','Bright Nickel / Antique Bronze / Gold','200','1.10','0.58','0.36','7–10 Days','$55 Coin Stamping Die (Waived @ 500+)',true,true,false],
  [82,'MPS-082','1-pound-uk-trolley-coin-keyrings','Custom New 12-Sided £1 UK Pound Trolley Coin Keyrings','trolley-coin-keyrings',['custom-metal-keychains'],'Die-Struck Iron / Brass','Exact 12-Sided UK £1 Spec (23.43×2.80mm)','Ø23.43×2.80mm','16g','Swivel Lobster Clasp + Split Ring','Dual Nickel-Brass / Shiny Nickel / Gold','200','1.15','0.62','0.39','7–11 Days','$55 12-Sided Die (Waived @ 500+ pcs)',true,true,false],
  [83,'MPS-083','soft-enamel-trolley-coins','Custom Soft Enamel Promotional Trolley Coins','trolley-coin-keyrings',[],'Die-Struck Iron / Brass','Pantone-Matched Soft Enamel on 1 or 2 Sides','Ø23.25×2.33mm','15g','Lobster Clasp / C-Clip Keyring','Bright Nickel / Gold / Black Nickel','200','1.20','0.65','0.42','8–11 Days','$55 Custom Stamping Die',false,true,false],
  [84,'MPS-084','magnetic-trolley-coin-holders','Custom Magnetic Detachable Trolley Coin Holders','trolley-coin-keyrings',['custom-metal-keychains'],'Zinc Alloy Frame + Iron Token','Embedded Flat Magnet Inside Zinc Holder (Slide-Out)','38×28×4.5mm','28g','28mm Flat Split Keyring','Brushed Chrome / Matte Black / Gold','200','1.65','0.98','0.65','9–12 Days','$55 Coin & Holder Die (Waived @ 500+)',true,true,true],
  [85,'MPS-085','printed-epoxy-trolley-coins','Custom Offset Printed Epoxy-Dome Trolley Coins','trolley-coin-keyrings',[],'Die-Struck Iron Blank','CMYK Full-Color Offset Artwork + Clear Epoxy Dome','Ø23.25×2.33mm','14g','Swivel Lobster Clasp + Split Ring','Bright Nickel Rim + Full-Color Print','200','1.05','0.55','0.35','7–9 Days','$55 Coin Die & Print Plate (Waived @ 500+)',true,false,false],
  [86,'MPS-086','stamped-metal-trolley-tokens','Custom Die-Struck Uncolored Stamped Trolley Tokens','trolley-coin-keyrings',[],'Die-Struck Iron / Brass','2D Raised/Recessed Logo Without Enamel Fill','Ø23.25×2.33mm','14g','Lobster Clasp / Split Ring','Nickel / Antique Brass / Copper','200','0.95','0.48','0.30','7–10 Days','$55 Stamping Die',false,false,false],
  [87,'MPS-087','key-shaped-trolley-unlockers','Custom Removable Key-Shaped Trolley Unlockers','trolley-coin-keyrings',['custom-metal-keychains'],'2.0mm Stainless Steel / Zinc','Front-Load Push-Pull Cart Unlocker Tool + Laser','55×23×2.0mm','16g','Integrated Keyhole + 25mm Split Ring','Brushed 304 Stainless / Anodized Blue/Black','200','1.25','0.68','0.44','7–10 Days','$55 Unlocker Stamping Die (Waived @ 500+)',true,false,false],
  [88,'MPS-088','cad-aud-trolley-coin-keyrings','Custom Canadian Loonie ($1 CAD) & $1 AUD Trolley Coins','trolley-coin-keyrings',[],'Die-Struck Iron / Brass','26.5mm ($1 CAD) or 25.0mm ($1 AUD) Cart Spec','Ø26.5mm / Ø25.0mm','17g','Heavy Lobster Clasp + Split Ring','Shiny Brass / Nickel / Antique Gold','200','1.18','0.64','0.40','8–11 Days','$55 Coin Stamping Die (Waived @ 500+)',true,true,false],
  [89,'MPS-089','bottle-opener-trolley-coin-keyring','Custom Double-Sided Trolley Coin with Bottle Opener Holder','trolley-coin-keyrings',['metal-bookmarks-openers-souvenirs'],'Zinc Alloy Holder + Iron Coin','Dual-Function Opener Holder + Removable €1/£1 Coin','56×32×4.2mm','34g','Integrated 28mm Split Ring','Chrome / Gunmetal / Satin Silver','200','1.75','1.05','0.72','9–12 Days','$75 Holder Mold (Waived @ 1,000+ pcs)',true,true,true],
  [90,'MPS-090','leather-loop-trolley-coin-keychains','Custom Leather-Loop Trolley Coin Keychains','trolley-coin-keyrings',['custom-metal-keychains'],'PU / Genuine Leather + Iron Coin','Stitched Snap-Strap Leather Loop + €1/£1 Metal Token','72×30×4.8mm','24g','28mm Nickel Split Keyring','Black / Navy / Brown Strap + Nickel Coin','200','1.60','0.95','0.64','9–12 Days','$55 Token Stamping Die (Waived @ 500+)',true,true,false],

  // C6: Police, Security & Military Insignia (14 SKUs: MPS-091 to MPS-104)
  [91,'MPS-091','3d-curved-police-security-badges','Custom 3D Curved Shield Police & Security Badges','police-badges-insignia',[],'Solid Brass / Heavy Zinc Alloy','Hydraulic Curved Dome + Cloisonne Hard Enamel','72×54×3.5mm','58g','Heavy Soldered Safety Catch / Belt Clip','18K Gold / Rhodium Silver / Two-Tone','50','4.80','3.20','2.45','12–15 Days','$135 Curved 3D Badge Mold',false,true,true],
  [92,'MPS-092','custom-sheriff-star-badges','Custom 5-Point, 6-Point & 7-Point Sheriff Star Badges','police-badges-insignia',[],'Solid Brass / Zinc Alloy','Ball-Tipped Star Die Strike + Domed Center Seal','68×68×3.5mm','54g','Heavy Safety Bar Pin / Leather Holder','Gold / Silver / Two-Tone Masking','50','4.60','3.10','2.35','12–15 Days','$130 Star Die Mold',false,true,true],
  [93,'MPS-093','fire-department-maltese-cross-badges','Custom Fire Department Maltese Cross Badges','police-badges-insignia',[],'Solid Brass / Heavy Zinc','Curved Maltese Cross + Hard Enamel Banner Panels','65×65×3.5mm','56g','Heavy Safety Catch + Optional Serialization','Gold / Rhodium Silver / Dual-Plated','50','4.90','3.30','2.50','12–15 Days','$135 Maltese Cross Die',false,true,true],
  [94,'MPS-094','security-guard-uniform-badges','Custom Security Guard & Patrol Uniform Chest Badges','police-badges-insignia',[],'Zamak #3 Zinc Alloy','Flat or Curved Uniform Shield + Sequential Guard ID #','65×50×3.0mm','45g','Heavy Safety Pin / 2-Post Clutch','Shiny Silver / Gold / Antique Nickel','50','3.50','2.25','1.65','10–13 Days','$95 Mold (Waived @ 1,000+ pcs)',false,true,true],
  [95,'MPS-095','police-badge-leather-belt-clip','Custom Police Badges with Recessed Leather Belt Clip','police-badges-insignia',[],'Top-Grain Cowhide + Brass/Zinc','Custom Die-Cut Recessed Leather Holster + Shield Badge','92×72×8.0mm','88g','Tempered Steel Belt Clip + 30" Neck Chain','Black/Brown Cowhide + Gold/Silver Badge','50','7.50','5.40','4.20','12–16 Days','$145 Badge + Leather Die Set',false,true,true],
  [96,'MPS-096','miniature-collar-hat-police-badges','Custom Miniature Collar & Hat Police Badges','police-badges-insignia',['custom-enamel-pins'],'Die-Struck Brass / Zinc','1.0"–1.5" Scaled Cap/Collar Replica + Hard Enamel','32×25×2.2mm','16g','2× Heavy Military Clutch Posts','Shiny Gold / Rhodium Silver / Dual-Tone','300','2.40','1.48','1.05','9–12 Days','$65 Mini Die (Waived @ 500+)',false,true,false],
  [97,'MPS-097','embossed-stainless-military-dog-tags','Custom Embossed Stainless Steel Military Dog Tags','police-badges-insignia',[],'0.4mm Rolled-Edge 304 Stainless','5-Line Mechanical Embossing + Rubber Silencers + Chain','50×28×0.4mm','18g','24" + 4.5" #3 Ball Chain + Black Silencers','Matte Brushed or Mirror 304 Stainless','100','1.15','0.65','0.42','6–9 Days','$45 Embossing Wheel Setup (Waived @ 500+)',true,false,false],
  [98,'MPS-098','3d-zinc-alloy-dog-tags','Custom 3D Zinc Alloy Cut-Out Dog Tag Pendants','police-badges-insignia',['custom-metal-keychains'],'Zamak #3 Zinc Alloy','Deep 3D Sculpted Dog Tag + Cut-Out + Enamel Fill','50×28×3.0mm','32g','24" Heavy Ball Chain or Keyring','Antique Silver / Gunmetal / Gold','100','1.75','1.08','0.75','9–12 Days','$95 3D Dog Tag Mold',false,true,true],
  [99,'MPS-099','enamel-printed-dog-tags','Custom Soft Enamel & Printed Epoxy Dog Tags','police-badges-insignia',[],'Stamped Brass / Aluminum','Recessed Soft Enamel or CMYK Epoxy Dog Tag','50×28×1.5mm','16g','24" Ball Chain + Split Ring Option','Anodized Colors / Nickel / Gold','100','1.45','0.85','0.58','7–10 Days','$55 Custom Tag Die (Waived @ 500+ pcs)',true,true,false],
  [100,'MPS-100','magnetic-metal-name-plates','Custom Magnetic Brushed Metal Employee Name Plates','police-badges-insignia',[],'Brushed Aluminum / Brass / 304SS','Laser Etched or UV Printed Staff Name + 3-Magnet Bar','75×25×1.2mm','20g','3-Magnet Neodymium Clothing-Safe Clasp','Brushed Silver / Champagne Gold / Black','50','2.20','1.35','0.92','6–9 Days','$45 Blanking Fixture (Waived @ 500+)',true,false,false],
  [101,'MPS-101','reusable-window-name-badges','Custom Window-Slot Reusable Metal Name Badges','police-badges-insignia',[],'Die-Cast Zinc / Stamped Brass','Recessed Clear Window Frame for Replaceable Names','75×32×2.5mm','28g','Neodymium Magnet Bar or Safety Pin','Satin Gold / Brushed Nickel / Black','50','2.45','1.52','1.05','8–12 Days','$65 Frame Stamp Die (Waived @ 500+)',true,true,false],
  [102,'MPS-102','executive-engraved-name-bars','Custom Gold/Silver Executive Engraved Name Bars','police-badges-insignia',['executive-cufflinks-tie-bars'],'1.6mm Heavy Beveled Brass','Beveled Diamond-Cut Rim + Deep Engraved Name/Title','70×20×1.6mm','24g','Dual Military Clutches or Magnetic Bar','Mirror 18K Gold / Rhodium Silver','50','2.65','1.65','1.15','7–10 Days','$55 Beveled Bar Die (Waived @ 500+ pcs)',true,false,false],
  [103,'MPS-103','custom-championship-rings','Custom Sports Championship & Tournament Rings','police-badges-insignia',['custom-challenge-coins'],'Heavy Zamak #3 Zinc Alloy','3D Sculpted Ring + Cubic Zirconia Stones + Enamel','US Sizes 7–13 (28mm Face)','52g','Optional Velvet / LED Ring Display Box','Shiny Silver / Gold / Antique Pewter','50','6.80','4.60','3.45','14–18 Days','$140 Ring Base Mold',false,true,true],
  [104,'MPS-104','custom-enamel-charm-jewelry','Custom Enamel Charm Bracelets & Metal Necklaces','police-badges-insignia',['metal-bookmarks-openers-souvenirs'],'304 Stainless / Brass + Enamel','Custom Cloisonne Logo Charms on Link Chain','18mm Charms + 18cm/45cm Chain','22g','Lobster Clasp + Custom Logo Hangtag','18K Gold / Rose Gold / Silver Steel','100','2.10','1.32','0.88','10–14 Days','$65 Charm Die (Waived @ 500+ pcs)',false,true,false],

  // C7: Executive Cufflinks, Tie Bars & Belt Buckles (14 SKUs: MPS-105 to MPS-118)
  [105,'MPS-105','custom-hard-enamel-cufflinks','Custom Hard Enamel Brass Cufflinks (Pair)','executive-cufflinks-tie-bars',[],'Solid Brass + Swivel Toggle','Flush Polished Cloisonne Hard Enamel + Bullet Back','18×18×2.0mm','18g/pair','Heavy Bullet-Back Swivel Toggles','18K Gold / Mirror Rhodium / Rose Gold','50','3.60','2.35','1.75','10–13 Days','$65 Die (Waived @ 500+ pcs)',false,true,false],
  [106,'MPS-106','3d-die-cast-logo-cufflinks','Custom 3D Die-Cast Sculpted Logo Cufflinks (Pair)','executive-cufflinks-tie-bars',[],'Zinc Alloy / Brass','3D Relief Custom Shape Cufflinks + Swivel Toggle','20×16×3.0mm','20g/pair','Heavy Rhodium/Gold Swivel Toggle','Antique Silver / Gold / Rhodium','50','3.85','2.55','1.88','10–14 Days','$95 3D Cufflink Mold',false,false,true],
  [107,'MPS-107','laser-engraved-silver-cufflinks','Custom Laser-Engraved Minimalist Silver Cufflinks','executive-cufflinks-tie-bars',[],'304 Stainless / Solid Brass','Precision 50W Fiber Laser Crest on Mirror/Brushed Face','18×18×2.2mm','19g/pair','Swivel Whaleback Toggle','Mirror Rhodium / Brushed Steel / Gold','50','3.20','2.05','1.48','7–10 Days','$55 Crest Tooling (Waived @ 500+ pcs)',true,false,false],
  [108,'MPS-108','printed-epoxy-corporate-cufflinks','Custom Printed Epoxy-Dome Corporate Cufflinks','executive-cufflinks-tie-bars',[],'Brass Base + Optical Dome','CMYK Full-Color Crest Printed Under Clear Glass Dome','Ø18×2.5mm','16g/pair','Swivel Bullet Toggle Back','Mirror Silver / Gold Rim','50','2.95','1.88','1.35','7–10 Days','$55 Setting & Dome Plate (Waived @ 500+)',true,false,false],
  [109,'MPS-109','cufflink-tie-bar-gift-sets','Custom Cufflink & Tie Bar Executive Gift Box Sets','executive-cufflinks-tie-bars',['patches-pvc-packaging'],'Solid Brass + Velvet Gift Box','Matched Cufflink Pair + 55mm Tie Bar in Velvet Box','18mm Cufflinks + 55mm Bar','115g/set','Flocked Velvet Gift Box w/ Foil Logo','Rhodium Silver / 18K Gold / Black Nickel','50','6.80','4.75','3.65','10–14 Days','$65 Die (Velvet Box Included)',false,true,false],
  [110,'MPS-110','alligator-clip-brass-tie-bars','Custom Alligator-Clip Brass Tie Bars with Emblem','executive-cufflinks-tie-bars',[],'Solid Brass + Spring Clip','55mm/60mm Brass Clip + Soldered Hard Enamel Crest','55×6.0×2.0mm','14g','Hidden Spring Serrated Alligator Clip','Mirror Rhodium / 18K Gold / Rose Gold','50','2.10','1.32','0.92','9–12 Days','$55 Emblem Die (Waived @ 500+ pcs)',true,true,false],
  [111,'MPS-111','slide-on-engraved-tie-clips','Custom Slide-On Minimalist Engraved Tie Clips','executive-cufflinks-tie-bars',[],'Spring Brass / 304 Stainless','One-Piece Sleek Slide Clip + Fiber Laser/Acid Etch','55×6.0×1.5mm','11g','Tension Slide-On Tie Clasp','Brushed Silver / Gold / Matte Black','50','1.95','1.22','0.85','7–10 Days','$55 Tie Clip Die (Waived @ 500+ pcs)',true,false,false],
  [112,'MPS-112','die-struck-crest-tie-tacks','Custom Die-Struck Crest Tie Tacks with Chain','executive-cufflinks-tie-bars',['custom-enamel-pins'],'Solid Brass / Iron','18mm Crest Emblem + Clutch Pin & Shirt-Button Chain','Ø18×1.5mm','9g','Swivel Chain Bar + Clutch Back','18K Gold / Silver / Antique Brass','300','1.65','0.98','0.68','8–11 Days','$55 Die (Waived @ 500+ pcs)',false,true,false],
  [113,'MPS-113','custom-brass-logo-money-clips','Custom Brass & Stainless Steel Logo Money Clips','executive-cufflinks-tie-bars',[],'Spring Brass / 304 Stainless','Tension-Spring Bill Clip + Laser Logo or Soldered Crest','52×22×7.0mm','28g','Individual Polybag / Velvet Pouch Opt.','Brushed Stainless / Gold / Gunmetal','50','2.45','1.55','1.10','7–11 Days','$55 Money Clip Die (Waived @ 500+ pcs)',true,true,false],
  [114,'MPS-114','western-rodeo-trophy-belt-buckles','Custom 3D Western & Rodeo Trophy Belt Buckles','executive-cufflinks-tie-bars',[],'Heavy Zamak #3 Zinc Alloy','Oversized 4"×3" 3D Sculpted Buckle + Rope Edge + Stones','102×76×12mm','165g','1.5"–1.75" Rear Belt Loop & Hook','Antique Silver + Gold / Antique Brass','50','5.80','3.95','2.95','12–16 Days','$140 Heavy 3D Buckle Mold',false,true,true],
  [115,'MPS-115','biker-club-heavy-belt-buckles','Custom Biker & Motorcycle Club Heavy Belt Buckles','executive-cufflinks-tie-bars',[],'Heavy Zinc Alloy / Pewter','Deep 3D Skull/Crest Cast + Hand-Antiqued Soft Enamel','95×68×10mm','152g','1.5" Heavy Swivel D-Loop & Prong','Antique Pewter / Black Nickel / Chrome','50','5.50','3.75','2.80','12–16 Days','$135 Heavy 3D Buckle Mold',false,true,true],
  [116,'MPS-116','military-unit-enamel-belt-buckles','Custom Military & Police Unit Enamel Belt Buckles','executive-cufflinks-tie-bars',['police-badges-insignia'],'Heavy Zinc Alloy / Brass','Rectangular/Oval Framed Buckle + Cloisonne Crest','88×60×9.0mm','135g','1.5" Uniform Snap-Belt Loop','24K Gold / Antique Brass / Black Nickel','50','5.20','3.55','2.65','12–15 Days','$130 Buckle Mold',false,true,true],
  [117,'MPS-117','bottle-opener-metal-belt-buckles','Custom Bottle-Opener Utility Metal Belt Buckles','executive-cufflinks-tie-bars',['metal-bookmarks-openers-souvenirs'],'Reinforced 5.5mm Zinc Alloy','Heavy 3D Buckle with Reinforced Rear Cap Pry Lip','92×62×11mm','148g','1.5" Heavy Belt Loop + Opener Lip','Antique Bronze / Gunmetal / Chrome','50','5.60','3.85','2.88','12–15 Days','$135 Utility Buckle Mold',false,true,true],
  [118,'MPS-118','streetwear-enamel-belt-buckles','Custom Fashion & Streetwear Enamel Belt Buckles','executive-cufflinks-tie-bars',[],'Zamak #3 Zinc Alloy','Minimalist Plaque or Cut-Out Logo for 1.5" Fashion Belts','78×48×7.5mm','112g','1.5" Standard Snap Belt Loop','Matte Black / Mirror Chrome / Gold','50','4.90','3.35','2.45','10–14 Days','$120 Custom Buckle Mold',false,true,true],

  // C8: Custom Golf Divot Tools & Ball Markers (10 SKUs: MPS-119 to MPS-128)
  [119,'MPS-119','magnetic-golf-divot-tools','Custom Magnetic Golf Divot Repair Tools','custom-golf-accessories',[],'Zinc Alloy + Iron Marker + NdFeB','2-Prong Ergonomic Fork + Embedded Magnet + 25mm Marker','82×30×5.0mm','48g','Removable 25mm Magnetic Ball Marker','Antique Bronze / Gunmetal / Matte Black','100','2.35','1.52','1.08','9–12 Days','$55 Marker Die (Waived @ 500+ pcs)',true,true,true],
  [120,'MPS-120','switchblade-golf-divot-tools','Custom Switchblade Folding Golf Divot Tools','custom-golf-accessories',[],'6063 Aluminum / Stainless + Zinc','Push-Button Spring-Release Folding Prongs + Marker','115×32×12mm','62g','25mm Magnetic Enamel Ball Marker','Anodized Black / Navy / Red / Silver','100','3.65','2.45','1.85','10–14 Days','$55 Marker Die (Waived @ 500+ pcs)',true,true,false],
  [121,'MPS-121','golf-hat-clip-ball-markers','Custom Golf Hat Clip & Magnetic Ball Marker Sets','custom-golf-accessories',[],'Spring Steel Clip + Iron Marker','Recessed Magnet Visor Clip + 25mm Enamel Marker','32×25×6.0mm','22g','Spring Visor Clip + 25mm Iron Marker','Shiny Nickel / Gunmetal / Matte Black','100','1.65','0.98','0.68','8–11 Days','$55 Marker & Clip Die (Waived @ 500+)',true,true,false],
  [122,'MPS-122','antique-brass-golf-ball-markers','Custom Die-Struck Antique Brass Golf Ball Markers','custom-golf-accessories',[],'2.5mm Brass-Plated Iron','Deep Relief Stamped Magnetic Coin Ball Marker','Ø28×2.5mm','12g','Magnetic-Ready Ferromagnetic Core','Antique Brass / Antique Bronze / Silver','100','1.45','0.88','0.58','8–11 Days','$55 Custom Coin Marker Die',false,false,false],
  [123,'MPS-123','poker-chip-golf-ball-markers','Custom Heavy Metal Poker Chip Golf Ball Markers','custom-golf-accessories',[],'Zinc Alloy / Weighted Clay + Iron','40mm Weighted Chip + Removable 25mm Magnetic Marker','Ø40×3.3mm','28g','Center Snap-Out Magnetic Metal Marker','Black / Red / Blue / Gold Trim','100','2.15','1.35','0.95','9–12 Days','$55 Marker Crest Die (Waived @ 500+)',true,true,false],
  [124,'MPS-124','divot-tool-bottle-opener','Custom Multi-Function Divot Tool with Bottle Opener','custom-golf-accessories',['metal-bookmarks-openers-souvenirs'],'Heavy Zamak #3 Zinc Alloy','Divot Repair Fork + Built-In Opener + Magnetic Marker','90×32×5.5mm','54g','25mm Magnetic Enamel Ball Marker','Gunmetal / Satin Chrome / Antique Silver','100','2.60','1.68','1.18','9–12 Days','$65 Fork & Marker Die (Waived @ 500+)',true,true,true],
  [125,'MPS-125','golf-tournament-tin-gift-sets','Custom Golf Tournament Tin Gift Sets (Divot + 2 Markers)','custom-golf-accessories',['patches-pvc-packaging'],'Window Metal Tin + EVA + Zinc','Divot Tool + Hat Clip + 2 Ball Markers in Window Tin','115×85×22mm','145g/set','Die-Cut EVA Tray + Printed Tin Lid','Custom Full-Color Tin + Gunmetal Tools','100','4.85','3.35','2.55','10–14 Days','$55 Tin Print & Marker Die (Waived @ 500+)',true,true,true],
  [126,'MPS-126','metal-golf-bag-tags','Custom Metal Golf Bag Tags with Leather Strap','custom-golf-accessories',['custom-metal-keychains'],'3mm Zinc Alloy + Leather Strap','3"–3.5" Club Crest Metal Bag Tag + Buckled Strap','Ø85×3.2mm','75g','Buckled Genuine/PU Leather Strap','Antique Gold / Silver / Matte Black','100','2.95','1.92','1.38','10–13 Days','$95 Custom Crest Mold',false,true,true],
  [127,'MPS-127','double-sided-enamel-ball-markers','Custom Double-Sided Enamel Golf Ball Markers','custom-golf-accessories',[],'Stamped Iron (Magnetic Core)','2-Sided Enamel or Offset Epoxy Ball Marker (25–30mm)','Ø25×2.0mm','10g','Polybag / Velvet Pouch Option','Shiny Gold / Chrome / Black Nickel','100','1.25','0.72','0.48','7–10 Days','$55 Ball Marker Die (Waived @ 500+)',true,true,false],
  [128,'MPS-128','alignment-stencil-divot-tools','Custom Ball-Marker Alignment Stencil Divot Tools','custom-golf-accessories',[],'Die-Cast Zinc Alloy + Iron','Ergonomic Fork with 42.67mm Ball Alignment Cutout','88×45×4.5mm','52g','Removable 25mm Magnetic Marker','Matte Black / Brushed Silver / Gunmetal','100','2.45','1.58','1.12','9–12 Days','$65 Stencil Fork Die (Waived @ 500+)',true,true,true],

  // C9: Custom Metal Bookmarks, Openers & Souvenirs (12 SKUs: MPS-129 to MPS-140)
  [129,'MPS-129','photo-etched-brass-bookmarks','Custom Photo-Etched Gold Brass Hollow Bookmarks','metal-bookmarks-openers-souvenirs',[],'0.4mm Solid C26000 Brass','Intricate Chemical Cut-Out Filigree + Silk Tassel','115×35×0.4mm','12g','Pantone Silk Tassel + Backing Card Opt.','24K Gold / Rose Gold / Antique Brass','100','1.65','0.95','0.62','8–11 Days','$55 Photo-Etch Film (Waived @ 500+)',false,false,false],
  [130,'MPS-130','enamel-museum-metal-bookmarks','Custom Soft Enamel Museum & Bookstore Metal Bookmarks','metal-bookmarks-openers-souvenirs',[],'0.8mm Etched Brass / Stainless','Etched Filigree + Vibrant Soft Enamel + Card Sleeve','120×38×0.8mm','16g','Tassel + 350gsm Printed Backing Card','Shiny Gold / Nickel / Black Nickel','100','1.85','1.12','0.75','9–12 Days','$60 Etch Film (Waived @ 500+)',false,true,false],
  [131,'MPS-131','paperclip-enamel-charm-bookmarks','Custom Metal Paperclip Bookmarks with Enamel Charm','metal-bookmarks-openers-souvenirs',['custom-enamel-pins'],'Brass Clip + Enamel Pin Charm','Spring Brass Page Clip + Dangling Enamel Crest Charm','65×22×1.5mm','14g','Backing Card + Clear Cello Pouch','Shiny Gold / Rose Gold / Silver','300','1.45','0.85','0.56','8–11 Days','$55 Charm Die (Waived @ 500+ pcs)',false,true,false],
  [132,'MPS-132','brewery-zinc-bottle-openers','Custom Heavy-Duty Zinc Alloy Brewery Bottle Openers','metal-bookmarks-openers-souvenirs',[],'4.2mm Heavy Zamak #3 Zinc','Custom 3D Die-Cast Shape + Thickened Opener Jaw','95×42×4.2mm','68g','Individual Polybag / Retail Box Opt.','Antique Bronze / Pewter / Gunmetal','100','2.45','1.55','1.08','10–14 Days','$115 Custom 3D Opener Mold',false,true,true],
  [133,'MPS-133','credit-card-bottle-openers','Custom Stainless Steel Credit-Card Bottle Openers','metal-bookmarks-openers-souvenirs',[],'1.5mm 304 Stainless Steel','Laser Engraved or UV Printed Wallet Card Opener','85.5×54×1.5mm','42g','Individual Kraft Sleeve or Polybag','Matte Black / Brushed Steel / Gold','200','1.15','0.62','0.39','6–9 Days','$45 Etch/Print Plate (Waived @ 500+)',true,false,false],
  [134,'MPS-134','magnetic-fridge-bottle-openers','Custom Magnetic Fridge-Back Metal Bottle Openers','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Zinc Alloy + N45 NdFeB Magnets','3D Die-Cast Opener + 2× Recessed High-Hold Magnets','92×45×4.5mm','74g','2× Recessed N45 Fridge Magnets','Antique Silver / Copper / Matte Black','100','2.65','1.68','1.18','10–14 Days','$115 Opener Mold (Waived @ 1,000+)',false,true,true],
  [135,'MPS-135','bartender-speed-bottle-openers','Custom Bartender Speed Rail Metal Bottle Openers','metal-bookmarks-openers-souvenirs',[],'2.0mm Hardened 304 Stainless','Flat Bar Paddle Opener + Vinyl Dip or Laser Logo','178×40×2.0mm','95g','Thumb Spinner Hole + Individual Bag','Brushed Steel / Matte Vinyl Coated','100','1.85','1.12','0.76','7–10 Days','$45 Laser & Dip Setup (Waived @ 500+)',true,false,false],
  [136,'MPS-136','3d-metal-souvenir-fridge-magnets','Custom 3D Metal Souvenir Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Zamak #3 Zinc Alloy + Magnet','3D City/Museum Landmark Relief + Soft Enamel','70×50×3.5mm','58g','Flush High-Hold Rear Ceramic/NdFeB Magnet','Antique Silver / Gold / Copper','200','1.75','1.05','0.72','10–14 Days','$105 Landmark 3D Mold',false,true,true],
  [137,'MPS-137','souvenir-collector-metal-spoons','Custom Souvenir Collector Metal Tea Spoons','metal-bookmarks-openers-souvenirs',[],'Zinc Alloy / Silver-Plated Brass','110mm Collector Spoon + Enamel/Epoxy Crest Top','110×24×3.0mm','24g','Clear Window Box or Custom Card','Silver Plated / Antique Gold / Brass','200','1.65','0.98','0.68','10–14 Days','$55 Spoon Crest Die (Waived @ 500+ pcs)',true,true,false],
  [138,'MPS-138','custom-metal-zipper-pulls','Custom Metal Zipper Pulls & Apparel Brand Tags','metal-bookmarks-openers-souvenirs',[],'Zamak #3 Zinc Alloy / Brass','Precision Molded Brand Logo Puller + Swivel Hook','32×12×2.8mm','8g','Swivel Lobster Hook or Horseshoe Clasp','Matte Black / Gunmetal / Brushed Brass','200','0.95','0.52','0.32','8–12 Days','$75 Brand Tag Mold (Waived @ 2k)',false,true,true],
  [139,'MPS-139','custom-metal-bag-charms','Custom Luxury Metal Bag Charms & Purse Pendants','metal-bookmarks-openers-souvenirs',['custom-metal-keychains'],'Polished Brass / Zinc Alloy','Hard Enamel Double-Sided Pendant + Heavy Clasp','45×35×3.0mm','35g','Heavy Spring Gate O-Ring + Lobster Clasp','18K Gold / Rose Gold / Mirror Chrome','100','1.95','1.18','0.82','10–13 Days','$85 Charm Mold',false,true,true],
  [140,'MPS-140','foldable-metal-bag-hangers','Custom Foldable Metal Purse & Handbag Table Hangers','metal-bookmarks-openers-souvenirs',[],'Zinc Alloy + Anti-Slip Pad','Articulated Folding Hook + Full-Color Epoxy Dome','Ø45×8.0mm','48g','Velvet Pouch or Gift Box Option','Mirror Chrome / Silver / Gold','100','2.25','1.38','0.95','8–11 Days','$55 Dome Crest Die (Waived @ 500+ pcs)',true,false,false],

  // C10: Custom Patches, Soft PVC & Packaging (10 SKUs: MPS-141 to MPS-150)
  [141,'MPS-141','custom-embroidered-patches','Custom Embroidered Uniform & Club Patches','patches-pvc-packaging',['police-badges-insignia'],'Heavy Twill + Rayon Thread','50%–100% Embroidery + Merrowed or Laser-Cut Edge','75×75×2.0mm (3.0")','8g','Iron-On / Velcro / Sew-On / 3M Peel-Stick','Up to 9 Pantone Thread Colors','100','1.35','0.75','0.48','7–10 Days','$35 Digitizing Tape (Waived @ 300+)',true,false,false],
  [142,'MPS-142','bullion-wire-crest-patches','Custom Gold/Silver Bullion Wire Military & Blazer Patches','patches-pvc-packaging',['police-badges-insignia'],'Wool Felt + Metallic Bullion Wire','Hand-Stitched Coiled Gold/Silver Metallic Wire Crest','85×75×4.0mm','22g','3-Clutch Pin Back or Sew-On Felt Back','Gold/Silver Bullion Wire on Navy/Black','50','4.50','3.10','2.35','14–18 Days','$45 Bullion Pattern Setup (Waived @ 300+)',true,false,false],
  [143,'MPS-143','custom-woven-logo-patches','Custom Woven High-Detail Logo Patches','patches-pvc-packaging',[],'High-Density 100D Polyester Yarn','Fine Flat Woven Threads for Tiny Text & Gradients','75×50×1.0mm','5g','Iron-On / Velcro / Sew-On / Merrowed Border','Up to 8 Fine Yarn Colors','100','1.20','0.65','0.42','8–11 Days','$35 Jacquard Loom Setup (Waived @ 500+)',true,false,false],
  [144,'MPS-144','3d-soft-pvc-keychains','Custom 3D Soft PVC Rubber Keychains','patches-pvc-packaging',['custom-metal-keychains'],'Eco Non-Phthalate Soft PVC','Multi-Layer 2D/3D Micro-Injection PVC Molding','50×40×4.5mm','16g','28mm Nickel Split Ring + Ball Chain','Pantone Custom PVC Pigments','200','1.10','0.58','0.36','8–12 Days','$55 PVC Mold (Waived @ 2,000+)',false,false,true],
  [145,'MPS-145','soft-pvc-morale-patches-pins','Custom Soft PVC Lapel Pins & Tactical Morale Patches','patches-pvc-packaging',['police-badges-insignia'],'Waterproof Eco Soft PVC','Flexible 3D Molded Tactical Patch w/ Sewing Channel','80×50×3.5mm','14g','Hook & Loop Velcro or Butterfly Clutch','Matte Tactical Tan/OD/Black or Bright','300','1.25','0.68','0.44','8–12 Days','$55 PVC Mold (Waived @ 1,000+)',false,false,true],
  [146,'MPS-146','soft-pvc-coasters-luggage-tags','Custom Soft PVC Promotional Coasters & Luggage Tags','patches-pvc-packaging',[],'Heavy Non-Phthalate Soft PVC','3D Molded Bar Coasters (90mm) or Strap Luggage Tags','Ø90×4.0mm / 105×65mm','42g','Silicone Loop Strap + Rear ID Card Window','Full Pantone Custom Molded Colors','200','1.55','0.92','0.62','9–12 Days','$75 Large PVC Mold',false,false,true],
  [147,'MPS-147','velvet-presentation-boxes','Custom Velvet Presentation Boxes (Medals, Coins & Cufflinks)','patches-pvc-packaging',['custom-challenge-coins','executive-cufflinks-tie-bars'],'Flocked Velvet + EVA Foam Core','Hinged Velvet Gift Box + Die-Cut Tray + Foil Logo','90×90×30mm','85g','Custom Die-Cut Tray for Coin/Medal/Cufflinks','Black / Navy / Burgundy Velvet + Gold Foil','100','1.85','1.25','0.88','7–10 Days','$35 Foil Stamp Plate (Waived @ 500+)',true,false,false],
  [148,'MPS-148','acrylic-coin-capsules-stands','Clear Acrylic Challenge Coin Capsules & Display Stands','patches-pvc-packaging',['custom-challenge-coins'],'Optical Virgin Polystyrene/Acrylic','Snap-Tight Crystal Protective Capsule + EVA Sizing Ring','Ø38mm / Ø44.5mm / Ø50.8mm','14g','Optional Mini Acrylic Easel Stand','Crystal Clear Transparent','100','0.45','0.25','0.16','4–7 Days','$35 Custom Ring Cutter (Waived @ 500+)',true,false,false],
  [149,'MPS-149','custom-pin-backing-cards','Custom Printed Retail Backing Cards for Enamel Pins','patches-pvc-packaging',['custom-enamel-pins'],'350gsm–400gsm Art Cardstock','CMYK Offset Card Print + Euro-Slot Polybag + Pre-Mount','85×55mm / 100×70mm','6g','Pre-Pierced & Pin-Mounted Option','Matte Lamination / Gold Foil Stamp','300','0.35','0.18','0.11','5–8 Days','$35 Die-Cut & Proof Plate (Waived @ 500+)',true,false,false],
  [150,'MPS-150','deluxe-award-display-cases','Custom Leatherette & Wooden Deluxe Award Cases','patches-pvc-packaging',['custom-challenge-coins','executive-cufflinks-tie-bars'],'MDF Mahogany / Stitched PU Leather','Satin Lid Lining + Custom Cut Velvet Foam Insert','120×120×38mm','220g','Gold Brass Hinge & Snap Clasp','Piano Mahogany / Black Leatherette','50','4.20','2.95','2.25','10–14 Days','$40 Foil & Insert Die (Waived @ 500+)',true,false,false],

  // C11: Custom Metal Fridge Magnets (8 new + 2 primary re-assigned = 10 SKUs total)
  [151,'MPS-151','hard-enamel-metal-fridge-magnets','Custom Hard Enamel Metal Fridge Magnets (Cloisonne)','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Solid Brass / Iron + N45 Magnet','Kiln-Cured & Flush Stone-Polished Cloisonne Enamel','55×45×2.2mm','38g','2× Recessed N45 Neodymium Disc Magnets','18K Gold / Rhodium Silver / Black Nickel','100','1.95','1.18','0.82','9–12 Days','$75 2D Die (Waived @ 500+ pcs)',false,true,false],
  [152,'MPS-152','soft-enamel-die-struck-fridge-magnets','Custom Die-Struck Soft Enamel Metal Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Die-Struck Iron / Zinc + Magnet','Recessed 180°C Baked Pantone Soft Enamel Relief','55×45×2.0mm','34g','Flush Ferrite or Recessed N45 Magnet','Shiny Gold / Nickel / Matte Black','100','1.45','0.85','0.58','8–11 Days','$65 2D Die (Waived @ 500+ pcs)',false,true,false],
  [153,'MPS-153','epoxy-dome-printed-metal-fridge-magnets','Custom Full-Color Offset Epoxy-Dome Metal Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Stamped Brass / Iron + CMYK Dome','Full-Color CMYK Litho Offset Print + Clear Epoxy Dome','60×42×2.2mm','32g','Flush Rear Ceramic Ferrite / Soft Rubber Magnet','Bright Chrome / Satin Silver / Gold Trim','200','1.25','0.72','0.48','7–10 Days','$55 Plate & Die (Waived @ 500+ pcs)',true,false,false],
  [154,'MPS-154','interactive-spinner-slider-fridge-magnets','Custom Interactive Spinner & Slider Kinetic Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'2-Layer Zamak #3 Zinc + N45','360° Riveted Spinner Wheel or Curved Linear Slider Track','68×52×4.8mm','66g','2× Heavy Recessed N45 Neodymium Magnets','Antique Gold / Two-Tone / Black Nickel','100','2.85','1.82','1.28','12–16 Days','$140 Dual-Layer Mold (Waived @ 1,000+)',false,true,true],
  [155,'MPS-155','stained-glass-cutout-metal-fridge-magnets','Custom Stained-Glass Translucent Cut-Out Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'Cut-Out Zinc Alloy + Resin','Pierced Open-Window Cut-Outs + Translucent Stained-Glass Enamel','65×50×3.0mm','48g','2× Perimeter Recessed N45 Neodymium Magnets','24K Gold / Antique Brass / Black Nickel','100','2.35','1.48','1.02','11–14 Days','$115 Cut-Out Mold (Waived @ 1,000+)',false,true,true],
  [156,'MPS-156','multi-layer-3d-stacked-fridge-magnets','Custom Multi-Layer 3D Stacked Architectural Fridge Magnets','custom-metal-fridge-magnets',['metal-bookmarks-openers-souvenirs'],'2-to-3 Layer Riveted Zamak #3 Zinc','Multi-Tier Stacked Metal Relief Assembly + Soft Enamel','75×55×5.5mm','78g','2× Heavy-Duty N45 Neodymium Magnets','Antique Bronze / Two-Tone Gold & Silver','100','3.10','1.98','1.42','12–16 Days','$145 Multi-Part Mold (Waived @ 1,000+)',false,true,true],
  [157,'MPS-157','antique-brass-relief-museum-fridge-magnets','Custom Antique Brass & Bronze Relief Museum Fridge Magnets','custom-metal-fridge-magnets',['custom-challenge-coins'],'Solid C26000 Brass / Heavy Zinc','Deep Uncolored 3D Heritage Relief + Hand-Brushed Patina','62×48×3.5mm','64g','2× Flush N45 Neodymium Magnets','Antique Brass / Antique Bronze / Pewter','100','2.15','1.32','0.92','9–13 Days','$105 3D Relief Mold (Waived @ 1,000+)',false,false,true],
  [158,'MPS-158','glow-glitter-specialty-metal-fridge-magnets','Custom Glow-in-the-Dark & Glitter Metal Fridge Magnets','custom-metal-fridge-magnets',['patches-pvc-packaging'],'Die-Cast Zinc Alloy + Luminous Fill','Phosphorescent Afterglow & Metallic Glitter Enamel Fill','60×48×2.8mm','44g','Recessed High-Hold N45 Neodymium Magnet','Black Nickel / Gunmetal / Shiny Gold','100','1.90','1.15','0.78','10–13 Days','$95 Custom Mold (Waived @ 1,000+ pcs)',false,true,true]
];

function cleanMetaTitle(title) {
  let base = title
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*&\s*/g, ' & ')
    .trim();
  if (base.length <= 59) return base;
  const noCustom = base.replace(/^Custom\s+/i, '').trim();
  if (noCustom.length <= 59) return noCustom;
  const words = noCustom.split(' ');
  let acc = '';
  for (const w of words) {
    const next = acc ? `${acc} ${w}` : w;
    if (next.length <= 59) acc = next;
    else break;
  }
  return acc.replace(/[\s&\-\/|]+$/, '');
}

function cleanMetaDesc(title, material, size, moq, t2k, t100) {
  const shortMat = material.split('/')[0].trim();
  const shortTool = 'custom mold waived on bulk';
  let desc = `Wholesale ${title} (${shortMat}, $${t2k}–$${t100}/pc). MOQ ${moq}, ${shortTool}, 12h free proof.`;
  if (desc.length < 155) return desc;
  desc = `${title} ($${t2k}–$${t100}/pc, MOQ ${moq}). ${shortMat}, ${size}, 12h free digital proof.`;
  if (desc.length < 155) return desc;
  return `${title.replace(/\s*\([^)]*\)/g, '')} ($${t2k}–$${t100}/pc, MOQ ${moq}, 12h free proof).`.slice(0, 154);
}

const usedMetaTitles = new Set();
const usedMetaDescs = new Set();

for (const row of CATALOG) {
  const [
    rowId, sku, slug, title, primaryCollection, crossCollections,
    material, process, size, weight, attachmentEn, platingEn,
    moqNum, tier100, tier500, tier2000, leadTime, toolingFee,
    readyMold, enamelCraft, dieCast3d
  ] = row;

  const numPad = String(rowId).padStart(3, '0');
  const featuredImage = `/images/products/mps-${numPad}.webp`;
  const primaryCollectionName = COL_NAMES[primaryCollection];
  const moqStr = `${moqNum} pcs`;
  const priceRange = `$${tier2000} – $${tier100}`;

  let metaTitle = cleanMetaTitle(title);
  if (usedMetaTitles.has(metaTitle)) {
    metaTitle = `${metaTitle.slice(0, 48).replace(/[\s&\-\/|]+$/, '')} | ${size.split(' ')[0]}`.slice(0, 59).replace(/[\s&\-\/|]+$/, '');
  }
  usedMetaTitles.add(metaTitle);

  let metaDescription = cleanMetaDesc(title, material, size, moqStr, tier2000, tier100);
  if (!/[.!)]$/.test(metaDescription)) {
    metaDescription = metaDescription.replace(/[\s,;\-]+$/, '') + '.';
  }
  if (usedMetaDescs.has(metaDescription)) {
    metaDescription = metaDescription.replace(/\.$/, ` (${size}).`);
  }
  usedMetaDescs.add(metaDescription);

  const overview = `${title} is custom-manufactured to order in our Zhongshan Xiaolan hardware facility using ${material} (${size}, ${weight}) via ${process}. Available in ${platingEn} with ${attachmentEn}, starting at ${moqStr} MOQ with 12-hour free digital proofs, ${leadTime} production lead time, and factory-direct pricing from $${tier2000} to $${tier100}/pc.`;

  const is2dTooling = readyMold || /2D Die|Plate & Die/i.test(toolingFee);
  const data = {
    id: `${sku.toLowerCase()}-${slug}`,
    rowId,
    sku,
    skuDisplay: 'Custom Order',
    mergedSkus: [sku],
    slug,
    title,
    category: primaryCollection,
    primaryCollection,
    primaryCollectionName,
    crossCollections,
    readyMold,
    enamelCraft,
    dieCast3d,
    badge: is2dTooling ? 'Custom 2D Die · Waived @ 500+ pcs' : 'Custom 3D Mold · Waived on Bulk',
    material,
    process,
    size,
    weight,
    attachmentEn,
    platingEn,
    tier100,
    tier500,
    tier2000,
    priceRange,
    moqNum: Number(moqNum),
    moq: moqStr,
    leadTime,
    sampleTime: '7–10 Days',
    toolingFee,
    featuredImage,
    galleryImages: [featuredImage],
    variants: [
      {
        sku,
        name: title,
        materialEn: material,
        size,
        weight,
        tier100,
        tier500,
        tier2000,
        finishesEn: platingEn,
        notes: process
      }
    ],
    metaTitle,
    metaDescription,
    overview,
    specs: {
      'Custom Tooling Mode': '100% Custom-Molded to Your Design',
      'Production Category': primaryCollectionName,
      'Base Material': material,
      'Manufacturing Craft': process,
      'Standard Dimensions': size,
      'Unit Net Weight': weight,
      'Electroplating & Finishes': platingEn,
      'Attachment & Hardware': attachmentEn,
      'Tooling / Mold Policy': `${toolingFee} · Free 3-Year Storage`,
      'Minimum Order Quantity (MOQ)': `${moqStr} per design`,
      'Digital Artwork Proof': 'Free 1:1 Vector Mockup within 12 Hours',
      'Pre-Production Sample': '7–10 Business Days (Paid Custom Sample)',
      'Compliance & Safety': 'US CPSIA Lead (<90 ppm), CA Prop 65 & EU REACH / EN 1811'
    },
    features: [
      `Precision ${material} Craftsmanship: Produced via ${process} with tight dimensional control (${size}, ${weight}).`,
      `Versatile Electroplating & Finishing: Available in ${platingEn} with custom Pantone color matching.`,
      `Flexible Tooling Economics: ${toolingFee}, plus complimentary 3-year steel mold archiving for zero-fee reorders.`,
      `Turnkey Retail & Event Readiness: Ships with ${attachmentEn}, optional custom backing cards, velvet gift boxes, and full DDP air/sea logistics.`
    ],
    faqs: [
      {
        question: `What is the minimum order quantity (MOQ) and unit price for ${title}?`,
        answer: `The starting wholesale MOQ for ${title} is ${moqStr}. Reference factory-direct tiered pricing is $${tier100}/pc (${moqStr} starter tier), $${tier500}/pc (500 pcs tier), and $${tier2000}/pc (2,000+ pcs volume tier), depending on size and finish complexity.`
      },
      {
        question: `What is the mold or tooling fee for ${title}, and when is it waived?`,
        answer: `Tooling policy for ${title} is ${toolingFee}. Every client receives custom steel tooling cut strictly to their artwork, stored free of charge for 3 years in our Zhongshan mold vault so subsequent reorders pay $0 mold fees.`
      },
      {
        question: `What base materials and manufacturing crafts are used on ${title}?`,
        answer: `${title} is custom-engineered from ${material} using ${process}, sized around ${size} at approximately ${weight} per unit (custom dimensions available).`
      },
      {
        question: `Which electroplating colors and surface finishes are available for ${title}?`,
        answer: `Standard factory surface options for this custom craft include ${platingEn}. Dual-tone masking plating and custom matte or clear protective lacquer coatings are also available upon request.`
      },
      {
        question: `What backings, attachments, and accessories come with ${title}?`,
        answer: primaryCollection === 'custom-metal-fridge-magnets'
          ? `This custom format ships with ${attachmentEn}. Upgrade backing and presentation options—including higher-grade N52 rare-earth neodymium discs, full-surface anti-scratch soft rubber magnetic backing, clear EVA protective pads, or custom 400gsm Euro-slot retail display cards—can be specified in your quote.`
          : `This custom format ships with ${attachmentEn}. Upgrade hardware options such as deluxe locking pin clutches, magnetic no-hole bar clasps, custom split rings, or velvet presentation boxes can be specified in your quote.`
      },
      {
        question: `Can we get a free digital artwork proof before paying for tooling or samples?`,
        answer: `Yes. Send your vector logo (.AI, .EPS, .SVG, or vector .PDF) or rough sketch via our quote form or WhatsApp, and our engineering team will send a free 1:1 scaled digital production proof within 12 hours.`
      },
      {
        question: `Can we order a physical pre-production sample of ${title} before mass production?`,
        answer: `Yes. Pre-production physical samples take 7–10 business days (paid sample covers custom mold cutting to your design, plating, and enamel finishing; courier air freight is billed at carrier cost or via your DHL/FedEx account).`
      },
      {
        question: `What is the bulk production lead time for ${title}?`,
        answer: `Mass production for ${title} completes in ${leadTime} after digital artwork proof or physical sample approval, followed by multi-point pre-shipment inspection for color accuracy, plating luster, and attachment security.`
      },
      {
        question: `Does ${title} meet US CPSIA, California Prop 65, and EU REACH safety standards?`,
        answer: `Yes. All raw metals, electroplating baths, and Pantone enamel pigments comply with US CPSIA (<90 ppm lead), California Prop 65, and EU REACH / EN 1811 nickel-release regulations.`
      },
      {
        question: `What retail packaging upgrades are compatible with ${title}?`,
        answer: `Beyond complimentary individual polybags, ${title} can be packaged onto custom printed 350gsm retail backing cards, sealed inside clear acrylic coin capsules, or presented in flocked velvet gift boxes.`
      }
    ]
  };

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.json`), JSON.stringify(data, null, 2));
}

console.log(`Generated ${CATALOG.length} product JSON files in ${OUT_DIR}`);
