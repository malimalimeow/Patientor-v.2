import mongoose from "mongoose";
import Diagnosis from "../models/dignosis.ts";
import type { DiagnosisType } from "../zodSchemas.ts";
import config from "./config.ts";

console.log("add Diagnosis");

const createFirstLogOfDiagnosis = async()=>{
    try{
         if(!config.MONGODB_URI){throw new Error("Can't find Db");}
                await mongoose.connect(config.MONGODB_URI);
                console.log("connected to Mongo Db");

      await Diagnosis.deleteMany({});
      

    const diagnosisSeedData: DiagnosisType[] = [
  //  (Respiratory)
  { code: "J06.9", name: "Acute upper respiratory infection, unspecified", latin: "Infectio acuta respiratoria superior non specificata" },
  { code: "J03.0", name: "Streptococcal tonsillitis", latin: "Tonsillitis (palatina) streptococcica" },
  { code: "J10.1", name: "Influenza with other respiratory manifestations", latin: "Influenza cum aliis manifestationibus respiratoriis" },
  { code: "J45.909", name: "Unspecified asthma, uncomplicated", latin: "Asthma bronchiale non specificatum" },
  { code: "J20.9", name: "Acute bronchitis, unspecified", latin: "Bronchitis acuta non specificata" },
  { code: "J18.9", name: "Pneumonia, unspecified organism", latin: "Pneumonia non specificata" },
  { code: "J30.9", name: "Allergic rhinitis, unspecified", latin: "Rhinitis allergica non specificata" },

  // (Cardiovascular)
  { code: "I10", name: "Essential (primary) hypertension", latin: "Hypertensio essentialis" },
  { code: "I25.10", name: "Atherosclerotic heart disease of native coronary artery", latin: "Morbus ischaemicus cordis chronicus" },
  { code: "I50.9", name: "Heart failure, unspecified", latin: "Insufficientia cordis non specificata" },
  { code: "I48.91", name: "Unspecified atrial fibrillation", latin: "Fibrillatio atriorum" },
  { code: "I63.9", name: "Cerebral infarction, unspecified", latin: "Infarctus cerebri non specificatus" },

  // (Gastrointestinal / General Surgery)
  { code: "K35.80", name: "Unspecified acute appendicitis", latin: "Appendicitis acuta non specificata" },
  { code: "K21.9", name: "Gastro-esophageal reflux disease without esophagitis", latin: "Refluxus gastrooesophagalis" },
  { code: "K29.70", name: "Gastritis, unspecified, without bleeding", latin: "Gastritis non specificata" },
  { code: "K58.9", name: "Irritable bowel syndrome without diarrhea", latin: "Syndroma intestini irritabilis" },
  { code: "K80.20", name: "Calculus of gallbladder without cholecystitis", latin: "Cholecystolithiasis" },
  { code: "K40.90", name: "Unilateral inguinal hernia, without obstruction or gangrene", latin: "Hernia inguinalis" },

  //  (Orthopedics / Musculoskeletal)
  { code: "M24.2", name: "Disorder of ligament", latin: "Morbositas ligamenti" },
  { code: "M51.2", name: "Other specified intervertebral disc displacement", latin: "Alia dislocatio disci intervertebralis" },
  { code: "M54.50", name: "Low back pain, unspecified", latin: "Lumbago non specificata" },
  { code: "M17.9", name: "Osteoarthritis of knee, unspecified", latin: "Gonarthrosis non specificata" },
  { code: "S03.5", name: "Sprain and strain of joints and ligaments of head", latin: "Distorsio articulationum capitis" },
  { code: "S62.5", name: "Fracture of thumb", latin: "Fractura pollicis" },
  { code: "S83.209A", name: "Tear of unspecified meniscus, current injury", latin: "Laesio menisci genu" },

  //  (Endocrine / Metabolic)
  { code: "E11.9", name: "Type 2 diabetes mellitus without complications", latin: "Diabetes mellitus typi 2" },
  { code: "E03.9", name: "Hypothyroidism, unspecified", latin: "Hypothyreosis non specificata" },
  { code: "E78.5", name: "Hyperlipidemia, unspecified", latin: "Hyperlipidaemia non specificata" },
  { code: "E66.9", name: "Obesity, unspecified", latin: "Adipositas non specificata" },

  // (Urology / Renal)
  { code: "N30.0", name: "Acute cystitis", latin: "Cystitis acuta" },
  { code: "N39.0", name: "Urinary tract infection, site not specified", latin: "Infectio tractus urinarii" },
  { code: "N20.1", name: "Calculus of ureter", latin: "Ureterolithiasis" },
  { code: "N40.0", name: "Benign prostatic hyperplasia without lower urinary tract symptoms", latin: "Hyperplasia prostatae benigna" },

  // (Dermatology)
  { code: "L20.9", name: "Atopic dermatitis, unspecified", latin: "Dermatitis atopica" },
  { code: "L60.1", name: "Onycholysis", latin: "Onycholysis" },
  { code: "L70.0", name: "Acne vulgaris", latin: "Acne vulgaris" },
  { code: "L40.0", name: "Psoriasis vulgaris", latin: "Psoriasis vulgaris" },
  { code: "L03.90", name: "Cellulitis, unspecified", latin: "Cellulitis non specificata" },

  // (Neuro / ENT / Psychiatry)
  { code: "F41.1", name: "Generalized anxiety disorder", latin: "Perturbatio anxietatis generalisata" },
  { code: "F32.9", name: "Major depressive disorder, single episode, unspecified", latin: "Perturbatio depressiva" },
  { code: "F43.2", name: "Adjustment disorders", latin: "Perturbationes adaptationis" },
  { code: "G43.909", name: "Migraine, unspecified, not intractable", latin: "Hemicrania" },
  { code: "H54.7", name: "Unspecified visual loss", latin: "Amblyopia NAS" },
  { code: "H66.90", name: "Otitis media, unspecified", latin: "Otitis media non specificata" },
  { code: "H35.29", name: "Other proliferative retinopathy", latin: "Alia retinopathia proliferativa" },

  //(General / Health Status)
  { code: "Z00.00", name: "Encounter for general adult medical examination without abnormal findings", latin: "Examinatio medica generalis" },
  { code: "Z57.1", name: "Occupational exposure to radiation" },
  { code: "Z74.3", name: "Need for continuous supervision" },
  { code: "Z98.89", name: "Other specified postprocedural states" }
];

    const insertedDiagnosis = await Diagnosis.insertMany(diagnosisSeedData);
    console.log(`added ${insertedDiagnosis.length} diagnosis codes`);
        }catch(error){
            console.log("failed to add diagnosis",error);
        }finally{
            await mongoose.connection.close();
        }
    };

    void createFirstLogOfDiagnosis();
    
    